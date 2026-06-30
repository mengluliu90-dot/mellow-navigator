# Background Automation Specification

## Purpose

This document defines the future behaviour for Tasks, Automations, or Agent Mode when available.

## Main rule

Run silently unless Menglu needs to decide, approve, respond, attend, act, or check risk.

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
