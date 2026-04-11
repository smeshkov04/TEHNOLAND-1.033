import { Link } from 'react-router-dom';
import ParticleField from '../components/ParticleField';
import MandalaBackground from '../components/MandalaBackground';

export default function HomePage() {
  return (
    <div className="min-h-screen relative overflow-hidden" style={{ background: '#080a12' }}>
      <ParticleField />
      <MandalaBackground />
      <div className="scanline-overlay" />

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4">
        {/* Заголовок */}
        <div className="text-center space-y-6 animate-fadeInUp">
          <div
            className="text-xs tracking-[0.4em] uppercase"
            style={{ color: 'rgba(6,182,212,0.7)' }}
          >
            Индия, 2026 • Пракрити
          </div>

          <h1 className="text-6xl md:text-8xl font-black shimmer-text">
            Пракрити
          </h1>

          <p className="text-lg md:text-xl max-w-2xl mx-auto leading-relaxed" style={{ color: 'rgba(148,163,184,0.8)' }}>
            Система автоматической сортировки отходов нового поколения.
            Спроектируй 3-осевой роботизированный манипулятор в формате инженерной головоломки.
          </p>
        </div>

        {/* Карточки с фичами */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl w-full animate-slideInUp">
          {[
            {
              title: 'Инженерия',
              desc: 'Рассчитай параметры, выбери стихию, собери систему с нуля',
              icon: '⚙️',
            },
            {
              title: 'Головоломка',
              desc: 'Оптимизируй бюджет, надёжность и скорость цикла',
              icon: '🧩',
            },
            {
              title: 'Атмосфера',
              desc: 'Киберпанк-Индия с маскотами и сюжетом',
              icon: '🌆',
            },
          ].map((item, i) => (
            <div
              key={item.title}
              className="glass-panel rounded-xl p-6 relative"
              style={{ animationDelay: `${i * 0.15}s` }}
            >
              <div className="corner-tl" />
              <div className="corner-tr" />
              <div className="corner-bl" />
              <div className="corner-br" />

              <div className="text-3xl mb-3">{item.icon}</div>
              <h3 className="text-lg font-bold mb-2" style={{ color: '#f97316' }}>
                {item.title}
              </h3>
              <p className="text-sm" style={{ color: 'rgba(148,163,184,0.7)' }}>
                {item.desc}
              </p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-14 flex flex-col sm:flex-row gap-4 animate-fadeIn" style={{ animationDelay: '0.5s' }}>
          <Link to="/games" className="btn-primary px-8 py-3 rounded-lg text-sm font-semibold">
            Играть
          </Link>
          <a
            href="#about"
            className="btn-secondary px-8 py-3 rounded-lg text-sm font-semibold"
          >
            Подробнее
          </a>
        </div>

        {/* About секция */}
        <div
          id="about"
          className="mt-24 max-w-3xl mx-auto text-center space-y-4 animate-fadeIn"
          style={{ animationDelay: '0.8s' }}
        >
          <h2 className="text-2xl font-bold" style={{ color: '#f97316' }}>
            О проекте
          </h2>
          <p className="text-sm leading-relaxed" style={{ color: 'rgba(148,163,184,0.7)' }}>
            «Пракрити» — образовательная игра, вдохновлённая реальными инженерными задачами.
            Ты пройдёшь путь от выбора стихии-проблемы до расчёта параметров манипулятора,
            столкнувшись с компромиссами бюджета, надёжности и производительности.
          </p>
          <p className="text-xs" style={{ color: 'rgba(6,182,212,0.6)' }}>
            Создано с любовью к инженерии и индийской философии Панчамахабхуты.
          </p>
        </div>

        {/* Футер */}
        <footer className="mt-16 mb-8 text-xs" style={{ color: 'rgba(148,163,184,0.3)' }}>
          © 2026 Пракрити • Панчамахабхута
        </footer>
      </div>
    </div>
  );
}
