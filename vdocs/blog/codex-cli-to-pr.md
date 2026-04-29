# 从 Codex CLI 到 PR：一套可复用交付清单

这篇文章关注“怎么把 Codex 输出变成团队可接受的交付物”。

## 1. 本地阶段

- 明确变更范围与目标
- 让 Codex 输出具体文件变更
- 本地跑 `lint / test / build`

## 2. 提交阶段

- 提交信息保持 Conventional Commits
- 描述中包含：目的、改动、验证命令
- UI 改动附截图或录屏

## 3. PR 阶段

- 先写风险点，再写改动细节
- 说明回滚方案
- 列出未覆盖的边界场景

## 4. 可复用模板

```text
Purpose:
Key Changes:
Verification:
Risk:
Rollback:
```

## 5. 结论

Codex 可以大幅提速，但“可审阅、可验证、可回滚”才是团队交付标准。
