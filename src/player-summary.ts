export interface RankedPeak {
  season: string;
  points: number;
  rankName: string | null;
}

export interface PlayerSummary {
  source: "demo" | "external";
  playerId: string;
  currentSeason: string | null;

  overallKd: number | null;
  currentRankedKd: number | null;
  currentRankName: string | null;
  ranked3Peak: RankedPeak | null;
  overallWinRate: number | null;
  currentRankedWinRate: number | null;

  notes: string[];
}
