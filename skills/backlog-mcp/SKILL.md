---
name: backlog-mcp
description: Use at the start of every user request in a repository or project that uses Backlog.md through the Backlog MCP server. Before answering, exploring, planning, editing, or running task work, retrieve Backlog workflow guidance, derive the current project ID, create requirement records only when the user explicitly asks for Requirements/Backlog management or explicitly invokes this skill for that purpose, and manage records only through MCP tools such as get_backlog_instructions, task_list, task_view, task_create, task_edit, and task_complete.
---

# Backlog MCP

Use this skill as the Backlog.md gate for MCP-enabled projects. Backlog tracks commitments: what will be built, fixed, changed, or handed off.

## Workflow

1. Retrieve the overview first.
   Completion criterion: before answering or taking action on each user request in a Backlog.md project, call `mcp__backlog.get_backlog_instructions` with `instruction="overview"` and use that guidance to decide the next Backlog step.

2. Identify the current project.
   Completion criterion: derive a stable `projectId` before searching, creating, or editing tasks. For a Git repository, read the repository URL and convert `owner/repo` to `owner:repo`; keep the repository URL as source evidence. For a non-Git folder, use `local:<folder>`. Use `@projectId` as the Backlog assignee value.

3. Require explicit Requirements or Backlog intent before creating records.
   Completion criterion: create a Backlog-backed requirement record only when the user explicitly asks to create, record, file, or track a requirement, asks to use Requirements or Backlog for the request, or explicitly invokes this skill for requirement management. Do not infer requirement creation from "I want to do X", implementation complexity, planning needs, likely handoff value, or the word "task" alone. Treat `task_*` as MCP storage tool names, not user-facing trigger words.

4. Search current-project work before creating or managing records.
   Completion criterion: when managing existing Backlog-backed records or when the creation condition in step 3 is met, call `mcp__backlog.task_list` with `assignee="@projectId"` and focused filters such as status, labels, milestone, search, or limit. Use `mcp__backlog.task_search` only as a secondary broad search when needed, and never treat a record as current-project work until its assignee and source comment match the current project. Managing existing records does not require the same explicit Requirements or Backlog creation intent; creating a new record always does.

5. Create a record only after reading creation guidance.
   Completion criterion: when the explicit Requirements/Backlog intent above is present and no existing current-project record fits, call `mcp__backlog.get_backlog_instructions` with `instruction="task-creation"`, then create the smallest reviewable record with `mcp__backlog.task_create`. Include `assignee=["@projectId"]`, outcome-focused description, testable acceptance criteria, source repository URL or local source reference, useful documentation, and project-root-relative modified files when known. After creation, call `mcp__backlog.task_edit` with `commentsAppend` to record the requirement source, including `projectId` and the repository URL or local folder path.

6. Verify exact task IDs before use.
   Completion criterion: when the user supplies an exact Backlog record ID, call `mcp__backlog.task_view` only to verify ownership. Continue only if the record assignee contains `@projectId` and a source comment matches the current repository URL or local folder. If either check fails, do not read deeper record context, modify, close, or reuse the record; report that the record does not belong to the current project.

7. Execute tracked work through the record.
   Completion criterion: before implementing tracked work, call `mcp__backlog.get_backlog_instructions` with `instruction="task-execution"`, keep the record status current with `mcp__backlog.task_edit`, and record the plan, notes, dependencies, comments, modified files, and acceptance-criteria state in the record.

8. Finalize through the finalization guide.
   Completion criterion: before marking tracked work done, call `mcp__backlog.get_backlog_instructions` with `instruction="task-finalization"`, verify the acceptance criteria, update checked criteria and final summary with `mcp__backlog.task_edit`, and set status to `Done` when the guide's completion rules are satisfied.

## Tool Rules

- Use Backlog MCP tools only; do not edit Backlog task, draft, document, decision, or milestone markdown files directly.
- Do not use CLI commands for Backlog work when MCP tools are available.
- Do not run broad unfiltered listings. Prefer `task_list` with `assignee="@projectId"` plus a status, search query, label, milestone, or limit.
- Use `mcp__backlog.document_*`, `mcp__backlog.milestone_*`, and `mcp__backlog.definition_of_done_defaults_*` only when the retrieved Backlog guide or the user request calls for documents, milestones, or project Definition of Done defaults.
- Do not use `mcp__backlog.task_archive` for completed work. Archive only duplicate, canceled, or invalid work.
- Do not use `mcp__backlog.task_complete` as part of ordinary task finishing unless the retrieved Backlog guidance or the user explicitly requests periodic cleanup.

## Scope Changes

When implementation reveals work outside the current record, stop and ask whether to add acceptance criteria to the current record or create a follow-up requirement record. Completion criterion: scope changes are represented in Backlog only after user confirmation; creating a follow-up still requires explicit user confirmation.
