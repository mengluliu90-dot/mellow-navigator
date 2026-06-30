// Menglu OS Interface Layer for Mellow Navigator
// Adds a low-friction home dashboard, form centre, automation hub, open loops, capacity, evidence, decisions and AI context pack.
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
  function saveLocalList(key,item){
    const a=safeJSON(key,[]);
    a.unshift({...item,timestamp:new Date().toISOString()});
    localStorage[key]=JSON.stringify(a.slice(0,50));
  }
  function statusCard(title,value,note,cls){
    const card=el('div','mini-card '+(cls||''));
    card.appendChild(el('strong','',title));
    card.appendChild(el('span','',value));
    if(note)card.appendChild(el('small','',note));
    return card;
  }
  function listBlock(parent,title,items,empty){
    const wrap=el('section','section-card');
    wrap.appendChild(el('div','section',title));
    if(!items.length)wrap.appendChild(el('p','hint',empty||'None recorded on this device.'));
    items.slice(0,6).forEach(x=>{
      const p=el('p','hint');
      p.textContent=(x.status?x.status+' · ':'')+(x.title||x.domain||x.summary||'Saved item')+(x.next?'\nNext: '+x.next:'')+(x.timestamp?'\n'+x.timestamp:'');
      wrap.appendChild(p);
    });
    parent.appendChild(wrap);
  }
  function renderStatusDashboard(c){
    const wrap=el('section','section-card');
    wrap.appendChild(el('div','section','Menglu OS dashboard'));
    wrap.appendChild(el('p','hint','One front page for current state, open loops, forms, automations and recovery. Private records stay in ChatGPT, Gmail, Calendar or local device storage.'));
    const g=el('div','mini-grid');
    const state=statusText();
    g.appendChild(statusCard('Current state',state,state==='Recovery active'?'Avoid complex admin':'Use one task at a time',state==='Recovery active'?'warn':''));
    g.appendChild(statusCard('Saved items',String(countTimeline()),'Local timeline'));
    g.appendChild(statusCard('Open loops',String(safeJSON('mn_open_loops',[]).length),'Manual quick list'));
    g.appendChild(statusCard('Decisions',String(safeJSON('mn_decision_log',[]).length),'Local log'));
    const active=safeJSON('mira_next_active_session',null);
    g.appendChild(statusCard('Continue',active?(active.domain||'Saved item'):'None','Last stopped item'));
    g.appendChild(statusCard('Automations','Linked','Use Automation Hub'));
    wrap.appendChild(g);
    const nav=el('div','grid');
    addButton(nav,'Next best action',()=>State.go('NEXT'),'btn green','Choose one safe action');
    addButton(nav,'Open loops',()=>State.go('LOOPS'),'btn','Waiting / active / closed');
    addButton(nav,'Automation Hub',()=>State.go('AUTOMATIONS'),'btn purple','Works with background checks');
    addButton(nav,'Capacity meter',()=>State.go('CAPACITY'),'btn','Communication, admin, travel, recovery');
    addButton(nav,'Evidence graph',()=>State.go('EVIDENCE'),'btn','Link related items');
    addButton(nav,'AI context pack',()=>State.go('CONTEXT'),'btn purple','Portable handover');
    addButton(nav,'Home',()=>State.go('HOME'));
    wrap.appendChild(nav);
    c.appendChild(wrap);
    listBlock(c,'Recent local timeline',safeJSON('mira_next_timeline',[]),'No local timeline items.');
  }
  function renderIntake(c){
    const wrap=el('section','section-card priority');
    wrap.appendChild(el('div','section','Start here'));
    wrap.appendChild(el('p','hint','Use one entry point. Menglu OS routes the work to the right engine.'));
    const g=el('div','grid');
    addButton(g,'Paste message or email',()=>{location.href='pa/'},'btn purple','Executive Function + Output Engine');
    addButton(g,'Complete a form',()=>State.go('FORMS'),'btn green','Form Completion Pipeline');
    addButton(g,'One inbox handover',()=>State.go('INBOX'),'btn','Paste, upload, photo, describe');
    addButton(g,'Use communication cards',()=>State.go('TOPICS'),'btn','Mellow AAC');
    addButton(g,'What needs attention?',()=>State.go('STATUS'),'btn green','Dashboard');
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
  function renderInbox(c){
    const wrap=el('section','section-card priority');
    wrap.appendChild(el('div','section','One Inbox'));
    wrap.appendChild(el('p','hint','Use this when you do not know which mode to choose. Paste the item into ChatGPT or PA Auto with this handover.'));
    const g=el('div','grid');
    addButton(g,'Classify this',()=>handover('One Inbox','Classify this input first. Decide whether it is email, letter, form, medical, benefits, housing, banking, family, evidence, appointment, deadline, or no action. Then choose the smallest safe next step.'),'btn green','Use before deciding');
    addButton(g,'Paste into PA Auto',()=>{location.href='pa/'},'btn purple');
    addButton(g,'Home',()=>State.go('HOME'));
    wrap.appendChild(g);
    c.appendChild(wrap);
  }
  function renderNext(c){
    const wrap=el('section','section-card priority');
    wrap.appendChild(el('div','section','Next best action'));
    wrap.appendChild(el('p','hint','Default rule: one action only. No extra tasks unless urgent.'));
    const g=el('div','grid');
    addButton(g,'Ask ChatGPT to choose',()=>handover('Next best action','Review current context and choose exactly one safest next action. Consider recovery state, deadlines, risk, waiting-on-others, and cognitive load. Do not give a long task list.'),'btn green');
    addButton(g,'Open saved item',()=>State.go('LETTER'),'btn purple');
    addButton(g,'No action / rest',()=>State.go('RECOVERY'),'btn green');
    addButton(g,'Home',()=>State.go('HOME'));
    wrap.appendChild(g);
    c.appendChild(wrap);
  }
  function renderLoops(c){
    const items=safeJSON('mn_open_loops',[]);
    const wrap=el('section','section-card');
    wrap.appendChild(el('div','section','Open Loops Board'));
    wrap.appendChild(el('p','hint','Manual local board. Background review is handled by automations when enabled.'));
    const g=el('div','grid');
    addButton(g,'Create open-loop handover',()=>handover('Open loops','Review active, waiting-on-others, monitoring-only, completed/closed, and historical-evidence-only matters. Do not reopen closed issues unless new evidence exists. Identify only the smallest useful next action.'),'btn green');
    addButton(g,'Add placeholder',()=>{saveLocalList('mn_open_loops',{status:'Active',title:'New item',next:'Review in ChatGPT'});render()},'btn');
    addButton(g,'Clear local board',()=>{localStorage.removeItem('mn_open_loops');render()},'btn red');
    addButton(g,'Home',()=>State.go('HOME'));
    wrap.appendChild(g);
    c.appendChild(wrap);
    listBlock(c,'Local open loops',items,'No local open loops recorded.');
  }
  function renderCapacity(c){
    const wrap=el('section','section-card');
    wrap.appendChild(el('div','section','Capacity Meter'));
    wrap.appendChild(el('p','hint','Operational only. Use it to reduce workload, not to diagnose.'));
    const g=el('div','grid');
    [['Communication low','Communication capacity is low. Use written messages, one question at a time, and avoid real-time decisions.'],['Admin low','Administrative capacity is low. Only urgent tasks should be handled.'],['Travel low','Travel capacity is low. Avoid non-urgent travel and plan recovery.'],['Recovery active','Recovery is active. Suppress non-urgent tasks and surface only essential action.']].forEach(([label,text])=>addButton(g,label,()=>handover('Capacity modifier',text),'btn green'));
    addButton(g,'Home',()=>State.go('HOME'));
    wrap.appendChild(g);
    c.appendChild(wrap);
  }
  function renderEvidence(c){
    const wrap=el('section','section-card');
    wrap.appendChild(el('div','section','Evidence Graph'));
    wrap.appendChild(el('p','hint','Use this to connect documents to cases without storing private evidence in the website.'));
    const g=el('div','grid');
    addButton(g,'Map evidence to case',()=>handover('Evidence graph','For this case, list linked evidence as Verified, Supporting, Awaiting, Missing, or Historical only. Explain what each item supports and whether it is current, stale, contradictory, or requires review.'),'btn green');
    addButton(g,'Evidence status labels',()=>handover('Evidence labels','Use labels: Verified, Suggested, User Confirmed, Missing, Requires Review, Historical Evidence Only, Waiting on Others, Completed/Closed.'),'btn purple');
    addButton(g,'Home',()=>State.go('HOME'));
    wrap.appendChild(g);
    c.appendChild(wrap);
  }
  function renderDecision(c){
    const items=safeJSON('mn_decision_log',[]);
    const wrap=el('section','section-card');
    wrap.appendChild(el('div','section','Decision Log'));
    wrap.appendChild(el('p','hint','Use for important decisions: date, decision, reason, evidence, outcome.'));
    const g=el('div','grid');
    addButton(g,'Decision handover',()=>handover('Decision log','Record: decision, date, reason, evidence used, uncertainty, risk if ignored, chosen next step, and outcome when known.'),'btn green');
    addButton(g,'Add placeholder',()=>{saveLocalList('mn_decision_log',{status:'Decision',title:'Decision to review',next:'Record reason and evidence'});render()},'btn');
    addButton(g,'Clear local log',()=>{localStorage.removeItem('mn_decision_log');render()},'btn red');
    addButton(g,'Home',()=>State.go('HOME'));
    wrap.appendChild(g);
    c.appendChild(wrap);
    listBlock(c,'Local decisions',items,'No local decisions recorded.');
  }
  function renderAutomationHub(c){
    const wrap=el('section','section-card');
    wrap.appendChild(el('div','section','Automation Hub'));
    wrap.appendChild(el('p','hint','The website does not run ChatGPT automations. It provides the front-end handover and avoids duplicate workflows.'));
    const g=el('div','grid');
    addButton(g,'Email follow-up review',()=>handover('Automation: Email follow-up review','Use the twice-weekly Gmail follow-up automation output as the source for who is waiting, what action is needed, deadlines, thread age, and one reviewable next step.'),'btn green','Active automation');
    addButton(g,'Open-loop review',()=>handover('Automation: Open loops','When open-loop automation is available, merge results into the Open Loops Board. Do not create duplicate reminders. Notify only when action is needed.'),'btn');
    addButton(g,'Appointment shield',()=>handover('Automation: Appointment shield','When appointment monitoring is available, connect outputs to Mellow scripts, reasonable adjustments, travel planning, written-summary requests, and recovery planning.'),'btn');
    addButton(g,'Recovery guard',()=>handover('Automation: Recovery guard','When recovery monitoring is available, suppress non-urgent work and surface only essential tasks.'),'btn green');
    addButton(g,'Evidence watch',()=>handover('Automation: Evidence watch','When evidence monitoring is available, link new evidence to existing cases and mark contradictions, missing items, or strengthening evidence.'),'btn purple');
    addButton(g,'Home',()=>State.go('HOME'));
    wrap.appendChild(g);
    c.appendChild(wrap);
  }
  function renderContext(c){
    const wrap=el('section','section-card');
    wrap.appendChild(el('div','section','AI Context Pack'));
    wrap.appendChild(el('p','hint','Portable handover for another AI or a new chat. It contains operating rules, not private identity details.'));
    const text='Use Menglu OS. Treat this as one coherent system. Ask one question at a time if clarification is required. Reuse verified information. Distinguish confirmed facts, unconfirmed information, assumptions and missing information. Prefer written communication, no phone, simple language, extra processing time, one issue at a time, and smallest safe next action. Consider autism, fatigue/PEM, POTS, sensory overload, shutdown risk, executive dysfunction, support needs, and recovery. Do not treat prepared writing, masking, or supported performance as independent reliable functioning. For forms, analyse the whole form first, inventory fields, identify evidence, mark missing information, draft responses, quality-check, and provide an audit trail. For automations, consolidate existing monitoring and notify only when action is needed.';
    const g=el('div','grid');
    addButton(g,'Copy context pack',()=>handover('AI context pack',text),'btn green');
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
    if(engine.activeState==='INBOX')return renderInbox(c);
    if(engine.activeState==='NEXT')return renderNext(c);
    if(engine.activeState==='LOOPS')return renderLoops(c);
    if(engine.activeState==='CAPACITY')return renderCapacity(c);
    if(engine.activeState==='EVIDENCE')return renderEvidence(c);
    if(engine.activeState==='DECISION')return renderDecision(c);
    if(engine.activeState==='AUTOMATIONS')return renderAutomationHub(c);
    if(engine.activeState==='CONTEXT')return renderContext(c);
    if(engine.activeState==='TOPIC')return renderTopic(c);
    if(engine.activeState==='LETTER')return renderLetter(c);
    if(engine.activeState==='RECOVERY')return renderRecovery(c);
    renderQuickStatus(c);
    renderIntake(c);
    renderActionMap(c);
  };
  window.addEventListener('load',()=>setTimeout(render,0));
})();
