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

## 创作/修改 skill 的铁律：TDD for 文档

`writing-skills` 把 TDD 应用到流程文档：先写失败测试（subagent 压力场景，无 skill 跑 baseline）、看它以预期方式失败、再写 skill（看 agent 合规）、然后 refactor 堵漏。

**Iron Law：没有先看 baseline 失败，就不写/不改 skill。** 同样适用于"只是加一节""只是文档更新"。写完 skill 才测试？删掉重来。完整方法论见 `skills/writing-skills/testing-skills-with-subagents.md`；写测试/加 mock 时同时读 `testing-anti-patterns.md`。

**guidance 形式要匹配失败类型**（见 `writing-skills/SKILL.md` 的 "Match the Form to the Failure"）：

| baseline 失败  | 正确形式                                 | 错误形式                                                |
| -------------- | ---------------------------------------- | ------------------------------------------------------- |
| 压力下明知故犯 | 禁止 + rationalization 表 + red flags    | 软建议（prefer/consider）                               |
| 输出形状不对   | 正面 recipe/契约：说清输出"是什么"、按序 | 禁止列表（禁止会让 agent 更谈价、产出更多不想要的内容） |
| 漏掉必需元素   | 结构化 REQUIRED 字段/槽位                | 模板旁的散文提醒                                        |
| 行为依赖条件   | 基于可观察谓词的条件式                   | 无条件规则 + 例外条款                                   |

## 常用命令

没有传统 build/lint/test。skill 的"测试"是 subagent 压力场景（见 testing-skills-with-subagents.md）。

## skill 清单（按触发条件）

| skill                         | 何时用                                                                            |
| ----------------------------- | --------------------------------------------------------------------------------- |
| using-repository-skills       | 在本仓库开始任何工作前，先判断哪些 skill 适用——入口 skill                         |
| writing-skills                | 创作/编辑/部署前验证 skill（TDD for 文档）                                        |
| dispatching-parallel-agents   | 面对 2+ 个无共享状态、无顺序依赖的独立任务                                        |
| brainstorming                 | 用户明确要求头脑风暴/澄清需求/把想法转成需求（HARD-GATE：需求确认前不做实现动作） |
| chinese-documentation         | 仅用户显式 `/chinese-documentation` 时调用，不自动触发（中文排版规范）            |
| writing-clearly-and-concisely | 用户明确要求润色/压缩/改写面向人的重要正文                                        |
| backlog-md                    | 用 Backlog.md CLI 管理任务（创建、搜索、执行、收尾）                              |

skill 中英文混用是有意的，按各自 description 的语言写即可。

## 验证

- 改完 skill：按 `writing-skills` 的 checklist 跑 RED-GREEN-REFACTOR，确认 agent 在最大压力下仍合规。
