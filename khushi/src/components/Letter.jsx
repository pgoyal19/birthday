import { useEffect, useState } from 'react';
import content from '../content.js';

export default function Letter() {
  const { to, body, from } = content.letter;
  const [open, setOpen] = useState(false);
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!open) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) { setN(body.length); return; }
    const id = setInterval(() => setN((v) => (v >= body.length ? (clearInterval(id), v) : v + 1)), 35);
    return () => clearInterval(id);
  }, [open, body]);
  return (
    <section id="letter" className="sec">
      <h2>A Special Birthday Letter 💌</h2>
      <button className={`envelope ${open ? 'open' : ''}`} onClick={() => setOpen(true)} aria-expanded={open} aria-label="Open the letter">
        <span className="flap" /><span className="seal">💗</span>
        <div className="paper">
          <p className="hand big">{to}</p>
          <p className="typed">{body.slice(0, n)}{n < body.length && <i className="caret" />}</p>
          {n >= body.length && <p className="hand big sign">{from}</p>}
        </div>
      </button>
      {!open && <p className="hand">tap the envelope 👆</p>}
    </section>
  );
}
