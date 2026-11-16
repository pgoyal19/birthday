import { useMemo } from 'react';
const ICONS = ['💗', '✨', '⭐', '🎀', '💖', '🎈', '🌸', '💫'];
export default function Floaters({ count = 22 }) {
  const items = useMemo(() => Array.from({ length: count }, (_, i) => ({
    i, icon: ICONS[i % ICONS.length], left: Math.random() * 100,
    size: 14 + Math.random() * 26, dur: 12 + Math.random() * 14, delay: -Math.random() * 20,
  })), [count]);
  return (
    <div className="floaters" aria-hidden="true">
      {items.map((f) => (
        <span key={f.i} style={{ left: `${f.left}%`, fontSize: f.size, animationDuration: `${f.dur}s`, animationDelay: `${f.delay}s` }}>{f.icon}</span>
      ))}
    </div>
  );
}
