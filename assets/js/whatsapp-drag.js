  // WhatsApp flutuante: arraste para qualquer canto da tela (toque ou mouse)
  (function () {
    var el = document.querySelector('.wa-float');
    if (!el) return;
    var dragging = false, moved = false, sx = 0, sy = 0, ox = 0, oy = 0, pid = null, placed = false;
    function clamp(v, min, max) { return Math.max(min, Math.min(max, v)); }
    function place(x, y) {
      var w = el.offsetWidth, h = el.offsetHeight;
      el.style.right = 'auto'; el.style.bottom = 'auto';
      el.style.left = clamp(x, 8, window.innerWidth - w - 8) + 'px';
      el.style.top = clamp(y, 8, window.innerHeight - h - 8) + 'px';
      placed = true;
    }
    function flipTip() {
      var r = el.getBoundingClientRect();
      el.classList.toggle('tip-right', (r.left + r.width / 2) < window.innerWidth / 2);
    }
    el.addEventListener('pointerdown', function (e) {
      if (e.pointerType === 'mouse' && e.button !== 0) return;
      var r = el.getBoundingClientRect();
      dragging = true; moved = false; sx = e.clientX; sy = e.clientY; ox = r.left; oy = r.top; pid = e.pointerId;
      try { el.setPointerCapture(pid); } catch (err) {}
    });
    el.addEventListener('pointermove', function (e) {
      if (!dragging) return;
      var dx = e.clientX - sx, dy = e.clientY - sy;
      if (!moved && Math.abs(dx) + Math.abs(dy) < 6) return;
      if (!moved) { moved = true; el.classList.add('dragging'); }
      place(ox + dx, oy + dy);
      e.preventDefault();
    });
    function end() {
      if (!dragging) return;
      dragging = false;
      try { el.releasePointerCapture(pid); } catch (err) {}
      el.classList.remove('dragging');
      if (moved) flipTip();
    }
    el.addEventListener('pointerup', end);
    el.addEventListener('pointercancel', end);
    // se arrastou, não abre o WhatsApp
    el.addEventListener('click', function (e) { if (moved) { e.preventDefault(); e.stopPropagation(); moved = false; } }, true);
    el.addEventListener('dragstart', function (e) { e.preventDefault(); });
    window.addEventListener('resize', function () {
      if (!placed) return;
      var r = el.getBoundingClientRect();
      place(r.left, r.top); flipTip();
    });
  })();

