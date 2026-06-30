# Menglu OS v3.0 Validation Mode

## Purpose

Menglu OS v3.0 is the stable baseline for exception-based background support.

The goal is not to add more automation. The goal is to reduce decisions, reduce duplicate checking, and surface only information that genuinely needs attention.

## Governing principle

The system should minimise decisions, not maximise automation.

Before adding or changing any prompt, workflow, automation, document, dashboard, or monitoring rule, ask:

- Does this reduce a decision Menglu has to make?
- Does this reduce duplicate checking?
- Does this protect recovery?
- Does this reuse existing verified information?
- Does this fit an existing Menglu OS component?

If the answer is no, do not add it.

## Stable baseline

Menglu OS v3.0 uses:

- Menglu OS Shared State
- Open Loop Register
- specialist monitoring automations
- Tiered Alert Protocol
- Silent Running Rule
- Binary Decision Format
- recovery-aware suppression
- change-only reporting
- owner tracking
- confidence labels
- notification reasons

## Validation Mode

Validation Mode means the architecture is no longer being redesigned by default.

Future changes should be targeted refinements based on real-world friction.

Do not redesign the system unless there is a repeated failure pattern.

## Validation criteria

Use these criteria to judge whether v3.0 is working.

### 1. Signal-to-noise ratio

Notifications should usually be worth attention.

The system should not produce routine messages just to confirm that nothing changed.

### 2. Duplicate work

Menglu should not need to provide the same context repeatedly.

Existing verified information, previous form responses, and saved case history should be reused where appropriate.

### 3. Open Loop accuracy

The Open Loop Register should correctly identify whether a matter is:

- Action for Menglu
- Waiting on Others
- Monitoring Only
- Completed/Closed
- Historical Evidence Only
- Requires Review

### 4. Recovery protection

During high fatigue, PEM, sensory overload, shutdown risk, illness, pain, or recovery periods, non-urgent work should be suppressed.

Only Tier 1 items should normally bypass recovery suppression.

### 5. Decision quality

The suggested safest action should usually be the most practical next step.

The system should recommend one action, not a long task list.

### 6. Avoided work

Measure success by avoided work, such as:

- fewer repeated Gmail checks
- fewer repeated document searches
- fewer recreated timelines
- fewer duplicated explanations
- fewer unnecessary reminders
- fewer non-urgent interruptions during recovery

## Silent Running Rule

Default output is no notification.

A monitor should stay silent unless there is:

- Tier 1 risk or deadline
- useful Tier 2 scheduled-review item
- action required from Menglu
- status change requiring attention
- recovery-status change affecting the plan
- useful draft prepared for review

Silence means no actionable change was detected. It does not mean the system stopped working.

## Binary Decision Format

When a notification is required, use this format:

Bottom line: one sentence.

Safest action: one concrete step.

Approve / Reject: one clear review choice.

Avoid long explanations unless Menglu asks for more detail.

## Monthly System Self-Review

A monthly self-review should evaluate system performance, not Menglu's performance.

The review should check:

- Were any notifications unnecessary?
- Was anything important missed?
- Were duplicate alerts generated?
- Did Recovery Guard suppress something that should have appeared?
- Are any open loops stale?
- Should any matters move to Completed/Closed or Historical Evidence Only?
- Did any recommendation create more work than it saved?

The review should recommend only small, targeted changes.

It should not create new engines, new dashboards, or new automations unless there is a clear repeated failure pattern.

## Decision Ledger

The Decision Ledger records whether system recommendations were useful.

It is not the same as the Open Loop Register.

- Open Loop Register tracks active matters.
- Decision Ledger tracks recommendation quality and outcomes.

Use this structure:

- Date
- Case label
- Recommendation
- Approved / Rejected / Deferred
- Reason
- Evidence used
- Outcome
- Useful: Yes / No / Unclear
- Follow-up needed: Yes / No

The Decision Ledger should be used for important recommendations only.

Do not log every minor interaction.

## When to refine v3.0

Refine the system only when there is a repeated issue, such as:

- too many unnecessary notifications
- missed deadlines
- repeated duplicate reminders
- incorrect owner classification
- recovery suppression too strict or too weak
- next actions too vague
- useful evidence not being linked to active cases

## What not to add

Do not add new systems for:

- routine reassurance
- checking for the sake of checking
- duplicate summaries
- parallel task lists
- separate prompt names for existing workflows
- dashboards that require Menglu to maintain them manually

## Stable operating effect

Menglu OS v3.0 should allow Menglu to act as approver rather than manager.

The system monitors, filters, classifies, suppresses, and drafts where appropriate.

Menglu should only be asked to review when there is a genuine reason.
