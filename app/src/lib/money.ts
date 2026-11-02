import type { Expense, ExpenseCategory } from "@/lib/types";

// D7: Rupiah selalu integer, nggak ada desimal/float.
export function parseRupiahInput(raw: string): number {
  const digits = raw.replace(/[^0-9]/g, "");
  return digits ? parseInt(digits, 10) : 0;
}

export function sumByCategory(expenses: Pick<Expense, "amount_idr" | "category">[]) {
  const totals: Record<ExpenseCategory, number> = { wajib: 0, rumah: 0, senang: 0 };
  for (const e of expenses) totals[e.category] += e.amount_idr;
  return totals;
}
