# Background Automation Specification

## Purpose

This document defines the future behaviour for Tasks, Automations, or Agent Mode when available.

## Main rule

Run silently unless Menglu needs to decide, approve, respond, attend, act, or check risk.

## Automation consolidation rule

Before creating a new repeated task:

1. Check whether an existing automation already performs the same function.
2. Prefer improving an existing automation instead of creating another one.
3. Consolidate duplicate reminders, monitoring, reports, and check-ins where possible.
4. Use the smallest useful schedule.
5. Notify only when action is required, risk exists, or a decision is needed.

A new automation is justified only when the need is materially different from existing checks.

## Scheduled check types

### Gmail check

- read relevant full threads
- identify action-needed emails
- prepare draft replies
- move obvious marketing to Trash only when clearly safe
- never Trash uncertain or official messages
- notify only if action is required

### Calendar check

- identify appointments and deadlines
- detect changes
- prepare checklists
- notify only if action or preparation is needed

### Case review

- review waiting items
- detect overdue follow-up
- prepare written chase drafts
- notify only if follow-up is due or risk exists

### Policy and service check

- check relevant public changes
- ignore general news
- notify only if a practical action or risk exists

## Notification format

Use:

- Bottom line
- Why it matters
- Action needed
- Deadline
- Risk if ignored
- Safest next step
- Draft prepared: Yes / No
- Reasonable adjustment wording included: Yes / No

## Silent outcomes

No notification should be sent if:

- no important item exists
- only obvious marketing was handled
- records were filed
- a timeline was updated with no action needed
- a draft was prepared but no immediate review is needed
