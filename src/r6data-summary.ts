import type { PlayerSummary } from "./player-summary.js";
import { parseCurrentRanked } from "./r6data-current.js";
import { parseOverview } from "./r6data-overview.js";
import { parseRanked3Peak } from "./r6data-peak.js";
import { findRankName, type RankRange } from "./ranks.js";

export function buildR6DataSummary(
  playerId: string,
  data: unknown,
  currentRanks: readonly RankRange[]
): PlayerSummary {
  const overall = parseOverview(data);
  const current = parseCurrentRanked(data);
  const peak = parseRanked3Peak(data);
  const notes = [
    "历史汇总使用 R6Data 的汇总记录，完整覆盖范围尚未核实。",
    "排位 3.0 最高记录以接口返回的赛季为准。",
  ];

  if (peak && peak.season !== current?.seasonName) {
    notes.push("最高记录来自其他赛季，暂只显示该赛季的 RP。");
  }

  return {
    source: "external",
    playerId,
    currentSeason: current?.seasonName ?? null,
    ...overall,
    currentRankedKd: current?.kd ?? null,
    currentRankedWinRate: current?.winRate ?? null,
    currentRankName:
      current?.rankPoints == null
        ? null
        : findRankName(current.rankPoints, currentRanks),
    ranked3Peak: peak
      ? {
          ...peak,
          rankName:
            peak.season === current?.seasonName
              ? findRankName(peak.points, currentRanks)
              : null,
        }
      : null,
    notes,
  };
}
