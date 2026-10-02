(function(){
var root=document.documentElement, btn=document.getElementById('themeBtn');
try{ if(localStorage.getItem('site-theme')==='light') root.setAttribute('data-theme','light'); }catch(e){}
btn.addEventListener('click',function(){
  var light=root.getAttribute('data-theme')==='light';
  if(light) root.removeAttribute('data-theme'); else root.setAttribute('data-theme','light');
  try{ localStorage.setItem('site-theme', light?'dark':'light'); }catch(e){}
});
})();
