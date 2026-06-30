# Changelog

## v0.9.0 - Menglu OS v3 Validation Mode

### Added

- Menglu OS v3.0 Validation Mode documentation.
- Governing principle: the system should minimise decisions, not maximise automation.
- Silent Running Rule for exception-only monitoring.
- Binary Decision Format for necessary notifications.
- Decision Ledger rule to track whether important recommendations were useful.
- Monthly System Self-Review protocol for evaluating system performance.

### Changed

- Integration Protocol now treats v3.0 as a stable baseline rather than an architecture still being redesigned.
- Future changes should be targeted refinements based on repeated real-world friction.
- Open Loop Register remains the coordination point, while Decision Ledger tracks recommendation quality and outcomes.

### Operating effect

Menglu OS v3.0 should allow Menglu to act as approver rather than manager. The system should stay silent unless action, risk, deadline, meaningful change, recovery-state change, or a useful draft requires review.

## v0.8.0 - Tiered Alert Automation Integration

### Added

- Tiered Alert Protocol for monitoring automations.
- Shared notification rules covering Tier 1, Tier 2, and Tier 3 alerts.
- Notification reason, confidence level, owner, and change-status fields for automation outputs.
- Open Loop Register change labels: New, Changed, Escalated, Resolved, Action Needed, Suppressed, Duplicate, and Historical Only.

### Changed

- Email Follow-up Review, Open Loop Register, Recovery Guard, Appointment Shield, and Evidence Watch now use the same shared alert logic.
- Automations should report into Menglu OS Shared State and the Open Loop Register rather than creating separate task lists.
- Recovery state should suppress non-urgent Tier 2 and Tier 3 items while allowing Tier 1 items when risk, deadline, appointment timing, or safety requires attention.
- Monitoring should prioritise changes instead of repeating unchanged information.

### Operating effect

Future automation outputs should explain why Menglu is being notified, whether Menglu is the owner, whether the item is new or changed, and whether it is urgent enough to surface now.

The default automation outcome is fewer alerts, less duplication, clearer ownership, and one smallest safe next action.

## v0.7.0 - Form Completion Integration

### Added

- Form completion integration rule for forms, questionnaires, applications, referrals, reviews, assessments, and official paperwork.
- Field inventory workflow covering form type, purpose, organisation, deadline if present, required evidence, mandatory fields, optional fields, consent sections, declarations, and upload requirements.
- Audit-trail labels for form work: Verified, Suggested, User Confirmed, Missing, and Requires Review.
- Healthcare and official form convention rule covering requested identifiers, ethnicity versus nationality, uncertainty preservation, and accessibility wording.

### Changed

- Form-filling work should be treated as an Executive Function Engine workflow rather than a separate prompt or standalone operating system.
- Form responses should reuse verified stored information and uploaded evidence instead of recreating baseline details.
- Form work should link to the Memory and Evidence Engine, Verification Engine, Communication Engine, Output Engine, and existing automations only where needed.

### Operating effect

Future form work should first analyse the full document, identify fields and evidence requirements, separate confirmed information from missing or uncertain information, draft answers clearly, complete a quality check, and provide an audit trail where useful.

No new automation or standalone form-filling module is required unless a future technical reason emerges.

## v0.6.0 - Menglu OS Integration Governance Strengthening

### Added

- Conversation extension rule: new chats, prompts, drafts, and external AI instructions should be treated as extensions of Menglu OS / Mellow Navigator by default, not as separate projects.
- Component placement rule mapping new capabilities into existing Menglu OS components: Executive Function Engine, Communication Engine, Memory & Evidence Engine, Decision Engine, Verification Engine, Output Engine, existing automations, or existing GitHub documentation.
- Stronger final-check requirements before substantial tasks: check existing coverage, mergeability, automation consolidation, cognitive-load reduction, and verification status.
- Explicit instruction to consolidate repeated reports and automations instead of creating duplicate reminders, monitoring, or dashboards.

### Changed

- Integration Governance now prioritises one coherent Menglu OS with the fewest practical prompts, chats, automations, dashboards, and documents.
- New frameworks, workflows, prompts, dashboards, and automations should be reviewed for genuine novelty before being accepted.
- GitHub documentation should continue to store only stable, reusable, non-sensitive operating rules, not live personal evidence or case records.

### Operating effect

Future Menglu OS work should default to integration, merger, or replacement of older workflows rather than creating new independent systems.
