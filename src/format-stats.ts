import type { DemoStats } from "./demo-stats.js";
import type { PlayerStats } from "./stats-provider.js";

export function formatStats(stats: PlayerStats): string {
  const heading =
    stats.source === "demo"
      ? "【演示战绩｜虚构数据，非实时】"
      : "【外部战绩｜实时性未核实】";

  return [
    heading,
    `玩家 ID：${stats.playerId}`,
    `击杀：${stats.kills}`,
    `死亡：${stats.deaths}`,
    `胜场：${stats.wins}`,
    `败场：${stats.losses}`,
  ].join("\n");
}

export function formatDemoStats(stats: DemoStats): string {
  return formatStats(stats);
}