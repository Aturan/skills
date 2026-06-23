# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 仓库性质

这是一个**个人 skills 仓库**——一组可复用的 agent skill（每个 skill 是一份 `SKILL.md` 流程文档），遵循 Agent Skills 规范（agentskills.io/specification）。这里没有可运行的应用、构建或测试套件；产物是文档加少量脚本，目标是让未来的 agent 能发现并正确执行这些工作方式。

## skill 目录

**`skills/`** — skill 的**编辑源**，纳入 git。所有 skill 在这里创作和修改。

改 skill 时只改 `skills/` 下的文件；`.agents/`和`.claude/` 是同步产物，不要直接编辑。

每个 skill 是一个目录（扁平命名空间），`SKILL.md` 必填，重型参考材料（100+ 行）或可复用工具才拆成单独文件。

## SKILL.md 约定

YAML frontmatter 两个必填字段：

- `name`：只用字母、数字、连字符（无括号/特殊字符）。
- `description`：第三人称，**只写"何时用"，绝不概括 skill 的工作流**，尽量以 "Use when..." 开头，总长 ≤1024 字符。

description 这条规则是反复测试得出的硬约束：一旦 description 概括了工作流，agent 会把 description 当捷径、跳过正文里的流程图或多步要求（见 `skills/writing-skills/SKILL.md` 的 SDO 章节反例）。

其余创作规范（何时拆文件、token 预算、命名、flowchart 用法、cross-reference **不要用 `@` 链接**以免强制加载烧 context 等）全部定义在 `skills/writing-skills/SKILL.md`——它是本仓库的元 skill，创作或修改任何 skill 前应先读它。

skill 中英文混用是有意的，按各自 description 的语言写即可。

## 创作/修改 skill 的铁律：TDD for 文档

`writing-skills` 把 TDD 应用到流程文档：先写失败测试（subagent 压力场景，无 skill 跑 baseline）、看它以预期方式失败、再写 skill（看 agent 合规）、然后 refactor 堵漏。

## 验证

- 改完 skill：按 `writing-skills` 的 checklist 跑 RED-GREEN-REFACTOR，确认 agent 在最大压力下仍合规。
