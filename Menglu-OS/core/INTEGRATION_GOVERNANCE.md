# Integration Governance

## Purpose

This file defines how Menglu OS should evolve without creating duplicate prompts, workflows, automations, or documents.

Menglu OS should remain one coherent operating system.

## Default rule

Before creating any new framework, prompt, workflow, automation, or operating module:

1. Review existing Menglu OS context and documentation.
2. Identify what is genuinely new.
3. Check for duplication or overlap.
4. Prefer integrating new capability into an existing component.
5. Create a separate module only when there is a clear technical or operational reason.

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

## GitHub documentation rule

If a conversation produces a permanent Menglu OS improvement:

- Update existing documentation where possible.
- Create a new document only when the concept does not fit existing files.
- Record only stable, reusable, non-sensitive system improvements.
- Do not store private evidence, live case details, identifiers, bank details, or confidential communications.

## Final check for substantial tasks

Before finishing a substantial task, verify:

- Is this already covered elsewhere?
- Can this be merged into Menglu OS?
- Can an existing automation be improved instead of creating a new one?
- Can cognitive load be reduced?
- Are important claims supported, verifiable, labelled, or marked uncertain?

## Operating principle

The default goal is the fewest practical prompts, chats, automations, and documents, while preserving safety, accuracy, accessibility, and evidence quality.
