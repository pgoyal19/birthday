const reduce = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export function confetti(n = 140) {
  if (reduce()) return;
  const c = document.createElement('canvas');
  Object.assign(c.style, { position: 'fixed', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 9999 });
  c.width = innerWidth; c.height = innerHeight;
  document.body.appendChild(c);
  const x = c.getContext('2d');
  const cols = ['#ff5d8f', '#c1121f', '#fff1e6', '#c9b6ff', '#ffc2d4', '#ffd166'];
  const ps = Array.from({ length: n }, () => ({
    x: innerWidth / 2 + (Math.random() - 0.5) * 240, y: innerHeight * 0.65,
    vx: (Math.random() - 0.5) * 18, vy: -Math.random() * 17 - 6,
    s: 6 + Math.random() * 8, r: Math.random() * 6, vr: (Math.random() - 0.5) * 0.4,
    c: cols[(Math.random() * cols.length) | 0],
  }));
  let f = 0;
  (function tick() {
    x.clearRect(0, 0, c.width, c.height);
    for (const p of ps) {
      p.vy += 0.35; p.x += p.vx; p.y += p.vy; p.vx *= 0.99; p.r += p.vr;
      x.save(); x.translate(p.x, p.y); x.rotate(p.r); x.fillStyle = p.c;
      x.fillRect(-p.s / 2, -p.s / 2, p.s, p.s * 0.6); x.restore();
    }
    if (++f < 200) requestAnimationFrame(tick); else c.remove();
  })();
}

export const pick = (arr) => arr[(Math.random() * arr.length) | 0];

// Music-box "Happy Birthday" synthesised with WebAudio (no audio file needed).
let ctx, timer, audioEl;
const F = { G4: 392, A4: 440, B4: 493.88, C5: 523.25, D5: 587.33, E5: 659.25, F5: 698.46, G5: 783.99 };
const SONG = [
  ['G4', .75], ['G4', .25], ['A4', 1], ['G4', 1], ['C5', 1], ['B4', 2],
  ['G4', .75], ['G4', .25], ['A4', 1], ['G4', 1], ['D5', 1], ['C5', 2],
  ['G4', .75], ['G4', .25], ['G5', 1], ['E5', 1], ['C5', 1], ['B4', 1], ['A4', 1],
  ['F5', .75], ['F5', .25], ['E5', 1], ['C5', 1], ['D5', 1], ['C5', 2],
];
const BEAT = 0.5;
function playLoop() {
  const t0 = ctx.currentTime + 0.05; let t = t0;
  for (const [n, d] of SONG) {
    const o = ctx.createOscillator(), g = ctx.createGain();
    o.type = 'triangle'; o.frequency.value = F[n];
    g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(0.12, t + 0.02);
    g.gain.exponentialRampToValueAtTime(0.001, t + d * BEAT * 0.95);
    o.connect(g).connect(ctx.destination); o.start(t); o.stop(t + d * BEAT);
    t += d * BEAT;
  }
  timer = setTimeout(playLoop, (t - t0 + 1.5) * 1000);
}
export function startMusic(url) {
  if (url) { audioEl ||= Object.assign(new Audio(url), { loop: true, volume: 0.5 }); audioEl.play().catch(() => {}); return; }
  ctx ||= new (window.AudioContext || window.webkitAudioContext)();
  ctx.resume(); clearTimeout(timer); playLoop();
}
export function stopMusic() {
  clearTimeout(timer); audioEl?.pause(); ctx?.suspend();
}
