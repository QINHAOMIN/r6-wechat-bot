import assert from "node:assert/strict";
import test from "node:test";
import { getDemoStats } from "../src/demo-stats.js";
import { formatDemoStats } from "../src/format-stats.js";

test("演示回复明确标注虚构数据和非实时", () => {
  const reply = formatDemoStats(getDemoStats("DemoPlayer"));

  assert.match(reply, /演示战绩/);
  assert.match(reply, /虚构数据/);
  assert.match(reply, /非实时/);
});

test("回复显示本次查询的玩家 ID", () => {
  const reply = formatDemoStats(getDemoStats("AnotherPlayer"));

  assert.ok(reply.includes("玩家 ID：AnotherPlayer"));
});