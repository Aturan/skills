---
name: readme-maintainer
description: Maintain README documentation with the Facade-Index method. Use when the user asks to create, update, review, prune, or sync README files, or when public behavior, setup, APIs, CLI commands, configuration, repository structure, or living specs have changed and README documentation may need to follow.
---

# Writing READMEs

A README is a facade and an index. It should help a reader understand what the project or module does, how to start safely, and where the canonical details live. It should not become the source of truth for implementation details, long business rules, or algorithm explanations.

## Workflow

1. Identify the affected README and source material.
   Completion criterion: you know which `README.md` files may need edits and which contracts, specs, code, scripts, or workflows are authoritative.

2. Gate the edit on public relevance.
   Completion criterion: if the change only affects private implementation and does not change user-visible behavior, setup, APIs, configuration, commands, file layout, or spec links, leave the README unchanged and report that decision.

3. Check the opening one-liner.
   Completion criterion: the first description states `[subject] + [core action] + [reader problem solved]` without leading with stack choices or implementation trivia.

4. Prune structure trees when layout documentation is needed.
   Completion criterion: any tree is an ASCII cognitive map, omits noise such as `node_modules/`, caches, generated files, and routine tests, and gives each included entry one clear responsibility comment.

   ```text
   src/middleware/  # verifies JWTs before protected routes run
   ```

5. Sync public contracts.
   Completion criterion: examples document only public API, CLI, setup, configuration, inputs, outputs, errors, and observable side effects. Include a minimal success path and a minimal failure path when the contract has meaningful failure behavior.

6. Index canonical detail.
   Completion criterion: long rules, option tables, algorithms, and deep implementation notes are replaced or summarized by links to living specs, API references, design docs, or workflow docs. Do not add backlinks to upstream docs such as higher-level READMEs, `AGENTS.md`, or `CLAUDE.md` unless the current README needs them for navigation.

7. Patch conservatively.
   Completion criterion: preserve the author's structure and tone where possible, edit only the affected sections, and keep Markdown fences, language tags, commands, paths, and links correct.

## Rules

- Do not update a README for an internal refactor with no public effect.
- Do not copy large spec content into a README; link to the canonical document instead.
- Do not generate full directory dumps. Show only entries that help the reader navigate.
- Mark risky or surprising commands with their side effects, such as installing system packages, deleting data, opening network access, or changing external state.
- Prefer local conventions already present in the README over a new template.

## Report

After README maintenance, report briefly:

- Which README files changed or why none changed.
- Whether the one-liner, structure tree, contract examples, and spec index were changed or left as-is.
- Any source material that was missing or uncertain.
