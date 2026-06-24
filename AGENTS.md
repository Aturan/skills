# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 仓库性质

这是一个**个人 skills 仓库**:

一组可复用的 agent skill（每个 skill 是一份 `SKILL.md` 流程文档），遵循 Agent Skills 规范（agentskills.io/specification）。

这里没有可运行的应用、构建或测试套件；

产物是文档加少量脚本，目标是让未来的 agent 能发现并正确执行这些工作方式。

## Skill 编写约定

- 新增或迁移的 skill 必须写在 `skills/` 目录下。
- 编写或修改 `skills/` 下的 skill 时，必须使用 `writing-great-skills` skill 指导结构、触发条件、信息层级和裁剪。
- 文档应提供中英文对照版本：英文为 `<xxx>.md`，供 agent 使用；中文为 `<xxx>-zh.md`，供人类阅读。修改其中一份时，必须同步修改另一份。
- 中文版本写作时必须遵守 `writing-clearly-and-concisely` skill 及其中文文档规范。
- 例外：文档本身针对中文场景时，直接使用中文编写，不需要额外提供英文对照。

## Skill 编写流程

1. 先确认 skill 的用途、触发方式和主要读者；完成标准是能判断它应放在 `skills/` 下，且知道是否需要中英文对照文档。
2. 阅读并应用 `writing-great-skills` skill；完成标准是已明确 invocation、description、steps、reference、completion criteria 和需要外置的参考材料。
3. 编写英文版 `<xxx>.md`，把 agent 执行所需的步骤和参考放在合适的信息层级；完成标准是 agent 只读该文档也能稳定执行流程。
4. 编写中文版 `<xxx>-zh.md`，供人类理解和维护；完成标准是内容与英文版一致，并遵守 `writing-clearly-and-concisely` skill 及其中文文档规范。
5. 同步检查两个版本；完成标准是触发条件、步骤、例外、文件名和外部引用一致。
6. 删除重复、过时和不改变行为的句子；完成标准是每条规则都有明确用途，且没有同一含义写在多个地方。

## 常见错误

- 把 skill 写在 `skills/` 以外，导致后续 agent 难以发现或复用。
- 没有先使用 `writing-great-skills`，直接堆叠步骤、背景和规则，导致触发条件和完成标准不清楚。
- 只写中文或只写英文，却没有说明这是中文场景例外。
- 修改 `<xxx>.md` 后忘记同步 `<xxx>-zh.md`，或反过来只改中文版本。
- 把中文版本写成英文版的松散摘要，导致两份文档的步骤、例外或外部引用不一致。
- 在 `SKILL.md` 里堆放所有背景材料，没有用外部参考文件做渐进披露。
- 保留重复、过时或不改变 agent 行为的句子，增加维护成本和上下文负担。
