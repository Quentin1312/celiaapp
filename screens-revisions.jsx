/* ================================================================
   Module Révisions CAP — 6 onglets:
   - Quiz   (banque par défaut + IA générées + quiz géant)
   - Flash  (flashcards recto/verso)
   - Mes Quiz (quiz photo sauvegardés)
   - Vocab  (réutilise CapVocab)
   - T°     (tableau températures)
   - Photo  (upload photo → IA génère + sauvegarde)
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
   QUIZ PLAYER — composant réutilisable
   ================================================================ */
function QuizPlayer({ questions, title, onExit }) {
  const [idx, setIdx] = rS(0);
  const [score, setScore] = rS(0);
  const [picked, setPicked] = rS(null);
  const [done, setDone] = rS(false);

  const cur = questions[idx];

  function pick(i) {
    if (picked !== null) return;
    setPicked(i);
    if (i === cur.correct) setScore(s => s + 1);
  }
  function next() {
    if (idx + 1 >= questions.length) setDone(true);
    else { setIdx(idx + 1); setPicked(null); }
  }
  function restart() {
    setIdx(0); setScore(0); setPicked(null); setDone(false);
  }

  if (done) {
    const pct = Math.round((score / questions.length) * 100);
    const msg = pct >= 80 ? '🌟 Excellent, tu maîtrises !' : pct >= 60 ? '👍 Bon, continue à réviser !' : '📚 À retravailler — courage !';
    return (
      <div className="card pop" style={{ textAlign: 'center', padding: 24 }}>
        {title && <div style={{ fontFamily: 'var(--font-script)', fontSize: 22, color: 'var(--ink-soft)', marginBottom: 8 }}>{title}</div>}
        <div style={{ fontFamily: 'var(--font-script)', fontSize: 40, fontWeight: 700, color: 'var(--rose-deep)' }}>
          {score} / {questions.length}
        </div>
        <div style={{ fontFamily: 'var(--font-script)', fontSize: 28, color: 'var(--ink)', marginTop: 4 }}>{pct}%</div>
        <div style={{ fontFamily: 'var(--font-hand)', fontSize: 18, color: 'var(--ink-soft)', marginTop: 12 }}>{msg}</div>
        <button className="btn btn-primary" onClick={restart} style={{ marginTop: 18, width: '100%' }}>Recommencer</button>
        {onExit && <button className="btn btn-ghost" onClick={onExit} style={{ marginTop: 8, width: '100%' }}>Retour</button>}
      </div>
    );
  }

  const progress = ((idx + (picked !== null ? 1 : 0)) / questions.length) * 100;

  return (
    <div className="pop">
      {title && (
        <div style={{ marginBottom: 8, display: 'flex', alignItems: 'center', gap: 8 }}>
          {onExit && <button className="btn btn-ghost" onClick={onExit} style={{ padding: '6px 12px', fontSize: 12 }}>← Retour</button>}
          <span style={{ fontFamily: 'var(--font-script)', fontSize: 22, fontWeight: 600, lineHeight: 1.2, flex: 1 }}>{title}</span>
        </div>
      )}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
        <div style={{ flex: 1, height: 6, background: 'rgba(58,42,31,.1)', borderRadius: 3, overflow: 'hidden' }}>
          <div style={{ width: `${progress}%`, height: '100%', background: 'var(--rose-deep)', transition: 'width .3s' }}/>
        </div>
        <span style={{ fontFamily: 'var(--font-body)', fontSize: 12, fontWeight: 700, color: 'var(--ink-soft)' }}>{idx + 1}/{questions.length}</span>
        <span style={{ fontFamily: 'var(--font-script)', fontSize: 20, fontWeight: 700, color: 'var(--mint-deep)' }}>✓ {score}</span>
      </div>

      <div className="card" style={{ padding: 18, marginBottom: 12 }}>
        <div style={{ fontFamily: 'var(--font-hand)', fontSize: 19, lineHeight: 1.4, color: 'var(--ink)' }}>{cur.q}</div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {cur.a.map((opt, i) => {
          const isCorrect = i === cur.correct;
          const isPicked = picked === i;
          let bg = 'var(--paper)', border = '1px solid var(--line)', color = 'var(--ink)';
          if (picked !== null) {
            if (isCorrect) { bg = 'var(--mint-pale)'; border = '2px solid var(--mint-deep)'; color = 'var(--mint-deep)'; }
            else if (isPicked) { bg = 'var(--rose-pale)'; border = '2px solid var(--rose-deep)'; color = 'var(--rose-deep)'; }
          }
          return (
            <button key={i} onClick={() => pick(i)} disabled={picked !== null}
              style={{ background: bg, border, color, borderRadius: 14, padding: '12px 14px',
                fontFamily: 'var(--font-hand)', fontSize: 17, textAlign: 'left',
                cursor: picked === null ? 'pointer' : 'default',
                display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{ width: 26, height: 26, borderRadius: '50%', background: 'rgba(58,42,31,.08)',
                fontFamily: 'var(--font-script)', fontWeight: 700, fontSize: 17,
                display: 'grid', placeItems: 'center', flexShrink: 0 }}>{['A','B','C','D'][i]}</span>
              <span style={{ flex: 1 }}>{opt}</span>
              {picked !== null && isCorrect && <span style={{ fontSize: 18 }}>✓</span>}
              {picked !== null && isPicked && !isCorrect && <span style={{ fontSize: 18 }}>✗</span>}
            </button>
          );
        })}
      </div>

      {picked !== null && (
        <button className="btn btn-primary" onClick={next} style={{ marginTop: 14, width: '100%' }}>
          {idx + 1 >= questions.length ? 'Voir mon score' : 'Suivant →'}
        </button>
      )}
    </div>
  );
}

/* ================================================================
   QUIZ TAB — menu de modes + génération IA
   ================================================================ */
function QuizTab() {
  const [mode, setMode] = rS('menu');           // 'menu' | 'classic' | 'giant' | 'ai'
  const [aiBank, setAiBank] = rS(() => window.Storage.loadQuizBank());
  const [photoQuizzes, setPhotoQuizzes] = rS(() => window.Storage.loadPhotoQuizzes());
  const [generating, setGenerating] = rS(false);
  const [genError, setGenError] = rS('');
  const [genTheme, setGenTheme] = rS('mix');
  const [showGen, setShowGen] = rS(false);
  const [activeQuiz, setActiveQuiz] = rS(null); // {questions, title}

  function startClassic() {
    setActiveQuiz({ questions: shuffle(QUIZ_BANK).slice(0, 10), title: 'Quiz CAP' });
  }
  function startAI() {
    if (!aiBank.length) return;
    setActiveQuiz({ questions: shuffle(aiBank).slice(0, Math.min(10, aiBank.length)), title: 'Quiz IA' });
  }
  function startGiant() {
    // mélange tout : banque + IA + toutes questions des photo-quiz
    const all = [
      ...QUIZ_BANK,
      ...aiBank,
      ...photoQuizzes.flatMap(pq => pq.questions || []),
    ];
    if (!all.length) return;
    setActiveQuiz({ questions: shuffle(all).slice(0, 15), title: 'Quiz géant 🎲' });
  }

  async function generate() {
    setGenerating(true);
    setGenError('');
    try {
      const avoid = aiBank.map(q => q.q).concat(QUIZ_BANK.map(q => q.q));
      const result = await window.AI.generateQuestions(genTheme, avoid);
      if (!result?.questions?.length) throw new Error('Pas de questions générées');
      const next = window.Storage.addToQuizBank(result.questions);
      setAiBank(next);
      setShowGen(false);
    } catch (e) {
      console.error(e);
      setGenError(e.message || 'Erreur lors de la génération');
    } finally {
      setGenerating(false);
    }
  }

  function clearAiBank() {
    if (!confirm('Effacer toutes les questions générées par IA ?')) return;
    window.Storage.saveQuizBank([]);
    setAiBank([]);
  }

  if (activeQuiz) {
    return <QuizPlayer
      questions={activeQuiz.questions}
      title={activeQuiz.title}
      onExit={() => setActiveQuiz(null)}/>;
  }

  // Menu
  const totalQuestions = QUIZ_BANK.length + aiBank.length + photoQuizzes.reduce((n, q) => n + (q.questions?.length || 0), 0);

  return (
    <div className="pop" style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      <ModeCard
        title="Quiz CAP classique"
        subtitle={`${QUIZ_BANK.length} questions de référence`}
        cta="10 questions au hasard"
        accent="rose"
        onClick={startClassic}/>

      <ModeCard
        title="Quiz IA personnalisé"
        subtitle={aiBank.length ? `${aiBank.length} questions IA en banque` : 'aucune question IA — génère-en !'}
        cta={aiBank.length ? "Lancer le quiz IA" : "Génère ta première fournée ↓"}
        accent="mint"
        disabled={!aiBank.length}
        onClick={startAI}/>

      <button onClick={() => setShowGen(true)} className="btn btn-mint" style={{ marginTop: 4 }}>
        ✨ Générer 10 nouvelles questions IA
      </button>
      {aiBank.length > 0 && (
        <button onClick={clearAiBank} className="btn btn-ghost" style={{ fontSize: 12, padding: '6px 12px', alignSelf: 'flex-end' }}>
          🗑️ Effacer la banque IA
        </button>
      )}

      <div style={{ height: 8 }}/>

      <ModeCard
        title="Quiz GÉANT 🎲"
        subtitle={`mélange tout : banque + IA + photo-quiz (${totalQuestions} questions)`}
        cta="15 questions tirées au hasard de partout"
        accent="cream"
        onClick={startGiant}/>

      {/* Generation modal */}
      {showGen && (
        <div className="modal-backdrop" onClick={() => !generating && setShowGen(false)}>
          <div className="modal-sheet" onClick={e => e.stopPropagation()}>
            <div className="grabber"/>
            <div style={{ marginBottom: 14 }}>
              <span className="watercolor mint" style={{ fontSize: 26 }}>Générer des questions</span>
            </div>
            <div style={{ fontFamily: 'var(--font-hand)', fontSize: 16, color: 'var(--ink-soft)', marginBottom: 12, lineHeight: 1.4 }}>
              L'IA va créer 10 questions inédites niveau CAP, ajoutées à ta banque.
            </div>
            <div style={{ marginBottom: 12 }}>
              <div style={{ fontFamily: 'var(--font-body)', fontSize: 12, fontWeight: 700, color: 'var(--ink-soft)', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 8 }}>Thème</div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                {[
                  ['mix', '🎲 Mix tout'],
                  ['techniques', '👨‍🍳 Techniques'],
                  ['temperatures', '🌡️ Températures'],
                  ['proportions', '⚖️ Proportions'],
                  ['hygiene', '🧼 Hygiène'],
                  ['materiel', '🥄 Matériel'],
                ].map(([k, l]) => (
                  <button key={k}
                    className={`chip ${genTheme === k ? 'active' : ''}`}
                    onClick={() => setGenTheme(k)}
                    style={{ padding: '10px 8px', textAlign: 'center' }}>
                    {l}
                  </button>
                ))}
              </div>
            </div>
            {genError && (
              <div style={{ background: 'var(--rose-pale)', borderRadius: 10, padding: 10, marginBottom: 10, fontFamily: 'var(--font-hand)', fontSize: 14, color: 'var(--rose-deep)' }}>
                ⚠️ {genError}
              </div>
            )}
            <button className="btn btn-primary" onClick={generate} disabled={generating} style={{ width: '100%' }}>
              {generating ? <><span className="spin"/> Génération en cours…</> : '✨ Générer 10 questions'}
            </button>
            <button className="btn btn-ghost" onClick={() => setShowGen(false)} disabled={generating} style={{ width: '100%', marginTop: 8 }}>
              Annuler
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function ModeCard({ title, subtitle, cta, accent = 'rose', onClick, disabled }) {
  const accentColor = accent === 'mint' ? 'var(--mint-deep)' : accent === 'cream' ? '#a87838' : 'var(--rose-deep)';
  const accentBg = accent === 'mint' ? 'var(--mint-pale)' : accent === 'cream' ? 'var(--cream)' : 'var(--rose-pale)';
  return (
    <button onClick={onClick} disabled={disabled} className="card pop" style={{
      textAlign: 'left', cursor: disabled ? 'not-allowed' : 'pointer', opacity: disabled ? .5 : 1,
      border: 'none', padding: 14, display: 'flex', flexDirection: 'column', gap: 4,
      background: accentBg,
    }}>
      <div style={{ fontFamily: 'var(--font-script)', fontSize: 24, fontWeight: 700, color: accentColor, lineHeight: 1.1 }}>
        {title}
      </div>
      <div style={{ fontFamily: 'var(--font-body)', fontSize: 12, color: 'var(--ink-soft)' }}>{subtitle}</div>
      <div style={{ fontFamily: 'var(--font-hand)', fontSize: 16, color: 'var(--ink)', marginTop: 6 }}>{cta} →</div>
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
    if (idx + 1 >= deck.length) {
      setIdx(0);
      setDeck(shuffle(FLASHCARDS));
      setKnown(0);
    } else { setIdx(idx + 1); }
  }

  const card = deck[idx];

  return (
    <div className="pop">
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
        <span style={{ fontFamily: 'var(--font-body)', fontSize: 12, fontWeight: 700, color: 'var(--ink-soft)' }}>Carte {idx + 1}/{deck.length}</span>
        <div style={{ flex: 1 }}/>
        <span style={{ fontFamily: 'var(--font-script)', fontSize: 20, fontWeight: 700, color: 'var(--mint-deep)' }}>✓ {known} su{known > 1 ? 's' : ''}</span>
      </div>

      <div onClick={() => setFlipped(!flipped)}
        style={{ width: '100%', height: 280, perspective: 1200, cursor: 'pointer', marginBottom: 18 }}>
        <div style={{
          width: '100%', height: '100%', transformStyle: 'preserve-3d',
          transition: 'transform .55s cubic-bezier(.4, .2, .3, 1)',
          transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
          position: 'relative',
        }}>
          <div style={{ position: 'absolute', inset: 0, backfaceVisibility: 'hidden',
            background: 'var(--paper)', border: '1px solid var(--line-soft)', borderRadius: 18,
            boxShadow: 'var(--shadow-card)', display: 'grid', placeItems: 'center', padding: 24,
            transform: 'rotate(-.5deg)' }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontFamily: 'var(--font-body)', fontSize: 11, fontWeight: 700, color: 'var(--ink-faint)', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 12 }}>Terme</div>
              <div style={{ fontFamily: 'var(--font-script)', fontSize: 48, fontWeight: 700, color: 'var(--ink)', lineHeight: 1.1 }}>{card.f}</div>
              <div style={{ fontFamily: 'var(--font-hand)', fontSize: 14, color: 'var(--ink-faint)', marginTop: 18 }}>tap pour retourner ↻</div>
            </div>
          </div>
          <div style={{ position: 'absolute', inset: 0, backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg) rotate(.5deg)',
            background: 'var(--mint-pale)', border: '1px solid var(--mint-deep)', borderRadius: 18,
            boxShadow: 'var(--shadow-card)', display: 'grid', placeItems: 'center', padding: 28 }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontFamily: 'var(--font-body)', fontSize: 11, fontWeight: 700, color: 'var(--mint-deep)', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 12 }}>Définition</div>
              <div style={{ fontFamily: 'var(--font-hand)', fontSize: 19, color: 'var(--ink)', lineHeight: 1.45 }}>{card.b}</div>
            </div>
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', gap: 10 }}>
        <button className="btn btn-ghost" onClick={() => next(false)} style={{ flex: 1 }}>🔁 À revoir</button>
        <button className="btn btn-mint" onClick={() => next(true)} style={{ flex: 1 }}>✓ Je sais</button>
      </div>
    </div>
  );
}

/* ================================================================
   TEMPÉRATURES
   ================================================================ */
function TemperaturesTab() {
  return (
    <div className="pop" style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      {TEMP_TABLES.map((t, i) => (
        <div key={i} className="card" style={{ padding: 14 }}>
          <div style={{ marginBottom: 10 }}>
            <span className={`watercolor ${i === 0 ? '' : i === 1 ? 'cream' : i === 2 ? 'mint' : ''}`} style={{ fontSize: 24, padding: '2px 14px' }}>{t.title}</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            {t.rows.map((row, j) => (
              <div key={j} style={{
                display: 'grid', gridTemplateColumns: '1fr auto', columnGap: 12, rowGap: 2,
                padding: '8px 0',
                borderBottom: j < t.rows.length - 1 ? '1px dashed var(--line)' : 'none',
                alignItems: 'baseline',
              }}>
                <div style={{ fontFamily: 'var(--font-hand)', fontSize: 17, color: 'var(--ink)' }}>{row[0]}</div>
                <div style={{ fontFamily: 'var(--font-script)', fontSize: 20, fontWeight: 700, color: 'var(--rose-deep)', whiteSpace: 'nowrap' }}>{row[1]}</div>
                {row[2] && <div style={{ gridColumn: '1 / -1', fontFamily: 'var(--font-body)', fontSize: 12, color: 'var(--ink-faint)', fontStyle: 'italic' }}>{row[2]}</div>}
              </div>
            ))}
          </div>
        </div>
      ))}
      <div style={{ fontFamily: 'var(--font-hand)', fontSize: 14, color: 'var(--ink-faint)', textAlign: 'center', padding: '4px 0 8px' }}>
        💡 Astuce : ces températures sont à connaître par cœur pour le CAP.
      </div>
    </div>
  );
}

/* ================================================================
   PHOTO → QUIZ + bibliothèque "Mes Quiz"
   ================================================================ */
function PhotoQuizTab() {
  const [photo, setPhoto] = rS('');
  const [loading, setLoading] = rS(false);
  const [error, setError] = rS('');
  const [pending, setPending] = rS(null); // quiz fraîchement généré, pas encore sauvegardé
  const [activeQuiz, setActiveQuiz] = rS(null); // quiz en cours de lecture (rejouer un sauvegardé)

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
    setLoading(true);
    setError('');
    try {
      const result = await window.AI.photoQuiz(photo);
      if (!result?.questions?.length) throw new Error('Pas de questions générées');
      // store also a small thumbnail for the library
      const thumb = await makeThumb(photo, 200);
      setPending({ ...result, thumb });
    } catch (e) {
      console.error(e);
      setError(e.message || 'Erreur. Vérifie que ta clé Gemini est configurée (le mode photo nécessite Gemini).');
    } finally {
      setLoading(false);
    }
  }

  function saveAndPlay() {
    if (!pending) return;
    window.Storage.addPhotoQuiz({
      title: pending.title,
      thumb: pending.thumb,
      questions: pending.questions,
    });
    setActiveQuiz({ title: pending.title, questions: pending.questions });
    setPending(null);
    setPhoto('');
  }

  function discardAndPlay() {
    if (!pending) return;
    setActiveQuiz({ title: pending.title, questions: pending.questions });
    setPending(null);
    setPhoto('');
  }

  if (activeQuiz) {
    return <QuizPlayer questions={activeQuiz.questions} title={activeQuiz.title} onExit={() => setActiveQuiz(null)}/>;
  }

  // Pending = preview du quiz généré, propose sauvegarder
  if (pending) {
    return (
      <div className="pop">
        <div className="card" style={{ padding: 16 }}>
          <div style={{ fontFamily: 'var(--font-script)', fontSize: 26, fontWeight: 700, color: 'var(--ink)', marginBottom: 6 }}>
            ✨ Quiz prêt !
          </div>
          <div style={{ fontFamily: 'var(--font-hand)', fontSize: 18, color: 'var(--ink-soft)', marginBottom: 12 }}>
            <strong>{pending.title}</strong><br/>
            {pending.questions.length} questions générées par l'IA
          </div>
          {pending.thumb && (
            <img src={pending.thumb} alt="" style={{ width: 80, height: 80, objectFit: 'cover', borderRadius: 12, border: '1px solid var(--line)', marginBottom: 12 }}/>
          )}
          <button className="btn btn-primary" onClick={saveAndPlay} style={{ width: '100%' }}>
            💾 Sauvegarder et commencer
          </button>
          <button className="btn btn-ghost" onClick={discardAndPlay} style={{ width: '100%', marginTop: 8 }}>
            Jouer sans sauvegarder
          </button>
          <button className="btn btn-ghost" onClick={() => { setPending(null); setPhoto(''); }} style={{ width: '100%', marginTop: 4, color: 'var(--ink-faint)', fontSize: 13 }}>
            Annuler
          </button>
        </div>
      </div>
    );
  }

  // Initial: upload UI
  return (
    <div className="pop">
      <div className="card" style={{ padding: 14, marginBottom: 14, background: 'var(--mint-pale)' }}>
        <div style={{ fontFamily: 'var(--font-hand)', fontSize: 16, color: 'var(--ink)', lineHeight: 1.45 }}>
          📸 <strong>Prends en photo ta fiche de cours</strong> — l'IA lit le contenu et te génère un quiz que tu peux sauvegarder dans <em>Mes Quiz</em> pour le rejouer plus tard.
        </div>
      </div>

      <label style={{ display: 'block', cursor: 'pointer', marginBottom: 14 }}>
        <input type="file" accept="image/*" capture="environment" onChange={pickPhoto} style={{ display: 'none' }}/>
        {photo ? (
          <div style={{ position: 'relative', borderRadius: 14, overflow: 'hidden', border: '1px solid var(--line)' }}>
            <img src={photo} alt="" style={{ width: '100%', display: 'block', maxHeight: 300, objectFit: 'cover' }}/>
            <button type="button" onClick={(e) => { e.preventDefault(); setPhoto(''); }}
              className="back" style={{ position: 'absolute', top: 8, right: 8, background: 'rgba(255,255,255,.95)' }}>✕</button>
          </div>
        ) : (
          <div style={{ border: '2px dashed var(--rose-deep)', borderRadius: 18, padding: 36, textAlign: 'center', background: 'rgba(255,255,255,.4)' }}>
            <div style={{ fontSize: 42 }}>📷</div>
            <div style={{ fontFamily: 'var(--font-script)', fontSize: 22, fontWeight: 600, color: 'var(--ink)', marginTop: 6 }}>Choisir / prendre une photo</div>
            <div style={{ fontFamily: 'var(--font-body)', fontSize: 12, color: 'var(--ink-faint)', marginTop: 4 }}>fiche, recette, document de cours</div>
          </div>
        )}
      </label>

      {photo && (
        <button className="btn btn-primary" onClick={generate} disabled={loading} style={{ width: '100%' }}>
          {loading ? <><span className="spin"/> L'IA lit ta fiche…</> : '✨ Générer le quiz'}
        </button>
      )}

      {error && (
        <div className="card" style={{ marginTop: 12, padding: 12, background: 'var(--rose-pale)', borderColor: 'var(--rose-deep)' }}>
          <div style={{ fontFamily: 'var(--font-hand)', fontSize: 15, color: 'var(--rose-deep)' }}>⚠️ {error}</div>
        </div>
      )}

      <div style={{ fontFamily: 'var(--font-hand)', fontSize: 14, color: 'var(--ink-faint)', marginTop: 14, lineHeight: 1.5, textAlign: 'center' }}>
        Cette fonction utilise <strong>Gemini</strong> (lecture d'image).
      </div>
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
   MES QUIZ — bibliothèque des quiz photo sauvegardés
   ================================================================ */
function MyQuizTab() {
  const [quizzes, setQuizzes] = rS(() => window.Storage.loadPhotoQuizzes());
  const [active, setActive] = rS(null);

  function del(id) {
    if (!confirm('Supprimer ce quiz ?')) return;
    setQuizzes(window.Storage.deletePhotoQuiz(id));
  }

  if (active) {
    return <QuizPlayer questions={active.questions} title={active.title} onExit={() => setActive(null)}/>;
  }

  if (!quizzes.length) {
    return (
      <div className="card pop" style={{ textAlign: 'center', padding: 28 }}>
        <div style={{ fontSize: 42 }}>📚</div>
        <div style={{ fontFamily: 'var(--font-script)', fontSize: 24, fontWeight: 600, marginTop: 8 }}>Aucun quiz sauvegardé</div>
        <div style={{ fontFamily: 'var(--font-hand)', fontSize: 16, color: 'var(--ink-soft)', marginTop: 8, lineHeight: 1.4 }}>
          Va dans l'onglet <strong>Photo</strong>,<br/>prends en photo ta fiche de cours,<br/>l'IA générera un quiz que tu pourras sauvegarder ici.
        </div>
      </div>
    );
  }

  return (
    <div className="pop" style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <div style={{ fontFamily: 'var(--font-hand)', fontSize: 15, color: 'var(--ink-soft)', marginBottom: 4 }}>
        {quizzes.length} quiz sauvegardé{quizzes.length > 1 ? 's' : ''} — tape pour rejouer
      </div>
      {quizzes.map(q => (
        <div key={q.id} className="card" style={{ padding: 10, display: 'flex', alignItems: 'center', gap: 12 }}>
          <button onClick={() => setActive(q)} style={{
            flex: 1, display: 'flex', alignItems: 'center', gap: 12,
            background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left', padding: 0,
          }}>
            <div style={{ width: 60, height: 60, borderRadius: 10, background: 'var(--paper-warm)', flexShrink: 0,
              backgroundImage: q.thumb ? `url(${q.thumb})` : undefined,
              backgroundSize: 'cover', backgroundPosition: 'center',
              display: 'grid', placeItems: 'center', border: '1px solid var(--line-soft)' }}>
              {!q.thumb && <span style={{ fontSize: 24 }}>📷</span>}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontFamily: 'var(--font-script)', fontSize: 20, fontWeight: 600, color: 'var(--ink)', lineHeight: 1.1, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {q.title}
              </div>
              <div style={{ fontFamily: 'var(--font-body)', fontSize: 12, color: 'var(--ink-faint)', marginTop: 2 }}>
                {q.questions?.length || 0} questions · {new Date(q.createdAt).toLocaleDateString('fr-FR')}
              </div>
            </div>
          </button>
          <button onClick={() => del(q.id)} className="back" style={{ flexShrink: 0, color: 'var(--rose-deep)' }}>
            {window.Icon?.trash || '🗑️'}
          </button>
        </div>
      ))}
    </div>
  );
}

/* ================================================================
   ROOT — Tab navigator
   ================================================================ */
function RevisionsScreen() {
  const [tab, setTab] = rS('quiz');
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
      <div style={{ marginBottom: 12 }}>
        <span className="watercolor mint">Mes Révisions</span>
      </div>
      <div className="tabs" style={{ marginBottom: 14, overflowX: 'auto' }}>
        {tabs.map(([k, l]) => (
          <button key={k} className={tab === k ? 'active' : ''} onClick={() => setTab(k)} style={{ flex: '0 0 auto', whiteSpace: 'nowrap' }}>
            {l}
          </button>
        ))}
      </div>
      {tab === 'quiz' && <QuizTab/>}
      {tab === 'flash' && <FlashcardsTab/>}
      {tab === 'mine' && <MyQuizTab/>}
      {tab === 'vocab' && window.CapVocab && <window.CapVocab/>}
      {tab === 'temp' && <TemperaturesTab/>}
      {tab === 'photo' && <PhotoQuizTab/>}
    </div>
  );
}

window.RevisionsScreen = RevisionsScreen;
