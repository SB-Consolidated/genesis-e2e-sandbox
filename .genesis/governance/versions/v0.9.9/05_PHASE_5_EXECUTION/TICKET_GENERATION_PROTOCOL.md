# Ticket Generation Protocol

**Version:** 1.2  
**Status:** Active

## Purpose

This protocol defines how Coordinator creates execution tickets from approved specifications or directives.

## Canonical Output

- New tickets are created directly in `Genesis Execution/tickets/01_DRAFT/`.
- Ticket filenames use `TICKET-NNN.md`.
- Coordinator refreshes `DEPENDENCY-MATRIX.json` after ticket drafting.

## Rules

- `00_BACKLOG` is obsolete.
- Generated tickets must already conform to `TICKET_TEMPLATE.md`.
- Drafted tickets must be submitted to Intent Overseer for validation before authorization.
- Ticket generation status tracking may exist, but it does not create alternative lifecycle states.
- Founder-review refinements must be generated from an approved revision spec, not directly from chat, comments, or browser notes.
- Revision-generated tickets must include explicit traceability to the source revision spec.
