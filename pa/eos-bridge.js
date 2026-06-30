(function(){
  function jget(k,d){try{return JSON.parse(localStorage[k]||JSON.stringify(d))}catch(e){return d}}
  function jset(k,v){localStorage[k]=JSON.stringify(v)}
  function esc(s){return String(s||'').replace(/[&<>]/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;'}[c]})}
  function card(t,b){var d=document.createElement('div');d.className='card';d.innerHTML='<b>'+esc(t)+'</b><div class="out">'+esc(b||'')+'</div>';return d}
  function button(label,fn,cls){var b=document.createElement('button');b.className=cls||'';b.innerHTML=label;b.addEventListener('click',fn);return b}
  function daysSince(date){var t=Date.parse(date||'');if(!t)return 0;return Math.floor((Date.now()-t)/86400000)}
  function objects(){return jget('uos_objects',[])}
  function tasks(){return jget('uos_tasks',[])}
  function cases(){return jget('uos_cases',{})}
  function state(){return jget('uos_state',{mode:'HOME',recovery_until:0})}
  function latest(){return objects()[0]||jget('uos_last',null)}
  function recoveryActive(){return Number(state().recovery_until||0)>Date.now()}
  function caseStatus(c){
    var wait=String(c.waiting_for||'').toLowerCase();
    var age=daysSince(c.updated);
    if(/no action|none/.test(wait))return 'Complete / monitor';
    if(age>=30)return 'Escalate review';
    if(age>=14)return 'Chase soon';
    if(age>=7)return 'Monitor';
    if(/external|waiting|reply|promise|referral|confirm/.test(wait))return 'Waiting';
    return 'Active';
  }
  function evidenceWatch(o){
    if(!o)return 'No new object yet.';
    var lines=[];
    var raw=(o.raw||o.text||'').toLowerCase();
    var cases=(o.caseNames||[]).join(' / ')||'General';
    lines.push('Latest: '+(o.event_type||'Object')+' → '+cases);
    lines.push('Evidence value: '+(o.evidence_score||'?')+'/5');
    if(/pip|daily living|mobility|safe|repeatedly|support|prompting|supervision/.test(raw))lines.push('Supports PIP: likely yes.');
    if(/social care|support worker|care plan|daily living|coordination|follow up/.test(raw))lines.push('Supports Social Care: likely yes.');
    if(/nhs|gp|hospital|clinic|referral|diagnosis|symptom|pain|fatigue|pots|autism/.test(raw))lines.push('Supports healthcare evidence: likely yes.');
    if(/phone|call|telephone/.test(raw))lines.push('Accessibility issue: phone demand detected.');
    if(/cancel|refuse|no evidence|fit|independent|no need/.test(raw))lines.push('Possible contradiction/risk: review wording carefully.');
    if(lines.length===3)lines.push('No obvious contradiction detected.');
    return lines.join('\n');
  }
  function recoveryGuard(){
    var s=state(), rec=recoveryActive(), t=tasks(), urgent=t.filter(function(x){return x.priority==='RED'||/deadline|urgent|risk/i.test(x.title+' '+x.detail)}), optional=t.filter(function(x){return x.priority==='LOW'||x.status==='Hidden'});
    if(rec)return 'Recovery active.\n\nProtect next hours.\n\nShow only urgent/statutory items.\nUrgent visible: '+urgent.length+'\nOptional suppressed: '+optional.length+'\n\nOne safest action: '+((urgent[0]&&urgent[0].title)||'Rest / no admin now');
    return 'Recovery not active.\n\nIf appointment, travel, hospital, dentist, social care or major admin happens today, start recovery protection.\n\nOne safest action: keep workload low and process only one item.';
  }
  function dailyEOS(){
    var c=Object.values(cases()), t=tasks(), objs=objects(), s=state(), rec=recoveryActive();
    var ready=t.filter(function(x){return x.status==='Needs Review'||x.priority==='RED'});
    var waiting=t.filter(function(x){return x.status==='Waiting'||/wait|open loop|follow/i.test(x.title+' '+x.detail)});
    var risks=t.filter(function(x){return x.priority==='RED'||/urgent|deadline|risk|phone/i.test(x.title+' '+x.detail)});
    var complete=t.filter(function(x){return x.status==='Done'});
    var activeCases=c.map(function(x){return (x.name||'Case')+': '+caseStatus(x)}).slice(0,12).join('\n');
    return 'Daily EOS Dashboard\n\nCapacity Summary\n'+(rec?'RECOVERY MODE — reduce admin.':'HOME MODE — one task only.')+'\n\nRecovery Monitor\n'+(rec?'Active until: '+new Date(Number(s.recovery_until||0)).toLocaleString():'No recovery block active')+'\n\nActive Cases\n'+(activeCases||'No active cases yet')+'\n\nWaiting for Responses\n'+waiting.length+' waiting/open-loop item(s)\n\nRisks\n'+(risks[0]?risks.map(function(x){return '- '+x.title}).slice(0,5).join('\n'):'No high-risk task detected')+'\n\nRecommended Workload\n'+(ready[0]?'Review one item only: '+ready[0].title:'No review needed now')+'\n\nRecently Completed Actions\n'+complete.slice(0,5).map(function(x){return '- '+x.title}).join('\n')+'\n\nObjects stored\n'+objs.length;
  }
  function caseReview(){
    var c=Object.values(cases());
    if(!c.length)return 'No cases yet. Use PA Intake first.';
    return c.map(function(x){return (x.name||'Case')+'\nStatus: '+caseStatus(x)+'\nWaiting: '+(x.waiting_for||'')+'\nRisk: '+(x.risk||'')+'\nEvidence: '+(x.evidence_score||'')+'/5\nLast update: '+(x.updated||'')+'\nNext: '+(x.next||'')}).join('\n\n---\n\n');
  }
  function renderEOS(){
    var app=document.getElementById('app');if(!app)return;
    app.innerHTML='';
    app.appendChild(card('EOS Dashboard v2',dailyEOS()));
    var g=document.createElement('div');g.className='grid';
    g.appendChild(button('🧭 Case Review v2',function(){showText('Case Review v2',caseReview())},'primary'));
    g.appendChild(button('🛡 Recovery Guard v2',function(){showText('Recovery Guard v2',recoveryGuard())},'danger'));
    g.appendChild(button('📎 Evidence Watch v2',function(){showText('Evidence Watch v2',evidenceWatch(latest()))},'primary'));
    g.appendChild(button('📋 Copy EOS',function(){navigator.clipboard?.writeText(dailyEOS())},''));
    app.appendChild(g);
  }
  function showText(title,text){var app=document.getElementById('app');if(!app)return;app.innerHTML='';app.appendChild(card(title,text));var g=document.createElement('div');g.className='grid';g.appendChild(button('Back to EOS',renderEOS,'primary'));g.appendChild(button('Copy',function(){navigator.clipboard?.writeText(text)},''));app.appendChild(g)}
  function inject(){
    var nav=document.querySelector('.bottom');
    if(nav&&!document.getElementById('bEOS')){
      var b=document.createElement('button');b.id='bEOS';b.innerHTML='🧭<br>EOS';b.addEventListener('click',renderEOS);nav.appendChild(b);
      nav.style.gridTemplateColumns='repeat(6,1fr)';
    }
    var app=document.getElementById('app');
    if(app&&!document.getElementById('eosTopButton')){
      var top=document.querySelector('.top')||document.body.firstElementChild;
    }
  }
  window.EOS={renderEOS:renderEOS,dailyEOS:dailyEOS,caseReview:caseReview,recoveryGuard:recoveryGuard,evidenceWatch:evidenceWatch};
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',inject);else inject();
})();