import { mkdir, writeFile } from "node:fs/promises";

async function main(): Promise<void> {
  const apiKey = process.env.R6DATA_API_KEY;
  const playerId = process.argv[2];

  if (!apiKey) {
    throw new Error("缺少 R6DATA_API_KEY");
  }

  if (!playerId) {
    throw new Error("请在命令末尾提供 PC 玩家 ID");
  }

  const url = new URL("https://public-api.arenyze.com/r6/api/v2/profile");

  url.searchParams.set("nameOnPlatform", playerId);
  url.searchParams.set("platformType", "uplay");
  url.searchParams.set("platform_families", "pc");

  const response = await fetch(url, {
    headers: { "api-key": apiKey },
    signal: AbortSignal.timeout(60_000),
  });

  console.log("HTTP 状态码：", response.status);

  if (!response.ok) {
    throw new Error(`接口请求失败：HTTP ${response.status}`);
  }

  console.log("正在读取响应体……");

  const body = await response.text();
  await mkdir(".local", { recursive: true });
  await writeFile(".local/r6data-profile.json", body, "utf8");

  console.log("完整响应已保存到 .local/r6data-profile.json");

  console.log("响应体读取完成，字符数：", body.length);

  const data: unknown = JSON.parse(body);

  if (typeof data !== "object" || data === null) {
    throw new Error("接口未返回预期的 JSON 对象");
  }

  console.log("返回字段：", Object.keys(data));
  if ("seasons" in data) {
    console.log("赛季记录结构：");
    console.dir(data.seasons, {
      depth: 8,
      maxArrayLength: 2,
    });
  }

  if ("meta" in data) {
    console.log("响应元信息：");
    console.dir(data.meta, { depth: 4 });
  }
}

main().catch((error: unknown) => {
  console.error(error);
  process.exitCode = 1;
});
