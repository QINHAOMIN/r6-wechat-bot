import assert from "node:assert/strict";
import test from "node:test";
import { parseOverview } from "../src/r6data-overview.js";

function sample(stats: unknown) {
  return {
    seasons: {
      data: {
        segments: [{ type: "overview", stats }],
      },
    },
  };
}

test("从汇总计数计算 K/D 和胜率", () => {
  const result = parseOverview(
    sample({
      kills: { value: 120 },
      deaths: { value: 100 },
      matchesWon: { value: 30 },
      matchesLost: { value: 20 },
    })
  );

  assert.deepEqual(result, {
    overallKd: 1.2,
    overallWinRate: 60,
  });
});

test("缺少响应结构时返回 null", () => {
  assert.deepEqual(parseOverview(null), {
    overallKd: null,
    overallWinRate: null,
  });
});

test("不将字符串计数自动转换为数字", () => {
  const result = parseOverview(
    sample({
      kills: { value: "120" },
      deaths: { value: 100 },
    })
  );

  assert.equal(result.overallKd, null);
});

test("缺少胜负数据不会影响有效的 K/D", () => {
  assert.deepEqual(
    parseOverview(
      sample({
        kills: { value: 50 },
        deaths: { value: 100 },
      })
    ),
    {
      overallKd: 0.5,
      overallWinRate: null,
    }
  );
});
