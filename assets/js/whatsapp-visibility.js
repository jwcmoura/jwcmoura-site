  // Mostra o WhatsApp flutuante ao chegar em "Como funciona o atendimento"; esconde ao voltar ao início
  (function () {
    var wa = document.querySelector('.wa-float');
    var alvo = document.getElementById('como');
    if (!wa || !alvo) return;
    var ticking = false;
    function check() {
      ticking = false;
      var top = alvo.getBoundingClientRect().top;
      wa.classList.toggle('show', top <= window.innerHeight * 0.6);
    }
    function onScroll() { if (!ticking) { ticking = true; requestAnimationFrame(check); } }
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    check();
  })();

