---
name: to-requirement
description: Use when the user explicitly asks to turn confirmed brainstorming notes, a brainstorming report, or already-discussed context into a requirement issue and publish it to the project issue tracker.
disable-model-invocation: true
---

# To Requirement

Turn confirmed brainstorming material into a requirement issue and publish it to the project issue tracker. Do not interview the user when the existing confirmed material is enough; synthesize what is already known.

<HARD-GATE>
When confirmed material is missing or a fact would change the goal, scope, or acceptance boundary, ask the user to confirm that source or fact before publishing. Do not invoke another skill to fill the gap.
</HARD-GATE>

## Input Sources

Prefer the material the user specifies:

- A confirmed brainstorming report.
- Conclusions explicitly confirmed in the current conversation.
- Project docs, external docs, or fact sources specified by the user.

If the user does not specify a source, first check whether the current conversation is enough to support a requirement issue. If it is still insufficient, ask only the single most important blocking question.

## Issue Tracker

Publish by creating a project issue. In this repository, issues live in GitLab and must be created with `glab`.

Rules:

- Use the repository's issue tracker conventions when available.
- Create one issue for one coherent requirement.
- Apply the `ready-for-agent` label after creating the issue.
- Do not create issues for unresolved alternatives that still need user choice.
- Report the created issue identifier and URL to the user.

## Workflow

Follow these steps in order:

1. **Collect sources**: Read the report, conversation conclusions, and necessary fact sources specified by the user. Completion criterion: each key judgment has a source.
2. **Check confirmation state**: Separate confirmed facts, facts needing confirmation, assumptions, and external evidence. Completion criterion: no assumption is written as fact.
3. **Fill blocking gaps**: If a missing fact affects goal, scope, or acceptance, ask one question at a time. Completion criterion: the blocking question is answered, or publishing is stopped because the requirement is not ready.
4. **Write the issue body**: Read `references/issue-artifacts.md`, then rewrite the material into observable, verifiable requirement statements using its template. Completion criterion: the issue body describes what result the user needs, not how to implement it.
5. **Self-review**: Use `references/issue-artifacts.md` to check that the issue body is clear, testable, measurable, and traceable to sources. Completion criterion: issues found during review are fixed, or publishing is stopped because unresolved questions remain.
6. **Publish the issue**: Create the issue in the project issue tracker and apply `ready-for-agent`. Completion criterion: the issue exists in the tracker with the intended title, body, and label.
7. **Report result**: Tell the user the issue identifier, URL, and a brief summary. Completion criterion: the user can open the published issue.

## Boundaries

- Do not split the requirement into multiple issues unless the user asks.
- Do not create implementation design.
- Do not modify code.
- Do not write the requirement into long-lived documentation.
