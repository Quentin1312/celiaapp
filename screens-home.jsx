/* Screens: Home, Recipes (list + detail + edit), Tools, CAP, Profile, ChefFridge */

const { useState, useEffect, useMemo, useRef } = React;

/* -------- HOME -------- */
function HomeScreen({ recipes, setTab, openRecipe, openChefFridge, profile }) {
  const Illu = window.Illu;
  const recents = [...recipes].sort((a,b)=>b.createdAt-a.createdAt).slice(0,3);
  const favs = recipes.filter(r => r.favorite).length;

  const greeting = (() => {
    const h = new Date().getHours();
    if (h < 6) return 'Bonne nuit';
    if (h < 12) return 'Bonjour';
    if (h < 18) return 'Bon après-midi';
    return 'Bonsoir';
  })();

  return (
    <div className="screen pop">
      <div style={{ marginTop: 6, marginBottom: 18 }}>
        <div style={{ fontFamily: 'var(--font-hand)', fontSize: 17, color: 'var(--ink-soft)' }}>{greeting},</div>
        <div style={{ fontFamily: 'var(--font-script)', fontSize: 38, fontWeight: 600, color: 'var(--ink)', lineHeight: 1.1 }}>
          {profile.name.split(' ')[0]} 🌸
        </div>
      </div>

      {/* Quick stats */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 16 }}>
        <div className="card tilt-l" style={{ padding: 14 }}>
          <div style={{ fontFamily: 'var(--font-script)', fontSize: 36, fontWeight: 700, color: 'var(--rose-deep)', lineHeight: 1 }}>{recipes.length}</div>
          <div style={{ fontFamily: 'var(--font-hand)', fontSize: 15, color: 'var(--ink-soft)' }}>recettes au carnet</div>
        </div>
        <div className="card tilt-r" style={{ padding: 14 }}>
          <div style={{ fontFamily: 'var(--font-script)', fontSize: 36, fontWeight: 700, color: 'var(--mint-deep)', lineHeight: 1 }}>{favs}</div>
          <div style={{ fontFamily: 'var(--font-hand)', fontSize: 15, color: 'var(--ink-soft)' }}>favorites</div>
        </div>
      </div>

      {/* Chef Frigo CTA */}
      <button
        onClick={openChefFridge}
        style={{
          width:'100%', textAlign:'left', border:'none', cursor:'pointer',
          background:'linear-gradient(135deg, var(--mint-pale), var(--rose-pale))',
          borderRadius: 18, padding: '16px 18px', marginBottom: 16,
          boxShadow: 'var(--shadow-card)', display:'flex', alignItems:'center', gap:14
        }}>
        <div className="wiggle" style={{flexShrink:0}}><Illu.WhiskBowl size={64}/></div>
        <div style={{ flex: 1 }}>
          <div style={{ fontFamily: 'var(--font-script)', fontSize: 26, fontWeight: 700, color: 'var(--ink)', lineHeight: 1 }}>Chef Frigo</div>
          <div style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: 'var(--ink-soft)', marginTop: 4 }}>
            Une recette à partir de ce que tu as ✨
          </div>
        </div>
        <div style={{ color: 'var(--rose-deep)' }}>{Icon.sparkles}</div>
      </button>

      {/* Recents */}
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'baseline', marginBottom: 8 }}>
        <span className="hand-underline" style={{ fontSize: 24 }}>Récents</span>
        <button onClick={() => setTab('recipes')} style={{ background: 'none', border: 'none', fontFamily: 'var(--font-body)', fontSize: 13, fontWeight: 600, color: 'var(--rose-deep)', cursor: 'pointer' }}>
          tout voir →
        </button>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {recents.length === 0 && (
          <div style={{ padding: 30, textAlign: 'center', fontFamily: 'var(--font-hand)', fontSize: 17, color: 'var(--ink-faint)' }}>
            Pas encore de recette. Crée la première !
          </div>
        )}
        {recents.map(r => <RecipeCard key={r.id} recipe={r} onClick={() => openRecipe(r)} />)}
      </div>
    </div>
  );
}

/* -------- RECIPE CARD (list item) -------- */
function RecipeCard({ recipe, onClick }) {
  const Illu = window.Illu;
  return (
    <button onClick={onClick} className="card pop" style={{
      textAlign:'left', border:'none', cursor:'pointer',
      display:'flex', alignItems:'center', gap: 14, padding: 12, width: '100%'
    }}>
      <div style={{
        width: 70, height: 70, borderRadius: 14,
        background: 'var(--paper-warm)',
        display:'grid', placeItems:'center', flexShrink:0,
        border: '1px solid var(--line-soft)',
        overflow: 'hidden',
        backgroundImage: recipe.photo ? `url(${recipe.photo})` : undefined,
        backgroundSize: 'cover', backgroundPosition: 'center',
      }}>
        {!recipe.photo && <Illu.ByCategory category={recipe.category} size={48}/>}
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontFamily: 'var(--font-script)', fontSize: 22, fontWeight: 600, color: 'var(--ink)', lineHeight: 1.1, whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis' }}>
          {recipe.title}
        </div>
        <div style={{ display:'flex', alignItems:'center', gap: 6, marginTop: 4, flexWrap:'wrap' }}>
          <span className={`sticker ${recipe.category === 'Entremets' ? '' : recipe.category === 'Viennoiserie' ? 'cream' : 'mint'}`} style={{ fontSize: 13, padding: '1px 8px' }}>
            {recipe.category}
          </span>
          {recipe.aiRefined && <span style={{ fontSize: 11, fontFamily:'var(--font-body)', fontWeight:600, color:'var(--mint-deep)' }}>✨ pro</span>}
        </div>
        <div style={{ fontFamily:'var(--font-body)', fontSize: 12, color:'var(--ink-faint)', marginTop: 4 }}>
          {recipe.ingredients.length} ingrédients · {recipe.steps.length} étapes
        </div>
      </div>
      <div style={{ color: recipe.favorite ? 'var(--rose-deep)' : 'var(--ink-faint)', flexShrink:0 }}>
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
      <div style={{ marginBottom: 12 }}>
        <span className="watercolor">Mes Recettes</span>
      </div>

      {/* Search */}
      <div style={{ position:'relative', marginBottom: 10 }}>
        <div style={{ position:'absolute', left: 12, top: '50%', transform:'translateY(-50%)', color:'var(--ink-faint)', width:18, height:18 }}>{Icon.search}</div>
        <input
          className="input"
          placeholder="Chercher une recette ou un ingrédient…"
          value={q}
          onChange={e => setQ(e.target.value)}
          style={{ paddingLeft: 38 }}
        />
      </div>

      {/* Filters */}
      <div className="chips" style={{ marginBottom: 14 }}>
        {window.CATEGORIES.map(c => (
          <button key={c} className={`chip ${cat === c ? 'active' : ''}`} onClick={() => setCat(c)}>{c}</button>
        ))}
      </div>

      {/* List */}
      <div style={{ display:'flex', flexDirection:'column', gap: 10 }}>
        {filtered.length === 0 && (
          <div style={{ padding: 40, textAlign:'center', fontFamily:'var(--font-hand)', fontSize: 17, color: 'var(--ink-faint)' }}>
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
