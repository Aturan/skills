---
name: backlog-md
description: 用于在本项目用 Backlog.md CLI 管理任务（创建、搜索、执行、收尾）。
---

# Backlog.md 任务管理

本项目用 Backlog.md 追踪任务。**所有 Backlog 读写都优先用 `backlog` CLI**，不要直接编辑 task/draft/document/decision/milestone 的 markdown 文件——CLI 才能保证元数据、ID、文件名、关系和历史一致。

## 何时用 Backlog

判断标准：“这件事需要思考怎么做吗？”

- **需要**（要规划、做决策、留交接说明）：先搜索是否已有任务，没有再创建。适用：bug 修复需调查、功能开发、API 变更、重构、应作为承诺来评审的工作。
- **不需要**：直接做小改动。不建任务：提问、解释、快速查找、明显的机械编辑。

## 状态名是本地配置项

本仓库的状态名（如 To Do / In Progress / Done）由 `backlog config` 定义，不要硬编码。不确定时先查：

```bash
backlog task edit TASK-1 --help   # 看 --status 接受的值
backlog config --help             # 看配置管理命令
```

下文用 `<todo>`、`<active>`、`<terminal>` 指代本地配置的待办态、进行态、终态。

## 读取约定

所有读取命令都加 `--plain`，避免交互式 UI 在脚本/agent 环境卡住：

```bash
backlog task list --plain
backlog task view TASK-1 --plain
backlog search "查询词" --plain
```

## 工作流

### 0. 搜索先行

改动任何东西前，先查是否已跟踪：

```bash
backlog search "登录" --plain
backlog task list --status "<todo>" --plain
backlog task list --status "<active>" --plain
backlog task list --search "login" --labels frontend,bug --limit 20 --plain
backlog task view TASK-1 --plain
```

避免无过滤的大列表；尽量用 `--status`/`--assignee`/`--parent`/`--priority`/`--labels`/`--search`/`--limit` 收窄。

### 1. 创建任务（先读 `backlog instructions task-creation`）

先评估范围：单个能在一次 PR 内完成？多个子系统？同目标同子系统用子任务（`-p`），跨独立组件用依赖（`--dep`）。

任务要写到“未来 agent 无需对话上下文也能动手”：清晰标题 + 描述（结果与原因）+ 可测的验收标准 + 必要的引用/依赖。

```bash
backlog task create "Add project search" \
  -d "Users can search tasks, docs, and decisions from one CLI command." \
  --ac "Search returns matching tasks by title and description" \
  --ac "Search supports --plain output" \
  --ac "Tests cover task, document, and decision results"

# 子任务
backlog task create -p TASK-10 "Set up shell"

# 带依赖的独立任务
backlog task create "Add bulk update UI" --dep TASK-21

# 带文档/引用
backlog task create "Add settings docs" --doc docs/settings.md --ref https://example.com/spec
```

创建后向用户报告任务 ID、标题和关键验收标准。用户要改时用 `backlog task edit`。

### 2. 执行任务（先读 `backlog instructions task-execution`）

非平凡工作先规划：读任务 → 标记进行态并指派自己 → 查代码 → 起草计划 →（需批准时）呈给用户 → 记录已批准的计划。

```bash
backlog task view TASK-1 --plain
backlog task edit TASK-1 -s "<active>" -a @your-name
backlog task edit TASK-1 --plan "1. ... 2. ..."
```

短循环推进：实现一个切片 → 跑测试 → 记进度 → 勾验收。

```bash
backlog task edit TASK-1 --append-notes "Implemented parser and added tests."
backlog task edit TASK-1 --check-ac 1
backlog task edit TASK-1 --comment "Question for review" --comment-author @your-name
```

把 Backlog 任务当作“计划的记录”。方案变了先 `--plan` 更新再继续。

**范围变更**：发现超出验收标准的工作，停下来问用户是扩当前任务还是建后续任务，不要静默扩范围。

### 3. 收尾任务（先读 `backlog instructions task-finalization`）

```bash
backlog task view TASK-1 --plain
backlog task edit TASK-1 --check-ac 1        # 逐条验收
backlog task edit TASK-1 --check-dod 1       # DoD 条目
backlog task edit TASK-1 --append-notes "Validation passed: uv run pytest"
backlog task edit TASK-1 --final-summary "Changed X, verified with Y."
backlog task edit TASK-1 -s "<terminal>"
```

DoD 自检：计划与最终方案一致、验收与 DoD 已勾、测试通过、文档/配置已更新、笔记含关键决策与验证、终态总结说明改了什么/为什么/如何验证。

终态任务留在原处，等周期性 `backlog cleanup` 移到 completed，**不要手动归档**。未经用户批准**不要**创建或启动后续任务。

## 详细指南

遇到对应环节先读对应指南，不要只靠本 skill：

```bash
backlog instructions overview           # 决策框架：何时建任务
backlog instructions task-creation      # 创建前：搜索、范围、建任务
backlog instructions task-execution     # 规划/更新前：计划、推进
backlog instructions task-finalization  # 收尾前：验证、总结、终态
```

跑陌生命令前先 `backlog <command> --help`，help 含字段、读写行为、输出格式和示例。

## 常用命令速查

| 动作     | 命令                                             |
| -------- | ------------------------------------------------ |
| 全文搜索 | `backlog search "query" --plain`                 |
| 列任务   | `backlog task list --status "<状态>" --plain`    |
| 看任务   | `backlog task view TASK-1 --plain`               |
| 建任务   | `backlog task create "标题" -d "..." --ac "..."` |
| 改任务   | `backlog task edit TASK-1 -s "<状态>" -a @name`  |
| 记笔记   | `backlog task edit TASK-1 --append-notes "..."`  |
| 勾验收   | `backlog task edit TASK-1 --check-ac 1`          |
| 终态总结 | `backlog task edit TASK-1 --final-summary "..."` |
| 项目概览 | `backlog overview`                               |
