import { getHouseholdContext } from "@/lib/context";
import { EmptyState } from "@/components/EmptyState";
import { formatJamID, formatTanggalID, todayWIB } from "@/lib/date";
import type { EventRow } from "@/lib/types";
import { createHouseholdEvent } from "./actions";
import { deleteEvent } from "../jadwal/actions";

export default async function AcaraPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;
  const { supabase, household } = await getHouseholdContext();
  if (!household) return null;

  const from = todayWIB();
  const { data } = await supabase
    .from("events")
    .select("*")
    .eq("household_id", household.id)
    .eq("is_household", true)
    .gte("starts_at", `${from}T00:00:00+07:00`)
    .order("starts_at");
  const events = (data ?? []) as EventRow[];

  return (
    <div className="flex flex-col gap-4 p-4">
      <h1 className="text-2xl font-bold">Acara keluarga</h1>
      <p className="text-muted">Acara se-rumah, kelihatan semua anggota.</p>

      {error && <p className="text-danger">{error}</p>}

      <form action={createHouseholdEvent} className="flex flex-col gap-2 rounded-card border border-border p-3">
        <p className="font-medium">Tambah acara</p>
        <input name="title" required placeholder="Contoh: Ke rumah Oma" className="rounded-card border border-border px-3 py-2" />
        <div className="flex gap-2">
          <input name="date" type="date" required defaultValue={from} className="flex-1 rounded-card border border-border px-3 py-2" />
          <input name="time" type="time" required defaultValue="09:00" className="w-28 rounded-card border border-border px-3 py-2" />
        </div>
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" name="remind" defaultChecked />
          Ingetin semua anggota
        </label>
        <button className="rounded-card bg-primary px-4 py-3 text-lg font-semibold text-primary-foreground">
          Simpan
        </button>
      </form>

      {events.length === 0 && (
        <EmptyState example="Contoh: Ke rumah Oma — Minggu, 10:00" hint="Belum ada acara keluarga. Tambah lewat form di atas." />
      )}

      <div className="flex flex-col gap-2">
        {events.map((e) => {
          const text = encodeURIComponent(`${e.title} — ${formatTanggalID(e.starts_at.slice(0, 10))} jam ${formatJamID(e.starts_at)}`);
          return (
            <div key={e.id} className="rounded-card border border-border p-3">
              <p className="font-medium">{e.title}</p>
              <p className="text-sm text-muted">
                {formatTanggalID(e.starts_at.slice(0, 10))} · {formatJamID(e.starts_at)}
                {e.remind_at && " · 🔔 diingetin"}
              </p>
              <div className="mt-2 flex gap-3">
                <a href={`https://wa.me/?text=${text}`} target="_blank" rel="noopener noreferrer" className="text-sm text-primary">
                  Share ke WA
                </a>
                <form action={deleteEvent}>
                  <input type="hidden" name="id" value={e.id} />
                  <button className="text-sm text-muted">Hapus</button>
                </form>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
