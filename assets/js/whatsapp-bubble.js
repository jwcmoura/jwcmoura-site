(function(){
var el=document.querySelector('.wa-float'); if(!el) return;
var VISIBLE=5000, HIDDEN=5000, started=false, t;
el.classList.add('bubble-off');
function showB(){el.classList.remove('bubble-off'); t=setTimeout(hideB,VISIBLE);}
function hideB(){el.classList.add('bubble-off'); t=setTimeout(showB,HIDDEN);}
function start(){ if(started) return; started=true; clearTimeout(t); hideB(); }
if(el.classList.contains('show')) start();
else new MutationObserver(function(m,o){ if(el.classList.contains('show')){ o.disconnect(); start(); } }).observe(el,{attributes:true,attributeFilter:['class']});
})();
