function paAutoRouter(){
  shell('One-Tap Intake','<div class="card out">Put anything here: pasted text, copied email, letter text, appointment details, or file name. PA will classify it, connect it to Menglu history, create tasks if needed, and generate a Chinese summary for Mum.</div><textarea id="intakeText" rows="8" placeholder="Paste text here, or use Process Clipboard. For screenshots/photos on iPhone: use Live Text to copy the text, then paste here."></textarea><input id="intakeFile" type="file" accept="image/*,.pdf,.txt,.doc,.docx" onchange="paFilePicked()">'+grid([
    ['🪄 Process Clipboard','paProcessClipboard()','primary'],
    ['✅ Process Intake','paProcessIntake()','primary'],
    ['📋 Last Result','paShowLast()'],
    ['↩ Back Home','home()']
  ])+'<div id="out" class="card out"></div>')
}
async function paProcessClipboard(){
  let text='';
  try{text=await navigator.clipboard.readText()}catch(e){set('out','Clipboard blocked. Copy text first, then try again.');return}
  if(!text||!text.trim()){set('out','Clipboard is empty. Copy a message first.');return}
  let e=document.getElementById('intakeText');if(e)e.value=text.trim();
  paRouteText(text.trim(),{source:'clipboard'})
}
function paProcessIntake(){
  const text=v('intakeText');
  const file=document.getElementById('intakeFile')?.files?.[0];
  if(!text&&!file){set('out','Nothing to process. Paste text or choose a file.');return}
  paRouteText(text||('[File uploaded: '+file.name+']'),{source:file?'file/manual':'manual',file:file?{name:file.name,type:file.type,size:file.size}:null})
}
function paFilePicked(){
  const f=document.getElementById('intakeFile')?.files?.[0];
  if(!f)return;
  set('out','File selected: '+f.name+'\n\nStatic PA can save this as an evidence item, but cannot reliably OCR images inside this browser. On iPhone, use Live Text to copy the words from the image, paste them above, then press Process Intake. If you upload the image directly in ChatGPT, I can read and process it there.')
}
function paRouteText(text,meta={}){
  const ctx=paAnalyse(text,meta);
  const tasks=paCreateTasks(ctx);
  const mum=paMumSummary(ctx,tasks);
  const reply=paDraft(ctx.route,ctx);
  const result=paRenderResult(ctx,tasks,mum,reply);
  const payload={timestamp:new Date().toISOString(),domain:ctx.route,source:'PA One-Tap Intake',contact:ctx.contact,summary:ctx.bottomLine,priority:ctx.priority,action_needed:ctx.action,deadline:ctx.deadline,appointment:ctx.appointment,tasks:tasks,mum_summary:mum,draft_reply:reply,result:result,original:text,evidence_flag:ctx.route!=='General'};
  localStorage.pa_last_task=JSON.stringify(payload);
  paLogToMira(payload);
  add(MK.line,{a:'PA One-Tap Intake: '+ctx.route,b:ctx.bottomLine+'\n'+text});
  add(MK.doc,{a:'PA Intake result: '+ctx.route,b:result});
  if(ctx.evidence)add(MK.ev,{a:'Evidence captured: '+ctx.route,type:ctx.route,b:ctx.bottomLine});
  tasks.forEach(t=>add(t.queue,{a:t.title,org:ctx.route,status:t.status,b:t.detail}));
  if(ctx.openLoop)add(MK.loop,{a:'Open loop: '+ctx.route,org:ctx.contact,status:'Waiting / watch',b:ctx.bottomLine});
  document.getElementById('out').innerHTML='<pre style="white-space:pre-wrap;font-family:inherit">'+escapeHtml(result)+'</pre>'+grid([
    ['👩 Copy Mum Chinese','paTellMum()','primary'],
    ['📋 Copy reply','paCopyReply()'],
    ['📅 Calendar draft','paCalendarDraft()'],
    ['🧾 Show tasks','paShowTasks()'],
    ['↩ Intake','paAutoRouter()']
  ]);
}
function paAnalyse(text,meta={}){
  const low=(text||'').toLowerCase();
  let route='General';
  if(/nhs|hscni|trust|gp|doctor|hospital|clinic|appointment|rheumatology|dentist|pharmacy|prescription|blood test|scan|referral/.test(low)) route='Healthcare';
  else if(/pip|dwp|universal credit|\buc\b|lcwra|benefit|dfc|mandatory reconsideration|tribunal|assessment/.test(low)) route='Benefits';
  else if(/bank|payment|direct debit|refund|chargeback|invoice|debt|standing order|aib|lcs|scam|fraud/.test(low)) route='Finance';
  else if(/repair|housing|leak|alarm|electric|builder|lotus|plumber|clixifix|boiler|water ingress/.test(low)) route='Housing';
  else if(/college|university|course|student|open university|study|assignment/.test(low)) route='Education';
  else if(/autism|autistic|reasonable adjustment|sensory|aac|disability|accessibility|easy read/.test(low)) route='Accessibility';
  const deadline=paDate(text)||'No clear date found';
  const appointment=/appointment|attend|clinic|hospital|dentist|rheumatology|gp|blood test|scan|review/i.test(text);
  const action=/reply|required|complete|return|confirm|book|attend|deadline|before|by |call|contact|provide|send|submit|form/i.test(text)||appointment;
  const risk=/urgent|final|overdue|missed|debt|fraud|scam|cancel|suspend|appointment|deadline|termination|failure to/i.test(text);
  const phone=/phone|call|telephone/i.test(text);
  const evidence=/nhs|hscni|trust|gp|hospital|pip|dwp|uc|universal credit|bank|aib|housing|repair|social care|assessment|autism|reasonable adjustment/i.test(text);
  const openLoop=/will contact|waiting|referral|follow up|respond|reply|investigation|review|arrange|book|confirm/i.test(text);
  const contact=paContact(route,low);
  const rec=Number(localStorage.mn_recovery_until||0)>Date.now();
  const priority=risk?'RED - check, do not ignore':(action?'AMBER - one review step':'GREEN - file / wait');
  const bottomLine='This looks like '+route+'. '+(appointment?'It may be an appointment or appointment-related item. ':action?'It may need one small action. ':'No immediate action is clear. ')+(phone?'It mentions phone/call, so written-only wording is important. ':'')+(rec?'Recovery mode is active, so keep demands minimal.':'');
  return {route,deadline,appointment,action,risk,phone,evidence,openLoop,contact,priority,bottomLine,text,meta,recovery:rec};
}
function paDate(text){
  const patterns=[/\b\d{1,2}[\/\-. ]\d{1,2}[\/\-. ]\d{2,4}\b/,/\b\d{1,2}\s+(January|February|March|April|May|June|July|August|September|October|November|December)\s+\d{4}\b/i,/\b(Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday)\s+\d{1,2}\s+(January|February|March|April|May|June|July|August|September|October|November|December)\b/i];
  for(const p of patterns){const m=text.match(p);if(m)return m[0]}
  return '';
}
function paCreateTasks(ctx){
  const tasks=[];
  if(ctx.evidence)tasks.push({title:'Saved evidence: '+ctx.route,queue:K.wait,status:'Done / saved',detail:'Saved to Mira timeline and document memory.'});
  if(ctx.appointment){
    tasks.push({title:'Prepare appointment: '+ctx.contact,queue:K.ready,status:'Ready / one step',detail:'Use Mellow AAC, Hospital Passport, written/no-phone adjustments, Easy Read request, visual aids/body chart if useful.'});
    tasks.push({title:'Recovery after appointment',queue:K.hidden,status:'Recovery shield',detail:'Protect 24-48h after appointment. Hide banking, forms and complex admin.'});
    tasks.push({title:'Follow up after appointment',queue:K.wait,status:'Waiting / after appointment',detail:'Check written summary, referrals, results, who is responsible and timescale.'});
  }else if(ctx.action){
    tasks.push({title:'Review '+ctx.route+' item',queue:K.ready,status:'Ready / one small step',detail:'Use generated bottom line and reply draft. Do not re-read everything.'});
  }else{
    tasks.push({title:'Filed '+ctx.route+' item',queue:K.wait,status:'Waiting / no action now',detail:'No clear action found. Keep as evidence only.'});
  }
  if(ctx.deadline!=='No clear date found')tasks.push({title:'Date found: '+ctx.deadline,queue:K.ready,status:'Calendar/check needed',detail:'Confirm whether this is an appointment, deadline or information date.'});
  if(ctx.phone)tasks.push({title:'Block phone demand',queue:K.ready,status:'Accessibility wording needed',detail:'Use written-only / no phone script.'});
  if(ctx.openLoop)tasks.push({title:'Watch open loop: '+ctx.contact,queue:K.wait,status:'Waiting / chase if overdue',detail:'Someone may need to reply, arrange, confirm or follow up.'});
  return tasks;
}
function paRenderResult(ctx,tasks,mum,reply){
  return 'ONE-TAP INTAKE\n\nWHAT IS THIS?\n'+ctx.route+'\n\nBOTTOM LINE\n'+ctx.bottomLine+'\n\nIMPORTANCE\n'+ctx.priority+'\n\nDATE / DEADLINE FOUND\n'+ctx.deadline+'\n\nDO I NEED TO DO ANYTHING TODAY?\n'+(ctx.risk?'YES - check calmly or ask support.':ctx.action?'POSSIBLY - one review step only.':'NO clear action today.')+'\n\nONE SAFEST NEXT STEP\n'+paNextStep(ctx)+'\n\nTASKS CREATED\n'+tasks.map(t=>'✓ '+t.title+' — '+t.status).join('\n')+'\n\nMUM CHINESE\n'+mum+'\n\nDRAFT REPLY IF NEEDED\n'+reply;
}
function paNextStep(ctx){
  if(ctx.appointment)return 'Confirm date/time/location, prepare Mellow AAC and protect recovery afterwards.';
  if(ctx.phone)return 'Do not phone. Use written-only reply or ask for written clarification.';
  if(ctx.risk)return 'Do not ignore. Review with support or use the draft reply asking for written confirmation.';
  if(ctx.action)return 'Use the prepared reply or save as one ready task. Stop after one step.';
  return 'No action now. Save to Mira and wait.';
}
function paMumSummary(ctx,tasks){
  return '妈妈，简单说：\n\n这是一条关于 '+ctx.route+' 的信息。\n\n重点：'+ctx.bottomLine+'\n\n日期/截止时间：'+ctx.deadline+'\n\n下一步：'+paNextStep(ctx)+'\n\nPA 已经自动保存并生成任务。请不要让我打电话；重要事情尽量用文字处理。';
}
function paContact(route,low){
  if(route==='Finance')return low.includes('aib')?'AIB / bank support':'Finance contact';
  if(route==='Healthcare')return low.includes('trust')||low.includes('hscni')?'Southern Trust / healthcare team':low.includes('gp')?'GP / healthcare team':'Healthcare contact';
  if(route==='Benefits')return low.includes('universal credit')||/\buc\b/.test(low)?'Universal Credit':'Benefits contact';
  if(route==='Housing')return low.includes('lotus')?'Lotus / housing repair contact':'Housing / repair contact';
  if(route==='Accessibility')return 'Accessibility / reasonable adjustments';
  return 'Unknown / not matched';
}
function paLogToMira(payload){let a=[];try{a=JSON.parse(localStorage.mira_next_timeline||'[]')}catch(e){}a.unshift(payload);localStorage.mira_next_timeline=JSON.stringify(a);localStorage.mira_next_active_session=JSON.stringify(payload)}
function paCopyMiraPayload(){let x=JSON.parse(localStorage.pa_last_task||'{}');copyText(JSON.stringify(x,null,2));set('out','Mira payload copied. It is also saved locally under mira_next_timeline and mira_next_active_session.')}
function paCopyReply(){let x=JSON.parse(localStorage.pa_last_task||'{}');copyText(x.draft_reply||'');set('out','Draft reply copied. Review before sending. PA does not auto-send.')}
function paTellMum(){let x=JSON.parse(localStorage.pa_last_task||'{}');copyText(x.mum_summary||'没有可复制的妈妈总结。');set('out',x.mum_summary||'没有可复制的妈妈总结。')}
function paCalendarDraft(){
  let x=JSON.parse(localStorage.pa_last_task||'{}');
  let t='Calendar draft\n\nTitle: '+(x.domain||'Item')+' - '+(x.contact||'')+'\nDate found: '+(x.deadline||'Not found')+'\nNotes:\n- Bring/use Mellow AAC if needed.\n- Request written summary / Easy Read.\n- No phone; written contact preferred.\n- Protect recovery afterwards.\n\nIf the date/time is definite, ask ChatGPT to add this to Google Calendar.';
  copyText(t);set('out',t);
}
function paShowTasks(){
  let x=JSON.parse(localStorage.pa_last_task||'{}');
  let t='TASKS CREATED\n\n'+((x.tasks||[]).map(a=>'• '+a.title+'\n  '+a.status+'\n  '+a.detail).join('\n\n')||'No tasks found.');
  set('out',t);
}
function paBottomLine(route,action){return 'This looks like a '+String(route).toLowerCase()+' message. '+(action?'It may need a response or review.':'No immediate action is clear from the copied text.')}
function paDraft(route,ctx={}){
  const noPhone='Please communicate with me in writing. Telephone contact is not accessible or safe for me.';
  if(route==='Finance')return 'Dear Team,\n\nPlease confirm the issue, amount, date, responsible team and next step in writing. '+noPhone+'\n\nKind regards,\nMenglu Liu';
  if(route==='Healthcare')return 'Dear Team,\n\nThank you for your message. Because of my disability-related communication, processing and fatigue difficulties, please confirm in writing what this means, what action is required, who is responsible, and the timescale. Please also provide an Easy Read or simple written summary where possible. '+noPhone+'\n\nKind regards,\nMenglu Liu';
  if(route==='Benefits')return 'Dear Team,\n\nThank you for your message. Because of my disability-related communication, processing and executive functioning difficulties, please confirm in writing what action is required, the deadline, and whether any reasonable adjustments can be applied. '+noPhone+'\n\nKind regards,\nMenglu Liu';
  return 'Dear Team,\n\nThank you for your message. Because of my disability-related communication and processing difficulties, please confirm in writing what this means, what action is required, who is responsible, and the deadline or timescale.\n\nKind regards,\nMenglu Liu';
}
function paResume(){let x=null;try{x=JSON.parse(localStorage.pa_last_task||'null')}catch(e){}if(!x){paAutoRouter();return}shell('Continue where I stopped','<div class="card out">Last task:\n'+(x.domain||'Unknown')+'\n'+(x.timestamp||'')+'</div>'+grid([['Resume result','paShowLast()','primary'],['Copy Mum Chinese','paTellMum()'],['Copy reply','paCopyReply()'],['Clear and start again','paClearLast()']])+'<div id="out" class="card out"></div>')}
function paShowLast(){let x=null;try{x=JSON.parse(localStorage.pa_last_task||'null')}catch(e){}if(!x){paAutoRouter();return}shell('Last One-Tap Result','<pre class="card out" style="white-space:pre-wrap;font-family:inherit">'+escapeHtml(x.result||JSON.stringify(x,null,2))+'</pre>'+grid([['Copy Mum Chinese','paTellMum()','primary'],['Copy reply','paCopyReply()'],['Calendar draft','paCalendarDraft()'],['Show tasks','paShowTasks()'],['Back to Intake','paAutoRouter()']])+'<div id="out" class="card out"></div>')}
function paClearLast(){delete localStorage.pa_last_task;delete localStorage.mira_next_active_session;paAutoRouter()}
function escapeHtml(s){return String(s).replace(/[&<>]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;'}[c]))}
