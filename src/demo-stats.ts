export interface DemoStats {
  source: "demo";
  playerId: string;
  kills: number;
  deaths: number;
  wins: number;
  losses: number;
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