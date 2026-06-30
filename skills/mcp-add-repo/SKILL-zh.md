---
name: mcp-add-repo
description: 当用户想把当前上下文里提到的 MCP server、MCP tool 或 MCP config 添加到 agent 的仓库本地 config 时使用。
---

# MCP Add Repo

把当前上下文中的 MCP server 持久化到目标 agent 的仓库本地配置。优先使用 repo-local config，让 MCP 设置只作用于当前项目，而不是污染用户的全局配置。

## 流程

1. 确认目标仓库。
   完成标准：已经根据当前工作目录、`git rev-parse --show-toplevel` 或用户明确给出的路径确认仓库根目录。

2. 确认目标 agent。
   完成标准：已经根据用户措辞、当前运行环境、已有 repo-local config 文件，或上下文中的 CLI/config 片段确认目标 agent。不要在没有 Codex 信号时默认写 Codex。如果多个 agent 都可能适用，询问用户要配置哪一个。

3. 选择 repo-local config 目标。
   完成标准：目标文件符合该 agent 原生的 repo-local MCP 格式。适用时使用下面的 target map。如果用户明确要求全局或 user config，编辑前先停止并确认 scope 变化。

4. 从上下文提取 MCP 候选项。
   完成标准：用户点名的 MCP server、可见 config 片段、CLI 命令或当前 tool 上下文中的每个 MCP server，都已归类为以下类型之一：
   - 完整的 `stdio` server config，包含 `command`，以及可选的 `args`、`env`、`env_vars` 或 `cwd`；
   - 完整的 HTTP server config，包含 `url`，以及可选的认证或 header 字段；
   - 信息不完整的 server config，还需要用户提供 `command`、`url`、package name 或认证环境变量；
   - plugin 提供的 MCP server，应通过该 agent 的 plugin config 控制，而不是把启动命令复制进通用 MCP table。

5. 保护凭据。
   完成标准：不要把上下文里的 secret value、bearer token、API key、cookie、password 或私有凭据直接写入 repo config。改用目标 agent 的环境变量引用机制，例如 `env_vars`、`bearer_token_env_var`、`env_http_headers`、`env` 或 `${NAME}` 占位符。

6. 结构化合并。
   完成标准：保留已有 repo config 内容；每个新增 server 都写入目标 agent 的 MCP container；已有 server ID 只更新本次请求需要的 MCP 相关字段。不要重写无关 config。

7. 写入前处理缺失信息。
   完成标准：如果缺少 `command`、`url` 或 credential variable 会导致只能猜测配置，先询问用户，不要猜。如果只缺少可选字段，省略该字段。

8. 验证 config。
   完成标准：编辑后的 config 可以用对应格式的 parser 成功解析，没有重复的 server entry；diff 只包含预期的 repo-local config 修改，以及用户明确要求的辅助文件。

9. 汇报启用要求。
   完成标准：告诉用户修改了哪个 agent 和哪个 repo-local 文件；说明 trust/approval gate、需要设置的环境变量、login 命令、restart 或 reload 步骤；列出新增或更新的 MCP server。

## Target Map

目标 agent 明确时，使用这张表：

| Agent | Repo-local MCP config | 合并位置 | 验证方式 |
| --- | --- | --- | --- |
| Codex | `.codex/config.toml` | `[mcp_servers.<server_id>]` | TOML parser |
| Claude Code | 仓库根目录的 `.mcp.json`，用于 project-scoped servers | 顶层 `mcpServers` object | JSON parser |

如果用户点名其他 agent，先检查该 agent 的本地文档、已有 config 或 CLI help。完成标准：所选目标文件和 schema 来自该 agent 原生 config surface，而不是 Codex 或 Claude 假设。

## Config Patterns

### Codex

目标 agent 是 Codex 时，使用 Codex TOML。MCP server 作为本地进程启动时，使用 `stdio`：

```toml
[mcp_servers.context7]
command = "npx"
args = ["-y", "@upstash/context7-mcp"]
env_vars = ["LOCAL_TOKEN"]
```

MCP server 通过 URL 访问时，使用 Codex HTTP config：

```toml
[mcp_servers.figma]
url = "https://mcp.figma.com/mcp"
bearer_token_env_var = "FIGMA_OAUTH_TOKEN"
```

只有当用户要求限制 tool，或上下文已经提供 tool 策略时，才写 per-tool policy：

```toml
[mcp_servers.browser]
url = "http://localhost:3000/mcp"
enabled_tools = ["open", "screenshot"]
default_tools_approval_mode = "prompt"
```

### Claude Code

目标 agent 是 Claude Code，且 server 应随仓库共享时，使用 Claude Code project scope：

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

远程 MCP server 使用 HTTP entry：

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

## 停止条件

遇到以下情况时，停止并询问用户，不要编辑：

- 仓库根目录不明确；
- 目标 agent 不明确；
- 用户想添加上下文里的某个 server，但没有可用的 command、URL 或 package identity；
- config 需要 secret value，但没有已知的环境变量名；
- 现有 config 结构必须依赖 parser 或清晰本地模式才能安全编辑，而当前无法做到；
- 目标 agent 没有可以确认的 repo-local MCP config surface。
