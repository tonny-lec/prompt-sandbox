import fs from "node:fs/promises";
import path from "node:path";

function toRunTimestamp(date = new Date()) {
  return date.toISOString().replace(/[:.]/g, "-");
}

export function getRunsRoot(projectRoot) {
  return path.join(projectRoot, "runs");
}

export async function createRunDirectory(projectRoot, scenarioId) {
  const runId = `${toRunTimestamp()}-${scenarioId}`;
  const runDir = path.join(getRunsRoot(projectRoot), runId);
  await fs.mkdir(runDir, { recursive: true });
  return { runId, runDir };
}

export async function writeMarkdown(filePath, content) {
  await fs.writeFile(filePath, content, "utf8");
}

export async function writeJson(filePath, value) {
  await fs.writeFile(filePath, `${JSON.stringify(value, null, 2)}\n`, "utf8");
}

export async function listRuns(projectRoot) {
  const runsRoot = getRunsRoot(projectRoot);
  try {
    const entries = await fs.readdir(runsRoot, { withFileTypes: true });
    return entries
      .filter((entry) => entry.isDirectory())
      .map((entry) => entry.name)
      .sort()
      .reverse();
  } catch (error) {
    if (error && error.code === "ENOENT") {
      return [];
    }
    throw error;
  }
}

export async function readRunSummary(projectRoot, runId) {
  const filePath = path.join(getRunsRoot(projectRoot), runId, "run-summary.json");
  const content = await fs.readFile(filePath, "utf8");
  return JSON.parse(content);
}
