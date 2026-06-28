function paAutoRouter(){
  shell('Paste & Detect','<div class="card out">One tap. PA reads copied text, detects the type, creates an Easy Read result, and saves it into Mira memory.</div>'+grid([
    ['🪄 Process Clipboard','paProcessClipboard()','primary'],
    ['↩ Back Home','home()']
  ])+'<div id="out" class="card out"></div>')
}
async function paProcessClipboard(){
  let text='';
  try{text=await navigator.clipboard.readText()}catch(e){set('out','Clipboard blocked. Copy text first, then try again.');return}
  if(!text||!text.trim()){set('out','Clipboard is empty. Copy a message first.');return}
  paRouteText(text.trim())
}
function paRouteText(text){
  const low=text.toLowerCase();
  let route='General';
  if(/nhs|hscni|trust|gp|doctor|hospital|clinic|appointment|rheumatology|dentist/.test(low)) route='Healthcare';
  else if(/pip|dwp|universal credit|uc |lcwra|benefit|dfc/.test(low)) route='Benefits';
  else if(/bank|payment|direct debit|refund|chargeback|invoice|debt|standing order|aib/.test(low)) route='Finance';
  else if(/repair|housing|leak|alarm|electric|builder|lotus|plumber/.test(low)) route='Housing';
  else if(/college|university|course|student|study/.test(low)) route='Education';
  const deadline=(text.match(/\b\d{1,2}[\/\-. ]\d{1,2}[\/\-. ]\d{2,4}\b/)||text.match(/\b\d{1,2}\s+[A-Za-z]+\s+\d{4}\b/)||['No clear deadline found'])[0];
  const action=/reply|required|complete|return|confirm|book|attend|deadline|before|by |call|contact/i.test(text);
  const risk=/urgent|final|overdue|missed|debt|fraud|cancel|suspend|appointment/i.test(text);
  const reply=paDraft(route);
  const result='THE BOTTOM LINE\n'+paBottomLine(route,action)+'\n\nDO I NEED TO DO ANYTHING?\n'+(action?'YES - one small review step.':'NO clear action found. Put in waiting.')+'\n\nNEXT STEP\n'+(action?'Review the draft reply or ask for written clarification.':'Do nothing now. File it and wait.')+'\n\nDEADLINE\n'+deadline+'\n\nPRIORITY\n'+(risk?'Check calmly. Do not ignore.':'Low or unclear.')+'\n\nDRAFT REPLY\n'+reply;
  const payload={timestamp:new Date().toISOString(),domain:route,source:'PA Paste Detect',contact:paContact(route,low),summary:paBottomLine(route,action),action_taken:action?'Easy Read created and draft reply prepared for review':'Filed as waiting / no action found',deadline:deadline,evidence_flag:route!=='General',result:result,original:text};
  set('out',result+'\n\nACTIONS\nUse buttons below.\n\n');
  localStorage.pa_last_task=JSON.stringify(payload);
  paLogToMira(payload);
  add(MK.line,{a:'PA Paste Detect: '+route,b:text});
  add(MK.doc,{a:'PA Easy Read: '+route,b:result});
  if(action)add(K.ready,{a:'Review '+route+' item',org:route,status:'Ready / one step',b:'Created by Paste & Detect.'});
  else add(K.wait,{a:'Filed '+route+' item',org:route,status:'Waiting',b:'No clear action found.'});
  document.getElementById('out').innerHTML='<pre style="white-space:pre-wrap;font-family:inherit">'+escapeHtml(result)+'</pre>'+grid([
    ['📋 Copy reply','paCopyReply()','primary'],
    ['📁 Log to Mira','paCopyMiraPayload()'],
    ['👩 Tell Mum','paTellMum()'],
    ['↩ Back','paAutoRouter()']
  ]);
}
function paContact(route,low){
  if(route==='Finance')return low.includes('aib')?'AIB / bank support':'Finance contact';
  if(route==='Healthcare')return low.includes('trust')||low.includes('hscni')?'Southern Trust / healthcare team':'Healthcare contact';
  if(route==='Benefits')return low.includes('universal credit')||low.includes('uc ')?'Universal Credit':'Benefits contact';
  if(route==='Housing')return 'Housing / repair contact';
  return 'Unknown / not matched';
}
function paLogToMira(payload){
  let a=[];try{a=JSON.parse(localStorage.mira_next_timeline||'[]')}catch(e){}
  a.unshift(payload);
  localStorage.mira_next_timeline=JSON.stringify(a);
  localStorage.mira_next_active_session=JSON.stringify(payload);
}
function paCopyMiraPayload(){
  let x=JSON.parse(localStorage.pa_last_task||'{}');
  copyText(JSON.stringify(x,null,2));
  set('out','Mira payload copied. It is also saved locally under mira_next_timeline and mira_next_active_session.');
}
function paCopyReply(){let x=JSON.parse(localStorage.pa_last_task||'{}');let m=(x.result||'').split('DRAFT REPLY\n')[1]||x.result||'';copyText(m);set('out','Draft reply copied. Review before sending. PA does not auto-send.')}
function paTellMum(){let x=JSON.parse(localStorage.pa_last_task||'{}');let msg='妈妈，PA 已经处理了一条 '+(x.domain||'信息')+'。\n\n意思：'+(x.summary||'需要查看。')+'\n\n下一步：'+(x.action_taken||'等待或之后再看。')+'\n\n截止日期：'+(x.deadline||'没有找到。');copyText(msg);set('out',msg)}
function paBottomLine(route,action){return 'This looks like a '+route.toLowerCase()+' message. '+(action?'It may need a response or review.':'No immediate action is clear from the copied text.')}
function paDraft(route){
  if(route==='Finance')return 'Dear Team,\n\nPlease confirm the issue, amount, date, responsible team and next step in writing. Telephone contact is not accessible for me.\n\nKind regards,\nMenglu Liu';
  return 'Dear Team,\n\nThank you for your message. Because of my disability-related communication and processing difficulties, please confirm in writing what this means, what action is required, who is responsible, and the deadline or timescale.\n\nKind regards,\nMenglu Liu';
}
function paResume(){
  let x=null;try{x=JSON.parse(localStorage.pa_last_task||'null')}catch(e){}
  if(!x){paAutoRouter();return}
  shell('Continue where I stopped','<div class="card out">Last task:\n'+(x.domain||x.route||'Unknown')+'\n'+(x.timestamp||x.date||'')+'</div>'+grid([
    ['Resume result','paShowLast()','primary'],
    ['Copy Mira payload','paCopyMiraPayload()'],
    ['Clear and start again','paClearLast()']
  ])+'<div id="out" class="card out"></div>')
}
function paShowLast(){let x=JSON.parse(localStorage.pa_last_task);set('out',x.result||JSON.stringify(x,null,2))}
function paClearLast(){delete localStorage.pa_last_task;delete localStorage.mira_next_active_session;paAutoRouter()}
function escapeHtml(s){return String(s).replace(/[&<>]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;'}[c]))}
