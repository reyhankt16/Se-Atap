import { test } from "node:test";
import assert from "node:assert/strict";
import { parseRupiahInput, sumByCategory } from "./money.ts";

test("T2: parseRupiahInput selalu integer, nggak ada desimal", () => {
  assert.equal(parseRupiahInput("Rp 15.000"), 15000);
  assert.equal(parseRupiahInput("0"), 0);
  assert.equal(parseRupiahInput(""), 0);
  assert.equal(parseRupiahInput("1.000.000"), 1000000);
  assert.equal(Number.isInteger(parseRupiahInput("50000")), true);
});

test("T2: sumByCategory jumlahin per kategori tanpa float drift", () => {
  const totals = sumByCategory([
    { amount_idr: 15000, category: "rumah" },
    { amount_idr: 500000, category: "wajib" },
    { amount_idr: 25000, category: "rumah" },
    { amount_idr: 0, category: "senang" },
  ]);
  assert.deepEqual(totals, { wajib: 500000, rumah: 40000, senang: 0 });
});
