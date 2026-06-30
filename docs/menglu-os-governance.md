# Menglu OS Integration Governance

## Purpose

This document defines how new workflows, prompts, automations, frameworks, and operating-system ideas should be handled inside Menglu OS.

The default rule is:

> Treat new ideas as extensions of Menglu OS unless there is a clear technical reason to keep them separate.

The aim is to maintain one coherent system with the fewest possible duplicated prompts, chats, automations, and documents.

---

## Core Principle

Before creating any new framework, workflow, prompt, automation, or operating-system component:

1. Review what is already established.
2. Identify what is genuinely new.
3. Avoid duplicating existing systems.
4. Integrate new capabilities into the existing Menglu OS architecture whenever possible.

Understanding information does not mean Menglu can reliably organise, initiate, complete, monitor, coordinate, follow up, or manage tasks independently.

Supported performance during a chat, appointment, or prepared task does not necessarily reflect independent day-to-day functioning.

---

## Integration Components

Every significant idea should be mapped to one or more existing Menglu OS components:

| Component | Use |
|---|---|
| Executive Function Engine | Task initiation, planning, sequencing, prioritisation, monitoring, follow-up, reminders, and recovery-aware workload control. |
| Communication Engine | Written communication, no-phone rules, scripts, drafts, Easy Read wording, family explanations, professional messages, and accessibility wording. |
| Memory & Evidence Engine | Stable facts, evidence tracking, timelines, uploaded documents, appointment history, professional involvement, and case records. |
| Decision Engine | Whether to act, wait, escalate, merge, replace, archive, or ask for clarification. |
| Verification Engine | Fact-checking, separating confirmed facts from assumptions, identifying uncertainty, and using reliable sources where needed. |
| Output Engine | Document format, templates, appointment packs, letters, emails, summaries, tables, and final checklists. |
| Existing Automations | Scheduled or repeated checks, reminders, scans, and follow-up reports. |
| GitHub Documentation | Stable reusable rules, architecture notes, and permanent operating instructions. |

---

## Required Review Format

When proposing a significant change, provide:

### 1. What is new

State only the genuinely new capability.

### 2. Where it belongs

Name the relevant Menglu OS component.

### 3. Why

Explain why it should be integrated there instead of becoming a separate prompt, chat, workflow, or system.

### 4. Conflicts

Identify duplication, overlap, contradiction, or unnecessary complexity.

### 5. Recommendation

Use one of these outcomes:

- Integrate into Menglu OS
- Replace an older workflow
- Merge with an existing workflow
- Keep as a separate module, only if there is a clear technical reason

---

## Verification Requirements

Before giving conclusions:

- Distinguish confirmed facts, unconfirmed information, assumptions, and missing information.
- Do not invent facts.
- State uncertainty clearly when evidence is insufficient.
- Ask only the minimum number of clarification questions required.
- Prefer official or primary sources when factual verification is needed.
- Reuse existing verified information instead of recreating it.

---

## Automation Rules

When a repeated task is identified:

1. Check whether an existing automation already performs the same function.
2. Prefer improving an existing automation instead of creating another one.
3. Recommend consolidation whenever possible.
4. Reduce duplicate reminders, monitoring, and reports.
5. Design automations to notify only when action is required, where technically possible.

Repeated monitoring should not create extra visible work unless Menglu needs to review or approve something.

---

## GitHub Rules

If a conversation produces a permanent Menglu OS improvement:

- Record only stable and reusable improvements.
- Prefer updating existing documentation instead of creating duplicate documents.
- Do not create a new file when an existing file can be safely updated.
- Keep GitHub documentation focused on system rules, not temporary case details.

---

## Final Check for Substantial Tasks

Before finishing a substantial task, verify:

- Is this already covered elsewhere?
- Can this be merged into Menglu OS?
- Can an existing automation be improved instead of creating a new one?
- Can cognitive load be reduced?
- Are important claims supported, verifiable, clearly labelled, or explicitly marked as uncertain?

---

## Current Status

Confirmed:

- This is a governance rule for Menglu OS.
- It should not become a separate operating system.
- It is intended to reduce duplication and cognitive load.

Recommendation:

- Integrate into Menglu OS as a permanent governance layer across the Decision Engine, Memory & Evidence Engine, Output Engine, and automation review process.
