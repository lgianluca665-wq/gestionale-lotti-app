// Service worker minimo della pagina di avvio: serve ad Android per proporre "Installa app"
// e mostra un messaggio chiaro quando manca la connessione. Non memorizza dati dell'app.
const PAGINA_OFFLINE = '<!DOCTYPE html><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">' +
  '<body style="font-family:system-ui,sans-serif;display:flex;align-items:center;justify-content:center;height:100vh;' +
  'margin:0;text-align:center;padding:24px;color:#1c221f"><div><div style="font-size:48px">📶</div>' +
  '<h2>Nessuna connessione</h2><p>Il gestionale ha bisogno di internet. Controlla il Wi-Fi o i dati e riprova.</p>' +
  '<button onclick="location.reload()" style="padding:12px 20px;font-size:16px;border-radius:12px;border:0;' +
  'background:#1f6f4a;color:#fff">Riprova</button></div></body>';

self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', (e) => e.waitUntil(self.clients.claim()));
self.addEventListener('fetch', (e) => {
  if (e.request.mode !== 'navigate') return;
  e.respondWith(fetch(e.request).catch(() => new Response(PAGINA_OFFLINE, { headers: { 'Content-Type': 'text/html; charset=utf-8' } })));
});
