import { compareScenarioRuns, inspectArtifacts, runScenarioById } from "./runHarness.js";
import { listScenarios } from "./scenarios.js";

function usage() {
  const scenarios = listScenarios().map((scenario) => `  - ${scenario.id}`).join("\n");
  return [
    "Usage:",
    "  npm run harness -- run <scenario>",
    "  npm run harness -- inspect artifacts",
    "  npm run harness -- compare <scenario>",
    "",
    "Available scenarios:",
    scenarios
  ].join("\n");
}

async function main(argv) {
  const [command, arg] = argv;

  if (!command) {
    console.log(usage());
    process.exitCode = 1;
    return;
  }

  if (command === "run") {
    if (!arg) {
      throw new Error("Scenario id is required.");
    }
    const result = await runScenarioById(arg);
    console.log(`Completed ${result.summary.scenarioId}`);
    console.log(`Run directory: ${result.runDir}`);
    console.log(`Score: ${result.summary.score}/5`);
    return;
  }

  if (command === "inspect") {
    if (arg !== "artifacts") {
      throw new Error("Use: inspect artifacts");
    }
    console.log(await inspectArtifacts());
    return;
  }

  if (command === "compare") {
    if (!arg) {
      throw new Error("Scenario id is required.");
    }
    console.log(await compareScenarioRuns(arg));
    return;
  }

  throw new Error(`Unknown command: ${command}`);
}

main(process.argv.slice(2)).catch((error) => {
  console.error(error.message);
  console.error("");
  console.error(usage());
  process.exitCode = 1;
});
