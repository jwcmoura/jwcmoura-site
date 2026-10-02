(function(){
var D=window.SiteData.areas, UI={"en": ["Home", "About", "Practice areas", "How it works", "FAQ", "WhatsApp us ↗", "Law firm | Professional and confidential service", "Protecting your <em>freedom</em>, your family and your future.", "Strategic and humane legal work, focused on protecting your freedom and safeguarding your family rights. Based in João Pessoa, we provide specialized legal counsel throughout Paraíba and nationwide, working with technical rigor across the areas of law.", "WhatsApp — 24/7 service", "Explore my practice areas ↗", "First contact with complete secrecy and confidentiality.", "Practice", "Practice areas", "Cases that demand an immediate response and precise strategy, focused on protecting your rights.", "Learn more", "Talk now", "Highlight", "Talk on WhatsApp", "Objective:", "Are you facing a legal problem?", "Talk now in full confidence and get initial guidance on your case.", "Start a conversation on WhatsApp", "🔒 Your contact is confidential and protected by professional secrecy. Informational service, with no solicitation of clients (OAB Provision 205/2021).", "Select a division to see the details"], "es": ["Inicio", "Sobre mí", "Áreas de actuación", "Cómo funciona", "Preguntas", "Escríbenos por WhatsApp ↗", "Abogacía | Atención profesional y confidencial", "Protegiendo tu <em>libertad</em>, tu familia y tu futuro.", "Actuación jurídica estratégica y humanizada, orientada a proteger tu libertad y a resguardar tus derechos familiares. Con sede en João Pessoa, prestamos asesoría jurídica especializada en toda Paraíba y a nivel nacional, actuando con rigor técnico en las distintas áreas del Derecho.", "WhatsApp — Atención 24 h", "Conoce mis áreas ↗", "Primer contacto con total sigilo y confidencialidad.", "Actuación", "Áreas de actuación", "Casos que exigen respuesta inmediata y estrategia precisa, con foco en la protección de tus derechos.", "Saber más", "Hablar ahora", "Destacado", "Hablar por WhatsApp", "Objetivo:", "¿Estás pasando por un problema jurídico?", "Conversa ahora con total confidencialidad y recibe una primera orientación sobre tu caso.", "Iniciar conversación por WhatsApp", "🔒 Tu contacto es confidencial y está protegido por el secreto profesional. Atención informativa, sin captación de clientela (Provimento OAB 205/2021).", "Selecciona una división para ver los detalles"], "fr": ["Accueil", "À propos", "Domaines d'intervention", "Comment ça marche", "Questions", "Écrivez-nous sur WhatsApp ↗", "Cabinet d'avocat | Accompagnement professionnel et confidentiel", "Protéger votre <em>liberté</em>, votre famille et votre avenir.", "Une action juridique stratégique et humaine, tournée vers la protection de votre liberté et de vos droits familiaux. Basés à João Pessoa, nous offrons un conseil juridique spécialisé dans tout l'État de Paraíba et à l'échelle nationale, avec une rigueur technique dans les différents domaines du droit.", "WhatsApp — Disponible 24h/24", "Découvrir mes domaines ↗", "Premier contact en toute discrétion et confidentialité.", "Intervention", "Domaines d'intervention", "Des dossiers qui exigent une réponse immédiate et une stratégie précise, pour la protection de vos droits.", "En savoir plus", "Parler maintenant", "À la une", "Parler sur WhatsApp", "Objectif :", "Vous traversez un problème juridique ?", "Échangez maintenant en toute confidentialité et recevez une première orientation sur votre dossier.", "Démarrer la conversation sur WhatsApp", "🔒 Votre contact est confidentiel et protégé par le secret professionnel. Service informatif, sans démarchage (Provimento OAB 205/2021).", "Sélectionnez une division pour voir les détails"]}, SEL=[".nav-links li:nth-child(1) a", ".nav-links li:nth-child(2) a", ".nav-links li:nth-child(3) a", ".nav-links li:nth-child(4) a", ".nav-links li:nth-child(5) a", ".nav-links li.no-sel a", ".hero-eyebrow", "h1", ".hero .lead", "#btnWaHero", "#btnAreas", ".hero-note", "#areas .kicker", "#areas .sec-head h2", "#areas .sec-head p", ".area-open", ".area-actions .pill-line", ".area-badge", "#amWa", "", "#popup h3", "#popup .popup-card > p:not(.popup-privacy)", "#popup .btn-wa", ".popup-privacy"], PTUI=null;
var tiles=[].slice.call(document.querySelectorAll('.area-tile'));
var lang='pt', amOpenTile=-1;
// captura o texto original em PT
var orig=SEL.map(function(q){ if(!q) return null; var els=[].slice.call(document.querySelectorAll(q)); return els.map(function(e){return e.innerHTML;}); });
var areaEl=document.getElementById('areaModal'), body=document.getElementById('amBody');
function esc(t){return t.replace(/&/g,'&amp;').replace(/</g,'&lt;');}
var deck=null;
var SWIPE={pt:'Deslize o card para ver a próxima divisão',en:'Swipe the card to see the next division',es:'Desliza la tarjeta para ver la siguiente división',fr:'Faites glisser la carte pour voir la division suivante'};
function render(idx,start){
  var a=D[lang][idx], lab=(lang==='pt'?'Objetivo:':UI[lang][19]), n=a.g.length;
  document.getElementById('amTitle').textContent=a.t;
  var h=n>1?'<p class="am-hint">'+SWIPE[lang]+'</p>':'';
  h+='<div class="am-deck">'+a.g.map(function(g,i){
    return '<article class="fcard"><span class="fnum">'+String(i+1).padStart(2,'0')+'</span>'
      +(n>1?'<div class="fmeta"><span class="fstep">'+(i+1)+' / '+n+'</span></div>':'')
      +'<h4>'+esc(g[0])+'</h4>'
      +(g[1]?'<p class="am-obj">'+(g[1].charAt(0)==='!'?esc(g[1].slice(1)):lab+' '+esc(g[1]))+'</p>':'')
      +'<ul>'+g[2].map(function(it){var p=it.split('|');return '<li>'+(p.length>1?'<strong>'+esc(p[0])+':</strong> '+esc(p[1]):esc(it))+'</li>';}).join('')+'</ul></article>';
  }).join('')+'</div>';
  if(n>1) h+='<div class="flow-steps am-steps">'+a.g.map(function(g,i){return '<button type="button" class="fs-dot" data-i="'+i+'" aria-label="'+esc(g[0])+'">'+(i+1)+'</button>'+(i<n-1?'<span class="fs-line"></span>':'');}).join('')+'</div>';
  if(a.n) h+='<p class="am-note">'+esc(a.n)+'</p>';
  body.innerHTML=h;
  var box=body.querySelector('.am-deck'), dots=[].slice.call(body.querySelectorAll('.fs-dot')), lines=[].slice.call(body.querySelectorAll('.fs-line'));
  deck=CardStack(box,{onChange:function(i){
    dots.forEach(function(d,k){d.classList.toggle('active',k===i); d.classList.toggle('done',k<i);});
    lines.forEach(function(l,k){l.classList.toggle('done',k<i);});
  }});
  deck.refresh(start>0?start:0);
  dots.forEach(function(d){d.addEventListener('click',function(){deck.go(+d.getAttribute('data-i'));});});
}
document.addEventListener('keydown',function(e){
  if(!deck||!areaEl.classList.contains('show')||amOpenTile<0) return;
  if(e.key==='ArrowRight') deck.next(); else if(e.key==='ArrowLeft') deck.prev();
});
function openArea(idx,open){
  if(idx===0&&window.__openFlow){window.__openFlow();return;}
  amOpenTile=idx; render(idx,open);
  document.getElementById('amWa').href=tiles[idx].querySelector('.pill-line').href;
  areaEl.classList.add('show');
  (function(){var cs=getComputedStyle(tiles[idx]), card=areaEl.querySelector('.area-modal-card'), m=cs.color.match(/\d+/g)||[255,255,255];
    card.style.backgroundImage=cs.backgroundImage; card.style.backgroundColor=cs.backgroundColor; card.style.color=cs.color;
    card.classList.add('tinted'); card.classList.remove('txt-dark');})();
}
tiles.forEach(function(t,i){
  var ob=t.querySelector('.area-open'); if(ob) ob.addEventListener('click',function(){openArea(i,-1);});
});
function buildChips(){}
function apply(l){
  lang=l; var u=UI[l];
  SEL.forEach(function(q,k){
    if(!q||k===19) return;
    [].forEach.call(document.querySelectorAll(q),function(e,n){ e.innerHTML = (l==='pt') ? orig[k][n] : u[k]; });
  });
  tiles.forEach(function(t,i){ t.querySelector('h3').textContent=D[l][i].t; t.querySelector('.area-sub').textContent=D[l][i].s; });
  buildChips();
  document.documentElement.lang={pt:'pt-BR',en:'en',es:'es',fr:'fr'}[l];
  document.getElementById('langSel').value=l;
  if(areaEl.classList.contains('show')&&amOpenTile>-1) render(amOpenTile,deck?deck.current():0);
  try{localStorage.setItem('site-lang',l);}catch(e){}
}
document.getElementById('langSel').addEventListener('change',function(){apply(this.value);});
var saved='pt'; try{saved=localStorage.getItem('site-lang')||'pt';}catch(e){}
if(!UI[saved]&&saved!=='pt') saved='pt';
apply(saved);
})();
