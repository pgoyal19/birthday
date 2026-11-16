import { useState } from 'react';
import content from '../content.js';
import { confetti, pick } from '../lib/fx.js';


function Candles() {
  const [lit, setLit] = useState(Array(7).fill(true));
  const left = lit.filter(Boolean).length;
  const blow = (k) => { const n = lit.map((v, j) => (j === k ? false : v)); setLit(n); if (!n.some(Boolean)) confetti(180); };
  return (
    <div className="card center">
      <h3>Make a wish 🕯️</h3>
      <div className="candle-row">
        {lit.map((on, k) => (
          <button key={k} className="cbtn" onClick={() => blow(k)} disabled={!on} aria-label={on ? `Blow out candle ${k + 1}` : `Candle ${k + 1} is out`}>
            <i className="candle">{on && <b className="flame" />}</i>
          </button>
        ))}
      </div>
      <p className="hand">{left ? `${left} candle${left > 1 ? 's' : ''} left. Tap to blow!` : 'WISH MADE. Do not tell anyone. 🤫'}</p>
      {!left && <button className="btn" onClick={() => setLit(Array(7).fill(true))}>relight 🔥</button>}
    </div>
  );
}

function Rando({ title, items, label }) {
  const [t, setT] = useState('');
  return (
    <div className="card center">
      <h3>{title}</h3>
      <p className="hand big" aria-live="polite">{t || '…'}</p>
      <button className="btn" onClick={() => setT(pick(items.filter((x) => x !== t)))}>{label}</button>
    </div>
  );
}

function Reasons() {
  const [flip, setFlip] = useState({});
  return (
    <div className="card">
      <h3>Reasons why Khushi is irreplaceable</h3>
      <div className="reasons">
        {content.reasons.map((r, k) => (
          <button key={k} className={`flipc ${flip[k] ? 'f' : ''}`} onClick={() => setFlip((s) => ({ ...s, [k]: !s[k] }))} aria-pressed={!!flip[k]}>
            <span className="front">#{k + 1} 💖</span><span className="back">{r}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

export default function Fun({ onFinale }) {
  return (
    <section id="fun" className="sec lav torn">
      <h2>Interactive Surprises 🎁</h2>
      <div className="fun-grid">
        <Candles />
        <Rando title="Surprise button" items={content.surprises} label="Surprise me 🎲" />
        <Rando title="Compliment generator" items={content.compliments} label="Hype me up ✨" />
        <Reasons />
      </div>
      <div className="final-cta">
        <p className="hand big">okay. that's everything. except one last thing…</p>
        <button className="cta" onClick={onFinale}>{content.finale.button}</button>
      </div>
    </section>
  );
}
