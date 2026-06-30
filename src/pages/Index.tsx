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

      {/* CENTER: кухонный гарнитур (вдоль верхней стены) */}
      <rect x={LX + 8} y={wall + 4} width={RX - LX - 16} height={42} rx="5" fill="#d6d3d1" opacity="0.75" stroke="#a8a29e" strokeWidth="1.5" />
      <rect x={LX + 50} y={wall + 6} width={30} height={30} rx="4" fill="#a8a29e" opacity="0.6" />
      <circle cx={LX + 65} cy={wall + 21} r="8" fill="none" stroke="#78716c" strokeWidth="1.8" />
      <text x={(LX + RX) / 2} y={wall + 32} textAnchor="middle" fontSize="9" fill="#44403c" fontWeight="700">КУХОННЫЙ ГАРНИТУР + МОЙКА</text>

      {/* CENTER: обеденный стол */}
      <rect x={LX + 50} y={180} width={130} height={75} rx="8" fill="#e7e5e4" opacity="0.75" stroke="#a8a29e" strokeWidth="1.5" />
      <text x={LX + 115} y={222} textAnchor="middle" fontSize="10" fill="#44403c" fontWeight="700">СТОЛ</text>
      {/* стулья */}
      {[LX + 50, LX + 180].map((x, i) => (
        [195, 235].map((y, j) => <rect key={`${i}-${j}`} x={x - 16} y={y} width={32} height={15} rx="4" fill="#c4b5a5" opacity="0.7" />)
      ))}

      {/* CENTER: диван */}
      <rect x={LX + 30} y={380} width={RX - LX - 60} height={55} rx="8" fill="#d6d3d1" opacity="0.7" stroke="#a8a29e" strokeWidth="1.5" />
      <text x={(LX + RX) / 2} y={412} textAnchor="middle" fontSize="10" fill="#44403c" fontWeight="700">ДИВАН</text>

      {/* CENTER label */}
      <text x={(LX + RX) / 2} y={H - 14} textAnchor="middle" fontSize="12" fill="#57534e" fontWeight="800">КУХНЯ-ГОСТИНАЯ · ~24 м²</text>

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

      {/* Site placement */}
      <section id="site" className="container pb-24">
        <div className="max-w-2xl mb-8">
          <h2 className="font-display font-extrabold text-3xl md:text-5xl tracking-tight">Посадка на участке</h2>
          <p className="mt-3 text-muted-foreground text-lg">
            Кадастровый номер <span className="font-bold text-foreground">22:65:012005:1113</span> · схема размещения дома 6×12 м.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 items-start">

          {/* Cadastral photo */}
          <div className="rounded-3xl overflow-hidden border border-border/60 shadow-xl shadow-primary/10 relative">
            <img
              src="https://cdn.poehali.dev/projects/f633a3e4-0401-4818-be66-0d3723ff7a1b/bucket/d7ebf358-f5e7-463f-ad35-ea10785fd6ff.jpg"
              alt="Кадастровый снимок участка 22:65:012005:1113"
              className="w-full object-cover"
            />
            <div className="absolute top-4 left-4 bg-black/60 backdrop-blur text-white text-xs font-bold px-3 py-1.5 rounded-full">
              📍 22:65:012005:1113
            </div>
          </div>

          {/* SVG placement scheme */}
          <div className="rounded-3xl bg-white border border-border/60 p-6 shadow-xl shadow-primary/10">
            <div className="flex items-center gap-2 mb-4 text-sm font-semibold text-muted-foreground">
              <Icon name="MapPin" size={16} className="text-primary" />
              Схема посадки дома на участок
            </div>
            <svg viewBox="0 0 420 380" className="w-full h-auto">
              {/* Sky/ground bg */}
              <rect width="420" height="380" fill="#f0fdf4" rx="12" />

              {/* Road (diagonal, top-left) */}
              <polygon points="0,80 60,0 90,0 30,80" fill="#d4d4d4" opacity="0.8" />
              <polygon points="0,80 30,80 0,120" fill="#d4d4d4" opacity="0.6" />
              <text x="18" y="55" fontSize="9" fill="#78716c" fontWeight="600" transform="rotate(-52, 18, 55)">ДОРОГА</text>

              {/* Plot boundary (trapezoid matching photo shape) */}
              <polygon
                points="80,40 310,55 340,300 60,310"
                fill="#fefce8"
                stroke="#ca8a04"
                strokeWidth="2.5"
                strokeDasharray="8 4"
              />

              {/* Setback lines (3m offset) */}
              <polygon
                points="100,68 290,80 318,278 82,286"
                fill="none"
                stroke="#86efac"
                strokeWidth="1.5"
                strokeDasharray="5 4"
                opacity="0.8"
              />

              {/* HOUSE rectangle (6×12м, rotated slightly to follow plot) */}
              <g transform="translate(110, 95) rotate(3)">
                {/* Shadow */}
                <rect x="4" y="4" width="190" height="95" rx="6" fill="#000" opacity="0.08" />
                {/* House body */}
                <rect width="190" height="95" rx="6" fill="white" stroke="#292524" strokeWidth="2.5" />

                {/* Left wing - bedrooms */}
                <rect width="63" height="95" rx="4" fill="#fecdd3" opacity="0.6" />
                <text x="31" y="40" textAnchor="middle" fontSize="8" fill="#be123c" fontWeight="700">СПАЛЬНИ</text>
                <text x="31" y="52" textAnchor="middle" fontSize="7" fill="#be123c" opacity="0.8">лафет</text>

                {/* Center - living */}
                <rect x="63" width="64" height="95" fill="#e7e5e4" opacity="0.6" />
                <text x="95" y="40" textAnchor="middle" fontSize="8" fill="#44403c" fontWeight="700">КУХНЯ</text>
                <text x="95" y="52" textAnchor="middle" fontSize="8" fill="#44403c" fontWeight="700">ГОСТИНАЯ</text>
                <text x="95" y="64" textAnchor="middle" fontSize="7" fill="#78716c" opacity="0.8">сибит</text>

                {/* Right wing - sauna/tech */}
                <rect x="127" width="63" height="95" rx="4" fill="#fde68a" opacity="0.6" />
                <text x="159" y="38" textAnchor="middle" fontSize="8" fill="#92400e" fontWeight="700">БАНЯ</text>
                <text x="159" y="50" textAnchor="middle" fontSize="7.5" fill="#92400e" fontWeight="700">САНУЗЕЛ</text>
                <text x="159" y="62" textAnchor="middle" fontSize="7" fill="#92400e" fontWeight="700">БОЙЛЕР</text>
                <text x="159" y="74" textAnchor="middle" fontSize="7" fill="#b45309" opacity="0.8">лафет</text>

                {/* Internal dividers */}
                <line x1="63" y1="0" x2="63" y2="95" stroke="#292524" strokeWidth="1.5" opacity="0.5" />
                <line x1="127" y1="0" x2="127" y2="95" stroke="#292524" strokeWidth="1.5" opacity="0.5" />

                {/* Main entrance arrow */}
                <polygon points="95,95 88,115 102,115" fill="#16a34a" opacity="0.9" />
                <text x="95" y="130" textAnchor="middle" fontSize="8" fill="#15803d" fontWeight="700">ВХОД</text>

                {/* Sauna exterior exit */}
                <polygon points="190,47 210,40 210,54" fill="#d97706" opacity="0.9" />
                <text x="222" y="52" fontSize="7" fill="#d97706" fontWeight="700">выход</text>
                <text x="222" y="61" fontSize="7" fill="#d97706" fontWeight="700">бани</text>

                {/* Dimension labels */}
                <text x="95" y="-8" textAnchor="middle" fontSize="9" fill="#57534e" fontWeight="700">12 м</text>
                <text x="-14" y="52" textAnchor="middle" fontSize="9" fill="#57534e" fontWeight="700" transform="rotate(-90,-14,52)">6 м</text>
              </g>

              {/* Setback distance labels */}
              <text x="88" y="86" fontSize="8" fill="#16a34a" fontWeight="600">↑ 3 м</text>
              <text x="84" y="290" fontSize="8" fill="#16a34a" fontWeight="600">↓ 3 м</text>
              <text x="328" y="190" fontSize="8" fill="#16a34a" fontWeight="600">→ 3 м</text>
              <text x="62" y="200" fontSize="8" fill="#16a34a" fontWeight="600" transform="rotate(-90, 62, 200)">3 м →</text>

              {/* Trees suggestion */}
              {[[350, 90],[360, 130],[345, 165],[355, 200]].map(([x,y],i) => (
                <g key={i} transform={`translate(${x},${y})`}>
                  <circle cy="-6" r="9" fill="#86efac" opacity="0.7" />
                  <rect x="-2" y="3" width="4" height="7" fill="#92400e" opacity="0.5" />
                </g>
              ))}
              <text x="352" y="238" fontSize="8" fill="#16a34a" textAnchor="middle" fontWeight="600">зелень</text>

              {/* Parking suggestion */}
              <rect x="82" y="298" width="55" height="30" rx="4" fill="#cbd5e1" opacity="0.7" stroke="#94a3b8" strokeWidth="1" />
              <text x="109" y="317" textAnchor="middle" fontSize="8" fill="#475569" fontWeight="700">ПАРКОВКА</text>

              {/* North arrow */}
              <g transform="translate(390, 30)">
                <circle cx="0" cy="0" r="18" fill="white" stroke="#e2e8f0" strokeWidth="1.5" />
                <text x="0" y="-6" textAnchor="middle" fontSize="8" fill="#ef4444" fontWeight="800">С</text>
                <text x="0" y="13" textAnchor="middle" fontSize="8" fill="#78716c">Ю</text>
                <polygon points="0,-4 2,4 0,2 -2,4" fill="#ef4444" />
              </g>

              {/* Legend */}
              <g transform="translate(10, 340)">
                <rect width="12" height="8" rx="2" fill="#fefce8" stroke="#ca8a04" strokeWidth="1.5" strokeDasharray="3 2" />
                <text x="16" y="8" fontSize="8" fill="#57534e">граница участка</text>
                <rect x="110" width="12" height="8" rx="2" fill="#f0fdf4" stroke="#86efac" strokeWidth="1.5" strokeDasharray="3 2" />
                <text x="126" y="8" fontSize="8" fill="#57534e">отступ 3 м</text>
                <rect x="215" width="12" height="8" rx="2" fill="white" stroke="#292524" strokeWidth="1.5" />
                <text x="231" y="8" fontSize="8" fill="#57534e">дом 6×12 м</text>
              </g>
            </svg>
          </div>
        </div>

        {/* Placement tips */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
          {[
            { icon: 'Navigation', color: 'text-blue-600', bg: 'bg-blue-50 border-blue-200', title: 'Ориентация', desc: 'Длинная ось дома (12 м) — вдоль левой границы, параллельно дороге. Фасад смотрит на дорогу.' },
            { icon: 'Sun', color: 'text-amber-600', bg: 'bg-amber-50 border-amber-200', title: 'Инсоляция', desc: 'Спальни — на южную сторону участка, кухня и баня — на северную. Максимум света в жилых комнатах.' },
            { icon: 'Shield', color: 'text-green-600', bg: 'bg-green-50 border-green-200', title: 'Отступы', desc: 'От каждой границы — минимум 3 метра по нормам СНиП. Итого пятно застройки 6×12 м вписывается с запасом.' },
            { icon: 'Car', color: 'text-slate-600', bg: 'bg-slate-50 border-slate-200', title: 'Въезд', desc: 'Парковка у нижнего края участка — въезд с дороги удобен, не перегораживает пространство перед домом.' },
          ].map((t, i) => (
            <div key={t.title} className={`rounded-2xl border-2 p-5 hover-lift animate-fade-up ${t.bg}`} style={{ animationDelay: `${0.08 * i}s` }}>
              <Icon name={t.icon} size={22} className={`${t.color} mb-3`} />
              <div className="font-display font-bold text-sm mb-1">{t.title}</div>
              <p className="text-xs text-muted-foreground leading-relaxed">{t.desc}</p>
            </div>
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