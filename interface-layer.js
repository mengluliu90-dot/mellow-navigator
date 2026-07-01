// Menglu OS Interface Layer for Mellow Navigator
// Adds a low-friction home dashboard, form centre, automation hub, open loops, capacity, evidence, decisions and AI context pack.
(function(){
  function safeJSON(key,fallback){try{return JSON.parse(localStorage[key]||JSON.stringify(fallback))}catch(e){return fallback}}
  function statusText(){
    const recoveryUntil=Number(localStorage.mn_recovery_until||0);
    const uosState=safeJSON('uos_state',{mode:'HOME',recovery_until:0});
    const uosRecovery=Number(uosState.recovery_until||0);
    if((recoveryUntil && recoveryUntil>Date.now())||(uosRecovery && uosRecovery>Date.now())) return 'Recovery active';
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
  function safeSlice(arr,n){return Array.isArray(arr)?arr.slice(0,n):[]}
  function textOf(x){return [x.name,x.title,x.summary,x.detail,x.status,x.phase,x.waiting_for,x.lead,x.next,x.risk,x.priority,x.domain].filter(Boolean).join(' ').toLowerCase()}
  function priorityOf(item){
    const text=textOf(item);
    if(item.priority==='RED'||item.status==='Needs Review'||/urgent|deadline|required|high risk|risk|safety|fraud|identity|security|bank|benefit|pip|uc|dwp|dfc|legal|safeguard|housing safety|medical risk/i.test(text)) return 'P1';
    if(/active|in progress|needs action|next step|reply|follow|review|draft/i.test(text)) return 'P2';
    if(item.status==='Waiting'||/waiting|pending|blocked|await|open loop|confirm/i.test(text)) return 'P3';
    return 'P4';
  }
  function priorityMeaning(p){
    return {
      P1:'High risk, deadline, required reply, safety, benefits, banking, health, housing safety, or irreversible decision.',
      P2:'Active case with useful next step but no immediate confirmed deadline.',
      P3:'Waiting on another person or organisation.',
      P4:'Reference, monitoring, completed, or historical evidence.'
    }[p]||'Unclassified';
  }
  function buildPriorityIndex(items){
    const rows=items.map((item,i)=>{
      const p=priorityOf(item);
      return {
        priority:p,
        meaning:priorityMeaning(p),
        source:item.source||item.domain||item.kind||'local_state',
        title:item.name||item.title||item.summary||('Item '+(i+1)),
        status:item.status||item.phase||'Unknown',
        next:item.next||item.waiting_for||item.detail||'',
        recovery:item.recovery_impact||item.recovery||'Unknown',
        confidence:item.confidence||'Unknown'
      };
    });
    const order={P1:1,P2:2,P3:3,P4:4};
    rows.sort((a,b)=>(order[a.priority]||9)-(order[b.priority]||9));
    return {
      generated_from:'uos_cases + uos_tasks + mn_open_loops + mn_decision_log',
      counts:{
        P1:rows.filter(r=>r.priority==='P1').length,
        P2:rows.filter(r=>r.priority==='P2').length,
        P3:rows.filter(r=>r.priority==='P3').length,
        P4:rows.filter(r=>r.priority==='P4').length
      },
      rows:safeSlice(rows,40)
    };
  }
  function buildControlRoomPacket(){
    const uosObjects=safeJSON('uos_objects',[]);
    const uosCases=safeJSON('uos_cases',{});
    const uosTasks=safeJSON('uos_tasks',[]);
    const uosDrafts=safeJSON('uos_drafts',[]);
    const uosTimeline=safeJSON('uos_timeline',[]);
    const uosState=safeJSON('uos_state',{mode:'HOME',recovery_until:0});
    const localLoops=safeJSON('mn_open_loops',[]);
    const decisionLog=safeJSON('mn_decision_log',[]);
    const localTimeline=safeJSON('mira_next_timeline',[]);
    const activeSession=safeJSON('mira_next_active_session',null);
    const waiting=uosTasks.filter(t=>t.status==='Waiting'||/wait|open loop|follow|confirm|reply/i.test((t.title||'')+' '+(t.detail||'')));
    const action=uosTasks.filter(t=>t.status==='Needs Review'||t.priority==='RED'||/urgent|deadline|risk|required/i.test((t.title||'')+' '+(t.detail||'')));
    const activeCases=Object.values(uosCases).map(c=>({
      source:'uos_cases',
      name:c.name||'Case',
      status:c.status||'',
      phase:c.phase||'',
      waiting_for:c.waiting_for||'',
      lead:c.owner||'',
      next:c.next||'',
      risk:c.risk||'',
      evidence_score:c.evidence_score||'',
      updated:c.updated||'',
      open_loops:c.open_loops||0,
      recovery_impact:c.recovery_impact||'',
      confidence:c.confidence||''
    }));
    const indexedItems=[
      ...activeCases,
      ...uosTasks.map(t=>({...t,source:'uos_tasks'})),
      ...localLoops.map(t=>({...t,source:'mn_open_loops'})),
      ...decisionLog.map(t=>({...t,source:'mn_decision_log'}))
    ];
    const currentPriorityIndex=buildPriorityIndex(indexedItems);
    return {
      packet_type:'Mellow Control Room Sync Packet v2',
      generated_at:new Date().toISOString(),
      privacy_note:'User-initiated local export. Review before sharing. Do not paste confidential evidence, private identifiers, bank details, or unnecessary medical records unless needed for the task.',
      workflow:'Alias -> Triage -> Pre-flight Check -> Capability Check -> Context -> Draft -> Outcome -> Feedback Loop',
      command_aliases:{
        '[RUN_MONITORING]':'Generate a SYNC_REPORT from available authorised sources and local packet data.',
        '[UC]':'Universal Credit, LCWRA, DfC, appointee, journal or benefits administration workflow.',
        '[PIP]':'PIP review, award, evidence, assessment, forms or benefit communications workflow.',
        '[BANK]':'Banking, AIB, fraud, identity, payments, chargeback or security workflow.',
        '[HEALTH]':'GP, NHS, Trust, hospital, pharmacy, dental or healthcare adjustment workflow.',
        '[HOUSING]':'Lotus Homes, Clixifix, repairs, defects, safety, water ingress or home utilities workflow.',
        '[SOCIAL]':'Social care, Mary-Sue O\'Hare, PCC, care coordination or support planning workflow.',
        '[EMAIL]':'Classify email, assess importance, draft reply if appropriate, and wait for approval before sending.'
      },
      preflight_capability_check:{
        required_before_draft:[
          'Check whether enough evidence exists.',
          'Check whether live information or a connected tool is needed.',
          'Check whether the task requires physical action, identity verification, phone contact, signature, payment, appointment acceptance/cancellation, or sending a message.',
          'Check whether the action is irreversible or privacy-sensitive.',
          'If evidence is missing, use WAITING_FOR_EVIDENCE instead of guessing.',
          'If manual action is required, mark MANUAL_INTERVENTION_REQUIRED and provide the smallest safe handover.'
        ],
        ai_can_do:['classify','summarise','compare','prioritise','draft','prepare reviewable outputs','update non-sensitive GitHub documentation when explicitly requested'],
        ai_must_not_claim:['sent email unless actually sent through authorised tool','booked/cancelled appointment unless actually done through authorised tool','completed physical repair','verified identity','made payment','received a reply that is not in evidence']
      },
      graceful_degradation_template:{
        status:'WAITING_FOR_EVIDENCE',
        missing:'Name the specific missing file, message, date, screenshot, email, appointment notice, or evidence type.',
        reason:'Explain why the task cannot be completed safely without it.',
        next_evidence_needed:'Ask for the smallest specific evidence item only.'
      },
      latest_state_policy:'Generate LATEST_STATE only for Case Summary, Update Packet, Sync Packet, workflow closure, or explicit request. Do not add it to every response.',
      current_context:{
        visible_state:statusText(),
        current_mode_text:localStorage.getItem('current_mode_text')||'',
        recovery_state:uosState,
        active_session:activeSession,
        active_case_count:activeCases.length,
        waiting_count:waiting.length,
        action_required_count:action.length,
        local_open_loop_count:localLoops.length,
        local_decision_count:decisionLog.length,
        latest_object_summary:uosObjects[0]?{
          object_id:uosObjects[0].object_id,
          timestamp:uosObjects[0].timestamp,
          event_type:uosObjects[0].event_type,
          source_format:uosObjects[0].source_format,
          cases:uosObjects[0].caseNames,
          evidence_score:uosObjects[0].evidence_score,
          recovery:uosObjects[0].recovery,
          confidence:uosObjects[0].confidence,
          output:uosObjects[0].output
        }:null
      },
      current_priority_index:currentPriorityIndex,
      attention_needed:{
        action_required_items:safeSlice(action,30),
        waiting_items:safeSlice(waiting,30),
        local_open_loops:safeSlice(localLoops,30)
      },
      active_cases:activeCases,
      outcome_tracker_seed:activeCases.map(c=>({
        case:c.name,
        objective:c.next||c.waiting_for||'Clarify objective from latest context',
        status:c.status||c.phase||'Unknown',
        last_action:c.updated||'',
        outcome_so_far:c.waiting_for||'',
        next_review:'Set only if a real deadline or review point exists',
        confidence:c.confidence||'Unknown'
      })),
      feedback_loop_seed:{
        update_after_processing:['priority','active case status','next action or waiting state','evidence status','recovery burden','next review only if real deadline or appointment exists'],
        evidence_status_labels:['Verified','User Confirmed','Suggested','Missing','Requires Review','Historical Evidence Only','Waiting on Others','Completed/Closed']
      },
      recent_timeline:safeSlice(uosTimeline,30),
      recent_local_timeline:safeSlice(localTimeline,30),
      recent_objects:safeSlice(uosObjects,10).map(o=>({
        object_id:o.object_id,
        timestamp:o.timestamp,
        event_type:o.event_type,
        source_format:o.source_format,
        cases:o.caseNames,
        evidence_score:o.evidence_score,
        recovery:o.recovery,
        confidence:o.confidence,
        output:o.output
      })),
      prepared_drafts:safeSlice(uosDrafts,10).map(d=>({
        draft_id:d.draft_id,
        status:d.status,
        cases:d.cases,
        date:d.date,
        layers:d.layers
      })),
      recommended_processing_instruction:'Apply Menglu OS v0.24+. Use Command Alias if present. Run Pre-flight and Capability Check before drafting. First triage items as Action Required, Waiting, Reference, High Risk, or Archive. Generate Current Priority Index. Separate OS Evidence from Current Context. Identify contradictions/gaps. Estimate recovery burden. Use WAITING_FOR_EVIDENCE if needed. Produce only the required SYNC_REPORT, Context Packet, Case Summary, Prep Pack, Safest Draft, MANUAL_INTERVENTION_REQUIRED, or no-action result.'
    };
  }
  function controlRoomPacketText(){
    return 'Update: process this Mellow Control Room Sync Packet v2 against Menglu OS. Apply Command Alias routing if present, Pre-flight Check, Capability Check, Current Priority Index, Six-Step Workflow, Three-Layer Pipeline, and Feedback Loop. Return only SYNC_REPORT, action, risk, Case Summary, Prep Pack, Safest Draft, WAITING_FOR_EVIDENCE, MANUAL_INTERVENTION_REQUIRED, or no action required.\n\n```json\n'+JSON.stringify(buildControlRoomPacket(),null,2)+'\n```';
  }
  function copyText(t){try{navigator.clipboard&&navigator.clipboard.writeText(t)}catch(e){}}
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
      p.textContent=(x.priority?x.priority+' · ':'')+(x.status?x.status+' · ':'')+(x.title||x.domain||x.summary||x.name||'Saved item')+(x.next?'\nNext: '+x.next:'')+(x.timestamp?'\n'+x.timestamp:'');
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
    const packet=buildControlRoomPacket();
    g.appendChild(statusCard('Current state',state,state==='Recovery active'?'Avoid complex admin':'Use one task at a time',state==='Recovery active'?'warn':''));
    g.appendChild(statusCard('P1',String(packet.current_priority_index.counts.P1),'High risk / deadline',packet.current_priority_index.counts.P1?'warn':''));
    g.appendChild(statusCard('P2',String(packet.current_priority_index.counts.P2),'Active next steps'));
    g.appendChild(statusCard('P3',String(packet.current_priority_index.counts.P3),'Waiting'));
    g.appendChild(statusCard('Attention',String(packet.attention_needed.action_required_items.length),'Action required'));
    g.appendChild(statusCard('Active cases',String(packet.active_cases.length),'PA case state'));
    g.appendChild(statusCard('Open loops',String(safeJSON('mn_open_loops',[]).length),'Manual quick list'));
    g.appendChild(statusCard('Automations','Linked','Use Automation Hub'));
    wrap.appendChild(g);
    const nav=el('div','grid');
    addButton(nav,'Export Sync Packet v2',()=>State.go('SYNC'),'btn green','Copy current state to ChatGPT');
    addButton(nav,'Attention needed',()=>State.go('ATTENTION'),'btn red','Action / waiting / high risk');
    addButton(nav,'Next best action',()=>State.go('NEXT'),'btn green','Choose one safe action');
    addButton(nav,'Open loops',()=>State.go('LOOPS'),'btn','Waiting / active / closed');
    addButton(nav,'Automation Hub',()=>State.go('AUTOMATIONS'),'btn purple','Works with background checks');
    addButton(nav,'Capacity meter',()=>State.go('CAPACITY'),'btn','Communication, admin, travel, recovery');
    addButton(nav,'Evidence graph',()=>State.go('EVIDENCE'),'btn','Link related items');
    addButton(nav,'AI context pack',()=>State.go('CONTEXT'),'btn purple','Portable handover');
    addButton(nav,'Home',()=>State.go('HOME'));
    wrap.appendChild(nav);
    c.appendChild(wrap);
    listBlock(c,'Current Priority Index',packet.current_priority_index.rows,'No priority items recorded on this device.');
    listBlock(c,'Recent local timeline',safeJSON('mira_next_timeline',[]),'No local timeline items.');
  }
  function renderAttention(c){
    const packet=buildControlRoomPacket();
    const wrap=el('section','section-card priority');
    wrap.appendChild(el('div','section','Attention needed'));
    wrap.appendChild(el('p','hint','Shows only items that may require action, waiting review, or risk checking. If empty, use rest/no action.'));
    const g=el('div','grid');
    addButton(g,'Copy full sync packet v2',()=>{const t=controlRoomPacketText();copyText(t);speak('Sync packet v2 copied. Paste into ChatGPT when ready.');},'btn green','For ChatGPT');
    addButton(g,'Next best action',()=>handover('Attention needed','Use the current Control Room Sync Packet v2. Run Pre-flight and Capability Check. Identify one safest next action only. If nothing requires action, say no action required.'),'btn green');
    addButton(g,'Open EOS / PA',()=>{location.href='pa/eos.html'},'btn purple');
    addButton(g,'Home',()=>State.go('HOME'));
    wrap.appendChild(g);
    c.appendChild(wrap);
    listBlock(c,'P1 / P2 priority items',packet.current_priority_index.rows.filter(x=>x.priority==='P1'||x.priority==='P2'),'No P1 or P2 items in local state.');
    listBlock(c,'Action required',packet.attention_needed.action_required_items,'No action-required items in local state.');
    listBlock(c,'Waiting / open loops',packet.attention_needed.waiting_items,'No waiting items in local PA state.');
    listBlock(c,'Manual open loops',packet.attention_needed.local_open_loops,'No manual open loops recorded.');
  }
  function renderSync(c){
    const wrap=el('section','section-card priority');
    wrap.appendChild(el('div','section','Control Room Sync Packet v2'));
    wrap.appendChild(el('p','hint','Copy this into ChatGPT to process current local state through Alias routing, Pre-flight Check, Capability Check, Current Priority Index and Feedback Loop. User-initiated only. No background monitoring.'));
    const ta=document.createElement('textarea');
    ta.rows=14;
    ta.value=controlRoomPacketText();
    ta.style.width='100%';
    ta.style.fontSize='15px';
    ta.style.padding='12px';
    ta.style.borderRadius='12px';
    ta.style.border='1px solid #aaa';
    wrap.appendChild(ta);
    const g=el('div','grid');
    addButton(g,'Copy packet',()=>{ta.select();copyText(ta.value);speak('Sync packet v2 copied. Paste into ChatGPT.');},'btn green');
    addButton(g,'Open Mira Evidence',()=>{location.href='mira-next/'},'btn purple');
    addButton(g,'Back dashboard',()=>State.go('STATUS'),'btn');
    addButton(g,'Home',()=>State.go('HOME'));
    wrap.appendChild(g);
    c.appendChild(wrap);
  }
  function renderIntake(c){
    const wrap=el('section','section-card priority');
    wrap.appendChild(el('div','section','Start here'));
    wrap.appendChild(el('p','hint','Use one entry point. Menglu OS routes the work to the right engine.'));
    const g=el('div','grid');
    addButton(g,'Export current state',()=>State.go('SYNC'),'btn green','Copy one packet to ChatGPT');
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
    const packet=buildControlRoomPacket();
    g.appendChild(statusCard('State',statusText(),statusText()==='Recovery active'?'Low demand':'Ready'));
    g.appendChild(statusCard('P1',String(packet.current_priority_index.counts.P1),'High risk / deadline'));
    g.appendChild(statusCard('P2',String(packet.current_priority_index.counts.P2),'Active'));
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
    addButton(g,'Classify this',()=>handover('One Inbox','Classify this input first. Decide whether it is email, letter, form, medical, benefits, housing, banking, family, evidence, appointment, deadline, or no action. Then run Pre-flight and Capability Check before drafting. Choose the smallest safe next step.'),'btn green','Use before deciding');
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
    addButton(g,'Ask ChatGPT to choose',()=>handover('Next best action','Review current context and choose exactly one safest next action. Consider Current Priority Index, recovery state, deadlines, risk, waiting-on-others, and cognitive load. Do not give a long task list.'),'btn green');
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
    addButton(g,'Open Mira Evidence',()=>{location.href='mira-next/'},'btn purple','OS Evidence view');
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
    addButton(g,'Run monitoring handover',()=>handover('Automation: RUN_MONITORING','Use [RUN_MONITORING]. Check authorised sources only. Produce SYNC_REPORT with Critical, Active, Waiting, Monitoring, Completed, Drafts Ready, and Recovery. Do not claim background monitoring.'),'btn green','Daily sync');
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
    const text='Use Menglu OS. Treat this as one coherent system. Ask one question at a time only when clarification is required. Reuse verified information. Distinguish confirmed facts, unconfirmed information, assumptions and missing information. Prefer written communication, no phone, simple language, extra processing time, one issue at a time, and smallest safe next action. Consider autism, fatigue/PEM, POTS, sensory overload, shutdown risk, executive dysfunction, support needs, and recovery. Do not treat prepared writing, masking, or supported performance as independent reliable functioning. For forms, analyse the whole form first, inventory fields, identify evidence, mark missing information, draft responses, quality-check, and provide an audit trail. For automations, consolidate existing monitoring and notify only when action is needed. Run Pre-flight and Capability Check before drafting. Use WAITING_FOR_EVIDENCE or MANUAL_INTERVENTION_REQUIRED when needed.';
    const g=el('div','grid');
    addButton(g,'Copy context pack',()=>handover('AI context pack',text),'btn green');
    addButton(g,'Copy sync packet v2',()=>{const t=controlRoomPacketText();copyText(t);speak('Sync packet v2 copied. Paste into ChatGPT.');},'btn green','Includes local state');
    addButton(g,'Open Mira Evidence',()=>{location.href='mira-next/'},'btn purple');
    addButton(g,'Home',()=>State.go('HOME'));
    wrap.appendChild(g);
    c.appendChild(wrap);
  }
  const originalRender=render;
  render=function(){
    const c=clearContent();
    if(engine.activeState==='FORMS')return renderForms(c);
    if(engine.activeState==='STATUS')return renderStatusDashboard(c);
    if(engine.activeState==='ATTENTION')return renderAttention(c);
    if(engine.activeState==='SYNC')return renderSync(c);
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
  window.MellowControlRoom={buildControlRoomPacket:buildControlRoomPacket,controlRoomPacketText:controlRoomPacketText,buildPriorityIndex:buildPriorityIndex};
  window.addEventListener('load',()=>setTimeout(render,0));
})();