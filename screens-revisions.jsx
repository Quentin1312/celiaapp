/* ================================================================
   Module Révisions CAP — refonte épurée
   6 onglets: Quiz, Flash, Mes Quiz, Vocab, T°, Photo
   ================================================================ */

const { useState: rS, useEffect: rE, useRef: rR, useMemo: rM } = React;

/* ---------------- BANQUE PAR DÉFAUT ---------------- */
const QUIZ_BANK = [
  { q: "Que signifie 'crémer' en pâtisserie ?", a: ["Travailler beurre + sucre jusqu'à blanchir", "Ajouter de la crème", "Cuire une crème", "Tamiser le sucre glace"], correct: 0 },
  { q: "Le sablage consiste à…", a: ["Mélanger sucre et sel", "Travailler farine et beurre du bout des doigts", "Saupoudrer de sucre glace", "Étaler du sucre roux"], correct: 1 },
  { q: "Combien de tours pour un feuilletage classique ?", a: ["3 tours simples", "5 tours simples", "6 tours simples", "10 tours simples"], correct: 2 },
  { q: "Que signifie 'pocher' une crème ?", a: ["La cuire au bain-marie", "La dresser à la poche à douille", "La faire pocher dans l'eau", "La passer au chinois"], correct: 1 },
  { q: "'Blanchir' un mélange jaunes/sucre, c'est…", a: ["Le passer au four", "Y ajouter du blanc d'œuf", "Le fouetter jusqu'à éclaircissement", "Le faire blanchir au lait"], correct: 2 },
  { q: "Que veut dire 'corner' ?", a: ["Tailler en angle", "Racler avec une corne", "Mettre un cornet", "Cuire à la corne"], correct: 1 },
  { q: "'Tamiser' la farine, c'est principalement pour…", a: ["L'aérer et retirer les grumeaux", "La parfumer", "L'humidifier", "La doser"], correct: 0 },
  { q: "'Détendre' une pâte signifie…", a: ["La laisser reposer", "L'assouplir avec du liquide", "L'étaler finement", "La ramollir au four"], correct: 1 },
  { q: "Température de cuisson d'une pâte à choux ?", a: ["150°C", "180°C", "200-210°C", "240°C"], correct: 2 },
  { q: "Température de tempérage du chocolat noir ?", a: ["28-29°C", "31-32°C", "35°C", "40°C"], correct: 1 },
  { q: "À quelle température cuit-on une meringue française ?", a: ["60°C", "90-110°C", "150°C", "180°C"], correct: 1 },
  { q: "Stade 'petit boulé' du sucre ?", a: ["115°C", "118-120°C", "135°C", "150°C"], correct: 1 },
  { q: "Stade 'caramel clair' ?", a: ["140°C", "155°C", "170-180°C", "200°C"], correct: 2 },
  { q: "Température idéale pour monter une crème fouettée ?", a: ["très froide (4°C)", "tempérée (15°C)", "20°C", "tiède (25°C)"], correct: 0 },
  { q: "Pour une génoise classique, le ratio œufs/sucre/farine ?", a: ["1/1/1 (en poids)", "2/1/1", "1/2/1", "1/1/2"], correct: 0 },
  { q: "Combien pèse en moyenne un œuf entier ?", a: ["30 g", "50 g", "70 g", "100 g"], correct: 1 },
  { q: "Un jaune d'œuf pèse environ…", a: ["10 g", "20 g", "30 g", "40 g"], correct: 1 },
  { q: "Un blanc d'œuf pèse environ…", a: ["20 g", "30 g", "40 g", "50 g"], correct: 1 },
  { q: "Combien de gélatine pour 500 ml de liquide (gel souple) ?", a: ["2 g", "6-8 g", "15 g", "25 g"], correct: 1 },
  { q: "À quelle température max conserver des produits frais ?", a: ["+4°C", "+8°C", "+10°C", "+15°C"], correct: 0 },
  { q: "La marche en avant, c'est…", a: ["Un type de cuisson", "Le sens propre→sale en cuisine", "Un mouvement de pétrissage", "Le pliage de la feuilletée"], correct: 1 },
  { q: "DLC signifie…", a: ["Date Limite de Commerce", "Date Limite de Consommation", "Durée Limite de Conservation", "Date Légale de Cuisson"], correct: 1 },
  { q: "À quoi sert une poche à douille ?", a: ["À filtrer", "À dresser des préparations", "À cuire au bain-marie", "À mélanger"], correct: 1 },
  { q: "Le 'Maryse' est…", a: ["Un four", "Une spatule en silicone", "Un pétrin", "Un couteau"], correct: 1 },
  { q: "À quoi sert un chinois ?", a: ["Couper finement", "Filtrer une préparation", "Monter les blancs", "Cuire au wok"], correct: 1 },
];

const FLASHCARDS = [
  { f: 'Crémer', b: "Travailler beurre + sucre jusqu'à obtenir un mélange mousseux et clair." },
  { f: 'Sabler', b: 'Mélanger farine et beurre froid du bout des doigts pour une texture sableuse.' },
  { f: 'Blanchir', b: "Fouetter œufs/jaunes + sucre jusqu'à éclaircissement et formation d'un ruban." },
  { f: 'Tourer', b: 'Donner des tours de pliage à une pâte feuilletée (généralement 6 tours simples).' },
  { f: 'Pocher', b: 'Dresser une préparation à la poche à douille (≠ cuire dans un liquide).' },
  { f: 'Corner', b: "Racler une préparation avec une corne pour ne rien perdre." },
  { f: 'Turbiner', b: 'Faire prendre une glace ou un sorbet en sorbetière en mouvement.' },
  { f: 'Monter', b: "Battre une préparation pour incorporer de l'air (blancs, crème)." },
  { f: 'Détendre', b: 'Assouplir une pâte ou crème avec un liquide ou en la travaillant.' },
  { f: 'Chemiser', b: "Tapisser un moule (papier, beurre+sucre, biscuit cuillère)." },
  { f: 'Abaisser', b: "Étaler une pâte au rouleau à l'épaisseur voulue." },
  { f: 'Fraiser', b: 'Écraser une pâte avec la paume pour la rendre homogène (sans la corser).' },
  { f: 'Émulsionner', b: 'Mélanger 2 liquides non miscibles (gras + eau) — ex: ganache.' },
  { f: 'Foisonner', b: "Augmenter le volume d'une préparation en y intégrant de l'air." },
  { f: 'Beurrer / Chemiser un moule', b: 'Enduire de beurre fondu puis fariner ou sucrer pour démouler facilement.' },
  { f: 'Ruban', b: "Stade où la pâte forme un ruban qui retombe lentement en se repliant." },
  { f: 'Bain-marie', b: 'Cuisson douce dans un récipient placé dans de l\'eau chaude.' },
  { f: 'Tempérage', b: 'Stabilisation du beurre de cacao par courbe de T° pour un chocolat brillant et craquant.' },
];

const TEMP_TABLES = [
  { title: 'Cuisson au four', rows: [
    ['Meringue française', '90-110°C', '1 à 2 h'],
    ['Macarons', '145-150°C', '12-14 min'],
    ['Pâte sucrée à blanc', '170°C', '15-20 min'],
    ['Génoise', '180°C', '20-25 min'],
    ['Cake / quatre-quarts', '160-170°C', '45-55 min'],
    ['Pâte à choux', '200-210°C', '25-35 min'],
    ['Pâte feuilletée', '200-220°C', '20-30 min'],
    ['Madeleines', '210°C', '8-10 min'],
  ]},
  { title: 'Cuisson du sucre', rows: [
    ['Nappé', '105°C', 'sirop, baba, savarin'],
    ['Filet', '110°C', 'pâte de fruits'],
    ['Petit boulé', '115-117°C', 'meringue italienne'],
    ['Boulé', '118-120°C', 'crème au beurre, italienne'],
    ['Petit cassé', '135-140°C', 'fondant, nougat'],
    ['Cassé', '145-150°C', 'sucre filé, sucre soufflé'],
    ['Caramel clair', '155-165°C', 'caramel décor, nougatine'],
    ['Caramel ambré', '170-180°C', 'caramel sauce'],
  ]},
  { title: 'Tempérage chocolat', rows: [
    ['Noir', '50-55°C → 28-29°C → 31-32°C', 'fonte, cristallisation, travail'],
    ['Lait', '45-50°C → 27-28°C → 29-30°C', 'fonte, cristallisation, travail'],
    ['Blanc / coloré', '40-45°C → 26-27°C → 28-29°C', 'fonte, cristallisation, travail'],
  ]},
  { title: 'Conservation', rows: [
    ['Frais (lait, crème, œufs)', '+4°C max', 'frigo'],
    ['Surgelés', '-18°C', 'congélateur'],
    ['Pâte feuilletée crue', '+4°C, 48 h', 'film + frigo'],
    ['Génoise cuite', '+4°C, 3 j', 'filmée'],
    ['Crème pâtissière', '+4°C, 24 h', 'jamais à T° ambiante'],
  ]},
];

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/* ================================================================
   QUIZ PLAYER
   ================================================================ */
function QuizPlayer({ questions, title, onExit }) {
  const [idx, setIdx] = rS(0);
  const [score, setScore] = rS(0);
  const [picked, setPicked] = rS(null);
  const [done, setDone] = rS(false);
  const cur = questions[idx];
  const qType = cur?.type || 'mcq';

  function pick(i) {
    if (picked !== null) return;
    setPicked(i);
    if (i === cur.correct) setScore(s => s + 1);
  }
  function next() {
    if (idx + 1 >= questions.length) setDone(true);
    else { setIdx(idx + 1); setPicked(null); }
  }
  function restart() { setIdx(0); setScore(0); setPicked(null); setDone(false); }

  if (done) {
    const pct = Math.round((score / questions.length) * 100);
    const msg = pct >= 80 ? 'Excellent, tu maîtrises.' : pct >= 60 ? 'Bon, continue à réviser.' : 'À retravailler — courage.';
    return (
      <div className="pop" style={{ padding: '40px 0', textAlign: 'center' }}>
        <div className="eyebrow" style={{ marginBottom: 14 }}>Résultat</div>
        <div className="display" style={{ fontSize: 80, lineHeight: 1, marginBottom: 6 }}>
          <span style={{ color:'var(--accent)', fontStyle:'italic' }}>{score}</span>
          <span style={{ color:'var(--ink-4)', fontSize: 50 }}> / {questions.length}</span>
        </div>
        <div className="display" style={{ fontSize: 28, fontStyle:'italic', color:'var(--ink-2)' }}>{pct}%</div>
        <div style={{ fontSize: 14, color:'var(--ink-3)', marginTop: 18, fontStyle:'italic' }}>{msg}</div>
        <div style={{ display:'flex', gap: 10, marginTop: 28 }}>
          {onExit && <button className="btn btn-ghost" onClick={onExit} style={{ flex: 1 }}>Retour</button>}
          <button className="btn btn-primary" onClick={restart} style={{ flex: 1 }}>Recommencer</button>
        </div>
      </div>
    );
  }

  const progress = ((idx + (picked !== null ? 1 : 0)) / questions.length) * 100;

  /* ---- couleur commune ---- */
  function answerStyle(i) {
    const isCorrect = i === cur.correct, isPicked = picked === i;
    let bg = 'transparent', border = '1px solid var(--line-2)', color = 'var(--ink)';
    if (picked !== null) {
      if (isCorrect) { bg = 'var(--secondary-bg)'; border = '1px solid var(--secondary)'; color = 'var(--secondary)'; }
      else if (isPicked) { bg = 'var(--accent-bg)'; border = '1px solid var(--accent)'; color = 'var(--accent-ink)'; }
      else { color = 'var(--ink-4)'; }
    }
    return { bg, border, color };
  }

  /* ---- question text (fill: met ___ en évidence) ---- */
  function renderQuestion() {
    if (qType !== 'fill') return <div className="display" style={{ fontSize: 21, lineHeight: 1.25 }}>{cur.q}</div>;
    const parts = cur.q.split('___');
    return (
      <div className="display" style={{ fontSize: 21, lineHeight: 1.4 }}>
        {parts.map((p, i) => (
          <span key={i}>
            {p}
            {i < parts.length - 1 && (
              <span style={{
                display:'inline-block', minWidth: 60,
                borderBottom: '2px solid var(--accent)',
                margin: '0 4px', verticalAlign: 'bottom',
                color:'var(--accent)', fontStyle:'italic', fontSize: 14,
              }}>?</span>
            )}
          </span>
        ))}
      </div>
    );
  }

  /* ---- badge type ---- */
  const typeBadge = qType === 'tf'
    ? <span className="tag mint" style={{ fontSize: 9.5 }}>Vrai / Faux</span>
    : qType === 'fill'
    ? <span className="tag accent" style={{ fontSize: 9.5 }}>Compléter</span>
    : null;

  return (
    <div className="pop">
      <div style={{ display:'flex', alignItems:'center', gap: 12, marginBottom: 14 }}>
        {onExit && <button className="back" onClick={onExit}>{Icon.back}</button>}
        <div style={{ flex: 1 }}>
          <div className="eyebrow" style={{ fontSize: 9.5, marginBottom: 2 }}>{title || 'Quiz'}</div>
          <div style={{ fontSize: 12, color:'var(--ink-3)' }}>
            <span style={{ fontFamily:'var(--font-display)', fontStyle:'italic', fontSize: 16, color:'var(--ink)' }}>{idx+1}</span>
            <span style={{ color:'var(--ink-4)' }}> / {questions.length}</span>
            <span style={{ margin: '0 8px', color: 'var(--ink-4)' }}>·</span>
            <span style={{ color:'var(--accent)' }}>{score} bon{score > 1 ? 's' : ''}</span>
          </div>
        </div>
      </div>

      <div style={{ height: 2, background:'var(--line)', borderRadius: 1, overflow:'hidden', marginBottom: 22 }}>
        <div style={{ width: `${progress}%`, height:'100%', background:'var(--accent)', transition:'width .3s' }}/>
      </div>

      <div style={{
        background:'var(--paper-2)', border:'1px solid var(--line)',
        borderRadius:'var(--radius-lg)', padding: 22, marginBottom: 14,
      }}>
        <div style={{ display:'flex', alignItems:'center', gap: 8, marginBottom: 10 }}>
          <div className="eyebrow" style={{ fontSize: 9.5 }}>Question {idx+1}</div>
          {typeBadge}
        </div>
        {renderQuestion()}
      </div>

      {/* Vrai/Faux — 2 grands boutons côte à côte */}
      {qType === 'tf' ? (
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap: 10 }}>
          {cur.a.map((opt, i) => {
            const { bg, border, color } = answerStyle(i);
            const isCorrect = i === cur.correct, isPicked = picked === i;
            return (
              <button key={i} onClick={() => pick(i)} disabled={picked !== null}
                style={{ background: bg, border, color,
                  borderRadius:'var(--radius-lg)', padding: '22px 12px',
                  cursor: picked === null ? 'pointer' : 'default',
                  display:'flex', flexDirection:'column', alignItems:'center', gap: 8,
                  transition: 'all .15s' }}>
                <span style={{ fontSize: 30, lineHeight: 1 }}>{i === 0 ? '✓' : '✗'}</span>
                <span style={{ fontFamily:'var(--font-body)', fontWeight: 600, fontSize: 15 }}>{opt}</span>
                {picked !== null && isCorrect && <span style={{ fontSize: 11, color:'var(--secondary)' }}>Correct</span>}
                {picked !== null && isPicked && !isCorrect && <span style={{ fontSize: 11, color:'var(--accent-ink)' }}>Incorrect</span>}
              </button>
            );
          })}
        </div>
      ) : (
        /* MCQ et Fill — liste verticale */
        <div style={{ display:'flex', flexDirection:'column', gap: 8 }}>
          {cur.a.map((opt, i) => {
            const { bg, border, color } = answerStyle(i);
            const isCorrect = i === cur.correct, isPicked = picked === i;
            return (
              <button key={i} onClick={() => pick(i)} disabled={picked !== null}
                style={{ background: bg, border, color, borderRadius:'var(--radius)',
                  padding:'14px 16px', textAlign:'left',
                  cursor: picked === null ? 'pointer' : 'default',
                  display:'flex', alignItems:'center', gap: 12,
                  fontFamily:'var(--font-body)', fontSize: 14.5,
                  transition: 'all .15s' }}>
                <span style={{
                  width: 26, height: 26, borderRadius:'50%',
                  border: '1px solid currentColor',
                  fontFamily:'var(--font-display)', fontStyle:'italic', fontSize: 14,
                  display:'grid', placeItems:'center', flexShrink: 0, opacity: 0.7,
                }}>{['a','b','c','d'][i]}</span>
                <span style={{ flex: 1, lineHeight: 1.35 }}>{opt}</span>
                {picked !== null && isCorrect && <span style={{ display:'flex' }}>{Icon.check}</span>}
                {picked !== null && isPicked && !isCorrect && <span style={{ display:'flex' }}>{Icon.close}</span>}
              </button>
            );
          })}
        </div>
      )}

      {picked !== null && (
        <button className="btn btn-primary" onClick={next} style={{ marginTop: 20, width:'100%' }}>
          {idx + 1 >= questions.length ? 'Voir mon score' : 'Suivant'}
          {idx + 1 < questions.length && Icon.arrowR}
        </button>
      )}
    </div>
  );
}

/* ================================================================
   QUIZ TAB
   ================================================================ */
function QuizTab() {
  const [aiBank, setAiBank] = rS(() => window.Storage.loadQuizBank());
  const [photoQuizzes] = rS(() => window.Storage.loadPhotoQuizzes());
  const [generating, setGenerating] = rS(false);
  const [genError, setGenError] = rS('');
  const [genTheme, setGenTheme] = rS('mix');
  const [showGen, setShowGen] = rS(false);
  const [activeQuiz, setActiveQuiz] = rS(null);

  function startClassic() {
    setActiveQuiz({ questions: shuffle(QUIZ_BANK).slice(0, 10), title: 'Quiz CAP' });
  }
  function startAI() {
    if (!aiBank.length) return;
    setActiveQuiz({ questions: shuffle(aiBank).slice(0, Math.min(10, aiBank.length)), title: 'Quiz IA' });
  }
  function startGiant() {
    const all = [...QUIZ_BANK, ...aiBank, ...photoQuizzes.flatMap(pq => pq.questions || [])];
    if (!all.length) return;
    setActiveQuiz({ questions: shuffle(all).slice(0, 15), title: 'Quiz géant' });
  }
  async function generate() {
    setGenerating(true); setGenError('');
    try {
      const avoid = aiBank.map(q => q.q).concat(QUIZ_BANK.map(q => q.q));
      const result = await window.AI.generateQuestions(genTheme, avoid);
      if (!result?.questions?.length) throw new Error('Pas de questions générées');
      const next = window.Storage.addToQuizBank(result.questions);
      setAiBank(next); setShowGen(false);
    } catch (e) {
      setGenError(e.message || 'Erreur lors de la génération');
    } finally { setGenerating(false); }
  }
  function clearAiBank() {
    if (!confirm('Effacer toutes les questions générées par IA ?')) return;
    window.Storage.saveQuizBank([]); setAiBank([]);
  }

  if (activeQuiz) {
    return <QuizPlayer questions={activeQuiz.questions} title={activeQuiz.title} onExit={() => setActiveQuiz(null)}/>;
  }

  const totalQuestions = QUIZ_BANK.length + aiBank.length + photoQuizzes.reduce((n, q) => n + (q.questions?.length || 0), 0);

  return (
    <div className="pop" style={{ display:'flex', flexDirection:'column', gap: 10 }}>
      <ModeCard
        eyebrow="Référence"
        title="Quiz CAP" italic="classique"
        sub={`${QUIZ_BANK.length} questions de référence`}
        cta="10 questions au hasard"
        onClick={startClassic}/>

      <ModeCard
        eyebrow="Personnalisé"
        title="Quiz" italic="IA"
        sub={aiBank.length ? `${aiBank.length} questions IA en banque` : 'aucune question IA — génère-en !'}
        cta={aiBank.length ? "Lancer le quiz IA" : "Génère ta première fournée ↓"}
        disabled={!aiBank.length}
        onClick={startAI}/>

      <button onClick={() => setShowGen(true)} className="btn btn-accent" style={{ marginTop: 6 }}>
        {Icon.sparkles} Générer 10 nouvelles questions
      </button>
      {aiBank.length > 0 && (
        <button onClick={clearAiBank} className="btn btn-ghost" style={{ fontSize: 12, padding:'8px 14px', alignSelf:'flex-end' }}>
          {Icon.trash} Effacer la banque IA
        </button>
      )}

      <div style={{ height: 4 }}/>

      <ModeCard
        eyebrow="Mode total"
        title="Quiz" italic="géant"
        sub={`Mélange tout — banque + IA + photo (${totalQuestions} questions)`}
        cta="15 questions tirées au hasard"
        dark
        onClick={startGiant}/>

      {showGen && (
        <div style={{
          position:'fixed', inset: 0, background:'rgba(26,22,18,.55)',
          display:'grid', placeItems:'end center', zIndex: 100,
          padding: 0,
        }} onClick={() => !generating && setShowGen(false)}>
          <div onClick={e => e.stopPropagation()} style={{
            background:'var(--paper)', borderRadius:'24px 24px 0 0',
            padding: '24px 22px 32px', width: '100%', maxWidth: 480,
            border:'1px solid var(--line)',
          }}>
            <div style={{ width: 40, height: 4, background:'var(--line-2)', borderRadius: 2, margin: '0 auto 18px' }}/>
            <div className="eyebrow" style={{ marginBottom: 6 }}>Génération IA</div>
            <div className="display" style={{ fontSize: 28, marginBottom: 8 }}>
              10 questions <span style={{ fontStyle:'italic', color:'var(--accent)' }}>inédites</span>
            </div>
            <div style={{ fontSize: 13.5, color:'var(--ink-3)', marginBottom: 18, lineHeight: 1.4 }}>
              L'IA crée des questions niveau CAP, ajoutées à ta banque.
            </div>
            <div className="eyebrow" style={{ fontSize: 9.5, marginBottom: 8 }}>Thème</div>
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap: 6, marginBottom: 18 }}>
              {[
                ['mix', 'Mix tout'],
                ['techniques', 'Techniques'],
                ['temperatures', 'Températures'],
                ['proportions', 'Proportions'],
                ['hygiene', 'Hygiène'],
                ['materiel', 'Matériel'],
              ].map(([k, l]) => (
                <button key={k}
                  className={`chip ${genTheme === k ? 'active' : ''}`}
                  onClick={() => setGenTheme(k)}
                  style={{ padding:'10px 8px', textAlign:'center', justifyContent:'center' }}>
                  {l}
                </button>
              ))}
            </div>
            {genError && (
              <div style={{ background:'var(--accent-bg)', borderRadius:'var(--radius)', padding: 12, marginBottom: 12, fontSize: 13, color:'var(--accent-ink)' }}>
                {genError}
              </div>
            )}
            <button className="btn btn-primary" onClick={generate} disabled={generating} style={{ width:'100%' }}>
              {generating ? <><span className="spin"/> Génération…</> : <>{Icon.sparkles} Générer</>}
            </button>
            <button className="btn btn-ghost" onClick={() => setShowGen(false)} disabled={generating} style={{ width:'100%', marginTop: 8 }}>
              Annuler
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function ModeCard({ eyebrow, title, italic, sub, cta, onClick, disabled, dark }) {
  return (
    <button onClick={onClick} disabled={disabled} style={{
      textAlign:'left', cursor: disabled ? 'not-allowed' : 'pointer', opacity: disabled ? 0.5 : 1,
      background: dark ? 'var(--ink)' : 'var(--paper-2)',
      color: dark ? 'var(--paper)' : 'var(--ink)',
      border: dark ? 'none' : '1px solid var(--line)',
      borderRadius:'var(--radius-lg)',
      padding: 20,
      display:'flex', flexDirection:'column', gap: 4,
      width:'100%',
    }}>
      <div className="eyebrow" style={{ color: dark ? 'var(--accent-soft)' : 'var(--ink-3)', marginBottom: 4 }}>{eyebrow}</div>
      <div className="display" style={{ fontSize: 28, color: dark ? 'var(--paper)' : 'var(--ink)' }}>
        {title} <span style={{ fontStyle:'italic', color: dark ? 'var(--accent-soft)' : 'var(--accent)' }}>{italic}</span>
      </div>
      <div style={{ fontSize: 12.5, color: dark ? 'rgba(245,240,232,.6)' : 'var(--ink-3)', marginTop: 4 }}>{sub}</div>
      <div style={{ fontSize: 13, color: dark ? 'var(--accent-soft)' : 'var(--accent)', marginTop: 10,
        fontFamily:'var(--font-display)', fontStyle:'italic' }}>{cta} →</div>
    </button>
  );
}

/* ================================================================
   FLASHCARDS
   ================================================================ */
function FlashcardsTab() {
  const [idx, setIdx] = rS(0);
  const [flipped, setFlipped] = rS(false);
  const [deck, setDeck] = rS(() => [...FLASHCARDS]);
  const [known, setKnown] = rS(0);

  function next(gotIt) {
    if (gotIt) setKnown(k => k + 1);
    setFlipped(false);
    if (idx + 1 >= deck.length) { setIdx(0); setDeck(shuffle(FLASHCARDS)); setKnown(0); }
    else setIdx(idx + 1);
  }
  const card = deck[idx];

  return (
    <div className="pop">
      <div style={{ display:'flex', alignItems:'baseline', gap: 14, marginBottom: 18 }}>
        <div style={{ flex: 1 }}>
          <div className="eyebrow" style={{ fontSize: 9.5, marginBottom: 2 }}>Flashcards</div>
          <div style={{ fontSize: 12, color:'var(--ink-3)' }}>
            <span style={{ fontFamily:'var(--font-display)', fontStyle:'italic', fontSize: 16, color:'var(--ink)' }}>{idx+1}</span>
            <span style={{ color:'var(--ink-4)' }}> / {deck.length}</span>
            <span style={{ margin:'0 8px', color:'var(--ink-4)' }}>·</span>
            <span style={{ color:'var(--secondary)' }}>{known} su{known > 1 ? 's' : ''}</span>
          </div>
        </div>
      </div>

      <div onClick={() => setFlipped(!flipped)}
        style={{ width:'100%', height: 320, perspective: 1200, cursor:'pointer', marginBottom: 20 }}>
        <div style={{
          width:'100%', height:'100%', transformStyle:'preserve-3d',
          transition:'transform .55s cubic-bezier(.4,.2,.3,1)',
          transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
          position:'relative',
        }}>
          {/* Recto */}
          <div style={{ position:'absolute', inset: 0, backfaceVisibility:'hidden',
            background:'var(--paper-2)', border:'1px solid var(--line)',
            borderRadius:'var(--radius-lg)',
            display:'grid', placeItems:'center', padding: 28 }}>
            <div style={{ textAlign:'center' }}>
              <div className="eyebrow" style={{ marginBottom: 18 }}>Terme</div>
              <div className="display" style={{ fontSize: 42, lineHeight: 1.05 }}>{card.f}</div>
              <div style={{ fontSize: 11.5, color:'var(--ink-4)', marginTop: 22, fontStyle:'italic', fontFamily:'var(--font-display)' }}>tap pour retourner</div>
            </div>
          </div>
          {/* Verso */}
          <div style={{ position:'absolute', inset: 0, backfaceVisibility:'hidden',
            transform:'rotateY(180deg)',
            background:'var(--ink)', color:'var(--paper)',
            borderRadius:'var(--radius-lg)',
            display:'grid', placeItems:'center', padding: 32 }}>
            <div style={{ textAlign:'center' }}>
              <div className="eyebrow" style={{ marginBottom: 16, color:'var(--accent-soft)' }}>Définition</div>
              <div style={{ fontFamily:'var(--font-body)', fontSize: 17, lineHeight: 1.5 }}>{card.b}</div>
            </div>
          </div>
        </div>
      </div>

      <div style={{ display:'flex', gap: 10 }}>
        <button className="btn btn-ghost" onClick={() => next(false)} style={{ flex: 1 }}>{Icon.refresh} À revoir</button>
        <button className="btn btn-primary" onClick={() => next(true)} style={{ flex: 1 }}>{Icon.check} Je sais</button>
      </div>
    </div>
  );
}

/* ================================================================
   TEMPÉRATURES
   ================================================================ */
function TemperaturesTab() {
  return (
    <div className="pop" style={{ display:'flex', flexDirection:'column', gap: 22 }}>
      {TEMP_TABLES.map((t, i) => (
        <div key={i}>
          <div className="eyebrow" style={{ marginBottom: 4 }}>Table {String(i+1).padStart(2,'0')}</div>
          <div className="display" style={{ fontSize: 26, marginBottom: 14, fontStyle:'italic' }}>{t.title}</div>
          <div style={{ background:'var(--paper-2)', border:'1px solid var(--line)', borderRadius:'var(--radius-lg)', overflow:'hidden' }}>
            {t.rows.map((row, j) => (
              <div key={j} style={{
                padding:'14px 16px',
                borderBottom: j < t.rows.length - 1 ? '1px solid var(--line)' : 'none',
              }}>
                <div style={{ display:'flex', alignItems:'baseline', gap: 12, justifyContent:'space-between' }}>
                  <div style={{ fontSize: 14.5, color:'var(--ink)' }}>{row[0]}</div>
                  <div style={{ fontFamily:'var(--font-display)', fontStyle:'italic', fontSize: 18, color:'var(--accent)', whiteSpace:'nowrap' }}>{row[1]}</div>
                </div>
                {row[2] && <div style={{ fontSize: 12, color:'var(--ink-4)', marginTop: 4, fontStyle:'italic' }}>{row[2]}</div>}
              </div>
            ))}
          </div>
        </div>
      ))}
      <div style={{ fontSize: 12, color:'var(--ink-4)', textAlign:'center', fontStyle:'italic', padding: 4 }}>
        À connaître par cœur pour le CAP.
      </div>
    </div>
  );
}

/* ================================================================
   PHOTO → QUIZ
   ================================================================ */
function PhotoQuizTab() {
  const [photo, setPhoto] = rS('');
  const [loading, setLoading] = rS(false);
  const [error, setError] = rS('');
  const [pending, setPending] = rS(null);
  const [pendingDate, setPendingDate] = rS('');
  const [activeQuiz, setActiveQuiz] = rS(null);

  function pickPhoto(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    setError('');
    const reader = new FileReader();
    reader.onload = ev => {
      const img = new Image();
      img.onload = () => {
        const max = 1024;
        const r = Math.min(1, max / Math.max(img.width, img.height));
        const c = document.createElement('canvas');
        c.width = img.width * r; c.height = img.height * r;
        c.getContext('2d').drawImage(img, 0, 0, c.width, c.height);
        setPhoto(c.toDataURL('image/jpeg', 0.85));
      };
      img.src = ev.target.result;
    };
    reader.readAsDataURL(file);
  }
  async function generate() {
    if (!photo) return;
    setLoading(true); setError('');
    try {
      const result = await window.AI.photoQuiz(photo);
      if (!result?.questions?.length) throw new Error('Pas de questions générées');
      const thumb = await makeThumb(photo, 200);
      setPending({ ...result, thumb });
      setPendingDate('');
    } catch (e) {
      setError(e.message || 'Erreur. Vérifie la config IA.');
    } finally { setLoading(false); }
  }
  function saveAndPlay() {
    if (!pending) return;
    window.Storage.addPhotoQuiz({
      title: pending.title,
      thumb: pending.thumb,
      photo: photo,
      questions: pending.questions,
      controlDate: pendingDate || null,
    });
    if (pendingDate && 'Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission();
    }
    setActiveQuiz({ title: pending.title, questions: pending.questions });
    setPending(null); setPhoto(''); setPendingDate('');
  }
  function discardAndPlay() {
    if (!pending) return;
    setActiveQuiz({ title: pending.title, questions: pending.questions });
    setPending(null); setPhoto(''); setPendingDate('');
  }

  if (activeQuiz) {
    return <QuizPlayer questions={activeQuiz.questions} title={activeQuiz.title} onExit={() => setActiveQuiz(null)}/>;
  }
  if (pending) {
    const minDate = new Date().toISOString().slice(0, 10);
    return (
      <div className="pop">
        <div style={{ background:'var(--paper-2)', border:'1px solid var(--line)', borderRadius:'var(--radius-lg)', padding: 22 }}>
          <div className="eyebrow" style={{ marginBottom: 6 }}>Prêt</div>
          <div className="display" style={{ fontSize: 28, marginBottom: 12 }}>
            Quiz <span style={{ fontStyle:'italic', color:'var(--accent)' }}>généré</span>
          </div>
          <div style={{ display:'flex', alignItems:'center', gap: 14, marginBottom: 22 }}>
            {pending.thumb && (
              <img src={pending.thumb} alt="" style={{ width: 64, height: 64, objectFit:'cover', borderRadius:'var(--radius)', border:'1px solid var(--line)' }}/>
            )}
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 15, color:'var(--ink)', fontWeight: 500 }}>{pending.title}</div>
              <div style={{ fontSize: 12, color:'var(--ink-3)', marginTop: 2 }}>{pending.questions.length} questions</div>
            </div>
          </div>

          {/* Date du contrôle */}
          <div style={{ marginBottom: 16 }}>
            <div className="label" style={{ marginBottom: 8, display:'flex', alignItems:'center', gap: 6 }}>
              {Icon.bell}
              Date du contrôle
              <span style={{ color:'var(--ink-4)', fontWeight: 400, fontSize: 11 }}>(optionnel)</span>
            </div>
            <input
              type="date"
              className="input"
              min={minDate}
              value={pendingDate}
              onChange={e => setPendingDate(e.target.value)}
            />
            {pendingDate && (
              <div style={{
                marginTop: 8, padding:'10px 12px',
                background:'var(--accent-bg)', borderRadius:'var(--radius)',
                fontSize: 12.5, color:'var(--accent-ink)',
                display:'flex', alignItems:'center', gap: 8,
              }}>
                {Icon.bell}
                Rappel activé — notification 1 et 2 jours avant le contrôle
              </div>
            )}
          </div>

          <button className="btn btn-primary" onClick={saveAndPlay} style={{ width:'100%' }}>
            {Icon.save} Sauvegarder et commencer
          </button>
          <button className="btn btn-ghost" onClick={discardAndPlay} style={{ width:'100%', marginTop: 8 }}>
            Jouer sans sauvegarder
          </button>
          <button onClick={() => { setPending(null); setPhoto(''); setPendingDate(''); }} style={{
            background:'none', border:'none', cursor:'pointer',
            width:'100%', marginTop: 6, fontSize: 12, color:'var(--ink-4)', padding: 8,
          }}>Annuler</button>
        </div>
      </div>
    );
  }

  return (
    <div className="pop">
      <div className="eyebrow" style={{ marginBottom: 6 }}>Photo → Quiz</div>
      <div className="display" style={{ fontSize: 26, marginBottom: 8 }}>
        Ta fiche, <span style={{ fontStyle:'italic', color:'var(--accent)' }}>en quiz</span>
      </div>
      <div style={{ fontSize: 13.5, color:'var(--ink-3)', marginBottom: 18, lineHeight: 1.5 }}>
        Prends en photo ta fiche de cours — l'IA lit le contenu et génère un quiz personnalisé que tu peux sauvegarder dans <em style={{ fontFamily:'var(--font-display)' }}>Mes Quiz</em>.
      </div>

      <label style={{ display:'block', cursor:'pointer', marginBottom: 14 }}>
        <input type="file" accept="image/*" onChange={pickPhoto} style={{ display:'none' }}/>
        {photo ? (
          <div style={{ position:'relative', borderRadius:'var(--radius-lg)', overflow:'hidden', border:'1px solid var(--line)' }}>
            <img src={photo} alt="" style={{ width:'100%', display:'block', maxHeight: 320, objectFit:'cover' }}/>
            <button type="button" onClick={(e) => { e.preventDefault(); setPhoto(''); }}
              className="back" style={{ position:'absolute', top: 10, right: 10, background:'rgba(245,240,232,.95)' }}>{Icon.close}</button>
          </div>
        ) : (
          <div style={{
            border:'1px dashed var(--line-2)', borderRadius:'var(--radius-lg)',
            padding: 44, textAlign:'center',
            background:'var(--paper-2)',
          }}>
            <div style={{ display:'flex', justifyContent:'center', color:'var(--ink-3)', marginBottom: 10 }}>{Icon.camera}</div>
            <div className="display" style={{ fontSize: 22, fontStyle:'italic' }}>Choisir une photo</div>
            <div style={{ fontSize: 12, color:'var(--ink-4)', marginTop: 4 }}>fiche, recette, document de cours</div>
          </div>
        )}
      </label>

      {photo && (
        <button className="btn btn-primary" onClick={generate} disabled={loading} style={{ width:'100%' }}>
          {loading ? <><span className="spin"/> L'IA lit ta fiche…</> : <>{Icon.sparkles} Générer le quiz</>}
        </button>
      )}
      {error && (
        <div style={{ marginTop: 14, padding: 14, background:'var(--accent-bg)', borderRadius:'var(--radius)', fontSize: 13.5, color:'var(--accent-ink)' }}>
          {error}
        </div>
      )}
    </div>
  );
}

async function makeThumb(dataUrl, size) {
  return new Promise(resolve => {
    const img = new Image();
    img.onload = () => {
      const c = document.createElement('canvas');
      c.width = size; c.height = size;
      const ctx = c.getContext('2d');
      const scale = Math.max(size / img.width, size / img.height);
      const w = img.width * scale, h = img.height * scale;
      ctx.drawImage(img, (size - w) / 2, (size - h) / 2, w, h);
      resolve(c.toDataURL('image/jpeg', 0.7));
    };
    img.src = dataUrl;
  });
}

/* ================================================================
   MES QUIZ
   ================================================================ */
function getDayLabel(dateStr) {
  const today = new Date(); today.setHours(0, 0, 0, 0);
  const exam = new Date(dateStr); exam.setHours(0, 0, 0, 0);
  const days = Math.round((exam - today) / 86400000);
  if (days < 0) return null;
  if (days === 0) return "aujourd'hui";
  if (days === 1) return 'demain';
  return `dans ${days} j.`;
}

function MyQuizTab() {
  const [quizzes, setQuizzes] = rS(() => window.Storage.loadPhotoQuizzes());
  const [active, setActive] = rS(null);
  const [regenId, setRegenId] = rS(null);
  const [regenLoading, setRegenLoading] = rS(false);
  const [regenError, setRegenError] = rS('');
  const regenFileRef = rR();

  const upcoming = rM(() => {
    const today = new Date(); today.setHours(0, 0, 0, 0);
    return quizzes.filter(q => {
      if (!q.controlDate) return false;
      const exam = new Date(q.controlDate); exam.setHours(0, 0, 0, 0);
      const days = Math.round((exam - today) / 86400000);
      return days >= 0 && days <= 2;
    });
  }, [quizzes]);

  function del(id) {
    if (!confirm('Supprimer ce quiz ?')) return;
    setQuizzes(window.Storage.deletePhotoQuiz(id));
  }

  async function doRegen(quiz, photoDataUrl) {
    setRegenLoading(true); setRegenError('');
    try {
      const result = await window.AI.regenerateQuiz(photoDataUrl, quiz.questions);
      if (!result?.questions?.length) throw new Error('Pas de questions générées');
      const next = window.Storage.updatePhotoQuiz(quiz.id, { questions: result.questions });
      setQuizzes(next);
      setActive({ ...quiz, questions: result.questions });
    } catch (e) {
      setRegenError(e.message || 'Erreur IA');
    } finally { setRegenLoading(false); setRegenId(null); }
  }

  function startRegen(quiz) {
    if (regenLoading) return;
    setRegenError('');
    if (quiz.photo) {
      setRegenId(quiz.id);
      doRegen(quiz, quiz.photo);
    } else {
      setRegenId(quiz.id);
      setTimeout(() => regenFileRef.current?.click(), 50);
    }
  }

  function onRegenFile(e) {
    const file = e.target.files?.[0];
    if (!file) { setRegenId(null); return; }
    const quiz = quizzes.find(q => q.id === regenId);
    if (!quiz) { setRegenId(null); return; }
    const reader = new FileReader();
    reader.onload = ev => {
      const img = new Image();
      img.onload = () => {
        const max = 1024;
        const r = Math.min(1, max / Math.max(img.width, img.height));
        const c = document.createElement('canvas');
        c.width = img.width * r; c.height = img.height * r;
        c.getContext('2d').drawImage(img, 0, 0, c.width, c.height);
        doRegen(quiz, c.toDataURL('image/jpeg', 0.85));
      };
      img.src = ev.target.result;
    };
    reader.readAsDataURL(file);
    e.target.value = '';
  }

  if (active) return <QuizPlayer questions={active.questions} title={active.title} onExit={() => setActive(null)}/>;

  if (!quizzes.length) {
    return (
      <div className="pop" style={{ textAlign:'center', padding: '40px 20px' }}>
        <div style={{ display:'flex', justifyContent:'center', color:'var(--ink-4)', marginBottom: 14 }}>{Icon.book}</div>
        <div className="display" style={{ fontSize: 26, fontStyle:'italic' }}>Aucun quiz sauvegardé</div>
        <div style={{ fontSize: 13.5, color:'var(--ink-3)', marginTop: 10, lineHeight: 1.5 }}>
          Va dans l'onglet <strong style={{ color:'var(--ink)' }}>Photo</strong>, prends en photo ta fiche de cours, l'IA générera un quiz que tu pourras sauvegarder ici.
        </div>
      </div>
    );
  }

  return (
    <div className="pop" style={{ display:'flex', flexDirection:'column', gap: 8 }}>
      {/* Bannière contrôles imminents */}
      {upcoming.length > 0 && (
        <div style={{
          marginBottom: 6,
          background:'var(--accent-bg)', border:'1px solid var(--accent)',
          borderRadius:'var(--radius-lg)', padding:'14px 16px',
          display:'flex', gap: 12, alignItems:'flex-start',
        }}>
          <div style={{ color:'var(--accent)', display:'flex', marginTop: 1, flexShrink: 0 }}>{Icon.bell}</div>
          <div>
            {upcoming.map(q => (
              <div key={q.id} style={{ fontSize: 13.5, color:'var(--accent-ink)', fontWeight: 500, lineHeight: 1.3 }}>
                {q.title} — contrôle {getDayLabel(q.controlDate)} !
              </div>
            ))}
            <div style={{ fontSize: 12, color:'var(--accent-ink)', opacity: 0.75, marginTop: 4 }}>
              Regénère un quiz pour t'entraîner avec de nouvelles questions.
            </div>
          </div>
        </div>
      )}

      {regenError && (
        <div style={{ padding:'10px 14px', background:'var(--accent-bg)', borderRadius:'var(--radius)', fontSize: 13, color:'var(--accent-ink)' }}>
          {regenError}
        </div>
      )}

      <div className="eyebrow" style={{ marginBottom: 4 }}>{quizzes.length} quiz · tape pour rejouer</div>

      {/* Input caché pour re-photo */}
      <input ref={regenFileRef} type="file" accept="image/*" onChange={onRegenFile} style={{ display:'none' }}/>

      {quizzes.map(q => {
        const dayLabel = q.controlDate ? getDayLabel(q.controlDate) : null;
        const isUrgent = dayLabel && (dayLabel === "aujourd'hui" || dayLabel === 'demain');
        const isRegen = regenId === q.id && regenLoading;

        return (
          <div key={q.id} style={{
            background:'var(--paper-2)', border: isUrgent ? '1px solid var(--accent)' : '1px solid var(--line)',
            borderRadius:'var(--radius-lg)', overflow: 'hidden',
          }}>
            <div style={{ display:'flex', alignItems:'center', gap: 12, padding: 12 }}>
              <button onClick={() => setActive(q)} style={{
                flex: 1, display:'flex', alignItems:'center', gap: 12,
                background:'none', border:'none', cursor:'pointer', textAlign:'left', padding: 0,
              }}>
                <div style={{
                  width: 60, height: 60, borderRadius:'var(--radius)', flexShrink: 0,
                  backgroundImage: q.thumb ? `url(${q.thumb})` : undefined,
                  backgroundColor: 'var(--paper-3)',
                  backgroundSize:'cover', backgroundPosition:'center',
                  border:'1px solid var(--line)',
                  display:'grid', placeItems:'center', color:'var(--ink-4)',
                }}>
                  {!q.thumb && Icon.camera}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div className="display" style={{ fontSize: 18, lineHeight: 1.1, whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis' }}>{q.title}</div>
                  <div style={{ fontSize: 11.5, color:'var(--ink-3)', marginTop: 3, display:'flex', alignItems:'center', gap: 6, flexWrap:'wrap' }}>
                    <span>{q.questions?.length || 0} questions</span>
                    {dayLabel && (
                      <>
                        <span style={{ color:'var(--ink-4)' }}>·</span>
                        <span style={{ color: isUrgent ? 'var(--accent)' : 'var(--ink-3)', fontWeight: isUrgent ? 600 : 400 }}>
                          contrôle {dayLabel}
                        </span>
                      </>
                    )}
                    {!dayLabel && (
                      <>
                        <span style={{ color:'var(--ink-4)' }}>·</span>
                        <span>{new Date(q.createdAt).toLocaleDateString('fr-FR')}</span>
                      </>
                    )}
                  </div>
                </div>
              </button>
              <button onClick={() => del(q.id)} className="back" style={{ flexShrink: 0, color:'var(--ink-4)' }}>
                {Icon.trash}
              </button>
            </div>

            {/* Bouton Régénérer */}
            <div style={{ borderTop:'1px solid var(--line)', padding:'8px 12px' }}>
              <button
                onClick={() => startRegen(q)}
                disabled={regenLoading}
                style={{
                  background: 'none', border: 'none', cursor: regenLoading ? 'wait' : 'pointer',
                  display:'flex', alignItems:'center', gap: 6,
                  color: 'var(--accent)', fontSize: 12.5, fontWeight: 500,
                  padding: '4px 0', opacity: regenLoading && regenId !== q.id ? 0.4 : 1,
                  fontFamily:'var(--font-body)',
                }}
              >
                {isRegen
                  ? <><span className="spin" style={{ borderTopColor:'var(--accent)', width:13, height:13 }}/> Génération…</>
                  : <>{Icon.sparkles} Regénérer avec de nouvelles questions{!q.photo && ' (reprendre en photo)'}</>
                }
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}

/* ================================================================
   VOCAB
   ================================================================ */
const VOCAB = [
  { term: 'Crémer', def: "Travailler beurre + sucre jusqu'à obtenir un mélange mousseux et clair." },
  { term: 'Sabler', def: 'Mélanger farine et beurre froid du bout des doigts pour une texture sableuse.' },
  { term: 'Blanchir', def: "Fouetter œufs/jaunes + sucre jusqu'à éclaircissement et formation d'un ruban." },
  { term: 'Tourer', def: 'Donner des tours de pliage à une pâte feuilletée.' },
  { term: 'Pocher', def: 'Dresser une préparation à la poche à douille.' },
  { term: 'Corner', def: 'Racler une préparation avec une corne pour ne rien perdre.' },
  { term: 'Turbiner', def: 'Faire prendre une glace dans une sorbetière en mouvement.' },
  { term: 'Monter', def: "Battre une préparation pour incorporer de l'air (blancs, crème)." },
  { term: 'Détendre', def: 'Assouplir une pâte ou crème avec un liquide ou en la travaillant.' },
  { term: 'Chemiser', def: 'Tapisser un moule avec un papier, du beurre, du sucre ou un biscuit.' },
  { term: 'Abaisser', def: "Étaler une pâte au rouleau à l'épaisseur voulue." },
  { term: 'Fraiser', def: 'Écraser une pâte avec la paume pour la rendre homogène.' },
  { term: 'Émulsionner', def: 'Mélanger 2 liquides non miscibles (gras + eau) — ex. ganache.' },
  { term: 'Foisonner', def: "Augmenter le volume d'une préparation en y intégrant de l'air." },
  { term: 'Ruban', def: 'Stade où la pâte forme un ruban qui retombe lentement.' },
  { term: 'Bain-marie', def: "Cuisson douce dans un récipient placé dans de l'eau chaude." },
  { term: 'Tempérage', def: 'Stabilisation du beurre de cacao par courbe de T° pour un chocolat brillant.' },
];

function VocabTab() {
  const [q, setQ] = rS('');
  const [open, setOpen] = rS(null);
  const filtered = VOCAB.filter(v =>
    v.term.toLowerCase().includes(q.toLowerCase()) ||
    v.def.toLowerCase().includes(q.toLowerCase())
  );
  return (
    <div className="pop">
      <div style={{ position:'relative', marginBottom: 14 }}>
        <div style={{ position:'absolute', left: 14, top: '50%', transform:'translateY(-50%)', color:'var(--ink-4)' }}>{Icon.search}</div>
        <input className="input" placeholder="Chercher un terme…" value={q} onChange={e => setQ(e.target.value)} style={{ paddingLeft: 42 }}/>
      </div>
      <div className="eyebrow" style={{ marginBottom: 10 }}>{filtered.length} terme{filtered.length > 1 ? 's' : ''}</div>
      <div style={{ display:'flex', flexDirection:'column', gap: 6 }}>
        {filtered.map((v, i) => {
          const isOpen = open === i;
          return (
            <button key={i} onClick={() => setOpen(isOpen ? null : i)} style={{
              textAlign:'left', cursor:'pointer',
              background: isOpen ? 'var(--paper-2)' : 'transparent',
              border: '1px solid var(--line)',
              borderRadius:'var(--radius)',
              padding: '14px 16px', width: '100%',
              transition: 'background .15s',
            }}>
              <div style={{ display:'flex', alignItems:'center', gap: 10 }}>
                <div className="display" style={{ fontSize: 20, flex: 1 }}>
                  <span style={{ fontStyle:'italic' }}>{v.term}</span>
                </div>
                <span style={{ color:'var(--ink-4)', fontSize: 18, fontFamily:'var(--font-display)' }}>
                  {isOpen ? '−' : '+'}
                </span>
              </div>
              {isOpen && (
                <div style={{ fontSize: 14, color:'var(--ink-2)', marginTop: 8, lineHeight: 1.5 }}>
                  {v.def}
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ================================================================
   ROOT
   ================================================================ */
function RevisionsScreen() {
  const [tab, setTab] = rS('quiz');

  rE(() => {
    if (!('Notification' in window) || Notification.permission !== 'granted') return;
    const quizzes = window.Storage.loadPhotoQuizzes();
    const today = new Date(); today.setHours(0, 0, 0, 0);
    const todayStr = today.toISOString().slice(0, 10);
    quizzes.forEach(q => {
      if (!q.controlDate) return;
      const exam = new Date(q.controlDate); exam.setHours(0, 0, 0, 0);
      const days = Math.round((exam - today) / 86400000);
      if (days < 0 || days > 2) return;
      const key = `notif.${q.id}.${todayStr}`;
      if (localStorage.getItem(key)) return;
      const messages = days === 0
        ? { title: `🎂 Le grand jour, c'est aujourd'hui !`, body: `Chef Ganache compte sur toi pour "${q.title}". Allez, un dernier quiz et tu es prêt(e) !` }
        : days === 1
        ? { title: `👨‍🍳 Demain c'est le contrôle !`, body: `Chef Ganache te rappelle : "${q.title}" c'est demain. Regénère un quiz ce soir pour arriver au top !` }
        : { title: `🥐 Dans 2 jours — Chef Ganache veille !`, body: `"${q.title}" approche. Prends 10 minutes pour t'entraîner, Chef Ganache sera fier de toi.` };
      new Notification(messages.title, { body: messages.body });
      localStorage.setItem(key, '1');
    });
  }, []);

  const tabs = [
    ['quiz', 'Quiz'],
    ['flash', 'Flash'],
    ['mine', 'Mes Quiz'],
    ['vocab', 'Vocab'],
    ['temp', 'T°'],
    ['photo', 'Photo'],
  ];
  return (
    <div className="screen pop">
      <div className="topbar">
        <h1>Révisions</h1>
      </div>
      <div className="eyebrow" style={{ marginBottom: 14 }}>Préparer le CAP</div>

      <div className="chips" style={{ marginBottom: 22 }}>
        {tabs.map(([k, l]) => (
          <button key={k} className={`chip ${tab === k ? 'active' : ''}`} onClick={() => setTab(k)}>{l}</button>
        ))}
      </div>

      {tab === 'quiz' && <QuizTab/>}
      {tab === 'flash' && <FlashcardsTab/>}
      {tab === 'mine' && <MyQuizTab/>}
      {tab === 'vocab' && <VocabTab/>}
      {tab === 'temp' && <TemperaturesTab/>}
      {tab === 'photo' && <PhotoQuizTab/>}
    </div>
  );
}

window.RevisionsScreen = RevisionsScreen;
