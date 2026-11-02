import { getHouseholdContext } from "@/lib/context";
import { EmptyState } from "@/components/EmptyState";
import { addDays, formatJamID, formatTanggalID, todayWIB } from "@/lib/date";
import type { EventRow } from "@/lib/types";
import { createEvent, deleteEvent } from "./actions";

export default async function JadwalPage({
  searchParams,
}: {
  searchParams: Promise<{ member?: string; error?: string }>;
}) {
  const { member: filterMember, error } = await searchParams;
  const { supabase, household, members } = await getHouseholdContext();
  if (!household) return null;

  const from = todayWIB();
  const to = addDays(from, 14);

  let query = supabase
    .from("events")
    .select("*")
    .eq("household_id", household.id)
    .gte("starts_at", `${from}T00:00:00+07:00`)
    .lt("starts_at", `${to}T00:00:00+07:00`)
    .order("starts_at");
  if (filterMember) query = query.eq("member_id", filterMember);

  const { data } = await query;
  const events = (data ?? []) as EventRow[];
  const memberById = new Map(members.map((m) => [m.id, m]));

  const byDate = new Map<string, EventRow[]>();
  for (const e of events) {
    const date = e.starts_at.slice(0, 10);
    byDate.set(date, [...(byDate.get(date) ?? []), e]);
  }

  return (
    <div className="flex flex-col gap-4 p-4">
      <h1 className="text-2xl font-bold">Jadwal keluarga</h1>

      <div className="flex gap-2 overflow-x-auto pb-1">
        <a
          href="/app/jadwal"
          className={`tap-target rounded-full border px-3 text-sm ${!filterMember ? "border-primary bg-primary text-primary-foreground" : "border-border"}`}
        >
          Gabungan
        </a>
        {members.map((m) => (
          <a
            key={m.id}
            href={`/app/jadwal?member=${m.id}`}
            className={`tap-target flex items-center gap-1 rounded-full border px-3 text-sm ${filterMember === m.id ? "border-primary bg-primary text-primary-foreground" : "border-border"}`}
          >
            <span className="h-2 w-2 rounded-full" style={{ background: m.color }} />
            {m.name}
          </a>
        ))}
      </div>

      {error && <p className="text-danger">{error}</p>}

      <form action={createEvent} className="flex flex-col gap-2 rounded-card border border-border p-3">
        <p className="font-medium">Tambah acara</p>
        <input name="title" required placeholder="Judul acara" className="rounded-card border border-border px-3 py-2" />
        <div className="flex gap-2">
          <input name="date" type="date" required defaultValue={from} className="flex-1 rounded-card border border-border px-3 py-2" />
          <input name="time" type="time" required defaultValue="09:00" className="w-28 rounded-card border border-border px-3 py-2" />
        </div>
        <select name="memberId" required className="rounded-card border border-border px-3 py-2">
          <option value="">Punya siapa?</option>
          {members.map((m) => (
            <option key={m.id} value={m.id}>{m.name}</option>
          ))}
        </select>
        <button className="rounded-card bg-primary px-4 py-3 text-lg font-semibold text-primary-foreground">
          Simpan
        </button>
      </form>

      {byDate.size === 0 && (
        <EmptyState
          example="Contoh: Pentas Kayla — Sabtu, 10:00"
          hint="Belum ada acara. Isi form di atas buat nambah yang pertama."
        />
      )}

      {[...byDate.entries()].map(([date, items]) => (
        <div key={date}>
          <h2 className="mb-2 font-semibold">{formatTanggalID(date)}</h2>
          <div className="flex flex-col gap-2">
            {items.map((e, i) => {
              const bentrok = items.some(
                (other, j) => j !== i && other.starts_at === e.starts_at,
              );
              const m = e.member_id ? memberById.get(e.member_id) : undefined;
              return (
                <div key={e.id} className="flex items-center gap-3 rounded-card border border-border p-3">
                  <span className="h-3 w-3 shrink-0 rounded-full" style={{ background: m?.color ?? "#999" }} />
                  <div className="flex-1">
                    <p className="font-medium">{e.title}</p>
                    <p className="text-sm text-muted">
                      {formatJamID(e.starts_at)} · {m?.name ?? "Rumah"}
                      {bentrok && <span className="ml-2 rounded-full bg-red-50 px-2 py-0.5 text-danger">bentrok</span>}
                    </p>
                  </div>
                  <form action={deleteEvent}>
                    <input type="hidden" name="id" value={e.id} />
                    <button className="text-sm text-muted" aria-label="Hapus">Hapus</button>
                  </form>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
