# VS Code Settings Template For Genesis Governance

**Authority:** Phase 4 Environment Setup  
**Version:** 0.9.7

## Recommended Baseline

```json
{
  "chat.useAgentsMdFile": true,
  "github.copilot.chat.codeGeneration.useInstructionFiles": true,
  "chat.agentHost.enabled": true,
  "chat.restoreLastPanelSession": false,
  "chat.tools.terminal.enableAutoApprove": true,
  "chat.tools.terminal.autoApproveWorkspaceNpmScripts": true,
  "workbench.browser.enableChatTools": true,
  "chat.agent.networkFilter": true,
  "chat.agent.allowedNetworkDomains": [
    "github.com",
    "*.github.com"
  ],
  "chat.agent.deniedNetworkDomains": []
}
```

## Optional Capabilities

- Enable skills when the repository ships governed skills.
- Enable MCP when servers are configured and the intended tools are read-only by default.
- Enable browser tooling when founder review and evidence capture workflows require it.
- Use session-aware chat and worktree features only with explicit governance bindings.
- Use multi-chat and peer-chat only when each chat remains bound to a specific ticket, review lane, or governance task.
- If agent host is not yet supported in the deployed VS Code floor, treat `chat.agentHost.enabled` as the forward target rather than a hard requirement.
