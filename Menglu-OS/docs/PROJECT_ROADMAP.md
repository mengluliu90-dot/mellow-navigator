# Menglu OS Project Roadmap

## Purpose

This roadmap records the current state of Menglu OS before moving daily use into a new chat.

Menglu OS is designed as a background executive assistant framework. It should reduce cognitive load, administrative burden, communication pressure, and repeated decision-making.

## Main operating rule

Default to backstage work.

Notify only when a decision, approval, action, deadline, appointment change, risk, or required reply needs attention.

## Completed

### Core system

- Master Prompt
- Core Rules
- Decision Engine
- Reasoning Engine
- Notification Policy
- Memory Model

### Agent files

- Executive Agent
- Gmail Agent
- Case Manager
- Evidence Manager
- Health Agent
- Benefits Agent
- Housing Agent
- Finance Agent
- Calendar Agent
- Research Agent
- Family Operations Agent

### Templates

- General official email
- Healthcare message
- Medical practice message
- Universal Credit message
- Housing message
- Follow-up message
- Written communication request

### Knowledge and documentation

- Index template
- Record map template
- Implementation plan
- Privacy boundary
- How to use guide

## Six-step operational workflow

### Purpose

Use one stable execution path for case-management work so incoming information moves from triage to outcome without repeatedly asking Menglu to decide which process applies.

| Stage | Component | Role |
|---|---|---|
| 1. Intake | Document Triage | Categorise incoming information as Action Required, Waiting, Reference, High Risk, or Archive. |
| 2. Processing | Three-Layer Pipeline | Map the event against OS Evidence and Current Context. |
| 3. Preparation | Prep Pack | Build appointment or meeting preparation when a scheduled event needs support. |
| 4. Execution | Safest Draft | Generate the safest action-ready response, usually for approval before sending. |
| 5. Closure | Debrief Loop | Capture outcome, decisions, new evidence, follow-up actions, and recovery impact. |
| 6. Oversight | Outcome Tracker | Track each active case against its objective, status, last action, outcome, and next review. |

### Document Triage standard

Every dropped-in item should first be categorised as:

- **Action Required** — contains a deadline, request, form, appointment action, required reply, risk, or decision.
- **Waiting** — another person or organisation must act before Menglu can progress the case.
- **Reference** — useful information to retain for the case summary or evidence index, but no current action.
- **High Risk** — benefits, banking, legal, safeguarding, health, housing safety, deadlines, fraud, or identity/security risk.
- **Archive** — low-value or completed information that does not need active attention.

### Prep Pack standard

When an appointment, meeting, assessment, review, or formal interaction is identified, generate a Prep Pack when useful.

A Prep Pack should include:

- purpose of the appointment or interaction
- relevant current context
- minimum relevant OS Evidence
- key functional impact points
- reasonable adjustment wording
- questions for the professional or organisation
- documents or evidence to reference
- recovery planning recommendation
- one-page professional summary if needed

### Debrief Loop standard

After an appointment, message exchange, call, form submission, repair visit, or other case event, capture:

- outcome
- decisions made
- advice or explanation given
- new evidence
- follow-up actions
- owner or lead
- timescale or deadline
- unanswered issues
- recovery impact

Only confirmed, durable, reusable information should be promoted into OS Evidence. Temporary symptoms, one-off stress, waiting states, or uncertain comments should remain in Current Context.

### Outcome Tracker standard

Each active case should have an outcome-focused line so the system tracks purpose, not just activity.

| Case | Objective | Status | Last action | Outcome so far | Next review | Confidence |
|---|---|---|---|---|---|---|

Outcome Tracker should be included in Context Packets when it helps clarify direction, reduce repeated decisions, or identify stagnation.

### Recovery Planning standard

Every proposed action should consider recovery burden.

Use:

- **Low** — can usually be done with minimal recovery impact.
- **Medium** — may require pacing, written support, or rest afterwards.
- **High** — likely to need preparation, support, reduced demands, or recovery time.

Prefer recovery recommendations over rigid blackout rules. Where date-specific appointments exist, consider low-demand preparation time before the event and recovery protection afterwards, especially when the action is high-load.

## Alignment and feedback loop standards

### Purpose

Keep current tasks, reusable wording, and triggers aligned across Mellow, PA, Mira, EOS, ChatGPT, and connected tools without creating another competing task list.

### Current Priority Index

Do not create a separate `Open_Tasks.md` unless there is a specific technical need. Use the existing `uos_cases`, `uos_tasks`, Outcome Tracker, Open Loops, and Sync Packet as the live task base.

When producing a task summary, generate a Current Priority Index from existing state:

| Priority | Meaning | Default handling |
|---|---|---|
| P1 | High risk, deadline, required reply, safety, benefits, banking, health, housing safety, or irreversible decision | Surface immediately with safest draft or one approval request. |
| P2 | Active case with useful next step but no immediate deadline | Prepare next step and hold for review. |
| P3 | Waiting on another person or organisation | Record waiting state and avoid duplicate reminders. |
| P4 | Reference, monitoring, completed, or historical evidence | Archive, summarise, or keep as context only. |

Priority is based on risk, deadline, reversibility, recovery burden, and whether action is possible now. It is not based on emotional urgency alone.

### Replacement rule

When a new task is identified:

1. Compare it against existing active cases and waiting items.
2. If it is higher priority, surface it and pause lower-priority work.
3. If it is equal priority, merge it into the existing case summary.
4. If it is lower priority, place it in Waiting, Monitoring, Reference, or Historical Evidence.
5. Do not ask Menglu to choose a schedule unless two genuine P1/P2 actions conflict.

### Response Template Library standard

Do not draft high-frequency official messages from scratch when reusable wording exists.

Use modular template fragments where possible:

| Template module | Use case |
|---|---|
| Accessibility opening | Any official, healthcare, benefits, housing, banking, or education message. |
| Written communication only | No phone, email or letter preferred, extra processing time. |
| Mother-assisted drafting | When a message is written with support from mother and AI due to communication and health needs. |
| Reasonable adjustments | Appointments, forms, assessments, complaints, services, housing, benefits. |
| Functional impact | Autism, processing difficulty, fatigue, POTS, PEM, sensory overload, executive dysfunction, travel limits. |
| Evidence reference | When linking documents, timelines, photos, emails, or professional evidence. |
| Safest closing | Clear next action, written confirmation, deadline or review point, no unnecessary escalation. |

Templates must remain factual, proportionate, and situation-specific. Do not add legal wording unless it is relevant and accurate for the task.

### Trigger rules

Triggers should create drafts and structured outputs, not perform irreversible actions without approval.

| Trigger | Automatic action | Requires approval before |
|---|---|---|
| `[Priority: High]` or clear deadline/risk | Triage as P1, prepare safest draft, identify recovery burden | Sending, deleting, accepting, declining, paying, escalating, or disclosing sensitive information |
| Appointment notice | Create Appointment Shield / Prep Pack summary | Confirming attendance, changing appointment, sending requests |
| Gmail or letter requiring reply | Classify importance and draft reply | Sending reply |
| Housing repair update | Update Home Repair Tracker and draft written follow-up if useful | Sending complaint/escalation |
| Benefits, banking, legal, safeguarding, identity/security | Mark High Risk and produce safest next step | Any irreversible or sensitive action |
| Recovery state low/shutdown | Suppress non-urgent tasks and surface only P1 items | Cancelling or rescheduling appointments |

### Stop-and-consult rule

Stop and ask one clear question when:

- the action is irreversible;
- information is missing and cannot be safely inferred from evidence;
- the task involves legal, financial, benefits, medical, safeguarding, identity, or security risk;
- two high-priority actions conflict;
- the user appears to be asking to store private evidence in a public repository;
- the output could expose identifiers, confidential records, bank details, medical records, or private correspondence.

### Feedback loop

After each task output, update or prepare an update for:

1. Current Priority Index;
2. active case status;
3. next action or waiting state;
4. evidence status: Verified, User Confirmed, Suggested, Missing, Requires Review, Historical Evidence Only;
5. recovery burden;
6. next review date only if a real deadline, appointment, or waiting point exists.

The feedback loop should reduce future questions. It should not create extra reminders, duplicate records, or unnecessary summaries.

## Three-layer operating pipeline

### Purpose

Keep stable evidence, current context, and output generation separate so that temporary updates do not contaminate long-term evidence and long-term evidence is not repeatedly copied into every live task.

### Layer 1: OS Evidence

Stable repository for long-term, reusable, non-sensitive evidence categories such as:

- confirmed health and disability facts
- functional impact patterns
- communication and accessibility requirements
- reasonable adjustment needs
- reusable impact wording
- stable case history markers

OS Evidence is updated only when there is a confirmed, durable change. Daily symptoms, temporary recovery state, appointment stress, or short-term events should not be treated as permanent OS Evidence unless later confirmed as a stable pattern or formal record.

### Layer 2: Current Context

Dynamic operational layer for:

- today's recovery or capacity state
- active cases
- waiting items
- deadlines
- current correspondence
- open decisions
- latest events
- case status changes

Current Context can change frequently and should be used to decide what is safe, timely, realistic, or unnecessary today.

### Layer 3: Safest Draft / Output

Event-triggered output layer.

Safest Drafts should draw only the minimum necessary evidence from OS Evidence and combine it with the current context.

Outputs should usually be one of:

- no action required
- risk identified
- one safest next step
- a case summary
- a prepared draft for approval
- a binary decision request when Menglu genuinely needs to decide

### Case Summary standard

Case Summary is the primary dynamic tool for active case work.

A Case Summary should include:

- current status
- last confirmed update
- waiting for
- lead organisation or contact
- next action
- relevant OS Evidence, minimum necessary only
- current context affecting action or recovery
- outstanding decisions
- confidence level

Case Summary should be generated on demand or from an Update Packet. It should not become a duplicate evidence archive.

### Context Packet standard

For case-management work, use this compact structure:

| Metric | Status |
|---|---|
| Recovery State | Current evidence, or unknown if no current update exists |
| Active Cases | Dynamic list only |
| Outstanding Decisions | Only decisions currently identified from available information |

| Case | Status | Last confirmed update | Waiting for | Lead | Next action | Confidence |
|---|---|---|---|---|---|---|

Status vocabulary should use:

- Waiting
- Action required
- In progress
- Monitoring
- Closed
- Historical evidence

Confidence should reflect certainty, not importance.

## Automation independence upgrade path

### Purpose

Increase practical independence without pretending that GitHub Pages can perform private background monitoring by itself.

The preferred upgrade direction is to make Mellow Navigator better at preparing, packaging, exporting, and handing off state to ChatGPT or connected tools, while keeping Menglu as approver rather than manager.

### Priority upgrades

1. **One-button Update Packet**
   - Add a page or action that gathers the current visible state from local storage: current mode, latest PA object, active cases, waiting items, recovery state, and prepared drafts.
   - Output one copyable packet titled `Update` for pasting into ChatGPT.
   - This reduces the need to explain context manually.

2. **Recovery Guard integration**
   - Link `pa/current-mode.html` and `pa/eos.html` so choosing Recovery Mode or Shutdown automatically updates the shared `uos_state` recovery fields.
   - Keep recovery as a state modifier, not a separate module.

3. **Active Case Queue view**
   - Add a simplified view showing only items that require attention: Housing, UC/LCWRA/Appointee, Social Care, Healthcare, Finance.
   - Hide passive background monitors unless they create risk, deadline, or required reply.

4. **Prepared Prompt Export**
   - Add buttons that generate safe prompts for ChatGPT, such as:
     - `Update: process this against Menglu OS.`
     - `Check Gmail for active cases only.`
     - `Prepare appointment shield from current state.`
     - `Review housing update for recurrence or failed repair.`
   - This creates automation independence through lower-friction triggering.

5. **Local backup and restore**
   - Add export/import of non-sensitive local state as JSON.
   - Warn not to export confidential correspondence, identifiers, bank details, or private evidence into public GitHub files.

6. **PWA resilience**
   - Add an offline service worker for static pages and assets.
   - Keep all private state local to the device unless the user explicitly copies or exports it.

7. **Shortcut alignment**
   - Keep iPhone Shortcuts as access buttons pointing into existing pages and scripts.
   - Do not create duplicate wording in shortcuts when the wording already exists in Mellow, PA, EOS, or Profile Passport.

### Non-goals

- Do not store live case evidence, medical records, identifiers, bank information, or confidential emails in this public repository.
- Do not make Mellow Navigator claim it is monitoring Gmail, Calendar, Clixifix, banking, or DWP in the background.
- Do not create another dashboard if EOS can be improved.
- Do not create another operating framework if an existing Menglu OS component can absorb the need.

### Practical effect

The upgraded system should let Menglu press one button, copy one prepared packet, and ask ChatGPT to process it. ChatGPT or connected tools then perform the private checking, drafting, and review when explicitly triggered.

This maximises automation independence within current safety limits.

## Not completed yet

These areas can be expanded later:

- more detailed appointment preparation templates
- more detailed benefits review templates
- safer complaint templates
- private evidence storage design outside GitHub
- future Agent Mode setup pack
- future Tasks or Automations setup pack
- version history and changelog
- one-button Update Packet
- recovery state sync between Current Mode and EOS
- active case queue view
- prepared prompt export buttons
- local backup and restore
- offline service worker for static pages

## Current limitation

GitHub stores the system design only.

It does not run Gmail, Calendar, Drive, or background checks by itself.

Live checking needs ChatGPT connectors and user permission.

Scheduled background running needs Tasks or Automations when available.

## Next use pattern

Open a new chat and type:

`用 Menglu OS`

Then use the new chat as the daily operating console.

Keep this repository as the non-sensitive blueprint.