import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

const EXTERIOR = 'https://cdn.poehali.dev/projects/f633a3e4-0401-4818-be66-0d3723ff7a1b/files/9dfc1472-c0dc-4568-95e7-9c5c0c630f71.jpg';
const INTERIOR = 'https://cdn.poehali.dev/projects/f633a3e4-0401-4818-be66-0d3723ff7a1b/files/917910b5-ee75-4c93-ba0c-013f7b70e5d8.jpg';
const MASTER_BED = 'https://cdn.poehali.dev/projects/f633a3e4-0401-4818-be66-0d3723ff7a1b/files/f40ce406-6676-405d-a32c-6f3ed6abdd15.jpg';
const SAUNA_IMG = 'https://cdn.poehali.dev/projects/f633a3e4-0401-4818-be66-0d3723ff7a1b/files/7efc4719-501c-4a64-bb8b-60d29ab2e4cf.jpg';

const PARAMS = [
  { icon: 'Ruler', value: '6 × 12 м', label: 'Габариты дома' },
  { icon: 'Square', value: '72 м²', label: 'Общая площадь' },
  { icon: 'DoorOpen', value: '9 дверей', label: 'Дверных проёмов' },
  { icon: 'TreePine', value: 'Ø 48 см', label: 'Диаметр бревна каркаса' },
];

const TIPS = [
  {
    icon: 'ChefHat',
    title: 'Кухонный гарнитур — вдоль северной стены',
    desc: 'Размещение кухни у стены между гостиной и правым крылом позволяет провести единый водопровод к мойке и санузлу — экономия на трубах и сантехнике.',
    color: 'text-orange-600',
    bg: 'bg-orange-50 border-orange-200',
  },
  {
    icon: 'Sofa',
    title: 'Гостиная — у входа по центру',
    desc: 'Центральная зона гостиной с выходом на крыльцо. Естественное освещение с двух сторон через окна на южный и северный фасад.',
    color: 'text-stone-600',
    bg: 'bg-stone-50 border-stone-200',
  },
  {
    icon: 'Droplets',
    title: 'Водяной контур: кухня → санузел → баня',
    desc: 'Вся мокрая зона сосредоточена вдоль одной оси: мойка на кухне — санузел — баня. Это правильно с точки зрения сантехники и сильно удешевляет прокладку труб.',
    color: 'text-teal-600',
    bg: 'bg-teal-50 border-teal-200',
  },
  {
    icon: 'Wind',
    title: 'Бойлерная — угол, далеко от спален',
    desc: 'Котёл в дальнем углу правого крыла: шум и вибрация не мешают сну, а дымоход выводится через ближайшую стену наружу.',
    color: 'text-slate-600',
    bg: 'bg-slate-50 border-slate-200',
  },
  {
    icon: 'BedDouble',
    title: 'Спальни — в тихом левом крыле',
    desc: 'Левое крыло изолировано от кухни и бани — меньше шума, запахов и трафика. Мастер-спальня дальше от входа, детская — ближе к гостиной для удобства контроля.',
    color: 'text-rose-600',
    bg: 'bg-rose-50 border-rose-200',
  },
  {
    icon: 'DoorOpen',
    title: 'Коридор по центру — связующее звено',
    desc: 'Проходная зона гостиной делит дом на «тихую» (спальни) и «активную» (баня, кухня) половины. Все двери открываются внутрь комнат — не загораживают проход.',
    color: 'text-violet-600',
    bg: 'bg-violet-50 border-violet-200',
  },
];

const LEFT_ROOMS = [
  {
    icon: 'BedDouble',
    title: 'Мастер-спальня',
    area: '~14 м²',
    color: 'bg-rose-50 border-rose-200',
    iconColor: 'text-rose-600',
    badge: 'bg-rose-100 text-rose-700',
    desc: 'Дальняя комната — максимум тишины. Окно на южный фасад. Дверь открывается внутрь у стены, чтобы не перекрывать путь к окну. Рядом с дверью — место под гардероб.',
    image: MASTER_BED,
  },
  {
    icon: 'Baby',
    title: 'Детская спальня',
    area: '~10 м²',
    color: 'bg-sky-50 border-sky-200',
    iconColor: 'text-sky-600',
    badge: 'bg-sky-100 text-sky-700',
    desc: 'Смежная с гостиной — родители слышат ребёнка. Окно на северный или южный фасад. Дверь ближе к центру дома для удобного выхода в гостиную.',
    image: null,
  },
];

const RIGHT_ROOMS = [
  {
    icon: 'Flame',
    title: 'Баня / Сауна',
    area: '~10 м²',
    color: 'bg-amber-50 border-amber-200',
    iconColor: 'text-amber-600',
    badge: 'bg-amber-100 text-amber-700',
    desc: 'В глубине крыла, выход наружу через тамбур бойлерной. Дверь в сауну — внутрь, плотная, с уплотнителем. Рядом — дверь в санузел для душа после парилки.',
    image: SAUNA_IMG,
  },
  {
    icon: 'ShowerHead',
    title: 'Туалет с душем',
    area: '~6 м²',
    color: 'bg-teal-50 border-teal-200',
    iconColor: 'text-teal-600',
    badge: 'bg-teal-100 text-teal-700',
    desc: 'Между баней и гостиной — доступен и из дома, и из бани. Два входа: один из гостиной/коридора, один из предбанника. Вентиляция обязательна.',
    image: null,
  },
  {
    icon: 'Zap',
    title: 'Бойлерная / Тех. комната',
    area: '~8 м²',
    color: 'bg-stone-50 border-stone-200',
    iconColor: 'text-stone-600',
    badge: 'bg-stone-100 text-stone-700',
    desc: 'Угловая комната у внешней стены. Дверь только с улицы или из предбанника — техперсонал не проходит через жилую зону. Здесь же выход дымохода.',
    image: null,
  },
];

const MATERIALS = [
  { icon: 'TreePine', name: 'Бревно Ø 48 см', where: 'Несущий каркас', benefits: ['Высокая прочность', 'Долговечность', 'Природная эстетика'] },
  { icon: 'Brick', name: 'Блоки сибит', where: 'Кухня-гостиная', benefits: ['Тепло держит', 'Ровные стены', 'Пожаробезопасность'] },
  { icon: 'Trees', name: 'Брус лафет', where: 'Боковые крылья', benefits: ['Экологичность', 'Тёплые стены', 'Красивая текстура'] },
];

// SVG Floor Plan Component
const FloorPlan = () => {
  const W = 900;  // total width
  const H = 480;  // total height
  const wall = 10;
  const doorW = 36;
  const arcR = 34;

  // Columns X positions (3 sections × 300px each)
  // Left wing: 0–300, Center: 300–600, Right: 600–900

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto" style={{ fontFamily: 'Golos Text, sans-serif' }}>
      <defs>
        <pattern id="hatch-sibit" patternUnits="userSpaceOnUse" width="10" height="10" patternTransform="rotate(45)">
          <line x1="0" y1="0" x2="0" y2="10" stroke="#a8a29e" strokeWidth="1.5" opacity="0.35" />
        </pattern>
        <pattern id="hatch-lafet" patternUnits="userSpaceOnUse" width="12" height="12">
          <line x1="0" y1="0" x2="12" y2="0" stroke="#b45309" strokeWidth="1.2" opacity="0.2" />
          <line x1="0" y1="6" x2="12" y2="6" stroke="#b45309" strokeWidth="1.2" opacity="0.2" />
        </pattern>
        <filter id="shadow" x="-5%" y="-5%" width="110%" height="110%">
          <feDropShadow dx="0" dy="2" stdDeviation="3" floodOpacity="0.10" />
        </filter>
      </defs>

      {/* ── BACKGROUNDS ── */}
      {/* Left wing */}
      <rect x={wall} y={wall} width={300 - wall} height={H - wall * 2} fill="#fff7ed" rx="4" />
      <rect x={wall} y={wall} width={300 - wall} height={H - wall * 2} fill="url(#hatch-lafet)" rx="4" />
      {/* Center */}
      <rect x={300} y={wall} width={300} height={H - wall * 2} fill="#f5f5f4" rx="4" />
      <rect x={300} y={wall} width={300} height={H - wall * 2} fill="url(#hatch-sibit)" rx="4" />
      {/* Right wing */}
      <rect x={600} y={wall} width={300 - wall} height={H - wall * 2} fill="#fff7ed" rx="4" />
      <rect x={600} y={wall} width={300 - wall} height={H - wall * 2} fill="url(#hatch-lafet)" rx="4" />

      {/* ── OUTER WALLS ── */}
      <rect x={0} y={0} width={W} height={H} fill="none" stroke="#292524" strokeWidth={wall * 2} rx="6" />

      {/* ── INNER WALLS (section dividers) ── */}
      {/* Left-Center divider */}
      <rect x={296} y={0} width={wall * 1.6} height={H} fill="#292524" />
      {/* Center-Right divider */}
      <rect x={604} y={0} width={wall * 1.6} height={H} fill="#292524" />

      {/* ── LEFT WING: internal wall between master & kids ── */}
      {/* Wall: y=0 to y=240 (master top half), door gap at y=190–226 */}
      <rect x={wall} y={wall} width={wall * 1.4} height={180} fill="#78716c" />
      <rect x={wall} y={wall + 180 + doorW} width={wall * 1.4} height={H / 2 - wall - 180 - doorW} fill="#78716c" />
      {/* Door arc - master bedroom door */}
      <path d={`M ${wall + wall * 1.4} ${wall + 180} A ${arcR} ${arcR} 0 0 1 ${wall + wall * 1.4 + arcR} ${wall + 180 + arcR}`} fill="none" stroke="#b45309" strokeWidth="1.8" strokeDasharray="4 2" />
      <line x1={wall + wall * 1.4} y1={wall + 180} x2={wall + wall * 1.4 + arcR} y2={wall + 180} stroke="#b45309" strokeWidth="2" />

      {/* Wall: bottom half divider (between master and kids) at mid-horizontal */}
      <rect x={wall} y={H / 2} width={wall * 1.4} height={H / 2 - wall} fill="#78716c" />
      {/* kids door at bottom */}
      <path d={`M ${wall + wall * 1.4} ${H / 2 + 20 + doorW} A ${arcR} ${arcR} 0 0 0 ${wall + wall * 1.4 + arcR} ${H / 2 + 20}`} fill="none" stroke="#0369a1" strokeWidth="1.8" strokeDasharray="4 2" />
      <line x1={wall + wall * 1.4} y1={H / 2 + 20} x2={wall + wall * 1.4 + arcR} y2={H / 2 + 20} stroke="#0369a1" strokeWidth="2" />

      {/* Horizontal divider in left wing (between master & kids) */}
      <rect x={wall * 1.4 + wall} y={H / 2 - wall / 2} width={296 - wall * 2.4} height={wall} fill="#78716c" />

      {/* ── RIGHT WING: internal walls ── */}
      {/* Sauna / Shower divider vertical at x=720 */}
      <rect x={718} y={wall} width={wall} height={300} fill="#78716c" />
      {/* Boiler room horizontal at y=300 in right wing */}
      <rect x={wall + 604} y={300} width={276 - wall} height={wall} fill="#78716c" />

      {/* Shower door (right): gap at sauna-shower wall */}
      <rect x={718} y={wall + 140} width={wall} height={doorW} fill="#fff7ed" />
      <path d={`M 718 ${wall + 140} A ${arcR} ${arcR} 0 0 0 ${718 - arcR} ${wall + 140 + arcR}`} fill="none" stroke="#0d9488" strokeWidth="1.8" strokeDasharray="4 2" />
      <line x1={718} y1={wall + 140} x2={718 - arcR} y2={wall + 140} stroke="#0d9488" strokeWidth="2" />

      {/* Boiler room door: in horizontal wall at y=300, gap at x=650–686 */}
      <rect x={650} y={300} width={doorW} height={wall} fill="#fff7ed" />
      <path d={`M 650 ${300 + wall} A ${arcR} ${arcR} 0 0 1 ${650 + arcR} ${300 + wall - arcR}`} fill="none" stroke="#57534e" strokeWidth="1.8" strokeDasharray="4 2" />
      <line x1={650} y1={300 + wall} x2={650} y2={300 + wall - arcR} stroke="#57534e" strokeWidth="2" />

      {/* ── SECTION DOORS (between wings and center) ── */}

      {/* Left wing → Center (top — master to living): gap in left-center divider */}
      <rect x={296} y={120} width={wall * 1.6} height={doorW + 4} fill="#f5f5f4" />
      <path d={`M 296 ${120} A ${arcR} ${arcR} 0 0 0 ${296 - arcR} ${120 + arcR}`} fill="none" stroke="#b45309" strokeWidth="1.8" strokeDasharray="4 2" />
      <line x1={296} y1={120} x2={296 - arcR} y2={120} stroke="#b45309" strokeWidth="2" />

      {/* Left wing → Center (bottom — kids to living) */}
      <rect x={296} y={310} width={wall * 1.6} height={doorW + 4} fill="#f5f5f4" />
      <path d={`M 296 ${310} A ${arcR} ${arcR} 0 0 0 ${296 - arcR} ${310 + arcR}`} fill="none" stroke="#0369a1" strokeWidth="1.8" strokeDasharray="4 2" />
      <line x1={296} y1={310} x2={296 - arcR} y2={310} stroke="#0369a1" strokeWidth="2" />

      {/* Center → Right wing (top — living to sauna area) */}
      <rect x={604} y={140} width={wall * 1.6} height={doorW + 4} fill="#fff7ed" />
      <path d={`M ${604 + wall * 1.6} ${140} A ${arcR} ${arcR} 0 0 1 ${604 + wall * 1.6 + arcR} ${140 + arcR}`} fill="none" stroke="#d97706" strokeWidth="1.8" strokeDasharray="4 2" />
      <line x1={604 + wall * 1.6} y1={140} x2={604 + wall * 1.6 + arcR} y2={140} stroke="#d97706" strokeWidth="2" />

      {/* Center → Right wing (bottom — living to shower/wc) */}
      <rect x={604} y={310} width={wall * 1.6} height={doorW + 4} fill="#fff7ed" />
      <path d={`M ${604 + wall * 1.6} ${310} A ${arcR} ${arcR} 0 0 1 ${604 + wall * 1.6 + arcR} ${310 + arcR}`} fill="none" stroke="#0d9488" strokeWidth="1.8" strokeDasharray="4 2" />
      <line x1={604 + wall * 1.6} y1={310} x2={604 + wall * 1.6 + arcR} y2={310} stroke="#0d9488" strokeWidth="2" />

      {/* ── EXTERIOR DOORS ── */}
      {/* Main entrance — center bottom */}
      <rect x={410} y={H - wall * 2} width={doorW + 20} height={wall * 2} fill="#f5f5f4" />
      <path d={`M 410 ${H - wall * 2} A 50 50 0 0 0 ${410 + 50} ${H - wall * 2 - 50}`} fill="none" stroke="#292524" strokeWidth="2" strokeDasharray="5 3" />
      <line x1={410} y1={H - wall * 2} x2={410 + 50} y2={H - wall * 2} stroke="#292524" strokeWidth="2.5" />
      <text x={432} y={H - 2} textAnchor="middle" fontSize="11" fill="#78716c" fontWeight="600">ВХОД</text>

      {/* Boiler exterior door — right side */}
      <rect x={W - wall * 2} y={360} width={wall * 2} height={doorW + 8} fill="#fff7ed" />
      <path d={`M ${W - wall * 2} ${360} A ${arcR} ${arcR} 0 0 0 ${W - wall * 2 - arcR} ${360 + arcR}`} fill="none" stroke="#57534e" strokeWidth="1.8" strokeDasharray="4 2" />
      <line x1={W - wall * 2} y1={360} x2={W - wall * 2} y2={360 + arcR} stroke="#57534e" strokeWidth="2" />

      {/* Sauna exterior door — right top */}
      <rect x={W - wall * 2} y={60} width={wall * 2} height={doorW + 8} fill="#fff7ed" />
      <path d={`M ${W - wall * 2} ${60} A ${arcR} ${arcR} 0 0 0 ${W - wall * 2 - arcR} ${60 + arcR}`} fill="none" stroke="#d97706" strokeWidth="1.8" strokeDasharray="4 2" />
      <line x1={W - wall * 2} y1={60} x2={W - wall * 2} y2={60 + arcR} stroke="#d97706" strokeWidth="2" />

      {/* ── FURNITURE (simplified) ── */}

      {/* MASTER BED (top-left) */}
      <rect x={30} y={25} width={90} height={60} rx="6" fill="#fda4af" opacity="0.6" stroke="#f43f5e" strokeWidth="1.5" />
      <rect x={30} y={25} width={90} height={18} rx="4" fill="#f43f5e" opacity="0.5" />
      <text x={75} y={62} textAnchor="middle" fontSize="9" fill="#9f1239" fontWeight="700">КРОВАТЬ</text>

      {/* KIDS BED (bottom-left) */}
      <rect x={30} y={H / 2 + 30} width={75} height={50} rx="6" fill="#93c5fd" opacity="0.6" stroke="#3b82f6" strokeWidth="1.5" />
      <rect x={30} y={H / 2 + 30} width={75} height={15} rx="4" fill="#3b82f6" opacity="0.5" />
      <text x={67} y={H / 2 + 64} textAnchor="middle" fontSize="9" fill="#1e3a8a" fontWeight="700">КРОВАТЬ</text>

      {/* WARDROBE master */}
      <rect x={200} y={25} width={85} height={30} rx="4" fill="#fed7aa" opacity="0.7" stroke="#ea580c" strokeWidth="1" />
      <text x={242} y={44} textAnchor="middle" fontSize="8" fill="#9a3412">ГАРДЕРОБ</text>

      {/* KITCHEN COUNTER (center top) */}
      <rect x={315} y={20} width={180} height={35} rx="6" fill="#d6d3d1" opacity="0.7" stroke="#a8a29e" strokeWidth="1.5" />
      <text x={405} y={43} textAnchor="middle" fontSize="9" fill="#44403c" fontWeight="700">КУХОННЫЙ ГАРНИТУР</text>
      {/* Sink */}
      <rect x={360} y={22} width={28} height={28} rx="4" fill="#a8a29e" opacity="0.6" />
      <circle cx={374} cy={36} r="7" fill="none" stroke="#78716c" strokeWidth="1.5" />

      {/* DINING TABLE (center middle) */}
      <rect x={340} y={170} width={120} height={70} rx="8" fill="#e7e5e4" opacity="0.7" stroke="#a8a29e" strokeWidth="1.5" />
      <text x={400} y={210} textAnchor="middle" fontSize="9" fill="#44403c" fontWeight="700">СТОЛ</text>
      {/* chairs */}
      {[340, 420].map(x => [155, 220].map(y => (
        <rect key={`${x}-${y}`} x={x - 14} y={y} width={28} height={16} rx="4" fill="#c4b5a5" opacity="0.7" />
      )))}

      {/* SOFA (center bottom) */}
      <rect x={320} y={350} width={160} height={50} rx="8" fill="#d6d3d1" opacity="0.7" stroke="#a8a29e" strokeWidth="1.5" />
      <text x={400} y={380} textAnchor="middle" fontSize="9" fill="#44403c" fontWeight="700">ДИВАН</text>

      {/* SAUNA BENCH (right wing top) */}
      <rect x={625} y={20} width={75} height={110} rx="6" fill="#fde68a" opacity="0.6" stroke="#d97706" strokeWidth="1.5" />
      <rect x={625} y={20} width={75} height={35} rx="4" fill="#fbbf24" opacity="0.5" />
      <rect x={625} y={60} width={75} height={35} rx="4" fill="#fbbf24" opacity="0.4" />
      <text x={662} y={95} textAnchor="middle" fontSize="9" fill="#92400e" fontWeight="700">ПОЛКИ</text>
      {/* stove */}
      <rect x={640} y={130} width={35} height={35} rx="6" fill="#ef4444" opacity="0.5" stroke="#dc2626" strokeWidth="1.5" />
      <text x={657} y={152} textAnchor="middle" fontSize="8" fill="#7f1d1d" fontWeight="700">ПЕЧЬ</text>

      {/* SHOWER (right center) */}
      <rect x={730} y={20} width={145} height={110} rx="6" fill="#99f6e4" opacity="0.5" stroke="#0d9488" strokeWidth="1.5" />
      <circle cx={800} cy={75} r="22" fill="none" stroke="#0d9488" strokeWidth="2" strokeDasharray="5 3" />
      <text x={800} y={79} textAnchor="middle" fontSize="9" fill="#0f766e" fontWeight="700">ДУШ</text>
      {/* toilet */}
      <ellipse cx={756} cy={135} rx="20" ry="26" fill="#99f6e4" opacity="0.6" stroke="#0d9488" strokeWidth="1.5" />
      <text x={756} y={139} textAnchor="middle" fontSize="8" fill="#0f766e" fontWeight="700">WC</text>

      {/* BOILER ROOM (right bottom) */}
      <rect x={625} y={320} width={250} height={130} rx="4" fill="#e7e5e4" opacity="0.5" />
      {/* boiler */}
      <rect x={645} y={335} width={50} height={70} rx="8" fill="#94a3b8" opacity="0.7" stroke="#64748b" strokeWidth="1.5" />
      <text x={670} y={375} textAnchor="middle" fontSize="8" fill="#1e293b" fontWeight="700">КОТЁЛ</text>
      {/* water heater */}
      <rect x={710} y={340} width={40} height={55} rx="8" fill="#93c5fd" opacity="0.6" stroke="#3b82f6" strokeWidth="1.5" />
      <text x={730} y={371} textAnchor="middle" fontSize="8" fill="#1e3a8a" fontWeight="700">БОЙЛЕР</text>

      {/* ── ROOM LABELS ── */}
      <text x={155} y={H / 2 - 20} textAnchor="middle" fontSize="13" fill="#b45309" fontWeight="800">МАСТЕР-СПАЛЬНЯ</text>
      <text x={155} y={H / 2 - 6} textAnchor="middle" fontSize="10" fill="#b45309" opacity="0.7">~14 м²</text>

      <text x={155} y={H - 40} textAnchor="middle" fontSize="13" fill="#0369a1" fontWeight="800">ДЕТСКАЯ</text>
      <text x={155} y={H - 26} textAnchor="middle" fontSize="10" fill="#0369a1" opacity="0.7">~10 м²</text>

      <text x={400} y={H - 14} textAnchor="middle" fontSize="13" fill="#57534e" fontWeight="800">КУХНЯ-ГОСТИНАЯ · ~24 м²</text>

      <text x={662} y={175} textAnchor="middle" fontSize="11" fill="#92400e" fontWeight="800">БАНЯ/САУНА</text>
      <text x={662} y={189} textAnchor="middle" fontSize="9" fill="#92400e" opacity="0.7">~10 м²</text>

      <text x={800} y={148} textAnchor="middle" fontSize="10" fill="#0f766e" fontWeight="800">САНУЗЕЛ ~6 м²</text>

      <text x={750} y={420} textAnchor="middle" fontSize="11" fill="#44403c" fontWeight="800">БОЙЛЕРНАЯ · ~8 м²</text>

      {/* ── COMPASS ── */}
      <g transform="translate(848, 440)">
        <circle cx="0" cy="0" r="22" fill="white" stroke="#e2e8f0" strokeWidth="1.5" />
        <text x="0" y="-10" textAnchor="middle" fontSize="9" fill="#ef4444" fontWeight="800">С</text>
        <text x="0" y="16" textAnchor="middle" fontSize="9" fill="#78716c">Ю</text>
        <text x="12" y="4" textAnchor="middle" fontSize="9" fill="#78716c">В</text>
        <text x="-12" y="4" textAnchor="middle" fontSize="9" fill="#78716c">З</text>
        <polygon points="0,-8 3,0 0,5 -3,0" fill="#ef4444" />
      </g>

      {/* ── LEGEND ── */}
      <g transform="translate(16, 452)">
        <line x1="0" y1="8" x2="22" y2="8" stroke="#b45309" strokeWidth="2" strokeDasharray="4 2" />
        <text x="26" y="12" fontSize="9" fill="#57534e">дверной проём</text>
        <line x1="100" y1="8" x2="122" y2="8" stroke="#292524" strokeWidth="3" />
        <text x="126" y="12" fontSize="9" fill="#57534e">стена</text>
      </g>

      {/* ── DIMENSION LINES ── */}
      {/* Width total */}
      <line x1="0" y1={H + 14} x2={W} y2={H + 14} stroke="#78716c" strokeWidth="1" markerEnd="url(#arr)" />
      <text x={W / 2} y={H + 26} textAnchor="middle" fontSize="11" fill="#57534e" fontWeight="700">12 м (фасад)</text>
      {/* Height */}
      <line x1={W + 14} y1="0" x2={W + 14} y2={H} stroke="#78716c" strokeWidth="1" />
      <text x={W + 22} y={H / 2} textAnchor="start" fontSize="11" fill="#57534e" fontWeight="700" transform={`rotate(90, ${W + 22}, ${H / 2})`}>6 м</text>
    </svg>
  );
};

const Index = () => {
  const [activeWing, setActiveWing] = useState<'left' | 'right'>('left');

  return (
    <div className="min-h-screen bg-mesh overflow-x-hidden">
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-background/70 border-b border-border/50">
        <div className="container flex items-center justify-between h-18 py-4">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <Icon name="House" size={20} className="text-white" />
            </div>
            <span className="font-display font-extrabold text-xl tracking-tight">ДомПроект 6×12</span>
          </div>
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
            <a href="#plan" className="hover:text-foreground transition-colors">Планировка</a>
            <a href="#ergo" className="hover:text-foreground transition-colors">Эргономика</a>
            <a href="#wings" className="hover:text-foreground transition-colors">Помещения</a>
            <a href="#cta" className="hover:text-foreground transition-colors">Заказать</a>
          </nav>
          <Button className="rounded-full font-semibold shadow-lg shadow-primary/25">
            Связаться
          </Button>
        </div>
      </header>

      {/* Hero */}
      <section className="relative container pt-16 pb-20 md:pt-24 md:pb-24">
        <div className="absolute -top-10 -left-20 w-72 h-72 rounded-full bg-primary/15 blur-3xl animate-blob" />
        <div className="absolute top-20 right-0 w-80 h-80 rounded-full bg-accent/15 blur-3xl animate-blob" style={{ animationDelay: '2s' }} />
        <div className="grid lg:grid-cols-2 gap-12 items-center relative">
          <div>
            <Badge className="rounded-full bg-secondary text-secondary-foreground font-semibold mb-6 animate-fade-up" style={{ animationDelay: '0.05s' }}>
              🏡 Комбинированный проект · 72 м²
            </Badge>
            <h1 className="font-display font-black text-4xl md:text-6xl leading-[1.08] tracking-tight animate-fade-up" style={{ animationDelay: '0.1s' }}>
              Дом мечты<br />
              <span className="text-gradient">из трёх материалов</span>
            </h1>
            <p className="mt-6 text-lg text-muted-foreground max-w-md animate-fade-up" style={{ animationDelay: '0.2s' }}>
              Каркас Ø 48 см · кухня-гостиная из сибита · левое крыло — спальни · правое — баня, санузел, бойлерная. 9 дверных проёмов с правильной эргономикой.
            </p>
            <div className="mt-8 flex flex-wrap gap-4 animate-fade-up" style={{ animationDelay: '0.3s' }}>
              <Button size="lg" className="rounded-full text-base font-semibold h-14 px-8 shadow-xl shadow-primary/25" onClick={() => document.getElementById('plan')?.scrollIntoView({ behavior: 'smooth' })}>
                Смотреть планировку
                <Icon name="ArrowRight" size={20} className="ml-1" />
              </Button>
              <Button size="lg" variant="outline" className="rounded-full text-base font-semibold h-14 px-8 border-2">
                <Icon name="Download" size={18} className="mr-1" />
                Скачать PDF
              </Button>
            </div>
          </div>
          <div className="relative animate-fade-up" style={{ animationDelay: '0.25s' }}>
            <img src={EXTERIOR} alt="Визуализация дома 6×12" className="rounded-[2rem] shadow-2xl shadow-primary/20 w-full object-cover aspect-[4/3]" />
            <div className="absolute -bottom-5 -left-5 bg-white rounded-2xl shadow-xl px-5 py-3 border border-border/60">
              <div className="font-display font-extrabold text-2xl text-gradient">6 × 12 м</div>
              <div className="text-xs text-muted-foreground font-medium">Габариты дома</div>
            </div>
          </div>
        </div>
      </section>

      {/* Params */}
      <section className="container pb-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {PARAMS.map((p, i) => (
            <div key={p.label} className="rounded-3xl bg-white/70 border border-border/60 p-6 hover-lift animate-fade-up" style={{ animationDelay: `${0.1 * i}s` }}>
              <div className="w-11 h-11 rounded-xl bg-secondary flex items-center justify-center mb-4">
                <Icon name={p.icon} size={22} className="text-primary" />
              </div>
              <div className="font-display font-extrabold text-2xl md:text-3xl">{p.value}</div>
              <div className="mt-1 text-sm text-muted-foreground font-medium">{p.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Floor Plan SVG */}
      <section id="plan" className="container pb-16">
        <div className="max-w-2xl mb-8">
          <h2 className="font-display font-extrabold text-3xl md:text-5xl tracking-tight">Планировка с дверями</h2>
          <p className="mt-3 text-muted-foreground text-lg">Схема вид сверху: стены, дверные проёмы, мебель и зонирование.</p>
        </div>
        <div className="rounded-3xl bg-white border border-border/60 p-4 md:p-8 overflow-x-auto">
          <FloorPlan />
          <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {[
              { color: 'bg-rose-200', label: 'Мастер-спальня' },
              { color: 'bg-sky-200', label: 'Детская' },
              { color: 'bg-stone-200', label: 'Кухня-гостиная' },
              { color: 'bg-amber-200', label: 'Баня / Сауна' },
              { color: 'bg-teal-200', label: 'Санузел' },
              { color: 'bg-slate-200', label: 'Бойлерная' },
              { color: 'bg-orange-100 border border-orange-300', label: 'Брус лафет' },
              { color: 'bg-stone-100 border border-stone-300', label: 'Сибит' },
            ].map(l => (
              <div key={l.label} className="flex items-center gap-2">
                <span className={`w-4 h-4 rounded flex-shrink-0 ${l.color}`} />
                <span className="text-xs text-muted-foreground font-medium">{l.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Ergonomics */}
      <section id="ergo" className="container pb-20">
        <div className="max-w-2xl mb-8">
          <h2 className="font-display font-extrabold text-3xl md:text-5xl tracking-tight">Рекомендации по эргономике</h2>
          <p className="mt-3 text-muted-foreground text-lg">Логика расположения зон, которая делает жизнь удобной.</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {TIPS.map((t, i) => (
            <div key={t.title} className={`rounded-3xl border-2 p-6 hover-lift animate-fade-up ${t.bg}`} style={{ animationDelay: `${0.07 * i}s` }}>
              <div className={`w-11 h-11 rounded-xl bg-white/80 flex items-center justify-center mb-4`}>
                <Icon name={t.icon} size={22} className={t.color} fallback="Info" />
              </div>
              <h3 className="font-display font-bold text-base mb-2 leading-snug">{t.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{t.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Wings detail */}
      <section id="wings" className="container pb-24">
        <div className="max-w-2xl mb-8">
          <h2 className="font-display font-extrabold text-3xl md:text-5xl tracking-tight">Помещения</h2>
          <p className="mt-3 text-muted-foreground text-lg">Подробнее о каждой комнате — размеры, логика дверей, меблировка.</p>
        </div>
        <div className="flex gap-2 mb-8 p-1 bg-secondary rounded-full w-fit">
          <button onClick={() => setActiveWing('left')} className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all ${activeWing === 'left' ? 'bg-white text-primary shadow-md' : 'text-muted-foreground hover:text-foreground'}`}>
            🛏 Левое крыло — спальни
          </button>
          <button onClick={() => setActiveWing('right')} className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all ${activeWing === 'right' ? 'bg-white text-primary shadow-md' : 'text-muted-foreground hover:text-foreground'}`}>
            🔥 Правое крыло — баня
          </button>
        </div>

        {activeWing === 'left' && (
          <div className="grid sm:grid-cols-2 gap-6 animate-fade-up">
            {LEFT_ROOMS.map((r) => (
              <article key={r.title} className={`rounded-3xl border-2 ${r.color} overflow-hidden hover-lift`}>
                {r.image && <img src={r.image} alt={r.title} className="w-full h-48 object-cover" />}
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-xl bg-white/80 flex items-center justify-center">
                      <Icon name={r.icon} size={22} className={r.iconColor} />
                    </div>
                    <div>
                      <div className="font-display font-bold text-lg">{r.title}</div>
                      <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${r.badge}`}>{r.area}</span>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">{r.desc}</p>
                </div>
              </article>
            ))}
          </div>
        )}

        {activeWing === 'right' && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-up">
            {RIGHT_ROOMS.map((r) => (
              <article key={r.title} className={`rounded-3xl border-2 ${r.color} overflow-hidden hover-lift`}>
                {r.image && <img src={r.image} alt={r.title} className="w-full h-48 object-cover" />}
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-xl bg-white/80 flex items-center justify-center">
                      <Icon name={r.icon} size={22} className={r.iconColor} />
                    </div>
                    <div>
                      <div className="font-display font-bold text-lg">{r.title}</div>
                      <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${r.badge}`}>{r.area}</span>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">{r.desc}</p>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      {/* Materials */}
      <section id="materials" className="container pb-24">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <div className="relative order-2 lg:order-1">
            <img src={INTERIOR} alt="Интерьер кухни-гостиной" className="rounded-[2rem] shadow-2xl shadow-primary/20 w-full object-cover aspect-[4/3]" />
          </div>
          <div className="order-1 lg:order-2">
            <h2 className="font-display font-extrabold text-3xl md:text-4xl tracking-tight mb-3">Материалы проекта</h2>
            <p className="text-muted-foreground text-lg mb-8">Каждый материал работает на своём месте.</p>
            <div className="space-y-4">
              {MATERIALS.map((m, i) => (
                <div key={m.name} className="flex gap-4 rounded-2xl bg-white border border-border/60 p-5 hover-lift animate-fade-up" style={{ animationDelay: `${0.08 * i}s` }}>
                  <div className="w-12 h-12 shrink-0 rounded-xl bg-secondary flex items-center justify-center">
                    <Icon name={m.icon} size={24} className="text-primary" fallback="Box" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="font-display font-bold text-base">{m.name}</h3>
                      <span className="text-xs text-muted-foreground">· {m.where}</span>
                    </div>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {m.benefits.map((b) => (
                        <span key={b} className="text-xs font-semibold px-2.5 py-1 rounded-full bg-secondary text-secondary-foreground">{b}</span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="cta" className="container pb-24">
        <div className="relative rounded-[2.5rem] overflow-hidden bg-gradient-to-br from-primary via-primary to-accent p-10 md:p-16 text-center">
          <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-white/10 blur-3xl" />
          <h2 className="relative font-display font-black text-3xl md:text-5xl text-white tracking-tight">Построим ваш дом 6×12</h2>
          <p className="relative mt-4 text-white/85 text-lg max-w-xl mx-auto">
            Оставьте заявку — рассчитаем смету, сроки строительства и подберём комплектацию под ваш бюджет.
          </p>
          <Button size="lg" className="relative mt-8 rounded-full h-14 px-10 text-base font-bold bg-white text-primary hover:bg-white/90">
            Получить расчёт стоимости
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/50 py-10">
        <div className="container flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <Icon name="House" size={16} className="text-white" />
            </div>
            <span className="font-display font-bold text-foreground">ДомПроект 6×12</span>
          </div>
          <p>© 2026 · Комбинированный дом из бревна, сибита и бруса лафет.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
