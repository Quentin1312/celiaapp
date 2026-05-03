/* Promo / Community screen */

const { useState: uSCom, useEffect: uECom } = React;

function CommunityScreen({ user, toast, onImport }) {
  const [recipes, setRecipes] = uSCom([]);
  const [loading, setLoading] = uSCom(false);
  const [err, setErr] = uSCom(null);

  uECom(() => {
    if (!window.FirebaseReady || !user) return;
    setLoading(true);
    const unsub = window.db
      .collection('publicRecipes')
      .orderBy('sharedAt', 'desc')
      .limit(50)
      .onSnapshot(
        snap => { setRecipes(snap.docs.map(d => ({ ...d.data(), _docId: d.id }))); setLoading(false); },
        e => { setErr(e.message); setLoading(false); }
      );
    return unsub;
  }, [user]);

  function handleImport(r) {
    const recipe = {
      id: window.uid(),
      title: r.title,
      category: r.category,
      ingredients: r.ingredients || [],
      steps: r.steps || [],
      cuisson: r.cuisson || [],
      note: r.note ? `${r.note}\n— Importée de ${r.authorName}` : `Importée de ${r.authorName}`,
      rating: r.rating || 5,
      favorite: false,
      aiRefined: r.aiRefined || false,
      createdAt: Date.now(),
      importedFrom: r.authorName,
    };
    onImport(recipe);
    toast(`"${recipe.title}" ajoutée à ton carnet`);
  }

  if (!window.FirebaseReady) {
    return (
      <div className="screen pop">
        <div className="topbar"><h1>Amis</h1></div>
        <div style={{ padding: '60px 22px', textAlign: 'center' }}>
          <div style={{ fontSize: 36, marginBottom: 12 }}>🔧</div>
          <div className="display" style={{ fontSize: 22, marginBottom: 10 }}>
            Firebase non configuré
          </div>
          <div style={{ fontSize: 13.5, color: 'var(--ink-3)', lineHeight: 1.6 }}>
            Ouvre <strong>firebase-config.js</strong> et remplace les valeurs<br/>
            par celles de ton projet Firebase.
          </div>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="screen pop">
        <div className="topbar"><h1>Amis</h1></div>
        <div style={{ padding: '60px 22px', textAlign: 'center' }}>
          <div style={{ fontSize: 36, marginBottom: 12 }}>👩‍🍳</div>
          <div className="display" style={{ fontSize: 24, marginBottom: 10 }}>
            Rejoins ta <span style={{ fontStyle: 'italic' }}>promo</span>
          </div>
          <div style={{ fontSize: 13.5, color: 'var(--ink-3)', lineHeight: 1.6 }}>
            Connecte-toi depuis l'onglet <strong>Profil</strong><br/>pour voir les recettes de tes amis.
          </div>
        </div>
      </div>
    );
  }

  const others = recipes.filter(r => r.authorUid !== user.uid);
  const mine   = recipes.filter(r => r.authorUid === user.uid);

  return (
    <div className="screen pop">
      <div className="topbar"><h1>Amis</h1></div>

      {err && (
        <div style={{ background: 'var(--accent-bg)', border: '1px solid var(--accent)', borderRadius: 'var(--radius)',
          padding: '10px 14px', marginBottom: 14, fontSize: 13, color: 'var(--accent)' }}>
          Erreur Firestore : {err}
        </div>
      )}

      {loading && (
        <div style={{ textAlign: 'center', padding: 32, color: 'var(--ink-4)', fontSize: 14 }}>
          Chargement…
        </div>
      )}

      {!loading && others.length === 0 && mine.length === 0 && (
        <div style={{ padding: '48px 22px', textAlign: 'center',
          border: '1px dashed var(--line-2)', borderRadius: 'var(--radius)', margin: '8px 0' }}>
          <div style={{ fontSize: 32, marginBottom: 10 }}>🍰</div>
          <div style={{ fontSize: 14, color: 'var(--ink-4)', lineHeight: 1.6 }}>
            Personne n'a encore partagé de recette.<br/>
            Sois la première — ouvre une recette et tape l'icône partage.
          </div>
        </div>
      )}

      {others.length > 0 && (
        <>
          <div className="eyebrow" style={{ marginBottom: 12 }}>
            {others.length} recette{others.length > 1 ? 's' : ''} de tes camarades
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 28 }}>
            {others.map(r => (
              <CommunityCard key={r._docId} recipe={r} isOwn={false} onImport={handleImport} />
            ))}
          </div>
        </>
      )}

      {mine.length > 0 && (
        <>
          <div className="eyebrow" style={{ marginBottom: 12 }}>Tes recettes partagées</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {mine.map(r => (
              <CommunityCard key={r._docId} recipe={r} isOwn={true} onImport={null} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

function CommunityCard({ recipe, isOwn, onImport }) {
  const Illu = window.Illu;
  return (
    <div style={{
      background: 'var(--paper-2)',
      border: '1px solid var(--line)',
      borderRadius: 'var(--radius-lg)',
      padding: 14,
      display: 'flex', alignItems: 'center', gap: 14,
    }}>
      <div style={{
        width: 60, height: 60, borderRadius: 'var(--radius)',
        background: 'var(--paper)', display: 'grid', placeItems: 'center', flexShrink: 0,
        border: '1px solid var(--line)',
      }}>
        <Illu.ByCategory category={recipe.category} size={40} />
      </div>

      <div style={{ flex: 1, minWidth: 0 }}>
        <div className="eyebrow" style={{ fontSize: 9, marginBottom: 3 }}>{recipe.category}</div>
        <div className="display" style={{
          fontSize: 17, lineHeight: 1.1, marginBottom: 4,
          whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
        }}>
          {recipe.title}
        </div>
        <div style={{ fontSize: 11.5, color: 'var(--ink-3)' }}>
          {isOwn
            ? <span style={{ color: 'var(--accent)', fontStyle: 'italic' }}>partagée ✓</span>
            : <>par <strong>{recipe.authorName}</strong></>
          }
        </div>
      </div>

      {!isOwn && onImport && (
        <button
          className="btn btn-ghost"
          onClick={() => onImport(recipe)}
          style={{ flexShrink: 0, padding: '7px 12px', fontSize: 12 }}
        >
          + Ajouter
        </button>
      )}
    </div>
  );
}

window.CommunityScreen = CommunityScreen;
