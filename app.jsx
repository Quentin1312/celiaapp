/* App root + Tweaks */

const { useState: uSA, useEffect: uEA } = React;

function App() {
  const [tab, setTab] = uSA('home');
  const [recipes, setRecipes] = uSA(() => window.Storage.load() || window.SEED_RECIPES);
  const [profile, setProfile] = uSA(() => window.Storage.loadProfile());
  const [view, setView] = uSA({ kind: 'tab' }); // tab | recipe | editor | fridge
  const [toastMsg, setToastMsg] = uSA(null);

  uEA(() => { window.Storage.save(recipes); }, [recipes]);

  const toast = (m) => setToastMsg(m);

  // Tweaks
  const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
    "palette": "default",
    "paperTexture": "normal",
    "cardStyle": "soft"
  }/*EDITMODE-END*/;
  const [tweaks, setTweak] = window.useTweaks ? window.useTweaks(TWEAK_DEFAULTS) : [TWEAK_DEFAULTS, () => {}];

  uEA(() => {
    document.documentElement.dataset.palette = tweaks.palette === 'default' ? '' : tweaks.palette;
    document.documentElement.dataset.paper = tweaks.paperTexture;
    document.documentElement.dataset.card = tweaks.cardStyle;
  }, [tweaks]);

  function openRecipe(r) { setView({ kind: 'recipe', id: r.id }); }
  function openEditor(r) { setView({ kind: 'editor', recipe: r }); }
  function openFridge() { setView({ kind: 'fridge' }); }
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

  return (
    <div className="app-shell">
      {tab === 'home' && <window.HomeScreen recipes={recipes} setTab={setTab} openRecipe={openRecipe} openChefFridge={openFridge} profile={profile}/>}
      {tab === 'recipes' && <window.RecipesScreen recipes={recipes} openRecipe={openRecipe} openEditor={openEditor}/>}
      {tab === 'tools' && <window.ToolsScreen/>}
      {tab === 'cap' && <window.RevisionsScreen/>}
      {tab === 'profile' && <window.ProfileScreen profile={profile} setProfile={setProfile} recipes={recipes} onResetSeed={resetSeed}/>}
      <window.BottomNav tab={tab} setTab={setTab}/>
      {toastMsg && <window.Toast msg={toastMsg} onDone={() => setToastMsg(null)}/>}

      {window.TweaksPanel && (
        <window.TweaksPanel title="Tweaks">
          <window.TweakSection label="Palette">
            <window.TweakRadio
              value={tweaks.palette}
              onChange={(v) => setTweak('palette', v)}
              options={[
                { value: 'default', label: 'Rose & menthe' },
                { value: 'warm', label: 'Vanille' },
                { value: 'fresh', label: 'Sauge' },
              ]}
            />
          </window.TweakSection>
          <window.TweakSection label="Texture papier">
            <window.TweakRadio
              value={tweaks.paperTexture}
              onChange={(v) => setTweak('paperTexture', v)}
              options={[
                { value: 'subtle', label: 'Discrète' },
                { value: 'normal', label: 'Normale' },
                { value: 'strong', label: 'Marquée' },
              ]}
            />
          </window.TweakSection>
        </window.TweaksPanel>
      )}
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App/>);
