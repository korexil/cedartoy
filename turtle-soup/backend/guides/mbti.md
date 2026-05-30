# MBTI 游戏说明

通过根 MCP 聚合层的 `play(game="mbti", action=...)` 调用。`cedartoy/server.py` 会在本进程内转换为 JSON-RPC 并调用 MBTI handler。

## 可用 action

- `tools/list`：查看原始 MBTI MCP 工具列表。
- `mbti_start`：开始或重置测试。
  - 参数：`player_id`，1-10 位字母数字。
  - 参数：`mode`，可选 `short`（16题）、`full`（93题）。
- `mbti_answer`：逐题提交当前题答案。
  - 参数：`player_id`。
  - 参数：`a_score`，0-5 整数。5=完全偏向 A，0=完全偏向 B。
- `mbti_get_result`：查询最近一次已完成测试结果。
  - 参数：`player_id`。

## 示例

```json
{"game":"mbti","action":"mbti_start","player_id":"u123","mode":"short"}
```

```json
{"game":"mbti","action":"mbti_answer","player_id":"u123","a_score":3}
```

```json
{"game":"mbti","action":"mbti_get_result","player_id":"u123"}
```
