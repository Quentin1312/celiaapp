/* Screens: Home, Recipes (list + detail + edit), Tools, CAP, Profile, ChefFridge */

const { useState, useEffect, useMemo, useRef } = React;

/* -------- HOME -------- */
function HomeScreen({ recipes, setTab, openRecipe, openChefFridge, openChefChat, profile }) {
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

      {/* ── Hero banner ── */}
      <div style={{
        margin: '-18px -18px 22px',
        background: 'linear-gradient(145deg, var(--rose-pale) 0%, #fdf4e8 45%, var(--mint-pale) 100%)',
        padding: '28px 22px 26px',
        position: 'relative',
        overflow: 'hidden',
        borderBottom: '1px solid var(--line-soft)',
      }}>
        {/* Illus décoratives en fond */}
        <div style={{ position:'absolute', top:-10, right:-10, opacity:0.2, transform:'rotate(22deg)' }}>
          <Illu.Croissant size={100}/>
        </div>
        <div style={{ position:'absolute', bottom:-16, right:52, opacity:0.14, transform:'rotate(-6deg)' }}>
          <Illu.CakeSlice size={110}/>
        </div>
        <div style={{ position:'absolute', top:14, right:104, opacity:0.5 }}>
          <Illu.Star size={16} fill="var(--gold)"/>
        </div>
        <div style={{ position:'absolute', top:44, right:28, opacity:0.35 }}>
          <Illu.Star size={10} fill="var(--rose-deep)"/>
        </div>
        <div style={{ position:'absolute', bottom:14, right:24, opacity:0.25 }}>
          <Illu.Star size={13} fill="var(--mint-deep)"/>
        </div>

        {/* Contenu texte */}
        <div style={{ fontFamily:'var(--font-hand)', fontSize:16, color:'var(--ink-soft)', marginBottom:2 }}>
          {greeting} 👋
        </div>
        <div style={{ fontFamily:'var(--font-script)', fontSize:50, fontWeight:700, color:'var(--ink)', lineHeight:1, marginBottom:12 }}>
          {profile.name.split(' ')[0]}
        </div>
        <div style={{
          display:'inline-flex', alignItems:'center', gap:6,
          background:'rgba(255,255,255,.65)',
          borderRadius:999, padding:'5px 14px',
          border:'1px solid rgba(191,86,86,.2)',
          backdropFilter:'blur(6px)',
        }}>
          <span style={{ fontFamily:'var(--font-hand)', fontSize:14, color:'var(--rose-deep)' }}>
            ✨ Mon carnet de pâtisserie
          </span>
        </div>
      </div>

      {/* Quick stats */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 18 }}>
        <div className="card tilt-l" style={{ padding: 16, background:'linear-gradient(135deg, var(--rose-pale), var(--paper))' }}>
          <div style={{ fontFamily:'var(--font-script)', fontSize:44, fontWeight:700, color:'var(--rose-deep)', lineHeight:1 }}>{recipes.length}</div>
          <div style={{ fontFamily:'var(--font-hand)', fontSize:15, color:'var(--ink-soft)', marginTop:2 }}>recettes au carnet</div>
        </div>
        <div className="card tilt-r" style={{ padding: 16, background:'linear-gradient(135deg, var(--mint-pale), var(--paper))' }}>
          <div style={{ fontFamily:'var(--font-script)', fontSize:44, fontWeight:700, color:'var(--mint-deep)', lineHeight:1 }}>{favs}</div>
          <div style={{ fontFamily:'var(--font-hand)', fontSize:15, color:'var(--ink-soft)', marginTop:2 }}>favorites ♡</div>
        </div>
      </div>

      {/* Chef Frigo CTA */}
      <button
        onClick={openChefFridge}
        style={{
          width:'100%', textAlign:'left', border:'none', cursor:'pointer',
          background:'linear-gradient(130deg, var(--mint-pale) 0%, #fdf4e8 55%, var(--rose-pale) 100%)',
          borderRadius: 20, padding: '20px 20px', marginBottom: 18,
          boxShadow: '0 1px 0 rgba(255,255,255,.9) inset, 0 4px 18px rgba(58,42,31,.10)',
          display:'flex', alignItems:'center', gap:16,
          outline: '1px solid var(--line-soft)',
        }}>
        <div className="wiggle" style={{flexShrink:0}}><Illu.WhiskBowl size={76}/></div>
        <div style={{ flex: 1 }}>
          <div style={{ fontFamily:'var(--font-script)', fontSize:30, fontWeight:700, color:'var(--ink)', lineHeight:1 }}>Chef Frigo</div>
          <div style={{ fontFamily:'var(--font-hand)', fontSize:15, color:'var(--ink-soft)', marginTop:6, lineHeight:1.35 }}>
            Une recette avec ce que tu as<br/>dans ton frigo
          </div>
        </div>
        <div style={{ color:'var(--rose-deep)', flexShrink:0 }}>{Icon.sparkles}</div>
      </button>

      {/* Chef Classique CTA */}
      <button
        onClick={openChefChat}
        style={{
          width:'100%', textAlign:'left', border:'none', cursor:'pointer',
          background:'linear-gradient(130deg, var(--gold-pale) 0%, var(--cream) 55%, var(--paper-warm) 100%)',
          borderRadius: 20, padding: '16px 20px', marginBottom: 22,
          boxShadow: '0 1px 0 rgba(255,255,255,.9) inset, 0 4px 18px rgba(58,42,31,.08)',
          display:'flex', alignItems:'center', gap:14,
          outline: '1px solid var(--line-soft)',
        }}>
        <div style={{flexShrink:0}}><Illu.ChefGanache size={48}/></div>
        <div style={{ flex: 1 }}>
          <div style={{ fontFamily:'var(--font-script)', fontSize:26, fontWeight:700, color:'var(--ink)', lineHeight:1 }}>Chef Classique</div>
          <div style={{ fontFamily:'var(--font-hand)', fontSize:14, color:'var(--ink-soft)', marginTop:5, lineHeight:1.35 }}>
            Pose tes questions pâtisserie<br/>à notre chef IA
          </div>
        </div>
        <div style={{ color:'var(--gold)', flexShrink:0 }}>{Icon.sparkles}</div>
      </button>

      {/* Recents */}
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'baseline', marginBottom: 10 }}>
        <span className="hand-underline" style={{ fontSize: 26 }}>Récents</span>
        <button onClick={() => setTab('recipes')} style={{ background:'none', border:'none', fontFamily:'var(--font-script)', fontSize:18, fontWeight:600, color:'var(--rose-deep)', cursor:'pointer', letterSpacing:'.2px' }}>
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
  const accentColor = recipe.category === 'Viennoiserie' ? 'var(--cream-deep)'
    : recipe.category === 'Entremets' ? 'var(--rose-deep)'
    : recipe.category === 'Crèmes' ? 'var(--gold)'
    : 'var(--mint-deep)';

  return (
    <button onClick={onClick} className="card pop" style={{
      textAlign:'left', border:'none', cursor:'pointer',
      display:'flex', alignItems:'center', gap: 14, padding: 10, width: '100%',
      overflow: 'hidden',
    }}>
      {/* Barre accent catégorie */}
      <div style={{
        position:'absolute', left:0, top:10, bottom:10, width:4,
        background: accentColor, borderRadius:'0 4px 4px 0', opacity:0.75,
      }}/>

      {/* Photo / illustration */}
      <div style={{
        width: 88, height: 88, borderRadius: 16,
        background: 'var(--paper-warm)',
        display:'grid', placeItems:'center', flexShrink:0,
        border: '1px solid var(--line-soft)',
        overflow: 'hidden', marginLeft: 8,
        backgroundImage: recipe.photo ? `url(${recipe.photo})` : undefined,
        backgroundSize: 'cover', backgroundPosition: 'center',
        boxShadow: '0 2px 8px rgba(58,42,31,.08)',
      }}>
        {!recipe.photo && <Illu.ByCategory category={recipe.category} size={58}/>}
      </div>

      {/* Infos */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontFamily:'var(--font-script)', fontSize:23, fontWeight:700, color:'var(--ink)', lineHeight:1.1, whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis' }}>
          {recipe.title}
        </div>
        <div style={{ display:'flex', alignItems:'center', gap:6, marginTop:5, flexWrap:'wrap' }}>
          <span className={`sticker ${recipe.category === 'Entremets' ? '' : recipe.category === 'Viennoiserie' ? 'cream' : 'mint'}`} style={{ fontSize:12, padding:'2px 9px' }}>
            {recipe.category}
          </span>
          {recipe.aiRefined && <span style={{ fontSize:11, fontFamily:'var(--font-body)', fontWeight:700, color:'var(--mint-deep)' }}>✨ pro</span>}
        </div>
        <div style={{ fontFamily:'var(--font-body)', fontSize:12, color:'var(--ink-faint)', marginTop:5 }}>
          {recipe.ingredients.length} ingrédients · {recipe.steps.length} étapes
        </div>
      </div>

      {/* Favori */}
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
