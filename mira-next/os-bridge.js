(function(){
  function jget(k,d){try{return JSON.parse(localStorage[k]||JSON.stringify(d))}catch(e){return d}}
  function esc(s){return String(s||'').replace(/[&<>]/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;'}[c]})}
  function latest(){return jget('uos_objects',[])}
  function button(label,fn,cls){var b=document.createElement('button');b.className=cls||'';b.innerHTML=label;b.addEventListener('click',fn);return b}
  function card(t,b){var d=document.createElement('div');d.className='card';d.innerHTML='<b>'+esc(t)+'</b><div class="out">'+esc(b||'')+'</div>';return d}
  function nowISO(){try{return new Date().toISOString()}catch(e){return String(Date.now())}}
  function safeSlice(arr,n){return Array.isArray(arr)?arr.slice(0,n):[]}
  function buildSyncPacket(){
    var objs=latest();
    var cases=jget('uos_cases',{});
    var tasks=jget('uos_tasks',[]);
    var drafts=jget('uos_drafts',[]);
    var tl=jget('uos_timeline',[]);
    var state=jget('uos_state',{mode:'HOME',recovery_until:0});
    var modeText=localStorage.getItem('current_mode_text')||'';
    var waiting=tasks.filter(function(t){return t.status==='Waiting'||/wait|open loop|follow|confirm|reply/i.test((t.title||'')+' '+(t.detail||''))});
    var action=tasks.filter(function(t){return t.status==='Needs Review'||t.priority==='RED'||/urgent|deadline|risk|required/i.test((t.title||'')+' '+(t.detail||''))});
    var activeCases=Object.values(cases).map(function(c){return {
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
    }});
    return {
      packet_type:'Mira-Next Sync Packet',
      generated_at:nowISO(),
      privacy_note:'User-initiated export from local browser state. Review before sharing. Do not paste private identifiers, bank details, confidential evidence, or unnecessary medical records unless needed for the task.',
      pipeline:'OS Evidence -> Current Context -> Safest Draft',
      current_context:{
        current_mode_text:modeText,
        recovery_state:state,
        active_case_count:activeCases.length,
        waiting_count:waiting.length,
        action_required_count:action.length,
        latest_object_summary:objs[0]?{
          object_id:objs[0].object_id,
          timestamp:objs[0].timestamp,
          event_type:objs[0].event_type,
          source_format:objs[0].source_format,
          cases:objs[0].caseNames,
          evidence_score:objs[0].evidence_score,
          recovery:objs[0].recovery,
          confidence:objs[0].confidence,
          output:objs[0].output
        }:null
      },
      active_cases:activeCases,
      waiting_items:safeSlice(waiting,30),
      action_required_items:safeSlice(action,30),
      recent_timeline:safeSlice(tl,30),
      recent_objects:safeSlice(objs,10).map(function(o){return {
        object_id:o.object_id,
        timestamp:o.timestamp,
        event_type:o.event_type,
        source_format:o.source_format,
        cases:o.caseNames,
        evidence_score:o.evidence_score,
        recovery:o.recovery,
        confidence:o.confidence,
        output:o.output
      }}),
      prepared_drafts:safeSlice(drafts,10).map(function(d){return {
        draft_id:d.draft_id,
        status:d.status,
        cases:d.cases,
        date:d.date,
        layers:d.layers
      }})
    };
  }
  function packetText(){return 'Update: process this Mira-Next Sync Packet against Menglu OS. Apply the Three-Layer Pipeline, separate OS Evidence from Current Context, identify contradictions/gaps, then produce only the required Context Packet, Case Summary, or Safest Draft.\n\n```json\n'+JSON.stringify(buildSyncPacket(),null,2)+'\n```'}
  function copyText(t){try{navigator.clipboard&&navigator.clipboard.writeText(t)}catch(e){}}
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
    grid.appendChild(button('📤 Export Sync Packet',showSyncPacket,'primary'));
    app.appendChild(grid);
    objs.slice(0,10).forEach(function(o){
      var summary=(o.event_type||'Object')+'\nCases: '+((o.caseNames||[]).join(' / ')||'General')+'\nEvidence: '+(o.evidence_score||'?')+'/5\nRecovery: '+((o.recovery&&o.recovery.label)||'')+'\nOutput: '+(o.output||'');
      app.appendChild(card((o.timestamp||'')+' · '+(o.object_id||''),summary));
    });
  }
  function showSyncPacket(){
    var app=document.getElementById('app');if(!app)return;
    var txt=packetText();
    app.innerHTML='';
    app.appendChild(card('Mira-Next Sync Packet','Copy this packet into ChatGPT when you want a full Menglu OS update review. It exports local browser state only when you choose to copy it.'));
    var ta=document.createElement('textarea');ta.rows=14;ta.value=txt;ta.style.width='100%';ta.style.fontSize='15px';ta.style.padding='12px';ta.style.borderRadius='12px';ta.style.border='1px solid #aaa';
    app.appendChild(ta);
    var grid=document.createElement('div');grid.className='grid';
    grid.appendChild(button('📋 Copy Sync Packet',function(){ta.select();copyText(ta.value)},'primary'));
    grid.appendChild(button('Back to OS Viewer',renderOSObjects,''));
    app.appendChild(grid);
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
  window.MiraOS={renderOSObjects:renderOSObjects,showCases:showCases,showWaiting:showWaiting,showDrafts:showDrafts,showSyncPacket:showSyncPacket,buildSyncPacket:buildSyncPacket};
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',injectButton);else injectButton();
})();