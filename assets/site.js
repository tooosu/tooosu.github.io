// 海賊酒場Tooosu 動きのファイル（ふわっと出る・ヘッダーが細くなる）
(function () {
  // ヘッダー：少しスクロールしたら細くして、背景を敷く
  var hd = document.getElementById('hd');
  function onScroll() { if (hd) hd.classList.toggle('small', window.scrollY > 40); }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // スマホ・タブレットのメニュー：ボタンで開け閉め。リンクを押したら閉じる
  var btn = document.querySelector('.hd-menu'), nav = document.getElementById('hd-nav');
  if (btn && nav) {
    btn.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
      if (open && hd) hd.classList.add('small');
    });
    nav.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () { nav.classList.remove('open'); btn.setAttribute('aria-expanded', 'false'); });
    });
  }

  // ふわっと出る：同じ章の中では0.06秒ずつずらす
  var items = document.querySelectorAll('.rv');
  if (!('IntersectionObserver' in window)) { items.forEach(function (el) { el.classList.add('in'); }); return; }
  document.querySelectorAll('section').forEach(function (sec) {
    sec.querySelectorAll('.rv').forEach(function (el, i) { el.style.setProperty('--d', Math.min(i, 6) * 0.06 + 's'); });
  });
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
  }, { rootMargin: '0px 0px -8% 0px' });
  items.forEach(function (el) { io.observe(el); });
})();
