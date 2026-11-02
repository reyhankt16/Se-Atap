import { getHouseholdContext } from "@/lib/context";
import { sumByCategory } from "@/lib/money";
import { formatRupiah, todayWIB } from "@/lib/date";
import type { Expense } from "@/lib/types";
import { addExpense, deleteExpense } from "./actions";

const CATEGORY_LABEL = { wajib: "Wajib", rumah: "Rumah", senang: "Senang" } as const;

export default async function KeuanganPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;
  const { supabase, household, me } = await getHouseholdContext();
  if (!household) return null;

  if (!me?.is_adult) {
    return (
      <div className="flex flex-col gap-3 p-4">
        <h1 className="text-2xl font-bold">Keuangan rumah</h1>
        <p className="text-muted">Khusus orang tua di rumah ini.</p>
      </div>
    );
  }

  const monthStart = `${todayWIB().slice(0, 7)}-01`;
  const { data } = await supabase
    .from("expenses")
    .select("*")
    .eq("household_id", household.id)
    .gte("spent_on", monthStart)
    .order("spent_on", { ascending: false });
  const expenses = (data ?? []) as Expense[];
  const totals = sumByCategory(expenses);

  return (
    <div className="flex flex-col gap-4 p-4">
      <h1 className="text-2xl font-bold">Keuangan rumah</h1>

      <div className="grid grid-cols-3 gap-2 text-center">
        {(["wajib", "rumah", "senang"] as const).map((cat) => (
          <div key={cat} className="rounded-card border border-border p-3">
            <p className="text-sm text-muted">{CATEGORY_LABEL[cat]}</p>
            <p className="text-xl font-bold">{formatRupiah(totals[cat])}</p>
          </div>
        ))}
      </div>

      {error && <p className="text-danger">{error}</p>}

      <form action={addExpense} className="flex flex-col gap-2 rounded-card border border-border p-3">
        <p className="font-medium">Catat pengeluaran</p>
        <input
          name="amount"
          required
          inputMode="numeric"
          placeholder="Nominal, contoh: 15000"
          className="rounded-card border border-border px-3 py-3 text-lg"
        />
        <input name="note" placeholder="Catatan (opsional)" className="rounded-card border border-border px-3 py-2" />
        <div className="grid grid-cols-3 gap-2">
          {(["wajib", "rumah", "senang"] as const).map((cat) => (
            <button
              key={cat}
              name="category"
              value={cat}
              className="rounded-card bg-primary px-2 py-3 font-semibold text-primary-foreground"
            >
              {CATEGORY_LABEL[cat]}
            </button>
          ))}
        </div>
      </form>

      <div>
        <h2 className="mb-2 font-semibold">Bulan ini</h2>
        {expenses.length === 0 ? (
          <p className="text-sm text-muted">Belum ada pengeluaran bulan ini.</p>
        ) : (
          <div className="flex flex-col gap-2">
            {expenses.map((e) => (
              <div key={e.id} className="flex items-center justify-between rounded-card border border-border p-3">
                <div>
                  <p>{formatRupiah(e.amount_idr)} <span className="text-sm text-muted">· {CATEGORY_LABEL[e.category]}</span></p>
                  {e.note && <p className="text-sm text-muted">{e.note}</p>}
                </div>
                <form action={deleteExpense}>
                  <input type="hidden" name="id" value={e.id} />
                  <button className="text-sm text-muted" aria-label="Hapus">Hapus</button>
                </form>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
