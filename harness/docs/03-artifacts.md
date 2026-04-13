# Artifacts

## Purpose

実験ごとの handoff と評価を比較可能にするため、artifact の shape を固定します。

## Required Artifacts

| ファイル | 用途 | 最低限含めるもの |
| --- | --- | --- |
| `plan.md` | その run の計画 | goal, constraints, ordered steps |
| `handoff.json` | 次の run への引き継ぎ | goal, currentState, completedSteps, nextSteps, knownRisks, requiredArtifacts |
| `evaluation.md` | 品質評価 | rubric, findings, recommendation |
| `run-summary.json` | 集計情報 | runId, scenarioId, status, score, timestamps |

## Naming Rule

- 出力先は `runs/<timestamp>-<scenario>/`
- timestamp はファイル名安全な UTC 形式を使う
- scenario 名は固定 ID を使う

## Step-By-Step Guidance

1. 新しい scenario を作る前に `run-summary.json` に何を残すか決める
2. handoff が必要な run では、phase 切替時点の state を `handoff.json` に落とす
3. 評価は prose だけでなく score と rubric を含める
4. compare コマンドは `run-summary.json` だけで最低限動くようにする

## Example Handoff

```json
{
  "goal": "Continue the experiment with a fresh context",
  "currentState": "Planning complete, first draft generated",
  "completedSteps": ["analyzed task", "drafted first pass"],
  "nextSteps": ["resume from handoff", "evaluate the draft"],
  "knownRisks": ["insufficient edge-case coverage"],
  "requiredArtifacts": ["plan.md", "evaluation-rubric.md"]
}
```

## Failure Cases

- plan だけ残して評価を残さない
- handoff に次の具体的な action がない
- run-summary に score や status がなく比較不能になる
