# Using Repository Skills

Repository skills 是任务准备的一部分。它们定义这个仓库期望的工作方式，所以在常规推理或文件探索前，先检查它们。

## 流程

1. 检查本次运行是否豁免。
   完成标准：如果你是被派来执行具体任务的 subagent，停止使用本 skill；否则继续。

2. 找出候选 repository skills。
   完成标准：已经检查上下文中列出的 skills，以及仓库说明提到的 repository skill 位置，例如 `skills/` 或 `.agents/skills/`，足以判断哪些候选可能适用。

3. 在任务工作前选择适用 skills。
   完成标准：用户请求、仓库上下文或计划工作触发的每个 skill 都已被选中。在回答、追问、搜索文件、规划、编辑或运行任务工具前完成这一步。

4. 完整加载已选 skills。
   完成标准：每个已选 `SKILL.md` 都已完整阅读；如果该 skill 为当前分支要求读取参考文件，也已经读取。

5. 按顺序应用 skills。
   完成标准：先让 process skills 决定处理方式，再让 domain、implementation 或 reference skills 指导具体工作。两个 skills 冲突时，遵守更具体的适用 skill，除非用户或仓库指令覆盖它。

6. skill 不适用时继续。
   完成标准：如果用户点名或已选中的 skill 后来确认不适用，简要说明原因，然后继续遵守其他适用指令。

## 优先级

指令冲突时，按以下顺序处理：

1. 用户和仓库指令。
2. 已加载的 repository skills。
3. 默认 agent 行为。

Repository skills 指导如何在仓库内工作。它们不覆盖明确的用户指令，也不覆盖更高优先级的仓库指令。

## 危险信号

如果你发现自己在想下面这些话，停下来执行上面的流程：

- 「这只是个简单问题。」
- 「我得先看文件，再决定用不用 skill。」
- 「我记得规则。」
- 「这个 skill 可能太重了。」
- 「我先快速做一件事。」
