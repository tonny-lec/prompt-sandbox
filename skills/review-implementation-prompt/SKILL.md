---
name: review-implementation-prompt
description: Review implementation prompts before coding work. Use when the user asks Codex to check, critique, diagnose, or improve a prompt intended for feature work, bug fixes, refactors, tests, or other codebase changes before sending it to Codex for implementation.
---

# Review Implementation Prompt

Use this skill to review a user-written implementation prompt before any coding work begins. Treat the task as prompt review, not implementation.

## Ground Rules

- Do not implement code or start making codebase changes.
- Do not inspect a target codebase unless the prompt-review request explicitly includes codebase files, diffs, or artifacts to review against.
- Do not turn the response into a generic writing polish pass; focus on how Codex is likely to interpret and execute the implementation request.
- Do not use numeric scores, readiness ratings, or labels such as "Ready", "Needs Context", or "Risky".
- Do not produce a full rewritten prompt unless the user explicitly asks for one.
- Respond in the user's language when practical. If the user writes in Japanese, use Japanese section headings and comments by default.

## Review Workflow

1. Restate what Codex is likely to understand:
   - The implementation goal.
   - The expected deliverable.
   - The assumptions Codex may silently make.

2. Predict the likely Codex workflow:
   - What Codex would inspect first.
   - What it would need to confirm before editing.
   - Which files, modules, tests, or user-facing behavior it might change.
   - Which verification steps it may run.
   - Where it may have to guess.

3. Identify missing or weak prompt context:
   - Target files, components, screens, APIs, commands, or workflows.
   - Relationship to existing implementation and conventions.
   - Allowed and forbidden change scope.
   - Expected output shape.
   - Completion criteria.

4. Call out ambiguous or hazardous instructions:
   - Broad phrases like "make it good", "as appropriate", "if needed", or "improve overall".
   - Mixed behavior changes and cleanup without priority.
   - Hidden refactors or speculative abstractions.
   - Instructions that could spread into adjacent code.
   - Tests or checks that could pass without proving the intended behavior.

5. Suggest improvements:
   - High-impact details to add.
   - Overly prescriptive or distracting details to remove.
   - Decisions Codex can safely make.
   - Decisions the user should specify.
   - Clarifying questions that should be separated from the implementation prompt.

## Response Shape

Use concise structured comments. Match the user's language. For Japanese requests, prefer this structure:

```text
読み取れる依頼内容:
- ...

Codexの想定作業フロー:
- ...

不足している文脈:
- ...

曖昧または危険な指示:
- ...

改善コメント:
- ...
```

For English requests, use:

```text
What Codex Will Likely Understand:
- ...

Likely Codex Workflow:
- ...

Missing Context:
- ...

Ambiguous Or Hazardous Instructions:
- ...

Improvement Comments:
- ...
```

If a section has no findings, say so briefly instead of inventing issues.

## Optional Improved Prompt

Only include a rewritten implementation prompt when the user explicitly asks for one. Keep it faithful to the user's intent, preserve uncertainty instead of inventing project facts, and separate assumptions or open questions from instructions Codex should execute.
