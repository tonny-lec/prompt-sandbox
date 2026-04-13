# Context Boundary

## Purpose

本プロジェクトの知見蓄積コンテキストと、`harness/` 実験場コンテキストを混同しないためのルールです。

## Contexts

| コンテキスト | 役割 | 主な配置場所 |
| --- | --- | --- |
| Repository context | 知見の蓄積、方針整理、汎用資産の保管 | `README.md`, `docs/project/`, `prompts/` |
| Harness context | 実験実行、artifact 保存、実験専用 prompt / template | `harness/` 配下 |

## Rules

1. `harness/` が参照する運用文書は、原則 `harness/docs/` に置く
2. `harness/` が参照する prompt / template は、原則 `harness/prompts/` と `harness/templates/` に置く
3. ルートの `docs/` は実験手順ではなく、知見・設計判断・整理メモを置く
4. ルートの `prompts/` は他用途でも使える汎用プロンプトを置く
5. `harness/runs/` は実験場のローカル artifact 専用とし、リポジトリ知見の一次保管場所にしない

## Decision Criteria

- 実行時に読むものなら `harness/`
- 実験をまたいで残す知見ならルート
- 特定の runtime や scenario に依存するなら `harness/`
- 汎用的に再利用するならルート

## Failure Cases

- `harness/src` がルートの運用 docs に依存する
- 実験専用 prompt をルート `prompts/` に混ぜる
- 研究メモを `harness/runs/` のみで管理する
