export interface PlayerStats {
  source: "demo" | "external";
  playerId: string;
  kills: number;
  deaths: number;
  wins: number;
  losses: number;
}

export interface StatsProvider {
  getStats(playerId: string): Promise<PlayerStats | null>;
}