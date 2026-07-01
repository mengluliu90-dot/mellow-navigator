# Live Interface Map

## Purpose

This note records how the live pages and device entry points fit together as one Menglu OS system.

## Interface roles

- PA: structured intake, object creation, task routing, draft generation, and case updates.
- Mellow: communication interface for AAC, profile speaking, quick scripts, and latest PA object wording.
- Mira: Evidence Engine for PA objects, stable evidence, timeline, waiting items, draft layers, contradiction checks, and case history.
- Profile Passport: reusable one-button summary for conditions, access needs, and reasonable adjustments.
- EOS Dashboard: daily capacity, recovery, case review, evidence watch, and one-action workload view.
- Device Shortcuts: quick actions for reusable communication, advocacy, navigation, translation, home, finance, benefits, health, and summary scripts.

## Entry points

- `/pa/start.html` — integrated start page.
- `/pa/` — PA intake and structured object processing.
- `/` — Mellow communication interface.
- `/mira-next/` — Mira Evidence Engine view.
- `/pa/profile.html` — profile passport.
- `/pa/eos.html` — EOS dashboard.
- iPhone Shortcuts app and Home Screen widgets — low-friction access to reusable Menglu OS scripts and support actions.

## Active processing protocol

Current chat operations should use the Menglu OS automation handling sequence when task material is provided.

Default sequence:

```text
Triage -> Context -> Draft -> Outcome
```

### Execution constraints

- Do not ask what Menglu wants done when the task can be safely classified and processed from the supplied material.
- Ask only when information is missing, uncertain, privacy-sensitive, irreversible, or necessary for safety or accuracy.
- Do not guess missing facts.
- Use available evidence, current conversation material, authorised connected tools, uploaded files, and GitHub documentation when relevant.
- Keep Cherrytrees material as historical evidence only unless Menglu gives a new explicit instruction to use that route again.
- Include recovery cost or burden when the task may create communication, administrative, travel, sensory, or decision-making load.
- Prefer family involvement only when a task is high load, high risk, time-sensitive, or likely to exceed Menglu's safe processing capacity.

### Standard output structure

For task material, default to this structure unless another format is clearly more useful:

```text
[任务记录]
• 所属看板:
• 状态更新:

[自动化输出]
• 内容:
• 无障碍调整说明:

[自我修正建议]
• 风险点:
• 下一周期:
```

## Central orchestration rule

Menglu OS should behave as one coordinated system, not as separate automations competing for attention.

The central orchestration layer is a rule inside the existing architecture. It is not a new dashboard, new agent, or separate operating system.

### Routing order

When new information enters Menglu OS, process it in this order:

1. Classify the event once.
2. Check whether it matches an existing case, open loop, draft, appointment, recovery state, or evidence item.
3. Reuse the existing component when possible.
4. Update Current Context before changing OS Evidence.
5. Trigger only the smallest relevant output: no action, risk note, Case Summary, Prep Pack, Safest Draft, or one decision request.

### Shared state

All interfaces should treat these as shared state rather than separate records:

| Shared state | Used by |
|---|---|
| `uos_state` | EOS, Mellow, PA, Recovery Guard, Sync Packet |
| `uos_cases` | PA, Mira, Outcome Tracker, Open Loops, Mellow dashboard |
| `uos_tasks` | Attention view, Open Loops, automation handovers |
| `uos_drafts` | PA, Safest Draft, Mellow Sync Packet |
| `uos_timeline` | Mira, Debrief Loop, case history |
| `current_mode_text` | EOS, Mellow cards, appointment/support handovers |

If the same fact appears in more than one interface, one copy should be treated as the source item and the other copies should be views, summaries, or exports.

## Deduplication rule

Before adding a new shortcut, page, prompt, automation, label, case, or evidence note, check whether it is repeating an existing Menglu OS function.

### Merge instead of duplicate

| Repeated item | Default action |
|---|---|
| Duplicate shortcut wording | Point it to existing Mellow, PA, EOS, or Profile Passport wording. |
| Duplicate open loop | Merge into the existing case or waiting item. |
| Duplicate appointment preparation | Update the existing Appointment Shield / Prep Pack flow. |
| Duplicate recovery warning | Update `uos_state` or EOS instead of making another reminder. |
| Duplicate evidence summary | Keep stable material in Mira / OS Evidence and temporary material in Current Context. |
| Duplicate case summary | Replace with one current Case Summary linked to the active case. |
| Duplicate automation output | Convert to one Outcome Tracker update or one Safest Draft. |

### Delete or archive criteria

A duplicate can be deleted or archived when all of these are true:

1. It does not contain unique reusable wording.
2. It does not contain a unique active deadline, risk, decision, or waiting item.
3. It has already been merged into the correct existing component.
4. Keeping it would increase confusion, repeated notifications, or repeated decisions.

If uncertain, mark it as `Historical evidence only` or `Reference` rather than deleting it.

## Event flow

Use one event flow across interfaces:

```text
Incoming item
  -> Document Triage
  -> Existing case or new case decision
  -> Three-Layer Pipeline
  -> Recovery burden check
  -> Output choice
  -> Outcome Tracker / Debrief Loop
```

The same item should not independently create a shortcut, an open loop, a timeline entry, a draft, and a reminder unless each has a distinct role.

## Mira Evidence Engine boundary

Mira should act as the evidence layer inside Menglu OS, not as an unsupported live background monitor.

### Mira should do

- Display PA objects, case evidence, waiting items, draft layers, and timeline records.
- Support stable evidence review and case history navigation.
- Help identify duplicate evidence, contradictions, missing support, and relevant evidence for a case summary or safest draft.
- Feed the Three-Layer Pipeline by supplying the minimum relevant evidence from OS Evidence into Current Context and Safest Draft outputs.
- Remain local-first where possible and avoid unnecessary manual copying.

### Mira should not do

- Claim to monitor Gmail, Calendar, Clixifix, banking, DWP, NHS, or other live systems in the background by itself.
- Store private medical records, identifiers, bank details, confidential emails, or live case evidence in public repository files.
- Replace live source checks when current operational state depends on a new email, appointment, document, or connected-tool result.
- Become a duplicate dashboard if EOS, PA, Mellow, or Profile Passport can handle the need.

### Source boundary

Use the correct source for each layer:

| Layer | Authoritative source |
|---|---|
| Stable evidence | Mira / OS Evidence |
| Current operational state | Context Packet, latest user input, PA objects, and connected-tool results when explicitly checked |
| Live information | Gmail, Calendar, uploaded documents, current conversation, or other authorised tools |
| System architecture | GitHub documentation |

When these conflict, newer live source material should update Current Context first. Stable OS Evidence should change only after the new information is confirmed as durable, reusable, and appropriate for the evidence layer.

## Device Shortcuts layer

The Device Shortcuts layer is a front-end access layer, not a separate operating system.

It provides quick access to existing Menglu OS capabilities when opening a web page, searching a document, or composing a full prompt would create avoidable cognitive, communication, sensory, or executive-function load.

### Observed shortcut groups

The screenshots show shortcut groups that map to existing Menglu OS components:

| Shortcut group | Existing Menglu OS placement |
|---|---|
| Communication Aids | Communication Engine / Mellow |
| Health and Social Care | Memory & Evidence Engine, Communication Engine, Output Engine |
| PIP and UC | Benefits advocacy workflow, Output Engine, Verification Engine |
| Finance and Benefits | Executive Function Engine, Decision Engine |
| Home | Family OS / Home and Utilities |
| Need Help and crisis access | Communication Engine and escalation wording |
| Navigation, parking, pollen, location | Accessible Travel Planning and state/context support |
| About Me, Functional Summary, Carer's Speech | Profile Passport and reusable professional summaries |

### Operating rule

When a stable shortcut duplicates an existing Menglu OS capability, it should point to or reuse the existing wording rather than creating a separate script lineage.

When a shortcut contains genuinely new reusable wording, first decide whether it belongs in:

- Communication Engine / Mellow
- Memory & Evidence Engine / Mira
- Decision Engine
- Output Engine
- Existing automations
- Existing GitHub documentation

Only create a new shortcut group when it removes a real access barrier and cannot fit an existing group.

### Maintenance rule

Future Device Shortcuts work should prioritise:

1. clearer naming;
2. fewer duplicate scripts;
3. one most useful action per shortcut;
4. reusable wording shared with Menglu OS documentation where possible;
5. no storage of private identifiers, confidential correspondence, financial account data, or live evidence in public repository files.

## Integration rule

These pages and shortcuts are not separate operating systems. They are separate views of the same Menglu OS architecture.

Future work should improve these existing pages, shortcuts, shared wording, and shared data keys before creating new dashboards, prompts, modules, or duplicate shortcut groups.