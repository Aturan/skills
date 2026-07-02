---
name: git-commit-and-push
description: 用户要求 commit、commit and push、创建 git commit、提交后 push，或提到「/commit」时使用。默认提交全部未 commit 代码；如果存在当前上下文不知道的变更，先询问是否全部提交、只提交指定文件或不提交；提交前检查验证状态；对选定变更至少创建一次 commit；如果用户未明确要求 push，提交后询问是否 push。
license: MIT
allowed-tools: Bash
---

# Git Commit and Push

为选定的未提交变更创建 Conventional Commit，然后按需 push。默认提交全部未 commit 代码，但不要静默包含当前任务上下文之外的变更。

## Commit 格式

使用 Conventional Commits：

```text
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

类型：

| Type | 用途 |
| --- | --- |
| `feat` | 新功能 |
| `fix` | Bug 修复 |
| `docs` | 仅文档 |
| `style` | 仅格式 |
| `refactor` | 不含功能或修复的重构 |
| `perf` | 性能改进 |
| `test` | 测试 |
| `build` | 构建系统或依赖 |
| `ci` | CI 配置 |
| `chore` | 维护 |
| `revert` | 回滚 |

如果选定 diff 包含 breaking change，在 type 或 scope 后使用 `!`，或添加 `BREAKING CHANGE:` footer。

## 流程

1. 读取仓库状态。
   完成标准：已经知道当前分支、已暂存文件、未暂存文件、未跟踪文件，以及每个变更文件的 diff 摘要。

   ```bash
   git branch --show-current
   git status --porcelain=v1
   git diff --stat
   git diff --staged --stat
   git ls-files --others --exclude-standard
   ```

2. 分类变更文件。
   完成标准：每个变更文件都已标记为 known、unknown 或 blocked。

   - Known：文件由你在当前任务中修改，用户明确提到过，或明显是当前任务的生成产物。
   - Unknown：文件不是你在当前任务中修改，用户没有提到，或仅凭当前上下文无法判断用途。
   - Blocked：文件疑似包含 secrets、credentials、private keys、`.env` 内容、无关大二进制文件、依赖转储，或不应在没有明确指令时提交的破坏性/生成式噪声。

3. 选择 commit 范围。
   完成标准：已有明确的选定文件集合，或用户选择不提交。

   - 如果所有变更文件都是 known，且没有 blocked 文件，默认选择全部变更文件。
   - 如果存在 unknown 文件，暂存前先询问用户。给出这些选项：「提交全部变更」「只提交 `<known-or-specified-files>`」「不提交」。
   - 如果存在 blocked 文件，停止并询问用户如何处理。在 blocked 问题解决前，不要提供「提交全部变更」选项。
   - 如果用户选择「不提交」，停止并说明没有创建 commit。

4. 验证选定变更已达到可提交状态。
   完成标准：选定变更所需的测试、检查、格式化、构建步骤或手动验证已经通过；如果没有可运行验证，也已经说明具体原因。

   - 优先使用项目指令。
   - 如果没有明确测试命令，根据变更文件推断最小相关检查。
   - 如果没有适用的自动检查，检查 diff，并说明已完成的手动/静态验证。
   - 除非用户明确要求，否则不要在已知检查失败时 commit。

5. 只暂存选定文件。
   完成标准：`git diff --staged --name-only` 只包含选定文件，不包含未选文件。

   ```bash
   git restore --staged -- <unselected-files>
   git add -A -- <selected-files>
   git diff --staged --name-only
   git diff --staged --check
   ```

   如果选定了全部变更文件，可以使用 `git add -A`。如果这一步后没有 staged 文件，停止，不要创建 empty commit。

   如果 `git diff --staged --check` 报告空白或 conflict marker 问题，先修复，或在 commit 前询问用户。

6. 至少创建一次 commit。
   完成标准：`git commit` 成功，且 `git rev-parse --short HEAD` 返回新 commit。

   - 根据 staged diff 生成 commit message。
   - 优先为选定范围创建一个 commit。只有当选定变更包含相互独立的逻辑变更、单条 message 会误导时，才拆分。
   - 不要创建 empty commit。
   - 除非用户明确要求 amend，否则不要 amend 现有 commit。
   - 除非用户明确要求跳过 hooks，否则不要使用 `--no-verify`。

   ```bash
   git diff --staged
   git commit -m "<type>[optional scope]: <description>"
   git rev-parse --short HEAD
   ```

7. 处理 push 意图。
   完成标准：已经 push 新 commit，或记录了用户选择不 push。

   - 如果用户已经要求 push，commit 后执行 push。
   - 如果用户没有明确要求 push，询问是否 push。给出这些选项：「现在 push」「不 push」「先显示 status」。
   - push 前检查当前分支和 upstream。使用当前分支；不要 force push。
   - 如果没有 upstream，只有在存在 `origin` 且用户已同意 push 时，才使用 `git push -u origin HEAD`。
   - 永远不要 force push 到 `main` 或 `master`。

   ```bash
   git status --short --branch
   git remote -v
   git push
   ```

## 安全规则

- 不要更新 Git config。
- 除非用户明确要求，否则不要运行 hard reset、clean、force push 等破坏性 Git 命令。
- 不要提交 secrets 或 credentials。
- 不要留下无关文件处于 staged 状态。
- 如果 hooks 失败，修复问题后运行新的 `git commit`；除非用户要求 amend，否则不要 amend。
- commit 后汇报 commit hash、commit message、已完成验证，以及 push 结果或待确认的 push 决策。
