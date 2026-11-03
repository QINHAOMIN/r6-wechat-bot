import assert from "node:assert/strict";
import test from "node:test";
import { findRankName } from "../src/ranks.js";

const ranks = [
  { name: "Gold 3", min_mmr: 2700, max_mmr: 2799 },
  { name: "Gold 2", min_mmr: 2800, max_mmr: 2899 },
  { name: "Gold 1", min_mmr: 2900, max_mmr: 2999 },
];

test("根据分数查找段位", () => {
  assert.equal(findRankName(2921, ranks), "Gold 1");
});

test("正确处理段位区间边界", () => {
  assert.equal(findRankName(2700, ranks), "Gold 3");
  assert.equal(findRankName(2799, ranks), "Gold 3");
  assert.equal(findRankName(2800, ranks), "Gold 2");
});

test("对照表未覆盖的分数返回 null", () => {
  assert.equal(findRankName(3000, ranks), null);
});

test("无效分数返回 null", () => {
  assert.equal(findRankName(-1, ranks), null);
  assert.equal(findRankName(NaN, ranks), null);
});
