/* Hand-drawn watercolor-style SVG illustrations.
   Used as accents in the recipe pages and across the app.
   Object.assign(window, ...) at the end so other Babel scripts can use them. */

const Illu = {};

// shared filters (watercolor edge effect)
const watercolorDefs = (id) => (
  <defs>
    <filter id={id} x="-20%" y="-20%" width="140%" height="140%">
      <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="2" seed="2" />
      <feDisplacementMap in="SourceGraphic" scale="2.5" />
    </filter>
  </defs>
);

// Milk bottle (ref: crepe page)
Illu.MilkBottle = ({ size = 64 }) => (
  <svg width={size} height={size * 1.4} viewBox="0 0 64 90" style={{ display: 'block' }}>
    {watercolorDefs('mb')}
    <g filter="url(#mb)">
      {/* bottle body */}
      <path d="M18 28 L18 22 Q18 18 22 18 L42 18 Q46 18 46 22 L46 28 Q50 32 50 38 L50 76 Q50 84 42 84 L22 84 Q14 84 14 76 L14 38 Q14 32 18 28 Z"
        fill="#f4f1ea" stroke="#8a7a5a" strokeWidth="1.2" />
      {/* milk fill */}
      <path d="M16 50 L48 50 L48 76 Q48 82 42 82 L22 82 Q16 82 16 76 Z"
        fill="#fafafa" opacity=".95"/>
      {/* cap */}
      <rect x="20" y="14" width="24" height="6" rx="1" fill="#c9504a" />
      <rect x="22" y="9" width="20" height="6" rx="1" fill="#d96058" />
      {/* label */}
      <rect x="18" y="56" width="28" height="14" rx="1.5" fill="#fff" stroke="#8a7a5a" strokeWidth=".6" />
      <text x="32" y="65" textAnchor="middle" fontSize="7" fontFamily="Caveat, cursive" fontWeight="700" fill="#3a2a1f">MILK</text>
      {/* highlight */}
      <path d="M22 32 Q20 50 22 70" stroke="#fff" strokeWidth="2" fill="none" opacity=".5" strokeLinecap="round"/>
    </g>
  </svg>
);

// Whisk + bowl
Illu.WhiskBowl = ({ size = 70 }) => (
  <svg width={size} height={size * .9} viewBox="0 0 80 72" style={{ display: 'block' }}>
    {watercolorDefs('wb')}
    <g filter="url(#wb)">
      {/* bowl */}
      <path d="M14 36 Q14 60 40 60 Q66 60 66 36 Z" fill="#9bb8d1" stroke="#5a7898" strokeWidth="1.2"/>
      <ellipse cx="40" cy="36" rx="26" ry="6" fill="#cce0ee" stroke="#5a7898" strokeWidth="1.2"/>
      {/* batter */}
      <ellipse cx="40" cy="36" rx="22" ry="4.5" fill="#f8e7a8" />
      <ellipse cx="36" cy="34" rx="6" ry="2" fill="#fff3c8" opacity=".7"/>
      {/* whisk handle */}
      <rect x="46" y="6" width="3" height="22" rx="1.5" fill="#7a5a3a" transform="rotate(15 47 17)"/>
      {/* whisk wires */}
      <g stroke="#9a9a9a" strokeWidth="1" fill="none">
        <path d="M52 26 Q56 32 54 38 Q52 44 48 42"/>
        <path d="M50 25 Q54 31 52 39 Q50 45 46 43"/>
        <path d="M48 24 Q52 30 50 40 Q48 46 44 44"/>
        <path d="M46 23 Q50 29 48 41 Q46 47 42 45"/>
      </g>
    </g>
  </svg>
);

// Frying pan with butter
Illu.PanButter = ({ size = 70 }) => (
  <svg width={size} height={size * .55} viewBox="0 0 90 50" style={{ display: 'block' }}>
    {watercolorDefs('pb')}
    <g filter="url(#pb)">
      <ellipse cx="35" cy="32" rx="26" ry="9" fill="#3a2a1f" stroke="#1a0f08" strokeWidth="1.2"/>
      <ellipse cx="35" cy="29" rx="24" ry="7" fill="#5a3e2a"/>
      {/* butter */}
      <path d="M28 26 L42 26 L40 31 L30 31 Z" fill="#f5e08e" stroke="#a08642" strokeWidth=".8"/>
      <rect x="28" y="24" width="14" height="3" fill="#fff5c8" stroke="#a08642" strokeWidth=".8"/>
      {/* handle */}
      <rect x="58" y="28" width="28" height="5" rx="2" fill="#7a5a3a" stroke="#3a2a1f" strokeWidth=".8"/>
      {/* steam */}
      <path d="M22 18 Q24 12 22 8" stroke="#a8a8a8" strokeWidth="1.2" fill="none" strokeLinecap="round" opacity=".6"/>
      <path d="M30 16 Q32 10 30 5" stroke="#a8a8a8" strokeWidth="1.2" fill="none" strokeLinecap="round" opacity=".6"/>
    </g>
  </svg>
);

// Crepe stack with strawberry
Illu.CrepeStack = ({ size = 100 }) => (
  <svg width={size} height={size * .75} viewBox="0 0 120 90" style={{ display: 'block' }}>
    {watercolorDefs('cs')}
    <g filter="url(#cs)">
      {/* plate */}
      <ellipse cx="60" cy="74" rx="50" ry="8" fill="#e6e0d2" stroke="#7a6a4a" strokeWidth="1"/>
      <ellipse cx="60" cy="72" rx="46" ry="6.5" fill="#f0eadc"/>
      {/* crepes */}
      <ellipse cx="60" cy="68" rx="38" ry="4" fill="#e8c478" stroke="#9a7a3a" strokeWidth=".8"/>
      <ellipse cx="60" cy="62" rx="36" ry="4" fill="#eccc88" stroke="#9a7a3a" strokeWidth=".8"/>
      <ellipse cx="60" cy="56" rx="34" ry="4" fill="#f0d498" stroke="#9a7a3a" strokeWidth=".8"/>
      <ellipse cx="60" cy="50" rx="32" ry="4" fill="#f4dba8" stroke="#9a7a3a" strokeWidth=".8"/>
      <ellipse cx="60" cy="45" rx="30" ry="4" fill="#f8e2b8" stroke="#9a7a3a" strokeWidth=".8"/>
      {/* syrup drip */}
      <path d="M40 47 Q42 55 38 60 M78 46 Q80 54 84 58" stroke="#a86838" strokeWidth="1.5" fill="none" opacity=".6" strokeLinecap="round"/>
      {/* strawberry */}
      <path d="M58 32 Q54 30 56 36 Q58 42 62 42 Q66 42 66 36 Q68 30 64 30 Z" fill="#d04848" stroke="#8a2a2a" strokeWidth=".8"/>
      <path d="M59 30 L57 27 M62 29 L62 26 M65 30 L67 27" stroke="#5a7a3a" strokeWidth="1" strokeLinecap="round"/>
      {/* seeds */}
      <circle cx="60" cy="35" r=".7" fill="#fff5b8"/>
      <circle cx="63" cy="37" r=".7" fill="#fff5b8"/>
      <circle cx="58" cy="38" r=".7" fill="#fff5b8"/>
    </g>
  </svg>
);

// Heart sticker
Illu.Heart = ({ size = 22, fill = '#e8a8a8' }) => (
  <svg width={size} height={size} viewBox="0 0 24 22" style={{ display: 'block' }}>
    <path d="M12 20 L3 11 Q1 8 2 5 Q4 1 8 2 Q10 2 12 5 Q14 2 16 2 Q20 1 22 5 Q23 8 21 11 Z"
      fill={fill} stroke="#8a4848" strokeWidth="1"/>
  </svg>
);

// Star
Illu.Star = ({ size = 16, fill = '#f0c860' }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" style={{ display: 'block' }}>
    <path d="M10 1 L12.5 7 L19 7.5 L14 12 L15.5 18.5 L10 15 L4.5 18.5 L6 12 L1 7.5 L7.5 7 Z"
      fill={fill} stroke="#a8743a" strokeWidth="1" strokeLinejoin="round"/>
  </svg>
);

// Vanilla pod
Illu.VanillaPod = ({ size = 40 }) => (
  <svg width={size} height={size * 1.6} viewBox="0 0 30 50" style={{ display: 'block' }}>
    {watercolorDefs('vp')}
    <g filter="url(#vp)">
      <path d="M15 4 Q10 18 12 32 Q14 44 18 46 Q22 44 22 30 Q22 18 18 4 Z"
        fill="#7a4a28" stroke="#3a2010" strokeWidth="1"/>
      <path d="M15 4 Q12 12 18 4" fill="none" stroke="#f0c860" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M14 24 Q16 26 20 24" fill="none" stroke="#5a3018" strokeWidth=".6"/>
    </g>
  </svg>
);

// Raspberry / berry cluster
Illu.Berries = ({ size = 50 }) => (
  <svg width={size} height={size} viewBox="0 0 50 50" style={{ display: 'block' }}>
    {watercolorDefs('br')}
    <g filter="url(#br)">
      {/* leaves */}
      <path d="M10 8 Q14 4 22 8 Q18 14 12 12 Z" fill="#9ab86a" stroke="#5a7838" strokeWidth=".8"/>
      <path d="M30 6 Q38 4 42 12 Q36 16 30 12 Z" fill="#a8c478" stroke="#5a7838" strokeWidth=".8"/>
      {/* berries — clusters of small bumps */}
      {[[18, 22], [28, 20], [22, 30], [32, 32], [16, 36]].map(([cx, cy], i) => (
        <g key={i}>
          <circle cx={cx} cy={cy} r="6" fill="#b84a5a" stroke="#7a2a3a" strokeWidth=".6"/>
          {[[-2,-2],[2,-2],[-2,2],[2,2],[0,0],[-2,0],[2,0]].map(([dx,dy], j) => (
            <circle key={j} cx={cx+dx} cy={cy+dy} r="1.6" fill="#d06878" opacity=".9"/>
          ))}
        </g>
      ))}
    </g>
  </svg>
);

// Cake slice
Illu.CakeSlice = ({ size = 80 }) => (
  <svg width={size} height={size * .8} viewBox="0 0 90 72" style={{ display: 'block' }}>
    {watercolorDefs('cs2')}
    <g filter="url(#cs2)">
      {/* plate */}
      <ellipse cx="45" cy="60" rx="42" ry="7" fill="#dde6f0" stroke="#5a7898" strokeWidth="1"/>
      <ellipse cx="45" cy="58" rx="38" ry="5.5" fill="#fff"/>
      <ellipse cx="45" cy="58" rx="35" ry="4.5" fill="#dde6f0" opacity=".4"/>
      {/* slice */}
      <path d="M22 56 L68 56 L62 22 Q45 18 28 22 Z" fill="#f6e8d0" stroke="#a07a48" strokeWidth="1"/>
      {/* cream top */}
      <path d="M28 22 Q45 18 62 22 Q60 26 45 25 Q30 26 28 22 Z" fill="#fff5e8" stroke="#a07a48" strokeWidth=".8"/>
      {/* base biscuit */}
      <path d="M22 56 L68 56 L66 50 L24 50 Z" fill="#a06838" stroke="#5a3818" strokeWidth=".8"/>
      {/* berry on top */}
      <circle cx="45" cy="20" r="5" fill="#b84a5a" stroke="#7a2a3a" strokeWidth=".6"/>
      <circle cx="43" cy="19" r="1.4" fill="#d06878"/>
      <circle cx="46" cy="20" r="1.4" fill="#d06878"/>
      <circle cx="45" cy="17" r="1.4" fill="#d06878"/>
      {/* berry inside layer */}
      <circle cx="36" cy="40" r="2.5" fill="#b84a5a"/>
      <circle cx="50" cy="42" r="2.5" fill="#b84a5a"/>
      <circle cx="44" cy="38" r="2.5" fill="#b84a5a"/>
    </g>
  </svg>
);

// Egg
Illu.Egg = ({ size = 40 }) => (
  <svg width={size} height={size * 1.2} viewBox="0 0 40 48" style={{ display: 'block' }}>
    {watercolorDefs('eg')}
    <g filter="url(#eg)">
      <ellipse cx="20" cy="28" rx="14" ry="18" fill="#f8efd8" stroke="#a08858" strokeWidth="1"/>
      <ellipse cx="14" cy="20" rx="3" ry="6" fill="#fff" opacity=".5"/>
    </g>
  </svg>
);

// Flour bag / sack
Illu.FlourBag = ({ size = 50 }) => (
  <svg width={size} height={size * 1.1} viewBox="0 0 50 56" style={{ display: 'block' }}>
    {watercolorDefs('fb')}
    <g filter="url(#fb)">
      <path d="M10 14 Q12 8 18 8 L32 8 Q38 8 40 14 L42 50 Q42 54 38 54 L12 54 Q8 54 8 50 Z"
        fill="#f4eedc" stroke="#8a7a5a" strokeWidth="1"/>
      <path d="M14 8 Q16 4 25 4 Q34 4 36 8" fill="none" stroke="#8a7a5a" strokeWidth="1"/>
      <rect x="16" y="28" width="18" height="14" fill="#fff" stroke="#8a7a5a" strokeWidth=".6"/>
      <text x="25" y="38" textAnchor="middle" fontSize="6" fontFamily="Caveat, cursive" fontWeight="700" fill="#3a2a1f">FARINE</text>
      <circle cx="13" cy="20" r="1.5" fill="#fff" opacity=".7"/>
      <circle cx="38" cy="46" r="1.2" fill="#fff" opacity=".7"/>
    </g>
  </svg>
);

// Croissant
Illu.Croissant = ({ size = 70 }) => (
  <svg width={size} height={size * .7} viewBox="0 0 80 56" style={{ display: 'block' }}>
    {watercolorDefs('cr')}
    <g filter="url(#cr)">
      <path d="M10 38 Q8 24 22 18 Q40 12 58 18 Q72 24 70 38 Q68 44 60 42 Q52 36 40 36 Q28 36 20 42 Q12 44 10 38 Z"
        fill="#d89c50" stroke="#7a4818" strokeWidth="1"/>
      <path d="M22 22 Q24 28 28 30 M32 18 Q34 26 38 28 M44 18 Q46 26 50 28 M54 22 Q56 28 60 30"
        fill="none" stroke="#a06838" strokeWidth="1" strokeLinecap="round"/>
      <path d="M16 32 Q20 28 26 30" fill="none" stroke="#fff5d8" strokeWidth="1.2" opacity=".6"/>
    </g>
  </svg>
);

// Chocolate / square
Illu.Chocolate = ({ size = 50 }) => (
  <svg width={size} height={size * .8} viewBox="0 0 50 40" style={{ display: 'block' }}>
    {watercolorDefs('ch')}
    <g filter="url(#ch)">
      <path d="M6 14 L40 6 L46 28 L12 36 Z" fill="#5a2818" stroke="#2a1008" strokeWidth="1"/>
      <path d="M6 14 L40 6 L40 8 L6 16 Z M40 6 L46 28 L44 28 L38 8 Z" fill="#3a1808" />
      <line x1="18" y1="10" x2="22" y2="30" stroke="#2a1008" strokeWidth=".8"/>
      <line x1="30" y1="8" x2="34" y2="28" stroke="#2a1008" strokeWidth=".8"/>
      <line x1="8" y1="20" x2="44" y2="14" stroke="#2a1008" strokeWidth=".8"/>
      <line x1="10" y1="28" x2="46" y2="22" stroke="#2a1008" strokeWidth=".8"/>
    </g>
  </svg>
);

// Rolling pin
Illu.RollingPin = ({ size = 80 }) => (
  <svg width={size} height={size * .35} viewBox="0 0 80 28" style={{ display: 'block' }}>
    {watercolorDefs('rp')}
    <g filter="url(#rp)">
      <rect x="18" y="8" width="44" height="12" rx="6" fill="#f0d8a8" stroke="#7a5a3a" strokeWidth="1"/>
      <rect x="2" y="11" width="18" height="6" rx="2" fill="#a07848" stroke="#5a3818" strokeWidth=".8"/>
      <rect x="60" y="11" width="18" height="6" rx="2" fill="#a07848" stroke="#5a3818" strokeWidth=".8"/>
      <ellipse cx="40" cy="14" rx="20" ry="3" fill="#fff5d8" opacity=".4"/>
    </g>
  </svg>
);

// generic small leaf decoration
Illu.Leaf = ({ size = 20, color = '#9ab86a' }) => (
  <svg width={size} height={size} viewBox="0 0 20 20">
    <path d="M2 18 Q8 4 18 2 Q14 12 2 18 Z" fill={color} stroke="#5a7838" strokeWidth=".8"/>
    <path d="M3 17 Q10 12 17 3" fill="none" stroke="#5a7838" strokeWidth=".5"/>
  </svg>
);

// generic placeholder by category
Illu.ByCategory = ({ category, size = 64 }) => {
  switch ((category || '').toLowerCase()) {
    case 'desserts': return <Illu.CakeSlice size={size} />;
    case 'viennoiserie': return <Illu.Croissant size={size} />;
    case 'entremets': return <Illu.CakeSlice size={size} />;
    case 'crèmes':
    case 'cremes': return <Illu.WhiskBowl size={size} />;
    case 'biscuits': return <Illu.Chocolate size={size} />;
    case 'pâtes de base':
    case 'pates de base': return <Illu.RollingPin size={size} />;
    default: return <Illu.WhiskBowl size={size} />;
  }
};

window.Illu = Illu;
