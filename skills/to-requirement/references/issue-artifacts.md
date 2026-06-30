# Requirement Issue Artifacts

Read this file only when writing or self-reviewing the requirement issue body.

## Issue Template

Write the issue title and body in Chinese by default unless the user explicitly asks for another language.

Use a concise title that describes the required outcome.

Use this body structure:

```markdown
## 目标

## 背景

## 范围

## 非范围

## 用户与场景

## 功能需求

## 约束

## 验收场景

## 成功标准

## 依据与参考

## 假设与依赖

## 待决问题
```

## Writing Rules

- `目标` explains the user value and expected result.
- `背景` includes only the context needed to understand the requirement.
- `范围` and `非范围` explain what is included and excluded.
- `用户与场景` explains who uses it, when they use it, and what they want to accomplish.
- `功能需求` describes observable behavior. Do not write file paths, code structure, task steps, or internal module design.
- `约束` includes only limits explicitly specified by the user, required by project docs, or forced by external facts.
- `验收场景` uses Given/When/Then or equivalent clear wording to cover main, exceptional, and boundary flows.
- `成功标准` must be observable or measurable.
- `依据与参考` records sources that affect the goal, scope, constraints, or acceptance. Prefer official external documentation and state which judgment each source supports.
- `假设与依赖` includes only premises that are not fully confirmed but are temporarily used by the requirement.
- `待决问题` lists only non-blocking unresolved questions. If a question blocks implementation readiness, stop and ask the user before publishing.

## Self-Review Checklist

Check each item before publishing:

| Check | Standard |
| --- | --- |
| Clear sources | Key judgments trace back to user confirmation, project docs, or external evidence |
| Clear scope | Included and excluded items do not conflict |
| Testable | Key functional requirements have acceptance scenarios |
| Measurable | Success criteria have observable results |
| No disguised solution | Implementation paths are not written as requirements unless they are explicit constraints |
| Ready to publish | Blocking open questions are resolved before issue creation |
