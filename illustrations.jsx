/* Illustrations pâtisserie — flat-design coloré */

const Illu = {};

const C = {
  rose: '#e8918e', roseDp: '#bf5656', rosePale: '#fde8e8',
  mint: '#7ec49a', mintDp: '#4a9668', mintPale: '#d2ecdc',
  cream: '#f5e8c8', gold: '#d4a017', goldPale: '#fdf3d0',
  ink: '#3a2a1f', inkSoft: '#6b5544',
  paper: '#f7efe1', warm: '#f1e6d2',
  brown: '#8b5e3c', lightBrown: '#c49a6c',
  white: '#fffdf9',
};

Illu.MilkBottle = ({ size = 64 }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none" style={{display:'block'}}>
    <path d="M16 8 L14 14 H34 L32 8 Z" fill={C.white} stroke={C.inkSoft} strokeWidth="1.4" strokeLinejoin="round"/>
    <path d="M14 14 H34 V40 A3 3 0 0 1 31 43 H17 A3 3 0 0 1 14 40 Z" fill={C.white} stroke={C.inkSoft} strokeWidth="1.4"/>
    <path d="M14 19 H34" stroke={C.inkSoft} strokeWidth="1" opacity=".25"/>
    <path d="M14 21 Q24 25 34 21 L34 26 Q24 30 14 26 Z" fill={C.mintPale} opacity=".7"/>
    <path d="M18 34 H30" stroke={C.roseDp} strokeWidth="1.8" strokeLinecap="round" opacity=".5"/>
    <path d="M20 38 H28" stroke={C.roseDp} strokeWidth="1.8" strokeLinecap="round" opacity=".5"/>
    <path d="M20 10 H28" stroke={C.inkSoft} strokeWidth="1.2" strokeLinecap="round" opacity=".4"/>
  </svg>
);

Illu.WhiskBowl = ({ size = 70 }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none" style={{display:'block'}}>
    <path d="M7 18 C7 18 8 36 24 36 C40 36 41 18 41 18 Z" fill={C.rosePale} stroke={C.roseDp} strokeWidth="1.5" strokeLinejoin="round"/>
    <path d="M7 18 Q24 22 41 18" stroke={C.roseDp} strokeWidth="1.5" fill="none"/>
    <path d="M10 22 Q24 27 38 22" fill={C.cream} opacity=".8" stroke="none"/>
    <path d="M20 36 L18 40" stroke={C.roseDp} strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M28 36 L30 40" stroke={C.roseDp} strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M16 40 H32" stroke={C.roseDp} strokeWidth="2" strokeLinecap="round"/>
    <line x1="24" y1="3" x2="24" y2="21" stroke={C.brown} strokeWidth="2.2" strokeLinecap="round"/>
    <path d="M24 20 Q19 24 19 30" stroke={C.brown} strokeWidth="1.5" fill="none" strokeLinecap="round"/>
    <path d="M24 20 Q21 25 21 30" stroke={C.brown} strokeWidth="1.5" fill="none" strokeLinecap="round"/>
    <path d="M24 20 Q24 26 24 30" stroke={C.brown} strokeWidth="1.5" fill="none" strokeLinecap="round"/>
    <path d="M24 20 Q27 25 27 30" stroke={C.brown} strokeWidth="1.5" fill="none" strokeLinecap="round"/>
    <path d="M24 20 Q29 24 29 30" stroke={C.brown} strokeWidth="1.5" fill="none" strokeLinecap="round"/>
    <ellipse cx="24" cy="30" rx="5" ry="1.8" stroke={C.brown} strokeWidth="1.5" fill="none"/>
    <circle cx="39" cy="8" r="2" fill={C.gold} opacity=".7"/>
    <circle cx="10" cy="12" r="1.2" fill={C.mintDp} opacity=".5"/>
    <circle cx="37" cy="14" r="1" fill={C.roseDp} opacity=".4"/>
  </svg>
);

Illu.PanButter = ({ size = 70 }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none" style={{display:'block'}}>
    <ellipse cx="20" cy="27" rx="14" ry="8" fill={C.inkSoft} opacity=".12"/>
    <ellipse cx="20" cy="25" rx="14" ry="8" fill="#c0784a" stroke="#8b5030" strokeWidth="1.3"/>
    <ellipse cx="20" cy="24" rx="11" ry="5.5" fill="#9a5830" opacity=".5"/>
    <rect x="14" y="20" width="12" height="6" rx="2.5" fill={C.gold}/>
    <rect x="16" y="21" width="5" height="2" rx="1" fill={C.white} opacity=".5"/>
    <path d="M14 25 Q20 28 26 25" fill={C.gold} opacity=".45" stroke="none"/>
    <rect x="34" y="22" width="12" height="5" rx="2.5" fill="#8b5030"/>
    <rect x="34" y="22" width="12" height="5" rx="2.5" stroke="#5a3018" strokeWidth="1"/>
    <path d="M15 15 Q16 12 15 9" stroke={C.rose} strokeWidth="1.3" fill="none" strokeLinecap="round" opacity=".55"/>
    <path d="M22 14 Q23 11 22 8" stroke={C.rose} strokeWidth="1.3" fill="none" strokeLinecap="round" opacity=".55"/>
    <path d="M19 16 Q20 13 19 10" stroke={C.rose} strokeWidth="1.3" fill="none" strokeLinecap="round" opacity=".4"/>
  </svg>
);

Illu.CrepeStack = ({ size = 100 }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none" style={{display:'block'}}>
    <ellipse cx="24" cy="40" rx="17" ry="4.5" fill={C.gold} opacity=".5" stroke={C.lightBrown} strokeWidth="1"/>
    <path d="M8 38 Q8 42 24 42 Q40 42 40 38 L40 35 Q40 39 24 39 Q8 39 8 35 Z" fill={C.goldPale} opacity=".6"/>
    <ellipse cx="24" cy="33" rx="16" ry="4.5" fill={C.goldPale} stroke={C.lightBrown} strokeWidth="1"/>
    <path d="M9 33 Q24 37 39 33" fill={C.gold} opacity=".3" stroke="none"/>
    <ellipse cx="24" cy="27" rx="15" ry="4" fill={C.cream} stroke={C.lightBrown} strokeWidth="1"/>
    <path d="M10 27 Q24 31 38 27" fill={C.gold} opacity=".25" stroke="none"/>
    <ellipse cx="24" cy="21" rx="14" ry="3.5" fill={C.goldPale} stroke={C.lightBrown} strokeWidth="1"/>
    <circle cx="28" cy="20" r="3.5" fill={C.gold} opacity=".9"/>
    <circle cx="29" cy="19" r="1.5" fill={C.white} opacity=".45"/>
    <path d="M30 22 Q33 26 31 30" stroke={C.gold} strokeWidth="1.5" fill="none" strokeLinecap="round" opacity=".65"/>
    <line x1="38" y1="10" x2="38" y2="26" stroke={C.inkSoft} strokeWidth="1.8" strokeLinecap="round"/>
    <path d="M36 10 L36 14 M38 10 L38 14 M40 10 L40 14" stroke={C.inkSoft} strokeWidth="1.3" strokeLinecap="round"/>
    <path d="M36 14 Q38 17 40 14" stroke={C.inkSoft} strokeWidth="1.3" fill="none"/>
    <path d="M12 16 Q13 13 12 10" stroke={C.rose} strokeWidth="1.2" fill="none" strokeLinecap="round" opacity=".5"/>
    <path d="M19 15 Q20 12 19 9" stroke={C.rose} strokeWidth="1.2" fill="none" strokeLinecap="round" opacity=".5"/>
  </svg>
);

Illu.Heart = ({ size = 22, fill = 'var(--rose)' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={fill} style={{display:'block'}}>
    <path d="M12 21l-9-9a5 5 0 117-7l2 2 2-2a5 5 0 117 7z"/>
  </svg>
);

Illu.Star = ({ size = 16, fill = '#f0c860' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={fill} style={{display:'block'}}>
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
  </svg>
);

Illu.VanillaPod = ({ size = 40 }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none" style={{display:'block'}}>
    <path d="M20 5 Q16 24 18 36 Q22 46 24 44 Q26 46 30 36 Q32 24 28 5 Q24 2 20 5 Z" fill={C.brown} opacity=".75"/>
    <path d="M24 10 Q23 24 23 38" stroke={C.goldPale} strokeWidth="1.2" fill="none" opacity=".7"/>
    <circle cx="23" cy="16" r="1.2" fill={C.cream} opacity=".8"/>
    <circle cx="24" cy="24" r="1.2" fill={C.cream} opacity=".8"/>
    <circle cx="23" cy="32" r="1.2" fill={C.cream} opacity=".8"/>
    <path d="M21 8 Q17 6 15 2" stroke={C.mintDp} strokeWidth="1.8" fill="none" strokeLinecap="round" opacity=".9"/>
    <path d="M27 8 Q31 6 33 2" stroke={C.mintDp} strokeWidth="1.8" fill="none" strokeLinecap="round" opacity=".9"/>
  </svg>
);

Illu.Berries = ({ size = 50 }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none" style={{display:'block'}}>
    <path d="M23 9 Q20 13 21 18" stroke={C.mintDp} strokeWidth="1.8" fill="none" strokeLinecap="round"/>
    <path d="M25 9 Q28 13 27 18" stroke={C.mintDp} strokeWidth="1.8" fill="none" strokeLinecap="round"/>
    <path d="M20 9 Q24 6 28 9" stroke={C.mintDp} strokeWidth="1.5" fill="none" strokeLinecap="round"/>
    <circle cx="16" cy="26" r="8" fill={C.roseDp} opacity=".82"/>
    <circle cx="16" cy="26" r="8" stroke="#a03040" strokeWidth="1"/>
    <circle cx="18" cy="23" r="2.5" fill={C.white} opacity=".28"/>
    <circle cx="16" cy="28" r="1" fill={C.white} opacity=".5"/>
    <circle cx="30" cy="22" r="8" fill={C.roseDp} opacity=".72"/>
    <circle cx="30" cy="22" r="8" stroke="#a03040" strokeWidth="1"/>
    <circle cx="32" cy="19" r="2.5" fill={C.white} opacity=".28"/>
    <circle cx="30" cy="24" r="1" fill={C.white} opacity=".5"/>
    <circle cx="24" cy="35" r="8" fill="#c03040"/>
    <circle cx="24" cy="35" r="8" stroke="#900030" strokeWidth="1"/>
    <circle cx="26" cy="32" r="2.5" fill={C.white} opacity=".28"/>
    <circle cx="24" cy="37" r="1" fill={C.white} opacity=".5"/>
  </svg>
);

Illu.CakeSlice = ({ size = 80 }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none" style={{display:'block'}}>
    <ellipse cx="26" cy="45" rx="14" ry="2.5" fill={C.inkSoft} opacity=".1"/>
    {/* Corps de la part */}
    <path d="M6 43 L28 7 L46 43 Z" fill={C.rosePale}/>
    {/* Couches */}
    <line x1="10" y1="37" x2="42" y2="37" stroke={C.rose} strokeWidth="1.5" opacity=".5"/>
    <line x1="15" y1="28" x2="40" y2="28" stroke={C.rose} strokeWidth="1.5" opacity=".5"/>
    {/* Crème entre les couches */}
    <path d="M11 37 Q26 34 41 37" fill={C.white} stroke="none" opacity=".8"/>
    <path d="M16 28 Q26 25 39 28" fill={C.white} stroke="none" opacity=".8"/>
    {/* Glaçage sur le dessus */}
    <path d="M23 11 Q26 5 29 11 Q25 9 23 11 Z" fill={C.white} opacity=".9"/>
    <path d="M20 16 Q27 9 32 16" fill={C.white} opacity=".8" stroke="none"/>
    {/* Fraise sur le dessus */}
    <path d="M26 7 Q29 4 31 7 Q31 11 29 12 Q27 11 26 7 Z" fill={C.roseDp}/>
    <circle cx="28.5" cy="9" r="1" fill={C.white} opacity=".4"/>
    <path d="M27 6 Q28.5 3 30 6" stroke={C.mintDp} strokeWidth="1.3" fill="none" strokeLinecap="round"/>
    {/* Contour */}
    <path d="M6 43 L28 7 L46 43 Z" stroke={C.roseDp} strokeWidth="1.5" strokeLinejoin="round" fill="none"/>
    {/* Assiette */}
    <line x1="3" y1="44" x2="49" y2="44" stroke={C.roseDp} strokeWidth="1.5" strokeLinecap="round" opacity=".35"/>
  </svg>
);

Illu.Egg = ({ size = 40 }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none" style={{display:'block'}}>
    <path d="M24 4 C14 4 8 14 8 26 A16 16 0 0 0 40 26 C40 14 34 4 24 4 Z" fill={C.white} stroke={C.cream} strokeWidth="1.5"/>
    <path d="M24 4 C18 4 13 9 11 16" stroke={C.white} strokeWidth="2" fill="none" opacity=".5" strokeLinecap="round"/>
    <circle cx="24" cy="29" r="9" fill={C.gold}/>
    <circle cx="24" cy="29" r="9" stroke="#c49a00" strokeWidth="1" opacity=".3"/>
    <circle cx="27" cy="26" r="3.5" fill={C.white} opacity=".35"/>
  </svg>
);

Illu.FlourBag = ({ size = 50 }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none" style={{display:'block'}}>
    <path d="M18 5 Q24 2 30 5" stroke={C.inkSoft} strokeWidth="2.2" fill="none" strokeLinecap="round"/>
    <path d="M18 5 L16 9 H32 L30 5" fill={C.cream} stroke={C.inkSoft} strokeWidth="1.3" strokeLinejoin="round"/>
    <path d="M14 9 Q10 11 10 15 L12 41 Q12 45 24 45 Q36 45 36 41 L38 15 Q38 11 34 9 Z" fill={C.white} stroke={C.inkSoft} strokeWidth="1.3"/>
    {/* Puff de farine */}
    <circle cx="24" cy="22" r="9" fill={C.paper} opacity=".7"/>
    <circle cx="20" cy="20" r="5" fill={C.white} opacity=".5"/>
    {/* Étiquette */}
    <rect x="15" y="30" width="18" height="11" rx="2.5" fill={C.rosePale} opacity=".85"/>
    <line x1="17" y1="34" x2="31" y2="34" stroke={C.roseDp} strokeWidth="1.2" opacity=".5"/>
    <line x1="18" y1="37" x2="30" y2="37" stroke={C.roseDp} strokeWidth="1.2" opacity=".5"/>
    {/* Poussière */}
    <circle cx="11" cy="13" r="2.5" fill={C.white} opacity=".7"/>
    <circle cx="37" cy="15" r="1.8" fill={C.white} opacity=".6"/>
    <circle cx="10" cy="20" r="1.2" fill={C.white} opacity=".5"/>
  </svg>
);

Illu.Croissant = ({ size = 70 }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none" style={{display:'block'}}>
    <ellipse cx="24" cy="42" rx="16" ry="3.5" fill={C.inkSoft} opacity=".1"/>
    {/* Corps gauche */}
    <path d="M7 30 Q7 14 17 10 Q25 8 29 13 Q33 17 29 23 Q25 29 19 31 Q15 33 11 37 Q7 41 7 37 Z" fill={C.gold}/>
    {/* Corps droit */}
    <path d="M39 28 Q43 18 37 14 Q33 10 29 14 Q25 18 27 24 Q29 30 33 34 Q37 38 41 36 Q45 32 39 28 Z" fill={C.gold}/>
    {/* Feuilletage */}
    <path d="M11 19 Q19 15 27 19" stroke={C.lightBrown} strokeWidth="1.2" fill="none" strokeLinecap="round" opacity=".7"/>
    <path d="M12 25 Q20 21 27 25" stroke={C.lightBrown} strokeWidth="1.2" fill="none" strokeLinecap="round" opacity=".7"/>
    <path d="M33 17 Q37 22 37 28" stroke={C.lightBrown} strokeWidth="1.2" fill="none" strokeLinecap="round" opacity=".7"/>
    <path d="M33 23 Q36 27 36 33" stroke={C.lightBrown} strokeWidth="1.2" fill="none" strokeLinecap="round" opacity=".5"/>
    {/* Arc du dessus */}
    <path d="M17 10 Q23 6 29 13" stroke={C.lightBrown} strokeWidth="1.5" fill="none" strokeLinecap="round"/>
    {/* Reflet */}
    <path d="M15 14 Q18 12 22 14" stroke={C.white} strokeWidth="1.8" fill="none" strokeLinecap="round" opacity=".5"/>
    <path d="M35 16 Q37 18 37 22" stroke={C.white} strokeWidth="1.5" fill="none" strokeLinecap="round" opacity=".4"/>
    {/* Contour */}
    <path d="M7 30 Q7 14 17 10 Q25 8 29 13 Q33 17 29 23 Q25 29 19 31 Q15 33 11 37 Q7 41 7 37 Z" stroke={C.brown} strokeWidth="1.3" fill="none"/>
    <path d="M39 28 Q43 18 37 14 Q33 10 29 14 Q25 18 27 24 Q29 30 33 34 Q37 38 41 36 Q45 32 39 28 Z" stroke={C.brown} strokeWidth="1.3" fill="none"/>
  </svg>
);

Illu.Chocolate = ({ size = 50 }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none" style={{display:'block'}}>
    <rect x="5" y="10" width="38" height="28" rx="5" fill="#5a2e1a"/>
    <rect x="5" y="10" width="38" height="28" rx="5" stroke="#3e1e0e" strokeWidth="1.3"/>
    {/* Segments verticaux */}
    <line x1="18" y1="10" x2="18" y2="38" stroke="#3e1e0e" strokeWidth="1.5" opacity=".8"/>
    <line x1="30" y1="10" x2="30" y2="38" stroke="#3e1e0e" strokeWidth="1.5" opacity=".8"/>
    {/* Segment horizontal */}
    <line x1="5" y1="24" x2="43" y2="24" stroke="#3e1e0e" strokeWidth="1.5" opacity=".8"/>
    {/* Reflets sur chaque carré */}
    <rect x="7" y="12" width="9" height="10" rx="2" fill={C.white} opacity=".07"/>
    <rect x="20" y="12" width="8" height="10" rx="2" fill={C.white} opacity=".07"/>
    <rect x="32" y="12" width="9" height="10" rx="2" fill={C.white} opacity=".07"/>
    <rect x="7" y="26" width="9" height="10" rx="2" fill={C.white} opacity=".04"/>
    <rect x="20" y="26" width="8" height="10" rx="2" fill={C.white} opacity=".04"/>
    <rect x="32" y="26" width="9" height="10" rx="2" fill={C.white} opacity=".04"/>
    {/* Reflet principal */}
    <path d="M8 13 Q18 10 30 13" stroke={C.white} strokeWidth="1.5" fill="none" opacity=".22" strokeLinecap="round"/>
    {/* Morceau cassé en haut à droite */}
    <path d="M30 10 L43 10 L43 24 L30 24 Z" fill="#7a3a22" opacity=".2"/>
  </svg>
);

Illu.RollingPin = ({ size = 80 }) => (
  <svg width={size} height={size} viewBox="0 0 64 32" fill="none" style={{display:'block'}}>
    <ellipse cx="32" cy="31" rx="22" ry="2" fill={C.inkSoft} opacity=".1"/>
    {/* Poignée gauche */}
    <rect x="1" y="9" width="13" height="14" rx="6.5" fill={C.brown}/>
    <rect x="1" y="9" width="13" height="14" rx="6.5" stroke="#5a3820" strokeWidth="1.2"/>
    <circle cx="7" cy="12.5" r="1.8" fill="#5a3820" opacity=".35"/>
    <circle cx="7" cy="19.5" r="1.8" fill="#5a3820" opacity=".35"/>
    <path d="M4 11 Q7 9 10 11" stroke={C.lightBrown} strokeWidth="1" fill="none" opacity=".3" strokeLinecap="round"/>
    {/* Rouleau */}
    <rect x="13" y="5" width="38" height="22" rx="11" fill={C.lightBrown}/>
    <rect x="13" y="5" width="38" height="22" rx="11" stroke={C.brown} strokeWidth="1.3"/>
    {/* Lignes de texture bois */}
    <line x1="22" y1="5" x2="22" y2="27" stroke={C.brown} strokeWidth=".9" opacity=".25"/>
    <line x1="30" y1="5" x2="30" y2="27" stroke={C.brown} strokeWidth=".9" opacity=".25"/>
    <line x1="38" y1="5" x2="38" y2="27" stroke={C.brown} strokeWidth=".9" opacity=".25"/>
    <line x1="46" y1="5" x2="46" y2="27" stroke={C.brown} strokeWidth=".9" opacity=".25"/>
    {/* Reflet */}
    <path d="M16 9 Q32 6 48 9" stroke={C.white} strokeWidth="2" fill="none" opacity=".4" strokeLinecap="round"/>
    {/* Farine */}
    <ellipse cx="32" cy="27" rx="10" ry="2" fill={C.white} opacity=".35"/>
    {/* Poignée droite */}
    <rect x="50" y="9" width="13" height="14" rx="6.5" fill={C.brown}/>
    <rect x="50" y="9" width="13" height="14" rx="6.5" stroke="#5a3820" strokeWidth="1.2"/>
    <circle cx="57" cy="12.5" r="1.8" fill="#5a3820" opacity=".35"/>
    <circle cx="57" cy="19.5" r="1.8" fill="#5a3820" opacity=".35"/>
    <path d="M54 11 Q57 9 60 11" stroke={C.lightBrown} strokeWidth="1" fill="none" opacity=".3" strokeLinecap="round"/>
  </svg>
);

Illu.Leaf = ({ size = 20, color = 'var(--mint-deep)' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
       stroke={color} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round"
       style={{display:'block'}}>
    <path d="M2 22c1-4 4-8 10-10C18 10 22 6 22 2c-4 0-8 4-10 10-2-4-6-8-10-10z"/>
  </svg>
);

Illu.ByCategory = ({ category, size = 64 }) => {
  switch ((category || '').toLowerCase()) {
    case 'desserts':      return <Illu.CakeSlice size={size}/>;
    case 'viennoiserie':  return <Illu.Croissant size={size}/>;
    case 'entremets':     return <Illu.CakeSlice size={size}/>;
    case 'crèmes':
    case 'cremes':        return <Illu.WhiskBowl size={size}/>;
    case 'biscuits':      return <Illu.Chocolate size={size}/>;
    case 'pâtes de base':
    case 'pates de base': return <Illu.RollingPin size={size}/>;
    default:              return <Illu.WhiskBowl size={size}/>;
  }
};

Illu.ChefGanache = ({ size = 44 }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none" style={{display:'block'}}>
    {/* Toque blanche */}
    <ellipse cx="24" cy="18" rx="12" ry="4" fill={C.white} stroke="#d4c8b0" strokeWidth="1.2"/>
    <rect x="12" y="4" width="24" height="15" rx="5" fill={C.white} stroke="#d4c8b0" strokeWidth="1.2"/>
    <path d="M12 12 Q24 16 36 12" fill={C.white} stroke="none"/>
    {/* Petite ombre sous la toque */}
    <ellipse cx="24" cy="18.5" rx="11" ry="2" fill="#d4c8b0" opacity=".35"/>
    {/* Visage */}
    <ellipse cx="24" cy="31" rx="11.5" ry="10.5" fill="#f5c89e"/>
    <ellipse cx="24" cy="31" rx="11.5" ry="10.5" stroke="#e4b080" strokeWidth="1"/>
    {/* Veste de chef */}
    <path d="M12.5 43 L15 38 L20 41 L24 39 L28 41 L33 38 L35.5 43 Z" fill={C.white} stroke="#d4c8b0" strokeWidth="1"/>
    <path d="M21 39 L24 43 L27 39" fill="#d4c8b0" opacity=".5" stroke="none"/>
    {/* Boutons veste */}
    <circle cx="24" cy="41" r="1" fill="#d4c8b0"/>
    {/* Sourcils */}
    <path d="M18.5 26.5 Q20.5 25 22.5 26.5" stroke={C.brown} strokeWidth="1.4" fill="none" strokeLinecap="round"/>
    <path d="M25.5 26.5 Q27.5 25 29.5 26.5" stroke={C.brown} strokeWidth="1.4" fill="none" strokeLinecap="round"/>
    {/* Yeux */}
    <circle cx="21" cy="29.5" r="2" fill={C.ink}/>
    <circle cx="27" cy="29.5" r="2" fill={C.ink}/>
    <circle cx="21.7" cy="28.9" r=".7" fill={C.white}/>
    <circle cx="27.7" cy="28.9" r=".7" fill={C.white}/>
    {/* Moustache */}
    <path d="M20 33 Q22 34.5 24 33.5 Q26 34.5 28 33" fill={C.brown} opacity=".75"/>
    {/* Sourire */}
    <path d="M19.5 35.5 Q24 39.5 28.5 35.5" stroke="#c4845a" strokeWidth="1.4" fill="none" strokeLinecap="round"/>
    {/* Blush */}
    <ellipse cx="17" cy="33" rx="2.8" ry="1.6" fill={C.rose} opacity=".25"/>
    <ellipse cx="31" cy="33" rx="2.8" ry="1.6" fill={C.rose} opacity=".25"/>
  </svg>
);

window.Illu = Illu;
