export default function MandalaBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 0 }}>
      <div
        className="absolute"
        style={{
          top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '900px', height: '900px',
        }}
      >
        <svg
          viewBox="0 0 900 900"
          className="w-full h-full animate-rotateCW"
          style={{ opacity: 0.04 }}
        >
          {[80, 160, 220, 290, 360, 420].map((r, i) => (
            <circle key={i} cx="450" cy="450" r={r} fill="none" stroke="#f97316" strokeWidth="1" />
          ))}
          {Array.from({ length: 12 }, (_, i) => {
            const angle = (i * 30 * Math.PI) / 180;
            return (
              <line
                key={i}
                x1={450} y1={450}
                x2={450 + Math.cos(angle) * 430}
                y2={450 + Math.sin(angle) * 430}
                stroke="#f97316" strokeWidth="0.5"
              />
            );
          })}
          {Array.from({ length: 8 }, (_, i) => {
            const angle = (i * 45 * Math.PI) / 180;
            const x = 450 + Math.cos(angle) * 300;
            const y = 450 + Math.sin(angle) * 300;
            return <circle key={i} cx={x} cy={y} r={20} fill="none" stroke="#f97316" strokeWidth="0.8" />;
          })}
          {Array.from({ length: 6 }, (_, i) => {
            const angle = (i * 60 * Math.PI) / 180;
            const x = 450 + Math.cos(angle) * 200;
            const y = 450 + Math.sin(angle) * 200;
            return (
              <polygon
                key={i}
                points={`${x},${y - 15} ${x + 13},${y + 7} ${x - 13},${y + 7}`}
                fill="none" stroke="#06b6d4" strokeWidth="0.6"
              />
            );
          })}
        </svg>
      </div>

      <div
        className="absolute"
        style={{
          top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '600px', height: '600px',
        }}
      >
        <svg
          viewBox="0 0 600 600"
          className="w-full h-full animate-rotateCCW"
          style={{ opacity: 0.06 }}
        >
          {Array.from({ length: 16 }, (_, i) => {
            const angle = (i * 22.5 * Math.PI) / 180;
            return (
              <line
                key={i}
                x1={300} y1={300}
                x2={300 + Math.cos(angle) * 280}
                y2={300 + Math.sin(angle) * 280}
                stroke="#d4a017" strokeWidth="0.5"
              />
            );
          })}
          {[50, 100, 150, 200, 250].map((r, i) => (
            <circle key={i} cx="300" cy="300" r={r} fill="none" stroke="#d4a017" strokeWidth="0.5" />
          ))}
        </svg>
      </div>

      <div
        className="absolute top-0 left-0 right-0 bottom-0"
        style={{
          background: 'radial-gradient(ellipse at 50% 30%, rgba(249,115,22,0.06) 0%, transparent 60%), radial-gradient(ellipse at 80% 80%, rgba(6,182,212,0.04) 0%, transparent 50%), radial-gradient(ellipse at 20% 70%, rgba(212,160,23,0.03) 0%, transparent 50%)',
        }}
      />

      {[
        { top: '10%', left: '5%', size: 60, delay: '0s' },
        { top: '20%', right: '8%', size: 40, delay: '1s' },
        { bottom: '15%', left: '10%', size: 50, delay: '2s' },
        { bottom: '25%', right: '5%', size: 35, delay: '0.5s' },
        { top: '60%', left: '3%', size: 25, delay: '1.5s' },
      ].map((hex, i) => (
        <div
          key={i}
          className="absolute"
          style={{
            ...hex,
            width: hex.size, height: hex.size,
            animation: `hexDrift ${5 + i}s ease-in-out ${hex.delay} infinite`,
            opacity: 0.1,
          }}
        >
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <polygon
              points="50,2 93,26 93,74 50,98 7,74 7,26"
              fill="none" stroke="#f97316" strokeWidth="3"
            />
          </svg>
        </div>
      ))}
    </div>
  );
}
