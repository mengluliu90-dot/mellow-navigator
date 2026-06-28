function localServices(){
  shell('Banbridge Local One-Tap','<div class="card out">Local shortcuts for Banbridge. Phone buttons are for a support person if needed. Menglu should still use written communication where possible.</div>'+grid([
    ['🏥 GP front desk card','gpFrontDesk()','primary'],
    ['📄 GP written request','gpWrittenRequest()'],
    ['👥 Social care letter','socialCareLetter()','primary'],
    ['🚕 Travel access note','travelAccessNote()'],
    ['📞 GP number card','gpNumberCard()'],
    ['🌙 Out of Hours card','outHoursCard()','danger']
  ])+'<div id="out" class="card out"></div>')
}
function gpFrontDesk(){
  const t='Hello. I am a patient registered at Banbridge Group Surgery. I am currently experiencing reduced speech, severe brain fog, fatigue and communication difficulty due to autism, ME/CFS and POTS. I cannot safely manage fast verbal communication. Please use written communication, one question at a time, or contact my caregiver if urgent. Practice address: Banbridge Group Surgery, 1 Old Hospital Road, Banbridge, BT32 3GN.';
  set('out',t);copyText(t);add(MK.doc,{a:'Banbridge GP front desk script',b:t})
}
function gpWrittenRequest(){
  const t='Dear Banbridge Group Surgery Team,\n\nI am a registered patient. Due to autism, severe fatigue, brain fog and communication difficulties, I cannot safely manage telephone communication.\n\nPlease use written communication where possible and confirm any next steps, appointments, medication queries or requests in writing.\n\nCurrent regular medicines include Dymista nasal spray and Gaviscon. Please check my medical record before making any medication changes.\n\nAllergies recorded: Duac Once Daily Gel / benzoyl peroxide plus clindamycin phosphate, pollen, onions, shellfish and oysters.\n\nKind regards,\nMenglu Liu';
  set('out',t);copyText(t);add(MK.doc,{a:'Banbridge GP written request',b:t})
}
function socialCareLetter(){
  const today=new Date().toLocaleDateString('en-GB');
  const t='To: Southern Health and Social Care Trust / Banbridge locality team\nDate: '+today+'\n\nRE: Reasonable Adjustments and Functional Impact Statement\n\nDear Social Care Team,\n\nI am writing about my support needs and care coordination. Because of autism, ME/CFS, POTS, brain fog, executive dysfunction and communication barriers, long-form writing, phone calls and repeated self-advocacy can cause significant deterioration.\n\nPlease use clear written communication and provide one issue at a time. Please confirm who is responsible, what the next step is, and the timescale.\n\nFunctional impact:\n- Mobility and travel: I cannot travel independently and may experience dizziness, faintness, fatigue and joint pain.\n- Daily living: I need support, prompting or supervision with meals, medication, hygiene, planning and safe outings.\n- Communication and administration: I need written communication, extra processing time and help with follow-up, forms and coordination.\n\nPlease consider a coordination-focused support pathway rather than relying on telephone contact or multiple unsupported tasks.\n\nKind regards,\nMenglu Liu';
  set('out',t);copyText(t);add(MK.doc,{a:'Banbridge social care letter',b:t})
}
function travelAccessNote(){
  const t='Accessibility Note: Ticket or journey is for Menglu Liu. I am autistic and have severe fatigue, POTS with dizziness/fainting risk, and joint hypermobility. I cannot stand for long periods and cannot travel independently. I will be accompanied by a carer. Please support step-free access, reduced waiting, seating, and clear written instructions where possible. Thank you.';
  set('out',t);copyText(t);add(MK.doc,{a:'Travel accessibility note',b:t})
}
function gpNumberCard(){set('out','Banbridge Group Surgery\nPhone: 028 4062 3303\nAddress: 1 Old Hospital Road, Banbridge, BT32 3GN\n\nUse only if a support person needs to call. Written communication is safer for Menglu.')}
function outHoursCard(){set('out','GP Out of Hours\nPhone: 028 3839 9201\nUse for urgent issues that cannot wait until the surgery opens. For life-threatening emergency, call 999.')}
