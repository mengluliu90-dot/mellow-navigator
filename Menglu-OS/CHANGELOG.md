# Changelog

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
- Non-goals clarifying that the public repository must not store live case evidence, medical records, identifiers, bank information, confidential emails, or private monitoring data.

### Changed

- Roadmap now treats automation independence as lower-friction triggering and safer handoff to ChatGPT or connected tools, not as unsupported background monitoring by GitHub Pages.
- Future Mellow Navigator upgrades should improve EOS, PA, Mellow, and Profile Passport integration before creating new dashboards or modules.

### Operating effect

Mellow Navigator should help Menglu press one button, copy one prepared `Update` packet, and trigger ChatGPT processing with less explanation. The system should maximise independence while preserving privacy, evidence quality, and approval boundaries.

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
- The assistant should ask for input only when a decision, approval, missing information, privacy concern, security issue, or irreversible action requires it.

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
