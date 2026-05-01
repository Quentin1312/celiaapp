/* Clean icon illustrations — simple outlined SVGs */

const Illu = {};

const _s = 'var(--ink-soft)';
const _sw = 1.5;
const _props = (size, vb = '0 0 24 24') => ({
  width: size, height: size, viewBox: vb, fill: 'none',
  stroke: _s, strokeWidth: _sw, strokeLinecap: 'round', strokeLinejoin: 'round',
  style: { display: 'block' },
});

Illu.MilkBottle = ({ size = 64 }) => (
  <svg {..._props(size)}>
    <path d="M9 2h6l2 5H7L9 2z"/>
    <rect x="7" y="7" width="10" height="13" rx="2"/>
    <line x1="9" y1="13" x2="15" y2="13"/>
    <line x1="9" y1="10" x2="15" y2="10"/>
  </svg>
);

Illu.WhiskBowl = ({ size = 70 }) => (
  <svg {..._props(size)}>
    <path d="M4 8h16c0 5.5-3.6 9-8 9s-8-3.5-8-9z"/>
    <path d="M12 17v3M9 20h6"/>
    <path d="M12 2v3M10 3l2 2 2-2"/>
  </svg>
);

Illu.PanButter = ({ size = 70 }) => (
  <svg {..._props(size)}>
    <ellipse cx="10" cy="12" rx="7" ry="4"/>
    <path d="M17 12h5"/>
    <rect x="7" y="10" width="6" height="3" rx="1"/>
  </svg>
);

Illu.CrepeStack = ({ size = 100 }) => (
  <svg {..._props(size)}>
    <ellipse cx="12" cy="19" rx="8" ry="2"/>
    <ellipse cx="12" cy="16" rx="8" ry="2"/>
    <ellipse cx="12" cy="13" rx="8" ry="2"/>
    <circle cx="12" cy="8" r="2.5"/>
    <path d="M10 6l-2-3M14 6l2-3"/>
  </svg>
);

Illu.Heart = ({ size = 22, fill = 'var(--rose)' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={fill} style={{ display: 'block' }}>
    <path d="M12 21l-9-9a5 5 0 117-7l2 2 2-2a5 5 0 117 7z"/>
  </svg>
);

Illu.Star = ({ size = 16, fill = '#f0c860' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={fill} style={{ display: 'block' }}>
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
  </svg>
);

Illu.VanillaPod = ({ size = 40 }) => (
  <svg {..._props(size)}>
    <path d="M12 2c-2 5-2 10-1 13s1 6 1 9"/>
    <path d="M11 10c2-2 4-3 5-4"/>
    <path d="M13 15c-2-2-4-2-5-3"/>
  </svg>
);

Illu.Berries = ({ size = 50 }) => (
  <svg {..._props(size)}>
    <circle cx="9" cy="14" r="3"/>
    <circle cx="15" cy="11" r="3"/>
    <circle cx="12" cy="17" r="3"/>
    <path d="M9 5c1 1 3 1 3 1s2 0 3-1"/>
    <path d="M12 6v5"/>
  </svg>
);

Illu.CakeSlice = ({ size = 80 }) => (
  <svg {..._props(size)}>
    <path d="M4 20h16"/>
    <path d="M6 20L9 9h6l3 11"/>
    <path d="M9 9c0-2 1.3-4 3-4s3 2 3 4"/>
    <line x1="9" y1="14" x2="15" y2="14"/>
    <circle cx="12" cy="6" r="1.5"/>
  </svg>
);

Illu.Egg = ({ size = 40 }) => (
  <svg {..._props(size)}>
    <path d="M12 2C8.5 2 5 7 5 13a7 7 0 0014 0C19 7 15.5 2 12 2z"/>
  </svg>
);

Illu.FlourBag = ({ size = 50 }) => (
  <svg {..._props(size)}>
    <rect x="8" y="2" width="8" height="3" rx="1"/>
    <path d="M7 5l-1 14a2 2 0 002 2h8a2 2 0 002-2L17 5"/>
    <line x1="9" y1="12" x2="15" y2="12"/>
    <line x1="9" y1="15" x2="15" y2="15"/>
  </svg>
);

Illu.Croissant = ({ size = 70 }) => (
  <svg {..._props(size)}>
    <path d="M5 16c1-5 3.5-8 7-8s6 3 7 8"/>
    <path d="M5 16c2-2 3-2 4 0"/>
    <path d="M19 16c-2-2-3-2-4 0"/>
    <path d="M9 16c1-3 2-4 3-4s2 1 3 4"/>
  </svg>
);

Illu.Chocolate = ({ size = 50 }) => (
  <svg {..._props(size)}>
    <rect x="3" y="7" width="18" height="10" rx="2"/>
    <line x1="9" y1="7" x2="9" y2="17"/>
    <line x1="15" y1="7" x2="15" y2="17"/>
    <line x1="3" y1="12" x2="21" y2="12"/>
  </svg>
);

Illu.RollingPin = ({ size = 80 }) => (
  <svg {..._props(size)}>
    <line x1="6" y1="12" x2="18" y2="12"/>
    <rect x="2" y="10" width="4" height="4" rx="2"/>
    <rect x="18" y="10" width="4" height="4" rx="2"/>
  </svg>
);

Illu.Leaf = ({ size = 20, color = 'var(--mint-deep)' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
       stroke={color} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 22c1-4 4-8 10-10C18 10 22 6 22 2c-4 0-8 4-10 10-2-4-6-8-10-10z"/>
  </svg>
);

Illu.ByCategory = ({ category, size = 64 }) => {
  switch ((category || '').toLowerCase()) {
    case 'desserts':    return <Illu.CakeSlice size={size}/>;
    case 'viennoiserie': return <Illu.Croissant size={size}/>;
    case 'entremets':   return <Illu.CakeSlice size={size}/>;
    case 'crèmes':
    case 'cremes':      return <Illu.WhiskBowl size={size}/>;
    case 'biscuits':    return <Illu.Chocolate size={size}/>;
    case 'pâtes de base':
    case 'pates de base': return <Illu.RollingPin size={size}/>;
    default:            return <Illu.WhiskBowl size={size}/>;
  }
};

window.Illu = Illu;
