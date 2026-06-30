---
name: implement
description: "Implement a piece of work based on a PRD or set of issues."
disable-model-invocation: true
---

# Implement

Implement the work described by the user in a PRD, issue, or explicit task brief. Keep a durable implementation record so a later session can resume without reconstructing the work from chat history.

## Implementation Record

Use `.agents/runs/` for implementation records. Create the directory if it does not exist. Do not store records under `.agents/skills/`; skill files define capabilities, while run records are mutable implementation state.

Name the record from the source of work:

- Issue-backed work: `.agents/runs/issue-<id>-<slug>.md`
- PRD-backed work: `.agents/runs/prd-<slug>.md`
- Ad hoc work: `.agents/runs/<yyyy-mm-dd>-<slug>.md`

Do not duplicate full PRDs, issues, ADRs, commits, diffs, or large command output. Reference them by path, URL, or command.

The run record is not a design journal. Every item in it must come from either the PRD / issue / user brief or from this skill's workflow. Do not use it to rewrite scope, capture speculative implementation decisions, or adjust acceptance criteria during implementation. If implementation changes the understanding of the requirement, update the source artifact or ask the user.

Each record must contain:

- Source: issue, PRD, or user brief reference.
- Requirements: acceptance criteria copied or referenced from the source.
- Process: the fixed workflow checklist from this skill.
- Current: the current workflow step, state, and blocker if any.
- Next: the next workflow action for a fresh session.
- Verification: commands run, result, and any failures or skipped checks.

Redact secrets, credentials, tokens, personal data, and private service identifiers.

When creating a record, use this template:

```markdown
# Run: <task>

## Source

## Requirements

## Process

## Current

## Next

## Verification
```

Keep the record short. Prefer source references, workflow checkboxes, `Current`, and `Next` over free-form notes. Add a new section only when the source artifact or this workflow requires it.

## Hard Rules

- Review must run through a subagent. The implementation context must not replace subagent review with its own judgment.
- Review happens before and after implementation, not only at the end.
- For a new feature or large adjustment, tests must go through a subagent review and fix loop before full implementation.
- Do not commit until the final subagent review and fix loop has run, or the run record explains why review could not run.

## Workflow

### 1. Read Requirements

Find an existing implementation record for the same issue, PRD, branch, or task slug. If one exists, read it before changing code. If none exists, create one before implementation begins.

Read the source PRD, issues, or user brief and the repository instructions that apply to the files you will touch.

Completion criterion: the run record exists, points to the source of work, lists source-backed requirements, and marks the current workflow step in `Current` and `Next`.

### 2. Write Tests and Minimal Model

Use `tdd` where possible at pre-agreed seams. Write the first tests and add only the minimum implementation model needed for those tests to compile or fail against the intended public behavior. This model may include types, interfaces, route shells, or module skeletons; it must not contain the full implementation.

Completion criterion: tests express source-backed behavior, the minimal model exists only as far as needed for the tests, and the run record advances `Current` and `Next` without adding implementation design.

### 3. Review Tests for New or Large Work

For a new feature or large adjustment, run a subagent review and fix loop on the tests before full implementation. The review checks whether tests match the PRD / issue, assert observable behavior, avoid implementation coupling, and cover the risky paths. Fix the tests before moving on.

For small, low-risk changes, record in `Current` why this test review loop was not required.

Completion criterion: required test review findings are fixed, or `Current` explains why the test review loop was not required.

### 4. Implement

Work in small vertical slices. Update only workflow checkboxes, `Current`, `Next`, and verification results in the run record.

Completion criterion: implementation satisfies the reviewed tests and source-backed requirements without changing the run record's requirements or acceptance criteria.

### 5. Complete Tests

Run typechecking regularly, single test files regularly, and the full test suite once at the end unless the repository's verification instructions require a different final command.

Completion criterion: verification results in the run record match the latest executed commands, including failures and skipped checks.

### 6. Submit Review and Fix Loop

Use `review` to review the completed work through subagents. Fix actionable findings, rerun the relevant verification, and repeat until no blocking findings remain. Keep review findings and fixes in the run record by reference; do not paste full review transcripts unless no other artifact exists.

Completion criterion: `Current` states that final subagent review ran, blocking findings are fixed or explicitly unresolved, and verification reflects the post-fix state.

### 7. Commit

Commit the completed work to the current branch, respecting repository commit rules and excluding unrelated user changes.

Completion criterion: the run record includes the commit SHA or explains why no commit was made.

## Relationship to Handoff

Use `handoff` for temporary cross-session summaries. The handoff document should reference the implementation record instead of duplicating it. The implementation record remains the durable workspace artifact used for startup recovery.
