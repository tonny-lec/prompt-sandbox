# prompt-sandbox

このリポジトリは 2 つのコンテキストを分けて扱います。

- 本プロジェクトのコンテキスト: プロンプトやハーネス設計の知見をためる
- `harness/` のコンテキスト: 実際に実験を回すための自己完結した実験場

`harness/` は今後、より実運用に近い形へ育てていく前提なので、実験場が参照する docs / prompts / templates / runs は原則として `harness/` 配下に閉じ込めます。

## どこを見るか

- リポジトリ全体の方針: [`docs/project/context-boundary.md`](docs/project/context-boundary.md)
- 実験場の入口: [`harness/README.md`](harness/README.md)
- 再利用したい一般プロンプト: `prompts/`

## 境界ルール

- ルートの `docs/` は知見蓄積用
- `harness/docs/` は実験場の運用文脈用
- ルートの `prompts/` は汎用プロンプト保管用
- `harness/prompts/` は実験場専用プロンプト用
- `harness/runs/` は実験結果専用

## 実験の始め方

```bash
cd harness
npm run harness -- run mock-basic
npm run harness -- inspect artifacts
```
