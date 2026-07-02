# Changelog

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

## v0.24.0 - Alignment Triggers and Feedback Loop

### Added

- Alignment and feedback loop standards in `Menglu-OS/docs/PROJECT_ROADMAP.md`.
- Current Priority Index standard generated from `uos_cases`, `uos_tasks`, Outcome Tracker, Open Loops, and Sync Packet instead of a duplicate `Open_Tasks.md`.
- Priority levels P1 to P4 with handling rules based on risk, deadline, reversibility, recovery burden, and whether action is possible now.
- Replacement rule for comparing new tasks against existing active cases and waiting items.
- Response Template Library standard with reusable modules for accessibility, written communication, mother-assisted drafting, reasonable adjustments, functional impact, evidence reference, and safest closing.
- Trigger rules for high-priority items, appointments, Gmail/letters, housing repairs, benefits/banking/legal/safeguarding/security, and low recovery state.
- Stop-and-consult rule for irreversible, uncertain, high-risk, conflicting, or privacy-sensitive actions.
- Feedback loop requiring updates or prepared updates to priority, active case status, next action/waiting state, evidence status, recovery burden, and next review where relevant.

### Changed

- Menglu OS should now treat automatic operation as aligned generation of structured outputs and drafts, not automatic execution of irreversible actions.
- Lower-priority work should be paused, merged, monitored, or archived when a higher-priority item appears.
- Reusable official wording should be composed from template modules rather than recreated from scratch.

### Operating effect

The system can process task material with less intervention by generating a Current Priority Index, using standard template modules, applying trigger rules, and closing each task with a feedback update. This reduces repeated scheduling questions while preserving approval boundaries and privacy limits.

## v0.23.0 - Automation Handling Protocol Activation

### Added

- Active processing protocol in `Menglu-OS/docs/LIVE_INTERFACE_MAP.md`.
- Default task-handling sequence: Triage → Context → Draft → Outcome.
- Standard task output structure for task records, automation output, accessibility adjustment notes, risk points, and next cycle.
- Execution constraints for when to ask clarification, when not to guess, and how to handle missing or uncertain information.
- Cherrytrees boundary: keep Cherrytrees material as historical evidence only unless Menglu gives a new explicit instruction.

### Changed

- Current chat operations can treat supplied task material as ready for processing without asking what Menglu wants done when classification and next action are clear.
- Recovery burden and family-support suitability are now part of the active processing protocol.
- The protocol is integrated into the existing Live Interface Map rather than being stored as a duplicate standalone automation file.

### Operating effect

Menglu can paste task material from Mellow Navigator, dashboard views, Gmail, appointment notices, housing repair updates, or other authorised sources. The assistant should process the item through the active protocol and return the structured result with minimal extra questioning.

## v0.22.0 - Central Orchestration and Deduplication

### Added

- Central orchestration rule in `Menglu-OS/docs/LIVE_INTERFACE_MAP.md`.
- Shared-state map for `uos_state`, `uos_cases`, `uos_tasks`, `uos_drafts`, `uos_timeline`, and `current_mode_text`.
- Deduplication rule for shortcuts, open loops, appointment preparation, recovery warnings, evidence summaries, case summaries, and automation outputs.
- Delete/archive criteria for repeated material after it has been merged into the correct existing component.
- Single event flow: Incoming item → Document Triage → Existing case or new case decision → Three-Layer Pipeline → Recovery burden check → Output choice → Outcome Tracker / Debrief Loop.

### Changed

- Menglu OS now treats central orchestration as an internal rule inside the existing architecture, not a new dashboard, agent, or operating system.
- Future duplicate material should be merged, referenced, archived, or deleted according to role and risk.
- Temporary or uncertain duplicates should be marked as `Historical evidence only` or `Reference` rather than deleted immediately.

### Operating effect

Existing automations and interfaces should now work through one shared routing and deduplication model. This reduces repeated prompts, repeated open loops, repeated evidence summaries, and duplicated shortcut wording while keeping private evidence outside the public repository.

## v0.21.0 - Repository Guard Workflow

### Added

- `.github/workflows/menglu_os_repository_guard.yml`.
- Deterministic GitHub Actions repository guard for JSON validation, workflow YAML validation, required entry-point checks, and advisory architecture duplication scanning.
- GitHub-native issue triage using `actions/github-script` and `GITHUB_TOKEN`, without external AI credentials.
- Automatic issue labels for subsystem detection, including Mellow, Mira, PA, EOS, docs, GitHub Actions, and unknown subsystem.
- Automatic issue triage labels for high risk, action required, waiting, reference, and archive.
- Automated issue comment with subsystem, triage, risk level, smallest effective next action, and safest draft wording.

### Changed

- Phase 1 repository automation avoids unsupported or uncertain external AI actions.
- Automation uses deterministic checks first and preserves human review for code, documentation, and architecture changes.
- No auto-commit or direct modification of `main` is performed by the workflow.

### Operating effect

Menglu OS now has a low-risk GitHub Actions guard that can catch broken JSON, missing entry points, and common architecture-risk wording while also reducing manual issue triage. This supports backstage repository maintenance without storing private evidence or delegating irreversible decisions to AI.

## v0.20.0 - Mellow Control Room Sync Bridge

### Added

- `interface-layer.js` now includes a Mellow Control Room Sync Packet.
- Added Control Room views for `SYNC` and `ATTENTION` states.
- Dashboard now includes an Attention count, Waiting count, Active Cases count, and Export Sync Packet button.
- The Mellow Sync Packet exports local summaries from PA/Mira state, including `uos_objects`, `uos_cases`, `uos_tasks`, `uos_drafts`, `uos_timeline`, `uos_state`, `current_mode_text`, manual open loops, local decisions, and recent local timeline entries.
- Added an Outcome Tracker seed inside the packet so ChatGPT can initialise or update objectives, status, outcomes, and review points.

### Changed

- Mellow now behaves more like a front-end Control Room rather than only a static category index.
- AI Context Pack now includes a Copy Sync Packet option.
- Evidence Graph now links directly to Mira Evidence.
- The Start Here panel now prioritises exporting current state before asking Menglu to choose a workflow.

### Operating effect

Menglu can open Mellow, press Export Sync Packet, and paste one structured packet into ChatGPT. ChatGPT can then apply Document Triage, the Three-Layer Pipeline, Prep Pack logic, Safest Draft generation, Debrief Loop, and Outcome Tracker without Menglu manually explaining the state.

## v0.19.0 - Finalized Six-Step Operational Workflow

### Added

- Six-step operational workflow in `Menglu-OS/docs/PROJECT_ROADMAP.md`.
- Document Triage standard for categorising incoming items as Action Required, Waiting, Reference, High Risk, or Archive.
- Prep Pack standard for appointments, meetings, assessments, reviews, and formal interactions.
- Debrief Loop standard for capturing outcome, decisions, new evidence, follow-up actions, recovery impact, and unanswered issues.
- Outcome Tracker standard for measuring each active case against objective, status, last action, outcome so far, next review, and confidence.
- Recovery Planning standard using Low, Medium, and High burden estimates.

### Changed

- Roadmap now treats Menglu OS as an execution workflow, not only an evidence/context architecture.
- Recovery support is framed as planning guidance and demand reduction rather than rigid automatic blackout rules.
- Context Packets may include Outcome Tracker lines when this reduces repeated decisions or clarifies progress.

### Operating effect

Menglu OS now follows one stable path: Triage → Three-Layer Processing → Prep Pack → Safest Draft → Debrief Loop → Outcome Tracker. This should reduce hidden friction between emails, appointments, repairs, and benefits/social-care activity while preserving approval boundaries and evidence integrity.

## v0.18.0 - Mira-Next Sync Packet Export

### Added

- `mira-next/os-bridge.js` now includes a `📤 Export Sync Packet` action.
- The export creates a user-initiated Mira-Next Sync Packet containing local browser state summaries from `uos_objects`, `uos_cases`, `uos_tasks`, `uos_drafts`, `uos_timeline`, `uos_state`, and current mode text.
- The packet includes active cases, waiting items, action-required items, recent timeline, recent objects, prepared drafts, recovery state, and a ChatGPT processing instruction.

### Changed

- Mira-Next now supports the Export/Ingest workflow directly: export local state, paste into ChatGPT, apply the Three-Layer Pipeline, then produce a Context Packet, Case Summary, or Safest Draft.
- Export remains user-initiated and local-first. It does not create background monitoring or automatic external data access.

### Operating effect

Menglu can now use Mira as a lower-friction drop-off point: press Export, copy one packet, and paste it into ChatGPT for audit, contradiction checking, evidence/context separation, and action-ready drafting.

## v0.17.0 - Mira Evidence Engine Boundary

### Added

- Mira Evidence Engine boundary in `Menglu-OS/docs/LIVE_INTERFACE_MAP.md`.
- Clear distinction between Mira as the stable evidence layer and live sources such as Gmail, Calendar, uploaded documents, and current conversation.
- Source boundary table defining authoritative sources for stable evidence, current operational state, live information, and system architecture.

### Changed

- Mira is now described as an Evidence Engine rather than merely an evidence viewer.
- Mira should support duplicate detection, contradiction checks, missing evidence identification, case history navigation, and minimum-relevant-evidence selection for Case Summaries and Safest Drafts.
- Mira must not claim to monitor Gmail, Calendar, Clixifix, banking, DWP, NHS, or other live systems in the background by itself.

### Operating effect

Mira supplies stable evidence into the Three-Layer Pipeline while live information remains source-specific and event-triggered. This reduces stale-state risk and prevents temporary updates from becoming permanent OS Evidence too quickly.

## v0.16.0 - Three-Layer Pipeline and Case Summary Standard

### Added

- Three-layer operating pipeline in `Menglu-OS/docs/PROJECT_ROADMAP.md`.
- Layer 1: OS Evidence for stable long-term evidence categories.
- Layer 2: Current Context for dynamic recovery state, active cases, waiting items, deadlines, correspondence, and latest events.
- Layer 3: Safest Draft / Output for event-triggered outputs using the minimum necessary evidence.
- Case Summary standard as the primary dynamic tool for active case work.
- Context Packet standard with status vocabulary and confidence field.

### Changed

- Roadmap now separates stable evidence from temporary context so daily symptoms, short-term recovery state, or live events do not automatically become permanent OS Evidence.
- Case summaries should be generated on demand or from an Update Packet, not maintained as duplicate evidence archives.

### Operating effect

Menglu OS now has a cleaner pipeline: OS Evidence → Current Context → Safest Draft. This should reduce duplication, preserve evidence quality, and make active case handling easier to trigger from one prepared update packet.

## v0.15.0 - Automation Independence Upgrade Path

### Added

- Automation independence upgrade path in `Menglu-OS/docs/PROJECT_ROADMAP.md`.
- Priority upgrades for one-button Update Packet, Recovery Guard integration, Active Case Queue, prepared prompt export, local backup/restore, PWA resilience, and shortcut alignment.
- Non-goals clarifying that the public repository must not store live case evidence, medical records, identifiers, bank information, or confidential emails in this public repository.

### Changed

- Roadmap now treats automation independence as lower-friction triggering and safer handoff to ChatGPT or connected tools, not as unsupported background monitoring by GitHub Pages.
- Future Mellow Navigator upgrades should improve EOS, PA, Mellow, and Profile Passport integration before creating new dashboards or modules.

### Operating effect

Mellow Navigator should help Menglu press one button, copy one prepared `Update` packet, and trigger ChatGPT processing with less explanation. The system should maximise automation independence within current safety limits.

## v0.14.0 - EOS Current Mode Status Page

### Added

- `pa/current-mode.html` as a one-button status interface for showing current functional capacity to professionals.
- Four quick modes: Functional Day, Reduced Capacity, Recovery Mode, and Shutdown / Very Low Capacity.
- Copyable mode text so the same status can be pasted into messages or shown during appointments.

### Operating effect

EOS can now act as a rapid status card. Menglu can choose one current mode and show the relevant communication adjustments without explaining her full background each time.

## v0.13.0 - Device Shortcuts Interface Layer

### Added

- Device Shortcuts interface layer in `Menglu-OS/docs/LIVE_INTERFACE_MAP.md`.
- Mapping from shortcut groups to existing Menglu OS components, including Communication Aids, Health and Social Care, PIP and UC, Finance and Benefits, Home, Need Help and crisis access, navigation/context support, and reusable personal summaries.
- Operating rule that shortcuts should reuse existing Menglu OS wording where possible instead of creating a separate script lineage.

### Changed

- Live Interface Map now treats iPhone Shortcuts and Home Screen widgets as front-end access points for Menglu OS rather than a separate system.
- Future shortcut work should prioritise clearer naming, fewer duplicate scripts, one useful action per shortcut, and reuse of stable shared wording.

### Operating effect

Device shortcuts should reduce access friction and cognitive load while remaining connected to the same Menglu OS architecture. New shortcut groups should be created only when they remove a real access barrier and cannot fit an existing group.

## v0.12.0 - GitHub-First Connected-Tools Rule

### Added

- GitHub-first connected-tools rule in `MASTER_PROMPT.md`.
- Governance rule requiring repository search before creating new Menglu OS prompts, workflows, templates, operating rules, or reusable documentation.
- Connected-tools rule covering GitHub, Gmail, Google Calendar, Google Drive, Google Contacts, uploaded files, and web verification when relevant and authorised.
- Approval and safety limits for irreversible, sensitive, privacy-related, legal, financial, benefits, calendar, email, or repository actions.

### Changed

- Menglu OS now treats GitHub as the primary workspace for stable reusable rules, architecture, templates, workflows, and operating procedures when available.
- Future substantial tasks should use connected tools automatically when this reduces manual copying, repeated steps, or unnecessary decisions.
- The assistant should ask for input only when a decision, approval, missing information, privacy concern, or irreversible action requires it.

### Operating effect

Menglu should act as approver rather than manager. The assistant should search, retrieve, verify, update, and integrate through available connected tools where safe, while avoiding storage of sensitive personal information in public repository files.

## v0.11.0 - ACTIVE Family Communication Protocol

### Added

- ACTIVE family communication protocol inside `Family_Operations_Agent.md`.
- Chinese-language emergency communication script for sudden situations when Menglu types `Active`.
- Guidance for family to reduce pressure, avoid repeated questions, allow written or non-verbal responses, and focus on rest before non-urgent discussion.
- Emergency safety wording covering severe chest pain, loss of consciousness, breathing difficulty, serious injury, or other immediate danger.

### Changed

- Emergency family communication is now treated as part of the Communication Engine / Family Operations Agent rather than a separate prompt, module, dashboard, or automation.
- Future wording changes should update the existing ACTIVE protocol section instead of creating duplicate emergency communication files.

### Operating effect

When Menglu types `Active`, the assistant should switch directly into Chinese family communication support, explain that Menglu may be unable to speak or organise language, and guide family to reduce pressure while checking only for genuine emergency danger.

No new automation is required because this is an event-triggered communication protocol.

## v0.10.0 - Architecture Review Gate Strengthening

### Added

- Explicit Architecture Review Gate in Integration Governance.
- Required review questions before creating or accepting any new framework, workflow, prompt, automation, operating system, dashboard, or module.
- Stronger rule that new chat content should be treated as an extension of Menglu OS / Mellow Navigator, not a separate project by default.

### Changed

- Integration Governance now makes the integration-first rule more visible and operational.
- Separate modules are limited to clear technical or operational reasons, such as distinct data-processing pipelines.
- Future changes should continue to update existing documentation where possible rather than creating duplicate prompt files.

### Operating effect

Before substantial Menglu OS changes, the assistant should identify what is genuinely new, where it belongs, why it should be integrated there, what conflicts exist, and whether to integrate, replace, merge, or keep separate.

## v0.9.0 - Menglu OS v3 Validation Mode

### Added

- Menglu OS v3 validation baseline.
