<script>
// header.js — подключай на каждой странице после контейнера <div id="site-header"></div>
function base(path){
  const repo = '/ProStroy/';
  const prefix = location.pathname.startsWith(repo) ? repo : '/';
  return prefix + path;
}

async function loadHeader(targetId='site-header'){
  const box = document.getElementById(targetId);
  if (!box) return;
  try{
    const r = await fetch(base('header.html'), { cache:'no-store' });
    if (!r.ok) throw new Error('header.html not found');
    box.innerHTML = await r.text();

    // проставляем ссылки
    document.getElementById('logoLink')?.addEventListener('click', (e)=>{ e.preventDefault(); location.href = base('main.html'); });
    document.querySelectorAll('.nav a[data-file]').forEach(a=>{
      a.setAttribute('href', base(a.getAttribute('data-file')));
    });

    // подсветка активного
    const page = (location.pathname.split('/').pop() || 'main.html').toLowerCase();
    const map  = { 'requests.html':'lnk-requests','transport.html':'lnk-transport','pto.html':'lnk-pto','profile.html':'lnk-profile','main.html':'logoLink' };
    const id   = map[page]; if (id) document.getElementById(id)?.classList.add('active');

    // Кнопка "Выйти" — страница сама повесит обработчик (см. ниже), тут ничего не делаем
  }catch(e){
    console.error(e);
    box.innerHTML = '';
  }
}
</script>
