(function(){
var PM=window.SiteData.protective_measures, CH={"pt": {"step": "Etapa", "of": "de", "next": "Próxima etapa", "cta": "Falar sobre esta etapa", "hint": "Deslize para o lado para ver cada etapa", "close": "Fechar", "prev": "Etapa anterior", "btn": ["Requerer medida", "Revogar medida"]}, "en": {"step": "Stage", "of": "of", "next": "Next stage", "cta": "Talk about this stage", "hint": "Swipe sideways to see each stage", "close": "Close", "prev": "Previous stage", "btn": ["Request protection", "Revoke protection"]}, "es": {"step": "Etapa", "of": "de", "next": "Siguiente etapa", "cta": "Hablar sobre esta etapa", "hint": "Desliza hacia el lado para ver cada etapa", "close": "Cerrar", "prev": "Etapa anterior", "btn": ["Solicitar medida", "Revocar medida"]}, "fr": {"step": "Étape", "of": "sur", "next": "Étape suivante", "cta": "Parler de cette étape", "hint": "Faites défiler sur le côté pour voir chaque étape", "close": "Fermer", "prev": "Étape précédente", "btn": ["Demander la mesure", "Révoquer la mesure"]}};
var sel=document.getElementById('langSel'), key='req', cur=0;
var m=document.createElement('div'); m.className='flow-modal pm'; m.setAttribute('role','dialog'); m.setAttribute('aria-modal','true');
m.innerHTML='<button type="button" class="flow-close">×</button><div class="flow-top"><h3></h3><p></p></div><div class="flow-steps"></div><div class="flow-stage"><button type="button" class="flow-arrow prev">‹</button><div class="flow-track"></div><button type="button" class="flow-arrow next">›</button></div><p class="flow-hint"></p>';
document.body.appendChild(m);
var q=function(c){return m.querySelector(c);}, track=q('.flow-track'), steps=q('.flow-steps'), head=q('.flow-top h3'), sub=q('.flow-top p'), hint=q('.flow-hint'), prev=q('.flow-arrow.prev'), next=q('.flow-arrow.next'), closeB=q('.flow-close'),
    stack=CardStack(track,{onChange:function(i,user){setActive(i); if(user) hint.classList.add('off');}});
function L(){return (sel&&sel.value)||'pt';}
function P(){var l=L(); return PM[key][l]||PM[key].pt;}
function C(){return CH[L()]||CH.pt;}
function esc(t){return String(t).replace(/&/g,'&amp;').replace(/</g,'&lt;');}
function build(k){
  var t=P(), c=C(), n=t.items.length;
  head.textContent=t.head; sub.textContent=t.sub; hint.textContent=c.hint; closeB.setAttribute('aria-label',c.close); prev.setAttribute('aria-label',c.prev); next.setAttribute('aria-label',c.next);
  steps.innerHTML=t.items.map(function(it,i){return '<button type="button" class="fs-dot" data-i="'+i+'" aria-label="'+esc(c.step+' '+(i+1)+': '+it[1])+'">'+(i+1)+'</button>'+(i<n-1?'<span class="fs-line"></span>':'');}).join('');
  track.innerHTML=t.items.map(function(it,i){
    var nx=i<n-1?'<button type="button" class="fnext" data-go="'+(i+1)+'">'+esc(c.next)+': '+esc(t.items[i+1][1])+' →</button>':'<span class="fnext" style="cursor:default">'+esc(t.last)+'</span>';
    var msg=encodeURIComponent('Olá! Gostaria de orientação sobre Medidas Protetivas de Urgência: '+PM[key].pt.items[i][1]+'.');
    return '<article class="fcard"><span class="fnum">'+String(i+1).padStart(2,'0')+'</span><div class="fmeta"><span class="fphase">'+esc(it[0])+'</span><span class="fstep">'+esc(c.step)+' '+(i+1)+' '+esc(c.of)+' '+n+'</span></div><h4>'+esc(it[1])+'</h4><p>'+esc(it[2])+'</p><div class="fbar"><i style="width:'+Math.round((i+1)/n*100)+'%"></i></div><div class="ffoot">'+nx+'<a class="fcta" href="https://wa.me/5583998908488?text='+msg+'" target="_blank" rel="noopener">'+esc(c.cta)+'</a></div></article>';
  }).join('');
  stack.refresh(k||0);
}
function setActive(i){cur=i; var d=steps.querySelectorAll('.fs-dot'), ln=steps.querySelectorAll('.fs-line');
  [].forEach.call(d,function(x,k){x.classList.toggle('active',k===i); x.classList.toggle('done',k<i);}); [].forEach.call(ln,function(x,k){x.classList.toggle('done',k<i);});
}
function go(i){stack.go(i);}
function open(k){key=k; build(0); m.classList.add('show'); document.body.style.overflow='hidden'; hint.classList.remove('off');}
function close(){m.classList.remove('show'); document.body.style.overflow='';}
prev.addEventListener('click',function(){stack.prev();}); next.addEventListener('click',function(){stack.next();});
steps.addEventListener('click',function(e){var b=e.target.closest('.fs-dot'); if(b) go(+b.getAttribute('data-i'));});
track.addEventListener('click',function(e){var b=e.target.closest('[data-go]'); if(b) go(+b.getAttribute('data-go'));});
closeB.addEventListener('click',close);
m.addEventListener('click',function(e){if(stack.dragged()) return; if(!e.target.closest('.fcard,.fs-dot,.flow-arrow,.flow-close,.flow-top')) close();});
document.addEventListener('keydown',function(e){if(!m.classList.contains('show')) return; if(e.key==='Escape') close(); else if(e.key==='ArrowRight') stack.next(); else if(e.key==='ArrowLeft') stack.prev();});
[].forEach.call(document.querySelectorAll('.pm-open'),function(b){b.addEventListener('click',function(){open(b.getAttribute('data-pm'));});});
function labels(){var c=C(); [].forEach.call(document.querySelectorAll('.pm-open'),function(b){b.textContent=c.btn[b.getAttribute('data-pm')==='req'?0:1];});}
labels();
if(sel) sel.addEventListener('change',function(){labels(); if(m.classList.contains('show')){build(cur);}});
})();
