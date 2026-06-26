# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 仓库性质

这是一个**个人 skills 仓库**:

一组可复用的 agent skill（每个 skill 是一份 `SKILL.md` 流程文档），遵循 Agent Skills 规范（agentskills.io/specification）。

这里没有可运行的应用、构建或测试套件；

产物是文档加少量脚本，目标是让未来的 agent 能发现并正确执行这些工作方式。

## Skill 编写约定

- 新增或迁移的 skill 必须写在 `skills/` 目录下。
- 编写或修改 `skills/` 下的 skill 时，必须使用 `writing-great-skills` skill。它是 skill 写作、文档 TDD、中英文同步和裁剪规则的单一来源。
- 编写或修改中英文文档时，如果存在 `writing-clearly-and-concisely` skill，必须调用它按语言检查英文和中文表达；中文还要检查排版。
- skill 文档应提供中英文对照版本：英文为 `SKILL.md`，供 agent 使用；中文为 `SKILL-zh.md`，供人类阅读。修改其中一份时，必须同步修改另一份。
  - 例外：文档本身针对中文场景时，直接使用中文编写，不需要额外提供英文对照。
- 不需要保留 `agents/openai.yaml`。

## Skill 编写流程

1. 先阅读并应用 `writing-great-skills`。
2. 按该 skill 的文档 TDD 循环写红色检查清单、修改 `SKILL.md` / `SKILL-zh.md`、让清单变绿。
3. 按该 skill 的最终检查清单同步中英文、内置必需参考，并删除重复、过时和不改变行为的句子。

## 常见错误

- 把 skill 写在 `skills/` 以外，导致后续 agent 难以发现或复用。
- 没有先使用 `writing-great-skills`，直接堆叠步骤、背景和规则，导致触发条件、完成标准或文档 TDD 检查不清楚。
- 只写中文或只写英文，却没有说明这是中文场景例外。
- 修改 `SKILL.md` 后忘记同步 `SKILL-zh.md`，或反过来只改中文版本。
- 把中文版本写成英文版的松散摘要，导致两份文档的步骤、例外或外部引用不一致。
- 依赖外部 skill 或外部文档提供必需规则，而不是把必需参考内联或放进同一个 skill 目录。
- 保留重复、过时或不改变 agent 行为的句子，增加维护成本和上下文负担。
