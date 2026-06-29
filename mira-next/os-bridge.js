(function(){
  function jget(k,d){try{return JSON.parse(localStorage[k]||JSON.stringify(d))}catch(e){return d}}
  function esc(s){return String(s||'').replace(/[&<>]/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;'}[c]})}
  function latest(){return jget('uos_objects',[])}
  function button(label,fn,cls){var b=document.createElement('button');b.className=cls||'';b.innerHTML=label;b.addEventListener('click',fn);return b}
  function card(t,b){var d=document.createElement('div');d.className='card';d.innerHTML='<b>'+esc(t)+'</b><div class="out">'+esc(b||'')+'</div>';return d}
  function renderOSObjects(){
    var app=document.getElementById('app');
    if(!app)return;
    var objs=latest(),cases=jget('uos_cases',{}),tasks=jget('uos_tasks',[]),drafts=jget('uos_drafts',[]),tl=jget('uos_timeline',[]);
    app.innerHTML='';
    app.appendChild(card('Menglu OS Evidence Viewer','PA creates objects. Mira displays them as evidence, timeline, waiting items and case history.\n\nObjects: '+objs.length+'\nCases: '+Object.keys(cases).length+'\nTasks: '+tasks.length+'\nDrafts: '+drafts.length+'\nTimeline: '+tl.length));
    var grid=document.createElement('div');grid.className='grid';
    grid.appendChild(button('🧩 Latest Object',function(){showObject(objs[0])},'primary'));
    grid.appendChild(button('🧠 Case Evidence',showCases,'primary'));
    grid.appendChild(button('⏳ Waiting / Open Loops',showWaiting,''));
    grid.appendChild(button('📋 Draft Layers',showDrafts,''));
    app.appendChild(grid);
    objs.slice(0,10).forEach(function(o){
      var summary=(o.event_type||'Object')+'\nCases: '+((o.caseNames||[]).join(' / ')||'General')+'\nEvidence: '+(o.evidence_score||'?')+'/5\nRecovery: '+((o.recovery&&o.recovery.label)||'')+'\nOutput: '+(o.output||'');
      app.appendChild(card((o.timestamp||'')+' · '+(o.object_id||''),summary));
    });
  }
  function showObject(o){
    var app=document.getElementById('app');if(!app)return;
    if(!o){app.innerHTML='';app.appendChild(card('No object','Go to PA and process an intake first.'));return}
    app.innerHTML='';
    app.appendChild(card('Structured Object',JSON.stringify({object_id:o.object_id,event_type:o.event_type,source_format:o.source_format,cases:o.caseNames,case_objects:o.case_objects,tasks:o.tasks,draft_object:o.draft_object,recovery:o.recovery,confidence:o.confidence,output:o.output},null,2)));
    app.appendChild(button('Back to OS Viewer',renderOSObjects,'primary'));
  }
  function showCases(){
    var app=document.getElementById('app'),cases=jget('uos_cases',{});if(!app)return;app.innerHTML='';
    app.appendChild(card('Case Evidence','Each case is built from PA structured objects.'));
    Object.values(cases).forEach(function(c){app.appendChild(card(c.name||'Case','Phase: '+(c.phase||'')+'\nOwner: '+(c.owner||'')+'\nWaiting: '+(c.waiting_for||'')+'\nRisk: '+(c.risk||'')+'\nEvidence score: '+(c.evidence_score||'')+'/5\nOpen loops: '+(c.open_loops||0)+'\nUpdated: '+(c.updated||'')))});
    app.appendChild(button('Back to OS Viewer',renderOSObjects,'primary'));
  }
  function showWaiting(){
    var app=document.getElementById('app'),tasks=jget('uos_tasks',[]).filter(function(t){return t.status==='Waiting'||/wait|open loop|follow/i.test(t.title+' '+t.detail)});if(!app)return;app.innerHTML='';
    app.appendChild(card('Waiting / Open Loops','These are items that may need external reply, confirmation, or future chase.'));
    if(!tasks.length)app.appendChild(card('No waiting items','Nothing waiting in PA objects.'));
    tasks.forEach(function(t){app.appendChild(card(t.title,'Status: '+t.status+'\nPriority: '+(t.priority||'')+'\nNeed from Menglu: '+(t.need||'None')+'\n'+(t.detail||'')))});
    app.appendChild(button('Back to OS Viewer',renderOSObjects,'primary'));
  }
  function showDrafts(){
    var app=document.getElementById('app'),drafts=jget('uos_drafts',[]);if(!app)return;app.innerHTML='';
    app.appendChild(card('Draft Layers','Prepared but not sent. Use PA/ChatGPT to review before sending.'));
    if(!drafts.length)app.appendChild(card('No drafts','No prepared draft objects yet.'));
    drafts.slice(0,20).forEach(function(d){var layers=d.layers||{};app.appendChild(card(d.draft_id||'Draft','Professional:\n'+(layers.professional||'')+'\n\nEasy Read:\n'+(layers.easy_read_summary||'')+'\n\nChinese Mum Summary:\n'+(layers.chinese_summary_for_mum||'')))});
    app.appendChild(button('Back to OS Viewer',renderOSObjects,'primary'));
  }
  function injectButton(){
    var top=document.querySelector('.top');
    if(!top||document.getElementById('miraOSBtn'))return;
    var b=document.createElement('button');b.id='miraOSBtn';b.className='primary';b.textContent='🧩 OS Evidence';b.addEventListener('click',renderOSObjects);top.appendChild(b);
  }
  window.MiraOS={renderOSObjects:renderOSObjects,showCases:showCases,showWaiting:showWaiting,showDrafts:showDrafts};
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',injectButton);else injectButton();
})();