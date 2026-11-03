import { mkdir, writeFile } from "node:fs/promises";

async function main(): Promise<void> {
  const apiKey = process.env.R6DATA_API_KEY;

  if (!apiKey) {
    throw new Error("缺少 R6DATA_API_KEY");
  }

  const response = await fetch(
    "https://public-api.arenyze.com/r6/api/ranks?version=v7",
    {
      headers: { "api-key": apiKey },
      signal: AbortSignal.timeout(60_000),
    }
  );

  console.log("HTTP 状态码：", response.status);

  if (!response.ok) {
    throw new Error(`段位表请求失败：HTTP ${response.status}`);
  }

  const body = await response.text();
  JSON.parse(body);

  await mkdir(".local", { recursive: true });
  await writeFile(".local/r6data-ranks-v7.json", body, "utf8");

  console.log("段位表已保存到 .local/r6data-ranks-v7.json");
}

main().catch((error: unknown) => {
  console.error(error);
  process.exitCode = 1;
});
