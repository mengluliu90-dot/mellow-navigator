# Changelog

## v0.42.0 - Claim Verification and Conflicting Needs Tools

### Added

- `Menglu-OS/core/DECISION_ENGINE.md` now includes a Claim Verification Gate for alleged debts, liability claims, billing disputes, account issues, warranty claims, official demands, and similar assertions.
- `Menglu-OS/core/DECISION_ENGINE.md` now includes a Conflicting Needs Resolver for situations where two or more valid access, health, communication, sensory, energy, environmental, safety, or administrative needs cannot be fully met at the same time.
- `Menglu-OS/core/MEMORY_MODEL.md` now includes Claim Verification Evidence and Conflicting Needs Evidence rules.
- `Menglu-OS/templates/GENERAL_OFFICIAL_EMAIL.md` now includes reusable Evidence Request and Conflicting Needs Explanation patterns.

### Changed

- Demands, alleged debts, billing claims, and liability assertions should be treated as unverified claims until evidence and responsibility have been checked.
- Important claim-related outputs should avoid admitting liability, making payment, offering settlement, or confirming account responsibility unless evidence is sufficient and Menglu has approved the response.
- Conflicting needs should be analysed as competing valid needs, not as refusal, non-compliance, or one person being wrong.
- Future planning should consider personal tools, environmental adjustments, external accommodations, support-person involvement, sequencing, written explanation, and planned decompression.

### Not added

- No Debt OS, debt-specific automation, legal-advice module, Autism OS, new appointment system, or separate accessibility framework was created.
- No private debt details, account references, correspondence, financial evidence, personal identifiers, or live case records were added to the public repository.
- No copyrighted template text from external sources was copied into the repository.

### Operating effect

Menglu OS can now handle unverified claims and conflicting access needs through existing verification, decision, memory, communication, and output behaviour. The system should request evidence in writing, preserve the evidence trail, avoid assumptions of liability, identify competing needs, and propose practical compromises or adjustments while keeping private records outside GitHub.

## v0.41.0 - Advocacy Outcome Goals Integration

### Added

- `Menglu-OS/core/MASTER_PROMPT.md` now defines advocacy as an outcome standard across existing Menglu OS components.
- `Menglu-OS/agents/Executive_Agent.md` now includes Advocacy Outcome Goals for case coordination, ownership, evidence gaps, professional communication, escalation, and reduced repetition.
- `Menglu-OS/core/MEMORY_MODEL.md` now includes an Advocacy Evidence Continuity Rule for safe cross-service evidence structure.

### Changed

- Advocacy support should be measured by fewer missed actions, clearer ownership, better continuity, improved access, fewer repeated explanations, and reduced operational burden.
- Professional advocacy functions should be integrated across existing Executive, Communication, Memory & Evidence, Decision, Verification, and Output behaviour rather than copied as a separate service model.
- Case material should preserve safe reference structures such as timeline categories, owners, waiting points, evidence gaps, access barriers, and confirmation status without storing private records in GitHub.

### Not added

- No Professional Advocacy OS, new advocacy engine, standalone workflow, automation, or copied external provider model was created.
- No private case evidence, personal identifiers, confidential correspondence, or live service details were added to the public repository.

### Operating effect

Menglu OS now treats professional advocacy as a system-wide outcome standard. The system should coordinate cases, prepare communication, preserve evidence continuity, protect accessibility needs, reduce repeated explanations, and recommend escalation only when justified by evidence, deadline, access failure, or material risk.

## v0.40.0 - TPO Processing Order Integration

### Added

- `Menglu-OS/core/MASTER_PROMPT.md` now includes the internal processing order: Deconstruct, Verify, Diagnose, Develop, Deliver.
- `Menglu-OS/core/DECISION_ENGINE.md` now includes a TPO-style gap diagnosis rule for important outputs and recommendations.

### Changed

- TPO is treated as an internal quality sequence inside existing Menglu OS components, not as a separate prompt optimizer, workflow, engine, automation, or operating mode.
- Important drafts, forms, evidence reviews, appointment preparation, and official communications should now explicitly check request purpose, evidence status, gaps, conflicts, duplication, risk, and safest output before delivery.
- Missing information should lead to one targeted clarification question only when it would materially change the result.

### Not added

- No standalone TPO prompt, prompt-optimizer framework, new Verification Engine file, automation, or separate document was created.
- No private evidence, live case material, or personal details were added to the public repository.

### Operating effect

Menglu OS now has a clearer internal preprocessing sequence for producing evidence-grounded outputs. The system should deconstruct the request, verify evidence, diagnose gaps and conflicts, develop the safest response, and deliver the smallest useful output without requiring Menglu to run a separate prompt.

## v0.39.0 - Live Appointment and Case Filter Consolidation

### Added

- `Menglu-OS/agents/Executive_Agent.md` now includes the Five-Part Case Filter for operational and case-management outputs.
- `pa/appointment-shield.html` now includes a live appointment sequence inside the existing Active Meeting Tracker.
- `pa/appointment-shield.html` now includes a three-level communication support model: Clarify, Redirect, and Pause/defer.
- `pa/appointment-shield.html` now includes optional post-appointment case filter output: ACTION LOGGED, REVIEW REQUIRED, NEXT STEP, WAIT / NOT URGENT, and DECISION NEEDED.

### Changed

- Active meeting support is treated as part of Appointment Shield and Menglu OS, not as a separate Live Appointment OS.
- Case-management reporting can now use the Five-Part Case Filter where it reduces cognitive load.
- The repository wording avoids claiming continuous autonomous monitoring or unsupported background control.

### Not added

- No new Live Appointment Engine file, Case Management OS, automation, prompt, standalone workflow, or separate Output Engine file was created.
- No private PCC case detail or live appointment evidence was added to the public repository.

### Operating effect

Menglu OS now has a clearer live appointment sequence and a standard case-management output format while preserving the existing architecture. Active remains a trigger within Appointment Shield, and case reporting remains handled by the Executive Agent and existing output behaviour.

## v0.38.0 - Rheumatology Clinical Reasoning Refinement

### Added

- `Menglu-OS/agents/Health_Agent.md` now includes Healthcare Management Preference, Specialist Clinical Reasoning, and Appointment Success Audit rules.
- `Menglu-OS/core/DECISION_ENGINE.md` now includes a Healthcare Clinical Reasoning and Practical Outcome rule.
- `Menglu-OS/core/MEMORY_MODEL.md` now includes a stable Healthcare Management Preference evidence rule.
- `pa/appointment-shield.html` now captures clinical reasoning, alternatives, practical outcomes, documentation, and follow-up in healthcare appointment preparation and Finished outputs.

### Changed

- Healthcare appointment preparation should prioritise clinical reasoning, practical management, documentation, referrals, adaptations, and sustainable support, rather than trying to prove one diagnosis.
- Rheumatology-style wording should use neutral differential-diagnosis questions, such as asking what best explains the overall symptom pattern if hEDS/HSD is not agreed.
- Uncertain items such as hEDS/HSD, genetics referral, or mast-cell-related questions should be framed as clinician questions unless confirmed.
- Appointment closure should audit clinical impression, reasoning, evidence, investigations, referrals, practical outcomes, documentation, and next review.

### Not added

- No new Rheumatology OS, diagnosis-advocacy mode, prompt, automation, workflow, or standalone document was created.
- No private medical records or live appointment details were added to the public repository.

### Operating effect

Menglu OS now handles rheumatology and similar specialist appointments through a clinician-facing, outcome-focused model. The system should capture why decisions were made, what practical support was offered, what remains uncertain, and what follow-up is needed while avoiding diagnosis-first advocacy.

## v0.37.0 - Government Records and HMRC Guidance Refinement

### Added

- `Menglu-OS/core/MEMORY_MODEL.md` now includes a Government Records namespace inside the existing Memory & Evidence Engine.
- `Menglu-OS/core/MEMORY_MODEL.md` now includes an Evidence Preservation Policy for official records with long-term evidential value.
- `Menglu-OS/core/DECISION_ENGINE.md` now includes HMRC and Self Assessment decision guidance.
- `Menglu-OS/templates/Written_Communication_Request.md` now notes that UNCRPD may be referenced as supporting context alongside the Equality Act 2010 where useful.

### Changed

- Government Gateway and similar account access should be treated as a reference access route, not as a new workflow.
- Official records should be separated into Evidence to preserve, Action required, No current action, and Unknown or needs checking.
- Self Assessment should not be assumed where there is no employment, no self-employment, no taxable business income, and no HMRC request.
- UNCRPD should support existing accessibility and reasonable-adjustment wording without creating a parallel disability-rights framework.

### Not added

- No new HMRC workflow, tax workflow, Government Gateway workflow, disability-rights framework, automation, prompt, or standalone document was created.
- No Government Gateway credentials, private HMRC details, personal tax data, or live government account information were added to the public repository.
- No Barbara Johnston workflow or third-party-authority rule was added because no authority or agreement exists.

### Operating effect

Menglu OS can now preserve important government records and avoid unnecessary HMRC/Self Assessment worry while keeping government-account details private and treating UNCRPD as supporting advocacy context rather than a separate rights system.

## v0.36.0 - Governance Review Gate Refinement

### Added

- `Menglu-OS/core/INTEGRATION_GOVERNANCE.md` now requires Repository and Existing-System Review before deciding what is genuinely new.
- `Menglu-OS/core/INTEGRATION_GOVERNANCE.md` now includes Deletion Before Addition as a governance rule.
- `Menglu-OS/core/INTEGRATION_GOVERNANCE.md` now includes an Implementation Planning rule for substantial changes.
- `Menglu-OS/core/MASTER_PROMPT.md` now references repository review and deletion-before-addition at the highest operating level.

### Changed

- The Architecture Review Gate now checks what already exists, whether older material should be merged or removed, and whether new material is technically necessary.
- The GitHub-first rule now explicitly prefers reuse, extension, merge, replacement, or deletion before creating new files, prompts, workflows, dashboards, or automations.
- Substantial recommendations should identify files/components to update, merge, remove, or record in the changelog where useful.

### Not added

- No new governance document, module, automation, prompt, or workflow was created.

### Operating effect

Menglu OS now has a stricter consolidation-first rule: review existing systems first, merge or delete duplicates before adding anything new, and keep implementation plans tied to existing components. This reduces architecture drift and maintenance burden.

## v0.35.0 - Household Transport Verification Refinement

### Added

- `Menglu-OS/core/MEMORY_MODEL.md` now includes Transport as a Household namespace category.
- `Menglu-OS/core/MEMORY_MODEL.md` now includes a Household Transport Verification Rule.

### Changed

- Vehicle information should be treated as household transport evidence when it supports accessibility, appointment travel, insurance, household administration, benefits evidence, or family planning.
- Vehicle information should be verified through official records or primary documentation where possible.
- Future outputs must not infer vehicle model year, trim, engine specification, tax class, registration date, ownership details, insurance status, or technical features from images alone.
- Vehicle-related outputs should separate Confirmed, User-reported, Unconfirmed, and Assumption avoided.

### Not added

- No vehicle workflow, vehicle prompt, vehicle OS, vehicle database, or automation was created.
- No vehicle registration number, ownership detail, insurance detail, or live vehicle record was added to the public repository.

### Operating effect

Menglu OS can now reuse transport as part of the existing Household namespace while keeping vehicle-specific live details outside the public repository and requiring official verification for technical or legal vehicle facts.

## v0.34.0 - Household Namespace Integration

### Added

- `Menglu-OS/core/MEMORY_MODEL.md` now includes a Household namespace inside the existing Memory & Evidence Engine.
- Household namespace categories are: Property, Utilities, Contacts, Warranties, Repair History, and Contractors.
- `Menglu-OS/core/MEMORY_MODEL.md` now includes a household property evidence hierarchy for property and utility claims.
- `Menglu-OS/core/DECISION_ENGINE.md` now includes a Household Decision and Cross-linking Rule.
- `Menglu-OS/agents/Executive_Agent.md` now includes a Household Operations Check.

### Changed

- Household documents should be classified and cross-linked instead of treated as isolated records.
- Household information should be separated as Verified, Historical, Pending, or Unknown in future outputs.
- The Executive Agent should classify household items as Menglu only, Yu Liu, Kun Shi, Dr Needles Ltd where relevant, or Household/shared.
- If a household item is already tracked and creates no new risk, deadline, or action, the default outcome is: Already tracked. No new action.
- Non-urgent household administration should be suppressed when recovery capacity is low unless safety, deadline, finance, housing stability, legal position, or another material risk requires attention.

### Not added

- No Home OS, Property OS, Utilities OS, House Dashboard, new workflow, new automation, or standalone household document was created.
- No private property records, live utility records, exact contact details, active repair correspondence, financial details, or confidential household documents were added to the public repository.

### Operating effect

Menglu OS can now reuse household property, utility, warranty, contact, contractor, and repair-history categories through the existing Memory, Decision, and Executive layers. This reduces repeated questions and duplicate records while keeping changing operational items in Current Context, Open Loop Register, or active case records.

## v0.33.0 - Final Operating Directive Refinement

### Added

- `Menglu-OS/core/MASTER_PROMPT.md` now includes Health Protection and Energy Expenditure, Apparent Coping and Supported Performance, Reality Check and Stability First, and Prevention and Escalation as stable operating refinements.
- `Menglu-OS/core/MASTER_PROMPT.md` now includes a Recommended Response Format for important communications.
- `Menglu-OS/templates/GENERAL_OFFICIAL_EMAIL.md` now includes the recommended reply structure: Recommended Reply, Why This Reply Is Recommended, and Additional Matters Worth Raising.

### Changed

- Administrative work, communication, appointments, planning, and decision-making are now explicitly treated as exertion when assessing burden.
- Future recommendations should distinguish what should happen, what usually happens, what evidence supports, and what is realistically achievable.
- Stable public rules remain separate from private profile data and live case details.

### Not added

- No private profile data or live case data was committed to the repository.
- No new Mira prompt, subsystem, automation, dashboard, or standalone document was created.
- An attempted detailed privacy-boundary edit was blocked by the connector safety check, so the existing `PRIVACY_BOUNDARY.md` remains unchanged.

### Operating effect

Menglu OS now applies the final operating directive refinements through existing governance. The system should protect energy, avoid inferring independence from supported performance, use practical reality checks, prefer stability, and provide recommended replies with reasons while preserving autonomy and public-repository privacy boundaries.

## v0.32.0 - Coordination Evidence Pattern

### Added

- `Menglu-OS/core/MEMORY_MODEL.md` now includes a Coordination Evidence Pattern under the existing real-world evidence model.
- `Menglu-OS/core/DECISION_ENGINE.md` now includes a Coordination Evidence Decision Check for healthcare, social care, benefits, housing, advocacy, and official support material.
- `Menglu-OS/core/MASTER_PROMPT.md` now includes Coordination Evidence Interpretation as a high-level operating principle.
- `Menglu-OS/core/INTEGRATION_GOVERNANCE.md` now includes an evidence interpretation guideline distinguishing historical events from reusable evidence patterns.

### Changed

- Future advocacy outputs should treat documented independent coordination that produces repeated or significant measurable progress as evidence of coordination and service-navigation support needs.
- Outputs should distinguish understanding, communication, initiating action, organising steps, coordinating across services, monitoring replies/referrals/deadlines, following up, and sustaining processes over time.
- The PCC/Deirdre-type pattern is integrated as a reusable evidence interpretation rule, not as a new workflow, automation, prompt, or standalone document.

### Operating effect

Menglu OS can now reuse documented coordination-success patterns as functional evidence without reconstructing the argument each time. This strengthens advocacy outputs while preserving the public repository boundary: private evidence remains outside GitHub.

## v0.31.0 - Appointment Shield Lifecycle Cleanup

### Changed

- `pa/appointment-shield.html` now uses one canonical three-stage Appointment Shield lifecycle: Pre-appointment, During appointment/live interaction, and Post-appointment.
- Appointment notes now use the standard classification labels: Confirmed, Reported, Recommendation, and Needs clarification.
- The Active trigger prompt now explicitly routes through existing Menglu OS components and states that it is not a new subsystem.
- Timeline handling is stricter: only confirmed, durable, clinically or administratively significant information should be added to the long-term timeline. Other information stays in the appointment record or Current Context.
- The prep prompt now includes Current Mode as optional context without duplicating recovery logic.

### Removed

- Deleted legacy `auto-appointment.html` because it duplicated appointment/emergency communication purpose and exposed sensitive personal/health contact details in the public repository.

### Operating effect

Appointment Shield is now the single active appointment route. It covers preparation, live advocacy tracking, post-appointment summaries, follow-up drafts, Current Context updates, evidence candidate review, and Outcome Tracker updates without maintaining a second appointment page or duplicate protocol.

## v0.30.0 - Active Trigger Consolidation

### Changed

- `Menglu-OS/core/MASTER_PROMPT.md` now defines `Active` as a cross-engine trigger rather than a separate subsystem.
- `Menglu-OS/docs/BACKGROUND_AUTOMATION_SPEC.md` now absorbs Active Meeting Tracker under the existing Appointment Shield automation.
- Active behaviour is routed through existing engines: Executive Function, Appointment Shield, Communication, Memory & Evidence, Decision, Verification, and Output.
- The detailed reusable prompt remains in `pa/appointment-shield.html` as the live UI layer.

### Deduplicated

- No standalone duplicate Active-mode prompt file was found to delete.
- The previous draft-style Active protocol is not stored as a separate module.
- Future Active changes should update Appointment Shield, Live Interface Map, Master Prompt, or Background Automation Spec instead of creating a new file.

### Operating effect

`Active` now increases structure and advocacy support inside the existing Menglu OS architecture. It supports live meeting tracking, agenda control, priority management, professional redirection, structured closure, Mum summaries, follow-up drafts, recovery review, and Outcome Tracker updates without adding another operating mode or duplicate automation.
