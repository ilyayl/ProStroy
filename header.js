<script src="https://unpkg.com/@supabase/supabase-js@2"></script>
<script>
// === ВПИШИ СВОИ КЛЮЧИ СЮДА ===
const PROJECT_URL = "https://hvpbwpegxcbstmpngdyc.supabase.co";   // твой Supabase URL
const ANON_KEY    = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh2cGJ3cGVneGNic3RtcG5nZHljIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg2NDE4NjMsImV4cCI6MjA3NDIxNzg2M30.rtPrQVsaEFA-ee1RphLKKn8q3TSOXeapZnZgfe9HVws";              // твой anon public key
const supa = supabase.createClient(PROJECT_URL, ANON_KEY);

/** Загружает header.html и настраивает его */
async function loadHeader(targetId="site-header"){
  // найти контейнер
  const box = document.getElementById(targetId);
  if (!box) return;

  // загрузить HTML шапки
  const resp = await fetch("header.html", { cache:"no-store" });
  if (!resp.ok){
    box.innerHTML = "<div style='background:#300;color:#fff;padding:10px'>Ошибка: header.html не найден</div>";
    return;
  }
  box.innerHTML = await resp.text();

  // подсветить активный пункт меню
  const current = location.pathname.split("/").pop() || "main.html";
  const map = {
    "main.html"     : "logoLink",
    "requests.html" : "lnk-requests",
    "transport.html": "lnk-transport",
    "profile.html"  : "lnk-profile"
  };
  const activeId = map[current];
  if (activeId) {
    const activeEl = document.getElementById(activeId);
    if (activeEl) activeEl.classList.add("active");
  }

  // показать email пользователя, если авторизован
  const { data:{ user } } = await supa.auth.getUser();
  if (user) {
    const whoEl = document.getElementById("who");
    if (whoEl) whoEl.textContent = user.email;
  }
}
</script>
