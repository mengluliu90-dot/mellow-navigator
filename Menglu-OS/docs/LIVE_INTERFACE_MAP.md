# Live Interface Map

## Purpose

This note records how the live pages fit together as one Menglu OS system.

## Interface roles

- PA: structured intake, object creation, task routing, draft generation, and case updates.
- Mellow: communication interface for AAC, profile speaking, quick scripts, and latest PA object wording.
- Mira: evidence and timeline viewer for PA objects, waiting items, draft layers, and case history.
- Profile Passport: reusable one-button summary for conditions, access needs, and reasonable adjustments.
- EOS Dashboard: daily capacity, recovery, case review, evidence watch, and one-action workload view.

## Entry points

- `/pa/start.html` — integrated start page.
- `/pa/` — PA intake and structured object processing.
- `/` — Mellow communication interface.
- `/mira-next/` — Mira evidence viewer.
- `/pa/profile.html` — profile passport.
- `/pa/eos.html` — EOS dashboard.

## Integration rule

These pages are not separate operating systems. They are separate views of the same Menglu OS architecture.

Future work should improve these existing pages and shared data keys before creating new dashboards, prompts, or modules.
