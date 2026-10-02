(function(){
var m=document.getElementById('wtModal'), n=document.getElementById('navWillTag');
function open(e){e.preventDefault();m.classList.add('show');}
function close(){m.classList.remove('show');}
n.addEventListener('click',open);
document.getElementById('wtClose').addEventListener('click',close);
m.addEventListener('click',function(e){if(e.target===m&&!m.classList.contains('inline'))close();});
document.addEventListener('keydown',function(e){if(e.key==='Escape')close();});
// cascata dos benefícios (mesmo efeito dos comentários do Google)
var box=document.getElementById('benefitStack'); if(!box) return;
var cards=[].slice.call(box.querySelectorAll('.benefit'));
cards.forEach(function(c,i){c.style.setProperty('--i',i);});
if(window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
var tick=false;
function update(){
  tick=false; var cs=getComputedStyle(box);
  var base=parseFloat(cs.getPropertyValue('--stack-top'))||104, step=parseFloat(cs.getPropertyValue('--stack-step'))||20, depth=0;
  for(var i=cards.length-1;i>=0;i--){
    var el=cards[i];
    el.style.transform=depth>0?'scale('+Math.max(0.86,1-depth*0.035).toFixed(4)+')':'';
    el.style.filter=depth>0?'brightness('+Math.max(0.9,1-depth*0.03).toFixed(3)+')':'';
    var top=el.getBoundingClientRect().top, pinned=base+i*step;
    var prog=Math.min(1,Math.max(0,(window.innerHeight-top)/(window.innerHeight-pinned)));
    if(top<=pinned+0.5) prog=1;
    depth+=(i>0?prog:0);
  }
}
function on(){if(!tick){tick=true;requestAnimationFrame(update);}}
window.addEventListener('scroll',on,{passive:true}); window.addEventListener('resize',on); update();
})();
