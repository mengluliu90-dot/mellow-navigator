(function(){
  function jget(k,d){try{return JSON.parse(localStorage[k]||JSON.stringify(d))}catch(e){return d}}
  function esc(s){return String(s||'').replace(/[&<>]/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;'}[c]})}
  function latestObject(){return jget('uos_objects',[])[0]||jget('uos_last',null)}
  function say(t){
    var box=document.getElementById('spokenText');
    if(box) box.textContent=t;
    if(window.speakText) window.speakText(t);
    else if(window.speechSynthesis){try{speechSynthesis.cancel();speechSynthesis.speak(new SpeechSynthesisUtterance(t))}catch(e){}}
  }
  function btn(label,text,cls){
    var b=document.createElement('button');
    b.className='btn '+(cls||'');
    b.innerHTML=label+'<small>'+esc(text.slice(0,70))+'</small>';
    b.addEventListener('click',function(){say(text)});
    return b;
  }
  function showLatestPAObject(){
    var obj=latestObject();
    var content=document.getElementById('content');
    if(!content) return;
    if(!obj){
      content.innerHTML='<div class="section-card"><div class="section">🧩 PA Object</div><p class="hint">No PA object found yet. Go to PA, paste something into Intake, then return here.</p><button class="btn" id="goPA">Open PA</button></div>';
      document.getElementById('goPA').addEventListener('click',function(){location.href='pa/'});
      return;
    }
    var event=obj.event_type||obj.type||'Latest PA item';
    var cases=(obj.caseNames||obj.cases||[]).join(' / ')||'General';
    var draft=(obj.draft_object&&obj.draft_object.layers&&obj.draft_object.layers.professional)||obj.draft||'';
    var easy=(obj.draft_object&&obj.draft_object.layers&&obj.draft_object.layers.easy_read_summary)||('This is about '+cases+'. Next step: '+(obj.next||'Check PA.'));
    var mum=(obj.draft_object&&obj.draft_object.layers&&obj.draft_object.layers.chinese_summary_for_mum)||obj.mum||'妈妈：PA 已经处理并保存最新事项。';
    var aac=(obj.draft_object&&obj.draft_object.layers&&obj.draft_object.layers.aac_card)||'I use this communication tool because speaking or processing may be difficult. Please use written communication, one question at a time, and give me extra time.';
    var next=obj.next||'Use the safest prepared script.';
    content.innerHTML='<div class="section-card"><div class="section">🧩 Latest PA Object → Mellow</div><p class="hint"><b>Event:</b> '+esc(event)+'<br><b>Case:</b> '+esc(cases)+'<br><b>Next:</b> '+esc(next)+'</p><div class="grid" id="osGrid"></div></div>';
    var g=document.getElementById('osGrid');
    g.appendChild(btn('🗣 AAC Card',aac,'primary'));
    g.appendChild(btn('📝 Easy Read',easy,'green'));
    g.appendChild(btn('👩 Mum Chinese',mum,'purple'));
    if(draft) g.appendChild(btn('📋 Professional Draft',draft,''));
    g.appendChild(btn('🚫 Written / No Phone','Please communicate with me in writing. Telephone contact is not accessible or safe for me.','red'));
    g.appendChild(btn('⏸ Need Break','I need a break now. Please give me quiet time and do not ask more questions yet.','red'));
  }
  function addOSButton(){
    var top=document.querySelector('.top');
    if(!top||document.getElementById('mellowOSBtn'))return;
    var b=document.createElement('button');
    b.id='mellowOSBtn';
    b.textContent='🧩 Latest PA Object';
    b.addEventListener('click',showLatestPAObject);
    top.appendChild(b);
  }
  window.MellowOS={showLatestPAObject:showLatestPAObject};
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',addOSButton);else addOSButton();
})();