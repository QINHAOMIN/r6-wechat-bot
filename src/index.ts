import { parseCommand } from "./commands.js";
import { getDemoStats } from "./demo-stats.js";
import { formatDemoStats } from "./format-stats.js";

const message = "@机器人 查询 DemoPlayer";

console.log(`模拟群消息：${message}`);

const command = parseCommand(message);

if (command) {
  const stats = getDemoStats(command.playerId);
  const reply = formatDemoStats(stats);

  console.log(reply);
} else {
  console.log("未识别到有效查询指令");
}