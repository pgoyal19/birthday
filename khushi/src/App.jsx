import { useEffect, useState } from 'react';
import content from './content.js';
import { startMusic, stopMusic } from './lib/fx.js';
import Floaters from './components/Floaters.jsx';
import Landing from './components/Landing.jsx';
import Memes from './components/Memes.jsx';
import Scrapbook from './components/Scrapbook.jsx';
import Vault from './components/Vault.jsx';
import Letter from './components/Letter.jsx';
import Fun from './components/Fun.jsx';
import Finale from './components/Finale.jsx';

export default function App() {
  const [entered, setEntered] = useState(false);
  const [muted, setMuted] = useState(false);
  const [finale, setFinale] = useState(false);

  // Music only starts after the visitor clicks "Enter".
  const enter = () => { startMusic(content.musicUrl); setEntered(true); };
  useEffect(() => { if (entered) setTimeout(() => document.getElementById('memes')?.scrollIntoView({ behavior: 'smooth' }), 700); }, [entered]);
  const toggle = () => { muted ? startMusic(content.musicUrl) : stopMusic(); setMuted(!muted); };

  return (
    <>
      <Floaters />
      {entered && (
        <button className="mute" onClick={toggle} aria-label={muted ? 'Unmute music' : 'Mute music'}>
          {muted ? '🔇' : '🎵'}
        </button>
      )}
      <Landing onEnter={enter} entered={entered} />
      {entered && (
        <main>
          <Memes />
          <Scrapbook />
          <Vault />
          <Letter />
          <Fun onFinale={() => setFinale(true)} />
        </main>
      )}
      {finale && <Finale onClose={() => setFinale(false)} />}
    </>
  );
}
