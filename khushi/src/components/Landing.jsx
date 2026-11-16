import { useState } from 'react';
import content from '../content.js';
import { confetti } from '../lib/fx.js';

export function Cake({ small }) {
  return (
    <div className={`cake ${small ? 'small' : ''}`} aria-hidden="true">
      <div className="candles">{[0, 1, 2].map((i) => <i key={i} className="candle"><b className="flame" style={{ animationDelay: `${i * 0.2}s` }} /></i>)}</div>
      <div className="tier t1" /><div className="tier t2" /><div className="plate" />
    </div>
  );
}

export default function Landing({ onEnter, entered }) {
  const [pop, setPop] = useState(false);
  const go = () => { confetti(220); setPop(true); onEnter(); };
  const words = content.hero.title.split(' ');
  return (
    <header className={`hero ${entered ? 'hero-done' : ''}`}>
      <h1 aria-label={content.hero.title}>
        {words.map((w, i) => <span key={i} className="word" style={{ animationDelay: `${i * 0.15}s` }}>{w}</span>)}
      </h1>
      <p className="hand sub">{content.hero.subtitle}</p>
      <Cake />
      <button className={`cta ${pop ? 'popped' : ''}`} onClick={go}>{entered ? 'Again?! 🎉' : content.hero.button}</button>
      {!entered && <p className="hand tiny">(music starts when you click. sound on, bestie 🔊)</p>}
    </header>
  );
}
