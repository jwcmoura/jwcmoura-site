(function(){
var FLOW=window.SiteData.flow;
var m=document.getElementById('flowModal'), track=document.getElementById('flowTrack'), steps=document.getElementById('flowSteps'),
    head=document.getElementById('flowHead'), sub=document.getElementById('flowSub'), hint=document.getElementById('flowHint'),
    prev=document.getElementById('flowPrev'), next=document.getElementById('flowNext'), closeB=document.getElementById('flowClose'),
    sel=document.getElementById('langSel'), cur=0,
    stack=CardStack(track,{onChange:function(i,user){setActive(i); if(user) hint.classList.add('off');}});
function lang(){return FLOW[sel&&sel.value]||FLOW.pt;}
function esc(t){return String(t).replace(/&/g,'&amp;').replace(/</g,'&lt;');}
function build(k){
  var t=lang(), n=t.items.length, tile=document.querySelector('.area-tile'), cs=getComputedStyle(tile);
  head.textContent=t.head; sub.textContent=t.sub; hint.textContent=t.hint; closeB.setAttribute('aria-label',t.close);
  prev.setAttribute('aria-label',t.prev); next.setAttribute('aria-label',t.next);
  steps.innerHTML=t.items.map(function(it,i){return '<button type="button" class="fs-dot" data-i="'+i+'" aria-label="'+esc(t.step+' '+(i+1)+': '+it[1])+'">'+(i+1)+'</button>'+(i<n-1?'<span class="fs-line"></span>':'');}).join('');
  track.innerHTML=t.items.map(function(it,i){
    var nx=i<n-1?'<button type="button" class="fnext" data-go="'+(i+1)+'">'+esc(t.next)+': '+esc(t.items[i+1][1])+' →</button>':'<span class="fnext" style="cursor:default">'+esc(t.last)+'</span>';
    var msg=encodeURIComponent('Olá! Gostaria de orientação sobre: '+FLOW.pt.items[i][1]+' (Direito Penal e Processual Penal).');
    return '<article class="fcard'+(i===n-1?' is-red':'')+'"><span class="fnum">'+String(i+1).padStart(2,'0')+'</span><div class="fmeta"><span class="fphase">'+esc(it[0])+'</span><span class="fstep">'+esc(t.step)+' '+(i+1)+' '+esc(t.of)+' '+n+'</span></div>'
      +'<h4>'+esc(it[1])+'</h4><p>'+esc(it[2])+'</p><div class="fbar"><i style="width:'+Math.round((i+1)/n*100)+'%"></i></div>'
      +'<div class="ffoot">'+nx+'<a class="fcta" href="https://wa.me/5583998908488?text='+msg+'" target="_blank" rel="noopener">'+esc(t.cta)+'</a></div></article>';
  }).join('');
  [].forEach.call(track.children,function(c){c.style.backgroundImage=cs.backgroundImage; c.style.backgroundColor=cs.backgroundColor; c.style.color=cs.color;});
  stack.refresh(k||0);
}
function setActive(i){
  cur=i; var dots=steps.querySelectorAll('.fs-dot'), lines=steps.querySelectorAll('.fs-line');
  [].forEach.call(dots,function(d,k){d.classList.toggle('active',k===i); d.classList.toggle('done',k<i);});
  [].forEach.call(lines,function(l,k){l.classList.toggle('done',k<i);});
}
function go(i){stack.go(i);}
function open(){
  build(0); m.classList.add('show'); document.body.style.overflow='hidden'; hint.classList.remove('off');
}
function close(){m.classList.remove('show'); document.body.style.overflow='';}
window.__openFlow=open;
(function(){
  var tile=document.querySelector('.area-tile'), sub=tile&&tile.querySelector('.area-sub'); if(!sub) return;
  sub.insertAdjacentElement('afterend',m); m.classList.add('inline','show');
  build(0);
})();
prev.addEventListener('click',function(){stack.prev();}); next.addEventListener('click',function(){stack.next();});
steps.addEventListener('click',function(e){var b=e.target.closest('.fs-dot'); if(b) go(+b.getAttribute('data-i'));});
track.addEventListener('click',function(e){var b=e.target.closest('[data-go]'); if(b) go(+b.getAttribute('data-go'));});
closeB.addEventListener('click',close);
m.addEventListener('click',function(e){ if(stack.dragged()) return; if(m.classList.contains('inline')) return; if(!e.target.closest('.fcard,.fs-dot,.flow-arrow,.flow-close,.flow-top')) close(); });
document.addEventListener('keydown',function(e){ if(!m.classList.contains('show')||m.classList.contains('inline')) return;
  if(e.key==='Escape') close(); else if(e.key==='ArrowRight') stack.next(); else if(e.key==='ArrowLeft') stack.prev(); });
if(sel) sel.addEventListener('change',function(){ if(!m.classList.contains('show')) return; build(cur); });
})();
