/* Tools, Profile screens — refonte épurée */

const { useState: uS3, useEffect: uE3, useRef: uR3 } = React;

/* -------- TOOLS -------- */
function ToolsScreen() {
  const [view, setView] = uS3('menu');
  return (
    <div className="screen pop">
      <div className="topbar"><h1>Outils</h1></div>
      {view === 'menu' && <ToolsMenu setView={setView}/>}
      {view === 'convert' && <Converter onBack={() => setView('menu')}/>}
      {view === 'timers' && <Timers onBack={() => setView('menu')}/>}
    </div>
  );
}

function ToolsMenu({ setView }) {
  const items = [
    { key: 'convert', label: 'Convertisseur', sub: 'Recalculer les quantités selon les portions', icon: Icon.tools },
    { key: 'timers',  label: 'Timers',        sub: 'Jusqu\'à 4 minuteurs en parallèle',           icon: Icon.clock },
  ];
  return (
    <div style={{ display:'flex', flexDirection:'column', gap: 10 }}>
      <div className="eyebrow" style={{ marginBottom: 6 }}>Boîte à outils</div>
      {items.map(it => (
        <button key={it.key} onClick={() => setView(it.key)} style={{
          textAlign:'left', cursor:'pointer',
          background:'var(--paper-2)',
          border: '1px solid var(--line)',
          borderRadius:'var(--radius-lg)',
          display:'flex', alignItems:'center', gap: 14, padding: 18,
        }}>
          <div style={{ width: 44, height: 44, borderRadius: '50%',
            background: 'var(--accent-bg)', color: 'var(--accent-ink)',
            display:'grid', placeItems:'center', flexShrink: 0 }}>
            {it.icon}
          </div>
          <div style={{ flex: 1 }}>
            <div className="display" style={{ fontSize: 22 }}>{it.label}</div>
            <div style={{ fontSize: 12.5, color:'var(--ink-3)', marginTop: 3 }}>{it.sub}</div>
          </div>
          <div style={{ color:'var(--ink-4)' }}>{Icon.chevR}</div>
        </button>
      ))}
    </div>
  );
}

function Converter({ onBack }) {
  const [ingredients, setIngredients] = uS3([
    { qty: '200', unit: 'g', name: 'farine' },
    { qty: '100', unit: 'g', name: 'sucre' },
    { qty: '2', unit: '', name: 'œufs' },
  ]);
  const [from, setFrom] = uS3(4);
  const [to, setTo] = uS3(6);

  const ratio = from > 0 ? to / from : 1;
  const fmt = (n) => {
    if (!isFinite(n)) return '—';
    if (Math.abs(n - Math.round(n)) < 0.01) return Math.round(n).toString();
    return (Math.round(n * 10) / 10).toString().replace('.', ',');
  };
  const updateIng = (i, k, v) => setIngredients(arr => arr.map((x, idx) => idx === i ? { ...x, [k]: v } : x));
  const addIng = () => setIngredients(arr => [...arr, { qty: '', unit: 'g', name: '' }]);
  const rmIng = (i) => setIngredients(arr => arr.filter((_, idx) => idx !== i));

  return (
    <div>
      <div style={{ display:'flex', alignItems:'center', gap: 10, marginBottom: 18 }}>
        <button className="back" onClick={onBack}>{Icon.back}</button>
        <div className="display" style={{ fontSize: 28 }}>
          <span style={{ fontStyle:'italic' }}>Convertisseur</span>
        </div>
      </div>

      <div style={{ background:'var(--paper-2)', border:'1px solid var(--line)',
        borderRadius:'var(--radius-lg)', padding: 18, marginBottom: 22,
        display:'flex', alignItems:'center', justifyContent:'space-around', gap: 12 }}>
        <PortionInput label="Recette pour" value={from} onChange={setFrom}/>
        <div className="display" style={{ fontSize: 28, color: 'var(--ink-4)', fontStyle:'italic' }}>→</div>
        <PortionInput label="Je veux" value={to} onChange={setTo} accent/>
      </div>

      <div className="eyebrow" style={{ marginBottom: 10 }}>Ingrédients</div>
      <div style={{ display:'flex', flexDirection:'column', gap: 8 }}>
        {ingredients.map((ing, i) => (
          <div key={i} style={{
            display:'grid',
            gridTemplateColumns: '64px 52px 1fr auto auto',
            gap: 6, alignItems:'center',
          }}>
            <input className="input" type="number" placeholder="200" value={ing.qty} onChange={e => updateIng(i, 'qty', e.target.value)} style={{ padding: '10px 8px', textAlign:'center', fontSize: 14 }}/>
            <input className="input" placeholder="g" value={ing.unit} onChange={e => updateIng(i, 'unit', e.target.value)} style={{ padding: '10px 8px', textAlign:'center', fontSize: 14 }}/>
            <input className="input" placeholder="farine" value={ing.name} onChange={e => updateIng(i, 'name', e.target.value)} style={{ padding: '10px 12px', fontSize: 14 }}/>
            <div style={{ fontFamily:'var(--font-display)', fontStyle:'italic', fontSize: 18, color:'var(--accent)', minWidth: 56, textAlign:'right' }}>
              {fmt(parseFloat(ing.qty.toString().replace(',','.')) * ratio)} {ing.unit}
            </div>
            {ingredients.length > 1 && <button className="back" style={{ width: 32, height: 32 }} onClick={() => rmIng(i)}>{Icon.close}</button>}
          </div>
        ))}
        <button className="btn btn-ghost" onClick={addIng} style={{ alignSelf:'flex-start', fontSize: 13 }}>{Icon.plus} ingrédient</button>
      </div>
    </div>
  );
}

function PortionInput({ label, value, onChange, accent }) {
  return (
    <div style={{ textAlign:'center', flex: 1 }}>
      <div className="eyebrow" style={{ fontSize: 9.5, marginBottom: 6 }}>{label}</div>
      <input type="number" min="1" value={value} onChange={e => onChange(parseInt(e.target.value) || 1)}
        style={{
          width: '100%',
          fontFamily:'var(--font-display)',
          fontSize: 36, fontWeight: 400,
          color: accent ? 'var(--accent)' : 'var(--ink)',
          textAlign:'center',
          background: 'transparent',
          border: 'none',
          borderBottom: '1px solid var(--line-2)',
          outline: 'none',
          padding: '2px 0',
        }}/>
      <div className="eyebrow" style={{ fontSize: 9.5, marginTop: 4 }}>parts</div>
    </div>
  );
}

function Timers({ onBack }) {
  const [timers, setTimers] = uS3([
    { id: window.uid(), name: 'Cuisson', total: 25*60, remain: 25*60, running: false, ringing: false }
  ]);
  const tickRef = uR3();
  const [adding, setAdding] = uS3(false);
  const [newName, setNewName] = uS3('');
  const [newMin, setNewMin] = uS3(10);

  uE3(() => {
    tickRef.current = setInterval(() => {
      setTimers(arr => arr.map(t => {
        if (!t.running || t.ringing) return t;
        const r = t.remain - 1;
        if (r <= 0) {
          try {
            const ctx = new (window.AudioContext || window.webkitAudioContext)();
            const o = ctx.createOscillator(); const g = ctx.createGain();
            o.connect(g); g.connect(ctx.destination);
            o.frequency.value = 880; g.gain.value = 0.15;
            o.start(); setTimeout(() => { o.stop(); ctx.close(); }, 600);
          } catch(e){}
          return { ...t, remain: 0, running: false, ringing: true };
        }
        return { ...t, remain: r };
      }));
    }, 1000);
    return () => clearInterval(tickRef.current);
  }, []);

  const fmt = (s) => {
    const m = Math.floor(s/60), sec = s % 60;
    return `${String(m).padStart(2,'0')}:${String(sec).padStart(2,'0')}`;
  };
  const toggle = (id) => setTimers(arr => arr.map(t => t.id === id ? { ...t, running: !t.running, ringing: false } : t));
  const reset = (id) => setTimers(arr => arr.map(t => t.id === id ? { ...t, remain: t.total, running: false, ringing: false } : t));
  const remove = (id) => setTimers(arr => arr.filter(t => t.id !== id));
  const add = () => {
    if (timers.length >= 4) return;
    const min = Math.max(1, parseInt(newMin) || 10);
    setTimers(arr => [...arr, { id: window.uid(), name: newName.trim() || 'Timer', total: min*60, remain: min*60, running: false, ringing: false }]);
    setNewName(''); setNewMin(10); setAdding(false);
  };

  return (
    <div>
      <div style={{ display:'flex', alignItems:'center', gap: 10, marginBottom: 18 }}>
        <button className="back" onClick={onBack}>{Icon.back}</button>
        <div className="display" style={{ fontSize: 28, flex: 1 }}>
          <span style={{ fontStyle:'italic' }}>Timers</span>
        </div>
        <span className="eyebrow">{timers.length}/4</span>
      </div>

      <div style={{ display:'flex', flexDirection:'column', gap: 10 }}>
        {timers.map(t => (
          <div key={t.id} className={`timer ${t.ringing ? 'ringing' : ''}`}>
            <div className="digits">{fmt(t.remain)}</div>
            <div className="name" style={{ display:'flex', alignItems:'center', gap: 6 }}>
              {t.name}
              {t.ringing && <span style={{color:'var(--accent)', display:'flex'}}>{Icon.bell}</span>}
            </div>
            <button className="back" onClick={() => toggle(t.id)} style={{ color: t.running ? 'var(--accent)' : 'var(--ink)' }}>
              {t.running ? Icon.pause : Icon.play}
            </button>
            <button className="back" onClick={() => reset(t.id)}>{Icon.reset}</button>
            <button className="back" onClick={() => remove(t.id)}>{Icon.close}</button>
          </div>
        ))}

        {adding && timers.length < 4 && (
          <div style={{ background:'var(--paper-2)', border:'1px solid var(--line)', borderRadius:'var(--radius)', display:'flex', flexDirection:'column', gap: 10, padding: 14 }}>
            <input className="input" placeholder="Nom (levée, cuisson…)" value={newName} onChange={e => setNewName(e.target.value)}/>
            <div style={{ display:'flex', alignItems:'center', gap: 10 }}>
              <input type="number" min="1" max="180" className="input" value={newMin} onChange={e => setNewMin(e.target.value)} style={{ width: 90, textAlign:'center' }}/>
              <span style={{ fontSize: 13, color:'var(--ink-3)' }}>minutes</span>
              <div style={{ flex: 1 }}/>
              <button className="btn btn-ghost" onClick={() => setAdding(false)} style={{ padding:'9px 14px', fontSize: 13 }}>Annuler</button>
              <button className="btn btn-primary" onClick={add} style={{ padding:'9px 16px', fontSize: 13 }}>Créer</button>
            </div>
          </div>
        )}

        {!adding && timers.length < 4 && (
          <button className="btn btn-ghost" onClick={() => setAdding(true)} style={{ alignSelf:'center', marginTop: 4 }}>
            {Icon.plus} ajouter un timer
          </button>
        )}
      </div>
    </div>
  );
}

/* -------- PROFILE -------- */
function ProfileScreen({ profile, setProfile, recipes, onResetSeed, tweaks = { palette: 'default', fonts: 'dm-inter' }, setTweak = () => {}, user }) {
  const [name, setName] = uS3(profile.name);
  const [level, setLevel] = uS3(profile.level);
  const [photo, setPhoto] = uS3(profile.photo || '');

  function pickPhoto(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = ev => {
      const img = new Image();
      img.onload = () => {
        const maxSize = 400;
        const r = Math.min(1, maxSize / Math.max(img.width, img.height));
        const c = document.createElement('canvas');
        c.width = img.width * r; c.height = img.height * r;
        c.getContext('2d').drawImage(img, 0, 0, c.width, c.height);
        const dataUrl = c.toDataURL('image/jpeg', 0.88);
        setPhoto(dataUrl);
        const p = { name: name.trim() || 'Apprentie', level: level.trim() || 'CAP', photo: dataUrl };
        setProfile(p); window.Storage.saveProfile(p);
      };
      img.src = ev.target.result;
    };
    reader.readAsDataURL(file);
  }
  function removePhoto() {
    setPhoto('');
    const p = { name: name.trim() || 'Apprentie', level: level.trim() || 'CAP', photo: '' };
    setProfile(p); window.Storage.saveProfile(p);
  }
  function save() {
    const p = { name: name.trim() || 'Apprentie', level: level.trim() || 'CAP', photo: photo || '' };
    setProfile(p); window.Storage.saveProfile(p);
  }

  return (
    <div className="screen pop">
      <div className="topbar"><h1>Profil</h1></div>

      <div style={{ display:'flex', flexDirection:'column', alignItems:'center', marginBottom: 28, gap: 10 }}>
        <label style={{ cursor:'pointer', position:'relative', display:'block' }}>
          <input type="file" accept="image/*" onChange={pickPhoto} style={{ display:'none' }}/>
          <div style={{
            width: 104, height: 104, borderRadius: '50%',
            overflow: 'hidden',
            border: '1px solid var(--line-2)',
            background: photo ? 'transparent' : 'var(--paper-2)',
            display: 'grid', placeItems: 'center',
          }}>
            {photo ? (
              <img src={photo} alt="" style={{ width:'100%', height:'100%', objectFit:'cover', display:'block' }}/>
            ) : (
              <div style={{ textAlign:'center', color:'var(--ink-3)' }}>
                {Icon.camera}
                <div className="eyebrow" style={{ fontSize: 9, marginTop: 4 }}>Photo</div>
              </div>
            )}
          </div>
        </label>

        {photo && (
          <button onClick={removePhoto} style={{
            background:'none', border:'none', cursor:'pointer',
            fontSize:11.5, color:'var(--ink-4)', padding:'2px 8px',
            letterSpacing: '0.05em', textTransform: 'uppercase',
          }}>
            Supprimer
          </button>
        )}

        <div className="display" style={{ fontSize: 32, textAlign:'center', marginTop: 4 }}>{profile.name}</div>
        <div className="eyebrow">{profile.level}</div>
      </div>

      <div style={{ display:'grid', gridTemplateColumns:'repeat(3, 1fr)',
        borderTop: '1px solid var(--line)', borderBottom: '1px solid var(--line)',
        padding: '18px 0', marginBottom: 24 }}>
        <Stat n={recipes.length} label="Recettes"/>
        <Stat n={recipes.filter(r=>r.favorite).length} label="Favoris" sep/>
        <Stat n={recipes.filter(r=>r.aiRefined).length} label="Pro" sep/>
      </div>

      <div style={{ marginBottom: 24 }}>
        <div className="eyebrow" style={{ marginBottom: 12 }}>Mes infos</div>
        <div style={{ display:'flex', flexDirection:'column', gap: 10 }}>
          <input className="input" value={name} onChange={e => setName(e.target.value)} placeholder="Prénom"/>
          <input className="input" value={level} onChange={e => setLevel(e.target.value)} placeholder="CAP 1ère année"/>
          <button className="btn btn-primary" onClick={save}>Enregistrer</button>
        </div>
      </div>

      {/* ── Apparence ── */}
      <div style={{ marginBottom: 24 }}>
        <div className="eyebrow" style={{ marginBottom: 12 }}>Apparence</div>

        {/* Toggle dark mode */}
        <div style={{
          display:'flex', alignItems:'center', justifyContent:'space-between',
          padding:'14px 16px', marginBottom: 12,
          background:'var(--paper-2)', border:'1px solid var(--line)',
          borderRadius:'var(--radius)',
        }}>
          <div style={{ display:'flex', alignItems:'center', gap: 10 }}>
            <div style={{
              width: 36, height: 36, borderRadius:'50%',
              background:'var(--paper-3)', display:'grid', placeItems:'center', fontSize: 18,
            }}>
              {tweaks.palette === 'charbon' ? '🌙' : '☀️'}
            </div>
            <div>
              <div style={{ fontSize: 14, fontWeight: 600, color:'var(--ink)', letterSpacing:'-0.01em' }}>Mode sombre</div>
              <div style={{ fontSize: 12, color:'var(--ink-3)', marginTop: 1 }}>Charbon &amp; or</div>
            </div>
          </div>
          <button
            onClick={() => setTweak('palette', tweaks.palette === 'charbon' ? 'default' : 'charbon')}
            style={{
              width: 48, height: 28, borderRadius: 999, border:'none', padding: 0,
              background: tweaks.palette === 'charbon' ? 'var(--accent)' : 'var(--paper-3)',
              cursor:'pointer', position:'relative', flexShrink: 0,
              transition:'background .2s',
            }}
          >
            <div style={{
              width: 22, height: 22, borderRadius:'50%', background:'white',
              position:'absolute', top: 3,
              left: tweaks.palette === 'charbon' ? 23 : 3,
              transition:'left .2s',
              boxShadow:'0 1px 3px rgba(0,0,0,.25)',
            }}/>
          </button>
        </div>

        {/* Palette */}
        <div style={{ marginBottom: 12 }}>
          <div className="label" style={{ marginBottom: 8 }}>Palette</div>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap: 8 }}>
            {[
              { value:'default', label:'Crème & encre',  paper:'#f5f0e8', accent:'#8b3a2e' },
              { value:'sauge',   label:'Sauge & cuivre', paper:'#ebe9e1', accent:'#6b5037' },
              { value:'rose',    label:'Rose poudré',    paper:'#f5ecea', accent:'#9c3a4a' },
              { value:'charbon', label:'Charbon & or',   paper:'#1c1a17', accent:'#d4a261' },
            ].map(p => (
              <button
                key={p.value}
                onClick={() => setTweak('palette', p.value)}
                style={{
                  display:'flex', alignItems:'center', gap: 10,
                  padding:'10px 12px',
                  background: tweaks.palette === p.value ? 'var(--accent-bg)' : 'var(--paper-2)',
                  border: tweaks.palette === p.value ? '1.5px solid var(--accent)' : '1px solid var(--line)',
                  borderRadius:'var(--radius)', cursor:'pointer', textAlign:'left',
                  transition:'border-color .15s, background .15s',
                }}
              >
                <div style={{
                  width: 26, height: 26, borderRadius:'50%', flexShrink: 0,
                  background:`linear-gradient(135deg, ${p.paper} 50%, ${p.accent} 50%)`,
                  border:'1px solid rgba(0,0,0,.1)',
                }}/>
                <span style={{ fontSize: 12, fontWeight: 500, color:'var(--ink-2)', lineHeight: 1.3 }}>{p.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Typographie */}
        <div>
          <div className="label" style={{ marginBottom: 8 }}>Typographie</div>
          <div style={{ display:'flex', flexDirection:'column', gap: 7 }}>
            {[
              { value:'dm-inter',   label:'DM Serif',   sub:'Classique raffiné', family:"'DM Serif Display', serif" },
              { value:'fraunces',   label:'Fraunces',   sub:'Style manuscrit',   family:"'Fraunces', serif" },
              { value:'instrument', label:'Instrument', sub:'Élégant & sobre',   family:"'Instrument Serif', serif" },
            ].map(f => (
              <button
                key={f.value}
                onClick={() => setTweak('fonts', f.value)}
                style={{
                  display:'flex', alignItems:'center', justifyContent:'space-between',
                  padding:'11px 14px',
                  background: tweaks.fonts === f.value ? 'var(--accent-bg)' : 'var(--paper-2)',
                  border: tweaks.fonts === f.value ? '1.5px solid var(--accent)' : '1px solid var(--line)',
                  borderRadius:'var(--radius)', cursor:'pointer', textAlign:'left',
                  transition:'border-color .15s, background .15s',
                }}
              >
                <div>
                  <span style={{ fontFamily: f.family, fontSize: 17, color:'var(--ink)', fontStyle:'italic' }}>{f.label}</span>
                  <div style={{ fontSize: 11.5, color:'var(--ink-3)', marginTop: 2 }}>{f.sub}</div>
                </div>
                {tweaks.fonts === f.value && (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div style={{ marginBottom: 24 }}>
        <div className="eyebrow" style={{ marginBottom: 12 }}>Données</div>
        <button className="btn btn-ghost" onClick={onResetSeed} style={{ width: '100%' }}>
          Recharger les recettes d'exemple
        </button>
      </div>

      {window.FirebaseReady && (
        <div>
          <div className="eyebrow" style={{ marginBottom: 12 }}>Connexion</div>
          {user ? (
            <div style={{
              background: 'var(--paper-2)', border: '1px solid var(--line)',
              borderRadius: 'var(--radius)', padding: '14px 16px',
              display: 'flex', alignItems: 'center', gap: 12,
            }}>
              {user.photoURL && (
                <img src={user.photoURL} alt="" style={{ width: 36, height: 36, borderRadius: '50%', flexShrink: 0 }}/>
              )}
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 13.5, fontWeight: 600, color: 'var(--ink)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {user.displayName || user.email}
                </div>
                <div style={{ fontSize: 11.5, color: 'var(--accent)', marginTop: 2 }}>Connectée ✓</div>
              </div>
              <button
                className="btn btn-ghost"
                onClick={() => window.auth.signOut()}
                style={{ flexShrink: 0, fontSize: 12, padding: '7px 12px' }}
              >
                Déconnexion
              </button>
            </div>
          ) : (
            <button
              className="btn btn-primary"
              onClick={() => window.auth.signInWithPopup(window.googleProvider).catch(e => console.warn(e))}
              style={{ width: '100%' }}
            >
              Se connecter avec Google
            </button>
          )}
        </div>
      )}
    </div>
  );
}

function Stat({ n, label, sep }) {
  return (
    <div style={{ textAlign: 'center', borderLeft: sep ? '1px solid var(--line)' : 'none' }}>
      <div className="display" style={{ fontSize: 32, lineHeight: 1 }}>{n}</div>
      <div className="eyebrow" style={{ marginTop: 6, fontSize: 10 }}>{label}</div>
    </div>
  );
}

window.ToolsScreen = ToolsScreen;
window.ProfileScreen = ProfileScreen;
