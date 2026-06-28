function speak(t){
  const box=document.getElementById('spokenText');
  if(box) box.textContent=t;
  try{ if(typeof speakText==='function'){ speakText(t); return; } }catch(e){}
  try{
    if(!('speechSynthesis' in window)) return;
    speechSynthesis.cancel();
    const u=new SpeechSynthesisUtterance(String(t));
    u.lang=/[\u4e00-\u9fff]/.test(String(t))?'zh-CN':'en-GB';
    u.rate=.78;
    speechSynthesis.speak(u);
  }catch(e){}
}
window.speak=speak;
