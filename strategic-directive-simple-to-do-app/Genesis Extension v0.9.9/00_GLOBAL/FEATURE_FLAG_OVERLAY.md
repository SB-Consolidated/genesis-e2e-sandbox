# Feature Flag Overlay

**Version:** v0.9.9  
**Status:** Optional Overlay  
**Default:** Off

Feature flags are not the Genesis default. They are allowed only when an approved revision spec authorizes an incremental trunk slice.

## Required Fields

- Flag name
- Owner
- Expiry date
- Default state: off
- Removal ticket ID in the same revision spec

## Rules

- Deploying bits and releasing a feature remain separate events.
- A fully rolled-out flag must be removed by a follow-up ticket.
- Flags cannot hide missing tests, failed SAST, or absent completion contracts.
