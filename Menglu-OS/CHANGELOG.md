# Changelog

## v0.49.0 - Home Information Board Routing

### Added

- `Menglu-OS/agents/Executive_Agent.md` now includes Home Information Board Routing for private household reference packs.

### Changed

- Household information boards should be treated as private household reference packs, not public repository content.
- Home information should route tasks about property, utilities, safety, energy, broadband, insurance, warranty, purchase records, repairs, emergency access, and local household context.
- Future use should label household information as Verified, User-reported, Historical, Pending, Needs checking, or Emergency-use only.
- Emergency-facing versions should include only minimum necessary safety, access, and service-continuity facts.

### Not added

- No address, postcode, phone numbers, email addresses, named purchase contacts, purchase-party names, mortgage details, insurance details, account details, warranty references, solicitor details, or live household records were added to GitHub.
- No Home Information Board page, property database, contact directory, purchase workflow, mortgage workflow, insurance workflow, or standalone household system was created.
- A proposed Memory Model edit was blocked by connector safety checks, so the rule was integrated into the Executive Agent instead.

### Operating effect

Menglu OS can now use the Home Information Board as a private routing source while keeping the public repository limited to handling rules and categories. The system should use the board to reduce repeated household questions, prepare safe household drafts, and avoid exposing private property or contact data in public files.

## v0.48.0 - Coordination and Utility Routing Integration

### Added

- `Menglu-OS/agents/Executive_Agent.md` now includes Coordination Support Routing for named worker, key worker, coordinator, or single-point-of-contact requests.
- `Menglu-OS/agents/Executive_Agent.md` now includes Utility Outage Routing for electricity and other household service interruptions.

### Changed

- Autistic lived-experience educational resources should be used as explanatory context only, not as diagnostic, legal, or formal evidence.
- NICE care-coordination guidance has been converted into a neutral coordination-support request pattern inside the Executive Agent.
- Electricity outage handling should distinguish active outage, planned outage, hazard, uncertain status, follow-up, and priority-register or accessibility issues.
- If an outage is not displayed on an official map, the system should not assume there is no outage.

### Not added

- No Autisticality content library, Cobia app integration, NICE module, Powercheck dashboard, utility automation, new service directory, or standalone workflow was created.
- The Cobia app content was not integrated because the public URL could not be verified.
- No postcode, address, account details, outage references, personal identifiers, or live household records were added to GitHub.
- Attempts to place the coordination rule into the Health Agent were blocked by connector safety checks, so the rule was integrated into the Executive Agent instead.

### Operating effect

Menglu OS can now route coordination requests and utility-outage checks through existing executive and household operations. The system should ask for a named coordinator where multi-service follow-up needs it, verify official outage routes before treating a power issue as a household repair, and avoid copying private utility or household data into GitHub.

## v0.47.0 - Neuroinclusive Support Resource Integration

### Added

- `Menglu-OS/agents/Health_Agent.md` now includes a Connected-Systems Healthcare Rule, Healthcare Appointment Toolkit Rule, and AAC and Communication Access Rule.
- `Menglu-OS/core/DECISION_ENGINE.md` now includes a Neurodivergent Admin Support Suitability Check and Resource Safety Triage.
- `Menglu-OS/agents/Executive_Agent.md` now includes an Admin Scaffolding Support Model.

### Changed

- Public resource indexes should be treated as starting points only, with safety, legality, privacy, reliability, and primary-source checks before use.
- Admin and virtual-assistant support should be evaluated by support model, privacy, consent, cost, communication fit, and practical access before being treated as suitable.
- Healthcare preparation should use a compact appointment packet with scheduling facts, access needs, key issues, functional impact, supporter role, follow-up questions, and communication tools.
- Healthcare questions should consider whether one recommendation could affect another area of function, access, recovery, or daily living.

### Not added

- No VA system, paid-support workflow, FMHY directory, resource database, healthcare toolkit copy, All Brains Belong module, automation, or standalone file was created.
- No website text, private service enquiry, medical record, personal identifiers, or live case details were added to GitHub.
- A proposed general template update for paid-support enquiries was blocked by the connector safety check, so `GENERAL_OFFICIAL_EMAIL.md` was not changed for that item.

### Operating effect

Menglu OS can now extract reusable support patterns from neuroinclusive admin-support services, public resource indexes, healthcare toolkits, and connected-systems healthcare models while keeping the architecture consolidated. The system should scaffold tasks in small visible steps, verify public resources before use, prepare appointments through compact packets, support AAC and written communication, and avoid treating body systems or access needs as isolated when the evidence suggests interaction.

## v0.46.0 - All Connector Extraction Audit

### Added

- `Menglu-OS/core/MEMORY_MODEL.md` now includes Connector Evidence Extraction, Drive Document Inventory, Evidence Packet Selection, Calendar Privacy, and Contact Routing rules.
- `Menglu-OS/core/DECISION_ENGINE.md` now includes Connector Evidence Decision, Evidence Packet Selection, and Support Deadlock checks.
- `Menglu-OS/agents/Executive_Agent.md` now includes Connector Audit Coordination.
- `Menglu-OS/templates/GENERAL_OFFICIAL_EMAIL.md` now includes Evidence Packet Selection and Support Deadlock wording patterns.

### Changed

- Connected sources should be used to extract public-safe rules, categories, action triggers, and evidence patterns, not copied into GitHub.
- Drive files should be treated as a private evidence library with current, historical, duplicate, and needs-review categories.
- Calendar events should be used for appointment date, preparation, travel, recovery, and follow-up planning, not copied as full descriptions.
- Contacts should be treated as private routing data; public documentation should store only role categories.
- When multiple documents exist, Menglu OS should select the smallest relevant evidence packet rather than sending a full binder or duplicate pack.
- Support deadlock should be recognised where the route to support requires the same communication, coordination, or executive-function ability that Menglu needs support with.

### Not added

- No private Gmail content, Drive document contents, Calendar descriptions, contact details, addresses, identifiers, medical records, financial records, appointment links, or live case evidence was added to GitHub.
- No new connector dashboard, document database, contact directory, calendar workflow, Drive workflow, support-deadlock workflow, or automation was created.

### Operating effect

Menglu OS can now use all available connectors as private evidence sources while converting useful material into safe operating rules. The system should deduplicate evidence, choose the smallest relevant packet, avoid copying private records, use role-based routing, recognise support deadlocks, and notify only when a real action, risk, deadline, or completed integration needs review.

## v0.45.0 - Saved History and Gmail Integration Audit

### Added

- `Menglu-OS/core/MEMORY_MODEL.md` now includes Identity Data Minimisation, Public Data Removal Evidence, and Healthcare Access Adjustment Verification rules.
- `Menglu-OS/core/DECISION_ENGINE.md` now includes Identity and Privacy Safety, Healthcare Access Route, fixed appointment, interpreter-role, and supported financial-monitoring checks.
- `Menglu-OS/agents/Health_Agent.md` now includes Healthcare Access Verification for record flags, booking notes, interpreter support, and written fallback planning.
- `Menglu-OS/templates/GENERAL_OFFICIAL_EMAIL.md` now includes Identifier Minimisation, Public Data Removal Follow-up, Healthcare Fixed Appointment, and Interpreter or Support-Person Role wording patterns.

### Changed

- Sensitive identifiers should be included only when genuinely required for the specific organisation and task.
- Healthcare record flags and booking notes should be treated as useful but not foolproof; written backup and fixed-appointment requests may still be needed.
- Interpreter support should distinguish Menglu's needs from support-person needs and should not assume spoken interpretation is always the correct format.
- Bank written check-ins and account-monitoring support should be treated as supported monitoring evidence, not proof of independent financial self-management.

### Not added

- No private Gmail content, addresses, identifiers, hospital numbers, account details, contact details, case references, or live case evidence was added to GitHub.
- No new privacy workflow, healthcare-access workflow, interpreter workflow, banking workflow, or data-removal workflow was created.

### Operating effect

Menglu OS now better converts saved-history and Gmail evidence into public-safe rules. The system should minimise identifier exposure, track public-data removal as a privacy case, verify healthcare adjustment scope, use written fallback routes when phone booking is inaccessible, clarify interpreter/support-person roles, and treat bank check-ins as supported monitoring evidence.

## v0.44.0 - Sensitive Evidence Handling Refinement

### Added

- `Menglu-OS/core/MEMORY_MODEL.md` now includes rules for handling authority/consent evidence and accessibility-document evidence as sensitive case material.
- `Menglu-OS/templates/GENERAL_OFFICIAL_EMAIL.md` now includes consent-scope and accessibility-evidence wording patterns.

### Changed

- Future outputs should extract the functional meaning of sensitive records instead of copying private document content into public files.
- Consent, authority, and support evidence should be verified as current and accepted by the relevant organisation before being relied on.

### Not added

- No private identifiers, scans, signatures, reference numbers, contact details, prescriptions, membership details, medical-letter content, or live case records were added to GitHub.
- No new authority, consent, optician, credit, OT, or membership workflow was created.

### Operating effect

Menglu OS can now use uploaded private documents as private evidence sources while retaining only public-safe reusable rules in GitHub.

## v0.43.0 - Financial Safety and Support Route Tools

### Added

- `Menglu-OS/core/DECISION_ENGINE.md` now includes Financial Safety and Scam Triage for card loss, suspected scams, wrong-account payments, unrecognised transactions, money-safety concerns, card problems, and related banking issues.
- `Menglu-OS/core/DECISION_ENGINE.md` now includes External Support Route Triage for potential financial advocacy, appointeeship, banking access, mobility, crisis, travel-assistance, and scam-support resources.
- `Menglu-OS/core/MEMORY_MODEL.md` now includes an External Support Resource Awareness Rule.
- `Menglu-OS/templates/GENERAL_OFFICIAL_EMAIL.md` now includes a Communication Card Pattern and Financial Safety Message Pattern.

### Changed

- Financial-risk situations should now be classified first by urgency and risk of further loss before ordinary administration.
- Scam and banking outputs should prioritise stopping further loss, preserving evidence, contacting the bank through official routes, using accessible communication supports, and recording outcome/owner/follow-up.
- External support resources should be treated as Potential support routes until service area, eligibility, availability, cost, referral route, and contact method are verified.
- Communication-card style outputs should be short, showable, and usable without explaining the whole background.

### Not added

- No Banking OS, Scam OS, Red Cross workflow, Dosh workflow, Thistle workflow, service directory, financial-advice module, legal-advice module, or automation was created.
- No private banking information, account details, security details, passwords, PINs, card details, correspondence, referral forms, or live case records were added to the public repository.
- No copyrighted card set, external template, or full webpage text was copied into the repository.

### Operating effect

Menglu OS can now convert public support resources into reusable internal tools: accessible banking cards, urgent financial-safety scripts, potential financial-advocacy routes, potential mobility or crisis-support routes, travel-assistance communication patterns, and scam red-flag triage. The system must still verify service availability and suitability before recommending any external route as an action.

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
