/* Recipe Detail + Editor + ChefFridge + ChefChat — refonte épurée */

const { useState: useS2, useEffect: useE2, useRef: useR2 } = React;

/* -------- RECIPE DETAIL -------- */
function RecipeDetail({ recipe, onBack, onEdit, onDelete, onToggleFav, onUpdate, toast }) {
  const [refining, setRefining] = useS2(false);
  const [showFiche, setShowFiche] = useS2(false);

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
        <button className="btn btn-ghost" onClick={() => setShowFiche(true)}>
          {Icon.download}
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

      {showFiche && <FicheModal recipe={recipe} onClose={() => setShowFiche(false)} toast={toast}/>}
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

/* ════════════════════════════════════════════════════════════════
   FICHE CARNET — HuggingFace FLUX.1-schnell (fond aquarelle IA)
                + Canvas 2D (texte recette par-dessus)
   Token gratuit : huggingface.co/settings/tokens (role: Read)
   ════════════════════════════════════════════════════════════════ */

function _wrapLines(ctx, text, maxW) {
  const words = String(text).split(' ');
  const lines = [];
  let line = '';
  for (const w of words) {
    const test = line ? line + ' ' + w : w;
    if (ctx.measureText(test).width > maxW && line) { lines.push(line); line = w; }
    else line = test;
  }
  if (line) lines.push(line);
  return lines.length ? lines : [''];
}

async function generateFicheGemini(recipe, hfToken) {
  const title  = recipe.title || 'Recette';
  const cat    = recipe.category || '';
  const rating = Math.max(1, Math.min(5, recipe.rating || 5));

  /* ── 1. Fond aquarelle via HuggingFace FLUX.1-schnell ── */
  const bgPrompt = `Soft watercolor illustration, French pastry ${title}${cat ? ' '+cat : ''}, pastel colors cream blush rose warm beige honey gold, botanical watercolor leaf accents, cozy French culinary notebook aesthetic, no text no letters, portrait format, high quality`;

  const hfRes = await fetch(
    'https://api-inference.huggingface.co/models/black-forest-labs/FLUX.1-schnell',
    {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${hfToken}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ inputs: bgPrompt, parameters: { num_inference_steps: 4 } }),
    }
  );

  if (!hfRes.ok) {
    const err = await hfRes.json().catch(() => ({}));
    if (hfRes.status === 503) throw new Error('Modèle en chargement, réessaie dans 30s');
    throw new Error(err?.error || `HuggingFace HTTP ${hfRes.status}`);
  }

  const blob = await hfRes.blob();
  const bgDataUrl = await new Promise((res, rej) => {
    const r = new FileReader(); r.onload = () => res(r.result); r.onerror = rej;
    r.readAsDataURL(blob);
  });
  const bgImg = await new Promise((res, rej) => {
    const i = new Image(); i.onload = () => res(i); i.onerror = rej; i.src = bgDataUrl;
  });

  /* ── 2. Canvas : fond IA + texte recette par-dessus ── */
  await Promise.all([
    document.fonts.load('bold 80px Caveat'),
    document.fonts.load('700 42px Caveat'),
    document.fonts.load('400 40px Caveat'),
  ]);

  const S = 2, LW = 540, W = LW * S;
  const LINE_H = 27 * S, PAD_L = 54 * S, PAD_R = 38 * S, CNTW = W - PAD_L - PAD_R;
  const BG_H = 300 * S;

  /* mesure hauteur totale */
  const tmp = document.createElement('canvas').getContext('2d');
  function measureSec(items, fs) {
    tmp.font = `400 ${fs}px Caveat`;
    let h = LINE_H * 1.8;
    for (const it of (items || [])) h += _wrapLines(tmp, '88. ' + it, CNTW - 26*S).length * LINE_H;
    return h;
  }
  const TH = BG_H
    + (recipe.category ? LINE_H*1.3 : 0)
    + LINE_H * 2.5
    + measureSec(recipe.ingredients, 20*S)
    + measureSec(recipe.steps, 19*S)
    + (recipe.cuisson?.length ? measureSec(recipe.cuisson, 19*S) : 0)
    + LINE_H * 3.5
    + (recipe.note ? LINE_H * 2 : 0)
    + 32*S;

  const cv = document.createElement('canvas');
  cv.width = W; cv.height = TH;
  const ctx = cv.getContext('2d');

  /* fond aquarelle IA */
  ctx.drawImage(bgImg, 0, 0, W, BG_H + 80*S);

  /* fondu image → papier */
  const grad = ctx.createLinearGradient(0, BG_H - 100*S, 0, BG_H + 20*S);
  grad.addColorStop(0, 'rgba(250,246,239,0)');
  grad.addColorStop(1, 'rgba(250,246,239,1)');
  ctx.fillStyle = grad; ctx.fillRect(0, BG_H - 100*S, W, 120*S);

  /* zone papier */
  ctx.fillStyle = '#faf6ef'; ctx.fillRect(0, BG_H, W, TH - BG_H);

  /* lignes carnet */
  ctx.strokeStyle = 'rgba(150,195,220,0.35)'; ctx.lineWidth = S;
  for (let y = BG_H + LINE_H; y < TH; y += LINE_H) {
    ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke();
  }
  /* marge rouge */
  ctx.strokeStyle = 'rgba(210,100,85,0.22)'; ctx.lineWidth = 1.5*S;
  ctx.beginPath(); ctx.moveTo(42*S, BG_H); ctx.lineTo(42*S, TH); ctx.stroke();

  function rRect(x, y, w, h, r, fill, stroke) {
    ctx.beginPath();
    ctx.moveTo(x+r,y); ctx.lineTo(x+w-r,y); ctx.quadraticCurveTo(x+w,y,x+w,y+r);
    ctx.lineTo(x+w,y+h-r); ctx.quadraticCurveTo(x+w,y+h,x+w-r,y+h);
    ctx.lineTo(x+r,y+h); ctx.quadraticCurveTo(x,y+h,x,y+h-r);
    ctx.lineTo(x,y+r); ctx.quadraticCurveTo(x,y,x+r,y);
    ctx.closePath();
    if (fill) { ctx.fillStyle = fill; ctx.fill(); }
    if (stroke) { ctx.strokeStyle = stroke; ctx.lineWidth = 1.5*S; ctx.stroke(); }
  }

  let Y = BG_H - 36*S;

  /* bandeau titre */
  ctx.font = `bold ${40*S}px Caveat`;
  const tw = ctx.measureText(title).width;
  const bw = Math.min(tw + 54*S, CNTW + 24*S), bh = 52*S, bx = (W-bw)/2;
  ctx.save(); ctx.shadowColor='rgba(0,0,0,0.18)'; ctx.shadowBlur=12*S; ctx.shadowOffsetY=3*S;
  rRect(bx, Y, bw, bh, 14*S, 'rgba(253,233,204,0.97)', 'rgba(210,162,97,0.8)');
  ctx.restore();
  ctx.fillStyle='#5c3318'; ctx.textAlign='center'; ctx.textBaseline='middle';
  ctx.fillText(title, W/2, Y+bh/2);
  ctx.textAlign='left'; ctx.textBaseline='alphabetic';
  Y += bh + 14*S;

  if (cat) {
    ctx.font=`400 ${16*S}px Caveat`; ctx.fillStyle='#a08060'; ctx.textAlign='center';
    ctx.fillText(cat, W/2, Y+14*S); ctx.textAlign='left'; Y += LINE_H*1.3;
  }

  const SECS = [
    { items: recipe.ingredients, label:'Ingrédients', fs:20*S, num:false, fill:'rgba(252,226,225,0.92)', stroke:'rgba(225,130,120,0.7)', text:'#8b3535', pre:'#e08078' },
    { items: recipe.steps,       label:'Préparation', fs:19*S, num:true,  fill:'rgba(245,226,200,0.92)', stroke:'rgba(196,154,108,0.75)', text:'#7a4a20', pre:'#c49a6c' },
    { items: recipe.cuisson,     label:'Cuisson',     fs:19*S, num:false, fill:'rgba(255,242,196,0.92)', stroke:'rgba(210,160,20,0.7)',  text:'#7a5800', pre:'#d4a020' },
  ];

  for (const sec of SECS) {
    if (!sec.items?.length) continue;
    ctx.font=`bold ${21*S}px Caveat`;
    const lw2=ctx.measureText(sec.label).width+44*S, lh=36*S, lx=(W-lw2)/2;
    ctx.save(); ctx.shadowColor='rgba(0,0,0,0.08)'; ctx.shadowBlur=8*S;
    rRect(lx, Y, lw2, lh, lh/2, sec.fill, sec.stroke);
    ctx.restore();
    ctx.font=`bold ${21*S}px Caveat`; ctx.fillStyle=sec.text;
    ctx.textAlign='center'; ctx.textBaseline='middle';
    ctx.fillText(sec.label, W/2, Y+lh/2);
    ctx.textAlign='left'; ctx.textBaseline='alphabetic';
    Y += lh + 8*S;

    for (let i=0; i<sec.items.length; i++) {
      const pre = sec.num ? `${i+1}. ` : '• ';
      ctx.font=`bold ${sec.fs+(sec.num?0:2)}px Caveat`;
      const preW=ctx.measureText(pre).width;
      const lines=_wrapLines({measureText:t=>{ctx.font=`400 ${sec.fs}px Caveat`;return ctx.measureText(t);}}, sec.items[i], CNTW-preW-6*S);
      ctx.fillStyle=sec.pre; ctx.font=`bold ${sec.fs+(sec.num?0:2)}px Caveat`;
      ctx.fillText(pre, PAD_L, Y+LINE_H*0.82);
      ctx.fillStyle='#3a2a1f'; ctx.font=`400 ${sec.fs}px Caveat`;
      for (let li=0;li<lines.length;li++) ctx.fillText(lines[li], PAD_L+preW, Y+LINE_H*0.82+li*LINE_H);
      Y += lines.length*LINE_H;
    }
    Y += LINE_H*0.5;
  }

  /* séparateur */
  ctx.save(); ctx.setLineDash([6*S,4*S]);
  ctx.strokeStyle='rgba(196,154,108,0.4)'; ctx.lineWidth=1.5*S;
  ctx.beginPath(); ctx.moveTo(PAD_L,Y+6*S); ctx.lineTo(W-PAD_R,Y+6*S); ctx.stroke();
  ctx.restore(); Y+=18*S;

  /* étoiles */
  ctx.font=`400 ${32*S}px Caveat`; ctx.fillStyle='#d4a020'; ctx.textAlign='center';
  ctx.fillText('★'.repeat(rating)+'☆'.repeat(5-rating), W/2, Y+LINE_H*0.9);
  Y += LINE_H*1.3;

  /* note */
  if (recipe.note) {
    ctx.font=`400 ${18*S}px Caveat`; ctx.fillStyle='#8a6a50'; ctx.textAlign='center';
    for (const nl of _wrapLines({measureText:t=>ctx.measureText(t)}, recipe.note, CNTW)) {
      ctx.fillText(nl, W/2, Y+LINE_H*0.82); Y+=LINE_H;
    }
  }

  return cv.toDataURL('image/png');
}

/* ── Modal ──────────────────────────────────────────────────── */
function FicheModal({ recipe, onClose, toast }) {
  const getKey = () => (window.getHFKey ? window.getHFKey() : localStorage.getItem('patisserie.hf.key') || '');
  const setKey = (k) => { if (window.setHFKey) window.setHFKey(k); else localStorage.setItem('patisserie.hf.key', k.trim()); };

  const [status, setStatus]     = useS2(() => getKey() ? 'idle' : 'key');
  const [imgUrl, setImgUrl]     = useS2(null);
  const [errMsg, setErrMsg]     = useS2('');
  const [keyDraft, setKeyDraft] = useS2('');

  function saveKey() {
    const k = keyDraft.trim();
    if (!k) return;
    setKey(k);
    setKeyDraft('');
    setStatus('idle');
  }

  async function generate() {
    const key = getKey();
    if (!key) { setStatus('key'); return; }
    setStatus('loading'); setErrMsg('');
    try {
      const dataUrl = await generateFicheGemini(recipe, key);
      setImgUrl(dataUrl);
      setStatus('done');
    } catch(e) {
      console.error(e);
      setErrMsg(e.message || 'Erreur inconnue');
      setStatus('error');
    }
  }

  function download() {
    if (!imgUrl) return;
    const a = document.createElement('a');
    a.href = imgUrl;
    a.download = `${(recipe.title || 'recette').replace(/[^a-z0-9]/gi, '_')}_fiche.png`;
    a.click();
    toast('Fiche téléchargée ✓');
  }

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-sheet" onClick={e => e.stopPropagation()}
        style={{ display:'flex', flexDirection:'column', maxHeight:'92vh' }}>
        <div className="grabber"/>

        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom: 16, flexShrink: 0 }}>
          <div>
            <div className="display" style={{ fontSize: 22 }}>Fiche <span style={{fontStyle:'italic'}}>carnet</span></div>
            <div className="eyebrow" style={{ marginTop: 3 }}>FLUX · aquarelle IA + recette</div>
          </div>
          <button className="back" onClick={onClose}>{Icon.close}</button>
        </div>

        {status === 'key' && (
          <div style={{ display:'flex', flexDirection:'column', gap: 14 }}>
            <div style={{
              background:'var(--paper-2)', border:'1px solid var(--line)',
              borderRadius:'var(--radius)', padding:'14px 16px',
              fontSize: 13.5, color:'var(--ink-2)', lineHeight: 1.6,
            }}>
              <div style={{ fontWeight:600, marginBottom:5 }}>Token Hugging Face</div>
              <div style={{ color:'var(--ink-3)' }}>
                Gratuit sur <span style={{ color:'var(--accent)' }}>huggingface.co/settings/tokens</span> → "New token" → rôle <strong>Read</strong>. Sauvegardé sur cet appareil uniquement.
              </div>
            </div>
            <input className="input" placeholder="hf_…" value={keyDraft}
              onChange={e => setKeyDraft(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && saveKey()}
              style={{ fontFamily:'monospace', fontSize:13 }} autoFocus/>
            <button className="btn btn-primary" onClick={saveKey} disabled={!keyDraft.trim()} style={{ width:'100%' }}>
              Enregistrer &amp; générer
            </button>
          </div>
        )}

        {status === 'idle' && (
          <div style={{ display:'flex', flexDirection:'column', gap: 14 }}>
            <div style={{
              background:'var(--paper-2)', border:'1px solid var(--line)',
              borderRadius:'var(--radius)', padding:'14px 16px',
              fontSize: 13.5, color:'var(--ink-3)', lineHeight: 1.6,
            }}>
              Génère une <span style={{color:'var(--ink-2)',fontWeight:500}}>illustration aquarelle IA</span> du plat en fond, avec toute la recette écrite par-dessus en style carnet.
            </div>
            <button className="btn btn-primary" onClick={generate} style={{ width:'100%' }}>
              {Icon.sparkles} Générer la fiche
            </button>
            <button className="btn btn-ghost" onClick={() => { setKey(''); setStatus('key'); }}
              style={{ fontSize:12, color:'var(--ink-4)' }}>Changer de token</button>
          </div>
        )}

        {status === 'loading' && (
          <div style={{ textAlign:'center', padding:'52px 0' }}>
            <div style={{
              width:52, height:52, borderRadius:'50%',
              border:'3px solid var(--line-2)', borderTopColor:'var(--accent)',
              animation:'rot .85s linear infinite', margin:'0 auto 18px',
            }}/>
            <div className="display" style={{ fontSize:20, marginBottom:6 }}>Génération en cours…</div>
            <div style={{ fontSize:13, color:'var(--ink-3)' }}>Aquarelle IA · composition · texte</div>
          </div>
        )}

        {status === 'done' && imgUrl && (
          <div style={{ display:'flex', flexDirection:'column', gap:12, minHeight:0 }}>
            <div style={{ flex:1, overflow:'auto', borderRadius:'var(--radius)', border:'1px solid var(--line)', background:'#faf6ef' }}>
              <img src={imgUrl} alt="Fiche carnet" style={{ width:'100%', display:'block' }}/>
            </div>
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:8, flexShrink:0 }}>
              <button className="btn btn-ghost" onClick={generate}>{Icon.sparkles} Régénérer</button>
              <button className="btn btn-primary" onClick={download}>{Icon.download} Télécharger</button>
            </div>
          </div>
        )}

        {status === 'error' && (
          <div style={{ display:'flex', flexDirection:'column', gap:14, alignItems:'center', padding:'28px 0' }}>
            <div style={{ textAlign:'center' }}>
              <div style={{ fontSize:36, marginBottom:10 }}>⚠️</div>
              <div style={{ fontSize:14, color:'var(--ink-2)', fontWeight:600, marginBottom:6 }}>Génération échouée</div>
              {errMsg && <div style={{ fontSize:12.5, color:'var(--ink-3)', maxWidth:280, margin:'0 auto', lineHeight:1.5 }}>{errMsg}</div>}
            </div>
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:8, width:'100%' }}>
              <button className="btn btn-ghost" onClick={() => { setKey(''); setStatus('key'); }}>Changer token</button>
              <button className="btn btn-primary" onClick={generate}>Réessayer</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

window.RecipeDetail = RecipeDetail;
window.RecipeEditor = RecipeEditor;
window.ChefFridge = ChefFridge;
window.ChefChat = ChefChat;
