const ME_KEY='mellow_engine_state';
const defaultEngine={activeState:'HOME',topic:null,step:0,recovery:{isActive:false,activatedAt:null,expiresAt:null},cachedSession:null};
function loadEngine(){try{return {...defaultEngine,...JSON.parse(localStorage[ME_KEY]||'{}')}}catch(e){return {...defaultEngine}}}
function saveEngine(){localStorage[ME_KEY]=JSON.stringify(engine)}
let engine=loadEngine();
const TOPICS={
 medical:{title:'Medical / Health',icon:'🏥',steps:[
  ['Introduction',[['Hello','Hello. Thank you for seeing me today. I use this communication tool because my health and communication needs can make real-time speaking difficult.'],['Prepared information','This information was prepared with support because I cannot reliably organise, retain or explain complex information during appointments.'],['Please let me start','Please allow me to give my introduction before asking questions. I may lose my place if interrupted.']]],
  ['Communication needs',[['One question','Please ask one clear question at a time.'],['Written notes','Please write down important information and next steps.'],['Processing time','Please give me extra time to process before expecting an answer.'],['Masking','I may appear calm or articulate because I prepared, but this does not show my everyday functioning.']]],
  ['Main issue',[['Current problem','Today I need help understanding my current symptoms and the safest next step.'],['Symptoms overlap','My symptoms can overlap between autism, ME/CFS, POTS, hypermobility, pain, anxiety and sensory overload.'],['Delayed worsening','I may cope briefly during the appointment but deteriorate afterwards.']]],
  ['Questions',[['What is happening?','What do you think is happening?'],['Next step','What happens next?'],['Tests or referrals','Do I need any tests, referrals or follow-up?'],['Written plan','Can you write the plan down please?']]],
  ['Finish',[['Before I leave','Before I leave, please confirm the plan, who is responsible, and the timescale.'],['Thank you','Thank you for your time. Please provide important information in writing if possible.'],['Finished','This appointment is finished. I need to start recovery now.']]]]
 },
 dental:{title:'Dental / Oral Health',icon:'🦷',steps:[
  ['Introduction',[['Hello','Hello. I use this communication tool because appointments, pain and sensory demands can affect my speech and processing.'],['Dentist context','I may have oral pain, jaw difficulty, burning mouth symptoms and sensory sensitivity.']]],
  ['Communication needs',[['Explain first','Please explain what you are going to do before touching my mouth.'],['Pause','Please pause if I raise my hand or use this device.'],['Written aftercare','Please give aftercare instructions in writing.']]],
  ['Main issue',[['Pain','I need to discuss pain or discomfort.'],['Jaw / TMJ','My jaw may be unstable, painful or difficult to keep open.'],['Oral sensitivity','I have oral sensitivity, dry mouth, burning sensations or difficulty with textures.'],['Hypermobility','My hand, wrist, jaw or neck symptoms may affect dental care and brushing.']]],
  ['Questions',[['What did you find?','What did you find today?'],['Treatment','What treatment is needed?'],['Urgent?','Is anything urgent?'],['Home care','What should I do at home?']]],
  ['Finish',[['Write it','Please write down the findings, treatment plan and aftercare.'],['Finished','Dental appointment finished. I may need quiet recovery.']]]]
 },
 social:{title:'Social Care / Support',icon:'👥',steps:[
  ['Introduction',[['Hello','Hello. I need support with communication, coordination, follow-up, executive functioning and managing demands.'],['Not only physical','My main barrier is not only physical tasks. It is also planning, communication, remembering, following up and sustaining processes.']]],
  ['Communication needs',[['Written only','Please use written communication where possible. Phone calls are not accessible for me.'],['Simple steps','Please give one issue at a time with clear next steps.'],['Support person','Please allow my support person and communication tools.']]],
  ['Main issue',[['Coordination','I need help coordinating services and following up.'],['Daily living','I need support with daily living, safety, meals, medication, hygiene, planning or outings.'],['Family limits','My family supports me, but there are limits due to work, health, language and capacity.']]],
  ['Questions',[['Who is responsible?','Who is responsible for the next step?'],['Timescale','When should I expect an update?'],['Written plan','Can I have the support plan in writing?'],['Named contact','Is there a named contact or written pathway?']]],
  ['Finish',[['Before finish','Before we finish, please write down what happens next, who is responsible and when.'],['Finished','Social care discussion finished. Please allow recovery time.']]]]
 },
 benefits:{title:'Benefits / PIP / UC',icon:'🏛',steps:[
  ['Introduction',[['Hello','Hello. I use this communication tool because my disabilities affect communication, processing and memory.'],['Assessment support','Please assess what I can do safely, repeatedly, to an acceptable standard and within a reasonable time.'],['Supported not independent','If I do something only with support, prompting or recovery afterwards, that is not independent functioning.']]],
  ['Communication needs',[['Written communication','Please communicate in writing and avoid telephone contact.'],['One question','Please ask one question at a time.'],['Extra time','I need extra processing time.']]],
  ['Main issue',[['Daily living','I need help explaining daily living difficulties.'],['Mobility','I need help explaining planning journeys, moving around, fatigue, dizziness and safety.'],['Fluctuation','My function fluctuates. A short appointment does not show typical functioning.'],['Delayed impact','Activities can cause delayed worsening afterwards.']]],
  ['Answers',[['It varies','It varies depending on fatigue, POTS, pain, sensory overload and support.'],['Cannot do safely','I cannot do that safely without support.'],['Need prompting','I need prompting, supervision or help.'],['After-effect','I may appear to do it once but become worse afterwards.']]],
  ['Finish',[['Check record','Please make sure my communication needs, support needs and delayed deterioration are recorded.'],['Finished','Benefits discussion finished. I need recovery and written summary.']]]]
 },
 bank:{title:'Bank / Money',icon:'🏦',steps:[
  ['Introduction',[['Hello','Hello. I need written support because financial information is difficult and stressful to process.'],['No phone','Please do not rely on phone calls. Written communication is safer for me.']]],
  ['Communication needs',[['Written confirmation','Please confirm the issue, amount, date, responsible team and next step in writing.'],['Slow down','Please slow down and use simple language.'],['No immediate decision','I cannot make immediate financial decisions under pressure.']]],
  ['Main issue',[['Payment query','I need help checking a payment, refund, chargeback, Direct Debit or standing order.'],['Security concern','I am concerned about account security or an unexpected payment.'],['Support needed','I may need support to understand and monitor this safely.']]],
  ['Questions',[['What happened?','What exactly happened?'],['Amount and date','What is the amount and date?'],['Next step','What is the safest next step?'],['Written proof','Can you provide written confirmation?']]],
  ['Finish',[['Do not phone','Please continue in writing. Telephone contact is not accessible or safe for me.'],['Finished','Banking discussion finished. Do not continue finance tasks during recovery.']]]]
 },
 housing:{title:'Housing / Repairs',icon:'🏠',steps:[
  ['Introduction',[['Hello','Hello. I need help reporting or discussing a housing or repair issue.'],['Written contact','Please keep all repair updates in writing.']]],
  ['Communication needs',[['Simple updates','Please give clear written updates with dates and responsibility.'],['No phone reliance','Please do not rely on telephone contact.'],['Safety issue','If there is a safety issue, please treat it as urgent and confirm action in writing.']]],
  ['Main issue',[['Repair problem','There is a repair or defect issue that needs review.'],['Leak / water','There may be water ingress or plumbing concern.'],['Electrical concern','There may be an electrical or alarm concern.'],['Access need','I need written appointment times and low-stress access arrangements.']]],
  ['Questions',[['Who will fix it?','Who is responsible for fixing this?'],['When?','When will someone attend?'],['Safety?','Is it safe to use this area?'],['Written report','Can I have the repair report in writing?']]],
  ['Finish',[['Confirm','Please confirm action, date, contact person and safety advice in writing.'],['Finished','Housing discussion finished. Save to Mira if needed.']]]]
 },
 travel:{title:'Travel / Transport',icon:'🚕',steps:[
  ['Introduction',[['Hello','Hello. I have autism, fatigue, POTS symptoms and hypermobility. I may need travel assistance.'],['Not independent','I cannot reliably travel independently and may need a carer or support person.']]],
  ['Communication needs',[['Written instructions','Please give clear written instructions where possible.'],['Seating','I may need seating and cannot stand for long.'],['Extra time','Please allow extra time.']]],
  ['Main issue',[['Journey help','I need help with this journey or travel plan.'],['Step-free / seating','I may need step-free access, seating and reduced waiting.'],['Motion / fatigue','Travel can cause motion sickness, fatigue, dizziness and recovery needs.']]],
  ['Questions',[['Where do I go?','Where do I need to go next?'],['How long?','How long will I need to wait?'],['Seat?','Is there somewhere I can sit?'],['Assistance?','Can assistance be provided?']]],
  ['Finish',[['Confirm journey','Please confirm the route, time, assistance and return plan.'],['Finished','Travel interaction finished. I may need recovery after travel.']]]]
 },
 shop:{title:'Shop / Restaurant',icon:'🏪',steps:[
  ['Introduction',[['Hello','Hello. I have autism and communication difficulties. Today I may not be able to speak or process information quickly.'],['Patience','Thank you for your patience.']]],
  ['Communication needs',[['Short sentences','Please use short clear sentences.'],['Pointing','Please let me point to what I want.'],['Extra time','Please give me extra time to respond.'],['Contactless','I would like to pay by contactless if possible.']]],
  ['Main issue',[['Need item','I need help finding or buying something.'],['Cannot wait','I cannot stand or wait for long because I may become dizzy or unwell.'],['Quiet please','Noise, crowds or strong smells may overwhelm me.']]],
  ['Questions',[['How much?','How much is it?'],['Where is it?','Where is this item?'],['Can I sit?','Can I sit down please?'],['Can I point?','Can I point instead of speaking?']]],
  ['Finish',[['Thank you','Thank you for helping me.'],['Finished','Shopping interaction finished. I need to leave or rest now.']]]]
 },
 pharmacy:{title:'Pharmacy / Medication',icon:'💊',steps:[
  ['Introduction',[['Hello','Hello. I need help with medication or pharmacy collection. I may have communication and processing difficulties.'],['Written information','Please give important medication information in writing.']]],
  ['Communication needs',[['Simple instructions','Please explain instructions simply and slowly.'],['Check understanding','Please help me check I understood correctly.'],['No phone','Written or in-person communication is safer than phone.']]],
  ['Main issue',[['Collect prescription','I need to collect a prescription.'],['Medication question','I have a medication question.'],['Side effects','I am worried about side effects or tolerability.'],['Allergy / sensitivity','I have allergies or sensitivities that need checking.']]],
  ['Questions',[['How to use?','How do I use this medication?'],['When?','When should I take or use it?'],['Side effects?','What side effects should I watch for?'],['Written label','Can I have clear written instructions or large print if possible?']]],
  ['Finish',[['Confirm','Please confirm the medication name, dose, timing and warning signs.'],['Finished','Pharmacy interaction finished. I may need rest.']]]]
 },
 reception:{title:'Reception / Front Desk',icon:'🧾',steps:[
  ['Introduction',[['Hello','Hello. I am here for an appointment or enquiry. I use this communication tool because speaking may be difficult.'],['Written please','Please write down any question or instruction if possible.']]],
  ['Communication needs',[['One question','Please ask one question at a time.'],['Slow and clear','Please use short clear sentences.'],['Need seat','I may need to sit down while waiting.']]],
  ['Main issue',[['I have appointment','I have an appointment today.'],['I need help','I need help checking what I need to do next.'],['I cannot phone','I cannot safely manage phone calls. Please use written contact.']]],
  ['Questions',[['Where wait?','Where should I wait?'],['How long?','How long is the wait?'],['Need form?','Do I need to complete anything?'],['Write down','Can you write that down please?']]],
  ['Finish',[['Thank you','Thank you. I will wait or follow the written instruction.'],['Finished','Reception interaction finished.']]]]
 },
 police:{title:'Police / Safeguarding',icon:'🛡',steps:[
  ['Introduction',[['Hello','Hello. I may have communication difficulties because I am autistic and overwhelmed.'],['Written support','Please communicate in writing, one question at a time.'],['Not refusing','If I cannot speak, I am not refusing. I may be in shutdown.']]],
  ['Communication needs',[['Need support','I need a calm environment and support person if possible.'],['Simple questions','Please ask simple, specific questions.'],['Time','Please allow extra time to process.']]],
  ['Main issue',[['Safety concern','There is a safety or safeguarding concern.'],['Record only','I may need this recorded for safeguarding purposes.'],['No pressure','Please do not pressure me to make fast decisions while overwhelmed.']]],
  ['Questions',[['What happens next?','What happens next?'],['Who will contact me?','Who will contact me and how?'],['Written reference','Can I have a reference number or written record?'],['Safe contact','Please use written contact where possible.']]],
  ['Finish',[['Confirm safety','Please confirm the safety plan and next step in writing.'],['Finished','Safeguarding discussion finished. I need quiet recovery now.']]]]
 },
 family:{title:'Family / Mum',icon:'👩',steps:[
  ['Introduction',[['Chinese intro','我是孟露的沟通辅助工具。她现在说话和组织语言比较困难。'],['Not refusing','她不是故意不说话，可能是脑雾、疲劳、过载或关机。']]],
  ['Needs',[['Quiet','请先让她安静休息，不要连续追问。'],['One thing','一次只说一件事，用短句。'],['Later','重要事情请写下来，等她恢复后再处理。']]],
  ['Status',[['Tired','我现在很累，需要休息。'],['Brain fog','我现在脑雾，不能处理复杂事情。'],['Overloaded','我现在过载，请减少声音和问题。'],['Need food/water','我可能需要水、简单食物或躺下休息。']]],
  ['Questions',[['Help me check','请帮我之后一起慢慢看这件事。'],['No phone','请不要让我现在打电话。'],['Tomorrow','这件事可以明天再处理吗？']]],
  ['Finish',[['Thank you mum','谢谢妈妈。我现在需要恢复。'],['Finished','家庭沟通结束。请让我休息。']]]]
 },
 emergency:{title:'Emergency / Accident',icon:'🚨',steps:[
  ['Immediate help',[['Cannot speak','I cannot speak right now. Please read this screen.'],['Feel faint','I feel faint or dizzy. Please help me sit or lie down safely.'],['Do not force upright','Please do not force me to stand or sit upright if I am fainting.'],['Call 999','If this is a medical emergency, please call 999.']]],
  ['Medical card',[['Conditions','I have autism, POTS, ME/CFS, communication difficulties and hypermobility.'],['Written communication','Please use short written sentences.'],['Contact mum','Please contact my mum or support person if possible.'],['Allergies','Allergies or sensitivities include Duac Once Daily Gel, pollen, onions, shellfish and oysters.']]],
  ['Accident',[['I fell','I have fallen or may be injured.'],['Pain','I have pain or joint instability.'],['Cannot stand','I cannot stand safely.'],['Need quiet','Please reduce noise, lights and crowding.']]],
  ['Finish',[['Safe now','I am safe now but need recovery.'],['Need medical review','I may need medical review.'],['Recovery','I need to rest after this.']]]]
 }
};
const RESP=[['Yes','Yes.'],['No','No.'],['I do not know','I do not know.'],['Not sure','I am not sure.'],['It varies','It varies.'],['Repeat','Please repeat that.'],['Write it down','Please write that down.'],['One question','Please ask one question at a time.'],['More time','I need more time to process.'],['Break','I need a break.'],['Overwhelmed','I am becoming overwhelmed.'],['Cannot speak','I cannot speak right now.'],['Sit down','I need to sit down.'],['Feel faint','I feel faint. Please help me sit or lie down safely.'],['Contact mum','Please contact my mum or support person.'],['Stop','Please stop and give me time.']];
function saveEngine(){localStorage[ME_KEY]=JSON.stringify(engine)}
function startRecovery(){engine.recovery={isActive:true,activatedAt:new Date().toISOString(),expiresAt:new Date(Date.now()+48*3600000).toISOString()};localStorage.mn_recovery_until=Date.now()+48*3600000;saveEngine()}
const State={go(s){engine.activeState=s;saveEngine();render()},topic(k){engine.activeState='TOPIC';engine.topic=k;engine.step=0;saveEngine();render()},step(n){let t=TOPICS[engine.topic];engine.step=Math.max(0,Math.min((t?.steps.length||1)-1,n));saveEngine();render()},finish(){let t=TOPICS[engine.topic]?.title||'Interaction';let item={timestamp:new Date().toISOString(),domain:t,source:'Mellow conversation flow',summary:t+' finished.',action_taken:'Finished in Mellow and recovery recommended',deadline:'No deadline',evidence_flag:true};try{let a=JSON.parse(localStorage.mira_next_timeline||'[]');a.unshift(item);localStorage.mira_next_timeline=JSON.stringify(a);localStorage.mira_next_active_session=JSON.stringify(item)}catch(e){}startRecovery();engine.activeState='RECOVERY';saveEngine();render()},clear(){engine={...defaultEngine};saveEngine();render()}};
function speak(t){document.getElementById('spokenText').textContent=t;if(typeof speakText==='function')speakText(t);try{navigator.clipboard.writeText(t)}catch(e){}}
function B(label,fn,cls='btn'){return `<button class="${cls}" onclick="${fn}">${label}</button>`}
function phraseBtn(p){return B(p[0]+`<small>${p[1]}</small>`,`speak(${JSON.stringify(p[1])})`)}
function universalPanel(){return `<div class="section-card"><div class="section">Universal responses</div><div class="grid">${RESP.map(r=>B(r[0],`speak(${JSON.stringify(r[1])})`)).join('')}</div></div>`}
function render(){let c=document.getElementById('content');let s=engine.activeState;if(s==='TOPIC')return renderTopic(c);if(s==='LETTER')return renderLetter(c);if(s==='RECOVERY')return renderRecovery(c);if(s==='EMERGENCY')return State.topic('emergency');renderHome(c)}
function renderHome(c){let saved='';let x=null;try{x=JSON.parse(localStorage.mira_next_active_session||'null')}catch(e){}if(x)saved=`<div class="section-card"><div class="section">Continue where I stopped</div><p class="hint">${x.domain||'Saved item'} · ${x.timestamp||''}</p><div class="grid">${B('Open Letter/PA','State.go(\'LETTER\')','btn purple')}${B('Clear','localStorage.removeItem(\'mira_next_active_session\');render()')}</div></div>`;let groups=[['medical','Medical / Health'],['dental','Dental'],['pharmacy','Pharmacy'],['social','Social care'],['benefits','Benefits / PIP / UC'],['bank','Bank / Money'],['housing','Housing / Repairs'],['travel','Travel / Transport'],['shop','Shop / Restaurant'],['reception','Reception / Front desk'],['police','Police / Safeguarding'],['family','Family / Mum'],['emergency','Emergency / Accident']];c.innerHTML=saved+`<div class="section-card"><div class="section">What is happening?</div><p class="hint">Choose a life situation. Mellow will guide the conversation from start to finish.</p><div class="grid">${groups.map(g=>B((TOPICS[g[0]]?.icon||'')+' '+g[1],`State.topic('${g[0]}')`,g[0]==='emergency'?'btn red':'btn')).join('')}${B('📨 Letter / Email','State.go(\'LETTER\')','btn purple')}${B('🏠 Recovery','State.go(\'RECOVERY\')','btn green')}</div></div>`}
function renderTopic(c){let t=TOPICS[engine.topic]||TOPICS.medical;let idx=engine.step||0;let step=t.steps[idx];let dots=t.steps.map((x,i)=>i<idx?'●':i===idx?'◉':'○').join(' ');c.innerHTML=`<div class="section-card"><div class="section">${t.icon} ${t.title}</div><p class="hint">${dots}<br>Step ${idx+1} of ${t.steps.length}: ${step[0]}</p><div class="grid">${step[1].map(phraseBtn).join('')}</div><div class="grid">${B('Back',`State.step(${idx-1})`)}${B(idx<t.steps.length-1?'Next':'Finish',idx<t.steps.length-1?`State.step(${idx+1})`:'State.finish()',idx<t.steps.length-1?'btn green':'btn red')}${B('Home','State.go(\'HOME\')')}${B('Emergency','State.topic(\'emergency\')','btn red')}</div></div>`+universalPanel()}
function renderLetter(c){c.innerHTML=`<div class="section-card"><div class="section">📨 Letter / Email</div><p class="hint">PA handles Paste & Detect, Easy Read, draft reply, Mum summary and Mira logging.</p><div class="grid">${B('Open PA Auto','location.href="pa/"','btn purple')}${B('Home','State.go(\'HOME\')')}</div></div>`+universalPanel()}
function renderRecovery(c){if(!engine.recovery?.isActive)startRecovery();c.innerHTML=`<div class="section-card"><div class="section">🏠 Recovery</div><p class="hint">Low-demand mode. Complex admin should be avoided. Ends: ${engine.recovery.expiresAt||'48 hours from start'}.</p><div class="grid">${B('Tell Mum',`speak('妈妈，我现在需要恢复。请让我休息，不要安排复杂事情。')`)}${B('Water',`speak('I need water please.')`)}${B('Simple food',`speak('I may need simple food please.')`)}${B('Medication note',`speak('Please check if any medication or nasal spray is needed.')`)}${B('No admin',`speak('No banking, forms, difficult emails, or complex decisions during recovery unless urgent.')`,'btn red')}${B('End recovery','engine.recovery={isActive:false,activatedAt:null,expiresAt:null};saveEngine();State.go(\'HOME\')')}</div></div>`+universalPanel()}
window.addEventListener('load',render);
