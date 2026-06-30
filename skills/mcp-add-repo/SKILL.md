---
name: mcp-add-repo
description: Use when the user wants MCP servers, MCP tools, or MCP config mentioned in the current context added to an agent's repository-local config.
---

# MCP Add Repo

Persist MCP servers from the current context into the target agent's repository-local configuration. Use repo-local config first so the MCP setup stays scoped to the project and does not pollute the user's global config.

## Workflow

1. Identify the target repository.
   Completion criterion: the repository root is known from the current working directory, `git rev-parse --show-toplevel`, or an explicit user path.

2. Identify the target agent.
   Completion criterion: the target agent is known from the user's wording, active runtime, existing repo-local config files, or explicit CLI/config snippets in context. Do not default to Codex unless there is a Codex signal. If several agents are plausible, ask which one to configure.

3. Choose the repo-local config target.
   Completion criterion: the target file follows the agent's native repo-local MCP format. Use the target map below when it applies. If the user explicitly asks for global or user config, stop and confirm the scope change before editing.

4. Extract MCP candidates from context.
   Completion criterion: every MCP server named by the user, visible config snippet, CLI command, or current tool context has been classified as one of:
   - complete `stdio` server config with `command` and optional `args`, `env`, `env_vars`, or `cwd`;
   - complete HTTP server config with `url` and optional auth or header fields;
   - incomplete server config that needs a user-provided `command`, `url`, package name, or auth environment variable;
   - plugin-provided MCP server, which should be controlled through that agent's plugin config instead of copying a launch command into a generic MCP table.

5. Preserve credentials.
   Completion criterion: no secret value, bearer token, API key, cookie, password, or private credential from the context is written directly into a Git-tracked repo config. Prefer the target agent's environment-variable reference mechanism, such as `env_vars`, `bearer_token_env_var`, `env_http_headers`, `env`, or `${NAME}` placeholders. If the user asks to put a credential value in `.codex/config.toml`, first make or verify that file is ignored by Git, then it may be written as local-private config.

6. Set the Git tracking policy.
   Completion criterion: if the repository uses Git, use `git check-ignore -v -- <path>` to check the target config path. When `.codex/config.toml` contains or will contain a direct credential value, ensure the repository `.gitignore` ignores that exact file before writing the credential, adding `.codex/config.toml` when needed. Do not add `!.codex/config.toml` or any other negation that would make a credential-bearing config trackable. Credential-free configs that only reference environment variables may remain trackable.

7. Merge structurally.
   Completion criterion: existing repo config content is preserved; each new server is written under the target agent's MCP container; existing server IDs are updated only for MCP-related fields needed by the request. Do not rewrite unrelated config.

8. Handle missing data before writing.
   Completion criterion: if a server cannot be represented without inventing a command, URL, or credential variable, ask the user for the missing value instead of guessing. If only an optional field is missing, omit it.

9. Validate the config.
   Completion criterion: the edited config parses with the correct parser for its format, no duplicate server entry exists, `git check-ignore -v -- .codex/config.toml` reports the file when it contains a direct credential value, and the diff shows only the intended repo-local config change plus any required `.gitignore` protection or explicitly requested supporting files.

10. Report activation requirements.
   Completion criterion: tell the user which agent and repo-local file were changed, whether `.gitignore` protection was added for `.codex/config.toml`, mention any trust/approval gate, required environment variables, login command, restart, or reload step, and state which MCP servers were added or updated.

## Target Map

Use this map when the target agent is clear:

| Agent       | Repo-local MCP config                               | Merge container               | Validation  |
| ----------- | --------------------------------------------------- | ----------------------------- | ----------- |
| Codex       | `.codex/config.toml`                                | `[mcp_servers.<server_id>]`   | TOML parser |
| Claude Code | `.mcp.json` at repo root for project-scoped servers | top-level `mcpServers` object | JSON parser |

If another agent is named, inspect its local docs, existing config, or CLI help first. Completion criterion: the selected target file and schema come from that agent's native config surface, not from Codex or Claude assumptions.

## Config Patterns

### Codex

Use Codex TOML when the target agent is Codex. Use `stdio` when the MCP server starts as a local process:

```toml
[mcp_servers.context7]
command = "npx"
args = ["-y", "@upstash/context7-mcp"]
env_vars = ["LOCAL_TOKEN"]
```

Use Codex HTTP config when the MCP server is reached by URL:

```toml
[mcp_servers.figma]
url = "https://mcp.figma.com/mcp"
bearer_token_env_var = "FIGMA_OAUTH_TOKEN"
```

Use per-tool policy only when the user asks for tool restrictions or the context already provides them:

```toml
[mcp_servers.browser]
url = "http://localhost:3000/mcp"
enabled_tools = ["open", "screenshot"]
default_tools_approval_mode = "prompt"
```

### Claude Code

Use Claude Code project scope when the target agent is Claude Code and the server should be shared with the repo:

```json
{
  "mcpServers": {
    "context7": {
      "type": "stdio",
      "command": "npx",
      "args": ["-y", "@upstash/context7-mcp"],
      "env": {
        "LOCAL_TOKEN": "${LOCAL_TOKEN}"
      }
    }
  }
}
```

Use HTTP entries for remote MCP servers:

```json
{
  "mcpServers": {
    "stripe": {
      "type": "http",
      "url": "https://mcp.stripe.com"
    }
  }
}
```

## Stop Conditions

Stop and ask the user instead of editing when:

- the repository root is ambiguous;
- the target agent is ambiguous;
- the user wants a server from context but no command, URL, or package identity is available;
- the config requires a secret value and no environment-variable name is known;
- the existing config uses a structure that cannot be safely edited without a parser or clear local pattern;
- the target agent has no repo-local MCP config surface that you can verify.
