---
name: using-repository-skills
description: Use at the start of work in a repository that may provide repository-local skills. Before answering, exploring, planning, editing, or running tools, select, load, and follow applicable repository skills; skip only for delegated subagents executing a specific task.
---

<SUBAGENT-STOP>
If you were dispatched as a subagent to execute a specific task, skip this skill.
</SUBAGENT-STOP>

# Using Repository Skills

Repository skills are part of task setup. They define how this repository expects work to be done, so check them before ordinary reasoning or file exploration.

## Workflow

1. Check whether this run is exempt.
   Completion criterion: if you are a delegated subagent with a specific task, stop using this skill; otherwise continue.

2. Find candidate repository skills.
   Completion criterion: you have checked the skills already listed in context and any repository skill locations named by repo instructions, such as `skills/` or `.agents/skills/`, enough to know which candidates may apply.

3. Select applicable skills before task work.
   Completion criterion: every skill whose trigger matches the user's request, repository context, or planned work has been selected. Do this before answering, asking clarifying questions, searching files, planning, editing, or running task tools.

4. Load selected skills completely.
   Completion criterion: each selected `SKILL.md` has been read fully, including any required references named by that skill for the current branch.

5. Apply skills in order.
   Completion criterion: process skills guide the approach first; domain, implementation, or reference skills guide the specific work next. If two skills conflict, follow the more specific applicable skill unless user or repository instructions override it.

6. Continue when a skill does not fit.
   Completion criterion: if a requested or selected skill turns out not to apply, state that briefly and proceed with the remaining applicable instructions.

## Priority

When instructions conflict, follow this order:

1. User and repository instructions.
2. Loaded repository skills.
3. Default agent behavior.

Repository skills guide how to work in the repository. They do not override explicit user instructions or higher-priority repository instructions.

## Red Flags

Stop and run the workflow above if you catch yourself thinking:

- "This is just a simple question."
- "I need to inspect files before choosing a skill."
- "I remember the rule."
- "This skill is probably overkill."
- "I'll do one quick thing first."
