import 'dotenv/config';
import express from 'express';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import path from 'node:path';
import { access } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

const { VAULT_PASSWORD_HASH, JWT_SECRET, PORT = 8787 } = process.env;

if (!VAULT_PASSWORD_HASH || !JWT_SECRET) {
  console.error('Missing VAULT_PASSWORD_HASH or JWT_SECRET in .env');
  process.exit(1);
}

const serverDir = path.dirname(fileURLToPath(import.meta.url));
const privateVideoId = 'birthday-memory';
const privateVideoPath = path.join(serverDir, 'private', '01-a-memory-from-us.mp4');
const privateVideoCaption = 'ek kit kat ke liye jo backchodi peli tune bhaishab.........bhai but me toi pkka straigth hu😂';

const app = express();
app.set('trust proxy', 1);
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'"],
      imgSrc: ["'self'", 'data:', 'blob:', 'https:'],
      mediaSrc: ["'self'", 'blob:', 'https:'],
      styleSrc: ["'self'", "'unsafe-inline'", 'https://fonts.googleapis.com'],
      fontSrc: ['https://fonts.gstatic.com'],
      connectSrc: ["'self'"],
    },
  },
}));
app.use(express.json({ limit: '2kb' }));
app.use('/api', (_req, res, next) => { res.set('Cache-Control', 'no-store'); next(); });

// Max 5 wrong attempts per IP per 15 minutes (successful logins don't count).
const unlockLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, limit: 5, skipSuccessfulRequests: true,
  standardHeaders: true, legacyHeaders: false,
  message: { error: 'too_many_attempts' },
});

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

app.post('/api/vault/unlock', unlockLimiter, async (req, res) => {
  const pw = req.body?.password;
  if (typeof pw !== 'string' || !pw || pw.length > 200) return res.status(400).json({ error: 'bad_request' });
  const ok = await bcrypt.compare(pw, VAULT_PASSWORD_HASH);
  if (!ok) { await sleep(600); return res.status(401).json({ error: 'wrong_password' }); }
  const token = jwt.sign({ vault: true }, JWT_SECRET, { expiresIn: '30m' });
  res.json({ token });
});

function auth(req, res, next) {
  const m = /^Bearer (.+)$/.exec(req.get('Authorization') || '');
  try {
    const claims = jwt.verify(m?.[1] ?? '', JWT_SECRET);
    if (typeof claims === 'string' || claims.vault !== true) return res.status(401).json({ error: 'unauthorized' });
    next();
  }
  catch { res.status(401).json({ error: 'unauthorized' }); }
}

app.get('/api/vault/items', auth, async (_req, res) => {
  try {
    await access(privateVideoPath);
    const token = jwt.sign({ vault: true, media: privateVideoId }, JWT_SECRET, { expiresIn: '15m' });
    res.json({
      items: [{
        id: privateVideoId,
        type: 'video',
        caption: privateVideoCaption,
        url: `/api/vault/media/${privateVideoId}?token=${encodeURIComponent(token)}`,
      }],
    });
  } catch (e) {
    console.error('vault media lookup failed', e.name);
    res.status(503).json({ error: 'media_unavailable' });
  }
});

app.get(`/api/vault/media/${privateVideoId}`, (req, res) => {
  let claims;
  try {
    const token = typeof req.query.token === 'string' ? req.query.token : '';
    claims = jwt.verify(token, JWT_SECRET);
  } catch {
    return res.status(401).json({ error: 'unauthorized' });
  }
  if (typeof claims === 'string' || claims.vault !== true || claims.media !== privateVideoId) {
    return res.status(401).json({ error: 'unauthorized' });
  }

  res.set('Referrer-Policy', 'no-referrer');
  res.type('video/mp4');
  res.sendFile(privateVideoPath, (e) => {
    if (e) {
      console.error('private video delivery failed', e.name);
      if (!res.headersSent) res.status(503).json({ error: 'media_unavailable' });
    }
  });
});

const dist = path.join(serverDir, '../dist');
app.use(express.static(dist));
app.get('*', (_req, res, next) => res.sendFile(path.join(dist, 'index.html'), (err) => err && next()));

app.listen(PORT, () => console.log(`Server on :${PORT}`));
