import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import GamesPage from './pages/GamesPage';
import IntroPage from './pages/IntroPage';
import ElementSelectPage from './pages/ElementSelectPage';
import LorePage from './pages/LorePage';
import { GameScreen } from './types/game';
import { audioManager } from './utils/audioManager';
import ParticleField from './components/ParticleField';
import MandalaBackground from './components/MandalaBackground';

function PrakritiGame() {
  const [screen, setScreen] = useState<GameScreen>('intro');
  const [fadeIn, setFadeIn] = useState(false);
  const [gameReady, setGameReady] = useState(false);
  const [loadingVisible, setLoadingVisible] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);

  // Плавный вход при монтировании
  useEffect(() => {
    const t = setTimeout(() => setFadeIn(true), 50);
    audioManager.setBGM('lore');
    return () => {
      clearTimeout(t);
      audioManager.stopBGM();
    }
  }, []);

  // Animate progress bar while loading
  useEffect(() => {
    if (screen !== 'dashboard') return;
    let val = 0;
    const interval = setInterval(() => {
      val += Math.random() * 18 + 4;
      if (val >= 90) { val = 90; clearInterval(interval); }
      setLoadingProgress(val);
    }, 180);
    return () => clearInterval(interval);
  }, [screen]);

  // When iframe loads, finish bar and fade out overlay
  const handleGameLoad = () => {
    setLoadingProgress(100);
    setTimeout(() => {
      setLoadingVisible(false);
      setGameReady(true);
    }, 600);
  };

  // Универсальный переход между экранами с fade-эффектом
  const changeScreen = (newScreen: GameScreen) => {
    setFadeIn(false);
    setTimeout(() => {
      setScreen(newScreen);
      window.scrollTo(0, 0);
      // Плавный вход после смены экрана и сброса прокрутки
      setTimeout(() => setFadeIn(true), 50);
    }, 450);
  };

  // Переход онбординг → игра с fade (специфичный случай с остановкой музыки)
  const transitionToGame = () => {
    setFadeIn(false);
    audioManager.stopBGM();
    setTimeout(() => {
      setScreen('dashboard');
      setTimeout(() => setFadeIn(true), 100);
    }, 600);
  };

  return (
    <div className="fixed inset-0 font-sans text-slate-100 selection:bg-cyan-500/30 overflow-hidden bg-[#080a12]">
      {/* Глобальные фоновые элементы (не перезагружаются при смене экранов) */}
      {screen !== 'dashboard' && (
        <>
          <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 0 }}>
            <MandalaBackground />
          </div>
          <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 20 }}>
            <ParticleField />
            <div className="scanline-overlay" style={{ zIndex: 21, pointerEvents: 'none', opacity: 0.5 }} />
          </div>
        </>
      )}

      {screen !== 'dashboard' && (
        <div
          style={{
            opacity: fadeIn ? 1 : 0,
            transform: fadeIn ? 'translateY(0) scale(1)' : 'translateY(0) scale(0.995)',
            transition: 'opacity 0.6s cubic-bezier(0.22, 1, 0.36, 1), transform 0.6s cubic-bezier(0.22, 1, 0.36, 1)',
            height: '100vh',
            width: '100vw',
            overflowY: 'auto',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            zIndex: 10,
            position: 'relative',
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          {screen === 'intro' && (
            <IntroPage onProceed={() => changeScreen('elements')} />
          )}
          {screen === 'elements' && (
            <ElementSelectPage onSelect={() => changeScreen('lore')} />
          )}
          {screen === 'lore' && (
            <LorePage onStartGame={transitionToGame} />
          )}
        </div>
      )}

      {screen === 'dashboard' && (
        <div className="min-h-screen" style={{ background: '#060b14', position: 'relative' }}>

          {/* ── Cinematic loading overlay ── */}
          {loadingVisible && (
            <div style={{
              position: 'absolute', inset: 0, zIndex: 20,
              background: 'radial-gradient(ellipse at 50% 40%, #061828 0%, #000204 100%)',
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
              opacity: loadingProgress >= 100 ? 0 : 1,
              transition: 'opacity 0.6s ease',
              fontFamily: "'IBM Plex Mono', monospace",
            }}>
              {/* Gridlines (Game spirit) */}
              <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(0,243,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,243,255,0.03) 1px, transparent 1px)', backgroundSize: '60px 60px', pointerEvents: 'none' }} />

              {/* Scanlines */}
              <div style={{ position: 'absolute', inset: 0, background: 'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.08) 3px, rgba(0,0,0,0.08) 4px)', pointerEvents: 'none' }} />

              {/* Minimalist Progress Container */}
              <div style={{ width: '280px', textAlign: 'center', position: 'relative' }}>
                <div style={{ fontSize: '9px', letterSpacing: '0.6em', color: 'rgba(0,243,255,0.4)', fontWeight: '700', marginBottom: '20px', textTransform: 'uppercase' }}>
                  Переход в мастерскую
                </div>

                {/* Thin Progress Bar */}
                <div style={{ height: '1px', background: 'rgba(255,255,255,0.05)', position: 'relative', overflow: 'hidden', marginBottom: '16px' }}>
                  <div style={{
                    position: 'absolute', top: 0, left: 0, height: '100%',
                    width: `${loadingProgress}%`,
                    background: '#00f3ff',
                    boxShadow: '0 0 10px #00f3ff',
                    transition: 'width 0.3s ease',
                  }} />
                </div>

                <div style={{
                  fontFamily: "'Orbitron', sans-serif",
                  fontSize: '12px',
                  color: 'rgba(255,255,255,0.6)',
                  letterSpacing: '3px'
                }}>
                  {Math.round(loadingProgress)}%
                </div>
              </div>

              {/* Decorative corner (Minimal) */}
              <div style={{ position: 'absolute', bottom: '40px', right: '40px', textAlign: 'right', opacity: 0.3 }}>
                <div style={{ fontSize: '8px', color: '#00f3ff', letterSpacing: '2px', textTransform: 'uppercase' }}>Prakriti_Module v2.0</div>
                <div style={{ width: '40px', height: '1px', background: '#00f3ff', marginTop: '4px', marginLeft: 'auto' }} />
              </div>
            </div>
          )}

          <iframe
            src="/games/index.html"
            className="w-full h-screen border-0"
            style={{ background: '#060b14', display: 'block' }}
            title="Prakriti Game"
            onLoad={handleGameLoad}
          />
        </div>
      )}
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Navigate to="/game/prakriti" replace />} />
        <Route path="/games" element={<GamesPage />} />
        <Route path="/game/prakriti" element={<PrakritiGame />} />
      </Routes>
    </BrowserRouter>
  );
}
