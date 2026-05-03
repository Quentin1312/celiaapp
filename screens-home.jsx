/* Screens: Home, Recipes list — refonte épurée éditoriale */

const { useState, useEffect, useMemo, useRef } = React;

/* -------- HOME -------- */
function HomeScreen({ recipes, setTab, openRecipe, openChefFridge, openChefChat, profile }) {
  const Illu = window.Illu;
  const recents = [...recipes].sort((a,b)=>b.createdAt-a.createdAt).slice(0,3);
  const favs = recipes.filter(r => r.favorite).length;
  const aiRefined = recipes.filter(r => r.aiRefined).length;

  const greeting = (() => {
    const h = new Date().getHours();
    if (h < 6) return 'Bonne nuit';
    if (h < 12) return 'Bonjour';
    if (h < 18) return 'Bon après-midi';
    return 'Bonsoir';
  })();

  const today = new Date().toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' });

  return (
    <div className="screen pop">

      {/* ── Hero éditorial ── */}
      <div style={{
        margin: '0 -22px 28px',
        padding: '32px 22px 28px',
        background: 'var(--paper)',
        position: 'relative',
        borderBottom: '1px solid var(--line)',
      }}>
        <div className="eyebrow" style={{ marginBottom: 14 }}>{today}</div>
        <div style={{ display:'flex', alignItems:'flex-end', justifyContent:'space-between', gap: 16 }}>
          <div className="display" style={{ fontSize: 44, lineHeight: 0.95 }}>
            {greeting},<br/>
            <span style={{ fontStyle: 'italic', color: 'var(--accent)' }}>{profile.name.split(' ')[0]}.</span>
          </div>
        </div>
        <div style={{ marginTop: 18, fontSize: 14, color: 'var(--ink-3)', lineHeight: 1.5, maxWidth: 320 }}>
          Ton carnet personnel, organisé avec soin pour ton CAP.
        </div>
      </div>

      {/* ── Stats trio (minimaliste) ── */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 0,
        marginBottom: 28,
        borderTop: '1px solid var(--line)',
        borderBottom: '1px solid var(--line)',
        padding: '18px 0' }}>
        <Stat n={recipes.length} label="Recettes"/>
        <Stat n={favs} label="Favoris" sep/>
        <Stat n={aiRefined} label="Pro" sep/>
      </div>

      {/* ── CTA Chef Frigo (carte hero éditoriale) ── */}
      <button
        onClick={openChefFridge}
        className="card-elev"
        style={{
          width:'100%', textAlign:'left', cursor:'pointer',
          background: 'var(--ink)', color: 'var(--paper)',
          borderRadius: 'var(--radius-lg)',
          padding: '24px 22px',
          marginBottom: 12,
          display:'flex', alignItems:'center', gap: 16,
          border: 'none',
          position: 'relative', overflow: 'hidden',
        }}>
        <div style={{ position: 'absolute', right: -10, bottom: -16, opacity: 0.18, pointerEvents:'none' }}>
          <Illu.WhiskBowl size={140}/>
        </div>
        <div style={{ flex: 1, position: 'relative' }}>
          <div className="eyebrow" style={{ color: 'var(--accent-soft)', marginBottom: 8 }}>Assistant IA</div>
          <div className="display" style={{ fontSize: 26, color: 'var(--paper)', marginBottom: 6 }}>
            Chef <span style={{ fontStyle: 'italic' }}>Frigo</span>
          </div>
          <div style={{ fontSize: 13, color: 'rgba(245,240,232,.7)', lineHeight: 1.4 }}>
            Une recette avec ce qui te reste.
          </div>
        </div>
        <div style={{ color: 'var(--accent-soft)', position: 'relative' }}>{Icon.arrowR}</div>
      </button>

      {/* ── CTA Chef Chat ── */}
      <button
        onClick={openChefChat}
        style={{
          width:'100%', textAlign:'left', cursor:'pointer',
          background: 'var(--paper-2)',
          border: '1px solid var(--line)',
          borderRadius: 'var(--radius-lg)',
          padding: '18px 20px',
          marginBottom: 32,
          display:'flex', alignItems:'center', gap: 14,
        }}>
        <div style={{
          width: 44, height: 44, borderRadius: '50%',
          background: 'var(--accent-bg)',
          display: 'grid', placeItems: 'center',
          color: 'var(--accent-ink)',
          flexShrink: 0,
        }}>{Icon.sparkles}</div>
        <div style={{ flex: 1 }}>
          <div className="display" style={{ fontSize: 19 }}>
            Chef <span style={{ fontStyle:'italic' }}>Ganache</span>
          </div>
          <div style={{ fontSize: 12.5, color: 'var(--ink-3)', marginTop: 2 }}>
            Pose une question technique
          </div>
        </div>
        <div style={{ color: 'var(--ink-4)' }}>{Icon.chevR}</div>
      </button>

      {/* ── Récents ── */}
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'baseline', marginBottom: 14 }}>
        <div>
          <div className="eyebrow" style={{ marginBottom: 4 }}>Carnet</div>
          <div className="display" style={{ fontSize: 26 }}>Récemment <span style={{ fontStyle:'italic' }}>ajoutées</span></div>
        </div>
        <button onClick={() => setTab('recipes')} style={{
          background:'none', border:'none', cursor:'pointer',
          fontSize: 12, fontWeight: 500, color: 'var(--ink-3)',
          letterSpacing: '0.05em',
        }}>
          Tout →
        </button>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {recents.length === 0 && (
          <div style={{ padding: 28, textAlign: 'center', fontSize: 14, color: 'var(--ink-4)',
            border: '1px dashed var(--line-2)', borderRadius: 'var(--radius)' }}>
            Pas encore de recette. Crée la première.
          </div>
        )}
        {recents.map(r => <RecipeCard key={r.id} recipe={r} onClick={() => openRecipe(r)} />)}
      </div>
    </div>
  );
}

function Stat({ n, label, sep }) {
  return (
    <div style={{
      textAlign: 'center',
      borderLeft: sep ? '1px solid var(--line)' : 'none',
    }}>
      <div className="display" style={{ fontSize: 32, lineHeight: 1 }}>{n}</div>
      <div className="eyebrow" style={{ marginTop: 6, fontSize: 10 }}>{label}</div>
    </div>
  );
}

/* -------- RECIPE CARD -------- */
function RecipeCard({ recipe, onClick }) {
  const Illu = window.Illu;

  return (
    <button onClick={onClick} style={{
      textAlign:'left', border:'1px solid var(--line)', cursor:'pointer',
      background: 'var(--paper-2)',
      borderRadius: 'var(--radius-lg)',
      display:'flex', alignItems:'center', gap: 14, padding: 12, width: '100%',
      transition: 'border-color .15s, transform .15s',
      position: 'relative',
      fontFamily: 'var(--font-body)',
    }}
      onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--ink-3)'; }}
      onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--line)'; }}
    >
      {/* Photo / illu */}
      <div style={{
        width: 76, height: 76, borderRadius: 'var(--radius)',
        background: 'var(--paper)',
        display:'grid', placeItems:'center', flexShrink:0,
        border: '1px solid var(--line)',
        overflow: 'hidden',
        backgroundImage: recipe.photo ? `url(${recipe.photo})` : undefined,
        backgroundSize: 'cover', backgroundPosition: 'center',
      }}>
        {!recipe.photo && <Illu.ByCategory category={recipe.category} size={50}/>}
      </div>

      <div style={{ flex: 1, minWidth: 0 }}>
        <div className="eyebrow" style={{ fontSize: 9.5, marginBottom: 4 }}>{recipe.category}</div>
        <div className="display" style={{ fontSize: 19, lineHeight: 1.05, whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis', marginBottom: 4 }}>
          {recipe.title}
        </div>
        <div style={{ display:'flex', alignItems:'center', gap: 8, fontSize: 11.5, color:'var(--ink-3)' }}>
          <span>{recipe.ingredients.length} ingr.</span>
          <span style={{ width: 2, height: 2, borderRadius: '50%', background: 'var(--ink-4)' }}/>
          <span>{recipe.steps.length} étapes</span>
          {recipe.aiRefined && <>
            <span style={{ width: 2, height: 2, borderRadius: '50%', background: 'var(--ink-4)' }}/>
            <span style={{ color: 'var(--accent)', fontWeight: 500, fontStyle: 'italic', fontFamily: 'var(--font-display)' }}>pro</span>
          </>}
        </div>
      </div>

      <div style={{ color: recipe.favorite ? 'var(--accent)' : 'var(--ink-4)', flexShrink:0 }}>
        {recipe.favorite ? Icon.heart : Icon.heartO}
      </div>
    </button>
  );
}

/* -------- RECIPES LIST -------- */
function RecipesScreen({ recipes, openRecipe, openEditor }) {
  const [q, setQ] = useState('');
  const [cat, setCat] = useState('Tout');

  const filtered = useMemo(() => {
    return recipes.filter(r => {
      if (cat !== 'Tout' && r.category !== cat) return false;
      if (!q) return true;
      const ql = q.toLowerCase();
      if (r.title.toLowerCase().includes(ql)) return true;
      if (r.ingredients.some(i => i.toLowerCase().includes(ql))) return true;
      return false;
    }).sort((a,b)=>b.createdAt-a.createdAt);
  }, [recipes, q, cat]);

  return (
    <div className="screen pop">
      <div className="topbar">
        <h1>Recettes</h1>
      </div>

      <div className="eyebrow" style={{ marginBottom: 14 }}>{recipes.length} au carnet</div>

      {/* Search */}
      <div style={{ position:'relative', marginBottom: 14 }}>
        <div style={{ position:'absolute', left: 14, top: '50%', transform:'translateY(-50%)', color:'var(--ink-4)' }}>{Icon.search}</div>
        <input
          className="input"
          placeholder="Chercher une recette, un ingrédient…"
          value={q}
          onChange={e => setQ(e.target.value)}
          style={{ paddingLeft: 42 }}
        />
      </div>

      {/* Filters */}
      <div className="chips" style={{ marginBottom: 18 }}>
        {window.CATEGORIES.map(c => (
          <button key={c} className={`chip ${cat === c ? 'active' : ''}`} onClick={() => setCat(c)}>{c}</button>
        ))}
      </div>

      {/* List */}
      <div style={{ display:'flex', flexDirection:'column', gap: 10 }}>
        {filtered.length === 0 && (
          <div style={{ padding: 40, textAlign:'center', fontSize: 14, color: 'var(--ink-4)' }}>
            Aucune recette trouvée.<br/>Tape sur ＋ pour en créer une.
          </div>
        )}
        {filtered.map(r => <RecipeCard key={r.id} recipe={r} onClick={() => openRecipe(r)} />)}
      </div>

      <button className="fab" onClick={() => openEditor(null)} aria-label="Nouvelle recette">
        {Icon.plus}
      </button>
    </div>
  );
}

window.HomeScreen = HomeScreen;
window.RecipesScreen = RecipesScreen;
window.RecipeCard = RecipeCard;
