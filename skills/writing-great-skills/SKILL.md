---
name: writing-great-skills
description: Use when creating or editing agent skills, including drafting SKILL.md, syncing SKILL-zh.md, changing frontmatter, triggers, workflows, references, or pruning an existing skill.
disable-model-invocation: true
---

# Writing Great Skills

A skill exists to wrangle determinism out of a stochastic system. **Predictability** means the agent takes the same process every run, not that it produces the same output.

Use this skill when creating or editing a skill. The output is a single skill package whose `SKILL.md` is enough for an agent to run the process, with any required reference either inline or in the same skill directory. Do not depend on another skill for required behavior.

## Workflow

1. Define the skill contract.
   Completion criterion: you know the skill's purpose, invocation mode, primary reader, branches, required outputs, and whether the Chinese-only exception applies.

2. Write a red checklist before editing.
   Completion criterion: you have a short checklist that currently fails and names the observable behavior the finished skill must satisfy.

3. Draft the English `SKILL.md`.
   Completion criterion: the agent can run the skill from this file alone; every step has a checkable completion criterion; required reference is inline or stored inside this skill directory.

4. Draft the Chinese counterpart.
   Completion criterion: `SKILL-zh.md` exists unless the skill itself is for a Chinese-only scenario; it has frontmatter with the same `name` and invocation fields, and its `description` is Chinese trigger language equivalent to the English description; it matches the English file's triggers, steps, exceptions, filenames, and references; it is not a loose summary.

5. Turn the checklist green.
   Completion criterion: every red item passes against the written files, including bilingual parity unless the Chinese-only exception applies.

6. Refactor and prune.
   Completion criterion: each meaning has one source of truth, no required rule lives outside the skill package, and no sentence survives unless it changes agent behavior or human maintenance.

## Document TDD

Use TDD as a writing loop, not as ceremony.

- **Red**: write one failing checklist item for one behavior, such as "the skill tells the agent when to ask the user" or "the Chinese file contains the same exception list."
- **Green**: make the smallest document change that satisfies that item.
- **Refactor**: after the checklist passes, reorganize, rename headings, collapse duplication, and trim no-ops without changing behavior.

Avoid horizontal slices. Do not write a large checklist, then a whole document, then check it once. Work in tracer bullets: one failing item, one document change, one pass, repeat. The checklist should test observable behavior through the public surface of the skill: frontmatter, steps, completion criteria, references, and examples. Do not test wording trivia unless wording controls invocation or execution.

Per cycle:

- The item names behavior, not implementation.
- The item is checkable by reading the skill files.
- The edit is minimal for the item.
- The skill is green before refactoring.

## Invocation

Choose the invocation mode before writing the body.

- **Model-invoked** skills keep a `description`, so the agent can trigger them autonomously and other skills can reach them. Use this only when independent agent discovery is worth the permanent context load. Write the description as trigger language: "Use when the user wants..., mentions..., needs...."
- **User-invoked** skills set `disable-model-invocation: true`. The human must type the skill name, and other skills cannot invoke it. Use this when human judgment should decide when the skill runs.
- A **router skill** is a user-invoked skill that names other user-invoked skills and when to use them. Use one when the human has too many manual skills to remember.

For model-invoked descriptions:

- Front-load the leading word or domain phrase users will actually type.
- Keep one trigger per branch; synonyms for the same branch are duplication.
- Cut identity that is already explained in the body.
- Keep any "when another skill needs..." reach clause only if another skill genuinely must invoke it.

## Information Hierarchy

A skill contains **steps** and **reference**.

1. **In-skill steps** are ordered actions in `SKILL.md`. They are the primary tier when the skill has a process. Each step ends with a completion criterion.
2. **In-skill reference** is a definition, rule, example, or fact that the agent consults while running the steps.
3. **Internal reference** is a sibling file inside the same skill directory, reached by a context pointer only when a branch needs it.

Inline what every branch needs. Move branch-only reference into an internal file when it would otherwise bury the steps. If a required pointer fires unreliably, sharpen the pointer first; inline the material only if the pointer still fails.

Use **co-location**: keep a concept's definition, rules, caveats, and examples under one heading. Do not scatter one concept across the file.

## Steps and Criteria

Every step needs a completion criterion. Good criteria are:

- **Checkable**: the agent can tell done from not-done.
- **Demanding**: the criterion forces the needed legwork, such as "every modified file has a matching Chinese counterpart" instead of "check translations."
- **Local**: the criterion belongs to the current step, not a later cleanup phase.

Vague criteria invite premature completion. Sharpen the criterion before splitting the skill. Split by sequence only when later steps visibly pull the agent past a fuzzy current step.

## Bilingual Skill Writing

Using this skill means producing English and Chinese versions by default:

- Write the English file for agent execution.
- Write the Chinese file for human reading and maintenance.
- The only exception is a skill whose subject and use are explicitly Chinese-only; in that case, write it directly in Chinese and record the exception in the work summary.
- Keep the two files behaviorally identical: same invocation rules, steps, completion criteria, branch conditions, exceptions, filenames, and internal references.
- Give the Chinese file its own frontmatter. Keep `name` and invocation-control fields such as `disable-model-invocation` aligned with the English file. Write `description` as Chinese trigger language that is behaviorally equivalent to the English description; do not copy the English text or replace triggers with a loose summary.
- Do not make the Chinese version a summary, commentary, or looser explanation.
- When changing either file, update the other in the same change.
- If the repository or available skills include `writing-clearly-and-concisely`, invoke it when polishing the English and Chinese files. It routes each language to the right writing rules; treat it as an optional polish pass, not as a required dependency for running this skill.

## Pruning

After the skill works, prune it.

- **Single source of truth**: each meaning lives in one authoritative place.
- **Relevance**: every line still bears on what the skill does.
- **No-op test**: ask whether the sentence changes agent behavior versus the default. Delete the whole sentence when it does not.
- **Sediment**: remove stale layers that remain only because adding felt safer than deleting.
- **Sprawl**: if the skill is long even after pruning, move branch-only reference into internal files or split only when invocation or sequence earns the new skill.

## Leading Words

A **leading word** is a compact concept already living in the model's pretraining that anchors behavior, such as `tracer bullet`, `red`, `green`, `refactor`, `router`, or `single source of truth`.

Use leading words to collapse repeated explanation into one stable hook. A leading word earns its place only if it changes behavior. If it is too weak to change behavior, it is a no-op.

## Final Checklist

- The frontmatter matches the chosen invocation mode.
- The description, if present, lists distinct triggers rather than synonyms.
- The steps are in the order the agent should execute them.
- Every step has a checkable completion criterion.
- Required reference is inline or inside the skill directory.
- Branch-only reference does not bury the main path.
- English and Chinese files both exist, both have frontmatter, and are behaviorally identical, unless the Chinese-only exception is explicit.
- `writing-clearly-and-concisely` was used for English and Chinese polish when that skill exists.
- No external skill is required to execute the skill.
- Duplicate, stale, and no-op sentences have been deleted.
