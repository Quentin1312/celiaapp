/* Reusable bits: icons, top bar, bottom nav, recipe page */

const Icon = {
  home: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M3 11.5L12 4l9 7.5"/><path d="M5 10v10h14V10"/></svg>,
  book: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M5 4h11a3 3 0 013 3v13H8a3 3 0 01-3-3V4z"/><path d="M5 4a3 3 0 013 3v13"/></svg>,
  tools: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M4.9 19.1L7 17M17 7l2.1-2.1"/></svg>,
  cap: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c0 1.5 3 3 6 3s6-1.5 6-3v-5"/></svg>,
  user: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 4-7 8-7s8 3 8 7"/></svg>,
  back: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 6 9 12 15 18"/></svg>,
  search: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.5-4.5"/></svg>,
  plus: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M12 5v14M5 12h14"/></svg>,
  trash: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2M6 6l1 14a2 2 0 002 2h6a2 2 0 002-2l1-14"/></svg>,
  edit: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M14 4l6 6L8 22H2v-6z"/></svg>,
  download: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3v14"/><polyline points="6 11 12 17 18 11"/><path d="M4 21h16"/></svg>,
  sparkles: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3l1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5z"/><path d="M19 16l.7 2.3 2.3.7-2.3.7L19 22l-.7-2.3-2.3-.7 2.3-.7z"/></svg>,
  heart: <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 21l-9-9a5 5 0 117-7l2 2 2-2a5 5 0 117 7z"/></svg>,
  heartO: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M12 21l-9-9a5 5 0 117-7l2 2 2-2a5 5 0 117 7z"/></svg>,
  play: <svg viewBox="0 0 24 24" fill="currentColor"><polygon points="6 4 20 12 6 20"/></svg>,
  pause: <svg viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>,
  reset: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><polyline points="1 4 1 10 7 10"/><path d="M3.5 15a9 9 0 102.6-9.7L1 10"/></svg>,
  close: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg>,
  fridge: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><rect x="5" y="2" width="14" height="20" rx="2"/><path d="M5 10h14M9 6v2M9 14v3"/></svg>,
  bell: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 01-3.46 0"/></svg>,
  camera: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z"/><circle cx="12" cy="13" r="4"/></svg>,
  save: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v11a2 2 0 01-2 2z"/></svg>,
  warning: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>,
  chevR: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 6 15 12 9 18"/></svg>,
  arrowR: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>,
  clock: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9"/><polyline points="12 7 12 12 16 14"/></svg>,
  share: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>,
  people: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></svg>,
};

const TopBar = ({ title, onBack }) => (
  <div className="topbar">
    {onBack && <button className="back" onClick={onBack}>{Icon.back}</button>}
    <h1>{title}</h1>
  </div>
);

const BottomNav = ({ tab, setTab }) => {
  const items = [
    { key: 'home',      label: 'Accueil',  icon: Icon.home },
    { key: 'recipes',   label: 'Recettes', icon: Icon.book },
    { key: 'tools',     label: 'Outils',   icon: Icon.tools },
    { key: 'cap',       label: 'Réviser',  icon: Icon.cap },
    { key: 'community', label: 'Amis',     icon: Icon.people },
    { key: 'profile',   label: 'Profil',   icon: Icon.user },
  ];
  return (
    <nav className="bottom-nav">
      {items.map(it => (
        <button key={it.key} className={tab === it.key ? 'active' : ''} onClick={() => setTab(it.key)}>
          {it.icon}
          <span>{it.label}</span>
        </button>
      ))}
    </nav>
  );
};

const Toast = ({ msg, onDone }) => {
  React.useEffect(() => { const t = setTimeout(onDone, 2200); return () => clearTimeout(t); }, []);
  return <div className="toast">{msg}</div>;
};

/* Recipe page — éditorial épuré */
const RecipePage = ({ recipe, forPrint = false }) => {
  const Illu = window.Illu;
  const cat = (recipe.category || '').toLowerCase();
  const heroIllu = recipe.illu === 'cake' || cat === 'entremets' ? <Illu.CakeSlice size={120}/>
    : recipe.illu === 'crepe' ? <Illu.CrepeStack size={120}/>
    : cat === 'viennoiserie' ? <Illu.Croissant size={120}/>
    : <Illu.WhiskBowl size={110}/>;

  return (
    <div className="recipe-page" id={forPrint ? 'recipe-print' : undefined}>
      {/* Eyebrow + title */}
      <div className="eyebrow" style={{ marginBottom: 10 }}>{recipe.category}</div>
      <div className="display" style={{ fontSize: 38, marginBottom: 16, lineHeight: 1, letterSpacing: '-0.025em' }}>
        {recipe.title}
      </div>

      {/* hero */}
      <div style={{ display: 'flex', justifyContent: 'center', margin: '8px 0 20px',
        background: 'var(--paper)', borderRadius: 'var(--radius)', padding: 24,
        border: '1px solid var(--line)' }}>
        {recipe.photo ? (
          <img src={recipe.photo} alt={recipe.title}
            style={{ width: '100%', maxWidth: 360, maxHeight: 240,
              objectFit: 'cover', borderRadius: 10 }}/>
        ) : heroIllu}
      </div>

      {/* meta */}
      {(recipe.cuisson?.length > 0 || recipe.note) && (
        <div style={{ display:'flex', gap:8, flexWrap:'wrap', marginBottom: 22 }}>
          {recipe.cuisson?.map((c, i) => (
            <span key={i} className="tag accent">{c}</span>
          ))}
        </div>
      )}

      {/* ingredients */}
      <div style={{ marginBottom: 24 }}>
        <div style={{ display:'flex', alignItems:'baseline', justifyContent:'space-between', marginBottom: 10 }}>
          <div className="display" style={{ fontSize: 22, fontStyle: 'italic' }}>Ingrédients</div>
          <div className="eyebrow">{recipe.ingredients.length}</div>
        </div>
        <ul className="checks">
          {recipe.ingredients.map((ing, i) => <li key={i}>{ing}</li>)}
        </ul>
      </div>

      {/* steps */}
      <div style={{ marginBottom: 24 }}>
        <div style={{ display:'flex', alignItems:'baseline', justifyContent:'space-between', marginBottom: 10 }}>
          <div className="display" style={{ fontSize: 22, fontStyle: 'italic' }}>Préparation</div>
          <div className="eyebrow">{recipe.steps.length} étapes</div>
        </div>
        <ol className="steps">
          {recipe.steps.map((s, i) => <li key={i}>{s}</li>)}
        </ol>
      </div>

      {/* note */}
      {recipe.note && (
        <div style={{
          padding: '16px 18px',
          background: 'var(--paper)',
          borderLeft: '2px solid var(--accent)',
          borderRadius: '0 var(--radius) var(--radius) 0',
          fontFamily: 'var(--font-display)',
          fontStyle: 'italic',
          fontSize: 17,
          lineHeight: 1.4,
          color: 'var(--ink-2)',
        }}>
          « {recipe.note} »
        </div>
      )}

      {/* rating */}
      <div style={{ marginTop: 18, display:'flex', alignItems:'center', gap: 6, justifyContent:'center' }}>
        {[1,2,3,4,5].map(i => (
          <span key={i} style={{
            width: 8, height: 8, borderRadius:'50%',
            background: i <= (recipe.rating || 5) ? 'var(--accent)' : 'var(--line-2)',
          }}/>
        ))}
      </div>
    </div>
  );
};

window.Icon = Icon;
window.TopBar = TopBar;
window.BottomNav = BottomNav;
window.Toast = Toast;
window.RecipePage = RecipePage;
