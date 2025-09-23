// header.js  (никаких <script> здесь быть не должно)

// === ВПИШИ СВОИ КЛЮЧИ ===
const PROJECT_URL = "https://hvpbwpegxcbstmpngdyc.supabase.co";
const ANON_KEY    = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh2cGJ3cGVneGNic3RtcG5nZHljIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg2NDE4NjMsImV4cCI6MjA3NDIxNzg2M30.rtPrQVsaEFA-ee1RphLKKn8q3TSOXeapZnZgfe9HVws";

// ждём SDK и создаём клиент БЕЗ сохранения сессии
function waitSupabase() {
  return new Promise((resolve, reject) => {
    let t = 0;
    (function tick(){
      if (window.supabase) return resolve(window.supabase);
      if ((t += 50) > 2000) return reject(new Error("Supabase SDK not loaded"));
      setTimeout(tick, 50);
    })();
  });
}

async function makeClient() {
  const sdk = await waitSupabase();
  window.supa = sdk.createClient(PROJECT_URL, ANON_KEY, {
    auth: { persistSession: false } // ← ВСЕГДА просим логин
  });
}

async function loadHeader(targetId="site-header"){
  const box = document.getElementById(targetId);
  if (!box) return;
  try {
    const r = await fetch("header.html", { cache:"no-store" });
    box.innerHTML = await r.text();
    const page = (location.pathname.split("/").pop() || "main.html").toLowerCase();
    const map  = { "requests.html":"lnk-requests","transport.html":"lnk-transport","profile.html":"lnk-profile" };
    const id   = map[page]; if (id) document.getElementById(id)?.classList.add("active");
    const { data:{ user } } = await supa.auth.getUser();
    if (user) document.getElementById("who")?.textContent = user.email;
  } catch(e) { console.error(e); }
}

async function logout(){ try{ await supa.auth.signOut(); }catch{} location.href="index.html"; }

window.makeClient = makeClient;
window.loadHeader = loadHeader;
window.logout = logout;
