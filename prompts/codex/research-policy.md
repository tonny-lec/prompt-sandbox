---
name: research-context
description: Use when Codex needs focused investigation, analysis, tracing, or evidence-based comparison before an implementation, debugging, or design decision.
---

# Research Context Skill for Codex GPT-5.5

## Purpose

Use this skill when focused investigation or analysis is needed before a reliable engineering answer, debugging decision, design decision, or implementation decision.

The goal is to gather the minimum sufficient evidence needed to make a safe engineering decision while keeping the main context clean, compact, and high-signal.

This skill is not a general operating policy. Use it only when the task benefits from focused research, analysis, tracing, or evidence-based comparison.

## When to Use

Use this skill when the task requires investigation before a safe answer, design decision, debugging decision, or implementation.

Typical triggers:
- relevant files, entry points, or ownership boundaries are unclear
- execution flow, data flow, state changes, side effects, or external calls need to be traced
- the task touches APIs, database behavior, authentication, authorization, batch jobs, infrastructure, CI, or external services
- multiple implementation options need evidence-based comparison
- the bug cause, regression risk, or validation strategy is unclear
- existing repository patterns need to be discovered before editing
- the change area is broad enough that direct investigation would likely pollute the main context

Do not use this skill when:
- the relevant implementation, risk, and validation path are already obvious
- the task is a trivial one-file change
- the task is a typo fix
- the task is an obvious local refactor
- the task is a low-risk mechanical edit
- the user only needs a direct answer and no repository investigation is required

## Research Goal

Gather only decision-relevant information:

- user intent and confirmed requirements
- relevant files, functions, classes, APIs, tests, and call sites
- execution flow, data flow, state changes, side effects, and external calls
- existing repository patterns
- available validation commands or validation path
- material risks
- unresolved uncertainty

Avoid returning:
- long raw command outputs
- broad exploratory notes
- duplicate findings
- unrelated files
- unsupported speculation
- full subagent transcripts unless explicitly requested

## Evidence Priority

Prefer evidence in this order:

1. Actual runtime behavior, failing tests, logs, or command results
2. Source code and actual call sites
3. Tests, fixtures, snapshots, and test names
4. Repository documentation, ADRs, and design docs
5. Comments, naming, and local conventions
6. User assumptions or prior agent summaries

Separate confirmed facts from assumptions.

When evidence conflicts, prefer runtime evidence and source code over documentation, comments, or prior summaries.

## Subagent Use

Use subagents to isolate exploratory work, not to make the process more elaborate.

Use the fewest useful subagents.

Use subagents when they are likely to:
- reduce main-context noise
- investigate separable concerns
- clarify unclear ownership boundaries
- trace complex execution or data flow
- improve evidence quality
- reduce uncertainty that blocks a safe decision

Common roles:

- explorer: find relevant files, entry points, ownership boundaries, and existing patterns
- flow_tracer: trace execution flow, data flow, state changes, side effects, and external calls
- test_mapper: find existing tests, fixtures, missing coverage, and validation commands
- risk_reviewer: identify correctness, security, data integrity, regression, and operability risks

Do not spawn subagents just because the task is non-trivial.

Prefer direct investigation when one or two obvious files can answer the question safely.

If subagents are used, keep their work isolated and return only distilled evidence to the main context.

## Subagent Reports

Subagent reports should be compact and evidence-based.

Return only:
- confirmed findings
- concrete evidence such as files, symbols, tests, commands, or short snippets
- material uncertainty
- recommendation when supported by evidence

Do not include broad exploration logs or full transcripts.

## Investigation Budget

Use the smallest investigation that can support a safe decision.

Prefer bounded investigation over comprehensive survey.

For most tasks, stop when the conclusion or implementation path is supported by:
- relevant source code
- at least one call site, data-flow reference, runtime result, or test
- an existing pattern when available
- a clear statement of material risks and unresolved uncertainty

Continue investigating only when missing evidence would materially affect:
- correctness
- safety
- data integrity
- production behavior
- regression risk
- validation strategy

Do not expand the investigation after the relevant change area, supporting evidence, validation path, and material risks are clear.

Do not continue searching only to make the answer more exhaustive, improve phrasing, or add nonessential confidence.

## Output Format

Return a compact research brief.

Include only the sections that are relevant.

### Summary

Short conclusion.

### Relevant Evidence

Key files, symbols, tests, commands, runtime evidence, or short snippets.

### Flow / Behavior

Execution flow, data flow, state changes, side effects, or external calls when relevant.

### Risks

Material correctness, security, data integrity, regression, production, or operability risks.

### Uncertainty

What could not be confirmed.

### Recommendation

Recommended implementation path, design direction, or next action.

### Audit Capsule

Include this section only for investigation-heavy tasks when it helps review the work.

Keep it to 5 lines or fewer:
- Subagents: used / not used, with brief reason
- Evidence: strongest evidence gathered
- Stop: why the investigation was sufficient
- Validation: checks run, available validation path, or why validation was not run
- Uncertainty: remaining material uncertainty

Omit the audit capsule for small or straightforward investigations.

Do not include raw logs unless they are essential.
