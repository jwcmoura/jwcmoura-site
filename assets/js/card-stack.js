/* CardStack — cards empilhados: arraste o de cima e ele vai para o fim da fila.
   Uso: var s = CardStack(elemento, { onChange: function(indice, porUsuario){} });
        s.refresh(indiceInicial); s.next(); s.prev(); s.go(i); s.current(); s.dragged(); */
(function () {
  var VISIBLE = 3;                       // quantos cards aparecem "por trás" do primeiro
  var reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;

  function CardStack(box, opts) {
    opts = opts || {};
    var cards = [], order = [], n = 0, busy = false, st = null, justDragged = false;
    box.classList.add('card-stack');

    function top() { return cards[order[0]]; }
    function emit(user) { if (opts.onChange) opts.onChange(order[0], !!user); }

    function layout(skip) {
      order.forEach(function (ci, pos) {
        var c = cards[ci]; if (c === skip) return;
        c.style.setProperty('--p', pos);
        c.classList.toggle('is-top', pos === 0);
        c.classList.toggle('is-far', pos > VISIBLE);
        if (pos === 0) { c.removeAttribute('inert'); c.removeAttribute('aria-hidden'); }
        else { c.setAttribute('inert', ''); c.setAttribute('aria-hidden', 'true'); }
      });
    }

    function refresh(k) {
      cards = [].slice.call(box.children).filter(function (el) { return el.classList.contains('fcard'); });
      n = cards.length; order = []; k = Math.max(0, Math.min(n - 1, k || 0));
      for (var i = 0; i < n; i++) order.push((k + i) % n);
      cards.forEach(function (c) { ['--x', '--r', '--o'].forEach(function (v) { c.style.removeProperty(v); }); c.classList.remove('leaving', 'dragging'); });
      busy = false; layout(); emit(false);
    }

    // o card do topo sai pelo lado e entra atrás da fila
    function send(dir) {
      if (busy || n < 2) return; busy = true;
      var c = top(), w = c.offsetWidth;
      order.push(order.shift());
      c.classList.add('leaving');
      c.style.setProperty('--x', Math.round(dir * w * 0.72) + 'px');
      c.style.setProperty('--r', (dir * 9) + 'deg');
      layout(c); emit(true);
      setTimeout(function () {
        c.classList.remove('leaving');
        c.style.setProperty('--x', '0px'); c.style.setProperty('--r', '0deg');
        layout(); busy = false;
      }, reduce ? 0 : 260);
    }

    // o último da fila volta para o topo
    function back(dir) {
      if (busy || n < 2) return; busy = true;
      var c = cards[order[n - 1]], w = c.offsetWidth;
      order.unshift(order.pop());
      c.classList.add('no-anim', 'leaving');
      c.style.setProperty('--x', Math.round(-dir * w * 0.72) + 'px');
      c.style.setProperty('--r', (-dir * 9) + 'deg'); c.style.setProperty('--o', 0); c.style.setProperty('--p', 0);
      layout(c); emit(true);
      void c.offsetWidth;
      c.classList.remove('no-anim');
      c.style.setProperty('--x', '0px'); c.style.setProperty('--r', '0deg'); c.style.removeProperty('--o');
      setTimeout(function () { c.classList.remove('leaving'); layout(); busy = false; }, reduce ? 0 : 320);
    }

    function go(i) {
      var d = order.indexOf(i); if (d < 1 || busy) return;
      if (d === 1) return send(1);
      if (d === n - 1) return back(1);
      order = order.slice(d).concat(order.slice(0, d)); layout(); emit(true);
    }

    // ---- arrastar (mouse e toque) ----
    function drop(progress) {            // enquanto arrasta, os de trás "sobem" um pouco
      order.forEach(function (ci, pos) { if (pos > 0) cards[ci].style.setProperty('--p', Math.max(0, pos - progress)); });
    }
    box.addEventListener('pointerdown', function (e) {
      if (busy || n < 2 || (e.pointerType === 'mouse' && e.button !== 0)) return;
      var c = e.target.closest('.fcard'); if (!c || c !== top()) return;
      st = { id: e.pointerId, x: e.clientX, y: e.clientY, t: Date.now(), dx: 0, active: false, el: c, w: c.offsetWidth };
    });
    box.addEventListener('pointermove', function (e) {
      if (!st || e.pointerId !== st.id) return;
      var dx = e.clientX - st.x, dy = e.clientY - st.y;
      if (!st.active) {
        if (Math.abs(dy) > 10 && Math.abs(dy) > Math.abs(dx)) { st = null; return; }   // rolagem vertical da página
        if (Math.abs(dx) < 6) return;
        st.active = true; st.el.classList.add('dragging'); box.classList.add('stack-dragging');
        try { st.el.setPointerCapture(e.pointerId); } catch (_) {}
      }
      st.dx = dx;
      st.el.style.setProperty('--x', dx + 'px');
      st.el.style.setProperty('--r', (dx / st.w * 12).toFixed(2) + 'deg');
      drop(Math.min(1, Math.abs(dx) / (st.w * 0.6)));
    });
    function end(e, cancel) {
      if (!st || e.pointerId !== st.id) return;
      var s = st; st = null;
      if (!s.active) return;
      box.classList.remove('stack-dragging'); s.el.classList.remove('dragging');
      justDragged = true; setTimeout(function () { justDragged = false; }, 60);
      var v = s.dx / Math.max(1, Date.now() - s.t);
      if (!cancel && (Math.abs(s.dx) > s.w * 0.22 || (Math.abs(v) > 0.45 && Math.abs(s.dx) > 30))) {
        send(s.dx > 0 ? 1 : -1);
      } else {                              // soltou cedo: volta ao lugar
        s.el.style.setProperty('--x', '0px'); s.el.style.setProperty('--r', '0deg'); layout();
      }
    }
    box.addEventListener('pointerup', function (e) { end(e, false); });
    box.addEventListener('pointercancel', function (e) { end(e, true); });
    box.addEventListener('lostpointercapture', function (e) { end(e, false); });
    box.addEventListener('click', function (e) { if (justDragged) { e.preventDefault(); e.stopPropagation(); } }, true);
    box.addEventListener('dragstart', function (e) { e.preventDefault(); });

    return {
      refresh: refresh, go: go,
      next: function () { send(1); }, prev: function () { back(1); },
      current: function () { return order[0] || 0; },
      dragged: function () { return justDragged; }
    };
  }
  window.CardStack = CardStack;
})();
