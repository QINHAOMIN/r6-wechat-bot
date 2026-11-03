export interface RankRange {
  name: string;
  min_mmr: number;
  max_mmr: number;
}

export function findRankName(
  points: number,
  ranks: readonly RankRange[]
): string | null {
  if (!Number.isFinite(points) || points < 0) {
    return null;
  }

  const rank = ranks.find(
    (item) => points >= item.min_mmr && points <= item.max_mmr
  );

  return rank?.name ?? null;
}
