---
name: backlog-mcp
description: >-
  Use Backlog MCP when the user clearly intends to create a Backlog item, including invoking this skill for that purpose, or when a target Backlog object ID is already present and the agent needs to read or write that object. Do not call Backlog automatically for ordinary implementation requests.
---

# Backlog MCP

Use this skill as the Backlog.md gate for items in MCP-enabled projects. In this skill, "item" means a Backlog.md item stored through the `backlog` MCP.

## Trigger Modes

Use Backlog MCP only in these modes:

1. Explicit creation.
   Completion criterion: the user clearly intends to create a Backlog item, such as asking to create, file, capture, or track a task, bug, chore, follow-up, decision, or other item in Backlog, asking to use Backlog for creation, or invoking this skill for Backlog item creation.

2. Target-object read/write.
   Completion criterion: a target Backlog object ID is already present in user input or current context, and the agent needs to read that object or update it under Allowed Operations. The ID may come from user input such as `TNNN` or `T-NNN`, a verified active current-project item, or an already-available `backlog` MCP list/search result whose `@projectId` assignee matches the current project.

Do not call Backlog MCP automatically for ordinary implementation requests.

## Project Identity

Derive `projectId` before searching, viewing, creating, or editing items:

- Git repository: read the repository URL, parse `owner/repo`, and convert it to `owner:repo`.
- Non-Git folder: use `local:<folder>`.
- Assignee: use the Backlog-compatible value `@projectId`.
- Source comment: for Git repositories, write `projectId` plus the repository URL as the real source. Use it only as auxiliary evidence when ownership is ambiguous, such as the same `owner/repo` existing on different providers.

Do not put the repository URL in references; keep references for work-related materials. Non-Git folders do not need an extra local path source comment unless the user explicitly asks for one.

## Safety Gates

These gates are mandatory:

1. Use Backlog MCP only.
   Completion criterion: all Backlog.md item reads, searches, creations, edits, comments, status changes, and finalization steps use the corresponding `backlog` MCP capabilities. Do not use the `backlog` CLI. Do not edit Backlog task, draft, document, decision, or milestone markdown files directly.

2. Stop when Backlog MCP is unavailable.
   Completion criterion: if the Backlog MCP tools are missing or fail in a way that prevents Backlog work, stop Backlog operations and tell the user that Backlog MCP is unavailable. Do not fall back to the `backlog` CLI.

3. Verify current-project ownership.
   Completion criterion: before treating any item as usable, verify the current `projectId` and `@projectId` assignee. Use the source comment only as auxiliary evidence when ownership is ambiguous. If ownership cannot be verified, do not read deeper context, modify, close, delete, archive, or reuse the item.

4. Create only from explicit creation intent.
   Completion criterion: create a Backlog-backed item only when the user clearly intends to create a Backlog item. Do not infer creation from "I want to do X", implementation complexity, planning needs, handoff value, scope changes, an active tracked item, or the word "task" alone.

5. Remove items only from allowed removal triggers.
   Completion criterion: delete or archive a Backlog-backed item only when the user explicitly asks to delete, remove, cancel, archive, or invalidate that item, or when a verified active current-project item becomes duplicate, canceled, or invalid because of the user's scope change. Do not delete or archive because work is done, stale, inconvenient, or outside the current implementation path.

6. Require second confirmation for destructive maintenance.
   Completion criterion: before deleting, archiving, cleaning up, or running any operation that can hide, remove, bulk-change, or permanently alter items, show the exact item IDs or filter scope, the operation, and the reason, then get explicit user confirmation in the current conversation. Do not treat the initial request, a broad cleanup request, or finalization approval as this second confirmation.

## Allowed Operations

Within the Safety Gates, the agent may manage the target Backlog item as needed:

- Read the target current-project item when a target object ID is already present.
- Update item fields when the current task changes the tracked work itself, reveals the tracked item is stale, or the user explicitly asks to modify, update, sync, correct, or finalize that item.
- Maintain status, plan, notes, comments, dependencies, modified files, acceptance criteria, checked criteria, and final summary when they help keep the tracked work accurate.
- Finalize the item only after retrieving finalization instructions and satisfying their completion rules.

Shared Backlog resources have a stricter boundary:

- Documents, milestones, and Definition of Done defaults may be read when useful for understanding tracked work.
- Modify documents, milestones, or Definition of Done defaults only when the user explicitly asks to modify that resource.
- If modifying a shared resource can hide, remove, bulk-change, or permanently alter items or shared project defaults, Safety Gate 6 also applies.

## Workflow

1. Retrieve workflow instructions.
   Completion criterion: use the `backlog` MCP capability that retrieves workflow instructions, request the overview instructions before Backlog work, and use the returned instructions to choose the next step.

2. Identify the project.
   Completion criterion: `projectId` and `@projectId` are known; source evidence is collected when available.

3. Verify exact IDs.
   Completion criterion: when the user supplies, mentions, or the current context contains an exact Backlog item ID, including `TNNN` or `T-NNN`, recognize it as an existing Backlog object and use the `backlog` MCP view capability only to verify ownership. Continue only if the `@projectId` assignee matches the current project. Treating such an ID as a target object does not authorize creating a new item.

4. Search current-project items only when allowed.
   Completion criterion: search only after explicit creation intent is satisfied for duplicate/current-project lookup, or after a target Backlog object ID is already present and related-item lookup is required. Use exact-ID view, not search, for ownership verification of a supplied ID. Prefer the `backlog` MCP list capability with `assignee="@projectId"` and focused filters such as status, labels, milestone, search, or limit. Use broad search only as a secondary step. A result is usable as a target object only after `@projectId` assignee matches the current project.

5. Create items.
   Completion criterion: when Safety Gate 4 is satisfied and no existing current-project item fits, retrieve task-creation instructions through `backlog` MCP, then create the smallest reviewable item. Include `assignee=["@projectId"]`, outcome-focused description, testable acceptance criteria, useful documentation, and project-root-relative modified files when known. After creating a Git-backed item, use `backlog` MCP edit/comment capability to write the source comment with `projectId` and repository URL.

6. Manage tracked work.
   Completion criterion: before implementing or changing tracked work, retrieve task-execution instructions through `backlog` MCP. Read tracked state as needed. Within Allowed Operations, update the target item whenever the task changes the tracked work or the item must stay accurate. Create a split or follow-up item only when the user clearly intends to create a Backlog item.

7. Finalize items.
   Completion criterion: before marking tracked work complete, retrieve task-finalization instructions through `backlog` MCP and verify acceptance criteria. Update checked criteria, final summary, or completion status only when Allowed Operations apply and the returned instructions' completion rules are satisfied.

8. Delete, archive, or cleanup.
   Completion criterion: before deleting, archiving, or cleanup, verify Safety Gate 5 and Safety Gate 6, then verify current-project ownership again. Prefer status changes for completed work. Archive only duplicate, canceled, or invalid items. Delete only when the user or returned instructions specifically requires deletion.

## Scope Changes

If implementation reveals work outside the current item, ask whether to add acceptance criteria to the current item or create a follow-up Backlog item. Creating a follow-up still requires explicit creation intent.
