import { readFile } from "node:fs/promises";
import { formatPlayerSummary } from "./format-player-summary.js";
import { fetchR6DataSummary } from "./r6data-provider.js";
import type { RankRange } from "./ranks.js";
import { startMessageBot } from "./bot.js";
import { parseCommand } from "./commands.js";
import { MockMessageAdapter } from "./mock-message-adapter.js";

async function main(): Promise<void> {
  const playerId = process.argv[2]?.trim();
  const apiKey = process.env.R6DATA_API_KEY;

  if (!playerId) {
    throw new Error("请在命令末尾提供 PC 玩家 ID");
  }

  if (!apiKey) {
    throw new Error("缺少 R6DATA_API_KEY");
  }

  const ranks: RankRange[] = JSON.parse(
    await readFile("data/r6data-ranks-v7.json", "utf8")
  );

  const adapter = new MockMessageAdapter([
    {
      groupId: "demo-group",
      senderId: "demo-user",
      text: `@机器人 查询 ${playerId}`,
      mentionedBot: true,
    },
  ]);

  await startMessageBot(adapter, async (text) => {
    const command = parseCommand(text);

    if (!command) {
      return null;
    }

    try {
      const summary = await fetchR6DataSummary(command.playerId, apiKey, ranks);
      return formatPlayerSummary(summary);
    } catch (error: unknown) {
      console.error(
        "R6Data 查询失败：",
        error instanceof Error ? error.message : "未知错误"
      );

      return "暂时无法查询战绩，请稍后再试。";
    }
  });
}

main().catch((error: unknown) => {
  console.error(error instanceof Error ? error.message : "查询失败");
  process.exitCode = 1;
});
