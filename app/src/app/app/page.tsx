import { getHouseholdContext } from "@/lib/context";
import { formatJamID, formatTanggalID, addDays, todayWIB } from "@/lib/date";
import { isDueToday } from "@/lib/tasks";
import type { EventRow, Task } from "@/lib/types";

export default async function DashboardPage() {
  const { supabase, household, members, me } = await getHouseholdContext();
  if (!household || !me) return null;

  const today = todayWIB();
  const tomorrow = addDays(today, 1);
  const dayAfter = addDays(today, 2);

  const [{ data: eventRows }, { data: taskRows }] = await Promise.all([
    supabase
      .from("events")
      .select("*")
      .eq("household_id", household.id)
      .gte("starts_at", `${today}T00:00:00+07:00`)
      .lt("starts_at", `${dayAfter}T00:00:00+07:00`)
      .order("starts_at"),
    supabase.from("tasks").select("*").eq("household_id", household.id),
  ]);

  const events = (eventRows ?? []) as EventRow[];
  const todays = events.filter((e) => e.starts_at.slice(0, 10) === today);
  const tomorrows = events.filter((e) => e.starts_at.slice(0, 10) === tomorrow);
  const memberById = new Map(members.map((m) => [m.id, m]));

  const tasks = (taskRows ?? []) as Task[];
  const dueToday = tasks.filter((t) => isDueToday(t, today));

  return (
    <div className="flex flex-col gap-5 p-4">
      <div>
        <h1 className="text-2xl font-bold">Halo, {me.name}</h1>
        <p className="text-muted">{household.name}</p>
      </div>

      <section>
        <h2 className="mb-2 font-semibold">Hari ini</h2>
        {todays.length === 0 ? (
          <p className="text-sm text-muted">Nggak ada acara hari ini.</p>
        ) : (
          <div className="flex flex-col gap-2">
            {todays.map((e) => (
              <div key={e.id} className="flex items-center gap-3 rounded-card border border-border p-3">
                <span
                  className="h-3 w-3 shrink-0 rounded-full"
                  style={{ background: e.member_id ? memberById.get(e.member_id)?.color : "#2563eb" }}
                />
                <div>
                  <p className="font-medium">{e.title}</p>
                  <p className="text-sm text-muted">
                    {formatJamID(e.starts_at)} · {e.member_id ? memberById.get(e.member_id)?.name : "Rumah"}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <section>
        <h2 className="mb-2 font-semibold">Besok</h2>
        {tomorrows.length === 0 ? (
          <p className="text-sm text-muted">Belum ada acara besok.</p>
        ) : (
          <div className="flex flex-col gap-2">
            {tomorrows.map((e) => (
              <div key={e.id} className="flex items-center gap-3 rounded-card border border-border p-3">
                <span
                  className="h-3 w-3 shrink-0 rounded-full"
                  style={{ background: e.member_id ? memberById.get(e.member_id)?.color : "#2563eb" }}
                />
                <div>
                  <p className="font-medium">{e.title}</p>
                  <p className="text-sm text-muted">
                    {formatJamID(e.starts_at)} · {e.member_id ? memberById.get(e.member_id)?.name : "Rumah"}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <a href="/app/tugas" className="rounded-card border border-border p-3">
        <p className="font-semibold">{dueToday.length} tugas hari ini →</p>
      </a>

      <p className="text-xs text-muted">{formatTanggalID(today)}</p>
    </div>
  );
}
