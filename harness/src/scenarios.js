export const scenarios = {
  "mock-basic": {
    id: "mock-basic",
    title: "Basic planner-generator-evaluator flow",
    goal: "Design a small reusable harness experiment for a prompt-driven repository.",
    constraints: [
      "Do not require API keys",
      "Leave reusable artifacts for later runs",
      "Keep the flow understandable for humans"
    ],
    inputs: [
      "Repository is used for prompt experiments",
      "Need a small harness MVP",
      "Need artifacts that future runs can inspect"
    ],
    successCriteria: [
      "Plan is explicit",
      "Generated result is reusable",
      "Evaluation identifies next improvements"
    ],
    executionMode: "single"
  },
  "long-run-handoff": {
    id: "long-run-handoff",
    title: "Long-running task with handoff",
    goal: "Continue work across a context reset using only structured artifacts.",
    constraints: [
      "Second phase must start from handoff",
      "The handoff must capture current state and next steps",
      "Keep the run deterministic"
    ],
    inputs: [
      "A long-running task may lose coherence over time",
      "Need to resume safely with a fresh context"
    ],
    successCriteria: [
      "Phase 2 can continue from the handoff without hidden context",
      "Evaluation shows whether the handoff was sufficient"
    ],
    executionMode: "handoff"
  }
};

export function getScenario(id) {
  return scenarios[id] ?? null;
}

export function listScenarios() {
  return Object.values(scenarios);
}
