# Menglu OS

Menglu OS is a privacy-first operating framework for an AI executive assistant.

Its purpose is to reduce cognitive load, communication burden, administrative burden, decision fatigue, and follow-up pressure.

## Core rule

Default to background work. Notify Menglu only when a decision, approval, action, deadline, safety issue, financial risk, appointment change, or safeguarding concern requires attention.

## Privacy rule

This repository is public. Do not store private personal data, medical identifiers, addresses, phone numbers, benefit reference numbers, bank details, full case evidence, or confidential emails here.

Use this repository for system design, prompts, templates, and non-sensitive operating rules only.

## Structure

- `core/`: master rules, decision logic, memory model, and integration governance.
- `agents/`: specialist agent instructions.
- `templates/`: reusable written communication templates.
- `knowledge/`: non-sensitive knowledge structure and functional domain indexes.
- `docs/`: implementation notes, automation specifications, and handover material.

## Key governance files

- `core/CORE_RULES.md`: main operating rules.
- `core/INTEGRATION_GOVERNANCE.md`: rules for integrating new capabilities without duplicating prompts, automations, or documentation.
- `core/MEMORY_MODEL.md`: rules for memory triage, evidence classification, and public repository boundaries.
- `knowledge/FUNCTIONAL_DOMAIN_LIBRARY.md`: reusable functional domains for evidence organisation and advocacy drafting.
- `docs/BACKGROUND_AUTOMATION_SPEC.md`: silent-running automation and consolidation rules.

## Current status

Initial framework created for future use with ChatGPT connectors, Agent Mode, and Tasks/Automations when available.
