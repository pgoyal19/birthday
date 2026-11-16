async function call(url, opts) {
  const r = await fetch(url, opts);
  const d = await r.json().catch(() => ({}));
  if (!r.ok) throw Object.assign(new Error(d.error || 'error'), { status: r.status });
  return d;
}
export const api = {
  unlock: (password) => call('/api/vault/unlock', {
    method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ password }),
  }),
  items: (token) => call('/api/vault/items', { headers: { Authorization: `Bearer ${token}` } }),
};
