// header.js  (никаких <script> здесь быть не должно)

// === ВПИШИ СВОИ КЛЮЧИ ===
const PROJECT_URL = "https://hvpbwpegxcbstmpngdyc.supabase.co";
const ANON_KEY    = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh2cGJ3cGVneGNic3RtcG5nZHljIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg2NDE4NjMsImV4cCI6MjA3NDIxNzg2M30.rtPrQVsaEFA-ee1RphLKKn8q3TSOXeapZnZgfe9HVws";

// SDK Supabase уже загружен на странице, создаём клиент
window.supa = window.supabase.createClient(PROJECT_URL, ANON_KEY, {
  auth: { persistSession: true, storage: window.sessionStorage }
});

/** Подтягивает header.html и настраивает меню/имя пользователя */
async function loadHeader(targetId = "site-header") {
  const box = document.getElementById(targetId);
  if (!box) return;

  const resp = await fetch("header.html", { cache: "no-store" });
  if (!resp.ok) { box.innerHTML = ""; return; }
  box.innerHTML = await resp.text();

  // подсветим активный пункт
  const page = (location.pathname.split("/").pop() || "main.html").toLowerCase();
  const map  = { "requests.html":"lnk-requests", "transport.html":"lnk-transport", "profile.html":"lnk-profile" };
  const id   = map[page];
  if (id) document.getElementById(id)?.classList.add("active");

  // покажем email
  const { data:{ user } } = await supa.auth.getUser();
  if (user) {
    const who = document.getElementById("who");
    if (who) who.textContent = user.email;
  }
}
