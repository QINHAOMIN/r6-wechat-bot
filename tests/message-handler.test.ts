import assert from "node:assert/strict";
import test from "node:test";
import { demoStatsProvider } from "../src/demo-stats.js";
import { handleMessage } from "../src/message-handler.js";
import type { StatsProvider } from "../src/stats-provider.js";

test("查询指令通过演示数据源生成回复", async () => {
  const reply = await handleMessage(
    "@机器人 查询 AnotherPlayer",
    demoStatsProvider,
  );

  assert.ok(reply !== null);
  assert.match(reply, /演示战绩｜虚构数据，非实时/);
  assert.ok(reply.includes("玩家 ID：AnotherPlayer"));
});

test("普通聊天不调用战绩数据源", async () => {
  const provider: StatsProvider = {
    async getStats() {
      throw new Error("普通聊天不应触发查询");
    },
  };

  const reply = await handleMessage("大家晚上好", provider);

  assert.equal(reply, null);
});

test("数据源未找到玩家时返回明确提示", async () => {
  const provider: StatsProvider = {
    async getStats(playerId) {
      assert.equal(playerId, "MissingPlayer");
      return null;
    },
  };

  const reply = await handleMessage(
    "@机器人 查询 MissingPlayer",
    provider,
  );

  assert.equal(reply, "未找到玩家 MissingPlayer 的战绩。");
});