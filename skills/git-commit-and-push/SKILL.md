---
name: git-commit-and-push
description: Use when the user asks to commit changes, commit and push, create a git commit, push after committing, or mentions "/commit". Defaults to committing all uncommitted work, asks before including changes outside the known task context, verifies readiness before committing, creates at least one commit for the selected changes, and asks whether to push unless the user already requested a push.
license: MIT
allowed-tools: Bash
---

# Git Commit and Push

Create a Conventional Commit from selected uncommitted work, then optionally push it. The default is to commit all uncommitted code, but never silently include changes whose purpose is outside the known task context.

## Commit Format

Use Conventional Commits:

```text
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

Types:

| Type | Use |
| --- | --- |
| `feat` | New feature |
| `fix` | Bug fix |
| `docs` | Documentation only |
| `style` | Formatting only |
| `refactor` | Refactor without feature or bug fix |
| `perf` | Performance improvement |
| `test` | Tests |
| `build` | Build system or dependencies |
| `ci` | CI configuration |
| `chore` | Maintenance |
| `revert` | Revert |

Use `!` after the type or scope, or a `BREAKING CHANGE:` footer, when the selected diff contains a breaking change.

## Workflow

1. Read the repository state.
   Completion criterion: you know the current branch, staged files, unstaged files, untracked files, and the diff summary for every changed file.

   ```bash
   git branch --show-current
   git status --porcelain=v1
   git diff --stat
   git diff --staged --stat
   git ls-files --others --exclude-standard
   ```

2. Classify the changed files.
   Completion criterion: each changed file is marked as known, unknown, or blocked.

   - Known: the file was changed for the current user request, was explicitly mentioned by the user, or has an obvious generated-output relationship to the current task.
   - Unknown: the file was not changed by you in the current task, was not mentioned by the user, or its purpose is not clear from the current context.
   - Blocked: the file appears to contain secrets, credentials, private keys, `.env` content, unrelated large binaries, dependency dumps, or destructive/generated churn that should not be committed without explicit instruction.

3. Choose the commit scope.
   Completion criterion: there is an explicit selected file set, or the user chose not to commit.

   - If all changed files are known and none are blocked, select all changed files by default.
   - If any file is unknown, ask the user before staging. Offer these options: "commit all changes", "commit only `<known-or-specified-files>`", and "do not commit".
   - If any file is blocked, stop and ask the user how to handle it. Do not offer "commit all changes" until the blocked concern is resolved.
   - If the user chooses "do not commit", stop and report that no commit was created.

4. Verify the selected changes are ready to commit.
   Completion criterion: required tests, checks, formatting, build steps, or manual validation for the selected change have passed, or you have a concrete reason why no runnable verification exists.

   - Use project instructions first.
   - If there is no explicit test command, infer the smallest relevant check from the changed files.
   - If no automated check applies, inspect the diff and state the manual/static validation performed.
   - Do not commit with known failing checks unless the user explicitly instructs you to commit anyway.

5. Stage exactly the selected files.
   Completion criterion: `git diff --staged --name-only` contains the selected files and excludes unselected files.

   ```bash
   git restore --staged -- <unselected-files>
   git add -A -- <selected-files>
   git diff --staged --name-only
   git diff --staged --check
   ```

   If all changed files are selected, `git add -A` is acceptable. If no files remain staged after this step, stop instead of creating an empty commit.

   If `git diff --staged --check` reports whitespace or conflict-marker problems, fix them or ask the user before committing.

6. Create at least one commit.
   Completion criterion: `git commit` succeeds and `git rev-parse --short HEAD` returns the new commit.

   - Generate the message from the staged diff.
   - Prefer one commit for the selected scope. Split only when the selected changes contain independent logical changes that would make one message misleading.
   - Do not create an empty commit.
   - Do not amend an existing commit unless the user explicitly asked for amend.
   - Do not use `--no-verify` unless the user explicitly asked to skip hooks.

   ```bash
   git diff --staged
   git commit -m "<type>[optional scope]: <description>"
   git rev-parse --short HEAD
   ```

7. Handle push intent.
   Completion criterion: you either pushed the new commit or recorded that the user chose not to push.

   - If the user already asked to push, push after the commit.
   - If the user did not clearly ask to push, ask whether to push. Offer these options: "push now", "do not push", and "show status first".
   - Before pushing, check the current branch and upstream. Use the current branch; do not force push.
   - If no upstream exists, use `git push -u origin HEAD` only when `origin` exists and the user approved pushing.
   - Never force push to `main` or `master`.

   ```bash
   git status --short --branch
   git remote -v
   git push
   ```

## Safety Rules

- Never update Git config.
- Never run destructive Git commands such as hard reset, clean, or force push unless the user explicitly asks.
- Never commit secrets or credentials.
- Never leave unrelated files staged.
- If hooks fail, fix the issue and run a new `git commit`; do not amend unless the user asked for amend.
- After committing, report the commit hash, commit message, verification performed, and push result or pending push decision.
