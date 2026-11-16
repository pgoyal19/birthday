import { useState } from 'react';
import content from '../content.js';
import { pick } from '../lib/fx.js';

export default function Memes() {
  const cats = content.memeCategories;
  const [active, setActive] = useState(cats[0].id);
  const [spot, setSpot] = useState(null);
  const cat = cats.find((c) => c.id === active);
  const random = () => {
    const c = pick(cats); setActive(c.id); setSpot({ ...pick(c.cards), cat: c.title });
  };
  return (
    <section id="memes" className="sec torn">
      <h2>The Meme Museum 😂</h2>
      <p className="hand">Curated with love, zero shame, and a questionable sense of humour.</p>
      <div className="tabs" role="tablist">
        {cats.map((c) => (
          <button key={c.id} role="tab" aria-selected={c.id === active} className={c.id === active ? 'on' : ''} onClick={() => setActive(c.id)}>
            {c.emoji} {c.title}
          </button>
        ))}
      </div>
      <div className="meme-grid">
        {cat.cards.map((m, i) => (
          <article className="meme" key={cat.id + i} style={{ '--r': `${(i % 2 ? 1 : -1) * (1 + i)}deg` }} tabIndex={0}>
            <img src={m.img} alt="" loading="lazy" />
            <p>{m.cap}</p>
          </article>
        ))}
      </div>
      <button className="btn" onClick={random}>🎲 Random meme, no context</button>
      {spot && (
        <div className="modal" role="dialog" aria-modal="true" onClick={() => setSpot(null)}>
          <article className="meme big" onClick={(e) => e.stopPropagation()}>
            <small className="hand">{spot.cat}</small>
            <img src={spot.img} alt="" />
            <p>{spot.cap}</p>
            <button className="btn" onClick={random}>another one 🎲</button>
            <button className="btn ghost" onClick={() => setSpot(null)}>close</button>
          </article>
        </div>
      )}
    </section>
  );
}
