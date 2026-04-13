# Handoff Writer Prompt

## Purpose

context reset 後の run が迷わず継続できる handoff artifact を作るためのプロンプトです。

## Instructions

- 現在地を短く要約する
- 完了済みと未完了を分ける
- 次の担当が最初にやることを具体化する
- リスクと必要 artifact を忘れずに書く

## Output Shape

- goal
- currentState
- completedSteps
- nextSteps
- knownRisks
- requiredArtifacts
