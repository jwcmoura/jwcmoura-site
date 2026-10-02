  (function () {
    if (!('IntersectionObserver' in window)) return;
    var groups = [
      { box: '.timeline', item: '.tl-item' },
      { box: '.area-cats', item: '.area-tile' }
    ];
    document.documentElement.classList.add('js-reveal');
    groups.forEach(function (g) {
      var box = document.querySelector(g.box);
      if (!box) return;
      var cards = Array.prototype.slice.call(box.querySelectorAll(g.item));
      var io = new IntersectionObserver(function (entries) {
        var cols = getComputedStyle(box).gridTemplateColumns.split(' ').length || 1;
        entries.forEach(function (e) {
          if (!e.isIntersecting) return;
          var el = e.target;
          el.style.transitionDelay = ((cards.indexOf(el) % cols) * 180) + 'ms';
          el.classList.add('is-in');
          io.unobserve(el);
        });
      }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
      cards.forEach(function (c) { io.observe(c); });
    });
  })();

