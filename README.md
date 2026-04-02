# prompt-sandbox

プロンプトの試行と、ハーネス設計 / ハーネスエンジニアリングの研究を行うためのリポジトリです。

このリポジトリは、単なるプロンプト保管庫ではなく、次の 2 つを同時に扱います。

- 再利用したいプロンプト資産の保存
- AI ハーネスを設計・比較・検証するための小さな実験基盤

## ディレクトリ構成

- `prompts/`: 再利用するプロンプト
- `docs/`: 設計方針、比較基準、運用メモ
- `templates/`: ハーネスで使う artifact や `AGENTS.md` の雛形
- `harness/`: 実験用の最小 CLI 実装
- `runs/`: ハーネス実行結果の artifact 出力先

## まず読む場所

- ハーネス全体像: [`docs/harness/README.md`](docs/harness/README.md)
- 技術選定の判断基準: [`docs/harness/01-decision-framework.md`](docs/harness/01-decision-framework.md)
- artifact 設計: [`docs/harness/03-artifacts.md`](docs/harness/03-artifacts.md)

## MVP でできること

- `planner / generator / evaluator` の流れを mock 実装で試す
- `handoff artifact` を使う長時間タスク風の実行を試す
- 実行ごとの artifact を保存し、一覧・比較する

## 使い方

依存関係はありません。Node.js 22 以降を想定しています。

```bash
npm run harness -- run mock-basic
npm run harness -- run long-run-handoff
npm run harness -- inspect artifacts
npm run harness -- compare mock-basic
```

## 参考

- OpenAI: Harness engineering  
  https://openai.com/ja-JP/index/harness-engineering/
- Anthropic: Harness design for long-running application development  
  https://www.anthropic.com/engineering/harness-design-long-running-apps
