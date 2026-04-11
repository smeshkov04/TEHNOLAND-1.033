import { useState } from 'react';
                                                                                                    
interface Props {
  onSelect: (elementId: string) => void;
}

const ELEMENTS = [
  {
    id: 'earth',
    symbol: '⬡',
    name: 'Притхви',
    nameRu: 'Земля',
    problem: 'Накопление отходов',
    description: 'Свалки разрастаются, токсичные отходы угрожают рекам',
    color: '#8B6914',
    glow: 'rgba(139,105,20,0.5)',
    iconColor: '#d4a017',
    available: true,
  },
  {
    id: 'water',
    symbol: '◈',
    name: 'Джала',
    nameRu: 'Вода',
    problem: 'Загрязнение вод',
    description: 'Неочищенные сточные воды сбрасываются в священные реки',
    color: '#0e6b94',
    glow: 'rgba(14,107,148,0.5)',
    iconColor: '#06b6d4',
    available: false,
  },
  {
    id: 'fire',
    symbol: '▲',
    name: 'Агни',
    nameRu: 'Огонь',
    problem: 'Пожары в трущобах',
    description: 'Неконтролируемые возгорания уничтожают целые кварталы',
    color: '#9a2a0a',
    glow: 'rgba(154,42,10,0.5)',
    iconColor: '#ef4444',
    available: false,
  },
  {
    id: 'air',
    symbol: '◎',
    name: 'Ваю',
    nameRu: 'Воздух',
    problem: 'Загрязнение воздуха',
    description: 'Смог накрывает мегаполисы, индекс качества воздуха критический',
    color: '#2d5a6b',
    glow: 'rgba(45,90,107,0.5)',
    iconColor: '#7dd3fc',
    available: false,
  },
  {
    id: 'ether',
    symbol: '✦',
    name: 'Акаша',
    nameRu: 'Эфир',
    problem: 'Транспортный хаос',
    description: 'Бесконтрольный рост транспорта парализует города',
    color: '#1a1a4e',
    glow: 'rgba(26,26,78,0.5)',
    iconColor: '#a78bfa',
    available: false,
  },
];

export default function ElementSelectPage({ onSelect }: Props) {
  const [hovered, setHovered] = useState<string | null>(null);
  const [selected, setSelected] = useState<string | null>(null);

  const handleSelect = (id: string, available: boolean) => {
    if (!available) return;
    setSelected(id);
    setTimeout(() => onSelect(id), 600);
  };

  return (
    <div className="relative min-h-screen flex flex-col overflow-hidden" style={{ background: 'transparent' }}>
      <div className="relative flex flex-col min-h-screen items-center justify-center px-6 py-12" style={{ zIndex: 2 }}>
        <div className="text-center mb-12 animate-fadeInUp" style={{ opacity: 0, animationFillMode: 'forwards' }}>
          <p className="text-xs tracking-[0.35em] uppercase mb-3" style={{ color: 'rgba(6,182,212,0.7)' }}>
            Выбор стихии
          </p>
          <h2 className="text-4xl md:text-5xl font-black mb-3 shimmer-text">
            Панчамахабхута
          </h2>
          <p className="text-sm max-w-md mx-auto" style={{ color: 'rgba(148,163,184,0.75)', lineHeight: '1.7' }}>
            Пять стихий порождают пять кризисов. Выбери, какой из них ты возьмёшься решить.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 max-w-5xl w-full">
          {ELEMENTS.map((el, i) => (
            <div
              key={el.id}
              className={`element-card rounded-2xl p-5 text-center animate-fadeInUp ${selected === el.id ? 'selected' : ''}`}
              style={{
                opacity: 0,
                animationDelay: `${0.1 + i * 0.1}s`,
                animationFillMode: 'forwards',
                background: hovered === el.id || selected === el.id
                  ? `linear-gradient(135deg, rgba(14,17,32,0.95), ${el.color}33)`
                  : 'rgba(14,17,32,0.8)',
                boxShadow: hovered === el.id
                  ? `0 0 30px ${el.glow}, 0 8px 32px rgba(0,0,0,0.4)`
                  : selected === el.id
                  ? `0 0 50px ${el.glow}, 0 0 100px ${el.glow}`
                  : '0 4px 16px rgba(0,0,0,0.3)',
                cursor: el.available ? 'pointer' : 'not-allowed',
                filter: el.available ? 'none' : 'grayscale(0.6) opacity(0.5)',
              }}
              onMouseEnter={() => setHovered(el.id)}
              onMouseLeave={() => setHovered(null)}
              onClick={() => handleSelect(el.id, el.available)}
            >
              <div
                className="text-4xl mb-3 font-black"
                style={{
                  color: el.iconColor,
                  filter: hovered === el.id || selected === el.id ? `drop-shadow(0 0 10px ${el.iconColor})` : 'none',
                  transition: 'filter 0.3s',
                  lineHeight: 1,
                }}
              >
                {el.symbol}
              </div>
              <div className="font-black text-base mb-0.5" style={{ color: '#e2e8f0' }}>
                {el.nameRu}
              </div>
              <div className="text-xs font-light tracking-wider mb-2" style={{ color: el.iconColor, opacity: 0.8 }}>
                {el.name}
              </div>
              <div className="text-xs font-semibold mb-2 px-2" style={{ color: el.iconColor, lineHeight: 1.4 }}>
                {el.problem}
              </div>
              <p className="text-xs leading-relaxed" style={{ color: 'rgba(148,163,184,0.65)', lineHeight: '1.5' }}>
                {el.description}
              </p>
              {el.available && (
                <div
                  className="mt-3 py-1 px-3 rounded text-xs font-bold uppercase tracking-wider"
                  style={{
                    background: 'rgba(212,160,106,0.15)',
                    border: '1px solid rgba(212,160,106,0.5)',
                    color: '#d4a06a',
                  }}
                >
                  Доступно
                </div>
              )}
              {!el.available && (
                <div
                  className="mt-3 py-1 px-3 rounded text-xs uppercase tracking-wider"
                  style={{
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    color: 'rgba(148,163,184,0.4)',
                  }}
                >
                  Заблокировано
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-10 flex items-center gap-3 animate-fadeInUp" style={{ opacity: 0, animationDelay: '0.7s', animationFillMode: 'forwards' }}>
          <div className="w-2 h-2 rounded-full" style={{ background: '#d4a06a', boxShadow: '0 0 8px rgba(212,160,106,0.8)' }} />
          <span className="text-xs tracking-wider" style={{ color: 'rgba(148,163,184,0.6)' }}>
            Выбери стихию Земля, чтобы начать миссию
          </span>
        </div>
      </div>
    </div>
  );
}
