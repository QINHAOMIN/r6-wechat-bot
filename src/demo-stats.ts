import type { PlayerStats, StatsProvider } from "./stats-provider.js";

export interface DemoStats extends PlayerStats {
  source: "demo";
}

export function getDemoStats(playerId: string): DemoStats {
  return {
    source: "demo",
    playerId,
    kills: 120,
    deaths: 100,
    wins: 30,
    losses: 20,
  };
}

export const demoStatsProvider: StatsProvider = {
  async getStats(playerId) {
    return getDemoStats(playerId);
  },
};