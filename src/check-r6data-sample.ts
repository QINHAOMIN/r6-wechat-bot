import { readFile } from "node:fs/promises";
import { buildR6DataSummary } from "./r6data-summary.js";
import type { RankRange } from "./ranks.js";
import { formatPlayerSummary } from "./format-player-summary.js";

async function main(): Promise<void> {
  const data: unknown = JSON.parse(
    await readFile(".local/r6data-profile.json", "utf8")
  );
  const ranks: RankRange[] = JSON.parse(
    await readFile(".local/r6data-ranks-v7.json", "utf8")
  );

  const summary = buildR6DataSummary("xueyue0814", data, ranks);
  console.log(formatPlayerSummary(summary));
}

main().catch((error: unknown) => {
  console.error(error);
  process.exitCode = 1;
});
