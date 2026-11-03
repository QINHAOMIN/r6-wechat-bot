import type { RankedPeak } from "./player-summary.js";

function asObject(value: unknown): Record<string, unknown> | undefined {
  if (typeof value === "object" && value !== null && !Array.isArray(value)) {
    return value as Record<string, unknown>;
  }

  return undefined;
}

export function parseRanked3Peak(data: unknown): RankedPeak | null {
  const seasons = asObject(asObject(data)?.seasons);
  const segments = asObject(seasons?.data)?.segments;

  if (!Array.isArray(segments)) {
    return null;
  }

  let peak: RankedPeak | null = null;

  for (const value of segments) {
    const segment = asObject(value);
    const attributes = asObject(segment?.attributes);

    if (segment?.type !== "season" || attributes?.sessionType !== "ranked") {
      continue;
    }

    const season = asObject(segment.metadata)?.shortName;

    if (typeof season !== "string") {
      continue;
    }

    const match = /^Y(\d+)S([1-4])$/.exec(season);

    if (!match) {
      continue;
    }

    const year = Number(match[1]);
    const seasonNumber = Number(match[2]);

    if (year < 11 || (year === 11 && seasonNumber < 2)) {
      continue;
    }

    const points = asObject(asObject(segment.stats)?.maxRankPoints)?.value;

    if (
      typeof points !== "number" ||
      !Number.isSafeInteger(points) ||
      points <= 0
    ) {
      continue;
    }

    if (peak === null || points > peak.points) {
      peak = { season, points, rankName: null };
    }
  }

  return peak;
}
