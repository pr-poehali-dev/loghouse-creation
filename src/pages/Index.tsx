import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

const COURSES = [
  {
    id: 1,
    title: 'Frontend-разработка с нуля',
    category: 'Разработка',
    level: 'Начальный',
    duration: '4 месяца',
    lessons: 86,
    price: '39 900 ₽',
    rating: 4.9,
    image: 'https://cdn.poehali.dev/projects/f633a3e4-0401-4818-be66-0d3723ff7a1b/files/254c89ac-fb85-4630-8676-448e229decd2.jpg',
  },
  {
    id: 2,
    title: 'UX/UI дизайн интерфейсов',
    category: 'Дизайн',
    level: 'Начальный',
    duration: '3 месяца',
    lessons: 64,
    price: '34 900 ₽',
    rating: 4.8,
    image: 'https://cdn.poehali.dev/projects/f633a3e4-0401-4818-be66-0d3723ff7a1b/files/3584840d-6e6d-4fb9-b4f4-9b81aaebe11a.jpg',
  },
  {
    id: 3,
    title: 'Интернет-маркетинг и SMM',
    category: 'Маркетинг',
    level: 'Средний',
    duration: '2 месяца',
    lessons: 48,
    price: '29 900 ₽',
    rating: 4.7,
    image: 'https://cdn.poehali.dev/projects/f633a3e4-0401-4818-be66-0d3723ff7a1b/files/683be6a1-39a5-4f98-86db-1f7acf6647c9.jpg',
  },
  {
    id: 4,
    title: 'Python для Data Science',
    category: 'Разработка',
    level: 'Продвинутый',
    duration: '6 месяцев',
    lessons: 112,
    price: '54 900 ₽',
    rating: 5.0,
    image: 'https://cdn.poehali.dev/projects/f633a3e4-0401-4818-be66-0d3723ff7a1b/files/254c89ac-fb85-4630-8676-448e229decd2.jpg',
  },
  {
    id: 5,
    title: 'Графический дизайн и бренд',
    category: 'Дизайн',
    level: 'Средний',
    duration: '4 месяца',
    lessons: 72,
    price: '41 900 ₽',
    rating: 4.9,
    image: 'https://cdn.poehali.dev/projects/f633a3e4-0401-4818-be66-0d3723ff7a1b/files/3584840d-6e6d-4fb9-b4f4-9b81aaebe11a.jpg',
  },
  {
    id: 6,
    title: 'Таргетированная реклама PRO',
    category: 'Маркетинг',
    level: 'Продвинутый',
    duration: '3 месяца',
    lessons: 56,
    price: '38 900 ₽',
    rating: 4.8,
    image: 'https://cdn.poehali.dev/projects/f633a3e4-0401-4818-be66-0d3723ff7a1b/files/683be6a1-39a5-4f98-86db-1f7acf6647c9.jpg',
  },
];

const CATEGORIES = ['Все', 'Разработка', 'Дизайн', 'Маркетинг'];
const LEVELS = ['Все', 'Начальный', 'Средний', 'Продвинутый'];

const STATS = [
  { value: '120+', label: 'Курсов' },
  { value: '48 000', label: 'Студентов' },
  { value: '94%', label: 'Трудоустройство' },
  { value: '4.9', label: 'Средний рейтинг' },
];

const Index = () => {
  const [category, setCategory] = useState('Все');
  const [level, setLevel] = useState('Все');

  const filtered = COURSES.filter(
    (c) =>
      (category === 'Все' || c.category === category) &&
      (level === 'Все' || c.level === level),
  );

  const levelColor = (l: string) =>
    l === 'Начальный'
      ? 'bg-emerald-100 text-emerald-700'
      : l === 'Средний'
      ? 'bg-amber-100 text-amber-700'
      : 'bg-rose-100 text-rose-700';

  return (
    <div className="min-h-screen bg-mesh overflow-x-hidden">
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-background/70 border-b border-border/50">
        <div className="container flex items-center justify-between h-18 py-4">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <Icon name="GraduationCap" size={20} className="text-white" />
            </div>
            <span className="font-display font-extrabold text-xl tracking-tight">Skillize</span>
          </div>
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
            <a href="#courses" className="hover:text-foreground transition-colors">Курсы</a>
            <a href="#stats" className="hover:text-foreground transition-colors">О платформе</a>
            <a href="#cta" className="hover:text-foreground transition-colors">Контакты</a>
          </nav>
          <Button className="rounded-full font-semibold shadow-lg shadow-primary/25">
            Войти
          </Button>
        </div>
      </header>

      {/* Hero */}
      <section className="relative container pt-20 pb-24 md:pt-28 md:pb-32">
        <div className="absolute -top-10 -left-20 w-72 h-72 rounded-full bg-primary/20 blur-3xl animate-blob" />
        <div className="absolute top-20 right-0 w-80 h-80 rounded-full bg-accent/20 blur-3xl animate-blob" style={{ animationDelay: '2s' }} />

        <div className="relative max-w-3xl">
          <Badge className="rounded-full bg-secondary text-secondary-foreground font-semibold mb-6 animate-fade-up" style={{ animationDelay: '0.05s' }}>
            🚀 Новый поток стартует уже в июле
          </Badge>
          <h1 className="font-display font-black text-5xl md:text-7xl leading-[1.05] tracking-tight animate-fade-up" style={{ animationDelay: '0.1s' }}>
            Учись тому, что<br />
            <span className="text-gradient">меняет карьеру</span>
          </h1>
          <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-xl animate-fade-up" style={{ animationDelay: '0.2s' }}>
            Онлайн-курсы по разработке, дизайну и маркетингу с практикой, наставниками и помощью в трудоустройстве.
          </p>
          <div className="mt-9 flex flex-wrap gap-4 animate-fade-up" style={{ animationDelay: '0.3s' }}>
            <Button size="lg" className="rounded-full text-base font-semibold h-14 px-8 shadow-xl shadow-primary/30">
              Выбрать курс
              <Icon name="ArrowRight" size={20} className="ml-1" />
            </Button>
            <Button size="lg" variant="outline" className="rounded-full text-base font-semibold h-14 px-8 border-2">
              <Icon name="Play" size={18} className="mr-1" />
              Как это работает
            </Button>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section id="stats" className="container pb-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {STATS.map((s, i) => (
            <div
              key={s.label}
              className="rounded-3xl bg-white/70 border border-border/60 p-7 text-center hover-lift animate-fade-up"
              style={{ animationDelay: `${0.1 * i}s` }}
            >
              <div className="font-display font-extrabold text-3xl md:text-4xl text-gradient">{s.value}</div>
              <div className="mt-2 text-sm text-muted-foreground font-medium">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Courses + Filters */}
      <section id="courses" className="container pb-28">
        <div className="max-w-2xl mb-10">
          <h2 className="font-display font-extrabold text-3xl md:text-5xl tracking-tight">Каталог курсов</h2>
          <p className="mt-3 text-muted-foreground text-lg">Подбери программу по интересу и уровню подготовки.</p>
        </div>

        {/* Filters */}
        <div className="space-y-4 mb-10">
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-sm font-semibold text-muted-foreground w-24">Категория:</span>
            {CATEGORIES.map((c) => (
              <button
                key={c}
                onClick={() => setCategory(c)}
                className={`px-5 py-2 rounded-full text-sm font-semibold transition-all ${
                  category === c
                    ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/30'
                    : 'bg-white/70 text-foreground border border-border hover:border-primary/50'
                }`}
              >
                {c}
              </button>
            ))}
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-sm font-semibold text-muted-foreground w-24">Уровень:</span>
            {LEVELS.map((l) => (
              <button
                key={l}
                onClick={() => setLevel(l)}
                className={`px-5 py-2 rounded-full text-sm font-semibold transition-all ${
                  level === l
                    ? 'bg-accent text-accent-foreground shadow-lg shadow-accent/30'
                    : 'bg-white/70 text-foreground border border-border hover:border-accent/50'
                }`}
              >
                {l}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-20 text-muted-foreground">
            <Icon name="SearchX" size={48} className="mx-auto mb-4 opacity-40" />
            <p className="text-lg font-medium">Курсы не найдены. Попробуйте другие фильтры.</p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((course, i) => (
              <article
                key={course.id}
                className="group rounded-3xl bg-white border border-border/60 overflow-hidden hover-lift animate-fade-up"
                style={{ animationDelay: `${0.06 * i}s` }}
              >
                <div className="relative h-44 overflow-hidden">
                  <img
                    src={course.image}
                    alt={course.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <span className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-bold bg-white/90 backdrop-blur text-foreground">
                    {course.category}
                  </span>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${levelColor(course.level)}`}>
                      {course.level}
                    </span>
                    <span className="flex items-center gap-1 text-xs font-semibold text-amber-500">
                      <Icon name="Star" size={14} className="fill-amber-400 text-amber-400" />
                      {course.rating}
                    </span>
                  </div>
                  <h3 className="font-display font-bold text-lg leading-snug mb-4">{course.title}</h3>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-5">
                    <span className="flex items-center gap-1.5">
                      <Icon name="Clock" size={15} />
                      {course.duration}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Icon name="BookOpen" size={15} />
                      {course.lessons} уроков
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-display font-extrabold text-xl">{course.price}</span>
                    <Button size="sm" className="rounded-full font-semibold">
                      Записаться
                    </Button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      {/* CTA */}
      <section id="cta" className="container pb-28">
        <div className="relative rounded-[2.5rem] overflow-hidden bg-gradient-to-br from-primary via-primary to-accent p-10 md:p-16 text-center">
          <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-white/10 blur-3xl" />
          <h2 className="relative font-display font-black text-3xl md:text-5xl text-white tracking-tight">
            Готов начать обучение?
          </h2>
          <p className="relative mt-4 text-white/80 text-lg max-w-xl mx-auto">
            Оставь заявку — подберём курс под твою цель и расскажем про рассрочку.
          </p>
          <Button size="lg" className="relative mt-8 rounded-full h-14 px-10 text-base font-bold bg-white text-primary hover:bg-white/90">
            Получить консультацию
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/50 py-10">
        <div className="container flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <Icon name="GraduationCap" size={16} className="text-white" />
            </div>
            <span className="font-display font-bold text-foreground">Skillize</span>
          </div>
          <p>© 2026 Skillize. Образовательная платформа нового поколения.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
