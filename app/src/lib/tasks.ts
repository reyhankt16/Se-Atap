import type { Task } from "@/lib/types";

function weekdayOf(dateStr: string): number {
  return new Date(`${dateStr}T00:00:00Z`).getUTCDay();
}

// T3: tugas harian selalu due; tugas mingguan due di hari-dalam-minggu yang sama
// dengan due_date aslinya; tugas sekali jalan due kalau tanggalnya cocok atau
// nggak punya tanggal sama sekali (dianggap "kapan aja").
export function isDueToday(task: Pick<Task, "recur" | "due_date">, today: string): boolean {
  if (task.recur === "daily") return true;
  if (task.recur === "weekly") {
    if (!task.due_date) return true;
    return weekdayOf(task.due_date) === weekdayOf(today);
  }
  if (!task.due_date) return true;
  return task.due_date === today;
}
