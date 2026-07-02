# Changelog

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
