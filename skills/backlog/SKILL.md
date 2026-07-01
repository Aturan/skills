---
name: backlog
description: >-
  Use Backlog when the user clearly intends to create a Backlog item, including invoking this skill for that purpose, or when a target Backlog object ID is already present and the agent needs to read or write that object. Use this skill's backlog-cli.sh entrypoint for all Backlog operations. Do not call the backlog CLI directly.
---

# Backlog

Use this skill as the Backlog.md gate. In this skill, "item" means a Backlog.md item managed through `./backlog-cli.sh`.

## Trigger Modes

Use Backlog only in these modes:

1. Explicit creation.
   Completion criterion: the user clearly intends to create a Backlog item, such as asking to create, file, capture, or track a task, bug, chore, follow-up, decision, or other item in Backlog, asking to use Backlog for creation, or invoking this skill for Backlog item creation.

2. Target-object read/write.
   Completion criterion: a target Backlog object ID is already present in user input or current context, and the agent needs to read that object or update it under Allowed Operations. The ID may come from user input such as `TNNN` or `T-NNN`, a verified active current-project item, or an already-available Backlog list/search result whose `@projectId` assignee matches the current project.

Do not call Backlog automatically for ordinary implementation requests.

## CLI Entry Point

Use the script entrypoint before searching, viewing, creating, editing, or finalizing items:

1. Use `backlog-cli.sh`.
   Completion criterion: all Backlog reads, searches, creations, edits, comments, status changes, instruction retrieval, and finalization steps use `./backlog-cli.sh` from this skill directory. Unless `BACKLOG_CWD` is already set, the script uses `~/backlog` when it exists and falls back to `~/.backlog`; it forwards arguments to the real CLI.

2. Never call `backlog` directly.
   Completion criterion: do not run `backlog` as a shell command. Do not edit Backlog task, draft, document, decision, or milestone markdown files directly.

3. Stop if the script cannot complete the work.
   Completion criterion: if `./backlog-cli.sh` is missing, fails, or cannot complete Backlog work, stop Backlog operations and tell the user what failed.

## Project Identity

Derive `projectId` before searching, viewing, creating, or editing items:

- Git repository: read the repository URL, parse `owner/repo`, and convert it to `owner:repo`.
- Non-Git folder: use `local:<folder>`.
- Assignee: use the Backlog-compatible value `@projectId`.
- Source comment: for Git repositories, write `projectId` plus the repository URL as the real source. Use it only as auxiliary evidence when ownership is ambiguous, such as the same `owner/repo` existing on different providers.

Do not put the repository URL in references; keep references for work-related materials. Non-Git folders do not need an extra local path source comment unless the user explicitly asks for one.

## Safety Gates

These gates are mandatory:

1. Verify current-project ownership.
   Completion criterion: before treating any item as usable, verify the current `projectId` and `@projectId` assignee. Use the source comment only as auxiliary evidence when ownership is ambiguous. If ownership cannot be verified, do not read deeper context, modify, close, delete, archive, or reuse the item.

2. Create only from explicit creation intent.
   Completion criterion: create a Backlog-backed item only when the user clearly intends to create a Backlog item. Do not infer creation from "I want to do X", implementation complexity, planning needs, handoff value, scope changes, an active tracked item, or the word "task" alone.

3. Remove items only from allowed removal triggers.
   Completion criterion: delete or archive a Backlog-backed item only when the user explicitly asks to delete, remove, cancel, archive, or invalidate that item, or when a verified active current-project item becomes duplicate, canceled, or invalid because of the user's scope change. Do not delete or archive because work is done, stale, inconvenient, or outside the current implementation path.

4. Require second confirmation for destructive maintenance.
   Completion criterion: before deleting, archiving, cleaning up, or running any operation that can hide, remove, bulk-change, or permanently alter items, show the exact item IDs or filter scope, the operation, and the reason, then get explicit user confirmation in the current conversation. Do not treat the initial request, a broad cleanup request, or finalization approval as this second confirmation.

## Allowed Operations

Within the CLI Entry Point and Safety Gates, the agent may manage the target Backlog item as needed:

- Read the target current-project item when a target object ID is already present.
- Update item fields when the current task changes the tracked work itself, reveals the tracked item is stale, or the user explicitly asks to modify, update, sync, correct, or finalize that item.
- Maintain status, plan, notes, comments, dependencies, modified files, acceptance criteria, checked criteria, and final summary when they help keep the tracked work accurate.
- Finalize the item only after retrieving finalization instructions and satisfying their completion rules.

Shared Backlog resources have a stricter boundary:

- Documents, milestones, and Definition of Done defaults may be read when useful for understanding tracked work.
- Modify documents, milestones, or Definition of Done defaults only when the user explicitly asks to modify that resource.
- If modifying a shared resource can hide, remove, bulk-change, or permanently alter items or shared project defaults, Safety Gate 4 also applies.

## Workflow

1. Retrieve workflow instructions.
   Completion criterion: use `./backlog-cli.sh` to retrieve overview instructions before Backlog work, and use the returned instructions to choose the next step.

2. Identify the project.
   Completion criterion: `projectId` and `@projectId` are known; source evidence is collected when available.

3. Verify exact IDs.
   Completion criterion: when the user supplies, mentions, or the current context contains an exact Backlog item ID, including `TNNN` or `T-NNN`, recognize it as an existing Backlog object and use `./backlog-cli.sh` only to verify ownership. Continue only if the `@projectId` assignee matches the current project. Treating such an ID as a target object does not authorize creating a new item.

4. Search current-project items only when allowed.
   Completion criterion: search only after explicit creation intent is satisfied for duplicate/current-project lookup, or after a target Backlog object ID is already present and related-item lookup is required. Use exact-ID view, not search, for ownership verification of a supplied ID. Prefer a list operation with `assignee="@projectId"` and focused filters such as status, labels, milestone, search, or limit. Use broad search only as a secondary step. A result is usable as a target object only after `@projectId` assignee matches the current project.

5. Create items.
   Completion criterion: when Safety Gate 2 is satisfied and no existing current-project item fits, retrieve task-creation instructions through `./backlog-cli.sh`, then create the smallest reviewable item. Include `assignee=["@projectId"]`, outcome-focused description, testable acceptance criteria, useful documentation, and project-root-relative modified files when known. After creating a Git-backed item, use `./backlog-cli.sh` to write the source comment with `projectId` and repository URL.

6. Manage tracked work.
   Completion criterion: before implementing or changing tracked work, retrieve task-execution instructions through `./backlog-cli.sh`. Read tracked state as needed. Within Allowed Operations, update the target item whenever the task changes the tracked work or the item must stay accurate. Create a split or follow-up item only when the user clearly intends to create a Backlog item.

7. Finalize items.
   Completion criterion: before marking tracked work complete, retrieve task-finalization instructions through `./backlog-cli.sh` and verify acceptance criteria. Update checked criteria, final summary, or completion status only when Allowed Operations apply and the returned instructions' completion rules are satisfied.

8. Delete, archive, or cleanup.
   Completion criterion: before deleting, archiving, or cleanup, verify Safety Gate 3 and Safety Gate 4, then verify current-project ownership again. Prefer status changes for completed work. Archive only duplicate, canceled, or invalid items. Delete only when the user or returned instructions specifically requires deletion.

## Scope Changes

If implementation reveals work outside the current item, ask whether to add acceptance criteria to the current item or create a follow-up Backlog item. Creating a follow-up still requires explicit creation intent.
