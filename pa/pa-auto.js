function paAutoRouter(){
  shell('Paste & Detect','<div class="card out">One tap. PA reads copied text, detects the type, creates an Easy Read result, and logs it to Mira.</div>'+grid([
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
  set('out',result);
  localStorage.pa_last_task=JSON.stringify({route:route,text:text,result:result,date:new Date().toLocaleString('en-GB')});
  add(MK.line,{a:'PA Paste Detect: '+route,b:text});
  add(MK.doc,{a:'PA Easy Read: '+route,b:result});
  if(action)add(K.ready,{a:'Review '+route+' item',org:route,status:'Ready / one step',b:'Created by Paste & Detect.'});
  else add(K.wait,{a:'Filed '+route+' item',org:route,status:'Waiting',b:'No clear action found.'});
}
function paBottomLine(route,action){return 'This looks like a '+route.toLowerCase()+' message. '+(action?'It may need a response or review.':'No immediate action is clear from the copied text.')}
function paDraft(route){
  if(route==='Finance')return 'Dear Team,\n\nPlease confirm the issue, amount, date, responsible team and next step in writing. Telephone contact is not accessible for me.\n\nKind regards,\nMenglu Liu';
  return 'Dear Team,\n\nThank you for your message. Because of my disability-related communication and processing difficulties, please confirm in writing what this means, what action is required, who is responsible, and the deadline or timescale.\n\nKind regards,\nMenglu Liu';
}
function paResume(){
  let x=null;try{x=JSON.parse(localStorage.pa_last_task||'null')}catch(e){}
  if(!x){paAutoRouter();return}
  shell('Continue where I stopped','<div class="card out">Last task:\n'+x.route+'\n'+x.date+'</div>'+grid([
    ['Resume result','paShowLast()','primary'],
    ['Clear and start again','paClearLast()']
  ])+'<div id="out" class="card out"></div>')
}
function paShowLast(){let x=JSON.parse(localStorage.pa_last_task);set('out',x.result)}
function paClearLast(){delete localStorage.pa_last_task;paAutoRouter()}
