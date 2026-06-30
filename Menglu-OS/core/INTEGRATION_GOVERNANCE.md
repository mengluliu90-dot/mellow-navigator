# Integration Governance

## Purpose

This file defines how Menglu OS should evolve without creating duplicate prompts, workflows, automations, chats, dashboards, or documents.

Menglu OS should remain one coherent operating system. New ideas should be treated as extensions of Menglu OS / Mellow Navigator unless there is a clear technical reason to keep them separate.

## Default rule

Before creating any new framework, prompt, workflow, automation, operating module, dashboard, or GitHub document:

1. Review existing Menglu OS context and documentation.
2. Identify what is genuinely new.
3. Check for duplication or overlap.
4. Prefer integrating new capability into an existing component.
5. Create a separate module only when there is a clear technical or operational reason.

## Conversation extension rule

A new chat, prompt, draft, or external AI instruction should not be treated as a separate project by default.

It should first be treated as an extension of the existing Menglu OS architecture.

Before accepting a proposed system, the assistant should ask internally:

- Is this already covered by PA, Mellow, Mira, an existing automation, or existing GitHub documentation?
- Is the proposal a new capability or only a new description of an existing capability?
- Can it be merged into the Executive Function Engine, Communication Engine, Memory & Evidence Engine, Decision Engine, Verification Engine, Output Engine, or existing automations?
- Does it reduce cognitive load, or does it create another thing to maintain?

The default answer should be integration, not expansion.

## Component placement rule

For every significant idea, place it into the most appropriate existing component:

| Capability type | Preferred Menglu OS component |
|---|---|
| Intake, object creation, task routing, capacity, daily workload | Executive Function Engine |
| AAC, speech, appointment scripts, profile passport, reasonable-adjustment wording | Communication Engine / Mellow |
| Timeline, evidence scoring, case history, waiting items, reusable records | Memory & Evidence Engine / Mira |
| One safest action, binary review, prioritisation, escalation threshold | Decision Engine |
| Fact checking, contradiction detection, uncertainty labelling, source checking | Verification Engine |
| Drafts, summaries, Easy Read, Chinese family summaries, professional wording | Output Engine |
| Repeated monitoring, Gmail/calendar checks, reminders, background reviews | Existing automations where possible |
| Stable reusable rules or architecture | Existing GitHub documentation |

Do not create a new engine or standalone prompt if the capability fits one of these components.

## Required change review

For every significant proposed change, provide:

### 1. What is new

State only the genuinely new capability or rule.

### 2. Where it belongs

Assign it to the most appropriate Menglu OS component, such as:

- Executive Function Engine
- Communication Engine
- Memory & Evidence Engine
- Decision Engine
- Verification Engine
- Output Engine
- Existing automation
- Existing GitHub document

### 3. Why

Explain why it belongs there instead of becoming a separate prompt, chat, or workflow.

### 4. Conflicts

Identify duplication, overlap, contradiction, or unnecessary complexity.

### 5. Recommendation

Choose one:

- Integrate into Menglu OS
- Replace an older workflow
- Merge with an existing workflow
- Keep as a separate module

Use "keep as a separate module" only when there is a clear technical reason.

## Verification requirements

Before giving conclusions:

- Distinguish confirmed facts, unconfirmed information, assumptions, and missing information.
- Do not invent facts.
- Mark uncertainty clearly.
- Ask only the minimum necessary clarification questions.
- Prefer official or primary sources when factual verification is needed.
- Reuse existing verified information instead of recreating it.

## Automation consolidation rule

When a repeated task is identified:

1. Check whether an existing automation already covers the same need.
2. Prefer improving the existing automation.
3. Avoid duplicate reminders, duplicate monitoring, and duplicate reports.
4. Design automations to run quietly and notify only when action is required.
5. Consolidate repeated reports into the smallest useful dashboard or notification.

Do not create another automation when an existing one can be safely improved.

## GitHub documentation rule

If a conversation produces a permanent Menglu OS improvement:

- Update existing documentation where possible.
- Create a new document only when the concept does not fit existing files.
- Record only stable, reusable, non-sensitive system improvements.
- Do not store private evidence, live case details, identifiers, bank details, or confidential communications.

GitHub should document reusable operating rules, not live personal records.

## Specialist input processor rule

A specialist input processor may remain separate from Menglu OS when the work requires a distinct technical pipeline that should not become a general OS behaviour.

Examples include:

- audio or video transcription
- bilingual translation
- speaker identification
- timestamped transcript production
- source-specific evidence extraction from recordings or files

In these cases, Menglu OS should not absorb the full processing workflow. Instead:

1. Keep the specialist workflow separate.
2. Require the workflow to preserve uncertainty and avoid unsupported assumptions.
3. Allow verified outputs to enter the Memory & Evidence Engine, Communication Engine, or Output Engine as appropriate.
4. Store only stable reusable rules in GitHub, not private transcripts, case evidence, or raw confidential content.

This prevents Menglu OS from becoming overloaded with narrow technical procedures while still allowing useful verified outputs to support advocacy, communication, and evidence work.

## State modifier integration rule

A repeated health, capacity, sensory, recovery, or environmental pattern should usually be integrated as a state modifier rather than a new operating system, prompt, or standalone workflow.

State modifiers change what is realistic, safe, timely, or recoverable across existing Menglu OS components.

Examples include:

- menstrual or premenstrual phase
- post-exertional malaise
- POTS or orthostatic flare
- sensory overload or shutdown risk
- illness, allergy, pain, or sleep-related capacity reduction
- recent appointment, travel, administrative demand, or emotional stressor

State modifiers may affect:

- Executive Function Engine workload estimates
- Decision Engine action thresholds
- Communication Engine wording
- Memory & Evidence Engine evidence classification
- Output Engine reports and letters
- existing automations or dashboards

Do not create a new module for a state modifier unless there is a clear technical reason, such as a separate data-processing pipeline.

When recording a state modifier, preserve uncertainty. Describe the functional pattern and its practical effect. Do not convert it into an unsupported diagnosis or cause.

## Final check for substantial tasks

Before finishing a substantial task, verify:

- Is this already covered elsewhere?
- Can this be merged into Menglu OS?
- Can an existing automation be improved instead of creating a new one?
- Can cognitive load be reduced?
- Are important claims supported, verifiable, labelled, or marked uncertain?

## Operating principle

The default goal is one coherent Menglu OS with the fewest practical prompts, chats, automations, dashboards, and documents, while preserving safety, accuracy, accessibility, and evidence quality.