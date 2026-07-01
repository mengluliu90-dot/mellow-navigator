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
