const sections=[
{id:'critical',title:'⚠️ Medical flags',items:[
['CRITICAL MEDICAL FLAGS','I have Autism, POTS, and severe ME/CFS. My baseline involves severe fatigue, dizziness, and cognitive overload. I am currently experiencing an energy crash and cannot speak or process speech normally. Please look at my printed Hospital Passport or contact my mother, Kun Shi.','red','Show first'],
['Energy crash','I may be in an energy crash. I may look calm, but my ability to speak, think, stand, process questions, and make decisions may be reduced. Please reduce demands and allow rest.','red','Delayed collapse'],
['Quiet medical support','Please move me to a quieter, lower sensory place if possible. Noise, bright light, repeated questioning and pressure can make my communication and physical symptoms worse.','red','Reduce sensory load']]
},
{id:'boundary',title:'🛡 Boundaries',items:[
['Processing Barrier','Please ask clear, specific, structured questions. Open-ended questions like How are you feeling or What do you need act as cognitive barriers for me right now.','purple','Avoid open questions'],
['Physical Symptoms Only','I process my environment and distress through physical descriptions rather than emotional labels. Please accept my physical symptom descriptions as valid evidence of my state.','purple','Physical evidence'],
['Written Path Only','I cannot process telephone calls or make decisions in real time on the phone. All official outcomes, next steps, and questions must be sent to me in clear writing so I can review them with my support team.','red','Written only'],
['Supported not independent','If I answer using this device, prepared notes, my mother, or extra time, this is supported communication. It does not mean I can manage the same interaction independently, repeatedly, quickly, or by phone.','purple','Do not overestimate']]
},
{id:'quick',title:'✅ Quick answers',items:[
['Yes','Yes, that is correct. Please continue, but please give me time to process before asking the next question.','green','Clear yes'],
['No','No, that is not correct. I may need extra time to explain why, or I may need to write it down instead of speaking.','red','Clear no'],
['Please wait','Please wait. I need extra processing time. I am not ignoring you; I am trying to understand and organise my answer.','purple','Processing time'],
['Stop now','I need to stop now. Continuing may make my communication, fatigue, dizziness or sensory overload worse.','red','Stop safely']]
},
{id:'intro',title:'🌸 Introduction',items:[
['Introduce myself','Hello. My name is Menglu Liu. I use this communication assistant because speaking, processing spoken information and organising answers can be difficult for me, especially when I am tired, overwhelmed, unwell, or in a busy environment.','purple','Who I am'],
['Why I use this','I am autistic and I also experience chronic fatigue, POTS or dizziness, brain fog, pain and communication difficulties. I may understand more than I can say out loud.','purple','Main explanation'],
['Speak to me','Please speak to me directly. My mother may support me, but I remain the decision-maker. If I cannot answer quickly, please do not assume I do not understand.','green','Decision-maker'],
['Written communication','Written communication is much safer for me than phone calls or fast verbal conversation. It lets me process at my own pace, check details, and follow up later.','green','Written first']]
},
{id:'medical',title:'🏥 Medical',items:[
['Prepared notes','I have prepared notes because I find it difficult to explain everything verbally in real time. Please allow me to use my notes so important information is not missed.','purple','Use notes'],
['Hospital Passport','Please read my Hospital Passport or communication information before asking detailed questions. It explains my communication needs and reasonable adjustments.','green','Read passport'],
['Dizzy / POTS','I have POTS or orthostatic intolerance symptoms. Please let me sit, stand or lie down slowly, and please do not rush position changes.','red','Dizziness risk'],
['Severe fatigue','I have severe fatigue and post-exertional worsening. I may seem able during the appointment but become much worse afterwards, so please keep communication efficient and provide written follow-up.','red','PEM risk']]
},
{id:'emergency',title:'🆘 Urgent',items:[
['Feel faint','I think I may faint. Please help me sit or lie down safely, reduce stimulation, and get medical help if needed.','red','Faint risk'],
['Cannot speak','I cannot speak right now. Please use written communication, reduce questions, give me time, and do not assume I am refusing to cooperate.','red','Non-speaking'],
['Urgent help','I think I need urgent medical help. Please help me access appropriate urgent support and explain that I may have communication difficulties.','red','Get help'],
['Stop immediately','I need to stop immediately and rest. Continuing may worsen my symptoms or make me unable to communicate safely.','red','Immediate stop']]
}];
function makePage(){const content=document.getElementById('content');if(!content)return;content.innerHTML='';sections.forEach(section=>{const wrap=document.createElement('section');wrap.className='section-card';const h=document.createElement('div');h.className='section';h.id=section.id;h.textContent=section.title;wrap.appendChild(h);const hint=document.createElement('div');hint.className='hint';hint.textContent='Swipe sideways to see more buttons.';wrap.appendChild(hint);const grid=document.createElement('div');grid.className='grid';section.items.forEach(item=>{const b=document.createElement('button');b.className='btn '+(item[2]||'');b.innerHTML=item[0]+(item[3]?'<small>'+item[3]+'</small>':'');b.onclick=()=>speakText(item[1]);grid.appendChild(b);});wrap.appendChild(grid);content.appendChild(wrap);});}
function getVoice(lang){const voices=window.speechSynthesis?window.speechSynthesis.getVoices():[];if(lang==='zh-CN')return voices.find(v=>v.lang&&v.lang.toLowerCase().startsWith('zh'))||null;return voices.find(v=>v.lang==='en-GB')||voices.find(v=>v.lang&&v.lang.startsWith('en'))||null}
function chunkText(t){return String(t).replace(/<[^>]*>/g,' ').split(/(?<=[.!?。！？])\s+/).map(x=>x.trim()).filter(Boolean)}
let speechKeepAlive=null;
function speakText(text){const box=document.getElementById('spokenText');if(box)box.textContent=text;if(!('speechSynthesis'in window))return;window.speechSynthesis.cancel();clearInterval(speechKeepAlive);const lang=/[\u4e00-\u9fff]/.test(text)?'zh-CN':'en-GB';const parts=chunkText(text);const voice=getVoice(lang);let i=0;function next(){if(i>=parts.length){clearInterval(speechKeepAlive);return}const u=new SpeechSynthesisUtterance(parts[i++]);u.lang=lang;u.rate=.78;u.pitch=1;if(voice)u.voice=voice;u.onend=next;u.onerror=next;window.speechSynthesis.speak(u)}speechKeepAlive=setInterval(()=>{try{if(window.speechSynthesis.speaking)window.speechSynthesis.resume()}catch(e){}},900);next();}
function unlockVoice(){if(!('speechSynthesis'in window)){document.getElementById('spokenText').textContent='Speech is not supported in this browser.';return}speechSynthesis.cancel();speakText('Voice is unlocked. The communication assistant is ready. Tap any card to speak.');}
function stopSpeech(){if('speechSynthesis'in window)window.speechSynthesis.cancel();clearInterval(speechKeepAlive);document.getElementById('spokenText').textContent='Speech stopped.'}
function testSpeech(){speakText('This is a test. Long messages will be spoken in smaller parts for iPhone stability.')}
function jump(id){document.getElementById(id)?.scrollIntoView({behavior:'smooth',block:'start'})}
function openMira(){location.href='./mira-next/'}
if('speechSynthesis'in window){speechSynthesis.onvoiceschanged=()=>getVoice('en-GB')}
if('serviceWorker'in navigator){navigator.serviceWorker.register('sw.js').catch(()=>{})}
window.speakText=speakText;window.unlockVoice=unlockVoice;window.stopSpeech=stopSpeech;
makePage();