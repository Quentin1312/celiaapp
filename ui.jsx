/* Reusable bits: icons, top bar, bottom nav, recipe page (notebook style) */

const Icon = {
  home: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12L12 4l9 8"/><path d="M5 10v10h14V10"/></svg>,
  book: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h12a4 4 0 014 4v12H8a4 4 0 01-4-4V4z"/><path d="M4 4a4 4 0 014 4v12"/></svg>,
  tools: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/><circle cx="12" cy="12" r="4"/></svg>,
  cap: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c0 1.5 3 3 6 3s6-1.5 6-3v-5"/></svg>,
  user: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 4-7 8-7s8 3 8 7"/></svg>,
  back: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 6 9 12 15 18"/></svg>,
  search: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.5-4.5"/></svg>,
  plus: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round"><path d="M12 5v14M5 12h14"/></svg>,
  trash: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2M6 6l1 14a2 2 0 002 2h6a2 2 0 002-2l1-14"/></svg>,
  edit: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 4l6 6L8 22H2v-6z"/></svg>,
  download: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3v14"/><polyline points="6 11 12 17 18 11"/><path d="M4 21h16"/></svg>,
  sparkles: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3l1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5z"/><path d="M19 16l.7 2.3 2.3.7-2.3.7L19 22l-.7-2.3-2.3-.7 2.3-.7z"/></svg>,
  heart: <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 21l-9-9a5 5 0 117-7l2 2 2-2a5 5 0 117 7z"/></svg>,
  heartO: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 21l-9-9a5 5 0 117-7l2 2 2-2a5 5 0 117 7z"/></svg>,
  play: <svg viewBox="0 0 24 24" fill="currentColor"><polygon points="6 4 20 12 6 20" /></svg>,
  pause: <svg viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>,
  reset: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="1 4 1 10 7 10"/><path d="M3.5 15a9 9 0 102.6-9.7L1 10"/></svg>,
  close: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg>,
  fridge: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="5" y="2" width="14" height="20" rx="2"/><path d="M5 10h14M9 6v2M9 14v3"/></svg>,
  bell: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 01-3.46 0"/></svg>,
  camera: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z"/><circle cx="12" cy="13" r="4"/></svg>,
  save: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v11a2 2 0 01-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/></svg>,
  warning: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>,
  tip: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>,
};

const TopBar = ({ title, onBack, accent }) => (
  <div className="topbar scrim">
    {onBack && <button className="back" onClick={onBack}>{Icon.back}</button>}
    <h1 style={accent ? { color: 'var(--rose-deep)' } : {}}>{title}</h1>
  </div>
);

const BottomNav = ({ tab, setTab }) => {
  const items = [
    { key: 'home', label: 'Accueil', icon: Icon.home },
    { key: 'recipes', label: 'Recettes', icon: Icon.book },
    { key: 'tools', label: 'Outils', icon: Icon.tools },
    { key: 'cap', label: 'Réviser', icon: Icon.cap },
    { key: 'profile', label: 'Profil', icon: Icon.user },
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

/* Recipe page — illustrated notebook view, used in detail screen and PDF export */
const RecipePage = ({ recipe, forPrint = false }) => {
  const Illu = window.Illu;
  const cat = (recipe.category || '').toLowerCase();
  const heroIllu = recipe.illu === 'cake' || cat === 'entremets' ? <Illu.CakeSlice size={130}/>
    : recipe.illu === 'crepe' ? <Illu.CrepeStack size={130}/>
    : cat === 'viennoiserie' ? <Illu.Croissant size={130}/>
    : <Illu.WhiskBowl size={120}/>;

  const sideIllus = [
    <Illu.MilkBottle size={50}/>,
    <Illu.WhiskBowl size={56}/>,
    <Illu.Egg size={36}/>,
    <Illu.FlourBag size={44}/>,
    <Illu.VanillaPod size={32}/>,
    <Illu.Berries size={42}/>,
    <Illu.Chocolate size={42}/>,
  ];

  return (
    <div className="recipe-page" id={forPrint ? 'recipe-print' : undefined}>
      {/* heading */}
      <div style={{ textAlign: 'center', marginBottom: 8 }}>
        <span className="watercolor">{recipe.title}</span>
      </div>

      {/* hero — photo if present, else illustration */}
      <div style={{ display: 'flex', justifyContent: 'center', margin: '6px 0 14px' }}>
        {recipe.photo ? (
          <img src={recipe.photo} alt={recipe.title}
            style={{
              width: '100%', maxWidth: 320, maxHeight: 220,
              objectFit: 'cover', borderRadius: 14,
              border: '1px solid var(--line)',
              boxShadow: 'var(--shadow-soft)',
              transform: 'rotate(-.6deg)',
            }}/>
        ) : heroIllu}
      </div>

      {/* ingredients */}
      <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start', marginBottom: 18 }}>
        <div style={{ paddingTop: 18, flexShrink: 0 }}>{sideIllus[0]}</div>
        <div style={{ flex: 1 }}>
          <div style={{ marginBottom: 6 }}><span className="hand-underline">Ingrédients</span></div>
          <ul className="checks">
            {recipe.ingredients.map((ing, i) => <li key={i}>{ing}</li>)}
          </ul>
        </div>
      </div>

      {/* steps */}
      <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start', marginBottom: 18 }}>
        <div style={{ flex: 1 }}>
          <div style={{ marginBottom: 6 }}><span className="hand-underline">Préparation</span></div>
          <ol className="steps">
            {recipe.steps.map((s, i) => <li key={i}>{s}</li>)}
          </ol>
        </div>
        <div style={{ paddingTop: 28, flexShrink: 0 }}>{sideIllus[1]}</div>
      </div>

      {/* cuisson */}
      {recipe.cuisson && recipe.cuisson.length > 0 && (
        <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start', marginBottom: 14 }}>
          <div style={{ paddingTop: 22, flexShrink: 0 }}><Illu.PanButter size={56}/></div>
          <div style={{ flex: 1 }}>
            <div style={{ marginBottom: 6 }}><span className="hand-underline">Cuisson</span></div>
            <ul className="checks">
              {recipe.cuisson.map((c, i) => <li key={i}>{c}</li>)}
            </ul>
          </div>
        </div>
      )}

      {/* footer: stars + note + sticker */}
      <div style={{ marginTop: 18, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
        <div style={{ display: 'flex', gap: 3 }}>
          {[1,2,3,4,5].map(i => <Illu.Star key={i} size={18} fill={i <= (recipe.rating || 5) ? '#f0c860' : '#e0d4b8'}/>)}
        </div>
        {recipe.note && (
          <div style={{ fontFamily: 'var(--font-hand)', fontSize: 17, color: 'var(--ink)', display: 'flex', alignItems: 'center', gap: 6, textAlign: 'center' }}>
            {recipe.note}
          </div>
        )}
      </div>

      {/* corner heart sticker */}
      <div style={{ position: 'absolute', bottom: 14, right: 14 }}>
        <Illu.Heart size={26}/>
      </div>
    </div>
  );
};

window.Icon = Icon;
window.TopBar = TopBar;
window.BottomNav = BottomNav;
window.Toast = Toast;
window.RecipePage = RecipePage;
