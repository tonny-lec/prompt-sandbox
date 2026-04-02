# Experiments

## Purpose

実験を増やしても比較軸がぶれないように、最小限の実験ルールを定義します。

## When To Use

- 新しい scenario を追加するとき
- prompt や adapter の差分を比較するとき
- 長時間タスクの handoff 設計を見直すとき

## Current Scenarios

| Scenario | 目的 | 確認したいこと |
| --- | --- | --- |
| `mock-basic` | 単発の planner / generator / evaluator 流れを確認 | artifact 出力が揃うか |
| `long-run-handoff` | 文脈リセットと handoff を確認 | 引き継ぎ情報だけで再開できるか |

## Experiment Procedure

1. scenario を固定する
2. 変更点を 1 つに絞る
3. 2 回以上 run して artifact を比較する
4. `evaluation.md` の指摘が改善したか確認する
5. 学びを `docs/harness/05-roadmap.md` か別メモへ反映する

## Comparison Axes

- artifact completeness
- plan の明確さ
- handoff の再利用性
- evaluator の指摘の具体性
- 実行時間
- score の安定性

## Anti-Patterns

- prompt と scenario を同時に変える
- 1 回だけの run で結論を出す
- 実験結果を repo に残さず口頭で済ませる
