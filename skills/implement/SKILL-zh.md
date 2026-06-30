---
name: implement
description: "根据 PRD、issue 或明确任务简报实现工作。"
disable-model-invocation: true
---

# Implement

根据用户提供的 PRD、issue 或明确任务简报完成实现。维护一份持久实现记录，让后续会话不依赖聊天历史也能恢复工作。

## 实现记录

实现记录放在 `.agents/runs/`。目录不存在时先创建。不要放在 `.agents/skills/` 下；skill 文件定义能力，运行记录是可变实现状态。

记录文件名根据工作来源确定：

- issue 工作：`.agents/runs/issue-<id>-<slug>.md`
- PRD 工作：`.agents/runs/prd-<slug>.md`
- 临时任务：`.agents/runs/<yyyy-mm-dd>-<slug>.md`

不要复制完整 PRD、issue、ADR、commit、diff 或大段命令输出。用路径、URL 或命令引用它们。

运行记录不是设计日志。每一项都必须来自 PRD / issue / 用户简报，或来自本 skill 的流程步骤。不要用运行记录改写范围、记录猜测性的实现决策，或在实现过程中调整验收口径。如果实现改变了对需求的理解，应更新来源产物或询问用户。

每份记录必须包含：

- 来源：issue、PRD 或用户简报引用。
- Requirements：从来源复制或引用的验收条件。
- Process：本 skill 固定流程 checklist。
- Current：当前流程步骤、状态，以及阻塞原因（如果有）。
- Next：新会话下一步要做的流程动作。
- Verification：已运行命令、结果、失败项和跳过项。

必须删去 secret、credential、token、个人数据和私有服务标识。

创建记录时使用这个模板：

```markdown
# Run: <task>

## Source

## Requirements

## Process

## Current

## Next

## Verification
```

记录要短。优先写来源引用、流程 checkbox、`Current` 和 `Next`，少写自由 notes。只有来源产物或本流程要求时，才新增段落。

## 硬规则

- Review 必须通过 subagent 执行。实现所在上下文不得用自己的判断替代 subagent review。
- Review 必须在实现前后都发生，不能只在做完后发生。
- 新增功能或大调整时，测试必须先经过 subagent review and fix loop，再进入完整实现。
- 最终 subagent review and fix loop 未运行前不得 commit；如果无法运行，必须在运行记录中说明原因。

## 流程

### 1. 阅读需求

根据相同 issue、PRD、branch 或任务 slug 查找已有实现记录。已有记录时，先读记录再改代码。没有记录时，先创建记录再开始实现。

读取来源 PRD、issue 或用户简报，以及本次会触碰文件对应的仓库指令。

完成标准：运行记录已存在，指向工作来源，列出由来源支撑的 requirements，并在 `Current` 和 `Next` 标记当前流程步骤。

### 2. 写测试和最小模型

在预先约定的边界尽量使用 `tdd`。先写第一批测试，并只添加让测试能编译或能针对目标公开行为失败的最小实现模型。这个模型可以是类型、接口、route shell 或模块骨架；不能包含完整实现。

完成标准：测试表达来源支撑的行为，最小模型只做到测试需要的程度，运行记录推进 `Current` 和 `Next`，但不新增实现设计。

### 3. 新功能或大调整先 Review 测试

新增功能或大调整时，必须先对测试运行 subagent review and fix loop，再进入完整实现。review 检查测试是否匹配 PRD / issue、是否验证可观察行为、是否避免绑定实现细节，以及是否覆盖高风险路径。进入下一步前先修复测试问题。

小型低风险改动可以不运行测试 review loop，但必须在 `Current` 记录为什么不需要。

完成标准：必需的测试 review 发现已修复，或 `Current` 说明为什么不需要测试 review loop。

### 4. 实现

按小的 vertical slice 推进。运行记录只更新流程 checkbox、`Current`、`Next` 和验证结果。

完成标准：实现满足已 review 的测试和来源支撑的 requirements，且没有改写运行记录中的 requirements 或验收条件。

### 5. 完成测试

定期运行 typecheck，定期运行单个测试文件，收尾时运行完整测试套件；如果仓库验证指令要求其他最终命令，以仓库指令为准。

完成标准：运行记录中的验证结果和最新执行命令一致，包括失败项和跳过项。

### 6. 提交前 Review and Fix Loop

使用 `review` 通过 subagents 审查完成后的改动。修复可执行发现，重新运行相关验证，并重复直到没有 blocking findings。记录中引用 review 发现和修复，不要粘贴完整 review 记录，除非没有其他产物可引用。

完成标准：`Current` 说明最终 subagent review 已运行，blocking findings 已修复或明确保留，验证结果反映修复后的状态。

### 7. Commit

把完成的工作提交到当前 branch，遵守仓库 commit 规则，不混入用户的无关修改。

完成标准：运行记录包含 commit SHA，或说明为什么没有 commit。

## 与 Handoff 的关系

`handoff` 用于临时跨会话摘要。handoff 文档应引用实现记录，不要重复实现记录内容。实现记录是用于启动恢复的持久 workspace 产物。
