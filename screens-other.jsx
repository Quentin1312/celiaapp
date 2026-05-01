/* Tools, CAP, Profile screens */

const { useState: uS3, useEffect: uE3, useRef: uR3 } = React;

/* -------- TOOLS -------- */
function ToolsScreen() {
  const [view, setView] = uS3('menu');
  return (
    <div className="screen pop">
      <div style={{ marginBottom: 14 }}>
        <span className="watercolor cream">Outils</span>
      </div>
      {view === 'menu' && <ToolsMenu setView={setView}/>}
      {view === 'convert' && <Converter onBack={() => setView('menu')}/>}
      {view === 'timers' && <Timers onBack={() => setView('menu')}/>}
    </div>
  );
}

function ToolsMenu({ setView }) {
  const Illu = window.Illu;
  const items = [
    { key: 'convert', label: 'Convertisseur portions', sub: 'Multiplier les ingrédients par un ratio', illu: <Illu.RollingPin size={70}/>, color: 'var(--rose-pale)' },
    { key: 'timers', label: 'Timer multiple', sub: 'Jusqu\'à 4 minuteurs en parallèle', illu: <Illu.PanButter size={70}/>, color: 'var(--mint-pale)' },
  ];
  return (
    <div style={{ display:'flex', flexDirection:'column', gap: 12 }}>
      {items.map(it => (
        <button key={it.key} onClick={() => setView(it.key)} className="card" style={{
          textAlign:'left', cursor:'pointer', border:'none',
          display:'flex', alignItems:'center', gap: 14, padding: 16
        }}>
          <div style={{ width: 80, height: 64, borderRadius: 12, background: it.color, display:'grid', placeItems:'center', flexShrink: 0 }}>
            {it.illu}
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontFamily:'var(--font-script)', fontSize: 24, fontWeight: 600, color: 'var(--ink)', lineHeight: 1.1 }}>{it.label}</div>
            <div style={{ fontFamily:'var(--font-body)', fontSize: 13, color:'var(--ink-soft)', marginTop: 4 }}>{it.sub}</div>
          </div>
        </button>
      ))}
    </div>
  );
}

/* Converter */
function Converter({ onBack }) {
  const [ingredients, setIngredients] = uS3([
    { qty: '200', unit: 'g', name: 'farine' },
    { qty: '100', unit: 'g', name: 'sucre' },
    { qty: '2', unit: '', name: 'œufs' },
  ]);
  const [from, setFrom] = uS3(4);
  const [to, setTo] = uS3(6);

  const ratio = from > 0 ? to / from : 1;
  const fmt = (n) => {
    if (!isFinite(n)) return '—';
    if (Math.abs(n - Math.round(n)) < 0.01) return Math.round(n).toString();
    return (Math.round(n * 10) / 10).toString().replace('.', ',');
  };

  const updateIng = (i, k, v) => setIngredients(arr => arr.map((x, idx) => idx === i ? { ...x, [k]: v } : x));
  const addIng = () => setIngredients(arr => [...arr, { qty: '', unit: 'g', name: '' }]);
  const rmIng = (i) => setIngredients(arr => arr.filter((_, idx) => idx !== i));

  return (
    <div>
      <div style={{ display:'flex', alignItems:'center', gap: 8, marginBottom: 12 }}>
        <button className="btn btn-ghost" onClick={onBack} style={{ padding: '8px 14px', fontSize: 13 }}>{Icon.back} Retour</button>
        <span style={{ fontFamily:'var(--font-script)', fontSize: 26, fontWeight: 600 }}>Convertisseur</span>
      </div>

      <div className="card" style={{ marginBottom: 14, padding: 14 }}>
        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-around', gap: 10 }}>
          <div style={{ textAlign:'center', flex: 1 }}>
            <div style={{ fontFamily:'var(--font-hand)', fontSize: 14, color: 'var(--ink-soft)' }}>recette pour</div>
            <input type="number" min="1" className="input"
              style={{ textAlign:'center', fontFamily:'var(--font-script)', fontSize: 32, fontWeight: 700, color:'var(--rose-deep)', padding: '4px 8px', marginTop: 4, border: '1px dashed var(--rose-deep)' }}
              value={from} onChange={e => setFrom(parseInt(e.target.value) || 1)}/>
            <div style={{ fontFamily:'var(--font-body)', fontSize: 11, color:'var(--ink-faint)', marginTop: 2 }}>parts</div>
          </div>
          <div style={{ fontFamily:'var(--font-script)', fontSize: 32, color: 'var(--ink-faint)' }}>→</div>
          <div style={{ textAlign:'center', flex: 1 }}>
            <div style={{ fontFamily:'var(--font-hand)', fontSize: 14, color: 'var(--ink-soft)' }}>je veux</div>
            <input type="number" min="1" className="input"
              style={{ textAlign:'center', fontFamily:'var(--font-script)', fontSize: 32, fontWeight: 700, color:'var(--mint-deep)', padding: '4px 8px', marginTop: 4, border: '1px dashed var(--mint-deep)' }}
              value={to} onChange={e => setTo(parseInt(e.target.value) || 1)}/>
            <div style={{ fontFamily:'var(--font-body)', fontSize: 11, color:'var(--ink-faint)', marginTop: 2 }}>parts</div>
          </div>
        </div>
      </div>

      <div style={{ marginBottom: 8 }}><span className="hand-underline">Ingrédients</span></div>
      <div style={{ display:'flex', flexDirection:'column', gap: 6 }}>
        {ingredients.map((ing, i) => (
          <div key={i} style={{ display:'flex', alignItems:'center', gap: 6 }}>
            <input className="input" type="number" placeholder="200" value={ing.qty} onChange={e => updateIng(i, 'qty', e.target.value)} style={{ width: 70, padding: '8px 10px', textAlign:'center' }}/>
            <input className="input" placeholder="g" value={ing.unit} onChange={e => updateIng(i, 'unit', e.target.value)} style={{ width: 56, padding: '8px 10px', textAlign:'center' }}/>
            <input className="input" placeholder="farine" value={ing.name} onChange={e => updateIng(i, 'name', e.target.value)} style={{ flex: 1, padding: '8px 10px' }}/>
            <div style={{ flexShrink:0, fontFamily:'var(--font-script)', fontSize: 20, fontWeight: 700, color:'var(--rose-deep)', minWidth: 60, textAlign:'right' }}>
              {fmt(parseFloat(ing.qty.toString().replace(',','.')) * ratio)} {ing.unit}
            </div>
            {ingredients.length > 1 && <button className="back" style={{ flexShrink:0, width: 28, height: 28 }} onClick={() => rmIng(i)}>{Icon.close}</button>}
          </div>
        ))}
        <button className="btn btn-ghost" onClick={addIng} style={{ alignSelf:'flex-start', fontSize: 13, padding: '8px 14px' }}>{Icon.plus} ingrédient</button>
      </div>
    </div>
  );
}

/* Timers (max 4) */
function Timers({ onBack }) {
  const [timers, setTimers] = uS3([
    { id: window.uid(), name: 'Cuisson', total: 25*60, remain: 25*60, running: false, ringing: false }
  ]);
  const tickRef = uR3();
  const [adding, setAdding] = uS3(false);
  const [newName, setNewName] = uS3('');
  const [newMin, setNewMin] = uS3(10);

  uE3(() => {
    tickRef.current = setInterval(() => {
      setTimers(arr => arr.map(t => {
        if (!t.running || t.ringing) return t;
        const r = t.remain - 1;
        if (r <= 0) {
          // beep
          try {
            const ctx = new (window.AudioContext || window.webkitAudioContext)();
            const o = ctx.createOscillator(); const g = ctx.createGain();
            o.connect(g); g.connect(ctx.destination);
            o.frequency.value = 880; g.gain.value = 0.15;
            o.start(); setTimeout(() => { o.stop(); ctx.close(); }, 600);
          } catch(e){}
          return { ...t, remain: 0, running: false, ringing: true };
        }
        return { ...t, remain: r };
      }));
    }, 1000);
    return () => clearInterval(tickRef.current);
  }, []);

  const fmt = (s) => {
    const m = Math.floor(s/60), sec = s % 60;
    return `${String(m).padStart(2,'0')}:${String(sec).padStart(2,'0')}`;
  };

  const toggle = (id) => setTimers(arr => arr.map(t => t.id === id ? { ...t, running: !t.running, ringing: false } : t));
  const reset = (id) => setTimers(arr => arr.map(t => t.id === id ? { ...t, remain: t.total, running: false, ringing: false } : t));
  const remove = (id) => setTimers(arr => arr.filter(t => t.id !== id));
  const add = () => {
    if (timers.length >= 4) return;
    const min = Math.max(1, parseInt(newMin) || 10);
    setTimers(arr => [...arr, { id: window.uid(), name: newName.trim() || 'Timer', total: min*60, remain: min*60, running: false, ringing: false }]);
    setNewName(''); setNewMin(10); setAdding(false);
  };

  return (
    <div>
      <div style={{ display:'flex', alignItems:'center', gap: 8, marginBottom: 12 }}>
        <button className="btn btn-ghost" onClick={onBack} style={{ padding: '8px 14px', fontSize: 13 }}>{Icon.back} Retour</button>
        <span style={{ fontFamily:'var(--font-script)', fontSize: 26, fontWeight: 600, flex: 1 }}>Timers</span>
        <span style={{ fontFamily:'var(--font-body)', fontSize: 12, color:'var(--ink-faint)', fontWeight: 600 }}>{timers.length}/4</span>
      </div>

      <div style={{ display:'flex', flexDirection:'column', gap: 10 }}>
        {timers.map(t => (
          <div key={t.id} className={`timer ${t.ringing ? 'ringing' : ''}`}>
            <div className="digits">{fmt(t.remain)}</div>
            <div className="name" style={{ display:'flex', alignItems:'center', gap: 6 }}>{t.name}{t.ringing && <span style={{color:'var(--rose-deep)', display:'flex'}}>{Icon.bell}</span>}</div>
            <button className="back" onClick={() => toggle(t.id)} style={{ color: t.running ? 'var(--rose-deep)' : 'var(--mint-deep)' }}>
              {t.running ? Icon.pause : Icon.play}
            </button>
            <button className="back" onClick={() => reset(t.id)}>{Icon.reset}</button>
            <button className="back" onClick={() => remove(t.id)}>{Icon.close}</button>
          </div>
        ))}

        {adding && timers.length < 4 && (
          <div className="card" style={{ display:'flex', flexDirection:'column', gap: 8, padding: 12 }}>
            <input className="input" placeholder="Nom du timer (ex: levée, cuisson)" value={newName} onChange={e => setNewName(e.target.value)}/>
            <div style={{ display:'flex', alignItems:'center', gap: 8 }}>
              <input type="number" min="1" max="180" className="input" value={newMin} onChange={e => setNewMin(e.target.value)} style={{ width: 80, textAlign:'center' }}/>
              <span style={{ fontFamily:'var(--font-hand)', fontSize: 17 }}>minutes</span>
              <div style={{ flex: 1 }}/>
              <button className="btn btn-ghost" onClick={() => setAdding(false)} style={{ padding:'8px 12px', fontSize: 13 }}>Annuler</button>
              <button className="btn btn-primary" onClick={add} style={{ padding:'8px 14px', fontSize: 13 }}>Créer</button>
            </div>
          </div>
        )}

        {!adding && timers.length < 4 && (
          <button className="btn btn-ghost" onClick={() => setAdding(true)} style={{ alignSelf:'center', marginTop: 4 }}>
            {Icon.plus} ajouter un timer
          </button>
        )}
      </div>
    </div>
  );
}

/* -------- CAP -------- */
function CapScreen() {
  const [tab, setTab] = uS3('vocab');
  return (
    <div className="screen pop">
      <div style={{ marginBottom: 12 }}>
        <span className="watercolor mint">CAP Pâtisserie</span>
      </div>
      <div className="tabs" style={{ marginBottom: 14 }}>
        {[['vocab','Vocabulaire'],['fiches','Fiches'],['quiz','Astuces']].map(([k,l]) => (
          <button key={k} className={tab===k?'active':''} onClick={()=>setTab(k)}>{l}</button>
        ))}
      </div>
      {tab === 'vocab' && <CapVocab/>}
      {tab === 'fiches' && <CapFiches/>}
      {tab === 'quiz' && <CapTips/>}
    </div>
  );
}

const VOCAB = [
  { term: 'Crémer', def: 'Travailler le beurre et le sucre ensemble pour les rendre mousseux et clairs.' },
  { term: 'Sabler', def: 'Mélanger farine et beurre du bout des doigts jusqu\'à obtenir une texture sableuse.' },
  { term: 'Blanchir', def: 'Fouetter œufs et sucre jusqu\'à ce que le mélange devienne mousseux et clair.' },
  { term: 'Tourer', def: 'Donner des tours de pliage à une pâte feuilletée pour créer les couches.' },
  { term: 'Pocher', def: 'Dresser une préparation à l\'aide d\'une poche à douille.' },
  { term: 'Corner', def: 'Racler une préparation à l\'aide d\'une corne pour ne rien perdre.' },
  { term: 'Turbiner', def: 'Faire prendre une glace dans une sorbetière (turbine) en mouvement.' },
  { term: 'Monter', def: 'Battre une préparation pour y incorporer de l\'air (blancs, crème).' },
  { term: 'Détendre', def: 'Assouplir une pâte ou crème en y ajoutant un peu de liquide ou en la travaillant.' },
  { term: 'Chemiser', def: 'Tapisser un moule avec un papier, du beurre, du sucre ou un biscuit.' },
];

function CapVocab() {
  const [q, setQ] = uS3('');
  const [open, setOpen] = uS3(null);
  const filtered = VOCAB.filter(v => v.term.toLowerCase().includes(q.toLowerCase()) || v.def.toLowerCase().includes(q.toLowerCase()));
  return (
    <div>
      <input className="input" placeholder="Chercher un terme…" value={q} onChange={e => setQ(e.target.value)} style={{ marginBottom: 10 }}/>
      <div style={{ display:'flex', flexDirection:'column', gap: 6 }}>
        {filtered.map((v,i) => (
          <button key={i} onClick={() => setOpen(open===i?null:i)} className="card" style={{ textAlign:'left', border:'none', cursor:'pointer', padding: 12 }}>
            <div style={{ display:'flex', alignItems:'center', gap: 8 }}>
              <span className="hand-underline" style={{ fontSize: 22 }}>{v.term}</span>
              <div style={{ flex: 1 }}/>
              <span style={{ fontFamily:'var(--font-body)', fontSize: 18, color:'var(--ink-faint)' }}>{open===i?'−':'+'}</span>
            </div>
            {open === i && (
              <div style={{ fontFamily:'var(--font-hand)', fontSize: 17, color: 'var(--ink-soft)', marginTop: 8, lineHeight: 1.4 }}>
                {v.def}
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}

const FICHES = [
  { title: 'Pâte brisée', items: ['250 g farine', '125 g beurre', '5 cl eau', '5 g sel'], method: 'Sabler le beurre froid avec la farine et le sel, ajouter l\'eau, fraiser, bouler, repos 30 min au frais.' },
  { title: 'Pâte sucrée', items: ['250 g farine', '150 g beurre', '95 g sucre glace', '1 œuf', '30 g poudre d\'amandes'], method: 'Crémer beurre et sucre, ajouter œuf et amandes, incorporer la farine, fraiser, repos 1 h.' },
  { title: 'Crème pâtissière', items: ['500 ml lait', '4 jaunes', '100 g sucre', '40 g farine ou maïzena', '1 gousse vanille'], method: 'Infuser la vanille dans le lait, blanchir jaunes-sucre, ajouter farine, verser le lait, cuire à ébullition.' },
  { title: 'Génoise', items: ['4 œufs', '125 g sucre', '125 g farine'], method: 'Monter œufs et sucre au bain-marie à 50°C, refroidir au batteur, incorporer la farine tamisée délicatement. 180°C, 20 min.' },
];

function CapFiches() {
  return (
    <div style={{ display:'flex', flexDirection:'column', gap: 10 }}>
      {FICHES.map((f, i) => (
        <div key={i} className="card" style={{ padding: 14 }}>
          <div style={{ marginBottom: 6 }}><span className="hand-underline" style={{ fontSize: 22 }}>{f.title}</span></div>
          <ul className="checks" style={{ marginBottom: 8 }}>
            {f.items.map((it, j) => <li key={j}>{it}</li>)}
          </ul>
          <div style={{ fontFamily:'var(--font-hand)', fontSize: 16, color: 'var(--ink-soft)', lineHeight: 1.4, paddingTop: 6, borderTop: '1px dashed var(--line)' }}>
            {f.method}
          </div>
        </div>
      ))}
    </div>
  );
}

const TIPS = [
  'Pour un beurre pommade parfait, sors-le 1 h avant ou tape-le entre 2 feuilles de papier sulfurisé.',
  'La crème monte mieux si bol, fouet et crème sont très froids (15 min au congélo).',
  'Pour un caramel sans cristaux : sucre + un peu d\'eau, ne pas remuer, juste tourner la casserole.',
  'Tamise toujours la farine pour les génoises et madeleines : pas de grumeaux, plus d\'air.',
  'Un œuf battu ≈ 50 g (jaune 20 g, blanc 30 g) — utile quand la recette donne un poids.',
];

function CapTips() {
  const Illu = window.Illu;
  return (
    <div style={{ display:'flex', flexDirection:'column', gap: 10 }}>
      {TIPS.map((t, i) => (
        <div key={i} className={`card ${i%2?'tilt-r':'tilt-l'}`} style={{ padding: 14, display:'flex', gap: 12, alignItems:'flex-start' }}>
          <div style={{ flexShrink: 0 }}><Illu.Star size={26} fill="#f0c860"/></div>
          <div style={{ fontFamily:'var(--font-hand)', fontSize: 17, color:'var(--ink)', lineHeight: 1.4 }}>{t}</div>
        </div>
      ))}
    </div>
  );
}

/* -------- PROFILE -------- */
function ProfileScreen({ profile, setProfile, recipes, onResetSeed }) {
  const [name, setName] = uS3(profile.name);
  const [level, setLevel] = uS3(profile.level);
  const Illu = window.Illu;

  function save() {
    const p = { name: name.trim() || 'Apprentie', level: level.trim() || 'CAP' };
    setProfile(p);
    window.Storage.saveProfile(p);
  }

  return (
    <div className="screen pop">
      <div style={{ marginBottom: 14 }}>
        <span className="watercolor">Profil</span>
      </div>

      <div style={{ display:'flex', flexDirection:'column', alignItems:'center', marginBottom: 18, gap: 8 }}>
        <div style={{ width: 110, height: 110, borderRadius: '50%', background:'var(--rose-pale)', display:'grid', placeItems:'center', border: '3px dashed var(--rose-deep)' }}>
          <Illu.CakeSlice size={70}/>
        </div>
        <div style={{ fontFamily:'var(--font-script)', fontSize: 30, fontWeight: 600 }}>{profile.name}</div>
        <div style={{ fontFamily:'var(--font-hand)', fontSize: 17, color:'var(--ink-soft)' }}>{profile.level}</div>
      </div>

      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap: 8, marginBottom: 18 }}>
        <Stat label="recettes" value={recipes.length}/>
        <Stat label="favorites" value={recipes.filter(r=>r.favorite).length}/>
        <Stat label="✨ pro" value={recipes.filter(r=>r.aiRefined).length}/>
      </div>

      <div className="card" style={{ marginBottom: 12 }}>
        <div style={{ marginBottom: 8 }}><span className="hand-underline" style={{ fontSize: 22 }}>Mes infos</span></div>
        <div style={{ display:'flex', flexDirection:'column', gap: 8 }}>
          <input className="input" value={name} onChange={e => setName(e.target.value)} placeholder="Prénom"/>
          <input className="input" value={level} onChange={e => setLevel(e.target.value)} placeholder="CAP 1ère année…"/>
          <button className="btn btn-primary" onClick={save}>Enregistrer</button>
        </div>
      </div>

      <div className="card">
        <div style={{ marginBottom: 8 }}><span className="hand-underline" style={{ fontSize: 22 }}>Données</span></div>
        <button className="btn btn-ghost" onClick={onResetSeed} style={{ width: '100%' }}>
          Réinitialiser les recettes d'exemple
        </button>
      </div>
    </div>
  );
}

function Stat({ label, value }) {
  return (
    <div className="card" style={{ padding: 12, textAlign:'center' }}>
      <div style={{ fontFamily:'var(--font-script)', fontSize: 28, fontWeight: 700, color:'var(--rose-deep)', lineHeight: 1 }}>{value}</div>
      <div style={{ fontFamily:'var(--font-body)', fontSize: 11, color:'var(--ink-soft)', marginTop: 2, fontWeight: 600 }}>{label}</div>
    </div>
  );
}

window.ToolsScreen = ToolsScreen;
window.CapScreen = CapScreen;
window.CapVocab = CapVocab;
window.ProfileScreen = ProfileScreen;
