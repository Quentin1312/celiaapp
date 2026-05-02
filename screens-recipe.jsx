/* Recipe Detail + Editor + ChefFridge screens */

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
      const updated = {
        ...recipe,
        title: out.title || recipe.title,
        ingredients: out.ingredients,
        steps: out.steps,
        aiRefined: true,
      };
      onUpdate(updated);
      toast('Reformulé en langage pro ✨');
    } catch (e) {
      toast('IA indisponible — réessaye');
    } finally {
      setRefining(false);
    }
  }

  async function exportPDF() {
    setExporting(true);
    try {
      const node = document.getElementById('recipe-print');
      if (!node) return;
      // use html2canvas + jsPDF
      const canvas = await window.html2canvas(node, {
        backgroundColor: '#f7efe1',
        scale: 2,
        useCORS: true,
      });
      const img = canvas.toDataURL('image/png');
      const { jsPDF } = window.jspdf;
      const pdf = new jsPDF({ unit: 'mm', format: 'a4' });
      const pageW = pdf.internal.pageSize.getWidth();
      const pageH = pdf.internal.pageSize.getHeight();
      const ratio = canvas.height / canvas.width;
      const w = pageW - 20;
      const h = w * ratio;
      let y = 10;
      if (h > pageH - 20) {
        const h2 = pageH - 20;
        const w2 = h2 / ratio;
        pdf.addImage(img, 'PNG', (pageW - w2) / 2, 10, w2, h2);
      } else {
        pdf.addImage(img, 'PNG', 10, y, w, h);
      }
      pdf.save(`${recipe.title.replace(/[^a-z0-9]/gi, '_')}.pdf`);
      toast('PDF téléchargé !');
    } catch (e) {
      console.error(e);
      toast('Export échoué');
    } finally {
      setExporting(false);
    }
  }

  return (
    <div className="screen pop" style={{ paddingTop: 0 }}>
      <div className="topbar" style={{ paddingTop: 14 }}>
        <button className="back" onClick={onBack}>{Icon.back}</button>
        <div style={{ flex: 1 }}/>
        <button className="back" onClick={() => onToggleFav(recipe)} title="Favori"
          style={{ color: recipe.favorite ? 'var(--rose-deep)' : 'var(--ink-soft)' }}>
          {recipe.favorite ? Icon.heart : Icon.heartO}
        </button>
        <button className="back" onClick={() => onEdit(recipe)} title="Éditer">{Icon.edit}</button>
      </div>

      <div className="no-print" style={{ display:'flex', gap: 8, marginBottom: 12 }}>
        <button className="btn btn-mint" onClick={refine} disabled={refining} style={{ flex: 1 }}>
          {refining ? <><span className="spin"/> Reformulation…</> : <>{Icon.sparkles} Vocabulaire pro</>}
        </button>
        <button className="btn btn-ghost" onClick={exportPDF} disabled={exporting} title="Exporter PDF">
          {exporting ? <span className="spin" style={{borderColor:'rgba(0,0,0,.2)', borderTopColor:'var(--ink)'}}/> : Icon.download}
        </button>
      </div>

      {recipe.aiRefined && (
        <div className="ai-banner no-print" style={{ marginBottom: 12 }}>
          <span style={{ color: 'var(--rose-deep)' }}>{Icon.sparkles}</span>
          Modifiée par IA — vocabulaire technique CAP
        </div>
      )}

      <RecipePage recipe={recipe} forPrint />

      <div className="no-print" style={{ marginTop: 16, display:'flex', justifyContent:'center' }}>
        <button className="btn btn-ghost" onClick={() => { if (confirm('Supprimer cette recette ?')) onDelete(recipe); }}
          style={{ color: 'var(--berry)' }}>
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
      // resize to ~600px max for storage
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
      ingredients: ing,
      steps: stp,
      note: note.trim(),
      photo: photo || '',
      createdAt: recipe?.createdAt || Date.now(),
      rating: recipe?.rating ?? 5,
      favorite: recipe?.favorite ?? false,
      aiRefined: recipe?.aiRefined ?? false,
    });
  }

  return (
    <div className="screen pop" style={{ paddingTop: 0 }}>
      <div className="topbar">
        <button className="back" onClick={onCancel}>{Icon.close}</button>
        <h1>{recipe ? 'Modifier' : 'Nouvelle'}</h1>
        <div style={{ flex: 1 }}/>
        <button className="btn btn-primary" onClick={save} style={{ padding:'8px 14px', fontSize: 14 }}>Enregistrer</button>
      </div>

      <div style={{ marginBottom: 14 }}>
        <input className="input script" placeholder="Titre de la recette…" value={title} onChange={e => setTitle(e.target.value)}/>
      </div>

      <div style={{ marginBottom: 14 }}>
        <div style={{ marginBottom: 8 }}><span className="hand-underline">Photo</span></div>
        <label style={{ display:'block', cursor:'pointer' }}>
          <input type="file" accept="image/*" onChange={pickPhoto} style={{ display:'none' }}/>
          {photo ? (
            <div style={{ position:'relative', borderRadius: 14, overflow:'hidden', border:'1px solid var(--line)' }}>
              <img src={photo} alt="" style={{ width:'100%', display:'block', maxHeight: 200, objectFit:'cover' }}/>
              <button type="button" onClick={(e) => { e.preventDefault(); setPhoto(''); }} className="back" style={{ position:'absolute', top: 8, right: 8, background:'rgba(255,255,255,.9)' }}>{Icon.close}</button>
            </div>
          ) : (
            <div style={{ border:'2px dashed var(--line)', borderRadius: 14, padding: 24, textAlign:'center', background:'rgba(255,255,255,.4)' }}>
              <div style={{ fontFamily:'var(--font-hand)', fontSize: 17, color:'var(--ink-soft)', display:'flex', alignItems:'center', justifyContent:'center', gap: 8 }}>{Icon.camera} Choisir une photo</div>
              <div style={{ fontFamily:'var(--font-body)', fontSize: 12, color:'var(--ink-faint)', marginTop: 4 }}>de ta recette</div>
            </div>
          )}
        </label>
      </div>

      <div className="chips" style={{ marginBottom: 16 }}>
        {window.CATEGORIES.filter(c => c !== 'Tout').map(c => (
          <button key={c} className={`chip ${category === c ? 'active' : ''}`} onClick={() => setCategory(c)}>{c}</button>
        ))}
      </div>

      <div style={{ marginBottom: 16 }}>
        <div style={{ marginBottom: 8 }}><span className="hand-underline">Ingrédients</span></div>
        <div style={{ display:'flex', flexDirection:'column', gap: 6 }}>
          {ingredients.map((ing, i) => (
            <div key={i} style={{ display:'flex', gap: 6, alignItems:'center' }}>
              <input className="input" placeholder="Ex : 200 g de farine" value={ing} onChange={e => setIng(i, e.target.value)}/>
              {ingredients.length > 1 && <button className="back" onClick={() => rmIng(i)} style={{ flexShrink:0 }}>{Icon.close}</button>}
            </div>
          ))}
          <button className="btn btn-ghost" onClick={addIng} style={{ alignSelf:'flex-start', fontSize: 13, padding: '8px 14px' }}>{Icon.plus} ingrédient</button>
        </div>
      </div>

      <div style={{ marginBottom: 16 }}>
        <div style={{ marginBottom: 8 }}><span className="hand-underline">Préparation</span></div>
        <div style={{ display:'flex', flexDirection:'column', gap: 6 }}>
          {steps.map((s, i) => (
            <div key={i} style={{ display:'flex', gap: 6, alignItems:'flex-start' }}>
              <div style={{ fontFamily:'var(--font-script)', fontSize: 22, fontWeight:700, color:'var(--rose-deep)', minWidth: 24, paddingTop: 6 }}>{i+1}.</div>
              <textarea className="textarea" placeholder="Décris l'étape…" value={s} onChange={e => setStep(i, e.target.value)} rows={2}/>
              {steps.length > 1 && <button className="back" onClick={() => rmStep(i)} style={{ flexShrink:0 }}>{Icon.close}</button>}
            </div>
          ))}
          <button className="btn btn-ghost" onClick={addStep} style={{ alignSelf:'flex-start', fontSize: 13, padding: '8px 14px' }}>{Icon.plus} étape</button>
        </div>
      </div>

      <div style={{ marginBottom: 24 }}>
        <div style={{ marginBottom: 8 }}><span className="hand-underline">Note</span></div>
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
      if (regen) toast('Nouvelle proposition ✨');
    } catch (e) {
      toast('IA indisponible — réessaye');
    } finally { setLoading(false); }
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
    toast('Sauvegardée dans tes recettes !');
  }

  const Illu = window.Illu;

  return (
    <div className="screen pop" style={{ paddingTop: 0 }}>
      <div className="topbar">
        <button className="back" onClick={onBack}>{Icon.back}</button>
        <h1>Chef Frigo</h1>
      </div>

      {!result && (
        <>
          <div style={{ display:'flex', alignItems:'center', gap: 12, marginBottom: 14, padding: 14,
            background:'linear-gradient(135deg, var(--mint-pale), var(--rose-pale))', borderRadius: 16 }}>
            <div style={{flexShrink:0}}><Illu.WhiskBowl size={50}/></div>
            <div style={{ fontFamily:'var(--font-hand)', fontSize: 16, color: 'var(--ink)', lineHeight: 1.3 }}>
              Liste les ingrédients que tu as.<br/>Le chef IA imagine une recette niveau CAP avec.
            </div>
          </div>

          <div style={{ marginBottom: 16 }}>
            <div style={{ marginBottom: 8 }}><span className="hand-underline">Mon frigo / placard</span></div>
            <div style={{ display:'flex', flexDirection:'column', gap: 6 }}>
              {items.map((it, i) => (
                <div key={i} style={{ display:'flex', gap: 6 }}>
                  <input className="input" placeholder="Ex : œufs, beurre, chocolat…" value={it} onChange={e => setItem(i, e.target.value)}/>
                  {items.length > 1 && <button className="back" onClick={() => rmItem(i)} style={{ flexShrink:0 }}>{Icon.close}</button>}
                </div>
              ))}
              <button className="btn btn-ghost" onClick={addItem} style={{ alignSelf:'flex-start', fontSize: 13, padding: '8px 14px' }}>{Icon.plus} ingrédient</button>
            </div>
          </div>

          <button className="btn btn-primary" onClick={go} disabled={loading} style={{ width: '100%' }}>
            {loading ? <><span className="spin"/> Le chef réfléchit…</> : <>{Icon.sparkles} Générer une recette</>}
          </button>
        </>
      )}

      {result && (
        <>
          <div className="ai-banner" style={{ marginBottom: 12 }}>
            <span style={{ color: 'var(--rose-deep)' }}>{Icon.sparkles}</span>
            Recette imaginée pour toi — {result.difficulty || 'CAP'} · {result.totalTime || '~30 min'}
          </div>
          <RecipePage recipe={{
            ...result,
            cuisson: result.totalTime ? [`Temps total : ${result.totalTime}`, `Difficulté : ${result.difficulty || 'CAP'}`] : [],
            note: result.tip,
            rating: 5,
          }} forPrint/>
          <div style={{ marginTop: 14, display:'flex', gap: 8, flexWrap:'wrap' }}>
            <button className="btn btn-mint" onClick={() => go(true)} disabled={loading} style={{ flex: '1 1 100%' }}>
              {loading ? <><span className="spin"/> Le chef ré-imagine…</> : <>{Icon.sparkles} Une autre recette</>}
            </button>
            <button className="btn btn-ghost" onClick={() => setResult(null)} style={{ flex: 1 }}>Modifier ingrédients</button>
            <button className="btn btn-primary" onClick={saveToRecipes} style={{ flex: 1.5 }}>
              {Icon.heart} Sauvegarder
            </button>
          </div>
        </>
      )}
    </div>
  );
}

/* -------- CHEF CLASSIQUE (chat IA) -------- */
function ChefChat({ onBack, toast }) {
  const [messages, setMessages] = useS2([]);
  const [input, setInput] = useS2('');
  const [loading, setLoading] = useS2(false);
  const bottomRef = useR2(null);
  const textareaRef = useR2(null);
  const Illu = window.Illu;

  useE2(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

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
    } catch (e) {
      toast('IA indisponible — réessaye');
    } finally {
      setLoading(false);
    }
  }

  function handleKey(e) {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(); }
  }

  function useSuggestion(s) {
    setInput(s);
    textareaRef.current?.focus();
  }

  const suggestions = [
    "C'est quoi la différence entre sabler et crémer ?",
    "Comment réussir une pâte à choux ?",
    "Pourquoi ma génoise retombe-t-elle ?",
    "À quelle température tempérer le chocolat noir ?",
    "Quelle est la règle HACCP pour les crèmes ?",
  ];

  return (
    <div style={{ display:'flex', flexDirection:'column', flex:1, overflow:'hidden' }}>

      {/* TopBar */}
      <div className="topbar" style={{ paddingTop:14, flexShrink:0 }}>
        <button className="back" onClick={onBack}>{Icon.back}</button>
        <div style={{ flex:1 }}>
          <div style={{ fontFamily:'var(--font-script)', fontSize:26, fontWeight:700, lineHeight:1.1 }}>
            Chef Classique
          </div>
          <div style={{ fontFamily:'var(--font-body)', fontSize:12, color:'var(--ink-soft)', fontWeight:600 }}>
            Questions pâtisserie ✨
          </div>
        </div>
        <div style={{ flexShrink:0, opacity:.8 }}><Illu.WhiskBowl size={42}/></div>
      </div>

      {/* Zone messages */}
      <div style={{ flex:1, overflowY:'auto', padding:'8px 16px 16px', display:'flex', flexDirection:'column', gap:10 }}>

        {/* Message d'accueil */}
        <div style={{ display:'flex', justifyContent:'flex-start' }}>
          <div className="chat-bubble chat-bubble-chef">
            <span style={{ fontFamily:'var(--font-hand)', fontSize:17, lineHeight:1.55 }}>
              Bonjour ! Je suis Chef Ganache 👨‍🍳<br/>
              Pose-moi toutes tes questions — techniques, recettes, températures, vocabulaire CAP... Je suis là pour t'aider !
            </span>
          </div>
        </div>

        {/* Suggestions (visibles uniquement au début) */}
        {messages.length === 0 && (
          <div style={{ display:'flex', flexDirection:'column', gap:7, marginTop:2 }}>
            {suggestions.map((s, i) => (
              <button key={i} className="suggestion-chip" onClick={() => useSuggestion(s)}>
                {s}
              </button>
            ))}
          </div>
        )}

        {/* Messages */}
        {messages.map((m, i) => (
          <div key={i} style={{ display:'flex', justifyContent: m.role === 'user' ? 'flex-end' : 'flex-start' }}>
            <div className={`chat-bubble ${m.role === 'user' ? 'chat-bubble-user' : 'chat-bubble-chef'}`}>
              <span style={{ fontFamily:'var(--font-hand)', fontSize:17, lineHeight:1.55, whiteSpace:'pre-wrap' }}>
                {m.content}
              </span>
            </div>
          </div>
        ))}

        {/* Loading */}
        {loading && (
          <div style={{ display:'flex', justifyContent:'flex-start' }}>
            <div className="chat-bubble chat-bubble-chef" style={{ display:'flex', alignItems:'center', gap:8, padding:'14px 18px' }}>
              <span className="spin" style={{ borderColor:'rgba(58,42,31,.15)', borderTopColor:'var(--ink-soft)', width:18, height:18 }}/>
              <span style={{ fontFamily:'var(--font-hand)', fontSize:15, color:'var(--ink-soft)' }}>Chef Ganache réfléchit…</span>
            </div>
          </div>
        )}

        <div ref={bottomRef}/>
      </div>

      {/* Zone de saisie */}
      <div style={{
        flexShrink:0,
        padding:'10px 14px calc(14px + env(safe-area-inset-bottom))',
        borderTop:'1px solid var(--line-soft)',
        background:'rgba(247,239,225,.95)',
        backdropFilter:'blur(10px)',
      }}>
        <div style={{ display:'flex', gap:8, alignItems:'flex-end' }}>
          <textarea
            ref={textareaRef}
            className="textarea"
            placeholder="Pose ta question à Chef Ganache…"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKey}
            rows={1}
            style={{ flex:1, resize:'none', minHeight:44, maxHeight:120, padding:'10px 14px', fontFamily:'var(--font-hand)', fontSize:16 }}
          />
          <button
            className="btn btn-primary"
            onClick={send}
            disabled={loading || !input.trim()}
            style={{ padding:'10px 16px', flexShrink:0, height:44 }}>
            {Icon.sparkles}
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
