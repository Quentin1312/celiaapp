/* Recipe Detail + Editor + ChefFridge + ChefChat — refonte épurée */

const { useState: useS2, useEffect: useE2, useRef: useR2 } = React;

/* -------- RECIPE DETAIL -------- */
function RecipeDetail({ recipe, onBack, onEdit, onDelete, onToggleFav, onUpdate, toast }) {
  const [refining, setRefining] = useS2(false);
  const [exporting, setExporting] = useS2(false);

  async function refine() {
    setRefining(true);
    try {
      const out = await window.AI.refineRecipe(recipe);
      if (!out || !out.ingredients || !out.steps) throw new Error('format invalide');
      onUpdate({
        ...recipe,
        title: out.title || recipe.title,
        ingredients: out.ingredients,
        steps: out.steps,
        aiRefined: true,
      });
      toast('Reformulé en langage pro');
    } catch (e) {
      toast('IA indisponible');
    } finally { setRefining(false); }
  }

  async function exportPDF() {
    setExporting(true);
    try {
      const node = document.getElementById('recipe-print');
      if (!node) return;
      const canvas = await window.html2canvas(node, {
        backgroundColor: getComputedStyle(document.documentElement).getPropertyValue('--paper').trim() || '#f5f0e8',
        scale: 2, useCORS: true,
      });
      const img = canvas.toDataURL('image/png');
      const { jsPDF } = window.jspdf;
      const pdf = new jsPDF({ unit: 'mm', format: 'a4' });
      const pageW = pdf.internal.pageSize.getWidth();
      const pageH = pdf.internal.pageSize.getHeight();
      const ratio = canvas.height / canvas.width;
      const w = pageW - 20;
      const h = w * ratio;
      if (h > pageH - 20) {
        const h2 = pageH - 20;
        const w2 = h2 / ratio;
        pdf.addImage(img, 'PNG', (pageW - w2) / 2, 10, w2, h2);
      } else {
        pdf.addImage(img, 'PNG', 10, 10, w, h);
      }
      pdf.save(`${recipe.title.replace(/[^a-z0-9]/gi, '_')}.pdf`);
      toast('PDF téléchargé');
    } catch (e) { console.error(e); toast('Export échoué'); }
    finally { setExporting(false); }
  }

  return (
    <div className="screen pop" style={{ paddingTop: 0 }}>
      <div className="topbar" style={{ paddingTop: 14 }}>
        <button className="back" onClick={onBack}>{Icon.back}</button>
        <div style={{ flex: 1 }}/>
        <button className="back" onClick={() => onToggleFav(recipe)}
          style={{ color: recipe.favorite ? 'var(--accent)' : 'var(--ink-3)' }}>
          {recipe.favorite ? Icon.heart : Icon.heartO}
        </button>
        <button className="back" onClick={() => onEdit(recipe)}>{Icon.edit}</button>
      </div>

      <div className="no-print" style={{ display:'flex', gap: 8, marginBottom: 14 }}>
        <button className="btn btn-primary" onClick={refine} disabled={refining} style={{ flex: 1 }}>
          {refining ? <><span className="spin"/> Reformulation…</> : <>{Icon.sparkles} Vocabulaire pro</>}
        </button>
        <button className="btn btn-ghost" onClick={exportPDF} disabled={exporting}>
          {exporting ? <span className="spin" style={{borderColor:'rgba(0,0,0,.15)', borderTopColor:'var(--ink)'}}/> : Icon.download}
        </button>
      </div>

      {recipe.aiRefined && (
        <div className="ai-banner no-print" style={{ marginBottom: 14 }}>
          <span className="dot"/>
          Reformulée IA — vocabulaire technique CAP
        </div>
      )}

      <RecipePage recipe={recipe} forPrint />

      <div className="no-print" style={{ marginTop: 18, display:'flex', justifyContent:'center' }}>
        <button className="btn btn-ghost" onClick={() => { if (confirm('Supprimer cette recette ?')) onDelete(recipe); }}
          style={{ color: 'var(--accent)', borderColor: 'transparent' }}>
          {Icon.trash} Supprimer
        </button>
      </div>
    </div>
  );
}

/* -------- RECIPE EDITOR -------- */
function RecipeEditor({ recipe, onCancel, onSave }) {
  const [title, setTitle] = useS2(recipe?.title || '');
  const [category, setCategory] = useS2(recipe?.category || 'Desserts');
  const [ingredients, setIngredients] = useS2(recipe?.ingredients?.length ? recipe.ingredients : ['']);
  const [steps, setSteps] = useS2(recipe?.steps?.length ? recipe.steps : ['']);
  const [note, setNote] = useS2(recipe?.note || '');
  const [photo, setPhoto] = useS2(recipe?.photo || '');

  function pickPhoto(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = ev => {
      const img = new Image();
      img.onload = () => {
        const max = 600;
        const r = Math.min(1, max / Math.max(img.width, img.height));
        const c = document.createElement('canvas');
        c.width = img.width * r; c.height = img.height * r;
        c.getContext('2d').drawImage(img, 0, 0, c.width, c.height);
        setPhoto(c.toDataURL('image/jpeg', 0.82));
      };
      img.src = ev.target.result;
    };
    reader.readAsDataURL(file);
  }

  const setIng = (i, v) => setIngredients(arr => arr.map((x, idx) => idx === i ? v : x));
  const addIng = () => setIngredients(arr => [...arr, '']);
  const rmIng = (i) => setIngredients(arr => arr.filter((_, idx) => idx !== i));
  const setStep = (i, v) => setSteps(arr => arr.map((x, idx) => idx === i ? v : x));
  const addStep = () => setSteps(arr => [...arr, '']);
  const rmStep = (i) => setSteps(arr => arr.filter((_, idx) => idx !== i));

  function save() {
    if (!title.trim()) { alert('Titre requis'); return; }
    const ing = ingredients.map(s => s.trim()).filter(Boolean);
    const stp = steps.map(s => s.trim()).filter(Boolean);
    if (ing.length === 0 || stp.length === 0) { alert('Ajoute au moins 1 ingrédient et 1 étape'); return; }
    onSave({
      ...(recipe || {}),
      id: recipe?.id || window.uid(),
      title: title.trim(),
      category,
      ingredients: ing, steps: stp,
      note: note.trim(), photo: photo || '',
      createdAt: recipe?.createdAt || Date.now(),
      rating: recipe?.rating ?? 5,
      favorite: recipe?.favorite ?? false,
      aiRefined: recipe?.aiRefined ?? false,
    });
  }

  const SectionLabel = ({ children, count }) => (
    <div style={{ display:'flex', alignItems:'baseline', justifyContent:'space-between', marginBottom: 10 }}>
      <div className="display" style={{ fontSize: 22, fontStyle: 'italic' }}>{children}</div>
      {count != null && <div className="eyebrow">{count}</div>}
    </div>
  );

  return (
    <div className="screen pop" style={{ paddingTop: 0 }}>
      <div className="topbar">
        <button className="back" onClick={onCancel}>{Icon.close}</button>
        <h1>{recipe ? 'Modifier' : 'Nouvelle'}</h1>
        <div style={{ flex: 1 }}/>
        <button className="btn btn-primary" onClick={save} style={{ padding:'9px 16px', fontSize: 13 }}>Enregistrer</button>
      </div>

      <div style={{ marginBottom: 22 }}>
        <input className="input display-input" placeholder="Titre de la recette" value={title} onChange={e => setTitle(e.target.value)}/>
      </div>

      <div style={{ marginBottom: 22 }}>
        <SectionLabel>Photo</SectionLabel>
        <label style={{ display:'block', cursor:'pointer' }}>
          <input type="file" accept="image/*" onChange={pickPhoto} style={{ display:'none' }}/>
          {photo ? (
            <div style={{ position:'relative', borderRadius: 'var(--radius)', overflow:'hidden', border:'1px solid var(--line)' }}>
              <img src={photo} alt="" style={{ width:'100%', display:'block', maxHeight: 200, objectFit:'cover' }}/>
              <button type="button" onClick={(e) => { e.preventDefault(); setPhoto(''); }} className="back" style={{ position:'absolute', top: 10, right: 10, background:'var(--paper)' }}>{Icon.close}</button>
            </div>
          ) : (
            <div style={{ border:'1px dashed var(--line-2)', borderRadius: 'var(--radius)', padding: 28, textAlign:'center', background:'var(--paper-2)' }}>
              <div style={{ fontSize: 14, color:'var(--ink-3)', display:'flex', alignItems:'center', justifyContent:'center', gap: 8 }}>
                {Icon.camera} Choisir une photo
              </div>
            </div>
          )}
        </label>
      </div>

      <div style={{ marginBottom: 22 }}>
        <SectionLabel>Catégorie</SectionLabel>
        <div className="chips">
          {window.CATEGORIES.filter(c => c !== 'Tout').map(c => (
            <button key={c} className={`chip ${category === c ? 'active' : ''}`} onClick={() => setCategory(c)}>{c}</button>
          ))}
        </div>
      </div>

      <div style={{ marginBottom: 22 }}>
        <SectionLabel count={ingredients.filter(Boolean).length}>Ingrédients</SectionLabel>
        <div style={{ display:'flex', flexDirection:'column', gap: 8 }}>
          {ingredients.map((ing, i) => (
            <div key={i} style={{ display:'flex', gap: 8, alignItems:'center' }}>
              <input className="input" placeholder="200 g de farine" value={ing} onChange={e => setIng(i, e.target.value)}/>
              {ingredients.length > 1 && <button className="back" onClick={() => rmIng(i)} style={{ flexShrink:0 }}>{Icon.close}</button>}
            </div>
          ))}
          <button className="btn btn-ghost" onClick={addIng} style={{ alignSelf:'flex-start', fontSize: 13 }}>{Icon.plus} ingrédient</button>
        </div>
      </div>

      <div style={{ marginBottom: 22 }}>
        <SectionLabel count={steps.filter(Boolean).length}>Préparation</SectionLabel>
        <div style={{ display:'flex', flexDirection:'column', gap: 8 }}>
          {steps.map((s, i) => (
            <div key={i} style={{ display:'flex', gap: 8, alignItems:'flex-start' }}>
              <div style={{ fontFamily:'var(--font-display)', fontStyle:'italic', fontSize: 18, color:'var(--accent)', minWidth: 24, paddingTop: 12 }}>
                {String(i+1).padStart(2,'0')}
              </div>
              <textarea className="textarea" placeholder="Décris l'étape" value={s} onChange={e => setStep(i, e.target.value)} rows={2}/>
              {steps.length > 1 && <button className="back" onClick={() => rmStep(i)} style={{ flexShrink:0 }}>{Icon.close}</button>}
            </div>
          ))}
          <button className="btn btn-ghost" onClick={addStep} style={{ alignSelf:'flex-start', fontSize: 13 }}>{Icon.plus} étape</button>
        </div>
      </div>

      <div style={{ marginBottom: 24 }}>
        <SectionLabel>Note</SectionLabel>
        <input className="input" placeholder="Petite note perso…" value={note} onChange={e => setNote(e.target.value)}/>
      </div>
    </div>
  );
}

/* -------- CHEF FRIGO -------- */
function ChefFridge({ onBack, onSave, toast }) {
  const [items, setItems] = useS2(['']);
  const [loading, setLoading] = useS2(false);
  const [result, setResult] = useS2(null);

  const setItem = (i, v) => setItems(arr => arr.map((x, idx) => idx === i ? v : x));
  const addItem = () => setItems(arr => [...arr, '']);
  const rmItem = (i) => setItems(arr => arr.filter((_, idx) => idx !== i));

  async function go(regen = false) {
    const list = items.map(s => s.trim()).filter(Boolean);
    if (list.length < 2) { toast('Ajoute au moins 2 ingrédients'); return; }
    setLoading(true);
    if (!regen) setResult(null);
    try {
      const avoid = regen && result ? result.title : null;
      const out = await window.AI.chefFridge(list, avoid);
      setResult(out);
      if (regen) toast('Nouvelle proposition');
    } catch (e) { toast('IA indisponible'); }
    finally { setLoading(false); }
  }

  function saveToRecipes() {
    if (!result) return;
    onSave({
      id: window.uid(),
      title: result.title,
      category: result.category || 'Desserts',
      ingredients: result.ingredients,
      steps: result.steps,
      cuisson: result.totalTime ? [`Temps total : ${result.totalTime}`] : [],
      note: result.tip || '',
      rating: 5, favorite: false, aiRefined: true,
      createdAt: Date.now(),
    });
    toast('Sauvegardée');
  }

  return (
    <div className="screen pop" style={{ paddingTop: 0 }}>
      <div className="topbar">
        <button className="back" onClick={onBack}>{Icon.back}</button>
        <h1>Chef <span style={{ fontStyle:'italic' }}>Frigo</span></h1>
      </div>

      {!result && (
        <>
          <div className="eyebrow" style={{ marginBottom: 8 }}>Assistant IA</div>
          <div className="display" style={{ fontSize: 28, marginBottom: 12, lineHeight: 1.05 }}>
            Liste tes ingrédients,<br/>
            <span style={{ fontStyle: 'italic', color:'var(--accent)' }}>on imagine la recette.</span>
          </div>
          <div style={{ fontSize: 13.5, color:'var(--ink-3)', lineHeight: 1.5, marginBottom: 22 }}>
            Le chef IA combine ce que tu as et te propose une création niveau CAP.
          </div>

          <div style={{ display:'flex', flexDirection:'column', gap: 8, marginBottom: 18 }}>
            {items.map((it, i) => (
              <div key={i} style={{ display:'flex', gap: 8 }}>
                <input className="input" placeholder="Ex : œufs, beurre, chocolat…" value={it} onChange={e => setItem(i, e.target.value)}/>
                {items.length > 1 && <button className="back" onClick={() => rmItem(i)} style={{ flexShrink:0 }}>{Icon.close}</button>}
              </div>
            ))}
            <button className="btn btn-ghost" onClick={addItem} style={{ alignSelf:'flex-start', fontSize: 13 }}>{Icon.plus} ingrédient</button>
          </div>

          <button className="btn btn-primary" onClick={() => go(false)} disabled={loading} style={{ width: '100%' }}>
            {loading ? <><span className="spin"/> Le chef réfléchit…</> : <>{Icon.sparkles} Générer une recette</>}
          </button>
        </>
      )}

      {result && (
        <>
          <div className="ai-banner" style={{ marginBottom: 14 }}>
            <span className="dot"/>
            Recette IA · {result.difficulty || 'CAP'} · {result.totalTime || '~30 min'}
          </div>
          <RecipePage recipe={{
            ...result,
            cuisson: [
              result.totalTime && `Temps : ${result.totalTime}`,
              result.difficulty && `${result.difficulty}`,
            ].filter(Boolean),
            note: result.tip,
            rating: 5,
          }} forPrint/>
          <div style={{ marginTop: 16, display:'grid', gridTemplateColumns:'1fr 1fr', gap: 8 }}>
            <button className="btn btn-ghost" onClick={() => go(true)} disabled={loading}>
              {loading ? <span className="spin" style={{borderTopColor:'var(--ink)'}}/> : <>{Icon.sparkles} Une autre</>}
            </button>
            <button className="btn btn-ghost" onClick={() => setResult(null)}>Modifier</button>
            <button className="btn btn-primary" onClick={saveToRecipes} style={{ gridColumn:'1 / -1' }}>
              {Icon.save} Sauvegarder
            </button>
          </div>
        </>
      )}
    </div>
  );
}

/* -------- CHEF GANACHE (chat IA) -------- */
function ChefChat({ onBack, toast }) {
  const [messages, setMessages] = useS2([]);
  const [input, setInput] = useS2('');
  const [loading, setLoading] = useS2(false);
  const bottomRef = useR2(null);
  const textareaRef = useR2(null);

  useE2(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages, loading]);

  async function send() {
    const text = input.trim();
    if (!text || loading) return;
    const userMsg = { role: 'user', content: text };
    const nextHistory = [...messages, userMsg];
    setMessages(nextHistory);
    setInput('');
    setLoading(true);
    try {
      const reply = await window.AI.chat(nextHistory);
      setMessages(prev => [...prev, { role: 'assistant', content: reply }]);
    } catch (e) { toast('IA indisponible'); }
    finally { setLoading(false); }
  }

  function handleKey(e) {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(); }
  }

  function useSuggestion(s) { setInput(s); textareaRef.current?.focus(); }

  const suggestions = [
    "Différence entre sabler et crémer ?",
    "Comment réussir une pâte à choux ?",
    "Pourquoi ma génoise retombe ?",
    "Tempérage du chocolat noir ?",
  ];

  return (
    <div style={{ display:'flex', flexDirection:'column', flex:1, overflow:'hidden' }}>
      <div className="topbar" style={{ paddingTop:14, flexShrink:0, borderBottom:'1px solid var(--line)' }}>
        <button className="back" onClick={onBack}>{Icon.back}</button>
        <div style={{ flex:1 }}>
          <div className="display" style={{ fontSize:22, lineHeight:1 }}>
            Chef <span style={{ fontStyle:'italic' }}>Ganache</span>
          </div>
          <div className="eyebrow" style={{ fontSize: 9.5, marginTop: 3 }}>Assistant CAP pâtisserie</div>
        </div>
      </div>

      <div style={{ flex:1, overflowY:'auto', padding:'16px 22px 20px', display:'flex', flexDirection:'column', gap:4, background:'var(--paper)' }}>
        <div style={{ display:'flex', flexDirection:'column', alignItems:'flex-start', marginBottom:8 }}>
          <span className="chat-label-chef">Chef Ganache</span>
          <div className="chat-bubble chat-bubble-chef">
            Bonjour ! Pose-moi tes questions techniques, recettes, températures, vocabulaire CAP — je t'accompagne.
          </div>
        </div>

        {messages.length === 0 && (
          <div style={{ display:'flex', flexDirection:'column', gap:8, marginTop:12 }}>
            <span className="eyebrow" style={{ marginLeft: 2, marginBottom: 4 }}>Suggestions</span>
            {suggestions.map((s, i) => (
              <button key={i} className="suggestion-chip" onClick={() => useSuggestion(s)}>{s}</button>
            ))}
          </div>
        )}

        {messages.map((m, i) => {
          const isUser = m.role === 'user';
          const prevRole = i > 0 ? messages[i-1].role : null;
          const isFirst = prevRole !== m.role;
          return (
            <div key={i} style={{
              display:'flex', flexDirection:'column',
              alignItems: isUser ? 'flex-end' : 'flex-start',
              marginTop: isFirst ? 12 : 3,
            }}>
              {!isUser && isFirst && <span className="chat-label-chef">Chef Ganache</span>}
              <div className={`chat-bubble ${isUser ? 'chat-bubble-user' : 'chat-bubble-chef'}`} style={{ whiteSpace:'pre-wrap' }}>
                {m.content}
              </div>
            </div>
          );
        })}

        {loading && (
          <div style={{ display:'flex', flexDirection:'column', alignItems:'flex-start', marginTop:12 }}>
            <span className="chat-label-chef">Chef Ganache</span>
            <div className="chat-bubble chat-bubble-chef" style={{ display:'flex', alignItems:'center', gap:10 }}>
              <span className="spin" style={{ borderColor:'rgba(0,0,0,.15)', borderTopColor:'var(--accent)', width:14, height:14 }}/>
              <span style={{ fontSize:13.5, color:'var(--ink-3)' }}>réfléchit…</span>
            </div>
          </div>
        )}

        <div ref={bottomRef}/>
      </div>

      <div style={{
        flexShrink:0,
        padding:'12px 16px calc(14px + env(safe-area-inset-bottom))',
        borderTop:'1px solid var(--line)',
        background:'var(--paper-2)',
      }}>
        <div style={{ display:'flex', gap:8, alignItems:'flex-end' }}>
          <textarea ref={textareaRef} className="textarea"
            placeholder="Pose ta question…"
            value={input} onChange={e => setInput(e.target.value)} onKeyDown={handleKey}
            rows={1}
            style={{ flex:1, resize:'none', minHeight:44, maxHeight:120, padding:'11px 14px', fontSize:14.5 }}/>
          <button className="btn btn-primary" onClick={send} disabled={loading || !input.trim()}
            style={{ padding:'11px 16px', flexShrink:0, height:44 }}>
            {Icon.arrowR}
          </button>
        </div>
      </div>
    </div>
  );
}

window.RecipeDetail = RecipeDetail;
window.RecipeEditor = RecipeEditor;
window.ChefFridge = ChefFridge;
window.ChefChat = ChefChat;
