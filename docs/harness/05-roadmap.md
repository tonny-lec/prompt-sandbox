# Roadmap

## Purpose

MVP 以降の拡張を無秩序に増やさないため、追加順序を整理します。

## Near-Term

- mock adapter を provider adapter interface に差し替え可能にする
- scenario を増やす
- run comparison をもう少し見やすくする
- `AGENTS.md` と prompt template の整合を自動チェックできるようにする

## Mid-Term

- OpenAI / Anthropic adapter を追加する
- RAG なし / file search / hybrid search の比較 scenario を追加する
- skills / MCP 前提の harness variant を用意する
- rubric を scenario ごとに差し替えられるようにする

## Long-Term

- framework 版 runtime を追加して SDK 系と比較する
- benchmark と tracing を追加する
- 複数 run の集計レポートを生成する
- replayable な run manifest を導入する

## Change Policy

- まず docs と templates を更新する
- 次に scenario を追加する
- 最後に runtime / adapter を増やす

## Failure Cases

- 先に provider 依存を入れて MVP が重くなる
- compare の見方が固まる前にメトリクスを増やしすぎる
