---
name: writing-clearly-and-concisely
description: Use when writing or polishing prose humans will read in English or Chinese, including documentation, commit messages, error messages, explanations, reports, UI text, or bilingual skill docs. Routes English through Elements of Style and Chinese through the inline Chinese route plus the internal typography guide.
---

# Writing Clearly and Concisely

## Overview

Write with clarity and force in the language of the draft. This skill is the single writing-polish entry point:

- English prose uses Strunk's *Elements of Style* and AI-pattern checks.
- Chinese prose uses the Chinese route in this file and, for typography and mixed Chinese/English text, `chinese-documentation-guide.md`.
- Bilingual prose is checked language by language; preserve facts and intent across both versions.

## When to Use This Skill

Use this skill whenever you write or polish prose for humans:

- Documentation, README files, technical explanations
- Commit messages, pull request descriptions
- Error messages, UI copy, help text, comments
- Reports, summaries, or any explanation
- Editing to improve clarity
- English/Chinese counterpart files for skills or docs

**If you're writing sentences for a human to read, use this skill.**

## Language Route

1. Identify the language of each draft or target output.
   Completion criterion: every paragraph or file is classified as English, Chinese, or bilingual.

2. For English prose, apply the English route.
   Completion criterion: the prose uses active voice where natural, positive form, concrete language, tight paragraph structure, and no needless words or AI-pattern filler.

3. For Chinese prose, apply the Chinese route in this file.
   Completion criterion: the prose is accurate, concise, concrete, and preserves facts, scope, risk, and responsibility.

4. For Chinese technical docs or Chinese/English mixed text, also apply `chinese-documentation-guide.md`.
   Completion criterion: spacing, punctuation, casing, links, numbers, units, and terminology follow the guide.

5. For bilingual files, polish both sides separately and compare behavior.
   Completion criterion: English and Chinese versions have the same facts, constraints, steps, exceptions, filenames, and user-visible intent unless the task explicitly asks for a non-literal adaptation.

## Limited Context Strategy

When context is tight:

1. Write your draft using judgment
2. For English, load only the relevant `elements-of-style/` file; for Chinese typography, load `chinese-documentation-guide.md`
3. Have the subagent copyedit and return the revision

Loading one reference file instead of every reference saves context. Chinese expression rules are already in this file.

## English Route

William Strunk Jr.'s *The Elements of Style* (1918) teaches you to write clearly and cut ruthlessly.

### Rules

**Elementary Rules of Usage (Grammar/Punctuation)**:

1. Form possessive singular by adding 's
2. Use comma after each term in series except last
3. Enclose parenthetic expressions between commas
4. Comma before conjunction introducing co-ordinate clause
5. Don't join independent clauses by comma
6. Don't break sentences in two
7. Participial phrase at beginning refers to grammatical subject

**Elementary Principles of Composition**:

8. One paragraph per topic
9. Begin paragraph with topic sentence
10. **Use active voice**
11. **Put statements in positive form**
12. **Use definite, specific, concrete language**
13. **Omit needless words**
14. Avoid succession of loose sentences
15. Express co-ordinate ideas in similar form
16. **Keep related words together**
17. Keep to one tense in summaries
18. **Place emphatic words at end of sentence**

### Reference Files

The rules above are summarized from Strunk's original text. For complete explanations with examples:

| Section | File | ~Tokens |
|---------|------|---------|
| Grammar, punctuation, comma rules | `02-elementary-rules-of-usage.md` | 2,500 |
| Paragraph structure, active voice, concision | `03-elementary-principles-of-composition.md` | 4,500 |
| Headings, quotations, formatting | `04-a-few-matters-of-form.md` | 1,000 |
| Word choice, common errors | `05-words-and-expressions-commonly-misused.md` | 4,000 |

**Most tasks need only `03-elementary-principles-of-composition.md`** — it covers active voice, positive form, concrete language, and omitting needless words.

## Chinese Route

把重要中文正文改得清楚、简短、具体。核心原则：先让读者准确理解，再删掉不必要的词。

Use the Chinese route for Chinese documentation, README text, technical explanations, commit messages, pull request descriptions, release notes, error messages, UI copy, help text, comments, reports, and summaries.

Do not use the Chinese route for English prose; use the English route.

Quick reference:

| Situation | Fix |
| --- | --- |
| Wordy | Delete throat-clearing, boilerplate, repeated qualifiers |
| Vague | Name the concrete object, action, and result |
| Hard to scan | Split long sentences and reorder into steps or points |
| Weak tone | Use active voice and positive statements |
| Chinese typography or terminology issue | Use `chinese-documentation-guide.md` |

Core pattern:

1. Identify the reader and publication surface.
2. Preserve facts, constraints, conclusions, risk, and necessary tone.
3. Delete words and sentences that do not change meaning.
4. Turn abstract judgments into actionable or verifiable statements.
5. Put emphasis where the reader is most likely to see it.
6. Check Chinese typography, Chinese/English spacing, term casing, and link formatting.

Common mistakes:

- Shortening the text while deleting scope, risk, or conditions.
- Making the text more formal without making it clearer.
- Omitting the actor in the name of brevity, leaving responsibility unclear.
- Explaining Chinese typography rules instead of applying `chinese-documentation-guide.md`.

For Chinese documentation, Chinese UI text with English terms, or any Chinese/English mixed prose, also use `chinese-documentation-guide.md`.

## AI Writing Patterns to Avoid

LLMs regress to statistical means, producing generic, puffy prose. Avoid:

- **Puffery:** pivotal, crucial, vital, testament, enduring legacy
- **Empty "-ing" phrases:** ensuring reliability, showcasing features, highlighting capabilities
- **Promotional adjectives:** groundbreaking, seamless, robust, cutting-edge
- **Overused AI vocabulary:** delve, leverage, multifaceted, foster, realm, tapestry
- **Formatting overuse:** excessive bullets, emoji decorations, bold on every other word

Be specific, not grandiose. Say what it actually does.

For comprehensive research on why these patterns occur, see `signs-of-ai-writing.md`. Wikipedia editors developed this guide to detect AI-generated submissions — their patterns are well-documented and field-tested.

## Bottom Line

Writing for humans? Route by language, load the smallest relevant reference, and apply it. English usually needs `03-elementary-principles-of-composition.md`; Chinese expression rules are in this file, with `chinese-documentation-guide.md` for typography.
