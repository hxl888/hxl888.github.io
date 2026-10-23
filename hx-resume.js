(function () {
  function boot() {
    var root = document.getElementById('hx-resume');
    if (!root) return;
    if (root.getAttribute('data-hx-ready') === '1') return;
    root.setAttribute('data-hx-ready', '1');

    try {
      document.documentElement.classList.add('js');
    } catch (e) {}

    var nav = document.getElementById('hx-nav');
    var links = nav ? nav.querySelectorAll('.hx-nav__links a') : [];
    var sections = ['strengths', 'skills', 'experience', 'work', 'contact']
      .map(function (id) { return document.getElementById(id); })
      .filter(Boolean);

    function onScroll() {
      if (nav) {
        nav.classList.toggle('is-stuck', window.scrollY > 8);
      }
      var current = '';
      var y = window.scrollY + 96;
      sections.forEach(function (sec) {
        if (sec.offsetTop <= y) current = sec.id;
      });
      Array.prototype.forEach.call(links, function (a) {
        a.classList.toggle('is-active', a.getAttribute('href') === '#' + current);
      });
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    if ('IntersectionObserver' in window) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-in');
            io.unobserve(entry.target);
          }
        });
      }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
      Array.prototype.forEach.call(root.querySelectorAll('[data-reveal]'), function (el) {
        io.observe(el);
      });
    } else {
      Array.prototype.forEach.call(root.querySelectorAll('[data-reveal]'), function (el) {
        el.classList.add('is-in');
      });
    }

    var copyBtn = document.getElementById('hx-copy-mail');
    if (copyBtn && !copyBtn.getAttribute('data-bound')) {
      copyBtn.setAttribute('data-bound', '1');
      copyBtn.addEventListener('click', function () {
        var mail = '2653586693@qq.com';
        var done = function () {
          var old = copyBtn.textContent;
          copyBtn.textContent = '已复制';
          setTimeout(function () { copyBtn.textContent = old; }, 1600);
        };
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(mail).then(done).catch(done);
        } else {
          done();
        }
      });
    }
  }

  window.__hxResumeBoot = boot;

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
