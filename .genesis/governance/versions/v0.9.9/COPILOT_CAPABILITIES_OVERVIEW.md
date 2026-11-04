# GitHub Copilot & VS Code Agents: Capabilities Overview And Enterprise Roadmap

**Last Updated:** August 3, 2026 | **VS Code Horizon:** 1.131+

---

## Executive Summary

VS Code's GitHub Copilot ecosystem has evolved significantly with new capabilities that directly enhance multi-agent governance systems. Three major features are particularly relevant to Genesis v0.9.7:

1. **Agent Skills (Experimental)** - Domain-specific capabilities that load on-demand
2. **Enhanced Agent Sessions Management** - Production-ready agent coordination infrastructure
3. **MCP Server Integration & MCP Prompts** - Standardized tool ecosystems for agent orchestration

For Genesis, these capabilities matter because the extension must support not only initial product creation but also controlled enterprise software maintenance as requirements, teams, compliance obligations, and scale evolve over time.

---

## 1. AGENT SKILLS (NEW - EXPERIMENTAL)

### Overview
Agent Skills are folders of instructions, scripts, and resources that Copilot can load dynamically when relevant to perform specialized tasks. This is an **open standard** (agentskills.io) that works across multiple AI agents.

### Key Differentiators vs Custom Instructions

| Aspect | Agent Skills | Custom Instructions |
|--------|--------------|-------------------|
| **Purpose** | Teach specialized capabilities & workflows | Define coding standards & guidelines |
| **Content Types** | Instructions + scripts + examples + resources | Instructions only (Markdown) |
| **Loading Model** | Progressive disclosure (on-demand) | Always applied (or via glob patterns) |
| **Portability** | Works across VS Code, CLI, coding agent | VS Code & GitHub.com only |
| **Standard** | Open standard (agentskills.io) | VS Code-specific |

### How Agent Skills Work: Three-Level Loading System

**Level 1: Discovery** (Always)
- Copilot knows all available skills via `name` and `description` from YAML frontmatter
- Lightweight metadata helps Copilot decide relevance

**Level 2: Instructions** (On-demand)
- When request matches skill description, `SKILL.md` body loads into context
- Detailed instructions become available

**Level 3: Resources** (On-demand)
- Scripts, examples, documentation accessed only as needed
- Keeps context efficient

### Directory Structure
```
.github/skills/
├── skill-name-1/
│   ├── SKILL.md           (required - metadata + instructions)
│   ├── script.js          (optional - referenced resources)
│   ├── test-template.js   (optional)
│   └── examples/          (optional)
└── skill-name-2/
    └── SKILL.md
```

Alternative locations:
- Personal skills: `~/.copilot/skills/` (recommended) or `~/.claude/skills/` (legacy)
- Project skills: `.github/skills/` (recommended) or `.claude/skills/` (legacy)

### SKILL.md Format
```yaml
---
name: skill-identifier          # lowercase, hyphens for spaces, max 64 chars
description: What the skill does and when to use it  # max 1024 chars
---

# Skill Instructions

Clear, specific instructions describing:
- What the skill accomplishes
- When to use it
- Step-by-step procedures
- Examples with input/output
- References to included scripts/resources

You can reference files: [script](./script.js)
```

### Genesis v0.9.7 Application
Create Agent Skills for specialized governance tasks:
- **Ticket Validation Skill** - Multi-step ticket verification workflow
- **Authority Gate Skill** - Authorization decision procedures for escalations
- **Governance Amendment Skill** - Constitutional amendment processing workflow
- **Audit Trail Skill** - Governance action documentation and compliance tracking

**Benefit:** Reusable, portable capabilities that work across Copilot CLI, coding agent, and VS Code simultaneously.

---

## 2. ENHANCED AGENT SESSIONS MANAGEMENT

### New Capabilities (v1.108)

#### Agent Sessions View Improvements
- **Keyboard access** for actions: archive, read state, open session
- **Session grouping** by state and age (side-by-side display)
- **Changed files tracking** - shows which files were modified in each session
- **Associated PRs** - displays linked pull requests per session
- **Batch operations** - archive multiple sessions at once
- **Accessibility improvements** - enhanced screen reader support

#### Chat Session Picker Enhancement
- Quick Pick now based on Agent Sessions view (same underlying data)
- Quick access to any previous chat session
- Perform actions: archive, rename, delete sessions
- **Access via:** `Ctrl+P` then type `agent ` (space required)

#### Session State Persistence
- **New default:** Empty Chat view on VS Code restart (no auto-restore)
- **Control via:** `chat.restoreLastPanelSession` setting
- Sessions accessible from Agent Sessions control

### Genesis v0.9.7 Application
- **Session-based Ticket Tracking:** Baseline session-aware chat opening is now implemented in the extension runtime
- **Audit Trail:** Sessions naturally create audit records of decisions/actions
- **Workflow Snapshots:** Changed files per session directly map to PR deliverables
- **Coordination History:** Multi-agent sessions show interaction patterns

---

## 3. AGENT SKILLS: VS CAPABILITIES

### New Feature: Model Context Protocol (MCP)
MCP is an open standard allowing AI models to use external tools through a unified interface.

#### Three Types of Tools in VS Code

1. **Built-in Tools** - Native to VS Code (search, fetch, git, terminal, etc.)
2. **Extension Tools** - Contributed by VS Code extensions
3. **MCP Tools** - From Model Context Protocol servers (NEW focus)

#### MCP Server Registry
- [GitHub MCP Server Registry](https://github.com/mcp) - Official registry
- [Official MCP Repository](https://github.com/modelcontextprotocol/servers) - Community servers
- Marketplace extensions can also contribute MCP servers

#### MCP Capabilities in VS Code

**MCP Tools**
- Auto-invoked based on prompts (when using agents)
- Explicitly referenced via `#<tool-name>`
- Tool picker for selective enabling (max 128 tools per request)
- Virtual tools support for organizing large tool sets

**MCP Resources** (NEW)
- Direct file/database/API access as context
- Resource types provided by MCP servers
- Access via "Add Context > MCP Resources"
- Save resources to workspace or drag-and-drop

**MCP Prompts** (NEW)
- Preconfigured prompts from MCP servers
- Invoked via `/mcp.servername.promptname` syntax
- Supports optional input parameters
- Creates reusable task templates

#### Installing MCP Servers

**From GitHub Registry:**
1. Enable `chat.mcp.gallery.enabled` setting
2. Open Extensions (`Ctrl+Shift+X`)
3. Search `@mcp` or run "MCP: Browse Servers"
4. Install to user profile or workspace

**Other Methods:**
- Add to workspace `mcp.json` file
- Add to user configuration
- Add to dev container
- Automatic discovery
- Command-line installation

#### MCP Configuration Format

```json
{
  "servers": {
    "serverName": {
      "type": "stdio|http|sse",
      "command": "npx|python|docker",
      "args": ["arg1", "arg2"],
      "env": {"VAR": "value"},
      "envFile": "${workspaceFolder}/.env"
    }
  },
  "inputs": [
    {
      "type": "promptString",
      "id": "api-key",
      "description": "API Key",
      "password": true
    }
  ]
}
```

#### MCP Development Mode (for Custom Servers)
```json
{
  "dev": {
    "watch": "src/**/*.ts",
    "debug": true
  }
}
```

### Genesis v0.9.7 Application

Current implementation baseline:
- Read-only governed artifact inspection is implemented through the extension LM tool surface and the workspace MCP baseline.
- Workspace readiness reporting now identifies target-repo workflow and binding gaps before governed execution.
- Audit bundle export now provides a local compliance/export baseline.

Potential next-stage custom MCP services for governance operations:

1. **Governance Registry MCP Server**
   - Tool: Query governance documents by version/type
   - Resource: Access governance files as context
   - Prompt: Automated governance status checks

2. **Ticket Lifecycle MCP Server**
   - Tools: Move ticket state, validate prerequisites, record decisions
   - Resources: Provide ticket templates and decision trees
   - Prompts: Standard ticket verification sequences

3. **Authority Matrix MCP Server**
   - Tools: Check authorization for actions, log decisions
   - Resources: Authority definitions and escalation paths
   - Prompts: Authorization verification workflows

4. **Audit Trail MCP Server**
   - Tools: Record governance actions, generate compliance reports
   - Resources: Provide audit templates and compliance checklists
   - Prompts: Regulatory review procedures

**Benefit:** Standardized, reusable tools across all agents + CLI + external services

---

## 4. TERMINAL TOOL IMPROVEMENTS

### Terminal Auto-Approve Enhanced

**New Default Safe Commands:**
- `git ls-files`
- `git --no-pager <safe_subcommand>`
- `git -C <dir> <safe_subcommand>`
- `rg` (excluding `--pre` and `--hostname-bin`)
- `sed` (excluding problematic args)
- `Out-String`

**NPM Scripts Auto-Approve** (NEW)
- npm/pnpm/yarn scripts from package.json now auto-approved by default
- Works because agents require Workspace Trust + scripts can't modify package.json
- Control via `chat.tools.terminal.autoApproveWorkspaceNpmScripts` setting

**Shell History Prevention** (NEW)
- Terminal commands no longer pollute shell history (when shell integration enabled)
- Use `HISTCONTROL=ignorespace` for bash/zsh
- Configurable via `chat.tools.terminal.preventShellHistory` setting

**Session/Workspace Rules** (NEW)
- Allow dropdown now has options to allow commands for:
  - Current session (temporary)
  - Current workspace (persistent)
- More transparent auto-approval with denial feedback

### Genesis v0.9.7 Application
- Execution Agent can safely run governance compliance checks
- Terminal operations are audited and logged
- Workspace-level rules ensure consistency across agent invocations

---

## 5. CUSTOM INSTRUCTIONS: ENHANCED FLEXIBILITY

### Multiple Instruction File Types

**Option 1: `.github/copilot-instructions.md`**
- Single file, applies to all requests
- Workspace-stored and version-controlled
- Visible to GitHub.com Copilot too

**Option 2: `*.instructions.md` files**
- Multiple files, selective application
- Glob patterns via `applyTo` property
- Store in workspace (`.github/instructions/`) or user profile

**Option 3: `AGENTS.md` files**
- Multi-agent instructions
- Root-level or nested (experimental: `chat.useNestedAgentsMdFiles`)
- Useful for folder-specific instructions

**Option 4: Specialized Settings** (deprecated but available)
- Code review: `github.copilot.chat.reviewSelection.instructions`
- Commit messages: `github.copilot.chat.commitMessageGeneration.instructions`
- PR descriptions: `github.copilot.chat.pullRequestDescriptionGeneration.instructions`

### YAML Frontmatter for `.instructions.md`
```yaml
---
description: Short description
name: Display name (optional)
applyTo: "**/*.js"  # Glob pattern (optional, conditional application)
---

# Instructions Body

Your instructions here.
```

### Generate Instructions from Workspace
- Chat view > Configure Chat > "Generate Chat Instructions"
- VS Code analyzes workspace and auto-generates matching instructions file
- Edit and customize as needed

### Sync Across Devices
- Enable Settings Sync
- Run "Settings Sync: Configure"
- Include "Prompts and Instructions"

### Genesis v0.9.7 Application
- Each agent role has dedicated `.instructions.md` file
- Governance rules are stored as instructions, version-controlled
- Different instruction sets for different ticket types (via `applyTo` patterns)

---

## 6. CHAT & AGENT SESSION IMPROVEMENTS

### Chat UI Enhancements

**Chat Picker Based on Sessions**
- Access previous sessions from Quick Open
- Type `agent ` in Quick Open (`Ctrl+P`) to filter agent sessions
- Perform actions: archive, rename, delete

**Chat Title Control**
- Chat view title always shows (regardless of Activity Bar config)
- Select title to open sessions picker and switch sessions

**Streaming in Accessible View**
- Chat responses now stream in real-time in Accessible View
- No need to close/reopen to see updates
- Screen reader compatible

**MCP Server Output in Accessible View**
- Excluded by default to reduce noise
- Standard chat output remains fully accessible

### New Terminal Tool Rules
- Improved git/npm completions
- Terminal commands auto-excluded from shell history
- Session/workspace-level approval rules
- Transparency on auto-approval denials

---

## 7. EXTENSION AUTHORING: NEW CAPABILITIES

### Quick Pick API Enhancements

**Prompt Property**
```typescript
const quickPick = vscode.window.createQuickPick();
quickPick.prompt = 'Select a file to open';
```
- Displays persistent instructional text below input
- Remains visible while typing

**ResourceUri Property**
```typescript
const items: vscode.QuickPickItem[] = [
  {
    label: '',
    resourceUri: vscode.Uri.file('/path/to/app.ts'),
    iconPath: vscode.ThemeIcon.File
  }
];
```
- Auto-derives label from filename
- Auto-derives description from filepath
- Auto-derives icon from file theme
- Useful for file/folder selection interfaces

### TypeScript Extension Authoring (Experimental)
- Author VS Code extensions directly in TypeScript
- No build step required
- Still early stages - untested areas (publishing, testing workflows)

---

## 8. GOVERNANCE EXECUTION FRAMEWORK: UPDATES

### Git Blame Information
- **New Setting:** `git.blame.ignoreWhitespace` - ignore whitespace in blame analysis
- **New Setting:** `git.blame.editorDecoration.disableHover` - disable hover tooltips

### Git Worktrees (Experimental)
- Worktrees view in Source Control Repositories
- Inline action to open worktree in new window
- Context menu actions to open in current window or delete
- Enable via `scm.repositories.explorer` and `scm.repositories.selectionMode` settings

---

## 9. RECOMMENDED GENESIS v0.9.7 IMPLEMENTATION ROADMAP

### Phase 1: Immediate
1. **Adopt native session-aware agent operations as the target model.**
   - Prefer agent host capable sessions over brittle custom chat bootstrapping.
   - Support multi-chat and peer-chat exploration for governed parallel analysis.
   - Treat worktrees as the preferred isolation surface for parallel governed execution.

2. **Promote Copilot code review skills and read-only MCP to first-class review integration.**
   - Create `.github/skills` for governance-aware review.
   - Define review-safe MCP configuration and documentation.
   - Use review attribution and PR-context review as a governed evidence surface.

3. **Harden browser review governance.**
   - Adopt browser tools for Phase 6 founder review and deterministic evidence capture.
   - Add allowed/denied domain policy and browser-tool enablement rules.
   - Keep browser review supplemental to headless completion evidence.

4. **Define enterprise Playwright execution standards.**
   - Standardize worker-count policy for local development, CI merge gates, and shared-state serial suites.
   - Prefer deterministic parallel headless execution and CI sharding over ad hoc browser-debug workflows.

### Phase 2: Near-term
1. **Rationalize the extension UX around native agent surfaces.**
   - Reduce reliance on clipboard/paste chat bootstrapping.
   - Add support for session grouping, PR follow-up from chat, and governed review lanes.

2. **Implement governance-aware worktree and session conventions.**
   - Define one-ticket-per-session and one-ticket-per-worktree guidance where appropriate.
   - Persist evidence and decisions to canonical artifacts instead of chat-only state.

3. **Expand MCP and tool policy.**
   - Define read-only review MCP vs. governed write-capable automation boundaries.
   - Document browser, PR, and repository inspection tool usage by role.

4. **Codify enterprise maintenance workflows.**
   - Standardize revision intake, revision specs, and production-change traceability.
   - Ensure release baselines can absorb defects, enhancements, compliance work, and scaling changes without bypassing governance.

5. **Codify enterprise test-scale policy.**
   - Define when Playwright runs in parallel, when suites must remain serial, and how governed CI shards evidence across large suites.
   - Keep E2E as a merge-critical gate while encouraging faster unit and integration layers around it.

### Phase 3: Advanced
1. **Enterprise audit and observability.**
   - Evaluate Copilot session streaming and usage-record exports for governance audit trails.
   - Map SIEM or Purview export paths for founder or enterprise oversight.

2. **Custom governance services.**
   - Build governance-specific MCP services only where native review and session surfaces are insufficient.
   - Keep custom services subordinate to platform-native workflows.

---

## 10. SETTINGS REFERENCE FOR GENESIS v0.9.7

### Agent Skills
- `chat.useAgentSkills` (boolean) - Enable/disable Agent Skills (currently experimental)
- Default: false | **Recommended for Genesis:** true

### Agent Host And Sessions
- `chat.agentHost.enabled` (boolean) - Enable the agent host session architecture
- **Recommended for Genesis:** evaluate and enable where supported for governed multi-session workflows
- `chat.restoreLastPanelSession` (boolean) - Restore last chat session on restart
- **Recommended for Genesis:** false

### Browser Tools
- `workbench.browser.enableChatTools` (boolean) - Enable browser tools for agents
- `chat.agent.networkFilter` (boolean) - Enable network domain filtering for agent/browser access
- `chat.agent.allowedNetworkDomains` (array) - Allowed domains for governed browser workflows
- `chat.agent.deniedNetworkDomains` (array) - Denied domains for governed browser workflows

### MCP Servers
- `chat.mcp.gallery.enabled` (boolean) - Enable MCP server gallery in Extensions view
- `chat.mcp.autostart` (boolean, experimental) - Auto-restart MCP servers on config change
- `github.copilot.chat.virtualTools.threshold` (number) - Threshold for virtual tool grouping (128 max per request)

### Custom Instructions
- `github.copilot.chat.codeGeneration.useInstructionFiles` (boolean) - Use `.github/copilot-instructions.md`
- `chat.instructionsFilesLocations` (array) - Folders for `.instructions.md` files
- `chat.useAgentsMdFile` (boolean) - Use `AGENTS.md` files
- `chat.useNestedAgentsMdFiles` (boolean, experimental) - Support nested `AGENTS.md` in subfolders

### Terminal Tool
- `chat.tools.terminal.enableAutoApprove` (boolean) - Enable auto-approval for safe commands
- `chat.tools.terminal.autoApproveWorkspaceNpmScripts` (boolean) - Auto-approve npm scripts
- `chat.tools.terminal.preventShellHistory` (boolean) - Prevent terminal commands in shell history

### Chat Sessions
- Multi-chat, peer-chat, and grouped sessions are recommended only when tied to explicit tickets or governance tasks.
- Worktrees should be preferred when multiple active sessions need filesystem isolation.

### Source Control
- `scm.repositories.explorer` (boolean, experimental) - Show Repositories view
- `scm.repositories.selectionMode` (string, experimental) - Repository selection mode
- `git.blame.ignoreWhitespace` (boolean) - Ignore whitespace in blame
- `git.blame.editorDecoration.disableHover` (boolean) - Disable blame hover tooltip

---

## 11. SECURITY & GOVERNANCE CONSIDERATIONS

### MCP Server Trust
- MCP servers can run arbitrary code locally
- Trust dialog required first time server starts
- Review publisher and configuration before starting
- Only add servers from trusted sources

### Terminal Tool Auto-Approve Security
- Safe command list is conservative (git, sed, rg operations only)
- npm scripts auto-approved only because Workspace Trust already enabled
- Agents cannot modify sensitive files like `package.json`
- Custom deny rules can override defaults

### Agent Skills Portability
- Skills work across VS Code, CLI, and coding agent
- Ensure skills don't expose sensitive governance logic
- Consider security implications of script inclusion
- Review community skills before adoption

### Custom Instructions Scope
- Instructions file sources tracked (built-in, user, workspace, extension)
- Multiple instructions files can conflict - establish priority rules
- Sensitive credentials should use input variables, not hardcoded

---

## 12. RESOURCES & REFERENCES

### Official Documentation
- [GitHub Copilot Overview](https://code.visualstudio.com/docs/copilot/overview)
- [Agent Skills Documentation](https://code.visualstudio.com/docs/copilot/customization/agent-skills)
- [Custom Instructions Guide](https://code.visualstudio.com/docs/copilot/customization/custom-instructions)
- [MCP Servers in VS Code](https://code.visualstudio.com/docs/copilot/customization/mcp-servers)
- [VS Code 1.131 Release Notes](https://code.visualstudio.com/updates/v1_131)

### Community Resources
- [Awesome Copilot Repository](https://github.com/github/awesome-copilot) - Community skills, agents, instructions
- [Agent Skills Standard](https://agentskills.io/) - Open standard specification
- [Anthropic Skills Reference](https://github.com/anthropics/skills) - Reference skill examples

### Standards & Protocols
- [Model Context Protocol (MCP)](https://modelcontextprotocol.io/) - Open MCP standard
- [MCP Server Repository](https://github.com/modelcontextprotocol/servers) - Official & community servers

---

## 13. NEXT STEPS FOR GENESIS v0.9.7

1. **Raise the extension engine floor to VS Code 1.131+** so agent host, multi-chat, worktree, and browser-tool adoption can proceed on a supported baseline.
2. **Prototype code review skills plus read-only MCP** before building any custom review pipeline.
3. **Define browser domain policy** for governed founder-review flows.
4. **Document session and worktree conventions** for Coordinator, Execution, and review workflows.
5. **Evaluate Copilot session streaming** only if enterprise audit export is an immediate need.

---

**Document Version:** 1.1  
**Next Review:** September 2026  
**Owner:** Genesis v0.9.7 Governance Framework  
**Distribution:** Internal | Genesis Repository
