import type { PlayerSummary } from "./player-summary.js";
import { buildR6DataSummary } from "./r6data-summary.js";
import type { RankRange } from "./ranks.js";

export async function fetchR6DataSummary(
  playerId: string,
  apiKey: string,
  ranks: readonly RankRange[]
): Promise<PlayerSummary> {
  const username = playerId.trim();

  if (!username) {
    throw new Error("请输入玩家 ID");
  }

  if (!apiKey.trim()) {
    throw new Error("缺少 R6DATA_API_KEY");
  }

  const url = new URL("https://public-api.arenyze.com/r6/api/v2/profile");
  url.searchParams.set("nameOnPlatform", username);
  url.searchParams.set("platformType", "uplay");
  url.searchParams.set("platform_families", "pc");

  const response = await fetch(url, {
    headers: { "api-key": apiKey },
    signal: AbortSignal.timeout(60_000),
  });

  if (!response.ok) {
    throw new Error(`R6Data 查询失败（HTTP ${response.status}）`);
  }

  const data: unknown = await response.json();

  if (typeof data !== "object" || data === null || !("stats" in data)) {
    throw new Error("R6Data 返回的响应缺少战绩字段");
  }

  return buildR6DataSummary(username, data, ranks);
}
