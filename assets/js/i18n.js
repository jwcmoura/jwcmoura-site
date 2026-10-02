(function(){
var T=window.SiteData.i18n, L={en:0,es:1,fr:2};
function norm(t){return t.replace(/\s+/g,' ').trim();}
function run(l){
  var w=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT,{acceptNode:function(n){
    var p=n.parentNode; if(!p||/^(SCRIPT|STYLE|SELECT|OPTION|NOSCRIPT)$/.test(p.nodeName)) return NodeFilter.FILTER_REJECT;
    if(p.closest&&p.closest('#areaModal,.area-chips,.area-tile')) return NodeFilter.FILTER_REJECT;
    return NodeFilter.FILTER_ACCEPT;}});
  var n,list=[]; while((n=w.nextNode())) list.push(n);
  list.forEach(function(n){
    if(n.__o===undefined){var k=norm(n.nodeValue); if(!T[k]) return; n.__o=n.nodeValue; n.__k=k;}
    if(l==='pt'){n.nodeValue=n.__o; return;}
    var o=n.__o, lead=o.match(/^\s*/)[0], trail=o.match(/\s*$/)[0];
    n.nodeValue=lead+T[n.__k][L[l]]+trail;
  });
}
var sel=document.getElementById('langSel');
sel.addEventListener('change',function(){run(this.value);});
run(sel.value);
})();
