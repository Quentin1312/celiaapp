/* Storage helpers + AI helpers + seed data */

const STORAGE_KEY = 'patisserie.recipes.v1';
const PROFILE_KEY = 'patisserie.profile.v1';
const QUIZBANK_KEY = 'patisserie.quizbank.v1';   // quiz IA générés
const PHOTOQUIZ_KEY = 'patisserie.photoquiz.v1'; // quiz issus de photos

const Storage = {
  load() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return null;
      return JSON.parse(raw);
    } catch (e) { return null; }
  },
  save(recipes) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(recipes));
  },
  loadProfile() {
    try {
      return JSON.parse(localStorage.getItem(PROFILE_KEY)) || { name: 'Célia', level: 'CAP 1ère année' };
    } catch (e) { return { name: 'Célia', level: 'CAP 1ère année' }; }
  },
  saveProfile(p) { localStorage.setItem(PROFILE_KEY, JSON.stringify(p)); },

  /* ---- IA-generated quiz pool (questions individuelles, pas un quiz nommé) ---- */
  loadQuizBank() {
    try { return JSON.parse(localStorage.getItem(QUIZBANK_KEY)) || []; }
    catch (e) { return []; }
  },
  saveQuizBank(arr) { localStorage.setItem(QUIZBANK_KEY, JSON.stringify(arr)); },
  addToQuizBank(questions) {
    const cur = Storage.loadQuizBank();
    const next = [...cur, ...questions.map(q => ({ ...q, id: uid(), addedAt: Date.now() }))];
    Storage.saveQuizBank(next);
    return next;
  },

  /* ---- Photo-quiz library (quiz nommés issus d'une photo de fiche) ---- */
  loadPhotoQuizzes() {
    try { return JSON.parse(localStorage.getItem(PHOTOQUIZ_KEY)) || []; }
    catch (e) { return []; }
  },
  savePhotoQuizzes(arr) { localStorage.setItem(PHOTOQUIZ_KEY, JSON.stringify(arr)); },
  addPhotoQuiz(quiz) {
    const cur = Storage.loadPhotoQuizzes();
    const next = [{ ...quiz, id: uid(), createdAt: Date.now() }, ...cur];
    Storage.savePhotoQuizzes(next);
    return next;
  },
  deletePhotoQuiz(id) {
    const next = Storage.loadPhotoQuizzes().filter(q => q.id !== id);
    Storage.savePhotoQuizzes(next);
    return next;
  },
};

const uid = () => Math.random().toString(36).slice(2, 10);

const SEED_RECIPES = [
  {
    id: 'seed-crepes',
    title: 'Crêpes',
    category: 'Pâtes de base',
    ingredients: [
      '0,4 L de lait',
      '3 œufs',
      '250 g de farine',
      '1 c.à.s. de sucre',
      '1 c.à.c. de vanille',
      '1 c.à.s. d\'huile',
      '1 pincée de sel',
    ],
    steps: [
      'Mélanger la farine avec les œufs, le sucre et le sel',
      'Rajouter le lait progressivement',
      'Rajouter la vanille et l\'huile et bien mélanger le tout',
      'Laisser reposer avant cuisson',
    ],
    cuisson: ['Cuire les crêpes dans une poêle chaude', '1 à 2 min par face'],
    note: 'Recette de base, toujours réussie ❤',
    rating: 5,
    favorite: true,
    aiRefined: false,
    createdAt: Date.now() - 86400000 * 12,
    illu: 'crepe',
  },
  {
    id: 'seed-cheesecake',
    title: 'Cheesecake Framboise',
    category: 'Entremets',
    ingredients: [
      '220 g de spéculoos',
      '75 g de beurre fondu',
      '3 œufs entiers battus',
      '170 g de sucre',
      '670 g de fromage frais (mascarpone)',
      '1 sachet de sucre vanillé',
      'Framboises fraîches',
      'Coulis de framboise',
    ],
    steps: [
      'Concasser 220 g de spéculoos grossièrement',
      'Ajouter 75 g de beurre fondu',
      'Tapisser le fond du moule à manqué beurré',
      'Mélanger œufs, sucre, fromage frais et sucre vanillé',
      'Disposer quelques framboises sur les spéculoos puis verser la préparation',
      'Enfourner 35 min à 180°C, laisser reposer 3 h au frigo',
      'Servir recouvert de framboises et coulis',
    ],
    cuisson: ['35 min à 180°C', '3 h de repos au frigo'],
    note: 'Le classique du dimanche 🍓',
    rating: 5,
    favorite: false,
    aiRefined: false,
    createdAt: Date.now() - 86400000 * 4,
    illu: 'cake',
  },
];

const CATEGORIES = ['Tout', 'Desserts', 'Viennoiserie', 'Entremets', 'Crèmes', 'Biscuits', 'Pâtes de base'];

/* ---------------- AI ----------------
   Clé Groq gratuite sur https://console.groq.com
   14 400 requêtes/jour gratuites */
const GROQ_API_KEY = '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';
const GROQ_MODEL_TEXT  = 'llama-3.3-70b-versatile';
const GROQ_MODEL_VISION = 'meta-llama/llama-4-scout-17b-16e-instruct';

async function callGroq(prompt, imageDataUrl) {
  const model = imageDataUrl ? GROQ_MODEL_VISION : GROQ_MODEL_TEXT;
  const content = imageDataUrl
    ? [{ type: 'text', text: prompt }, { type: 'image_url', image_url: { url: imageDataUrl } }]
    : prompt;
  const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${GROQ_API_KEY}` },
    body: JSON.stringify({
      model,
      messages: [{ role: 'user', content }],
      temperature: 0.85,
      max_tokens: 2000,
    }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error('Groq ' + res.status + ' — ' + (err?.error?.message || ''));
  }
  const data = await res.json();
  const text = data?.choices?.[0]?.message?.content;
  if (!text) throw new Error('Réponse vide');
  return text;
}

async function callAI(prompt, imageDataUrl) {
  if (GROQ_API_KEY && GROQ_API_KEY.length > 10 && !GROQ_API_KEY.startsWith('COLLE')) {
    try { return await callGroq(prompt, imageDataUrl); }
    catch (e) { console.warn('Groq failed:', e); throw e; }
  }
  throw new Error('Configure ta clé Groq dans storage.jsx');
}

const AI = {
  async refineRecipe(recipe) {
    const prompt = `Tu es un chef pâtissier formateur en CAP. Reformule cette recette en utilisant le vocabulaire technique pâtissier professionnel français (turbiner, tourer, corner, pocher, sabler, crémer, blanchir, monter, etc.). Garde la même structure mais améliore les termes et précise les gestes.

Réponds UNIQUEMENT en JSON valide, sans texte avant ni après, avec ce format exact :
{
  "title": "titre amélioré",
  "ingredients": ["ingrédient 1", "ingrédient 2"],
  "steps": ["étape 1 reformulée", "étape 2 reformulée"]
}

Recette à reformuler :
Titre: ${recipe.title}
Ingrédients: ${(recipe.ingredients || []).join(' | ')}
Étapes: ${(recipe.steps || []).join(' | ')}`;

    const text = await callAI(prompt);
    return parseJSON(text);
  },

  async chefFridge(ingredientsList, avoidTitle) {
    const seed = Math.random().toString(36).slice(2, 8);
    const avoidLine = avoidTitle ? `\nNE PROPOSE PAS "${avoidTitle}" — invente une recette TOTALEMENT différente.` : '';
    const prompt = `Tu es un chef pâtissier formateur en CAP Pâtisserie. Génère UNE recette créative niveau CAP avec UNIQUEMENT ces ingrédients : ${ingredientsList.join(', ')}.${avoidLine}
Variation : ${seed}
Vocabulaire technique pâtissier (turbiner, sabler, crémer, blanchir, monter, pocher...).

Réponds UNIQUEMENT en JSON valide :
{
  "title": "Titre",
  "category": "Desserts" ou "Viennoiserie" ou "Entremets" ou "Crèmes" ou "Biscuits" ou "Pâtes de base",
  "difficulty": "Facile" ou "Moyen" ou "Difficile",
  "totalTime": "30 min",
  "ingredients": ["100 g de farine", "..."],
  "steps": ["Étape 1...", "..."],
  "tip": "Astuce du chef"
}`;
    const text = await callAI(prompt);
    return parseJSON(text);
  },

  async photoQuiz(imageDataUrl) {
    const prompt = `Tu es formateur en CAP Pâtisserie. Analyse cette photo de fiche de cours / recette / document pédagogique de pâtisserie et génère un quiz de 5 questions à choix multiples (4 options chacune) basé UNIQUEMENT sur le contenu visible dans l'image. Les questions doivent tester la compréhension : techniques, températures, proportions, vocabulaire technique présents dans le document.

Réponds UNIQUEMENT en JSON valide, sans texte avant ni après :
{
  "title": "Titre court basé sur le sujet de la fiche",
  "questions": [
    { "q": "Question ?", "a": ["option A", "option B", "option C", "option D"], "correct": 0 }
  ]
}
"correct" est l'index (0 à 3) de la bonne réponse. Génère exactement 5 questions.`;
    const text = await callAI(prompt, imageDataUrl);
    return parseJSON(text);
  },

  async generateQuestions(theme, avoidQuestions) {
    const seed = Math.random().toString(36).slice(2, 8);
    const themeMap = {
      'mix': 'thèmes variés (techniques, températures, proportions, hygiène, matériel)',
      'techniques': 'techniques et gestes pâtissiers (sabler, crémer, blanchir, pocher, monter, etc.)',
      'temperatures': 'températures (cuisson au four, sucre cuit, tempérage chocolat, conservation)',
      'proportions': 'proportions et ratios des recettes de base',
      'hygiene': 'hygiène HACCP et sécurité alimentaire',
      'materiel': 'matériel et ustensiles de pâtisserie',
    };
    const themeDesc = themeMap[theme] || themeMap.mix;
    const avoidLine = avoidQuestions?.length
      ? `\nNE pose AUCUNE de ces questions déjà vues : ${avoidQuestions.slice(0, 15).map(q => `"${q}"`).join(', ')}`
      : '';

    const prompt = `Tu es formateur en CAP Pâtisserie en France. Génère 10 questions à choix multiples INÉDITES, niveau CAP, sur le thème : ${themeDesc}.${avoidLine}

Variation aléatoire : ${seed}

Chaque question : 4 options plausibles, 1 seule correcte. Vocabulaire technique français pâtissier précis.

Réponds UNIQUEMENT en JSON valide :
{
  "questions": [
    { "q": "Question ?", "a": ["A","B","C","D"], "correct": 0 }
  ]
}
"correct" = index 0 à 3 de la bonne réponse. EXACTEMENT 10 questions.`;
    const text = await callAI(prompt);
    return parseJSON(text);
  },
};

function parseJSON(text) {
  // strip code fences if any, find first { and last }
  let t = text.trim().replace(/^```(?:json)?/, '').replace(/```$/, '').trim();
  const start = t.indexOf('{');
  const end = t.lastIndexOf('}');
  if (start === -1 || end === -1) throw new Error('Pas de JSON trouvé');
  t = t.slice(start, end + 1);
  return JSON.parse(t);
}

window.Storage = Storage;
window.SEED_RECIPES = SEED_RECIPES;
window.CATEGORIES = CATEGORIES;
window.AI = AI;
window.uid = uid;
