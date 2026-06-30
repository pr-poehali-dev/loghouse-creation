import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

const EXTERIOR = 'https://cdn.poehali.dev/projects/f633a3e4-0401-4818-be66-0d3723ff7a1b/files/9dfc1472-c0dc-4568-95e7-9c5c0c630f71.jpg';
const INTERIOR = 'https://cdn.poehali.dev/projects/f633a3e4-0401-4818-be66-0d3723ff7a1b/files/917910b5-ee75-4c93-ba0c-013f7b70e5d8.jpg';
const MASTER_BED = 'https://cdn.poehali.dev/projects/f633a3e4-0401-4818-be66-0d3723ff7a1b/files/f40ce406-6676-405d-a32c-6f3ed6abdd15.jpg';
const SAUNA = 'https://cdn.poehali.dev/projects/f633a3e4-0401-4818-be66-0d3723ff7a1b/files/7efc4719-501c-4a64-bb8b-60d29ab2e4cf.jpg';

const PARAMS = [
  { icon: 'Ruler', value: '6 × 12 м', label: 'Габариты дома' },
  { icon: 'Square', value: '72 м²', label: 'Общая площадь' },
  { icon: 'Layers', value: '3 секции', label: 'Конструктивные зоны' },
  { icon: 'TreePine', value: 'Ø 48 см', label: 'Диаметр бревна каркаса' },
];

const LEFT_ROOMS = [
  {
    icon: 'BedDouble',
    title: 'Мастер-спальня',
    area: '~12 м²',
    color: 'bg-rose-50 border-rose-200',
    iconColor: 'text-rose-600',
    badge: 'bg-rose-100 text-rose-700',
    desc: 'Просторная родительская спальня с гардеробной зоной. Тёплые стены из бруса лафет, большое окно с видом на природу.',
    image: MASTER_BED,
  },
  {
    icon: 'Baby',
    title: 'Детская спальня',
    area: '~12 м²',
    color: 'bg-sky-50 border-sky-200',
    iconColor: 'text-sky-600',
    badge: 'bg-sky-100 text-sky-700',
    desc: 'Уютная детская комната с деревянными стенами из бруса лафет. Светлая, тёплая и безопасная.',
    image: null,
  },
];

const RIGHT_ROOMS = [
  {
    icon: 'Flame',
    title: 'Баня / Сауна',
    area: '~12 м²',
    color: 'bg-amber-50 border-amber-200',
    iconColor: 'text-amber-600',
    badge: 'bg-amber-100 text-amber-700',
    desc: 'Финская сауна из бруса лафет с полками и каменкой. Выход во двор через техническую зону.',
    image: SAUNA,
  },
  {
    icon: 'ShowerHead',
    title: 'Туалет с душем',
    area: '~6 м²',
    color: 'bg-teal-50 border-teal-200',
    iconColor: 'text-teal-600',
    badge: 'bg-teal-100 text-teal-700',
    desc: 'Компактный санузел с душевой кабиной, унитазом и раковиной. Смежен с баней и бойлерной.',
    image: null,
  },
  {
    icon: 'Zap',
    title: 'Бойлерная',
    area: '~6 м²',
    color: 'bg-stone-50 border-stone-200',
    iconColor: 'text-stone-600',
    badge: 'bg-stone-100 text-stone-700',
    desc: 'Техническая комната с котлом, бойлером и системой отопления. Доступ с улицы или из коридора.',
    image: null,
  },
];

const MATERIALS = [
  {
    icon: 'TreePine',
    name: 'Бревно Ø 48 см',
    where: 'Несущий каркас',
    benefits: ['Высокая прочность', 'Долговечность', 'Природная эстетика'],
  },
  {
    icon: 'Brick',
    name: 'Блоки сибит',
    where: 'Кухня-гостиная',
    benefits: ['Тепло держит', 'Ровные стены', 'Пожаробезопасность'],
  },
  {
    icon: 'Trees',
    name: 'Брус лафет',
    where: 'Боковые крылья',
    benefits: ['Экологичность', 'Тёплые стены', 'Красивая текстура'],
  },
];

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
            <a href="#wings" className="hover:text-foreground transition-colors">Крылья</a>
            <a href="#materials" className="hover:text-foreground transition-colors">Материалы</a>
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
              Каркас из бревна Ø 48 см, центральная кухня-гостиная из сибита, левое крыло — спальни, правое — баня, санузел и бойлерная.
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
            <img
              src={EXTERIOR}
              alt="Визуализация дома 6×12"
              className="rounded-[2rem] shadow-2xl shadow-primary/20 w-full object-cover aspect-[4/3]"
            />
            <div className="absolute -bottom-5 -left-5 bg-white rounded-2xl shadow-xl px-5 py-3 border border-border/60">
              <div className="font-display font-extrabold text-2xl text-gradient">6 × 12 м</div>
              <div className="text-xs text-muted-foreground font-medium">Габариты дома</div>
            </div>
          </div>
        </div>
      </section>

      {/* Params */}
      <section className="container pb-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {PARAMS.map((p, i) => (
            <div
              key={p.label}
              className="rounded-3xl bg-white/70 border border-border/60 p-6 hover-lift animate-fade-up"
              style={{ animationDelay: `${0.1 * i}s` }}
            >
              <div className="w-11 h-11 rounded-xl bg-secondary flex items-center justify-center mb-4">
                <Icon name={p.icon} size={22} className="text-primary" />
              </div>
              <div className="font-display font-extrabold text-2xl md:text-3xl">{p.value}</div>
              <div className="mt-1 text-sm text-muted-foreground font-medium">{p.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Floor Plan */}
      <section id="plan" className="container pb-20">
        <div className="max-w-2xl mb-8">
          <h2 className="font-display font-extrabold text-3xl md:text-5xl tracking-tight">Планировка</h2>
          <p className="mt-3 text-muted-foreground text-lg">Схема распределения зон по дому 6×12 м.</p>
        </div>

        <div className="rounded-3xl bg-white border border-border/60 p-6 md:p-10">
          <div className="flex items-center gap-2 mb-6 text-sm font-semibold text-muted-foreground">
            <Icon name="LayoutGrid" size={18} className="text-primary" />
            Схема планировки · вид сверху · 6 × 12 м
          </div>

          {/* Plan grid */}
          <div className="grid grid-cols-3 gap-3">

            {/* LEFT WING */}
            <div className="flex flex-col gap-3">
              <div className="rounded-2xl bg-gradient-to-br from-orange-600 to-amber-800 text-white px-3 py-2 text-center">
                <div className="text-xs font-bold uppercase tracking-wide opacity-80 mb-1">Левое крыло · брус лафет</div>
              </div>
              <div className="rounded-2xl bg-rose-50 border-2 border-rose-200 flex flex-col items-center justify-center text-center p-4 h-32">
                <Icon name="BedDouble" size={22} className="text-rose-500 mb-2" />
                <div className="font-display font-bold text-sm text-rose-800">Мастер-спальня</div>
                <div className="text-xs text-rose-500 mt-1">~12 м²</div>
              </div>
              <div className="rounded-2xl bg-sky-50 border-2 border-sky-200 flex flex-col items-center justify-center text-center p-4 h-32">
                <Icon name="Baby" size={22} className="text-sky-500 mb-2" />
                <div className="font-display font-bold text-sm text-sky-800">Детская</div>
                <div className="text-xs text-sky-500 mt-1">~12 м²</div>
              </div>
            </div>

            {/* CENTER */}
            <div className="flex flex-col gap-3">
              <div className="rounded-2xl bg-gradient-to-br from-stone-400 to-stone-600 text-white px-3 py-2 text-center">
                <div className="text-xs font-bold uppercase tracking-wide opacity-90 mb-1">Центр · сибит</div>
              </div>
              <div className="rounded-2xl bg-stone-50 border-2 border-stone-200 flex flex-col items-center justify-center text-center p-4 flex-1">
                <Icon name="Home" size={28} className="text-stone-500 mb-2" />
                <div className="font-display font-bold text-base text-stone-800">Кухня-гостиная</div>
                <div className="text-xs text-stone-500 mt-1">4 × 6 м · 24 м²</div>
                <div className="mt-3 text-xs text-stone-400">Общее пространство</div>
              </div>
            </div>

            {/* RIGHT WING */}
            <div className="flex flex-col gap-3">
              <div className="rounded-2xl bg-gradient-to-br from-orange-600 to-amber-800 text-white px-3 py-2 text-center">
                <div className="text-xs font-bold uppercase tracking-wide opacity-80 mb-1">Правое крыло · брус лафет</div>
              </div>
              <div className="rounded-2xl bg-amber-50 border-2 border-amber-200 flex flex-col items-center justify-center text-center p-3 h-24">
                <Icon name="Flame" size={20} className="text-amber-500 mb-1" />
                <div className="font-display font-bold text-sm text-amber-800">Баня / Сауна</div>
                <div className="text-xs text-amber-500">~12 м²</div>
              </div>
              <div className="rounded-2xl bg-teal-50 border-2 border-teal-200 flex flex-col items-center justify-center text-center p-3 h-20">
                <Icon name="ShowerHead" size={18} className="text-teal-500 mb-1" />
                <div className="font-display font-bold text-sm text-teal-800">Душ / WC</div>
                <div className="text-xs text-teal-500">~6 м²</div>
              </div>
              <div className="rounded-2xl bg-stone-50 border-2 border-stone-200 flex flex-col items-center justify-center text-center p-3 h-20">
                <Icon name="Zap" size={18} className="text-stone-500 mb-1" />
                <div className="font-display font-bold text-sm text-stone-800">Бойлерная</div>
                <div className="text-xs text-stone-500">~6 м²</div>
              </div>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-center gap-2 text-xs text-muted-foreground">
            <Icon name="Columns3" size={14} className="text-primary" />
            По всему периметру — несущий каркас из бревна Ø 48 см
          </div>
        </div>
      </section>

      {/* Wings detail */}
      <section id="wings" className="container pb-24">
        <div className="max-w-2xl mb-8">
          <h2 className="font-display font-extrabold text-3xl md:text-5xl tracking-tight">Крылья дома</h2>
          <p className="mt-3 text-muted-foreground text-lg">Подробнее о каждом помещении в боковых секциях.</p>
        </div>

        {/* Toggle */}
        <div className="flex gap-2 mb-8 p-1 bg-secondary rounded-full w-fit">
          <button
            onClick={() => setActiveWing('left')}
            className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all ${activeWing === 'left' ? 'bg-white text-primary shadow-md' : 'text-muted-foreground hover:text-foreground'}`}
          >
            🛏 Левое крыло — спальни
          </button>
          <button
            onClick={() => setActiveWing('right')}
            className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all ${activeWing === 'right' ? 'bg-white text-primary shadow-md' : 'text-muted-foreground hover:text-foreground'}`}
          >
            🔥 Правое крыло — баня
          </button>
        </div>

        {activeWing === 'left' && (
          <div className="grid sm:grid-cols-2 gap-6 animate-fade-up">
            {LEFT_ROOMS.map((r) => (
              <article key={r.title} className={`rounded-3xl border-2 ${r.color} overflow-hidden hover-lift`}>
                {r.image && (
                  <img src={r.image} alt={r.title} className="w-full h-48 object-cover" />
                )}
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
                {r.image && (
                  <img src={r.image} alt={r.title} className="w-full h-48 object-cover" />
                )}
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

      {/* Materials + Interior */}
      <section id="materials" className="container pb-24">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <div className="relative order-2 lg:order-1">
            <img
              src={INTERIOR}
              alt="Интерьер кухни-гостиной"
              className="rounded-[2rem] shadow-2xl shadow-primary/20 w-full object-cover aspect-[4/3]"
            />
          </div>
          <div className="order-1 lg:order-2">
            <h2 className="font-display font-extrabold text-3xl md:text-5xl tracking-tight mb-3">Материалы проекта</h2>
            <p className="text-muted-foreground text-lg mb-8">Каждый материал работает на своём месте — для прочности, тепла и красоты.</p>
            <div className="space-y-4">
              {MATERIALS.map((m, i) => (
                <div
                  key={m.name}
                  className="flex gap-4 rounded-2xl bg-white border border-border/60 p-5 hover-lift animate-fade-up"
                  style={{ animationDelay: `${0.08 * i}s` }}
                >
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
                        <span key={b} className="text-xs font-semibold px-2.5 py-1 rounded-full bg-secondary text-secondary-foreground">
                          {b}
                        </span>
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
          <h2 className="relative font-display font-black text-3xl md:text-5xl text-white tracking-tight">
            Построим ваш дом 6×12
          </h2>
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
