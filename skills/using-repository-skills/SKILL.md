---
name: using-repository-skills
description: Use when starting work in a repository that provides skills, to decide whether repository skills apply before responding or acting
---

<SUBAGENT-STOP>
If you were dispatched as a subagent to execute a specific task, skip this skill.
</SUBAGENT-STOP>

# Using Repository Skills

Repository skills define reusable ways of working in this repository. Before responding, asking clarifying questions, exploring files, or acting on a task, check whether a repository skill applies.

## Instruction Priority

When instructions conflict, follow this order:

1. **User and repository instructions**
2. **Loaded repository skills**
3. **Default agent behavior**

Repository skills guide how to work in this repository, but they do not override explicit user or repository instructions.

## Core Rule

If a repository skill applies to the current task, load and follow it before responding or acting. If a requested or loaded skill turns out not to fit the task, state that briefly and continue with the applicable instructions.

Check for skills before:

- Answering a question
- Asking clarifying questions
- Reading or searching files
- Planning work
- Editing files
- Running tools

## Selection Order

When multiple skills may apply:

1. Use process skills first; they define how to approach the task.
2. Use domain or implementation skills next; they guide the specific work.
3. If skills conflict, follow the more specific applicable skill unless user or repository instructions say otherwise.

## Red Flags

These thoughts mean stop and check repository skills first:

| Thought | Reality |
| --- | --- |
| "This is just a simple question." | Questions are tasks. Check for skills. |
| "I need more context first." | Skills may define how to gather context. |
| "I'll read files quickly first." | Skills may define what to read and in what order. |
| "I remember the rule." | Skills can change. Load the current version. |
| "This skill is probably overkill." | If it applies, use it. |
| "I'll do this one thing first." | Check before acting. |

## Skill Types

- **Rigid skills** define mandatory workflows. Follow them exactly unless user or repository instructions override them.
- **Flexible skills** define patterns or judgment aids. Apply their principles to the current task.
- **Reference skills** provide lookup material. Use only the relevant parts.

## User Instructions

User instructions say what outcome is needed. Repository skills guide how to work toward that outcome. If a user explicitly asks not to use a skill or provides a conflicting repository-level instruction, follow the user or repository instruction.
