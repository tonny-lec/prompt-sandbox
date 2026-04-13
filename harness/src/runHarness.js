import path from "node:path";
import { createRunDirectory, writeJson, writeMarkdown, listRuns, readRunSummary } from "./artifacts.js";
import { evaluateRun, generateFromPlan, planScenario } from "./adapters/mockAdapters.js";
import { getScenario } from "./scenarios.js";

function projectRootFrom(importMetaUrl) {
  return path.resolve(path.dirname(new URL(importMetaUrl).pathname), "..");
}

export async function runScenarioById(scenarioId, options = {}) {
  const scenario = getScenario(scenarioId);
  if (!scenario) {
    throw new Error(`Unknown scenario: ${scenarioId}`);
  }

  const projectRoot = options.projectRoot ?? projectRootFrom(import.meta.url);
  const startedAt = new Date().toISOString();
  const { runId, runDir } = await createRunDirectory(projectRoot, scenario.id);

  const plan = await planScenario(scenario);
  const generation = await generateFromPlan({ scenario, plan });
  const evaluation = await evaluateRun({ scenario, handoff: generation.handoff });
  const completedAt = new Date().toISOString();

  const planBody = scenario.executionMode === "handoff"
    ? `${plan.markdown}\n\n## Reset Strategy\n- End phase 1 after the first draft\n- Resume phase 2 from handoff.json only\n`
    : plan.markdown;

  const summary = {
    runId,
    scenarioId: scenario.id,
    title: scenario.title,
    executionMode: scenario.executionMode,
    status: "completed",
    score: evaluation.score,
    startedAt,
    completedAt,
    artifacts: ["plan.md", "handoff.json", "evaluation.md", "run-summary.json"]
  };

  await writeMarkdown(path.join(runDir, "plan.md"), planBody);
  await writeJson(path.join(runDir, "handoff.json"), generation.handoff);
  await writeMarkdown(path.join(runDir, "evaluation.md"), evaluation.markdown);
  await writeJson(path.join(runDir, "run-summary.json"), summary);

  return {
    runDir,
    summary
  };
}

export async function inspectArtifacts(options = {}) {
  const projectRoot = options.projectRoot ?? projectRootFrom(import.meta.url);
  const runs = await listRuns(projectRoot);

  if (runs.length === 0) {
    return "No runs found.";
  }

  const summaries = await Promise.all(runs.slice(0, 10).map((runId) => readRunSummary(projectRoot, runId)));
  return summaries
    .map((summary) => `${summary.runId} | ${summary.scenarioId} | score=${summary.score} | status=${summary.status}`)
    .join("\n");
}

export async function compareScenarioRuns(scenarioId, options = {}) {
  const projectRoot = options.projectRoot ?? projectRootFrom(import.meta.url);
  const runs = await listRuns(projectRoot);
  const matching = [];

  for (const runId of runs) {
    const summary = await readRunSummary(projectRoot, runId);
    if (summary.scenarioId === scenarioId) {
      matching.push(summary);
    }
  }

  if (matching.length === 0) {
    return `No runs found for scenario: ${scenarioId}`;
  }

  return matching
    .slice(0, 5)
    .map((summary, index) => `${index + 1}. ${summary.runId} | score=${summary.score} | mode=${summary.executionMode}`)
    .join("\n");
}
