# Harness Research MVP

## Purpose

この文書群は、プロンプト実験だけでなく、AI ハーネスをどう設計し、どう比較し、どう進化させるかを整理するための運用ドキュメントです。

## When To Use

- 新しい AI 実験用フローを追加するとき
- SDK と framework のどちらで始めるべきか判断するとき
- handoff artifact の shape を揃えたいとき
- 実験結果を記録して次の改善に繋げたいとき

## Reading Order

1. [`01-decision-framework.md`](01-decision-framework.md)
2. [`02-architecture.md`](02-architecture.md)
3. [`03-artifacts.md`](03-artifacts.md)
4. [`04-experiments.md`](04-experiments.md)
5. [`05-roadmap.md`](05-roadmap.md)

## MVP Scope

- `planner / generator / evaluator` の 3 役を mock で再現する
- `context reset + handoff` を 2 段階実行で再現する
- 実行結果を `runs/` に artifact として残す
- OpenAI / Anthropic / framework 実装はまだ stub 扱いにする

## Concrete Usage

1. まず [`01-decision-framework.md`](01-decision-framework.md) で、対象タスクが SDK 向きか framework 向きか判断する
2. [`02-architecture.md`](02-architecture.md) で、どの責務をどの役割に置くか決める
3. [`03-artifacts.md`](03-artifacts.md) に沿って artifact を設計する
4. `npm run harness -- run <scenario>` で試す
5. `npm run harness -- inspect artifacts` と `compare` で結果を記録・比較する

## Anti-Patterns

- 最初から実 API と永続化を全部入れる
- prompt と artifact shape を同時に毎回変える
- planner と evaluator の責務を generator に混ぜる
- handoff を自然言語の会話だけに頼り、構造化 artifact を作らない
