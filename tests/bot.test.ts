import assert from "node:assert/strict";
import { demoStatsProvider } from "../src/demo-stats.js";
import test from "node:test";
import { startBot } from "../src/bot.js";
import type { MessageAdapter } from "../src/message-adapter.js";
import type { StatsProvider } from "../src/stats-provider.js";

test("未被真正提及时，即使文本包含 @机器人也不查询或回复", async () => {
  const adapter: MessageAdapter = {
    async start(onMessage) {
      await onMessage({
        groupId: "demo-group",
        senderId: "demo-user",
        text: "@机器人 查询 IgnoredPlayer",
        mentionedBot: false,
      });
    },
    async sendText() {
      throw new Error("未被提及时不应发送回复");
    },
    async stop() {},
  };

  const provider: StatsProvider = {
    async getStats() {
      throw new Error("未被提及时不应查询战绩");
    },
  };

  await startBot(adapter, provider);
});

test("被提及且指令有效时，向原群发送演示回复", async () => {
  const sent: Array<{ groupId: string; text: string }> = [];

  const adapter: MessageAdapter = {
    async start(onMessage) {
      await onMessage({
        groupId: "target-group",
        senderId: "demo-user",
        text: "@机器人 查询 AnotherPlayer",
        mentionedBot: true,
      });
    },
    async sendText(groupId, text) {
      sent.push({ groupId, text });
    },
    async stop() {},
  };

  await startBot(adapter, demoStatsProvider);

  assert.equal(sent.length, 1);

  const reply = sent[0];
  assert.ok(reply);
  assert.equal(reply.groupId, "target-group");
  assert.ok(reply.text.includes("玩家 ID：AnotherPlayer"));
  assert.match(reply.text, /演示战绩｜虚构数据，非实时/);
});