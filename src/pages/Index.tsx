import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

const EXTERIOR = 'https://cdn.poehali.dev/projects/f633a3e4-0401-4818-be66-0d3723ff7a1b/files/197f7754-907f-466c-be00-dbc4870d483a.jpg';
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
    desc: 'Вход в сауну только через тамбур-предбанник — он работает как тепловой буфер. Горячий воздух и запах не проникают в жилые комнаты. Между баней и домом — утеплённая стена 100 мм минваты.',
    image: SAUNA_IMG,
  },
  {
    icon: 'ShowerHead',
    title: 'Туалет с душем',
    area: '~6 м²',
    color: 'bg-teal-50 border-teal-200',
    iconColor: 'text-teal-600',
    badge: 'bg-teal-100 text-teal-700',
    desc: 'Проходной санузел с двумя дверями: одна из гостиной (повседневный доступ), вторая из тамбура-предбанника (после парилки). Не нужно идти через баню — заходишь в санузел напрямую из коридора.',
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

// SVG Floor Plan Component — updated: pass-through WC, tambour, wardrobes
const FloorPlan = () => {
  const W = 960;
  const H = 520;
  const wall = 10;
  const dW = 38; // door gap width
  const aR = 36; // arc radius

  // X zones: Left 0–320 | Center 320–640 | Right 640–960
  // Y: top wall=0, bottom=H
  // Left wing split Y: master 0–260, kids 260–H
  // Right wing columns: tambour 640–730 | wc 730–830 | sauna 830–960
  //   bottom half of right: boiler 640–960 y=310–H

  const LX = 320; // left-center divider x
  const RX = 640; // center-right divider x
  const TX = 730; // tambour-wc divider
  const SX = 830; // wc-sauna divider
  const MY = 260; // master-kids divider y
  const BY = 310; // boiler top y

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto" style={{ fontFamily: 'Golos Text, sans-serif' }}>
      <defs>
        <pattern id="hatch-sibit" patternUnits="userSpaceOnUse" width="10" height="10" patternTransform="rotate(45)">
          <line x1="0" y1="0" x2="0" y2="10" stroke="#a8a29e" strokeWidth="1.5" opacity="0.3" />
        </pattern>
        <pattern id="hatch-lafet" patternUnits="userSpaceOnUse" width="14" height="14">
          <line x1="0" y1="0" x2="14" y2="0" stroke="#b45309" strokeWidth="1.2" opacity="0.18" />
          <line x1="0" y1="7" x2="14" y2="7" stroke="#b45309" strokeWidth="1.2" opacity="0.18" />
        </pattern>
      </defs>

      {/* ── ROOM FILLS ── */}
      {/* Master bedroom */}
      <rect x={wall} y={wall} width={LX - wall} height={MY - wall} fill="#fff1f2" />
      <rect x={wall} y={wall} width={LX - wall} height={MY - wall} fill="url(#hatch-lafet)" />
      {/* Kids bedroom */}
      <rect x={wall} y={MY} width={LX - wall} height={H - MY - wall} fill="#eff6ff" />
      <rect x={wall} y={MY} width={LX - wall} height={H - MY - wall} fill="url(#hatch-lafet)" />
      {/* Center kitchen-living */}
      <rect x={LX} y={wall} width={RX - LX} height={H - wall * 2} fill="#f5f5f4" />
      <rect x={LX} y={wall} width={RX - LX} height={H - wall * 2} fill="url(#hatch-sibit)" />
      {/* Tambour/предбанник */}
      <rect x={RX} y={wall} width={TX - RX} height={BY - wall} fill="#fef9c3" />
      {/* WC/Shower — проходной санузел */}
      <rect x={TX} y={wall} width={SX - TX} height={BY - wall} fill="#ccfbf1" />
      {/* Sauna */}
      <rect x={SX} y={wall} width={W - SX - wall} height={BY - wall} fill="#fef3c7" />
      <rect x={SX} y={wall} width={W - SX - wall} height={BY - wall} fill="url(#hatch-lafet)" />
      {/* Boiler room (full width right wing bottom) */}
      <rect x={RX} y={BY} width={W - RX - wall} height={H - BY - wall} fill="#f1f5f9" />

      {/* ── OUTER WALLS ── */}
      <rect x={0} y={0} width={W} height={H} fill="none" stroke="#292524" strokeWidth={wall * 2} rx="4" />

      {/* ── SECTION DIVIDERS ── */}
      {/* Left–Center full height */}
      <rect x={LX - 1} y={0} width={wall + 2} height={H} fill="#44403c" />
      {/* Center–Right full height */}
      <rect x={RX - 1} y={0} width={wall + 2} height={H} fill="#44403c" />

      {/* ── LEFT WING WALLS ── */}
      {/* Master / Kids horizontal divider */}
      <rect x={wall} y={MY - wall / 2} width={LX - wall * 2} height={wall} fill="#78716c" />
      {/* Left inner vertical wall (guestroom side) */}
      {/* Master wardrobe wall: vertical stub at x=220 from top */}
      <rect x={220} y={wall} width={wall} height={110} fill="#78716c" />
      {/* Kids wardrobe wall: vertical stub at x=220 from MY */}
      <rect x={220} y={MY + wall} width={wall} height={100} fill="#78716c" />

      {/* ── RIGHT WING INTERNAL WALLS ── */}
      {/* Tambour | WC vertical */}
      <rect x={TX - 1} y={wall} width={wall} height={BY - wall} fill="#78716c" />
      {/* WC | Sauna vertical */}
      <rect x={SX - 1} y={wall} width={wall} height={BY - wall} fill="#78716c" />
      {/* Boiler horizontal */}
      <rect x={RX} y={BY - 1} width={W - RX - wall} height={wall} fill="#78716c" />
      {/* Tambour-boiler: gap — no wall between tambour floor and boiler (open corridor) */}

      {/* ── DOORS ── */}

      {/* 1. Master bedroom → гостиная (через LX, y≈100) */}
      <rect x={LX - 1} y={100} width={wall + 2} height={dW} fill="#f5f5f4" />
      <path d={`M ${LX} ${100} A ${aR} ${aR} 0 0 0 ${LX - aR} ${100 + aR}`} fill="none" stroke="#be123c" strokeWidth="2" strokeDasharray="5 3" />
      <line x1={LX} y1={100} x2={LX - aR} y2={100} stroke="#be123c" strokeWidth="2.2" />
      <text x={LX - aR / 2 - 4} y={95} fontSize="8" fill="#be123c" fontWeight="700" textAnchor="middle">дверь</text>

      {/* 2. Kids bedroom → гостиная (через LX, y≈360) */}
      <rect x={LX - 1} y={360} width={wall + 2} height={dW} fill="#f5f5f4" />
      <path d={`M ${LX} ${360} A ${aR} ${aR} 0 0 0 ${LX - aR} ${360 + aR}`} fill="none" stroke="#1d4ed8" strokeWidth="2" strokeDasharray="5 3" />
      <line x1={LX} y1={360} x2={LX - aR} y2={360} stroke="#1d4ed8" strokeWidth="2.2" />

      {/* 3. Гостиная → Тамбур (через RX, y≈120) */}
      <rect x={RX - 1} y={120} width={wall + 2} height={dW} fill="#fef9c3" />
      <path d={`M ${RX + wall} ${120} A ${aR} ${aR} 0 0 1 ${RX + wall + aR} ${120 + aR}`} fill="none" stroke="#92400e" strokeWidth="2" strokeDasharray="5 3" />
      <line x1={RX + wall} y1={120} x2={RX + wall + aR} y2={120} stroke="#92400e" strokeWidth="2.2" />

      {/* 4. Гостиная → Санузел напрямую (через RX, y≈210) — ВХОД ИЗ ДОМА */}
      <rect x={RX - 1} y={215} width={wall + 2} height={dW} fill="#ccfbf1" />
      <path d={`M ${RX + wall} ${215} A ${aR} ${aR} 0 0 1 ${RX + wall + aR} ${215 + aR}`} fill="none" stroke="#0d9488" strokeWidth="2" strokeDasharray="5 3" />
      <line x1={RX + wall} y1={215} x2={RX + wall + aR} y2={215} stroke="#0d9488" strokeWidth="2.2" />
      {/* label */}
      <text x={RX + wall + aR + 2} y={228} fontSize="8" fill="#0d9488" fontWeight="800">← из дома</text>

      {/* 5. Тамбур → Санузел (через TX, y≈150) — после парилки */}
      <rect x={TX - 1} y={155} width={wall} height={dW} fill="#ccfbf1" />
      <path d={`M ${TX} ${155} A ${aR} ${aR} 0 0 1 ${TX + aR} ${155 + aR}`} fill="none" stroke="#0d9488" strokeWidth="2" strokeDasharray="5 3" />
      <line x1={TX} y1={155} x2={TX + aR} y2={155} stroke="#0d9488" strokeWidth="2.2" />
      {/* label */}
      <text x={TX + 4} y={150} fontSize="8" fill="#0d9488" fontWeight="800">← из бани</text>

      {/* 6. Тамбур → Сауна (через SX, y≈80) */}
      <rect x={SX - 1} y={75} width={wall} height={dW} fill="#fef3c7" />
      <path d={`M ${SX} ${75} A ${aR} ${aR} 0 0 0 ${SX - aR} ${75 + aR}`} fill="none" stroke="#d97706" strokeWidth="2" strokeDasharray="5 3" />
      <line x1={SX} y1={75} x2={SX - aR} y2={75} stroke="#d97706" strokeWidth="2.2" />

      {/* 7. Тамбур → Бойлерная (вниз, через BY) */}
      <rect x={RX + 20} y={BY - 1} width={dW} height={wall} fill="#f1f5f9" />
      <path d={`M ${RX + 20} ${BY + wall} A ${aR} ${aR} 0 0 0 ${RX + 20 + aR} ${BY + wall - aR}`} fill="none" stroke="#64748b" strokeWidth="2" strokeDasharray="5 3" />
      <line x1={RX + 20} y1={BY + wall} x2={RX + 20} y2={BY + wall - aR} stroke="#64748b" strokeWidth="2.2" />

      {/* 8. Главный вход — центр снизу */}
      <rect x={450} y={H - wall * 2} width={dW + 12} height={wall * 2} fill="#f5f5f4" />
      <path d={`M 450 ${H - wall * 2} A 48 48 0 0 0 ${450 + 48} ${H - wall * 2 - 48}`} fill="none" stroke="#292524" strokeWidth="2.5" strokeDasharray="6 3" />
      <line x1={450} y1={H - wall * 2} x2={450 + 48} y2={H - wall * 2} stroke="#292524" strokeWidth="2.8" />
      <text x={472} y={H - 2} textAnchor="middle" fontSize="11" fill="#44403c" fontWeight="700">ГЛАВНЫЙ ВХОД</text>

      {/* 9. Сауна — выход на улицу (правый фасад) */}
      <rect x={W - wall * 2} y={55} width={wall * 2} height={dW + 6} fill="#fef3c7" />
      <path d={`M ${W - wall * 2} ${55} A ${aR} ${aR} 0 0 0 ${W - wall * 2 - aR} ${55 + aR}`} fill="none" stroke="#d97706" strokeWidth="2" strokeDasharray="5 3" />
      <line x1={W - wall * 2} y1={55} x2={W - wall * 2} y2={55 + aR} stroke="#d97706" strokeWidth="2.2" />
      <text x={W - 6} y={50} textAnchor="end" fontSize="8" fill="#d97706" fontWeight="700">выход↓</text>

      {/* 10. Бойлерная — выход на улицу (правый фасад снизу) */}
      <rect x={W - wall * 2} y={370} width={wall * 2} height={dW + 6} fill="#f1f5f9" />
      <path d={`M ${W - wall * 2} ${370} A ${aR} ${aR} 0 0 0 ${W - wall * 2 - aR} ${370 + aR}`} fill="none" stroke="#64748b" strokeWidth="2" strokeDasharray="5 3" />
      <line x1={W - wall * 2} y1={370} x2={W - wall * 2} y2={370 + aR} stroke="#64748b" strokeWidth="2.2" />

      {/* ── FURNITURE ── */}

      {/* MASTER: кровать */}
      <rect x={25} y={20} width={100} height={65} rx="6" fill="#fda4af" opacity="0.65" stroke="#f43f5e" strokeWidth="1.5" />
      <rect x={25} y={20} width={100} height={20} rx="4" fill="#f43f5e" opacity="0.5" />
      <text x={75} y={60} textAnchor="middle" fontSize="9" fill="#9f1239" fontWeight="700">КРОВАТЬ 160×200</text>

      {/* MASTER: гардероб в нише (слева от кровати, x=25–220, y=wall–110) */}
      <rect x={25} y={90} width={190} height={38} rx="4" fill="#fed7aa" opacity="0.8" stroke="#ea580c" strokeWidth="1.2" />
      {/* двери гардероба — штриховые линии */}
      <line x1={88} y1={90} x2={88} y2={128} stroke="#ea580c" strokeWidth="1" strokeDasharray="3 2" opacity="0.7" />
      <line x1={152} y1={90} x2={152} y2={128} stroke="#ea580c" strokeWidth="1" strokeDasharray="3 2" opacity="0.7" />
      <text x={110} y={113} textAnchor="middle" fontSize="9" fill="#9a3412" fontWeight="700">ГАРДЕРОБ</text>
      <text x={110} y={124} textAnchor="middle" fontSize="7.5" fill="#c2410c" opacity="0.8">3 секции · ~2 м</text>

      {/* MASTER: тумбочки */}
      <rect x={130} y={20} width={22} height={22} rx="3" fill="#fcd34d" opacity="0.6" />
      <rect x={25} y={20} width={0} height={22} rx="3" fill="#fcd34d" opacity="0.6" />

      {/* MASTER label */}
      <text x={LX / 2} y={MY - 18} textAnchor="middle" fontSize="13" fill="#be123c" fontWeight="800">МАСТЕР-СПАЛЬНЯ · ~16 м²</text>

      {/* KIDS: кровать */}
      <rect x={25} y={MY + 14} width={85} height={55} rx="6" fill="#93c5fd" opacity="0.65" stroke="#3b82f6" strokeWidth="1.5" />
      <rect x={25} y={MY + 14} width={85} height={18} rx="4" fill="#3b82f6" opacity="0.5" />
      <text x={67} y={MY + 49} textAnchor="middle" fontSize="9" fill="#1e3a8a" fontWeight="700">КРОВАТЬ</text>

      {/* KIDS: письменный стол */}
      <rect x={130} y={MY + 14} width={80} height={35} rx="4" fill="#bae6fd" opacity="0.7" stroke="#0284c7" strokeWidth="1" />
      <text x={170} y={MY + 36} textAnchor="middle" fontSize="8" fill="#075985" fontWeight="700">СТОЛ</text>

      {/* KIDS: гардероб */}
      <rect x={25} y={MY + 80} width={185} height={35} rx="4" fill="#bfdbfe" opacity="0.8" stroke="#3b82f6" strokeWidth="1.2" />
      <line x1={87} y1={MY + 80} x2={87} y2={MY + 115} stroke="#3b82f6" strokeWidth="1" strokeDasharray="3 2" opacity="0.7" />
      <line x1={149} y1={MY + 80} x2={149} y2={MY + 115} stroke="#3b82f6" strokeWidth="1" strokeDasharray="3 2" opacity="0.7" />
      <text x={110} y={MY + 102} textAnchor="middle" fontSize="9" fill="#1d4ed8" fontWeight="700">ГАРДЕРОБ</text>
      <text x={110} y={MY + 113} textAnchor="middle" fontSize="7.5" fill="#1d4ed8" opacity="0.8">2 секции · ~1.8 м</text>

      {/* KIDS label */}
      <text x={LX / 2} y={H - 18} textAnchor="middle" fontSize="13" fill="#1d4ed8" fontWeight="800">ДЕТСКАЯ · ~14 м²</text>

      {/* ── ПАНОРАМНЫЕ ОКНА — верхняя стена (напротив входа, вид на сад) ── */}
      {/* Окно 1 */}
      <rect x={LX + 20} y={0} width={80} height={wall * 2} fill="#bae6fd" opacity="0.9" stroke="#0284c7" strokeWidth="1.5" />
      <line x1={LX + 60} y1={0} x2={LX + 60} y2={wall * 2} stroke="#0284c7" strokeWidth="1" opacity="0.5" />
      {/* Окно 2 */}
      <rect x={LX + 120} y={0} width={80} height={wall * 2} fill="#bae6fd" opacity="0.9" stroke="#0284c7" strokeWidth="1.5" />
      <line x1={LX + 160} y1={0} x2={LX + 160} y2={wall * 2} stroke="#0284c7" strokeWidth="1" opacity="0.5" />
      {/* Окно 3 */}
      <rect x={LX + 220} y={0} width={80} height={wall * 2} fill="#bae6fd" opacity="0.9" stroke="#0284c7" strokeWidth="1.5" />
      <line x1={LX + 260} y1={0} x2={LX + 260} y2={wall * 2} stroke="#0284c7" strokeWidth="1" opacity="0.5" />
      {/* Подпись панорамных окон */}
      <text x={(LX + RX) / 2} y={-6} textAnchor="middle" fontSize="9" fill="#0369a1" fontWeight="800">◀ ПАНОРАМНЫЕ ОКНА · ВИД НА САД ▶</text>

      {/* ── ПРИХОЖАЯ — у входной (нижней) стены, свободная зона ── */}
      {/* коврик у входа */}
      <rect x={LX + 80} y={H - wall - 36} width={90} height={28} rx="6" fill="#bbf7d0" opacity="0.7" stroke="#16a34a" strokeWidth="1.2" strokeDasharray="4 2" />
      <text x={LX + 125} y={H - wall - 18} textAnchor="middle" fontSize="8" fill="#15803d" fontWeight="700">ВХОД · прихожая</text>

      {/* ── ГАРДЕРОБНАЯ ЗОНА — левый угол у входа (вдоль стены со спальнями) ── */}
      <rect x={LX + 8} y={H - wall - 100} width={90} height={90} rx="4" fill="#e9d5ff" opacity="0.75" stroke="#7c3aed" strokeWidth="1.5" />
      {/* штанга */}
      <line x1={LX + 12} y1={H - wall - 85} x2={LX + 94} y2={H - wall - 85} stroke="#7c3aed" strokeWidth="2.5" opacity="0.7" />
      {/* вешалки */}
      {[LX + 18, LX + 36, LX + 54, LX + 72, LX + 90].map((x, i) => (
        <g key={i}>
          <line x1={x} y1={H - wall - 85} x2={x} y2={H - wall - 62} stroke="#7c3aed" strokeWidth="1.5" opacity="0.6" />
          <ellipse cx={x} cy={H - wall - 59} rx="5" ry="7" fill="none" stroke="#7c3aed" strokeWidth="1.2" opacity="0.5" />
        </g>
      ))}
      {/* полка снизу */}
      <rect x={LX + 10} y={H - wall - 22} width={86} height={8} rx="2" fill="#7c3aed" opacity="0.25" />
      <text x={LX + 53} y={H - wall - 106} textAnchor="middle" fontSize="8" fill="#6d28d9" fontWeight="800">ГАРДЕРОБ</text>
      <text x={LX + 53} y={H - wall - 96} textAnchor="middle" fontSize="7" fill="#7c3aed" opacity="0.8">~4 м² · у стены</text>

      {/* ── КУХОННЫЙ ГАРНИТУР — вдоль стены LX (у секции спален, П-образно) ── */}
      {/* Гарнитур вдоль левой стены центральной зоны (x=LX+wall) */}
      <rect x={LX + wall} y={wall + 20} width={42} height={200} rx="5" fill="#d6d3d1" opacity="0.75" stroke="#a8a29e" strokeWidth="1.5" />
      {/* Мойка */}
      <rect x={LX + wall + 6} y={wall + 28} width={28} height={28} rx="4" fill="#a8a29e" opacity="0.6" />
      <circle cx={LX + wall + 20} cy={wall + 42} r="8" fill="none" stroke="#78716c" strokeWidth="1.8" />
      {/* Плита */}
      <rect x={LX + wall + 6} y={wall + 76} width={28} height={28} rx="4" fill="#a8a29e" opacity="0.5" />
      <circle cx={LX + wall + 14} cy={wall + 84} r="4.5" fill="none" stroke="#78716c" strokeWidth="1.5" />
      <circle cx={LX + wall + 26} cy={wall + 84} r="4.5" fill="none" stroke="#78716c" strokeWidth="1.5" />
      <circle cx={LX + wall + 14} cy={wall + 96} r="4.5" fill="none" stroke="#78716c" strokeWidth="1.5" />
      <circle cx={LX + wall + 26} cy={wall + 96} r="4.5" fill="none" stroke="#78716c" strokeWidth="1.5" />
      <text x={LX + wall + 21} y={wall + 14} textAnchor="middle" fontSize="7.5" fill="#44403c" fontWeight="700" transform={`rotate(-90, ${LX + wall + 21}, ${wall + 130})`}>КУХОННЫЙ ГАРНИТУР</text>

      {/* ── ОБЕДЕННЫЙ СТОЛ — по центру, между кухней и диваном ── */}
      <rect x={LX + 80} y={H / 2 - 30} width={130} height={75} rx="8" fill="#e7e5e4" opacity="0.75" stroke="#a8a29e" strokeWidth="1.5" />
      <text x={LX + 145} y={H / 2 + 10} textAnchor="middle" fontSize="10" fill="#44403c" fontWeight="700">СТОЛ</text>
      {/* стулья */}
      {[LX + 80, LX + 210].map((x, i) => (
        [H / 2 - 28, H / 2 + 25].map((y, j) => <rect key={`c${i}-${j}`} x={x - 14} y={y} width={28} height={14} rx="4" fill="#c4b5a5" opacity="0.7" />)
      ))}

      {/* ── ДИВАН — у панорамных окон, лицом к ним ── */}
      <rect x={LX + 30} y={wall + 24} width={RX - LX - 80} height={52} rx="8" fill="#d6d3d1" opacity="0.7" stroke="#a8a29e" strokeWidth="1.5" />
      <text x={LX + 30 + (RX - LX - 80) / 2} y={wall + 54} textAnchor="middle" fontSize="10" fill="#44403c" fontWeight="700">ДИВАН</text>
      <text x={LX + 30 + (RX - LX - 80) / 2} y={wall + 67} textAnchor="middle" fontSize="7" fill="#78716c">лицом к окнам →</text>

      {/* Стрелка взгляда от входа к панораме */}
      <line x1={LX + 190} y1={H - 28} x2={LX + 190} y2={100} stroke="#16a34a" strokeWidth="1.5" strokeDasharray="6 4" opacity="0.4" />
      <polygon points={`${LX + 190},96 ${LX + 184},110 ${LX + 196},110`} fill="#16a34a" opacity="0.4" />
      <text x={LX + 200} y={310} fontSize="7.5" fill="#16a34a" fontWeight="600" transform={`rotate(-90, ${LX + 200}, 310)`}>взгляд от входа</text>

      {/* CENTER label */}
      <text x={(LX + RX) / 2 - 10} y={H - 14} textAnchor="middle" fontSize="11" fill="#57534e" fontWeight="800">КУХНЯ-ГОСТИНАЯ · ~24 м²</text>

      {/* TAMBOUR: предбанник */}
      <text x={(RX + TX) / 2} y={80} textAnchor="middle" fontSize="9" fill="#92400e" fontWeight="800">ТАМБУР</text>
      <text x={(RX + TX) / 2} y={92} textAnchor="middle" fontSize="8" fill="#b45309" opacity="0.8">предбанник</text>
      {/* вешалка */}
      <rect x={RX + 8} y={110} width={TX - RX - 16} height={20} rx="3" fill="#fbbf24" opacity="0.5" stroke="#d97706" strokeWidth="1" />
      <text x={(RX + TX) / 2} y={124} textAnchor="middle" fontSize="7.5" fill="#92400e">вешалка</text>
      {/* теплоизоляция указатель */}
      <rect x={RX + 4} y={wall + 2} width={TX - RX - 8} height={8} rx="2" fill="#fde68a" opacity="0.9" />
      <text x={(RX + TX) / 2} y={wall + 9} textAnchor="middle" fontSize="6.5" fill="#78350f" fontWeight="700">🔥 утеплённая стена</text>

      {/* WC: проходной санузел */}
      <text x={(TX + SX) / 2} y={30} textAnchor="middle" fontSize="9" fill="#0f766e" fontWeight="800">САНУЗЕЛ</text>
      <text x={(TX + SX) / 2} y={41} textAnchor="middle" fontSize="7.5" fill="#0d9488">проходной · ~6 м²</text>
      {/* душ */}
      <rect x={TX + 8} y={55} width={SX - TX - 16} height={80} rx="5" fill="#99f6e4" opacity="0.55" stroke="#0d9488" strokeWidth="1.5" />
      <circle cx={(TX + SX) / 2} cy={95} r="18" fill="none" stroke="#0d9488" strokeWidth="2" strokeDasharray="4 3" />
      <text x={(TX + SX) / 2} y={99} textAnchor="middle" fontSize="8" fill="#0f766e" fontWeight="700">ДУШ</text>
      {/* унитаз */}
      <ellipse cx={(TX + SX) / 2} cy={200} rx="22" ry="28" fill="#99f6e4" opacity="0.6" stroke="#0d9488" strokeWidth="1.5" />
      <text x={(TX + SX) / 2} y={204} textAnchor="middle" fontSize="8" fill="#0f766e" fontWeight="700">WC</text>
      {/* раковина */}
      <rect x={TX + 10} y={245} width={30} height={24} rx="4" fill="#99f6e4" opacity="0.6" stroke="#0d9488" strokeWidth="1" />
      <circle cx={TX + 25} cy={257} r="6" fill="none" stroke="#0d9488" strokeWidth="1.5" />

      {/* 2 входа подсветка */}
      <text x={(TX + SX) / 2} y={285} textAnchor="middle" fontSize="7" fill="#0d9488" fontWeight="700">2 входа:</text>
      <text x={(TX + SX) / 2} y={295} textAnchor="middle" fontSize="6.5" fill="#0d9488">из дома + из бани</text>

      {/* SAUNA */}
      <rect x={SX + 8} y={20} width={W - SX - wall - 16} height={80} rx="5" fill="#fde68a" opacity="0.6" stroke="#d97706" strokeWidth="1.5" />
      <rect x={SX + 8} y={25} width={W - SX - wall - 16} height={25} rx="3" fill="#fbbf24" opacity="0.5" />
      <rect x={SX + 8} y={55} width={W - SX - wall - 16} height={20} rx="3" fill="#fbbf24" opacity="0.4" />
      <text x={(SX + W - wall) / 2} y={72} textAnchor="middle" fontSize="9" fill="#92400e" fontWeight="700">ПОЛКИ</text>
      {/* печь */}
      <rect x={SX + 30} y={112} width={40} height={38} rx="6" fill="#ef4444" opacity="0.55" stroke="#dc2626" strokeWidth="1.5" />
      <text x={SX + 50} y={136} textAnchor="middle" fontSize="8" fill="#7f1d1d" fontWeight="700">ПЕЧЬ</text>
      <text x={(SX + W - wall) / 2} y={175} textAnchor="middle" fontSize="10" fill="#92400e" fontWeight="800">БАНЯ/САУНА</text>
      <text x={(SX + W - wall) / 2} y={188} textAnchor="middle" fontSize="8" fill="#b45309" opacity="0.8">~10 м²</text>

      {/* BOILER ROOM */}
      <rect x={RX + 14} y={BY + 12} width={60} height={75} rx="8" fill="#94a3b8" opacity="0.7" stroke="#64748b" strokeWidth="1.5" />
      <text x={RX + 44} y={BY + 55} textAnchor="middle" fontSize="8" fill="#1e293b" fontWeight="700">КОТЁЛ</text>
      <rect x={RX + 90} y={BY + 17} width={45} height={60} rx="8" fill="#93c5fd" opacity="0.6" stroke="#3b82f6" strokeWidth="1.5" />
      <text x={RX + 112} y={BY + 52} textAnchor="middle" fontSize="8" fill="#1e3a8a" fontWeight="700">БОЙЛЕР</text>
      <text x={(RX + W - wall) / 2} y={H - 14} textAnchor="middle" fontSize="11" fill="#475569" fontWeight="800">БОЙЛЕРНАЯ · ~18 м²</text>

      {/* ── HEAT ISOLATION NOTE ── */}
      {/* Arrow + label showing insulated wall between tambour and living */}
      <rect x={RX - 1} y={wall} width={wall + 2} height={BY - wall} fill="none" stroke="#f59e0b" strokeWidth="3" strokeDasharray="6 3" opacity="0.5" />
      <text x={RX + 6} y={BY + 4} fontSize="7.5" fill="#b45309" fontWeight="700">утеплитель</text>

      {/* ── COMPASS ── */}
      <g transform={`translate(${W - 30}, 30)`}>
        <circle cx="0" cy="0" r="22" fill="white" stroke="#e2e8f0" strokeWidth="1.5" />
        <text x="0" y="-8" textAnchor="middle" fontSize="9" fill="#ef4444" fontWeight="800">С</text>
        <text x="0" y="15" textAnchor="middle" fontSize="9" fill="#78716c">Ю</text>
        <polygon points="0,-5 2.5,4 0,2 -2.5,4" fill="#ef4444" />
      </g>

      {/* ── LEGEND ── */}
      <g transform={`translate(12, ${H - 24})`}>
        <line x1="0" y1="6" x2="18" y2="6" stroke="#44403c" strokeWidth="2.5" strokeDasharray="5 3" />
        <text x="22" y="10" fontSize="8.5" fill="#57534e">дверной проём</text>
        <rect x="130" y="0" width="14" height="12" rx="2" fill="#ccfbf1" stroke="#0d9488" strokeWidth="1" />
        <text x="148" y="10" fontSize="8.5" fill="#0d9488" fontWeight="700">проходной санузел (2 входа)</text>
        <rect x="350" y="0" width="14" height="12" rx="2" fill="#fef9c3" stroke="#d97706" strokeWidth="1" />
        <text x="368" y="10" fontSize="8.5" fill="#92400e" fontWeight="700">тамбур (тепловой буфер)</text>
      </g>

      {/* ── DIMENSION ── */}
      <text x={W / 2} y={H - 4} textAnchor="middle" fontSize="10" fill="#78716c" fontWeight="600">← 12 м →</text>
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
            <a href="#site" className="hover:text-foreground transition-colors">Участок</a>
            <a href="#facades" className="hover:text-foreground transition-colors">Фасады</a>
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

      {/* Living room visualization */}
      <section className="container pb-24">
        <div className="rounded-[2.5rem] overflow-hidden relative shadow-2xl shadow-primary/15 group">
          <img
            src="https://cdn.poehali.dev/projects/f633a3e4-0401-4818-be66-0d3723ff7a1b/files/2a4b2ce4-1aaf-49d1-b25e-103de2bbdc09.jpg"
            alt="Интерьер кухни-гостиной с панорамными окнами"
            className="w-full object-cover max-h-[520px] transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
            <Badge className="rounded-full bg-white/20 backdrop-blur text-white border-white/30 mb-4 font-semibold">
              🏠 Визуализация · кухня-гостиная
            </Badge>
            <h3 className="font-display font-extrabold text-white text-2xl md:text-4xl mb-2">
              Панорамные окна — от пола до потолка
            </h3>
            <p className="text-white/80 text-base max-w-xl">
              Заходишь с дороги — и сразу видишь сад через весь дом. Диван лицом к окнам, кухня у входной стены, гардеробная ниша справа от двери.
            </p>
          </div>
          {/* Зоны-метки */}
          <div className="absolute top-6 left-6 flex flex-wrap gap-2">
            {[
              { color: 'bg-sky-500', label: '🪟 Панорама · сад' },
              { color: 'bg-stone-500', label: '🛋 Гостиная · диван' },
              { color: 'bg-amber-600', label: '🍳 Кухня · у входа' },
              { color: 'bg-violet-500', label: '🧥 Гардероб · угол' },
            ].map(z => (
              <span key={z.label} className={`${z.color} text-white text-xs font-bold px-3 py-1 rounded-full backdrop-blur`}>
                {z.label}
              </span>
            ))}
          </div>
        </div>
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

      {/* Site placement */}
      <section id="site" className="container pb-16">
        <div className="max-w-2xl mb-8">
          <h2 className="font-display font-extrabold text-3xl md:text-5xl tracking-tight">Посадка на участке</h2>
          <p className="mt-3 text-muted-foreground text-lg">
            Кадастровый номер <span className="font-bold text-foreground">22:65:012005:1113</span> · дом стоит вдоль красной границы (дорога).
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 items-start mb-8">
          {/* Cadastral photo — latest */}
          <div className="rounded-3xl overflow-hidden border-2 border-red-300 shadow-xl relative">
            <img
              src="https://cdn.poehali.dev/projects/f633a3e4-0401-4818-be66-0d3723ff7a1b/bucket/174f31e3-25e8-4461-9345-e84b593b4446.jpeg"
              alt="Кадастровый снимок участка"
              className="w-full object-cover"
            />
            <div className="absolute top-4 left-4 bg-black/65 backdrop-blur text-white text-xs font-bold px-3 py-1.5 rounded-full">
              📍 22:65:012005:1113
            </div>
            <div className="absolute bottom-4 left-4 bg-red-600/90 backdrop-blur text-white text-xs font-bold px-3 py-1.5 rounded-full">
              🔴 красная линия = дорога / граница
            </div>
          </div>

          {/* SVG — дом вдоль красной границы (левая/диагональная сторона) */}
          <div className="rounded-3xl bg-white border border-border/60 p-5 shadow-xl">
            <div className="flex items-center gap-2 mb-3 text-sm font-semibold text-muted-foreground">
              <Icon name="MapPin" size={16} className="text-primary" />
              Схема посадки · дом вдоль красной границы
            </div>
            <svg viewBox="0 0 460 420" className="w-full h-auto">
              {/* bg */}
              <rect width="460" height="420" fill="#f0fdf4" rx="10" />

              {/* ДОРОГА — вдоль левой диагональной границы */}
              <polygon points="0,0 55,0 85,420 0,420" fill="#d4d4d4" opacity="0.85" />
              <text x="27" y="210" textAnchor="middle" fontSize="9" fill="#57534e" fontWeight="700" transform="rotate(-90,27,210)">ДОРОГА (красная граница)</text>

              {/* Участок — трапеция (широкая внизу) */}
              <polygon points="55,10 380,30 380,390 85,410" fill="#fefce8" stroke="#ca8a04" strokeWidth="2.5" strokeDasharray="8 4" />

              {/* Отступ 3м от красной границы */}
              <polygon points="88,10 115,10 140,410 118,410" fill="none" stroke="#86efac" strokeWidth="1.5" strokeDasharray="5 3" opacity="0.9" />
              <text x="102" y="50" fontSize="7.5" fill="#16a34a" fontWeight="700" transform="rotate(-87,102,50)">← 3 м отступ</text>

              {/* ДОМ — вертикально, вдоль левой (красной) границы, с отступом 3м */}
              {/* Дом 12м высота × 6м ширина в системе SVG (масштаб ~1м=26px) */}
              {/* x=125 (после отступа), y=55, w=155(6м), h=312(12м) */}
              <g transform="translate(125, 54)">
                {/* тень */}
                <rect x="5" y="5" width="155" height="312" rx="6" fill="#000" opacity="0.07" />
                {/* корпус */}
                <rect width="155" height="312" rx="6" fill="white" stroke="#292524" strokeWidth="2.5" />

                {/* Верхняя часть — СПАЛЬНИ (левое крыло вдоль дороги) */}
                {/* Ближайшие к дороге — спальни НАВЕРХУ схемы */}
                <rect width="155" height="104" rx="4" fill="#fecdd3" opacity="0.65" />
                <text x="77" y="45" textAnchor="middle" fontSize="9" fill="#be123c" fontWeight="800">СПАЛЬНИ</text>
                <text x="77" y="59" textAnchor="middle" fontSize="7.5" fill="#be123c">мастер + детская</text>
                <text x="77" y="71" textAnchor="middle" fontSize="7" fill="#be123c" opacity="0.8">брус лафет</text>
                {/* окна спален на правую сторону (тихая) */}
                <rect x="130" y="20" width="18" height="28" rx="3" fill="#bae6fd" opacity="0.7" stroke="#0284c7" strokeWidth="1" />
                <rect x="130" y="60" width="18" height="28" rx="3" fill="#bae6fd" opacity="0.7" stroke="#0284c7" strokeWidth="1" />
                <text x="153" y="56" fontSize="7" fill="#0369a1" fontWeight="600">окна</text>

                {/* Горизонтальная стена: спальни | гостиная */}
                <rect x="0" y="104" width="155" height="8" fill="#44403c" opacity="0.7" />

                {/* Центр — КУХНЯ-ГОСТИНАЯ */}
                <rect x="0" y="112" width="155" height="96" fill="#f5f5f4" opacity="0.85" />
                <rect x="0" y="112" width="155" height="96" fill="url(#hatch-sibit)" opacity="0.5" />
                <text x="77" y="155" textAnchor="middle" fontSize="9" fill="#44403c" fontWeight="800">КУХНЯ-ГОСТИНАЯ</text>
                <text x="77" y="168" textAnchor="middle" fontSize="7.5" fill="#57534e">блоки сибит · ~24 м²</text>
                {/* Главный вход — со стороны дороги (левая сторона) */}
                <rect x="0" y="140" width="8" height="36" fill="#f0fdf4" />
                <path d="M 0 140 A 34 34 0 0 1 34 174" fill="none" stroke="#16a34a" strokeWidth="2" strokeDasharray="4 2" />
                <line x1="0" y1="140" x2="34" y2="140" stroke="#16a34a" strokeWidth="2.2" />
                <text x="-28" y="162" fontSize="8" fill="#15803d" fontWeight="800" textAnchor="middle">ВХОД</text>
                <polygon points="-8,158 -22,154 -22,162" fill="#16a34a" />
                {/* окна кухни на дорогу */}
                <rect x="0" y="118" width="8" height="20" rx="2" fill="#bae6fd" opacity="0.7" stroke="#0284c7" strokeWidth="1" />
                <rect x="0" y="190" width="8" height="20" rx="2" fill="#bae6fd" opacity="0.7" stroke="#0284c7" strokeWidth="1" />

                {/* Горизонтальная стена: гостиная | баня */}
                <rect x="0" y="208" width="155" height="8" fill="#44403c" opacity="0.7" />

                {/* Нижняя часть — БАНЯ / САНУЗЕЛ / БОЙЛЕР */}
                <rect x="0" y="216" width="155" height="96" rx="4" fill="#fef3c7" opacity="0.65" />

                {/* Тамбур */}
                <rect x="0" y="216" width="50" height="96" fill="#fef9c3" opacity="0.8" />
                <text x="25" y="258" textAnchor="middle" fontSize="8" fill="#92400e" fontWeight="700">ТАМ-</text>
                <text x="25" y="270" textAnchor="middle" fontSize="8" fill="#92400e" fontWeight="700">БУР</text>
                {/* выход тамбура на улицу */}
                <rect x="0" y="238" width="8" height="30" fill="#fef9c3" />
                <path d="M 0 238 A 28 28 0 0 0 28 266" fill="none" stroke="#d97706" strokeWidth="1.8" strokeDasharray="3 2" />
                <line x1="0" y1="238" x2="0" y2="266" stroke="#d97706" strokeWidth="2" />
                <text x="-22" y="256" fontSize="7" fill="#d97706" fontWeight="700" textAnchor="middle">выход</text>
                <text x="-22" y="265" fontSize="7" fill="#d97706" fontWeight="700" textAnchor="middle">бани</text>

                {/* Санузел */}
                <rect x="50" y="216" width="55" height="96" fill="#ccfbf1" opacity="0.7" />
                <text x="77" y="255" textAnchor="middle" fontSize="8" fill="#0f766e" fontWeight="800">САНУЗЕЛ</text>
                <text x="77" y="267" textAnchor="middle" fontSize="7" fill="#0d9488">2 входа</text>
                {/* дверь из гостиной в санузел */}
                <rect x="50" y="208" width="30" height="8" fill="#ccfbf1" />
                <path d="M 50 208 A 28 28 0 0 0 78 236" fill="none" stroke="#0d9488" strokeWidth="1.8" strokeDasharray="3 2" />
                <line x1="50" y1="208" x2="78" y2="208" stroke="#0d9488" strokeWidth="2" />

                {/* Сауна */}
                <rect x="105" y="216" width="50" height="96" rx="4" fill="#fde68a" opacity="0.7" />
                <text x="130" y="258" textAnchor="middle" fontSize="8" fill="#92400e" fontWeight="800">САУНА</text>
                <text x="130" y="270" textAnchor="middle" fontSize="7" fill="#b45309">~10 м²</text>

                {/* Внутренние стены банного блока */}
                <rect x="50" y="216" width="6" height="96" fill="#78716c" opacity="0.6" />
                <rect x="105" y="216" width="6" height="96" fill="#78716c" opacity="0.6" />

                {/* Бойлерная — отдельно внизу */}
                <rect x="0" y="312" width="155" height="0" fill="#f1f5f9" />

                {/* Внутренние стены секций */}
                <line x1="0" y1="104" x2="155" y2="104" stroke="#44403c" strokeWidth="6" />
                <line x1="0" y1="208" x2="155" y2="208" stroke="#44403c" strokeWidth="6" />

                {/* Размеры */}
                <text x="77" y="-10" textAnchor="middle" fontSize="10" fill="#57534e" fontWeight="700">← 6 м →</text>
                <text x="170" y="156" textAnchor="middle" fontSize="10" fill="#57534e" fontWeight="700" transform="rotate(90,170,156)">← 12 м →</text>
              </g>

              {/* Бойлерная — снаружи как пристройка или в нижней части */}
              <rect x="125" y="366" width="80" height="45" rx="5" fill="#f1f5f9" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="5 3" />
              <text x="165" y="388" textAnchor="middle" fontSize="8" fill="#475569" fontWeight="700">БОЙЛЕРНАЯ</text>
              <text x="165" y="400" textAnchor="middle" fontSize="7" fill="#64748b">выход на улицу →</text>

              {/* Зона за домом — двор */}
              <text x="310" y="200" textAnchor="middle" fontSize="9" fill="#16a34a" fontWeight="700">ДВОР</text>
              <text x="310" y="214" textAnchor="middle" fontSize="8" fill="#16a34a" opacity="0.8">сад / зона отдыха</text>

              {/* Деревья по правой границе */}
              {[[360,60],[370,110],[358,165],[368,220],[355,275]].map(([x,y],i) => (
                <g key={i} transform={`translate(${x},${y})`}>
                  <circle cy="-8" r="11" fill="#86efac" opacity="0.65" />
                  <rect x="-2" y="3" width="4" height="9" fill="#92400e" opacity="0.45" />
                </g>
              ))}
              <text x="365" y="315" fontSize="8" fill="#16a34a" textAnchor="middle">зелень</text>

              {/* Парковка — у дороги, перед главным входом */}
              <rect x="90" y="10" width="70" height="38" rx="4" fill="#cbd5e1" opacity="0.75" stroke="#94a3b8" strokeWidth="1.2" />
              <text x="125" y="30" textAnchor="middle" fontSize="8" fill="#475569" fontWeight="700">ПАРКОВКА</text>
              <text x="125" y="41" textAnchor="middle" fontSize="7" fill="#64748b">въезд с дороги</text>

              {/* Компас */}
              <g transform="translate(430, 30)">
                <circle cx="0" cy="0" r="20" fill="white" stroke="#e2e8f0" strokeWidth="1.5" />
                <text x="0" y="-7" textAnchor="middle" fontSize="9" fill="#ef4444" fontWeight="800">С</text>
                <text x="0" y="15" textAnchor="middle" fontSize="9" fill="#78716c">Ю</text>
                <text x="12" y="4" textAnchor="middle" fontSize="8" fill="#78716c">В</text>
                <text x="-12" y="4" textAnchor="middle" fontSize="8" fill="#78716c">З</text>
                <polygon points="0,-6 2.5,4 0,2 -2.5,4" fill="#ef4444" />
              </g>

              {/* Легенда */}
              <g transform="translate(10,395)">
                <rect width="10" height="8" rx="1" fill="#fecdd3" stroke="#be123c" strokeWidth="1" />
                <text x="14" y="8" fontSize="7.5" fill="#57534e">спальни</text>
                <rect x="68" width="10" height="8" rx="1" fill="#f5f5f4" stroke="#57534e" strokeWidth="1" />
                <text x="82" y="8" fontSize="7.5" fill="#57534e">кухня-гостиная</text>
                <rect x="180" width="10" height="8" rx="1" fill="#fde68a" stroke="#d97706" strokeWidth="1" />
                <text x="194" y="8" fontSize="7.5" fill="#57534e">баня/санузел</text>
                <rect x="275" width="10" height="8" rx="1" fill="#d4d4d4" />
                <text x="289" y="8" fontSize="7.5" fill="#57534e">дорога</text>
              </g>
            </svg>
          </div>
        </div>

        {/* Placement tips — updated for new orientation */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { icon: 'Navigation', color: 'text-red-600', bg: 'bg-red-50 border-red-200', title: 'Вдоль красной линии', desc: 'Длинная ось дома (12 м) стоит вдоль красной границы — дороги. Фасад с входом смотрит на дорогу. Отступ 3 м.' },
            { icon: 'BedDouble', color: 'text-rose-600', bg: 'bg-rose-50 border-rose-200', title: 'Спальни — к дороге', desc: 'Спальни в ближней к дороге части — вдоль красной линии. Окна выходят на тихую сторону участка (во двор).' },
            { icon: 'Flame', color: 'text-amber-600', bg: 'bg-amber-50 border-amber-200', title: 'Баня — в глубину', desc: 'Банный блок в дальней от дороги части. Выход из бани прямо в сад. Запах и пар не идут к соседям у дороги.' },
            { icon: 'Car', color: 'text-slate-600', bg: 'bg-slate-50 border-slate-200', title: 'Парковка у въезда', desc: 'Парковка перед главным входом — у дороги. Гости паркуются без заезда вглубь участка.' },
          ].map((t, i) => (
            <div key={t.title} className={`rounded-2xl border-2 p-5 hover-lift animate-fade-up ${t.bg}`} style={{ animationDelay: `${0.08 * i}s` }}>
              <Icon name={t.icon} size={22} className={`${t.color} mb-3`} />
              <div className="font-display font-bold text-sm mb-1">{t.title}</div>
              <p className="text-xs text-muted-foreground leading-relaxed">{t.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 4 facades */}
      <section id="facades" className="container pb-24">
        <div className="max-w-2xl mb-8">
          <h2 className="font-display font-extrabold text-3xl md:text-5xl tracking-tight">Все стороны дома</h2>
          <p className="mt-3 text-muted-foreground text-lg">Визуализация всех четырёх фасадов — как дом выглядит с каждой стороны.</p>
        </div>
        <div className="grid sm:grid-cols-2 gap-6">
          {[
            { img: 'https://cdn.poehali.dev/projects/f633a3e4-0401-4818-be66-0d3723ff7a1b/files/197f7754-907f-466c-be00-dbc4870d483a.jpg', title: 'Главный фасад', sub: 'Сторона дороги · главный вход по центру', badge: 'bg-green-100 text-green-800', badgeText: '🚪 Главный вход', dir: 'смотрит на дорогу' },
            { img: 'https://cdn.poehali.dev/projects/f633a3e4-0401-4818-be66-0d3723ff7a1b/files/512a8838-d02c-41e2-aaea-ac695f688f32.jpg', title: 'Задний фасад', sub: 'Сторона двора · вид из сада', badge: 'bg-emerald-100 text-emerald-800', badgeText: '🌿 Вид на сад', dir: 'смотрит в глубь участка' },
            { img: 'https://cdn.poehali.dev/projects/f633a3e4-0401-4818-be66-0d3723ff7a1b/files/a74cc542-682b-424c-b375-6a28bdedf8e9.jpg', title: 'Левый торец', sub: 'Крыло спален · окна в тихую сторону', badge: 'bg-rose-100 text-rose-800', badgeText: '🛏 Спальни', dir: '6 м — торцевая стена' },
            { img: 'https://cdn.poehali.dev/projects/f633a3e4-0401-4818-be66-0d3723ff7a1b/files/41ada158-01b6-443f-93a7-a2f9bdd3df11.jpg', title: 'Правый торец', sub: 'Крыло бани · выход из сауны + бойлерная', badge: 'bg-amber-100 text-amber-800', badgeText: '🔥 Баня + бойлер', dir: '6 м — торцевая стена' },
          ].map((f, i) => (
            <article key={f.title} className="rounded-3xl overflow-hidden bg-white border border-border/60 hover-lift animate-fade-up" style={{ animationDelay: `${0.08 * i}s` }}>
              <div className="relative h-56 overflow-hidden">
                <img src={f.img} alt={f.title} className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" />
                <span className={`absolute top-3 left-3 text-xs font-bold px-3 py-1 rounded-full ${f.badge}`}>{f.badgeText}</span>
              </div>
              <div className="p-5">
                <div className="font-display font-extrabold text-lg mb-1">{f.title}</div>
                <div className="text-sm text-muted-foreground mb-1">{f.sub}</div>
                <div className="text-xs font-semibold text-primary/70">↗ {f.dir}</div>
              </div>
            </article>
          ))}
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