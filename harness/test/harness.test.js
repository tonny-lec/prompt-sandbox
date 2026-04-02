import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { compareScenarioRuns, inspectArtifacts, runScenarioById } from "../src/runHarness.js";

async function createTempProjectRoot() {
  const tempRoot = await fs.mkdtemp(path.join(os.tmpdir(), "prompt-sandbox-harness-"));
  await fs.mkdir(path.join(tempRoot, "runs"), { recursive: true });
  return tempRoot;
}

test("runScenarioById creates the required artifacts", async () => {
  const projectRoot = await createTempProjectRoot();
  const result = await runScenarioById("mock-basic", { projectRoot });

  const files = await fs.readdir(result.runDir);
  assert.deepEqual(
    files.sort(),
    ["evaluation.md", "handoff.json", "plan.md", "run-summary.json"].sort()
  );
});

test("inspectArtifacts lists recent runs", async () => {
  const projectRoot = await createTempProjectRoot();
  await runScenarioById("mock-basic", { projectRoot });

  const output = await inspectArtifacts({ projectRoot });
  assert.match(output, /mock-basic/);
  assert.match(output, /score=4/);
});

test("compareScenarioRuns lists runs for a scenario", async () => {
  const projectRoot = await createTempProjectRoot();
  await runScenarioById("long-run-handoff", { projectRoot });

  const output = await compareScenarioRuns("long-run-handoff", { projectRoot });
  assert.match(output, /long-run-handoff/);
  assert.match(output, /mode=handoff/);
});
