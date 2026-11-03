function isValidCount(value: number): boolean {
  return Number.isSafeInteger(value) && value >= 0;
}

export function calculateKd(kills: number, deaths: number): number | null {
  if (!isValidCount(kills) || !isValidCount(deaths) || deaths === 0) {
    return null;
  }

  return kills / deaths;
}

export function calculateWinRate(wins: number, losses: number): number | null {
  if (!isValidCount(wins) || !isValidCount(losses)) {
    return null;
  }

  const total = wins + losses;

  return total === 0 ? null : (wins / total) * 100;
}
