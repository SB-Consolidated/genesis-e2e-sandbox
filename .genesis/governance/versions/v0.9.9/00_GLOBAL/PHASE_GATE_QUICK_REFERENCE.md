# Phase Gate Quick Reference

## Phase Gate Files
- PHASE-1-COMPLETE-[TS].md
- PHASE-2-COMPLETE-[TS].md
- PHASE-3-COMPLETE-[TS].md
- PHASE-4-COMPLETE-[TS].md
- PHASE-5-COMPLETE-[TS].md
- PHASE-6-COMPLETE-[TS].md

Location for all gates:
```
Genesis Execution/handoffs/phase-gates/
```

## Phase Gate Owners & Templates
- **Phase 1 → 2 (Intent Complete):** Strategy → Strategy (self-continue into Phase 2) | HANDOFF_TEMPLATES.md §7
- **Phase 2 → 3 (Spec Complete):** Strategy → Intent Overseer | §8
- **Phase 3 → 4 (Governance Complete):** Intent Overseer → Coordinator | §9
- **Phase 4 → 5 (Environment Ready):** Coordinator → All Agents | §10
- **Phase 5 → 6 (Implementation Complete):** Coordinator → Strategy/Founder | §11
- **Phase 6 → 7 (Founder Approval):** Founder/Strategy → Coordinator | §12

## Checklists by Role

**Strategy Agent:**
- Phase 1 gate created and used to continue into Phase 2
- Phase 2 gate created and delivered to Intent Overseer

**Coordinator Agent:**
- Phase 3 gate received before Phase 4 starts
- Phase 4 gate created before Phase 5 starts
- Phase 5 gate created to request Founder review (Phase 6)

**Intent Overseer:**
- Verify Phase 2 gate exists before any ticket validation
- Create Phase 3 gate after governance review completes

**Execution Lead:**
- Confirm environment readiness and Phase 4 gate exists before execution begins

**Founder/Strategy:**
- Approve Phase 6 gate for production release

## Quick Diagnostics

```bash
# List all gates
ls -lt "Genesis Execution/handoffs/phase-gates/"

# View specific gate
cat "Genesis Execution/handoffs/phase-gates/PHASE-3-COMPLETE-*.md"
```

Expected chronological order:
1. PHASE-1-COMPLETE-[t1].md
2. PHASE-2-COMPLETE-[t2].md
3. PHASE-3-COMPLETE-[t3].md
4. PHASE-4-COMPLETE-[t4].md
5. PHASE-5-COMPLETE-[t5].md
6. PHASE-6-COMPLETE-[t6].md (t6 > t5 > ... > t1)

## Common Issues

**Missing gate file**
- Phase not complete or gate not created → complete phase and generate gate per template

**Phase 3 blocked by Intent Overseer**
- PHASE-2-COMPLETE missing → finish specifications, freeze, create gate §8

**Phase 2 started without Phase 1 gate**
- PHASE-1-COMPLETE missing → stop Phase 2, finish Phase 1, create gate §7

## References
- PHASE_GATE_ENFORCEMENT.md
- HANDOFF_TEMPLATES.md §§7-12
- PHASE_1_RULES.md … PHASE_6_RULES.md
- Agent files: Strategy, Coordinator, Intent Overseer, Execution
