---
name: git-create-branch
description: 用户要求根据指令、Backlog 条目或 specs 为新 feature 或 bugfix 创建 git branch 时使用；需要先确认基础分支，并在创建前检查当前分支和工作区。
---

# Git Create Branch

从已确认的基础分支创建实现分支。不要从另一个实现分支、实验分支、临时分支或 work-in-progress 分支继续开新分支。

## 流程

1. 确认基础分支。
   完成标准：如果用户指定了基础分支，使用用户指定的分支；否则先检测 `origin` HEAD，再回退到本地 `main` 或 `master`。如果仍不明确，询问用户。

   ```bash
   git remote show origin 2>/dev/null | grep 'HEAD branch' | awk '{print $NF}'
   git branch --list main --list master
   ```

2. 检查当前分支。
   完成标准：已经知道 `git branch --show-current` 是否等于基础分支。

   ```bash
   git branch --show-current
   ```

3. 在切换或创建分支前检查工作区。
   完成标准：`git status --porcelain` 输出为空。如果有任何输出，停止并要求用户先 commit、stash 或清理变更。

   ```bash
   git status --porcelain
   ```

4. 必要时切回基础分支。
   完成标准：如果当前分支是 `feature/*` 或 `bugfix/*`，切回基础分支并重新检查当前分支。如果当前分支是其他非基础分支，停止并询问用户如何处理。

   ```bash
   git checkout <base-branch>
   git branch --show-current
   ```

5. 确定分支名。
   完成标准：分支名符合 `<type>/<short-description>`；新能力或增强使用 `feature`，缺陷修复使用 `bugfix`。

6. 创建前确认。
   完成标准：用户已经确认基础分支和最终分支名。

7. 创建并验证分支。
   完成标准：`git checkout -b <branch-name>` 成功，并且 `git branch --show-current` 返回新分支。

   ```bash
   git checkout -b feature/<description>
   git branch --show-current
   ```

## 命名

使用：

```text
feature/<short-description>
bugfix/<short-description>
```

描述部分规则：

- 只使用小写字母、数字和连字符。
- 保持简短，通常 3-5 个词。
- 从 backlog 条目、spec 摘要或用户请求中提炼。
- 删除冠词和填充词。
- 不使用下划线、camelCase 或空格。

示例：

| 输入 | 分支 |
| --- | --- |
| User authentication with OAuth | `feature/user-authentication-oauth` |
| Fix the login timeout bug | `bugfix/login-timeout` |
| API rate limiting middleware | `feature/api-rate-limiting` |

## 停止条件

遇到以下情况时，不要创建分支：

- 工作区不干净。
- 当前分支不是基础分支，也不是 `feature/*` 或 `bugfix/*` 分支。
- 无法确定基础分支。
- 分支名会使用 `fix/`、下划线、camelCase、空格，或类型不清楚。
- 用户尚未确认基础分支和分支名。

## 汇报

创建分支后，说明：

- 使用的基础分支。
- 新分支名。
- 创建前工作区是否干净。
