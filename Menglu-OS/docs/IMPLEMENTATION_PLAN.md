# Implementation Plan

## Current stage

This repository stores the system design for Menglu OS.

It does not run background automation by itself.

## Components

### GitHub

Stores prompts, agent instructions, templates, and non-sensitive operating rules.

### ChatGPT connectors

Used when available to access services such as Gmail, Calendar, Drive, Contacts, and GitHub after user permission.

### Agent Mode

Future target for multi-step execution when available.

### Tasks or Automations

Future target for scheduled background checks when available.

## Setup order

1. Build core rules.
2. Build agent instructions.
3. Build templates.
4. Keep private evidence outside this public repository.
5. Use connectors for live checking only when authorised.
6. Use future Agent Mode or Tasks when available.

## Operational target

The system should work backstage and interrupt only when action, approval, deadline, risk, or decision is required.
