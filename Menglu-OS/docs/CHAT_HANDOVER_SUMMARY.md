# Chat Handover Summary

## Why this summary exists

This file preserves the useful outcome of the setup chat before daily use moves to a new chat.

The previous chat contained setup discussion, screenshots, tool checks, and GitHub creation steps. This summary keeps only the useful operational decisions.

## Final decision

Menglu OS should be used as a single integrated support framework, not as many separate prompts.

## Core principle

The assistant should work quietly in the background where possible.

Menglu should only be interrupted when attention is genuinely needed.

## Notification threshold

Notify only for:

- decisions
- approvals
- actions
- replies
- deadlines
- appointment changes
- financial or account risk
- health-related action needs
- housing or repair action needs
- official messages needing review

Do not notify for:

- routine sorting
- filing
- duplicate information
- obvious marketing handling
- routine preparation
- no-change updates

## Tool findings

### Available

- GitHub connector
- Gmail connector when authorised
- Google Calendar connector when authorised
- Google Drive connector when authorised
- Google Contacts connector when authorised

### Not currently available in the checked account view

- Tasks
- Automations
- Agent Mode

This may change later if OpenAI enables those features.

## GitHub boundary

The repository is public.

Only non-sensitive system instructions, templates, and documentation should be stored here.

Private records and live case evidence must remain outside this public repository.

## Daily use instruction

In a new chat, start with:

`用 Menglu OS`

That means the assistant should apply the GitHub blueprint, saved preferences, and the background-first notification rules.
