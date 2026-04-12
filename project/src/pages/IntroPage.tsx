import { useState, useEffect } from 'react';
import TypewriterText from '../components/TypewriterText';

interface Props {
  onProceed: () => void;
}

type Stage = 'lore' | 'mascot1' | 'mascot2' | 'mascot3' | 'cta';

const MASCOTS = [
  {
    id: 'mascot1',
    image: '/c_norm.png',
    name: 'Конструктиус',
    dialogue: 'Утратив прикладные навыки в работе с внутренним устройством техники, люди нарушили гармонию Панчамахабхута. В ответ стихии обрушили на Индию накопление отходов, сброс неочищенных сточных вод, пожары в трущобах, загрязнение воздуха и транспортный хаос.',
    side: 'left',
  },
  {
    id: 'mascot2',
    image: '/m_norm.png',
    name: 'Экономикус',
    dialogue: 'Стихии бушуют сильнее, а страна стоит перед новыми технологическими вызовами гражданской роботизации.',
    side: 'right',
  },
  {
    id: 'mascot3',
    image: '/p_norm.png',
    name: 'Кодиус',
    dialogue: 'Это древняя электронная плата Панчамахабхута — и она в твоих руках. Теперь тебе предстоит решать вызовы Панчамахабхута во благо технологическому прогрессу в Индии.',
    side: 'center',
  },
];

const LORE_TEXT = 'В мистической Индии 2026 года существует легенда о трёх забытых мастерских Панчамахабхута — конструирования, программирования и экономики, где технологии когда‑то гармонично сочетались с пятью природными стихиями. В индийской философии Панчамахабхут — это Земля, Вода, Огонь, Воздух и Эфир, порождающие ключевые технологические проблемы для Индии.';

export default function IntroPage({ onProceed }: Props) {
  const [stage, setStage] = useState<Stage>('lore');
  const [visibleMascots, setVisibleMascots] = useState<string[]>([]);
  const [activeBubble, setActiveBubble] = useState<string | null>(null);
  const [skipAll, setSkipAll] = useState(false);

  const advanceStage = () => {
    if (stage === 'lore') {
      setStage('mascot1');
      setVisibleMascots(['mascot1']);
      setActiveBubble('mascot1');
    } else if (stage === 'mascot1') {
      setStage('mascot2');
      setVisibleMascots(p => [...p, 'mascot2']);
      setActiveBubble('mascot2');
    } else if (stage === 'mascot2') {
      setStage('mascot3');
      setVisibleMascots(p => [...p, 'mascot3']);
      setActiveBubble('mascot3');
    } else if (stage === 'mascot3') {
      setStage('cta');
      setActiveBubble(null);
    }
  };

  useEffect(() => {
    if (skipAll) {
      setStage('cta');
      setVisibleMascots(['mascot1', 'mascot2', 'mascot3']);
      setActiveBubble(null);
    }
  }, [skipAll]);

  const currentMascotIndex = MASCOTS.findIndex(m => m.id === activeBubble);
  const currentMascot = MASCOTS[currentMascotIndex];

  return (
    <div className="relative min-h-screen flex flex-col overflow-hidden" style={{ background: 'transparent' }}>
      <div className="relative flex flex-col min-h-screen" style={{ zIndex: 2 }}>
        <header className="flex items-center justify-between px-8 py-5">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded" style={{ background: 'rgba(212,160,106,0.15)', border: '1px solid rgba(212,160,106,0.5)' }}>
              <svg viewBox="0 0 32 32" className="w-full h-full p-1.5">
                <polygon points="16,3 29,10 29,22 16,29 3,22 3,10" fill="none" stroke="#d4a06a" strokeWidth="2" />
                <circle cx="16" cy="16" r="4" fill="#d4a06a" />
              </svg>
            </div>
            <span className="text-lg font-bold tracking-[0.25em] uppercase" style={{ color: 'rgba(212,160,106,0.85)' }}>
              TECHNOLAND
            </span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-2.5 h-2.5 rounded-full animate-pulse" style={{ background: '#06b6d4' }} />
            <span className="text-sm tracking-widest" style={{ color: 'rgba(6,182,212,0.7)' }}>
              INDIA · 2026
            </span>
          </div>
        </header>

        {stage === 'lore' && (
          <div className="flex-1 flex flex-col items-center justify-center px-8 py-12">
            <div className="max-w-3xl w-full text-center space-y-8">
              <div className="animate-fadeInUp" style={{ animationDelay: '0.2s', opacity: 0 }}>
                <p className="text-xs tracking-[0.3em] uppercase mb-4" style={{ color: 'rgba(6,182,212,0.7)' }}>
                  — Легенда —
                </p>
                <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-2 shimmer-text">
                  ПАНЧА
                </h1>
                <h1 className="text-5xl md:text-7xl font-black tracking-tight shimmer-text">
                  МАХАБХУТА
                </h1>
              </div>

              <div
                className="glass-panel rounded-2xl p-8 mx-auto max-w-2xl animate-fadeInUp"
                style={{ animationDelay: '0.8s', opacity: 0, position: 'relative' }}
              >
                <div className="corner-tl" /><div className="corner-tr" />
                <div className="corner-bl" /><div className="corner-br" />
                <p className="text-base leading-relaxed" style={{ color: 'rgba(226,232,240,0.85)', lineHeight: '1.8' }}>
                  <TypewriterText
                    text={LORE_TEXT}
                    speed={22}
                    onComplete={advanceStage}
                  />
                </p>
              </div>

              <div className="flex items-center justify-center gap-4 animate-fadeInUp" style={{ animationDelay: '1s', opacity: 0 }}>
                <button
                  className="btn-primary py-2 px-10 rounded-lg text-xs uppercase tracking-widest"
                  onClick={advanceStage}
                >
                  Далее
                </button>
                <button
                  className="btn-secondary py-2 px-6 rounded-lg text-[10px] uppercase tracking-[0.2em] bg-white/5 backdrop-blur-sm border-white/10 hover:bg-white/10 transition-all font-bold"
                  style={{ color: 'rgba(255,255,255,0.5)' }}
                  onClick={() => setSkipAll(true)}
                >
                  Пропустить всё
                </button>
              </div>
            </div>
          </div>
        )}

        {stage !== 'lore' && (
          <div className="flex-1 flex flex-col">
            {activeBubble && currentMascot && (
              <div className="flex-1 flex items-center justify-center px-8 py-6">
                <div
                  className="speech-bubble speech-bubble-bottom rounded-2xl p-6 max-w-xl w-full animate-popIn"
                  key={activeBubble}
                  style={{ position: 'relative' }}
                >
                  <div className="corner-tl" /><div className="corner-tr" />
                  <div className="corner-bl" /><div className="corner-br" />
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-1 h-4 rounded-full" style={{ background: '#d4a06a' }} />
                    <span className="text-xs font-bold tracking-widest uppercase" style={{ color: '#d4a06a' }}>
                      {currentMascot.name}
                    </span>
                  </div>
                  <p className="text-sm leading-relaxed" style={{ color: 'rgba(226,232,240,0.9)', lineHeight: '1.75' }}>
                    <TypewriterText
                      text={currentMascot.dialogue}
                      speed={20}
                      onComplete={() => {}}
                    />
                  </p>
                  <button
                    className="mt-5 btn-primary text-xs py-2 px-5 rounded"
                    onClick={advanceStage}
                  >
                    {stage === 'mascot3' ? 'Приступить' : 'Далее'}
                  </button>
                </div>
              </div>
            )}

            {stage === 'cta' && (
              <div className="flex-1 flex items-center justify-center px-8 animate-fadeInUp">
                <div className="text-center space-y-6">
                  <p className="text-xs tracking-[0.3em] uppercase" style={{ color: 'rgba(6,182,212,0.7)' }}>
                    Всё готово
                  </p>
                  <h2 className="text-3xl font-black" style={{
                    color: '#ffffff',
                    textShadow: '0 2px 12px rgba(0,0,0,0.6)',
                  }}>
                    Выбери стихию
                  </h2>
                  <p className="text-sm" style={{ color: 'rgba(148,163,184,0.8)' }}>
                    Пять природных стихий ждут твоего решения
                  </p>
                  <button
                    className="btn-primary py-4 px-12 rounded-xl text-sm"
                    onClick={onProceed}
                  >
                    Приступить
                  </button>
                </div>
              </div>
            )}

            <div className="flex items-end justify-center gap-0 pb-0" style={{ minHeight: '340px' }}>
              {MASCOTS.map((mascot, i) => {
                const isVisible = visibleMascots.includes(mascot.id);
                const isActive = activeBubble === mascot.id;
                const offset = i === 0 ? '-mr-8' : i === 2 ? '-ml-8' : '';

                return (
                  <div
                    key={mascot.id}
                    className={`relative transition-all duration-700 ${offset}`}
                    style={{
                      opacity: isVisible ? 1 : 0,
                      transform: isVisible ? 'translateY(0)' : 'translateY(60px)',
                      width: '220px',
                      zIndex: isActive ? 10 : 5,
                      filter: isActive
                        ? 'drop-shadow(0 0 20px rgba(212,160,106,0.6)) brightness(1.1)'
                        : isVisible
                        ? 'brightness(0.7)'
                        : 'none',
                      transitionDelay: `${i * 0.12}s`,
                    }}
                  >
                    <img
                      src={mascot.image}
                      alt={mascot.name}
                      className="w-full object-contain"
                      style={{
                        height: '320px',
                        animation: isActive ? 'float 4s ease-in-out infinite' : 'none',
                      }}
                    />
                    {isActive && (
                      <div
                        className="absolute inset-0 rounded-full pointer-events-none"
                        style={{
                          background: 'radial-gradient(ellipse at 50% 100%, rgba(212,160,106,0.15) 0%, transparent 70%)',
                        }}
                      />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
