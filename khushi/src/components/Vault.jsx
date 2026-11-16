import { useRef, useState } from 'react';
import content from '../content.js';
import { api } from '../api.js';
import { confetti, pick } from '../lib/fx.js';

const fmt = (s) => `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, '0')}`;

function Player({ src, onError }) {
  const v = useRef(null);
  const [playing, setPlaying] = useState(false), [t, setT] = useState(0), [d, setD] = useState(0), [muted, setMuted] = useState(false);
  const toggle = () => (v.current.paused ? v.current.play() : v.current.pause());
  return (
    <div className="player">
      <video ref={v} src={src} playsInline preload="metadata" controlsList="nodownload noplaybackrate" disablePictureInPicture
        onContextMenu={(e) => e.preventDefault()} onClick={toggle} onError={onError}
        onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)}
        onTimeUpdate={(e) => setT(e.target.currentTime)} onLoadedMetadata={(e) => setD(e.target.duration)} />
      <div className="pbar">
        <button onClick={toggle} aria-label={playing ? 'Pause' : 'Play'}>{playing ? '⏸' : '▶️'}</button>
        <input type="range" min="0" max={d || 1} step="0.1" value={t} aria-label="Seek" onChange={(e) => { v.current.currentTime = +e.target.value; }} />
        <span>{fmt(t)} / {fmt(d)}</span>
        <button onClick={() => { v.current.muted = !muted; setMuted(!muted); }} aria-label={muted ? 'Unmute' : 'Mute'}>{muted ? '🔇' : '🔊'}</button>
        <button onClick={() => v.current.requestFullscreen?.() || v.current.webkitEnterFullscreen?.()} aria-label="Fullscreen">⛶</button>
      </div>
    </div>
  );
}

export default function Vault() {
  const V = content.vault;
  const [stage, setStage] = useState('locked'); // locked | opening | open
  const [pw, setPw] = useState(''), [show, setShow] = useState(false), [err, setErr] = useState('');
  const [busy, setBusy] = useState(false), [shake, setShake] = useState(0), [items, setItems] = useState([]);
  const token = useRef(null);

  const relock = () => { token.current = null; setItems([]); setStage('locked'); setErr('Session expired. Enter the password again.'); };
  const refresh = async () => { // signed URLs are short-lived; fetch fresh ones
    try { setItems((await api.items(token.current)).items); } catch (e) { if (e.status === 401) relock(); }
  };

  async function submit(e) {
    e.preventDefault();
    if (!pw || busy) return;
    setBusy(true); setErr('');
    try {
      const { token: t } = await api.unlock(pw);
      token.current = t;
      setItems((await api.items(t)).items);
      setPw(''); setStage('opening');
      setTimeout(() => { setStage('open'); confetti(150); }, 1500);
    } catch (e2) {
      setErr(e2.status === 401 ? pick(V.wrong) : e2.status === 429 ? V.tooMany : V.error);
      setShake((s) => s + 1);
    } finally { setBusy(false); }
  }

  const photos = items.filter((i) => i.type === 'image'), videos = items.filter((i) => i.type === 'video');
  return (
    <section id="vault" className="sec vault">
      <h2>{V.title} 🔐</h2>
      <p className="hand big">{V.subtitle}</p>
      {stage !== 'open' ? (
        <div key={shake} className={`vault-box ${stage === 'opening' ? 'opening' : ''} ${shake ? 'shake' : ''}`}>
          <div className="lock" aria-hidden="true"><span className="shackle" /><span className="body">🔒</span></div>
          {stage === 'opening' ? <p className="hand big">{V.unlocked}</p> : (
            <form onSubmit={submit}>
              <p>{V.warning}</p>
              <div className="pw">
                <input type={show ? 'text' : 'password'} value={pw} onChange={(e) => setPw(e.target.value)} placeholder="Enter the password" autoComplete="off" aria-label="Vault password" maxLength={200} />
                <button type="button" onClick={() => setShow(!show)} aria-label={show ? 'Hide password' : 'Show password'}>{show ? '🙈' : '👁️'}</button>
              </div>
              {err && <p className="err" role="alert">{err}</p>}
              <button className="btn" disabled={busy || !pw}>{busy ? 'Checking clearance…' : 'Unlock 🔓'}</button>
            </form>
          )}
        </div>
      ) : (
        <div className="vault-open">
          {!items.length && <p className="hand">The vault is empty. Add private media to the server (see README).</p>}
          {!!photos.length && <div className="polaroids">{photos.map((p, i) => (
            <figure className="polaroid" key={p.id} style={{ '--r': `${((i * 37) % 9) - 4}deg` }}>
              <span className="tape" /><img src={p.url} alt={p.caption} onError={refresh} onContextMenu={(e) => e.preventDefault()} draggable="false" />
              {p.caption && <figcaption className="hand">{p.caption}</figcaption>}
            </figure>))}</div>}
          {!!videos.length && <div className="videos">{videos.map((v) => (
            <div key={v.id}><Player src={v.url} onError={refresh} />{v.caption && <p className="hand">{v.caption}</p>}</div>))}</div>}
        </div>
      )}
    </section>
  );
}
