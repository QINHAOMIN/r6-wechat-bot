import type { PlayerSummary } from "./player-summary.js";

function formatNumber(value: number | null, suffix = ""): string {
  return value === null ? "暂无数据" : `${value.toFixed(2)}${suffix}`;
}

export function formatPlayerSummary(summary: PlayerSummary): string {
  const season = summary.currentSeason ?? "赛季未知";
  const peak = summary.ranked3Peak;
  const peakText = peak
    ? `${peak.rankName ?? "段位名称暂无"}（${peak.season}，${peak.points} RP）`
    : "暂无数据";

  return [
    summary.source === "demo"
      ? "【演示战绩｜虚构数据】"
      : "【R6 战绩｜来源：R6Data】",
    `玩家：${summary.playerId}`,
    `历史总 K/D：${formatNumber(summary.overallKd)}`,
    `历史总胜率：${formatNumber(summary.overallWinRate, "%")}`,
    `当前赛季排位（${season}）`,
    `K/D：${formatNumber(summary.currentRankedKd)}`,
    `胜率：${formatNumber(summary.currentRankedWinRate, "%")}`,
    `段位：${summary.currentRankName ?? "暂无数据"}`,
    `排位 3.0 历史最高：${peakText}`,
    ...summary.notes.map((note) => `注：${note}`),
  ].join("\n");
}
