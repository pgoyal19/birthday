import { useEffect } from 'react';
import content from '../content.js';
import { confetti } from '../lib/fx.js';
import { Cake } from './Landing.jsx';

export default function Finale({ onClose }) {
  useEffect(() => {
    confetti(260);
    const id = setInterval(() => confetti(90), 2200);
    const esc = (e) => e.key === 'Escape' && onClose();
    addEventListener('keydown', esc);
    return () => { clearInterval(id); removeEventListener('keydown', esc); };
  }, [onClose]);
  return (
    <div className="finale" role="dialog" aria-modal="true">
      <div className="rain" aria-hidden="true">{Array.from({ length: 30 }, (_, i) => (
        <span key={i} style={{ left: `${(i * 37) % 100}%`, animationDelay: `${(i % 10) * 0.4}s`, fontSize: 18 + (i % 5) * 8 }}>{i % 3 ? '❤️' : '💗'}</span>
      ))}</div>
      <Cake />
      <h1>{content.finale.title}</h1>
      <p className="hand big">{content.finale.message}</p>
      <button className="btn" onClick={() => confetti(200)}>more confetti 🎊</button>
      <button className="btn ghost" onClick={onClose}>back to the site</button>
    </div>
  );
}
