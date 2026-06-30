// Menglu OS Interface Layer for Mellow Navigator
// Adds a low-friction home dashboard, form centre, and action mapping without changing the core topic engine.
(function(){
  function safeJSON(key,fallback){try{return JSON.parse(localStorage[key]||JSON.stringify(fallback))}catch(e){return fallback}}
  function statusText(){
    const recoveryUntil=Number(localStorage.mn_recovery_until||0);
    if(recoveryUntil && recoveryUntil>Date.now()) return 'Recovery active';
    return 'Ready';
  }
  function countTimeline(){return safeJSON('mira_next_timeline',[]).length}
  function handover(label,text){
    const payload='Menglu OS handover: '+label+'\n\n'+text;
    speak(payload);
    try{navigator.clipboard.writeText(payload)}catch(e){}
  }
  function statusCard(title,value,note,cls){
    const card=el('div','mini-card '+(cls||''));
    card.appendChild(el('strong','',title));
    card.appendChild(el('span','',value));
    if(note)card.appendChild(el('small','',note));
    return card;
  }
  function renderStatusDashboard(c){
    const wrap=el('section','section-card');
    wrap.appendChild(el('div','section','Menglu OS status'));
    wrap.appendChild(el('p','hint','Quick view only. No private records are stored here.'));
    const g=el('div','mini-grid');
    g.appendChild(statusCard('Current state',statusText(),statusText()==='Recovery active'?'Avoid complex admin':'Use one task at a time',statusText()==='Recovery active'?'warn':''));
    g.appendChild(statusCard('Saved items',String(countTimeline()),'Local device timeline only'));
    const active=safeJSON('mira_next_active_session',null);
    g.appendChild(statusCard('Continue',active?(active.domain||'Saved item'):'None','Last stopped item'));
    wrap.appendChild(g);
    const nav=el('div','grid');
    addButton(nav,'Open saved item',()=>State.go('LETTER'),'btn purple','Use PA / Mira bridge');
    addButton(nav,'Recovery mode',()=>State.go('RECOVERY'),'btn green','Reduce workload');
    addButton(nav,'Home',()=>State.go('HOME'));
    wrap.appendChild(nav);
    c.appendChild(wrap);
  }
  function renderIntake(c){
    const wrap=el('section','section-card priority');
    wrap.appendChild(el('div','section','Start here'));
    wrap.appendChild(el('p','hint','Choose the smallest useful action. Menglu OS routes the work to the right engine.'));
    const g=el('div','grid');
    addButton(g,'Paste message or email',()=>{location.href='pa/'},'btn purple','Executive Function + Output Engine');
    addButton(g,'Complete a form',()=>State.go('FORMS'),'btn green','Form Completion Pipeline');
    addButton(g,'Use communication cards',()=>State.go('TOPICS'),'btn','Mellow AAC');
    addButton(g,'I need rest',()=>State.go('RECOVERY'),'btn green','Recovery mode');
    wrap.appendChild(g);
    c.appendChild(wrap);
  }
  function renderQuickStatus(c){
    const wrap=el('section','section-card');
    wrap.appendChild(el('div','section','Quick status'));
    const g=el('div','mini-grid');
    g.appendChild(statusCard('State',statusText(),statusText()==='Recovery active'?'Low demand':'Ready'));
    g.appendChild(statusCard('Tasks',String(countTimeline()),'Saved locally'));
    g.appendChild(statusCard('Rule','One interface','Many engines'));
    wrap.appendChild(g);
    c.appendChild(wrap);
  }
  function renderActionMap(c){
    const wrap=el('section','section-card');
    wrap.appendChild(el('div','section','Choose what is happening'));
    wrap.appendChild(el('p','hint','Buttons map to existing Menglu OS engines.'));
    const g=el('div','grid');
    [['medical','Medical / Health'],['social','Social care'],['benefits','Benefits / PIP / UC'],['housing','Housing / Repairs'],['bank','Bank / Money'],['family','Family / Mum'],['reception','Reception / Front desk'],['emergency','Emergency / Accident']].forEach(([k,n])=>addButton(g,(TOPICS[k].icon||'')+' '+n,()=>State.topic(k),k==='emergency'?'btn red':'btn'));
    addButton(g,'More cards',()=>State.go('TOPICS'),'btn','Dental, pharmacy, travel, shop, police');
    wrap.appendChild(g);
    c.appendChild(wrap);
  }
  function renderTopics(c){
    const wrap=el('section','section-card');
    wrap.appendChild(el('div','section','All communication cards'));
    wrap.appendChild(el('p','hint','Use when speech, processing, or real-time conversation is difficult.'));
    const g=el('div','grid');
    [['medical','Medical / Health'],['dental','Dental'],['pharmacy','Pharmacy'],['social','Social care'],['benefits','Benefits / PIP / UC'],['bank','Bank / Money'],['housing','Housing / Repairs'],['travel','Travel / Transport'],['shop','Shop / Restaurant'],['reception','Reception / Front desk'],['police','Police / Safeguarding'],['family','Family / Mum'],['emergency','Emergency / Accident']].forEach(([k,n])=>addButton(g,(TOPICS[k].icon||'')+' '+n,()=>State.topic(k),k==='emergency'?'btn red':'btn'));
    addButton(g,'Home',()=>State.go('HOME'));
    wrap.appendChild(g);
    c.appendChild(wrap);
  }
  function renderForms(c){
    const wrap=el('section','section-card');
    wrap.appendChild(el('div','section','Form Centre'));
    wrap.appendChild(el('p','hint','Use for forms, questionnaires, applications, referrals, reviews, assessments, and official paperwork.'));
    const g=el('div','grid');
    addButton(g,'FormFill handover',()=>handover('Form completion','Analyse the whole form first. Identify all fields, mandatory sections, evidence requirements, missing information, contradictions, and review points. Reuse verified information. Do not guess. Produce completed answers and an audit trail.'),'btn green','Copies prompt text');
    addButton(g,'Healthcare passport',()=>handover('Healthcare passport','Use clear healthcare wording. Distinguish ethnicity, nationality, and identifiers. Describe functional impact, safety, reliability, repeatability, support required, and recovery. Include written communication, extra processing time, one question at a time, and support-person involvement where relevant.'),'btn','Hospital / clinic forms');
    addButton(g,'Evidence checklist',()=>handover('Evidence checklist','Sort evidence into: Verified, Suggested, User Confirmed, Missing, and Requires Review. Attach only relevant and proportionate evidence.'),'btn purple','Memory & Evidence');
    addButton(g,'Open PA Auto',()=>{location.href='pa/'},'btn purple','Paste form text or message');
    addButton(g,'Home',()=>State.go('HOME'));
    wrap.appendChild(g);
    c.appendChild(wrap);
  }
  const originalRender=render;
  render=function(){
    const c=clearContent();
    if(engine.activeState==='FORMS')return renderForms(c);
    if(engine.activeState==='STATUS')return renderStatusDashboard(c);
    if(engine.activeState==='TOPICS')return renderTopics(c);
    if(engine.activeState==='TOPIC')return renderTopic(c);
    if(engine.activeState==='LETTER')return renderLetter(c);
    if(engine.activeState==='RECOVERY')return renderRecovery(c);
    renderQuickStatus(c);
    renderIntake(c);
    renderActionMap(c);
  };
  window.addEventListener('load',()=>setTimeout(render,0));
})();
