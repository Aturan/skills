---
name: readme-maintainer
description: Maintain a repository or local `README.md` with the Facade-Index method. Use when the user asks to create, update, review, prune, or sync a README, or when public behavior, setup, APIs, CLI commands, configuration, repository structure, module boundaries, or living specs have changed and a README may need to follow.
---

# Writing READMEs

A README is a facade and an index. It should help a reader understand what the project or module does, how to start safely, and where the canonical details live. It should not become the source of truth for implementation details, long business rules, or algorithm explanations.

## README Levels

- **Repository README**: the root entry point for the repository. It owns discovery, safe first start, global setup, global commands, repository conventions, top-level structure, cross-module contracts, cross-module navigation, and repository-wide risky commands.
- **Local README**: the entry point for a module, package, feature, or subdirectory. It owns the local purpose and non-goals, local public contract, local commands, local configuration, upstream and downstream boundaries, and links to local specs, examples, fixtures, or design notes.

Layer rule: keep detailed facts at the closest authoritative source and the level where the reader needs them. If both repository and local READMEs need the same fact, one level gets the detail and the other gets a one-sentence summary plus a link.

## Workflow

1. Identify the target `README.md` and source material.
   Completion criterion: you know which single `README.md` may need edits, whether it is a repository README or local README, and which contracts, specs, code, scripts, or workflows are authoritative.

2. Apply the README level.
   Completion criterion: repository READMEs cover repository discovery, global startup, global conventions, cross-module contracts, and navigation; local READMEs cover local responsibilities, public contract, local operation, boundaries, and local canonical references.

3. Gate the edit on public relevance.
   Completion criterion: leave the README unchanged and report that decision when the change only affects private implementation. For a repository README, update only when the repository entry point, global workflow, cross-module behavior, top-level layout, or navigation changes. For a local README, update only when that directory's public contract, usage, boundaries, commands, configuration, or local references change.

4. Check the opening one-liner.
   Completion criterion: the first description states `[subject] + [core action] + [reader problem solved]` without leading with stack choices or implementation trivia.

5. Prune structure trees when layout documentation is needed.
   Completion criterion: any tree is an ASCII cognitive map, omits noise such as `node_modules/`, caches, generated files, and routine tests, and gives each included entry one clear responsibility comment. Repository trees show only top-level navigation; local trees show only entries needed to use or modify that directory.

   ```text
   src/middleware/  # verifies JWTs before protected routes run
   ```

6. Sync public contracts.
   Completion criterion: examples document only public API, CLI, setup, configuration, inputs, outputs, errors, and observable side effects. Repository examples cover cross-module or whole-repository behavior; local examples cover that directory's contract. Include a minimal success path and a minimal failure path when the contract has meaningful failure behavior.

7. Index canonical detail.
   Completion criterion: long rules, option tables, algorithms, and deep implementation notes are replaced or summarized by links to living specs, API references, design docs, workflow docs, or lower-level READMEs. Do not add backlinks to upstream docs such as higher-level READMEs, `AGENTS.md`, or `CLAUDE.md` unless the current README needs them for navigation.

8. Patch conservatively.
   Completion criterion: preserve the author's structure and tone where possible, edit only the affected sections, and keep Markdown fences, language tags, commands, paths, and links correct.

## Rules

- Do not update a README for an internal refactor with no public effect.
- Do not copy large spec content into a README; link to the canonical document instead.
- Do not generate full directory dumps. Show only entries that help the reader navigate.
- Do not duplicate detailed local usage in a repository README; summarize it and link to the local README.
- Do not duplicate repository setup, contribution rules, or global background in a local README unless the local workflow cannot be performed without it.
- Mark risky or surprising commands with their side effects, such as installing system packages, deleting data, opening network access, or changing external state.
- Prefer local conventions already present in the README over a new template.

## Report

After README maintenance, report briefly:

- Which `README.md` changed, which level it was, or why none changed.
- Whether the one-liner, structure tree, contract examples, and spec index were changed or left as-is.
- Whether any duplicated fact was moved, summarized, or linked.
- Any source material that was missing or uncertain.
