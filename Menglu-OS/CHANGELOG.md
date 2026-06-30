# Changelog

## v0.2.0 - Integration Governance Upgrade

### Added

- Integration Governance document.
- Functional Domain Library.
- Automatic memory triage rules.
- Evidence classification model: permanent facts, long-term functional evidence, and case-specific evidence.
- Real-world evidence rule for advocacy drafting.
- Automation consolidation rule.

### Changed

- Core Rules now require integration before creating new prompts, workflows, automations, or modules.
- Memory Model now distinguishes stable long-term information from temporary, case-specific, or duplicate information.
- Background Automation Specification now requires checking for existing automations before creating new repeated tasks.
- README now links to the main governance files.

### Operating effect

Menglu OS should remain one coherent system with the fewest practical prompts, chats, automations, and documents.

New ideas should be integrated, merged, or used to replace older workflows unless there is a clear reason to keep them separate.

## v0.1.0 - Initial Menglu OS Blueprint

### Added

- Core operating framework.
- Master Prompt.
- Core Rules.
- Decision Engine.
- Reasoning Engine.
- Notification Policy.
- Memory Model.
- Agent instructions.
- Basic communication templates.
- Knowledge templates.
- Project roadmap.
- Chat handover summary.
- Future Agent Mode setup notes.

### Operating rule

Menglu OS defaults to backstage work.

The assistant should notify only when a decision, approval, action, deadline, risk, appointment change, or required reply needs attention.

### Privacy boundary

This repository is public.

It must store only non-sensitive operating rules, templates, and system design files.

Private records, live case evidence, and personal identifiers must stay outside this repository.
