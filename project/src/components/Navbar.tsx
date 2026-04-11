import { Link, useLocation } from 'react-router-dom';

const navLinks = [
  { to: '/', label: 'Главная' },
  { to: '/games', label: 'Игры' },
];

export default function Navbar() {
  const location = useLocation();

  // Скрываем навбар на страницах игрового онбординга и главной
  if (location.pathname.startsWith('/game/') || location.pathname === '/') {
    return null;
  }

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 px-6 py-4 flex items-center justify-between"
      style={{
        background: 'rgba(8,10,18,0.85)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(249,115,22,0.15)',
      }}
    >
      {/* Логотип */}
      <Link to="/" className="text-lg font-black shimmer-text no-underline">
        Пракрити
      </Link>

      {/* Навигация */}
      <div className="flex items-center gap-6">
        {navLinks.map((link) => (
          <Link
            key={link.to}
            to={link.to}
            className="text-sm font-medium transition-colors duration-200 no-underline"
            style={{
              color:
                location.pathname === link.to
                  ? '#f97316'
                  : 'rgba(148,163,184,0.7)',
            }}
            onMouseEnter={(e) => {
              if (location.pathname !== link.to) {
                (e.target as HTMLElement).style.color = '#f97316';
              }
            }}
            onMouseLeave={(e) => {
              if (location.pathname !== link.to) {
                (e.target as HTMLElement).style.color = 'rgba(148,163,184,0.7)';
              }
            }}
          >
            {link.label}
          </Link>
        ))}
      </div>
    </nav>
  );
}
