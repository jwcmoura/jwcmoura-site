(function(){
var URL_='https://jwcmoura.com.br/', TITLE='JWCMOURA ADVOCACIA | Advogado OAB/PB';
var btn=document.getElementById('shareBtn'), menu=document.getElementById('shareMenu'), toast=document.getElementById('shareToast'), sel=document.getElementById('langSel');
var L={pt:{share:'Compartilhar',copy:'Copiar link',ok:'Link copiado!',ig:'Link copiado! Cole no Instagram.'},
       en:{share:'Share',copy:'Copy link',ok:'Link copied!',ig:'Link copied! Paste it on Instagram.'},
       es:{share:'Compartir',copy:'Copiar enlace',ok:'¡Enlace copiado!',ig:'¡Enlace copiado! Pégalo en Instagram.'},
       fr:{share:'Partager',copy:'Copier le lien',ok:'Lien copié !',ig:'Lien copié ! Collez-le sur Instagram.'}};
function lg(){return L[sel&&sel.value]||L.pt;}
function labels(){var t=lg(); btn.setAttribute('aria-label',t.share); btn.title=t.share; var c=menu.querySelector('[data-sh="copy"] span'); if(c)c.textContent=t.copy;}
function open(o){menu.hidden=!o; btn.setAttribute('aria-expanded',o?'true':'false'); if(o)labels();}
function say(m){toast.textContent=m; toast.classList.add('on'); setTimeout(function(){toast.classList.remove('on');},2400);}
function copy(cb){
  function fb(){try{var a=document.createElement('textarea');a.value=URL_;a.style.position='fixed';a.style.opacity='0';document.body.appendChild(a);a.select();var ok=document.execCommand('copy');document.body.removeChild(a);cb(ok);}catch(e){cb(false);}}
  if(navigator.clipboard&&navigator.clipboard.writeText){navigator.clipboard.writeText(URL_).then(function(){cb(true);},fb);} else fb();
}
btn.addEventListener('click',function(e){e.stopPropagation(); open(menu.hidden);});
document.addEventListener('click',function(e){if(!menu.hidden&&!menu.contains(e.target))open(false);});
document.addEventListener('keydown',function(e){if(e.key==='Escape')open(false);});
menu.addEventListener('click',function(e){
  var it=e.target.closest('.sh-item'); if(!it) return; var k=it.getAttribute('data-sh'), u=encodeURIComponent(URL_), t=encodeURIComponent(TITLE);
  var links={wa:'https://wa.me/?text='+t+'%20'+u, x:'https://twitter.com/intent/tweet?text='+t+'&url='+u, tg:'https://t.me/share/url?url='+u+'&text='+t};
  open(false);
  if(k==='copy'){copy(function(ok){say(ok?lg().ok:URL_);});}
  else if(k==='ig'){copy(function(ok){say(ok?lg().ig:URL_); setTimeout(function(){window.open('https://www.instagram.com/','_blank','noopener');},900);});}
  else window.open(links[k],'_blank','noopener');
});
if(sel) sel.addEventListener('change',labels); labels();
})();
