import { Link } from 'react-router-dom';
import ParticleField from '../components/ParticleField';
import MandalaBackground from '../components/MandalaBackground';

const games = [
  {
    id: 'prakriti',
    title: 'Пракрити',
    subtitle: '3-осевой роботизированный манипулятор',
    description:
      'Спроектируй 3-осевой манипулятор для системы сортировки отходов.',
    goals: 'Бюджет ≤ $420 • Надёжность ≥ 75% • Цикл ≤ 8с • Тяга ≥ 0.42кг',
    tags: ['Инженерия', 'Головоломка', 'Киберпанк'],
    status: 'available' as const,
    image: '/c_norm.png',
    accentColor: '#f97316',
  },
  {
    id: 'coming-soon-1',
    title: 'Скоро...',
    subtitle: 'Новая игра',
    description: 'Следующий проект уже в разработке. Следи за обновлениями!',
    tags: ['TBD'],
    status: 'locked' as const,
    image: '',
    accentColor: '#475569',
  },
];

export default function GamesPage() {
  return (
    <div className="min-h-screen relative overflow-hidden" style={{ background: '#080a12' }}>
      <ParticleField />
      <MandalaBackground />
      <div className="scanline-overlay" />

      <div className="relative z-10 flex flex-col items-center min-h-screen px-4 py-16">
        {/* Заголовок */}
        <div className="text-center space-y-4 animate-fadeInUp">
          <div
            className="text-xs tracking-[0.4em] uppercase"
            style={{ color: 'rgba(6,182,212,0.7)' }}
          >
            Библиотека проектов
          </div>
          <h1 className="text-5xl md:text-6xl font-black shimmer-text">
            Игры
          </h1>
          <p className="text-sm max-w-xl mx-auto" style={{ color: 'rgba(148,163,184,0.7)' }}>
            Инженерные головоломки с атмосферой индийского киберпанка
          </p>
        </div>

        {/* Карточки игр */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl w-full">
          {games.map((game, i) => (
            <div
              key={game.id}
              className={`glass-panel rounded-xl overflow-hidden relative transition-all duration-400 ${
                game.status === 'available'
                  ? 'hover:translate-y-[-6px] hover:shadow-2xl cursor-pointer'
                  : 'opacity-50 cursor-not-allowed'
              }`}
              style={{
                animationDelay: `${i * 0.2}s`,
                borderColor:
                  game.status === 'available'
                    ? `${game.accentColor}55`
                    : 'rgba(71,85,105,0.3)',
              }}
            >
              <div className="corner-tl" />
              <div className="corner-tr" />
              <div className="corner-bl" />
              <div className="corner-br" />

              {/* Изображение / заглушка */}
              <div
                className="h-40 flex items-center justify-center relative overflow-hidden"
                style={{
                  background: `linear-gradient(135deg, ${game.accentColor}18, ${game.accentColor}08)`,
                }}
              >
                {game.image ? (
                  <img
                    src={game.image}
                    alt={game.title}
                    className="w-28 h-28 object-contain animate-float"
                  />
                ) : (
                  <span className="text-5xl opacity-30">🔒</span>
                )}
              </div>

              {/* Контент */}
              <div className="p-6 space-y-3">
                <div>
                  <h3 className="text-xl font-bold" style={{ color: game.accentColor }}>
                    {game.title}
                  </h3>
                  <p className="text-xs mt-1" style={{ color: 'rgba(148,163,184,0.6)' }}>
                    {game.subtitle}
                  </p>
                </div>

                <p className="text-sm leading-relaxed mb-3" style={{ color: 'rgba(148,163,184,0.7)' }}>
                  {game.description}
                </p>

                {/* Цель */}
                {game.goals && (
                  <div
                    className="rounded-lg p-3 mb-3"
                    style={{
                      background: 'rgba(249,115,22,0.06)',
                      border: '1px solid rgba(249,115,22,0.2)',
                    }}
                  >
                    <div className="text-[10px] tracking-widest uppercase mb-1 font-bold" style={{ color: '#f97316' }}>
                      Цель
                    </div>
                    <div className="text-xs leading-relaxed" style={{ color: 'rgba(226,232,240,0.8)' }}>
                      {game.goals}
                    </div>
                  </div>
                )}

                {/* Теги */}
                <div className="flex flex-wrap gap-2">
                  {game.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] px-2 py-0.5 rounded-full uppercase tracking-wider"
                      style={{
                        background: `${game.accentColor}20`,
                        color: game.accentColor,
                        border: `1px solid ${game.accentColor}40`,
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Кнопка */}
                {game.status === 'available' ? (
                  <Link
                    to={`/game/${game.id}`}
                    className="btn-primary block text-center px-6 py-2.5 rounded-lg text-xs font-semibold mt-2"
                  >
                    Начать
                  </Link>
                ) : (
                  <button
                    disabled
                    className="w-full px-6 py-2.5 rounded-lg text-xs font-semibold uppercase tracking-wider opacity-40 cursor-not-allowed"
                    style={{
                      background: 'rgba(71,85,105,0.2)',
                      border: '1px solid rgba(71,85,105,0.3)',
                      color: 'rgba(148,163,184,0.5)',
                    }}
                  >
                    В разработке
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Назад на главную */}
        <Link
          to="/"
          className="btn-secondary mt-12 px-6 py-2.5 rounded-lg text-xs font-semibold"
        >
          ← На главную
        </Link>
      </div>
    </div>
  );
}
