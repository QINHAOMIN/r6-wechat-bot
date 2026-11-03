import { calculateKd, calculateWinRate } from "./metrics.js";

function asObject(value: unknown): Record<string, unknown> | null {
  return typeof value === "object" && value !== null && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : null;
}

function readCount(value: unknown): number | null {
  const number = asObject(value)?.value;

  return typeof number === "number" &&
    Number.isSafeInteger(number) &&
    number >= 0
    ? number
    : null;
}

export interface CurrentRankedStats {
  seasonId: number;
  seasonName: string | null;
  kd: number | null;
  winRate: number | null;
  rankPoints: number | null;
}

export function parseCurrentRanked(data: unknown): CurrentRankedStats | null {
  const root = asObject(data);
  const seasons = asObject(root?.seasons);
  const seasonData = asObject(seasons?.data);
  const metadata = asObject(seasonData?.metadata);
  const seasonId = metadata?.currentSeason;
  const segments = seasonData?.segments;

  if (
    typeof seasonId !== "number" ||
    !Number.isSafeInteger(seasonId) ||
    seasonId < 0 ||
    !Array.isArray(segments)
  ) {
    return null;
  }

  const matches = segments.map(asObject).filter((segment) => {
    const attributes = asObject(segment?.attributes);

    return (
      segment?.type === "season" &&
      attributes?.season === seasonId &&
      attributes?.sessionType === "ranked"
    );
  });

  if (matches.length !== 1) {
    return null;
  }

  const segment = matches[0];
  const stats = asObject(segment?.stats);
  const seasonMetadata = asObject(segment?.metadata);

  if (!stats) {
    return null;
  }

  const kills = readCount(stats.kills);
  const deaths = readCount(stats.deaths);
  const wins = readCount(stats.matchesWon);
  const losses = readCount(stats.matchesLost);

  return {
    seasonId,
    seasonName:
      typeof seasonMetadata?.shortName === "string"
        ? seasonMetadata.shortName
        : null,
    kd: kills !== null && deaths !== null ? calculateKd(kills, deaths) : null,
    winRate:
      wins !== null && losses !== null ? calculateWinRate(wins, losses) : null,
    rankPoints: readCount(stats.rankPoints),
  };
}
