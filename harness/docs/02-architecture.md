# Architecture

## Purpose

MVP ハーネスの責務分離を固定し、実験を追加しやすくするための設計メモです。

## When To Use

- 新しいコマンドや scenario を足すとき
- planner / generator / evaluator の境界を確認したいとき
- provider adapter を追加したいとき

## Components

| コンポーネント | 役割 | MVP 実装 |
| --- | --- | --- |
| Planner | タスクを段取りと制約に分解する | mock |
| Generator | 計画に沿って成果物を生成する | mock |
| Evaluator | 成果物を rubric に照らして評価する | mock |
| Scenario | 入力、制約、成功条件を定義する | static file |
| Artifact Store | 実行結果を保存する | `runs/` |
| CLI | 実行、一覧、比較の入口 | Node CLI |

## Data Flow

1. Scenario を読み込む
2. Planner が `plan.md` を作る
3. Generator が結果と `handoff.json` を作る
4. Evaluator が `evaluation.md` を作る
5. Runner が `run-summary.json` を出力する

`long-run-handoff` では 3 の後に context reset を模した再開ステップを挟みます。

## Boundary Rules

- Planner は実行ログの責務を持たない
- Generator は評価基準を持たない
- Evaluator は生成ロジックを持たない
- Scenario は処理ロジックを持たず、入力契約だけを定義する
- Artifact Store は加工せずに記録する

## Anti-Patterns

- 1 つの prompt に planning と evaluation を混ぜる
- handoff をログの断片で代替する
- scenario ごとに artifact 名を変える
