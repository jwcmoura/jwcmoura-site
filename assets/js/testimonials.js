  // Cascata dos comentários: cada card cobre o anterior, que fica um pouco menor e visível por baixo
  (function () {
    var box = document.getElementById('testiStack');
    if (!box) return;
    var cards = Array.prototype.slice.call(box.querySelectorAll('.testi'));
    cards.forEach(function (c, i) { c.style.setProperty('--i', i); });
    var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) return;
    var ticking = false;
    function update() {
      ticking = false;
      var cs = getComputedStyle(box);
      var base = parseFloat(cs.getPropertyValue('--stack-top')) || 104;
      var step = parseFloat(cs.getPropertyValue('--stack-step')) || 20;
      var depth = 0;
      for (var i = cards.length - 1; i >= 0; i--) {
        var el = cards[i];
        el.style.transform = depth > 0 ? 'scale(' + Math.max(0.86, 1 - depth * 0.035).toFixed(4) + ')' : '';
        el.style.filter = depth > 0 ? 'brightness(' + Math.max(0.9, 1 - depth * 0.03).toFixed(3) + ')' : '';
        // quanto este card já cobriu o anterior (0 a 1)
        var top = el.getBoundingClientRect().top;
        var pinned = base + i * step;
        var h = el.offsetHeight || 1;
        var prog = Math.min(1, Math.max(0, (window.innerHeight - top) / (window.innerHeight - pinned)));
        if (top <= pinned + 0.5) prog = 1;
        depth += (i > 0 ? prog : 0);
      }
    }
    function onScroll() { if (!ticking) { ticking = true; requestAnimationFrame(update); } }
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    update();
  })();

