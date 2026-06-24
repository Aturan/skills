---
name: git-create-branch
description: Use when creating a git branch for a new feature or bugfix from user instruction, backlog items, or specs. Determines the base branch, checks the current branch and working tree, names branches with feature/ or bugfix/ prefixes, and creates the branch only from a confirmed base branch.
---

# Git Create Branch

Create implementation branches from a confirmed base branch. Do not create a branch from another implementation, experiment, work-in-progress, or temporary branch.

## Workflow

1. Determine the base branch.
   Completion criterion: use the user-specified base branch if provided; otherwise detect `origin` HEAD, then fall back to local `main` or `master`. If no base branch is clear, ask the user.

   ```bash
   git remote show origin 2>/dev/null | grep 'HEAD branch' | awk '{print $NF}'
   git branch --list main --list master
   ```

2. Check the current branch.
   Completion criterion: you know whether `git branch --show-current` matches the base branch.

   ```bash
   git branch --show-current
   ```

3. Check the working tree before switching or creating.
   Completion criterion: `git status --porcelain` is empty. If it has any output, stop and ask the user to commit, stash, or clean the changes first.

   ```bash
   git status --porcelain
   ```

4. Move to the base branch if needed.
   Completion criterion: if the current branch is `feature/*` or `bugfix/*`, switch to the base branch and re-check the current branch. If the current branch is any other non-base branch, stop and ask the user how to proceed.

   ```bash
   git checkout <base-branch>
   git branch --show-current
   ```

5. Choose the branch name.
   Completion criterion: the branch name follows `<type>/<short-description>`, where type is `feature` for new capability or enhancement and `bugfix` for defect correction.

6. Confirm before creating.
   Completion criterion: the user has confirmed the base branch and final branch name.

7. Create and verify the branch.
   Completion criterion: `git checkout -b <branch-name>` succeeds and `git branch --show-current` returns the new branch.

   ```bash
   git checkout -b feature/<description>
   git branch --show-current
   ```

## Naming

Use:

```text
feature/<short-description>
bugfix/<short-description>
```

Description rules:

- Use lowercase letters, numbers, and hyphens only.
- Keep it short, usually 3-5 words.
- Derive it from the backlog item, spec summary, or user request.
- Remove articles and filler words.
- Do not use underscores, camelCase, or spaces.

Examples:

| Input | Branch |
| --- | --- |
| User authentication with OAuth | `feature/user-authentication-oauth` |
| Fix the login timeout bug | `bugfix/login-timeout` |
| API rate limiting middleware | `feature/api-rate-limiting` |

## Stop Conditions

Stop instead of creating a branch when:

- The working tree is not clean.
- The current branch is not the base branch and is not a `feature/*` or `bugfix/*` branch.
- The base branch cannot be determined.
- The branch name would use `fix/`, underscores, camelCase, spaces, or an unclear type.
- The user has not confirmed the base branch and branch name.

## Report

After creating the branch, report:

- Base branch used.
- New branch name.
- Whether the working tree was clean before creation.
