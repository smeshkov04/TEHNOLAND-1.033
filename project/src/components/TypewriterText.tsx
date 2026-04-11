import { useEffect, useState } from 'react';
import { audioManager } from '../utils/audioManager';

interface Props {
  text: string;
  speed?: number;
  onComplete?: () => void;
  className?: string;
}

export default function TypewriterText({ text, speed = 28, onComplete, className = '' }: Props) {
  const [displayed, setDisplayed] = useState('');
  const [index, setIndex] = useState(0);
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    setDisplayed('');
    setIndex(0);
  }, [text]);

  useEffect(() => {
    if (index < text.length) {
      const timer = setTimeout(() => {
        setDisplayed(prev => prev + text[index]);
        setIndex(prev => prev + 1);
        if (text[index] !== ' ') {
          audioManager.playTextBlip();
        }
      }, speed);
      return () => clearTimeout(timer);
    } else if (index === text.length && onComplete) {
      const timer = setTimeout(onComplete, 400);
      return () => clearTimeout(timer);
    }
  }, [index, text, speed, onComplete]);

  useEffect(() => {
    const interval = setInterval(() => setShowCursor(p => !p), 530);
    return () => clearInterval(interval);
  }, []);

  return (
    <span className={className}>
      {displayed}
      {index < text.length && (
        <span style={{ opacity: showCursor ? 1 : 0, color: '#f97316' }}>|</span>
      )}
    </span>
  );
}
