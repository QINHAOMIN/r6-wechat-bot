import { parseCommand } from "./commands.js";
import { formatStats } from "./format-stats.js";
import type { StatsProvider } from "./stats-provider.js";

export async function handleMessage(
  message: string,
  statsProvider: StatsProvider,
): Promise<string | null> {
  const command = parseCommand(message);

  if (!command) {
    return null;
  }

  const stats = await statsProvider.getStats(command.playerId);

  if (!stats) {
    return `未找到玩家 ${command.playerId} 的战绩。`;
  }

  return formatStats(stats);
}