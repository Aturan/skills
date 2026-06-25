---
name: using-context7
description: Use when deciding whether a developer question needs current documentation through Context7. Trigger for questions about a library, framework, SDK, API, CLI tool, or cloud service; prefer local authoritative sources such as installed CLI help, repository docs, and source definitions for initial understanding, then route to the find-docs skill when current external docs can affect the answer.
---

# Using Context7

Use this skill as a gate for documentation lookup. Prefer local authoritative sources for initial understanding, then invoke `$find-docs` when the answer depends on current external documentation. `$find-docs` is the source of truth for Context7 library resolution, docs fetching, command limits, version-specific IDs, quota handling, sensitive-data handling, and sandbox or network retries.

## Workflow

1. Classify the user's request.
   Completion criterion: you know whether the request asks about a specific library, framework, SDK, API, CLI tool, or cloud service.

2. Check local authoritative sources first when they can answer the immediate question.
   Completion criterion: installed CLI help such as `<command> --help`, repository README or docs, local config, lockfiles, type definitions, generated schemas, or source definitions have been used when they are available, relevant, and sufficient for the user's level of detail.

3. Invoke `$find-docs` when current external documentation can affect the answer.
   Completion criterion: `$find-docs` is selected for API syntax, configuration options, version migration, library-specific debugging, setup instructions, CLI usage, or "how do I" questions that name a developer technology.

4. Do not invoke `$find-docs` when local sources are enough for initial understanding.
   Completion criterion: quick orientation, installed CLI option lookup, local project usage, and repository-specific behavior proceed from local evidence unless the user asks for official/current docs or local evidence is missing, stale, ambiguous, or contradicted.

5. Do not invoke `$find-docs` for repository-local work that does not depend on current external docs.
   Completion criterion: refactoring, writing scripts from scratch, debugging business logic, code review, and general programming concepts proceed without Context7 unless the request specifically turns on a library, framework, SDK, API, CLI tool, or cloud-service behavior.

6. Let `$find-docs` own Context7 execution.
   Completion criterion: after `$find-docs` is selected, follow its `SKILL.md` rather than duplicating or modifying Context7 commands here.

## Examples

Use `$find-docs` for:

- "How do I configure middleware in Next.js?"
- "What is the current Prisma relation syntax?"
- "Why does this React hook warning happen?"
- "Show me the CLI option for deploying with Cloudflare Workers."

Skip `$find-docs` for:

- "What options does this installed CLI expose?" when `<command> --help` is enough.
- "What does this package do?" when the local README or source answers it.
- "Refactor this module."
- "Write a small JSON cleanup script."
- "Review this pull request."
- "Explain dependency injection as a general concept."

## Boundaries

- Do not answer library, framework, SDK, API, CLI, or cloud-service details from memory when local evidence is insufficient and `$find-docs` applies.
- Do not use Context7 for a first pass when an installed tool's `--help` or repository-local docs answer the question.
- Do not copy Context7 command instructions into this skill; keep them in `$find-docs`.
- Do not send secrets, credentials, personal data, or proprietary code into documentation queries.
