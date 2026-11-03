import assert from "node:assert/strict";
import test from "node:test";
import { calculateKd, calculateWinRate } from "../src/metrics.js";

test("K/D 使用击杀总数除以死亡总数", () => {
  assert.equal(calculateKd(535, 870), 535 / 870);
  assert.equal(calculateKd(0, 10), 0);
});

test("死亡为零或计数无效时，K/D 返回 null", () => {
  assert.equal(calculateKd(10, 0), null);
  assert.equal(calculateKd(-1, 10), null);
  assert.equal(calculateKd(NaN, 10), null);
});

test("胜率返回百分数", () => {
  assert.equal(calculateWinRate(3, 1), 75);
  assert.equal(calculateWinRate(0, 10), 0);
});

test("没有胜负记录或计数无效时，胜率返回 null", () => {
  assert.equal(calculateWinRate(0, 0), null);
  assert.equal(calculateWinRate(1, -1), null);
  assert.equal(calculateWinRate(Infinity, 1), null);
});
