import assert from "node:assert/strict";
import test from "node:test";
import { parseCommand } from "../src/commands.js";

test("识别模拟消息中的查询指令和玩家 ID", () => {
  const command = parseCommand("@机器人 查询 DemoPlayer");

  assert.deepEqual(command, {
    type: "query",
    playerId: "DemoPlayer",
  });
});

test("允许消息首尾带有空白", () => {
  const command = parseCommand("  @机器人 查询 DemoPlayer  ");

  assert.deepEqual(command, {
    type: "query",
    playerId: "DemoPlayer",
  });
});

test("忽略普通聊天消息", () => {
  assert.equal(parseCommand("大家晚上好"), null);
});

test("缺少玩家 ID 时不生成查询指令", () => {
  assert.equal(parseCommand("@机器人 查询"), null);
});