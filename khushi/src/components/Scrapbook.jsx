import { useState } from 'react';
import content from '../content.js';

export default function Scrapbook() {
  const [extra, setExtra] = useState([]);
  const add = (e) => {
    const next = [...e.target.files].filter((f) => f.type.startsWith('image/'))
      .map((f) => ({ img: URL.createObjectURL(f), cap: f.name.replace(/\.[^.]+$/, '') }));
    setExtra((x) => [...x, ...next]); e.target.value = '';
  };
  const all = [...content.photos, ...extra];
  return (
    <section id="memories" className="sec lav torn">
      <h2>Our Memories 📸</h2>
      <p className="hand">flip through. cry a little. it's allowed.</p>
      <div className="polaroids">
        {all.map((p, i) => (
          <figure className="polaroid" key={i} tabIndex={0} style={{ '--r': `${((i * 37) % 9) - 4}deg` }}>
            <span className="tape" />
            <img src={p.img} alt={p.cap} loading="lazy" />
            <figcaption className="hand">{p.cap}</figcaption>
          </figure>
        ))}
      </div>
      <h3 className="hand">Little video moments 🎬</h3>
      <div className="videos">
        {content.videos.map((video) => (
          <div key={video.src}>
            <div className="player">
              <video src={video.src} controls playsInline preload="metadata" />
            </div>
            <p className="hand">{video.cap}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
