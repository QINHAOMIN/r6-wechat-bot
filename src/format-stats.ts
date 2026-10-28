import type { DemoStats } from "./demo-stats.js";

export function formatDemoStats(stats: DemoStats): string {
  return [
    "【演示战绩｜虚构数据，非实时】",
    `玩家 ID：${stats.playerId}`,
    `击杀：${stats.kills}`,
    `死亡：${stats.deaths}`,
    `胜场：${stats.wins}`,
    `败场：${stats.losses}`,
  ].join("\n");
}