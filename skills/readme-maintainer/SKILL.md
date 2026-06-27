---
name: readme-maintainer
description: Maintain the root `README.md` or `docs/README.md` with the Facade-Index method. Use when the user asks to create, update, review, prune, or sync these README entry points, or when public behavior, setup, APIs, CLI commands, configuration, repository structure, cross-module contracts, documentation inventory, or documentation navigation has changed and a README entry point may need to follow.
---

# Writing READMEs

A README is a facade and an index. It should help a reader understand what the project does, how to start safely, and where the canonical details live. It should not become the source of truth for implementation details, long business rules, or algorithm explanations.

## README Scope

- **Repository README**: the root entry point for the repository. It owns discovery, safe first start, global setup, global commands, repository conventions, top-level structure, cross-module contracts, cross-module navigation, and repository-wide risky commands.
- **Documentation README**: `docs/README.md` is the entry point for long-lived documentation. It owns the docs inventory, documentation navigation, and links to ADRs, PRDs, design docs, specs, and agent collaboration notes.

The repository treats the root `README.md` and `docs/README.md` as the only README surfaces. Put durable design context in `docs/`, ADRs, or PRDs; put implementation-adjacent constraints in code interfaces, types, tests, or necessary comments; put repeatable workflows in skills or scripts. The root README may summarize these facts and link to their canonical source.

## Workflow

1. Identify the target `README.md` and source material.
   Completion criterion: you know whether the root `README.md`, `docs/README.md`, both, or neither may need edits and which contracts, specs, code, scripts, docs, or workflows are authoritative.

2. Apply the README scope.
   Completion criterion: the root README covers repository discovery, global startup, global conventions, cross-module contracts, top-level layout, documentation navigation, and repository-wide risky commands; `docs/README.md` covers only the documentation inventory and documentation navigation.

3. Gate the edit on public relevance.
   Completion criterion: leave README files unchanged and report that decision when the change only affects private implementation. Update the root README only when the repository entry point, global workflow, cross-module behavior, top-level layout, documentation navigation, setup, commands, or repository-wide risks change. Update `docs/README.md` only when the docs inventory, docs navigation, or canonical documentation locations change.

4. Check the opening one-liner.
   Completion criterion: the first description states `[subject] + [core action] + [reader problem solved]` without leading with stack choices or implementation trivia.

5. Prune structure trees when layout documentation is needed.
   Completion criterion: any tree is an ASCII cognitive map, omits noise such as `node_modules/`, caches, generated files, and routine tests, and gives each included entry one clear responsibility comment. Trees show only top-level navigation.

   ```text
   src/middleware/  # verifies JWTs before protected routes run
   ```

6. Sync public contracts.
   Completion criterion: examples document only public API, CLI, setup, configuration, inputs, outputs, errors, and observable side effects. Examples cover cross-module or whole-repository behavior. Include a minimal success path and a minimal failure path when the contract has meaningful failure behavior.

7. Index canonical detail.
   Completion criterion: long rules, option tables, algorithms, and deep implementation notes are replaced or summarized by links to living specs, API references, design docs, workflow docs, scripts, or skills. Do not add backlinks to `AGENTS.md` or `CLAUDE.md` unless the current README needs them for navigation.

8. Patch conservatively.
   Completion criterion: preserve the author's structure and tone where possible, edit only the affected sections, and keep Markdown fences, language tags, commands, paths, and links correct.

## Rules

- Do not update a README for an internal refactor with no public effect.
- Do not copy large spec content into a README; link to the canonical document instead.
- Do not generate full directory dumps. Show only entries that help the reader navigate.
- Do not create module-level `README.md` files to explain module behavior.
- Do not duplicate detailed module usage in README entry points; summarize it and link to `docs/`, code-level contracts, scripts, or skills.
- Mark risky or surprising commands with their side effects, such as installing system packages, deleting data, opening network access, or changing external state.
- Prefer existing conventions already present in the README over a new template.

## Report

After README maintenance, report briefly:

- Which README entry point changed, or why both stayed unchanged.
- Whether the one-liner, structure tree, contract examples, and spec index were changed or left as-is.
- Whether any duplicated fact was moved, summarized, or linked.
- Any source material that was missing or uncertain.
