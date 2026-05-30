# 阵营九宫格测试说明

通过根 MCP 聚合层的 `play(game="dnd", action=...)` 调用。`cedartoy/server.py` 会在本进程内转换为 JSON-RPC 并调用 DND handler。

## 可用 action

- `tools/list`：查看原始 DND MCP 工具列表。
- `dnd_start`：开始或重置测试。
  - 参数：`player_id`，1-10 位字母数字。
  - 参数：`mode`，可选 `full`（36题逐题）。
- `dnd_answer`：逐题提交当前题答案。
  - 参数：`player_id`。
  - 参数：`answer`，1-4 整数，对应题面四个选项。
- `dnd_get_result`：查询最近一次已完成测试结果。
  - 参数：`player_id`。

## 示例

```json
{"game":"dnd","action":"dnd_start","player_id":"u123","mode":"full"}
```

```json
{"game":"dnd","action":"dnd_answer","player_id":"u123","answer":2}
```

```json
{"game":"dnd","action":"dnd_get_result","player_id":"u123"}
```
