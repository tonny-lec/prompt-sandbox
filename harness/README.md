# Harness Lab

`harness/` は、このリポジトリ内の実験場です。ここでは planner / generator / evaluator / handoff artifact の流れを試します。

このディレクトリは可能な限り自己完結に保ちます。実験場が参照する docs / prompts / templates / runs は、この配下にあります。

## ディレクトリ構成

- `docs/`: 実験場専用の運用文書
- `prompts/`: 実験場専用の prompt
- `templates/`: 実験場専用の artifact 雛形
- `src/`: CLI とランナー実装
- `test/`: 最小テスト
- `runs/`: 実行 artifact

## 使い方

```bash
npm run harness -- run mock-basic
npm run harness -- run long-run-handoff
npm run harness -- inspect artifacts
npm run harness -- compare mock-basic
```

## まず読む場所

- [`docs/README.md`](docs/README.md)
- [`docs/01-decision-framework.md`](docs/01-decision-framework.md)
- [`docs/03-artifacts.md`](docs/03-artifacts.md)
