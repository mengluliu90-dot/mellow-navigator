# Background Automation Specification

## Status

This document is an automation-layer index, not a separate operating system.

The current Menglu OS runtime layer should remain consolidated around five coordinated automations:

1. Silent Gmail Handler
2. Open Loop Register
3. Appointment Shield
4. Evidence Watch
5. Case Orchestrator

Do not create extra monitoring tasks unless the need is materially different and cannot be safely absorbed by one of these five.

## Main rule

Run silently unless Menglu needs to decide, approve, respond, attend, act, supply a specific missing item, or check a real risk/deadline.

## Consolidation rule

Before creating or changing any automation:

1. Check whether one of the five existing automations already covers the function.
2. Prefer improving the existing automation instead of creating another task.
3. Consolidate duplicate reminders, monitoring, reports, summaries, and check-ins.
4. Use the smallest useful schedule.
5. Notify only when action, approval, missing evidence, risk, deadline, or a meaningful change exists.

A new automation is justified only when:

- the trigger source is materially different;
- the risk profile is materially different;
- the task cannot be safely handled by the five-task layer;
- adding it removes more work than it creates.

## Role of each automation

### Silent Gmail Handler

- Gmail intake layer.
- Classifies important messages.
- Links messages to existing cases where possible.
- Handles low-risk, high-confidence replies only when safe and authorised by the automation rule.
- Creates drafts or approval cards for anything higher-risk.

### Open Loop Register

- Master unresolved-matter register.
- Consolidates active, waiting, monitoring, completed, and historical-only matters.
- Prevents duplicate open loops.
- Surfaces only genuine action cards, approval cards, risks, deadlines, or blocked items.

### Appointment Shield

- Appointment-specific and live-interaction layer.
- Prepares scripts, one-page summaries, key questions, reasonable adjustments, travel reminders, and recovery planning where useful.
- When `Active` is triggered, supports live meeting tracking inside AI Advocate Mode rather than creating a separate automation.
- Tracks who was involved, what was discussed, what Menglu said, what others said, decisions, advice, agreed actions, owners, deadlines, unanswered questions, access barriers, and recovery impact.
- Produces post-event outputs: Easy Read summary, professional record, action list, simple Chinese Mum summary when needed, follow-up drafts, Current Context update, OS Evidence candidate review, and Outcome Tracker update.
- Tracks post-appointment promises, referrals, tests, letters, follow-up dates, and missing written summaries.
- Drafts only. It must not send follow-up emails, escalate, complain, cancel, book, or commit to actions without explicit approval.

### Evidence Watch

- Evidence-specific layer.
- Links new evidence to existing cases.
- Marks evidence as Verified, Supporting, Contradictory, Duplicate, Historical Evidence Only, Missing, or Requires Review.
- Suppresses duplicate or historical-only evidence unless it affects a live matter.

### Case Orchestrator

- Coordination layer.
- Does not duplicate the other four automations.
- Merges duplicates, connects related items to existing cases, detects stale/conflicting states, and surfaces one Action Card or Approval Card only when needed.

## Notification budget

The default goal is fewer notifications, not more monitoring.

For non-urgent work, prefer:

- no notification;
- one consolidated Action Card;
- one consolidated Approval Card;
- scheduled review by the relevant automation.

Bypass suppression only for:

- same-day or 24-hour deadline;
- real safety, safeguarding, banking, benefits, medical, legal, housing-safety, or identity risk;
- appointment today/tomorrow;
- contradiction that could cause unsafe action;
- approval-ready draft that is time-sensitive.

## Silent outcomes

No notification should be sent if:

- no important item exists;
- the item is duplicate;
- the item is unchanged;
- the item is monitoring-only;
- the matter is waiting on someone else and not overdue;
- the evidence is historical-only and does not affect a live matter;
- a record was filed without action needed;
- a draft was prepared but review is not time-sensitive.

## Safety boundary

Automations may classify, summarise, draft, prepare, link, and notify.

They must not claim to have sent messages, changed appointments, submitted forms, made payments, verified identity, contacted third parties, or completed physical tasks unless that action actually occurred through an authorised tool and was within the approved automation boundary.

## Optimisation rule

Every automation change must reduce work, reduce duplication, simplify the system, or increase safe automation.

If it does none of these, do not add it.
