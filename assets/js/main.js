  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');
  hamburger.addEventListener('click', function () { navLinks.classList.toggle('open'); });
  navLinks.querySelectorAll('a').forEach(function (a) {
    a.addEventListener('click', function () { navLinks.classList.remove('open'); });
  });

  document.querySelectorAll('.faq-item').forEach(function (item) {
    const q = item.querySelector('.faq-q');
    const a = item.querySelector('.faq-a');
    q.addEventListener('click', function () {
      const isOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item').forEach(function (it) {
        it.classList.remove('open');
        it.querySelector('.faq-a').style.maxHeight = '0px';
      });
      if (!isOpen) {
        item.classList.add('open');
        a.style.maxHeight = a.scrollHeight + 'px';
      }
    });
  });
  document.querySelectorAll('.faq-item.open').forEach(function (item) {
    item.querySelector('.faq-a').style.maxHeight = item.querySelector('.faq-a').scrollHeight + 'px';
  });

  // Lead popup: mostra após 6s, no "exit intent" e ao chegar no final da rolagem
  var popup = document.getElementById('popup');
  var popupShown = false;
  function openPopup() {
    if (popupShown) return;
    popupShown = true;
    popup.classList.add('show');
  }
  function closePopup() { popup.classList.remove('show'); }
  document.getElementById('popupClose').addEventListener('click', closePopup);
  popup.addEventListener('click', function (e) { if (e.target === popup) closePopup(); });
  setTimeout(openPopup, 6000);
  document.addEventListener('mouseout', function (e) {
    if (!e.relatedTarget) openPopup();
  });
  // Também abre ao chegar no final da rolagem (uma vez), mesmo que já tenha aparecido antes
  var endPopupShown = false;
  window.addEventListener('scroll', function () {
    if (endPopupShown) return;
    var atEnd = window.innerHeight + window.pageYOffset >= document.documentElement.scrollHeight - 40;
    if (atEnd && document.documentElement.scrollHeight > window.innerHeight * 1.5) {
      endPopupShown = true;
      popupShown = true;
      popup.classList.add('show');
    }
  }, { passive: true });

  // Vídeo no hero: ao dar play abre um popup 1:1
  var heroAvatar = document.getElementById('heroAvatar');
  var videoModal = document.getElementById('videoModal');
  var videoFrame = document.getElementById('videoModalFrame');
  var VIDEO_ID = 'Bf0o_b6_7vg';
  var VIDEO_SRC = 'https://www.youtube.com/embed/' + VIDEO_ID + '?autoplay=1&playsinline=1&rel=0' +
    (/^https?:$/.test(location.protocol) ? '&origin=' + encodeURIComponent(location.origin) : '');
  function openVideo() {
    videoModal.hidden = false;
    requestAnimationFrame(function () { videoModal.classList.add('show'); });
    videoFrame.src = VIDEO_SRC;
    document.body.style.overflow = 'hidden';
  }
  function closeVideo() {
    videoModal.classList.remove('show');
    document.body.style.overflow = '';
    setTimeout(function () { videoModal.hidden = true; videoFrame.src = 'about:blank'; }, 250);
  }
  heroAvatar.addEventListener('click', openVideo);
  document.getElementById('videoModalClose').addEventListener('click', closeVideo);
  videoModal.addEventListener('click', function (e) { if (e.target === videoModal) closeVideo(); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && !videoModal.hidden) closeVideo(); });

  // Ao clicar em "Conheça minhas áreas": saudação de voz "Área criminal"
  function sayWelcome() {
    try {
      if ('speechSynthesis' in window) {
        speechSynthesis.cancel();
        var msg = new SpeechSynthesisUtterance('Bem vindo');
        msg.lang = 'pt-BR';
        msg.rate = 1;
        speechSynthesis.speak(msg);
      }
    } catch (e) { /* voice unavailable */ }
  }
  var btnAreas = document.getElementById('btnAreas');
  if (btnAreas) {
    btnAreas.addEventListener('click', function () {
      sayWelcome();
    });
  }

  // Botão WhatsApp: ao clicar fica vermelho e enche de verde da esquerda para a direita
  var btnWaHero = document.getElementById('btnWaHero');
  if (btnWaHero) {
    btnWaHero.addEventListener('click', function () {
      btnWaHero.classList.add('btn-wa-fill');
    });
  }

  // Áreas: "Saiba mais" abre a lista de temas
  var areaModal = document.getElementById('areaModal');
  function closeArea() { areaModal.classList.remove('show'); }
  document.getElementById('amClose').addEventListener('click', closeArea);
  areaModal.addEventListener('click', function (e) { if (e.target === areaModal) closeArea(); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeArea(); });

