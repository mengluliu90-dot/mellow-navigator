# Changelog

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

Menglu OS can now reuse documented coordination-success patterns as functional evidence without reconstructing the argument each time. This strengthens social-care, healthcare, benefits, housing, and advocacy outputs while preserving the public repository boundary: private evidence remains outside GitHub.

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

## v0.29.0 - Active Meeting Tracker

### Added

- Active Meeting Tracker added to `pa/appointment-shield.html`.
- Live advocacy prompt for when Menglu types or says `Active` during an appointment, meeting, call attempt, contractor visit, benefits contact, healthcare contact, social-care contact, repair visit, or professional conversation.
- Structured tracking fields for who was involved, what was discussed, decisions made, advice given, agreed actions, owners, deadlines, unanswered questions, access barriers, recovery impact, Mum summary needs, and follow-up drafts.
- Post-event output requirements: Easy Read summary, professional meeting summary, action list, simple Chinese Mum summary, follow-up drafts, recovery recommendation, Current Context update, and OS Evidence candidate review.
- Active Meeting Tracker protocol documented in `Menglu-OS/docs/LIVE_INTERFACE_MAP.md`.

### Changed

- Appointment Shield now supports both pre-appointment preparation and live/post-event tracking.
- Meeting notes are treated as Current Context by default, not OS Evidence, unless confirmed, durable, reusable, and appropriate for stable evidence.
- Follow-up emails, letters, and messages are draft-only until explicitly approved.

### Operating effect

When Menglu uses `Active`, the system can track the live interaction, reduce real-time processing burden, and produce a complete post-event record with actions and drafts without requiring Menglu to reconstruct the conversation later.

## v0.28.0 - Optimisation Phase Cleanup

### Changed

- `Menglu-OS/core/CORE_RULES.md` is now a quick operational index instead of a duplicate full rule source.
- `CORE_RULES.md` now points to `Menglu-OS/core/MASTER_PROMPT.md` as the authoritative behaviour source and `Menglu-OS/core/INTEGRATION_GOVERNANCE.md` as the authoritative integration/governance source.
- `Menglu-OS/docs/BACKGROUND_AUTOMATION_SPEC.md` is now consolidated around the five-task automation layer: Silent Gmail Handler, Open Loop Register, Appointment Shield, Evidence Watch, and Case Orchestrator.
- Background automation guidance now explicitly says not to create extra monitoring tasks unless the need cannot be safely absorbed by the five-task layer.
- Added a notification-budget rule for automation: fewer notifications by default, with bypass only for deadline, risk, appointment, contradiction, or time-sensitive approval.

### Removed

- Remaining migrated root legacy validation placeholder `docs/menglu-os-v3-validation-mode.md` was deleted after its active rules had already been consolidated into `Menglu-OS/docs/PROJECT_ROADMAP.md`.

### Operating effect

Menglu OS has moved from expansion toward optimisation. Stable rules now have fewer duplicate sources, the automation layer has a clearer five-task boundary, and future changes should remove work, remove duplication, simplify architecture, or increase safe automation before they are added.

## v0.26.0 - Master Operating Principles

### Added

- Master Operating Principles added to `Menglu-OS/core/MASTER_PROMPT.md`.
- Eight highest-level operating rules: System Integrity First, Silent Running, Evidence Before Assumption, Smallest Safe Action, Approval Boundary, Layered Information Management, Recovery-aware, and Automation Protocol.
- Silent Running boundary: no claim of autonomous background monitoring unless user-triggered, automation-triggered, connected-tool access is invoked, or an authorised data check is explicitly requested.
- Layered Information Management for Temporary, Case, Evidence, and Long-term information.
- Automation Protocol for classification, `WAITING_FOR_EVIDENCE`, `[DRAFT_READY]`, and `[RUN_MONITORING]`.

### Changed

- `MASTER_PROMPT.md` now acts as the highest-level source for persistent Menglu OS behaviour.
- Approval boundaries and recovery-aware operation are now explicit at the master-prompt level.
- Automation is framed as structured, authorised, reviewable work rather than autonomous real-world execution.

### Operating effect

Menglu OS now has a clearer single source of truth for long-term behaviour. Future chats and connected-tool work should align with these master principles before applying workflow-specific rules from the roadmap, live interface map, templates, or agent files.

## v0.25.0 - Sync Packet v2 Implementation

### Added

- `interface-layer.js` now exports `Mellow Control Room Sync Packet v2`.
- Current Priority Index is generated directly from `uos_cases`, `uos_tasks`, `mn_open_loops`, and `mn_decision_log`.
- Priority counts for P1, P2, P3, and P4 are shown on the Mellow dashboard.
- Sync Packet v2 includes command aliases for `[RUN_MONITORING]`, `[UC]`, `[PIP]`, `[BANK]`, `[HEALTH]`, `[HOUSING]`, `[SOCIAL]`, and `[EMAIL]`.
- Sync Packet v2 includes Pre-flight Check, Capability Check, Graceful Degradation, Feedback Loop, and latest-state policy fields.
- Automation Hub now includes a `[RUN_MONITORING]` handover button.

### Changed

- Export buttons now label the packet as Sync Packet v2.
- Attention view now surfaces P1/P2 priority items before ordinary action/waiting lists.
- One Inbox and AI Context Pack now instruct ChatGPT to run Pre-flight and Capability Check before drafting.
- Dashboard now prioritises one front page for current state, P1/P2 risk, active cases, and export.

### Operating effect

Menglu can now open Mellow, press Export Sync Packet v2, and paste one structured packet into ChatGPT. The packet carries enough routing, priority, safety, and feedback-loop information for ChatGPT to continue work with less explanation and fewer repeated decisions while preserving approval boundaries.
