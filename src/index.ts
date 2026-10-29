import { startBot } from "./bot.js";
import { demoStatsProvider } from "./demo-stats.js";
import { MockMessageAdapter } from "./mock-message-adapter.js";

async function main(): Promise<void> {
  const adapter = new MockMessageAdapter([
    {
      groupId: "demo-group",
      senderId: "demo-user",
      text: "@机器人 查询 IgnoredPlayer",
      mentionedBot: false,
    },
    {
      groupId: "demo-group",
      senderId: "demo-user",
      text: "@机器人 查询 DemoPlayer",
      mentionedBot: true,
    },
  ]);

  await startBot(adapter, demoStatsProvider);
}

main().catch((error: unknown) => {
  console.error("本地模拟机器人运行失败：", error);
  process.exitCode = 1;
});