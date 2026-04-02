function bulletList(items) {
  return items.map((item) => `- ${item}`).join("\n");
}

export async function planScenario(scenario) {
  const steps = scenario.executionMode === "handoff"
    ? [
        "Analyze the goal and define the first phase output",
        "Create a structured handoff artifact for the reset point",
        "Resume in a fresh phase using only the handoff artifact",
        "Evaluate whether the handoff preserved enough state"
      ]
    : [
        "Restate the goal and constraints",
        "Create a minimal reusable implementation approach",
        "Capture the next improvements as explicit actions"
      ];

  const markdown = [
    `# Plan: ${scenario.title}`,
    "",
    "## Goal",
    scenario.goal,
    "",
    "## Constraints",
    bulletList(scenario.constraints),
    "",
    "## Inputs",
    bulletList(scenario.inputs),
    "",
    "## Steps",
    steps.map((step, index) => `${index + 1}. ${step}`).join("\n"),
    "",
    "## Risks",
    "- The mock flow may look cleaner than a real provider integration",
    "- Evaluation quality depends on the rubric quality"
  ].join("\n");

  return {
    steps,
    markdown
  };
}

export async function generateFromPlan({ scenario, plan }) {
  const output = scenario.executionMode === "handoff"
    ? {
        phase1Result: "Prepared the first phase deliverable and paused before evaluation.",
        phase2Result: "Resumed from the structured handoff and completed the evaluation-ready draft."
      }
    : {
        result: "Created a compact harness draft with reusable artifacts and a clear next step list."
      };

  const handoff = scenario.executionMode === "handoff"
    ? {
        goal: scenario.goal,
        currentState: "Phase 1 is complete. A fresh context should resume from the handoff artifact only.",
        completedSteps: [plan.steps[0], plan.steps[1]],
        nextSteps: [plan.steps[2], plan.steps[3]],
        knownRisks: [
          "Phase 2 may assume hidden context if the handoff is vague",
          "The rubric may not catch missing operational details"
        ],
        requiredArtifacts: ["plan.md", "evaluation.md"]
      }
    : {
        goal: scenario.goal,
        currentState: "Single-run draft completed.",
        completedSteps: plan.steps.slice(0, 2),
        nextSteps: ["Review the artifacts", "Add a real provider adapter later"],
        knownRisks: ["The current run is mock-only"],
        requiredArtifacts: ["plan.md", "evaluation.md"]
      };

  return {
    output,
    handoff
  };
}

export async function evaluateRun({ scenario, handoff }) {
  const score = scenario.executionMode === "handoff" ? 4 : 4;
  const findings = scenario.executionMode === "handoff"
    ? [
        "The handoff records next steps explicitly, which makes the reset usable.",
        "The run still relies on a mock evaluator, so quality is indicative rather than proven.",
        "A real provider adapter is the next meaningful extension."
      ]
    : [
        "The run produces all required artifacts.",
        "The flow is reusable for later experiments.",
        "A richer rubric would make comparisons more meaningful."
      ];

  const markdown = [
    `# Evaluation: ${scenario.title}`,
    "",
    "## Score",
    `${score}/5`,
    "",
    "## Findings",
    bulletList(findings),
    "",
    "## Handoff Quality",
    `- Next steps recorded: ${handoff.nextSteps.length}`,
    `- Known risks recorded: ${handoff.knownRisks.length}`,
    "",
    "## Recommendation",
    "- Keep the artifact contract stable and add one real adapter next."
  ].join("\n");

  return {
    score,
    findings,
    markdown
  };
}
