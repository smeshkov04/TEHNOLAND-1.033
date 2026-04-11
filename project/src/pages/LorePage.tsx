import { useState, useEffect } from 'react';
import TypewriterText from '../components/TypewriterText';
import { audioManager } from '../utils/audioManager';

interface Props {
  onStartGame: () => void;
}

type LoreStage = 'context' | 'mission' | 'mission2' | 'task' | 'finale';

const STAGES: { id: LoreStage; label: string; title: string; text: string }[] = [
  {
    id: 'context',
    label: 'Контекст',
    title: 'Проблема',
    text: 'Индия с 1,3 млрд населения производит 62 млн тонн мусора в год. Крупнейшие свалки в пригородах Нью-Дели разрастаются до небес, а надвигающийся сезон муссонов угрожает смыть тонны токсичных отходов прямиком в священные реки и грунтовые воды.',
  },
  {
    id: 'mission',
    label: 'Миссия',
    title: 'Ваша миссия',
    text: 'Вы — одни из немногих, кто имеет доступ к древней материнской плате. Представители из легенды о трёх мастерских возложили на вас задачу, с которой до этого не справился никто. Вам предстоит принять вызов на разработку «Пракрити» — автономной роботизированной системы для интеллектуальной сортировки отходов.',
  },
  {
    id: 'mission2',
    label: 'Детали',
    title: 'Состояние задачи',
    text: 'Базовая самоходная платформа уже ждёт на полигоне. Но самое сложное — «рука»-манипулятор и её алгоритмы — так и не приобрели завершённый вид. Предыдущие испытатели не справились: им не хватило живого опыта работы с техникой. После них остались чертежи «Идеального манипулятора» — инженерного шедевра, который невозможно воплотить в реальности, особенно теперь, когда поставки сорваны, чипы недоступны, а цены на датчики стремительно растут.',
  },
  {
    id: 'task',
    label: 'Задание',
    title: 'Техническое задание',
    text: 'Ваша задача — переосмыслить этот недостижимый идеал. Вам предстоит оптимизировать процесс между дефицитным «железом», жесточайшим бюджетом и сложным программным кодом. Спроектировать, обосновать экономически и запрограммировать 3-осевой манипулятор для системы «Пракрити».',
  },
  {
    id: 'finale',
    label: 'Ставки',
    title: 'Что на кону',
    text: 'У страны остались считанные недели. Если вы справитесь, ваш стартап не просто совершит революцию в индустрии — вы спасёте жизни миллионов людей и станете основоположниками новой, экологически чистой Индии. Одна из пяти стихий Панчамахабхута достигнет гармонии.',
  },
];

export default function LorePage({ onStartGame }: Props) {
  const [stageIndex, setStageIndex] = useState(0);
  const [textDone, setTextDone] = useState(false);
  const [exiting, setExiting] = useState(false);

  const stage = STAGES[stageIndex];
  const isLast = stageIndex === STAGES.length - 1;

  const next = () => {
    if (!textDone) { setTextDone(true); return; }
    if (isLast) {
      setExiting(true);
      setTimeout(onStartGame, 600);
    } else {
      setTextDone(false);
      setStageIndex(p => p + 1);
    }
  };

  return (
    <div
      className="relative min-h-screen flex flex-col overflow-hidden"
      style={{ background: 'transparent', opacity: exiting ? 0 : 1, transition: 'opacity 0.6s' }}
    >
      {/* Фоновые изображения на весь экран с плавными переходами */}
      {[
        { id: 'context', url: '/yamuna_pollution.png' },
        { id: 'mission', url: '/mission_bg.png' },
        { id: 'mission2', url: '/robot_arm.png' },
        { id: 'task', url: '/task_bg.png' },
      ].map((bg) => (
        <div
          key={bg.id}
          className="absolute inset-0"
          style={{
            backgroundImage: `url(${bg.url})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            zIndex: 0,
            opacity: stage.id === bg.id ? 1 : 0,
            transition: 'opacity 1.2s cubic-bezier(0.4, 0, 0.2, 1)',
          }}
        />
      ))}

      {/* Затемнение по краям с плавным переходом */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 15%, rgba(26,48,80,0.7) 100%)',
          zIndex: 1,
          opacity: stage.id === 'finale' ? 0 : 1,
          transition: 'opacity 1.2s cubic-bezier(0.4, 0, 0.2, 1)',
        }}
      />

      <div className="relative flex flex-col min-h-screen" style={{ zIndex: 2 }}>
        <header className="flex items-center justify-between px-8 py-5">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded" style={{ background: 'rgba(212,160,106,0.15)', border: '1px solid rgba(212,160,106,0.5)' }}>
              <svg viewBox="0 0 32 32" className="w-full h-full p-1">
                <polygon points="16,3 29,10 29,22 16,29 3,22 3,10" fill="none" stroke="#d4a06a" strokeWidth="2" />
                <circle cx="16" cy="16" r="4" fill="#d4a06a" />
              </svg>
            </div>
            <span className="text-xs font-bold tracking-[0.25em] uppercase" style={{ color: 'rgba(212,160,106,0.8)' }}>
              TECHNOLAND
            </span>
          </div>
          <div className="flex items-center gap-3">
            {STAGES.map((s, i) => (
              <div
                key={s.id}
                className="flex items-center gap-1"
              >
                <div
                  className="w-2 h-2 rounded-full transition-all duration-300"
                  style={{
                    background: i <= stageIndex ? '#d4a06a' : 'rgba(255,255,255,0.15)',
                    boxShadow: i === stageIndex ? '0 0 8px rgba(212,160,106,0.8)' : 'none',
                  }}
                />
                {i < STAGES.length - 1 && (
                  <div className="w-6 h-px" style={{ background: i < stageIndex ? 'rgba(212,160,106,0.5)' : 'rgba(255,255,255,0.1)' }} />
                )}
              </div>
            ))}
          </div>
        </header>

        <div className="flex-1 flex items-center justify-center px-6 py-12">
          <div
            className="max-w-2xl w-full animate-fadeInUp"
            key={stage.id}
            style={{ opacity: 0, animationFillMode: 'forwards' }}
          >
              <div className="flex items-center gap-3 mb-6">
                <div className="h-px flex-1" style={{ background: 'rgba(212,160,106,0.3)' }} />
                <span className="text-xs tracking-[0.3em] uppercase font-bold" style={{ color: '#d4a06a' }}>
                  {stage.label}
                </span>
                <div className="h-px flex-1" style={{ background: 'rgba(212,160,106,0.3)' }} />
              </div>

              <h2 className="text-3xl md:text-4xl font-black mb-8" style={{
                color: '#ffffff',
                textShadow: '0 0 30px rgba(30,58,95,0.9), 0 2px 8px rgba(0,0,0,0.8), 0 0 60px rgba(30,58,95,0.5)',
                letterSpacing: '0.5px',
              }}>
                {stage.title}
              </h2>

              <div className="glass-panel rounded-2xl p-8 mb-8" style={{ position: 'relative' }}>
                <div className="corner-tl" /><div className="corner-tr" />
                <div className="corner-bl" /><div className="corner-br" />
                <p className="text-base" style={{ color: 'rgba(226,232,240,0.88)', lineHeight: '1.85' }}>
                  <TypewriterText
                    text={stage.text}
                    speed={18}
                    onComplete={() => setTextDone(true)}
                  />
                </p>
              </div>

              {(textDone || stageIndex > 0) && (
                <div className="flex items-center gap-4 animate-fadeInUp" style={{ opacity: 0, animationFillMode: 'forwards' }}>
                  <button className="btn-primary py-3 px-10 rounded-xl text-sm" onClick={next}>
                    {isLast ? 'Начать игру' : 'Далее'}
                  </button>
                  {!isLast && (
                  <button
                    className="btn-secondary py-3 px-8 rounded-xl text-[11px] font-bold uppercase tracking-[0.2em] bg-white/5 backdrop-blur-md border-white/10 hover:bg-white/15 hover:border-white/20 transition-all shadow-lg"
                    style={{ color: 'rgba(255,255,255,0.7)' }}
                    onClick={() => {
                      setTextDone(false);
                      setStageIndex(STAGES.length - 1);
                    }}
                  >
                    Пропустить всё
                  </button>
                  )}
                </div>
              )}
            </div>
          </div>

        {(stage.id === 'task' || stage.id === 'finale') && (
          <div className="px-8 pb-8">
            <div className="max-w-2xl mx-auto">
              <div
                className="rounded-xl p-6 animate-fadeInUp"
                style={{
                  opacity: 0,
                  animationDelay: '0.5s',
                  animationFillMode: 'forwards',
                  background: 'rgba(249,115,22,0.08)',
                  border: '1px solid rgba(249,115,22,0.3)',
                  boxShadow: '0 0 30px rgba(249,115,22,0.15)',
                }}
              >
                <div className="text-center text-xs tracking-[0.3em] uppercase font-bold mb-4" style={{ color: '#f97316' }}>
                  Целевые значения
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { label: 'Бюджет', value: '$420', icon: '💰' },
                    { label: 'Надёжность', value: '75%', icon: '🛡️' },
                    { label: 'Цикл', value: '8с', icon: '⏱️' },
                    { label: 'Тяга', value: '0.42кг', icon: '🔩' },
                  ].map(stat => (
                    <div key={stat.label} className="text-center">
                      <div className="text-2xl mb-2">{stat.icon}</div>
                      <div className="text-2xl font-black mb-1" style={{
                        color: '#ff9d5c',
                        textShadow: '0 0 15px rgba(249,115,22,0.6), 0 0 30px rgba(249,115,22,0.3)',
                        letterSpacing: '0.5px',
                      }}>
                        {stat.value}
                      </div>
                      <div className="text-xs tracking-widest uppercase" style={{ color: 'rgba(249,115,22,0.8)' }}>
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
