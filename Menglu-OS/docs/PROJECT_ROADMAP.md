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
