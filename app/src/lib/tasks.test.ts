import { test } from "node:test";
import assert from "node:assert/strict";
import { isDueToday } from "./tasks.ts";

test("T3: tugas harian selalu due", () => {
  assert.equal(isDueToday({ recur: "daily", due_date: null }, "2026-11-02"), true);
});

test("T3: tugas mingguan due di hari-dalam-minggu yang sama", () => {
  // 2026-11-02 = Senin; 2026-11-09 juga Senin; 2026-11-03 = Selasa
  const task = { recur: "weekly" as const, due_date: "2026-11-02" };
  assert.equal(isDueToday(task, "2026-11-09"), true);
  assert.equal(isDueToday(task, "2026-11-03"), false);
});

test("T3: tugas sekali jalan due cuma di tanggalnya", () => {
  const task = { recur: null, due_date: "2026-11-05" };
  assert.equal(isDueToday(task, "2026-11-05"), true);
  assert.equal(isDueToday(task, "2026-11-06"), false);
});

test("T3: tugas tanpa tanggal dianggap due kapan aja", () => {
  assert.equal(isDueToday({ recur: null, due_date: null }, "2026-11-02"), true);
});
