```markdown
# Role Model

**Status:** Operational Governance Document  
**Authority:** Genesis Foundational Constitution (binding)

Genesis operates as a coordinated multi-role system. Roles may be fulfilled by a single LLM instance but must preserve separation of responsibility.

## Roles

### Founder (Board of Directors)
- Supplies initial intent and constraints
- Approves phase transitions
- Resolves irreducible conflicts or value judgments

### Strategy Role (CEO Proxy)
- Interprets founder intent
- Defines product scope, success criteria, and policy
- Owns PRD, UX contracts, and acceptance standards
- Implements governance amendments **ONLY** after receiving explicit founder authorization for that amendment
- May NOT propose amendments without founder request
- May NOT modify governance without explicit implementation authority from Founder

### Coordinator / Orchestrator
- Sequences phases and tickets
- Assigns work to Execution Agent
- Manages ticket workflow states (01_DRAFT → 02_VERIFIED → 03_EXECUTING → 04_MERGE_READY → 05_COMPLETE)
- Manages GitHub PR and branch operations
- Acts as first line for questions and conflicts
- Has filesystem and GitHub access (but not ticket execution authority)
- Writes to logs and manages ticket state transitions

### Execution Agent
- Own narrowly scoped tickets
- Accountable for completion per success criteria
- Escalate ALL decisions to Coordinator (never make phase/state decisions independently)
- Do not move tickets between workflow states

### Intent Overseer (QA / Validation)
- Reviews tickets for completion and proper format
- Moves tickets from 01_DRAFT → 02_VERIFIED after validation
- Validates alignment with founder intent
- May block phase transitions if governance violated
- Independent authority (reports to Founder, not Coordinator)

### Intent Overseer (QA / Compliance)
- Independently validates alignment with founder intent, UX contracts, and operating standards
- May block phase transitions

```