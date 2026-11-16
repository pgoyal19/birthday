# Khushi's Birthday Site 🎀
React (Vite) frontend + Express API. Vault media stays on the server and is only streamed through a short-lived URL after the server verifies the password.

## Run it
```
npm install
cp .env.example .env       # then fill it in (below)
npm run dev                # site on http://localhost:5173
npm run build && npm start # production, one server on :8787
```

## Edit content (one file)
`src/content.js`: hero text, memes, photos, timeline, letter, quiz, reasons, compliments, finale and vault wording.
Put images in `public/photos`, `public/memes`; optional song in `public/music`.

## Set up the Secret Vault
1. Generate a password hash with `npm run hash -- "your-password"` and set `VAULT_PASSWORD_HASH` in `.env` (single quotes).
2. Set a long random `JWT_SECRET` in `.env`. Never commit `.env`.
3. Keep the private video at `server/private/01-a-memory-from-us.mp4`. This folder is ignored by Git to avoid publishing the video; copy it securely to that path on the server when deploying. The app serves it only through the password-protected API; do not move it to `public/` or import it into frontend code.
4. The vault displays this caption under the video: "ek kit kat ke liye jo backchodi peli tune bhaishab.........bhai but me toi pkka straigth hu😂".

## Security notes
- Password is checked server-side with bcrypt; only the hash is stored (env).
- 5 wrong attempts / 15 min / IP, plus a delay on each failure.
- The private file is outside the production static directory and denied by the Vite dev server. Media URLs require a 15-minute signed token issued only after password verification.
- Behind a proxy (Render, Railway, Fly), `trust proxy` is on so rate limiting sees real IPs. Serve over HTTPS.
- Honest limit: anyone who can watch or access the unlocked browser can record the video; no website can prevent that completely.
