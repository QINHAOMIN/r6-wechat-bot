export interface QueryCommand {
  type: "query";
  playerId: string;
}

export function parseCommand(message: string): QueryCommand | null {
  const match = /^@机器人\s+查询\s+(\S+)$/.exec(message.trim());
  const playerId = match?.[1];

  if (!playerId) {
    return null;
  }

  return {
    type: "query",
    playerId,
  };
}