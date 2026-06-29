(function(){
  var DEFAULT_PROFILE={
    short:'Hello. I normally speak, but today I need to use this communication app because autistic burnout, fatigue, brain fog, pain, dizziness, anxiety or PEM may affect my speech and processing. Please communicate in writing where possible, ask one question at a time, and allow extra processing time. I may mask, so my difficulties may not be obvious.',
    quick:'Hello. My name is Menglu Liu.\n\nI am using this communication app today because autistic burnout, fatigue, anxiety, pain, dizziness, brain fog or post-exertional malaise may affect my speech, processing and ability to explain things reliably.\n\nI normally speak, but during these periods I may need AAC, typing, written communication, or support from my mum.\n\nI am autistic and have ME/CFS with PEM, POTS or orthostatic intolerance, hypermobility with suspected hEDS/HSD, anxiety, IBS, TMJ problems, Burning Mouth Syndrome, allergic rhinitis, PMDD, and other long-term health issues.\n\nMy main difficulties are processing spoken information, communication, executive functioning, severe fatigue, brain fog, dizziness, sensory overload, planning, follow-up, remembering, decision-making and travel.\n\nPlease use written communication where possible. Telephone calls are not accessible or safe for me.\n\nPlease ask one question at a time, allow extra processing time, and provide a written summary, Easy Read information, visual aids, or a body chart if available.\n\nI may appear calmer or more capable than I feel because I mask. Please assess me using my functional difficulties, not only my appearance.\n\nIf possible, please minimise appointments and repeated tests, combine things where clinically appropriate, and allow recovery time afterwards.\n\nThank you.',
    adjustments:'Please use written communication where possible. Telephone calls are not accessible or safe for me. Please ask one question at a time, use simple language, allow extra processing time, and provide a written summary, Easy Read information, visual aids or a body chart where helpful. I may mask, so please assess functional difficulties rather than appearance.',
    emergency:'I may not be able to speak right now. Please read this screen. I am autistic and have POTS, ME/CFS, communication difficulties and hypermobility. If I feel faint, dizzy, overwhelmed or in shutdown, please help me sit or lie down safely, reduce noise and questions, and use short written sentences. Please contact my mum or support person if possible. If this is a medical emergency, please call 999.',
    mum:'妈妈，简单说：我可能因为自闭症过载、疲劳、POTS、脑雾、疼痛、焦虑或 PEM，暂时说话和处理信息困难。请不要连续追问。一次只说一件事。重要事情请写下来。请不要让我打电话。'
  };
  function jget(k,d){try{return JSON.parse(localStorage[k]||JSON.stringify(d))}catch(e){return d}}
  function esc(s){return String(s||'').replace(/[&<>]/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;'}[c]})}
  function latestObject(){return jget('uos_objects',[])[0]||jget('uos_last',null)}
  function profile(){return jget('uos_profile_passport',DEFAULT_PROFILE)}
  function say(t){
    var box=document.getElementById('spokenText');
    if(box) box.textContent=t;
    if(window.speakText) window.speakText(t);
    else if(window.speechSynthesis){try{speechSynthesis.cancel();var u=new SpeechSynthesisUtterance(t);u.rate=.92;speechSynthesis.speak(u)}catch(e){}}
  }
  function copy(t){navigator.clipboard?.writeText(t).catch(function(){});}
  function btn(label,text,cls){
    var b=document.createElement('button');
    b.className='btn '+(cls||'');
    b.innerHTML=label+'<small>'+esc(String(text).slice(0,70))+'</small>';
    b.addEventListener('click',function(){say(text)});
    return b;
  }
  function showProfile(){
    var p=profile();
    var content=document.getElementById('content');
    if(!content) return;
    content.innerHTML='<div class="section-card"><div class="section">👤 About Me / Profile Passport</div><p class="hint">One button to show or speak a brief conditions, needs and reasonable-adjustments summary.</p><div class="grid" id="profileGrid"></div></div>';
    var g=document.getElementById('profileGrid');
    g.appendChild(btn('🗣 Speak 60s Profile',p.quick,'primary'));
    g.appendChild(btn('🟢 Speak 15s Summary',p.short,'green'));
    g.appendChild(btn('🚨 Emergency Summary',p.emergency,'red'));
    g.appendChild(btn('📋 Adjustments',p.adjustments,''));
    g.appendChild(btn('👩 中文给妈妈',p.mum,'purple'));
    var full=document.createElement('button');full.className='btn';full.innerHTML='📱 Full Profile Page<small>Open the PA profile passport.</small>';full.addEventListener('click',function(){location.href='pa/profile.html'});g.appendChild(full);
    var c=document.createElement('button');c.className='btn';c.innerHTML='📋 Copy 60s Profile<small>Copy text for appointments or reception.</small>';c.addEventListener('click',function(){copy(p.quick);say('Profile copied. Please review before sending.')});g.appendChild(c);
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
    if(!top)return;
    if(!document.getElementById('profileBtn')){var p=document.createElement('button');p.id='profileBtn';p.textContent='👤 About Me';p.addEventListener('click',showProfile);top.appendChild(p)}
    if(!document.getElementById('mellowOSBtn')){var b=document.createElement('button');b.id='mellowOSBtn';b.textContent='🧩 Latest PA Object';b.addEventListener('click',showLatestPAObject);top.appendChild(b)}
  }
  window.MellowOS={showLatestPAObject:showLatestPAObject,showProfile:showProfile};
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',addOSButton);else addOSButton();
})();