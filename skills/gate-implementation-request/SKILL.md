---
name: gate-implementation-request
description: Check whether an implementation request is actionable before modifying code. Use when Codex is about to start implementation work such as feature additions, bug fixes, refactors, test additions, code generation, configuration changes, or codebase modifications, especially when ambiguity, scope, risk, or verification needs a quick gate.
---

# Gate Implementation Request

Act as an implementation-start gate. Decide whether to proceed, proceed with a clear assumption, ask a focused question, or stop before code is modified.

Stay mostly internal and quiet. Do not produce a long public preflight for ordinary tasks.

## Gate Checklist

Before editing code, check:

1. Purpose: Identify what should be implemented, fixed, generated, configured, tested, or documented.
2. Scope: Identify the likely code area, any implied no-touch areas, and whether refactoring is requested or only an implementation detail.
3. Existing code: Read relevant files, exports, callers, utilities, and tests before writing.
4. Success criteria: Confirm that completion can be judged from user-visible behavior, tests, or clear repository expectations.
5. Verification: Choose likely tests, lint, typecheck, build, or manual checks. If no test path exists, choose a reasonable alternate check.
6. Risk: Look for deletion, auth, billing, production data, external sends, secrets, migrations, broad behavior changes, silent skipped records, or hidden failures.
7. Decision: Proceed directly, proceed with a stated assumption, ask one or two focused questions, or stop for high risk or unverifiability.

## Proceed

Proceed without asking when the target is clear, missing details are minor, risk is low and reversible, and local verification can establish completion.

Make reasonable assumptions for low-risk details. If an assumption is meaningful or not obvious, mention it briefly in a normal progress update or final summary.

Prefer existing codebase conventions over new patterns. Keep changes surgical and scoped to the request. Do not start adjacent improvements unless they are necessary for the requested work.

## Ask

Ask before starting when:

- The target feature, file, API, screen, or behavior cannot be inferred.
- Multiple interpretations would lead to meaningfully different implementations.
- Success criteria cannot be inferred.
- The request could delete data, change permissions, affect billing, expose secrets, modify production-facing behavior, or trigger external side effects.
- The request conflicts with visible repository conventions.
- The user asks for broad cleanup, modernization, or "make it better" without a specific target.

Ask the minimum necessary question. Prefer one question and ask at most two.

## Stop

Stop before implementation when the task is high-risk, irreversible, external, security-sensitive, or unverifiable without missing information. Explain the specific blocker and the smallest confirmation needed to proceed.

If a core assumption collapses during implementation, stop and ask instead of inventing a new direction.

## Complete

Verify before claiming completion. Report what changed and which verification succeeded. If verification could not run, say why and name the residual risk.
