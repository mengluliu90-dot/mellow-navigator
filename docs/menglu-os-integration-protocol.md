# Menglu OS Integration Protocol

## Purpose

This protocol keeps Menglu OS as one coherent support system.

New prompts, workflows, frameworks, automations, documentation, and operating procedures should be treated as extensions of Menglu OS unless there is a clear reason to keep them separate.

The goal is to reduce cognitive load, duplicated systems, duplicated reminders, duplicated chats, and repeated decision-making.

## Core rule

Before creating anything new, check whether it can be integrated into the existing Menglu OS structure.

Do not create a new standalone system if the function is already covered by an existing component, automation, GitHub document, or workflow.

## Governing principle

The system should minimise decisions, not maximise automation.

A proposed improvement should be rejected or deferred if it only creates more process, more dashboards, more prompts, or more maintenance without reducing Menglu's decision burden.

## Integration check

For every significant new idea, identify:

1. What is genuinely new.
2. Where it belongs inside Menglu OS.
3. Why it belongs there.
4. Whether it duplicates, overlaps, conflicts with, or complicates an existing feature.
5. The recommended action.

Recommended actions:

- Integrate into Menglu OS.
- Merge with an existing workflow.
- Replace an older workflow.
- Improve an existing automation.
- Keep as a separate module only if there is a clear technical reason.

## Existing Menglu OS components

Use these components first before creating new ones:

- Executive Function Engine
- Communication Engine
- Memory and Evidence Engine
- Decision Engine
- Verification Engine
- Output Engine
- Existing automations
- Existing GitHub documentation
- Mellow Navigator / AAC support
- PA object bridge
- Recovery mode

## Form completion integration rule

Form-filling, questionnaire, application, referral, review, assessment, and official-paperwork work should be treated as an Executive Function Engine workflow, not as a separate operating system or standalone prompt.

When a form is provided, the workflow should:

1. Read the whole form before completing fields.
2. Identify the form type, purpose, organisation, deadline if present, required evidence, mandatory fields, optional fields, consent sections, declarations, and upload requirements.
3. Build a field inventory with suggested response, source, confidence, and review status where useful.
4. Reuse verified information from uploaded documents, stored records, previous form responses, and user-confirmed details.
5. Separate confirmed facts, unconfirmed information, assumptions, and missing information before finalising answers.
6. Mark uncertain fields as missing or requiring review rather than guessing.
7. Check for contradictions, stale information, duplicated wording, and inconsistent names, dates, contact details, support descriptions, or evidence references.
8. Draft answers in clear language matched to the form's purpose and audience.
9. Recommend relevant supporting evidence where proportionate.
10. Complete a final quality check covering mandatory fields, checkboxes, attachments, declarations, contradictions, duplicate entries, and user-review sections.
11. Provide an audit trail where useful, using labels such as Verified, Suggested, User Confirmed, Missing, or Requires Review.

Component links:

- Executive Function Engine: staged completion, task routing, workload reduction, and finalisation checks.
- Memory and Evidence Engine: verified data reuse, evidence matching, previous-form consistency, and audit trail.
- Verification Engine: uncertainty labelling, contradiction detection, source checking, and no-guessing rule.
- Communication Engine: accessibility wording, communication needs, and reasonable-adjustment wording.
- Output Engine: completed form text, summaries, professional wording, evidence lists, and review notes.
- Existing automations: only use or improve an automation if the form creates an ongoing repeated follow-up need.

This rule replaces separate form-filling prompt behaviour where the same function can be handled by Menglu OS.

## Healthcare and official form convention rule

When completing healthcare passports, profiles, care forms, assessment forms, or official identity sections:

- Use the identifier requested by the form and jurisdiction where known.
- Do not substitute an unrelated identifier.
- Distinguish ethnicity, nationality, citizenship, and administrative identity numbers.
- Record only reusable operating rules in GitHub, not private identifiers or live personal case details.
- Describe fluctuating support needs by function, safety, reliability, repeatability, time taken, support required, and recovery required.
- Do not treat prepared written communication, masking, or supported performance as proof of independent reliable functioning.
- Include communication adjustment wording where appropriate, including written information, one question at a time, extra processing time, sensory adjustments, and support-person involvement.
- Preserve uncertainty where information may have changed.

## Automation rule

When a repeated task is identified:

1. Check whether an existing automation already covers it.
2. Prefer improving or consolidating existing automations.
3. Avoid duplicate reminders, duplicate monitoring, and duplicate reports.
4. Design automations to notify only when action is required, where possible.
5. Feed automation findings into Menglu OS Shared State and the Open Loop Register rather than creating separate task lists.
6. Use change detection: report only New, Changed, Escalated, Resolved, or Action Needed items.
7. Include owner, confidence, notification tier, and notification reason where relevant.
8. Apply Silent Running before producing output.
9. Use Binary Decision Format when a notification is necessary.

## Tiered alert protocol

All monitoring automations should use the same alert tiers before notifying Menglu.

| Tier | Meaning | Behaviour |
| --- | --- | --- |
| Tier 1 | Immediate action, safety risk, urgent deadline, appointment today/tomorrow, urgent health/benefit/financial risk, or useful draft requiring review | Notify directly unless there is a clear reason not to |
| Tier 2 | Non-urgent action, routine follow-up, useful evidence, or preparation that can wait | Hold for scheduled review or consolidated summary |
| Tier 3 | Monitoring only, duplicate, historical-only, waiting on others, unchanged item, or suppressed by recovery state | Do not notify unless status changes or risk appears |

The Decision Engine should apply recovery state before surfacing Tier 2 or Tier 3 items. Tier 1 may bypass recovery suppression only where risk, deadline, appointment timing, or safety requires attention.

Every notification should explain why it appeared. Use concise labels such as:

- deadline or risk
- Menglu is the owner
- status changed
- draft prepared
- waiting item is overdue
- recovery state allows action
- recovery state suppresses non-urgent action

## Silent Running rule

The default output is no notification.

A monitor should stay silent unless there is:

- Tier 1 risk or deadline
- useful Tier 2 scheduled-review item
- action required from Menglu
- status change requiring attention
- recovery-status change affecting the plan
- useful draft prepared for review

Do not send routine summaries to confirm that nothing changed.

## Binary Decision Format

When the system notifies Menglu, use the shortest useful format:

Bottom line: one sentence.

Safest action: one concrete step.

Approve / Reject: one clear review choice.

Do not include long explanations unless Menglu asks for more detail.

## Open Loop Register change rules

The Open Loop Register should reduce repeated review by tracking state changes.

Use these change labels:

- New
- Changed
- Escalated
- Resolved
- Action Needed
- Suppressed
- Duplicate
- Historical Only

Resolved matters should move to Completed/Closed or Historical Evidence Only. Closed matters should not be reopened unless new evidence or new risk appears.

## Decision Ledger rule

The Decision Ledger tracks whether system recommendations were useful.

It is different from the Open Loop Register:

- Open Loop Register tracks active matters.
- Decision Ledger tracks recommendation quality and outcomes.

Use the Decision Ledger only for important recommendations, not every minor interaction.

Suggested fields:

- Date
- Case label
- Recommendation
- Approved, rejected, or deferred
- Reason
- Evidence used
- Outcome
- Useful: yes, no, or unclear
- Follow-up needed: yes or no

## Validation Mode rule

Menglu OS v3.0 is a stable baseline.

In Validation Mode, do not redesign the system by default.

Only refine a specific part when repeated real-world use shows a failure pattern, such as missed deadlines, duplicate alerts, incorrect ownership, over-suppression, under-suppression, or unclear next actions.

Monthly system self-review should evaluate the system, not Menglu.

The self-review should check:

- unnecessary notifications
- missed important items
- duplicate alerts
- recovery suppression errors
- stale open loops
- recommendations that created more work than they saved

## GitHub rule

When a stable and reusable Menglu OS improvement is identified:

1. Prefer updating existing documentation.
2. Create a new file only when no suitable existing file exists.
3. Record only stable, reusable improvements.
4. Avoid saving temporary chat-specific details unless they become part of a reusable workflow.

## Verification rule

Before giving conclusions or making permanent changes, distinguish:

- Confirmed facts
- Unconfirmed information
- Assumptions
- Missing information

Use official or primary sources when factual verification is needed.

If something cannot be confirmed, state that it cannot be confirmed from the available information.

## Final check for substantial tasks

Before finishing a substantial task, check:

- Is this already covered elsewhere?
- Can it be merged into Menglu OS?
- Can an existing automation be improved instead of creating a new one?
- Can cognitive load be reduced further?
- Are important claims supported, verifiable, clearly labelled, or marked as uncertain?

## Default outcome

The default outcome should be one coherent Menglu OS with the fewest possible prompts, chats, automations, and duplicated documents.
