/* App root + Tweaks */

const { useState: uSA, useEffect: uEA } = React;

const THEME_KEY = 'patisserie.theme.v1';
const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "palette": "default",
  "fonts": "dm-inter"
}/*EDITMODE-END*/;

function App() {
  const [tab, setTab] = uSA('home');
  const [recipes, setRecipes] = uSA(() => window.Storage.load() || window.SEED_RECIPES);
  const [profile, setProfile] = uSA(() => window.Storage.loadProfile());
  const [view, setView] = uSA({ kind: 'tab' }); // tab | recipe | editor | fridge
  const [toastMsg, setToastMsg] = uSA(null);

  uEA(() => { window.Storage.save(recipes); }, [recipes]);

  const toast = (m) => setToastMsg(m);

  // Tweaks avec persistance localStorage
  const tweakInit = (() => {
    try { return { ...TWEAK_DEFAULTS, ...JSON.parse(localStorage.getItem(THEME_KEY)) }; }
    catch(e) { return TWEAK_DEFAULTS; }
  })();
  const [tweaks, _setTweak] = window.useTweaks ? window.useTweaks(tweakInit) : [tweakInit, () => {}];
  const setTweak = (key, val) => {
    _setTweak(key, val);
    try {
      const cur = JSON.parse(localStorage.getItem(THEME_KEY)) || {};
      localStorage.setItem(THEME_KEY, JSON.stringify({ ...cur, [key]: val }));
    } catch(e) {}
  };

  uEA(() => {
    document.documentElement.dataset.palette = tweaks.palette === 'default' ? '' : tweaks.palette;
    document.documentElement.dataset.fonts = tweaks.fonts || 'dm-inter';
  }, [tweaks]);

  function openRecipe(r) { setView({ kind: 'recipe', id: r.id }); }
  function openEditor(r) { setView({ kind: 'editor', recipe: r }); }
  function openFridge() { setView({ kind: 'fridge' }); }
  function openChat()  { setView({ kind: 'chat' }); }
  function closeOverlay() { setView({ kind: 'tab' }); }

  function saveRecipe(r) {
    setRecipes(arr => {
      const exists = arr.find(x => x.id === r.id);
      if (exists) return arr.map(x => x.id === r.id ? r : x);
      return [r, ...arr];
    });
    toast(view.recipe ? 'Recette modifiée' : 'Recette ajoutée');
    setView({ kind: 'recipe', id: r.id });
  }
  function updateRecipe(r) {
    setRecipes(arr => arr.map(x => x.id === r.id ? r : x));
  }
  function deleteRecipe(r) {
    setRecipes(arr => arr.filter(x => x.id !== r.id));
    setView({ kind: 'tab' });
    setTab('recipes');
    toast('Supprimée');
  }
  function toggleFav(r) {
    setRecipes(arr => arr.map(x => x.id === r.id ? { ...x, favorite: !x.favorite } : x));
  }
  function resetSeed() {
    if (confirm('Recharger les recettes d\'exemple ? Tes recettes ne seront pas supprimées.')) {
      setRecipes(arr => {
        const ids = new Set(arr.map(r => r.id));
        const toAdd = window.SEED_RECIPES.filter(r => !ids.has(r.id));
        return [...toAdd, ...arr];
      });
      toast('Exemples rechargés');
    }
  }

  // overlays
  if (view.kind === 'recipe') {
    const r = recipes.find(x => x.id === view.id);
    if (!r) { setView({ kind: 'tab' }); return null; }
    return (
      <div className="app-shell">
        <window.RecipeDetail
          recipe={r}
          onBack={closeOverlay}
          onEdit={openEditor}
          onDelete={deleteRecipe}
          onToggleFav={toggleFav}
          onUpdate={updateRecipe}
          toast={toast}
        />
        {toastMsg && <window.Toast msg={toastMsg} onDone={() => setToastMsg(null)}/>}
      </div>
    );
  }
  if (view.kind === 'editor') {
    return (
      <div className="app-shell">
        <window.RecipeEditor recipe={view.recipe} onCancel={closeOverlay} onSave={saveRecipe}/>
        {toastMsg && <window.Toast msg={toastMsg} onDone={() => setToastMsg(null)}/>}
      </div>
    );
  }
  if (view.kind === 'fridge') {
    return (
      <div className="app-shell">
        <window.ChefFridge onBack={closeOverlay} onSave={(r) => { saveRecipe(r); }} toast={toast}/>
        {toastMsg && <window.Toast msg={toastMsg} onDone={() => setToastMsg(null)}/>}
      </div>
    );
  }
  if (view.kind === 'chat') {
    return (
      <div className="app-shell" style={{ display:'flex', flexDirection:'column' }}>
        <window.ChefChat onBack={closeOverlay} toast={toast}/>
        {toastMsg && <window.Toast msg={toastMsg} onDone={() => setToastMsg(null)}/>}
      </div>
    );
  }

  return (
    <div className="app-shell">
      {tab === 'home' && <window.HomeScreen recipes={recipes} setTab={setTab} openRecipe={openRecipe} openChefFridge={openFridge} openChefChat={openChat} profile={profile}/>}
      {tab === 'recipes' && <window.RecipesScreen recipes={recipes} openRecipe={openRecipe} openEditor={openEditor}/>}
      {tab === 'tools' && <window.ToolsScreen/>}
      {tab === 'cap' && <window.RevisionsScreen/>}
      {tab === 'profile' && <window.ProfileScreen profile={profile} setProfile={setProfile} recipes={recipes} onResetSeed={resetSeed} tweaks={tweaks} setTweak={setTweak}/>}
      <window.BottomNav tab={tab} setTab={setTab}/>
      {toastMsg && <window.Toast msg={toastMsg} onDone={() => setToastMsg(null)}/>}

      {window.TweaksPanel && (
        <window.TweaksPanel title="Tweaks">
          <window.TweakSection label="Palette">
            <window.TweakSelect
              value={tweaks.palette}
              onChange={(v) => setTweak('palette', v)}
              options={[
                { value: 'default', label: 'Crème & encre' },
                { value: 'sauge', label: 'Sauge & cuivre' },
                { value: 'rose', label: 'Rose poudré' },
                { value: 'charbon', label: 'Charbon & or (sombre)' },
              ]}
            />
          </window.TweakSection>
          <window.TweakSection label="Pairing typographique">
            <window.TweakSelect
              value={tweaks.fonts}
              onChange={(v) => setTweak('fonts', v)}
              options={[
                { value: 'dm-inter', label: 'DM Serif + Inter' },
                { value: 'fraunces', label: 'Fraunces + Inter' },
                { value: 'instrument', label: 'Instrument + Inter' },
              ]}
            />
          </window.TweakSection>
        </window.TweaksPanel>
      )}
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App/>);
