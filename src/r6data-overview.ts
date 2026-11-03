import { calculateKd, calculateWinRate } from "./metrics.js";

function asObject(value: unknown): Record<string, unknown> | null {
  return typeof value === "object" && value !== null && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : null;
}

function readCount(
  stats: Record<string, unknown>,
  field: string
): number | null {
  const value = asObject(stats[field])?.value;

  return typeof value === "number" && Number.isSafeInteger(value) && value >= 0
    ? value
    : null;
}

export function parseOverview(data: unknown): {
  overallKd: number | null;
  overallWinRate: number | null;
} {
  const root = asObject(data);
  const seasons = asObject(root?.seasons);
  const seasonData = asObject(seasons?.data);
  const segments = seasonData?.segments;

  const overviews = Array.isArray(segments)
    ? segments.map(asObject).filter((item) => item?.type === "overview")
    : [];

  const stats = overviews.length === 1 ? asObject(overviews[0]?.stats) : null;

  if (!stats) {
    return { overallKd: null, overallWinRate: null };
  }

  const kills = readCount(stats, "kills");
  const deaths = readCount(stats, "deaths");
  const wins = readCount(stats, "matchesWon");
  const losses = readCount(stats, "matchesLost");

  return {
    overallKd:
      kills !== null && deaths !== null ? calculateKd(kills, deaths) : null,
    overallWinRate:
      wins !== null && losses !== null ? calculateWinRate(wins, losses) : null,
  };
}
