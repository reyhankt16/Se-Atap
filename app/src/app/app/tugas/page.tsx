import { getHouseholdContext, hasChild } from "@/lib/context";
import { EmptyState } from "@/components/EmptyState";
import { isDueToday } from "@/lib/tasks";
import { startOfWeekMonday, todayWIB } from "@/lib/date";
import type { Task } from "@/lib/types";
import { createTask, claimTask, completeTask, deleteTask } from "./actions";

export default async function TugasPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; kid?: string }>;
}) {
  const { error, kid } = await searchParams;
  const { supabase, household, members } = await getHouseholdContext();
  if (!household) return null;

  const today = todayWIB();
  const weekStart = startOfWeekMonday(today);

  const { data: taskRows } = await supabase.from("tasks").select("*").eq("household_id", household.id);
  const tasks = (taskRows ?? []) as Task[];
  const taskIds = tasks.map((t) => t.id);

  const { data: logRows } = taskIds.length
    ? await supabase.from("task_logs").select("*").in("task_id", taskIds).gte("done_on", weekStart)
    : { data: [] };
  const logs = logRows ?? [];
  const doneToday = new Set(logs.filter((l) => l.done_on === today).map((l) => l.task_id));
  const everDone = new Set(logs.map((l) => l.task_id)); // cukup minggu ini buat nentuin "udah pernah" tugas sekali-jalan

  const dueToday = tasks.filter((t) => isDueToday(t, today) && !(t.recur === null && everDone.has(t.id)));
  const unowned = dueToday.filter((t) => !t.member_id);
  const owned = dueToday.filter((t) => t.member_id);
  const memberById = new Map(members.map((m) => [m.id, m]));
  const showKidToggle = hasChild(members);
  const kidMode = kid === "1";
  const kids = members.filter((m) => !m.can_read);

  const weeklyCount = (memberId: string) => logs.filter((l) => l.member_id === memberId).length;

  return (
    <div className="flex flex-col gap-4 p-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Tugas hari ini</h1>
        {showKidToggle && (
          <a
            href={kidMode ? "/app/tugas" : "/app/tugas?kid=1"}
            className="tap-target rounded-full border border-border px-3 text-sm"
          >
            {kidMode ? "Tampilan biasa" : "Tampilan anak"}
          </a>
        )}
      </div>

      {error && <p className="text-danger">{error}</p>}

      {kidMode ? (
        <div className="flex flex-col gap-4">
          {kids.map((kidMember) => {
            const kidTasks = owned.filter((t) => t.member_id === kidMember.id);
            return (
              <div key={kidMember.id} className="rounded-card border border-border p-3" style={{ borderColor: kidMember.color }}>
                <p className="mb-2 text-xl font-semibold">{kidMember.name}</p>
                <div className="grid grid-cols-2 gap-3">
                  {kidTasks.map((t) => {
                    const done = doneToday.has(t.id);
                    return (
                      <form key={t.id} action={completeTask}>
                        <input type="hidden" name="taskId" value={t.id} />
                        <input type="hidden" name="memberId" value={kidMember.id} />
                        <button
                          disabled={done}
                          className={`flex h-28 w-full flex-col items-center justify-center gap-1 rounded-card border-2 text-center ${done ? "border-success bg-green-50" : "border-border"}`}
                        >
                          <span className="text-4xl">{t.icon || "⭐"}</span>
                          <span className="text-sm font-medium">{t.title}</span>
                          {done && <span className="text-xs text-success">Selesai!</span>}
                        </button>
                      </form>
                    );
                  })}
                </div>
                <p className="mt-3 text-2xl" aria-label={`${weeklyCount(kidMember.id)} stiker minggu ini`}>
                  {"⭐".repeat(weeklyCount(kidMember.id)) || "Belum ada stiker minggu ini"}
                </p>
              </div>
            );
          })}
        </div>
      ) : (
        <>
          <form action={createTask} className="flex flex-col gap-2 rounded-card border border-border p-3">
            <p className="font-medium">Tambah tugas</p>
            <input name="title" required placeholder="Contoh: Cuci piring" className="rounded-card border border-border px-3 py-2" />
            <div className="flex gap-2">
              <select name="memberId" className="flex-1 rounded-card border border-border px-3 py-2">
                <option value="">Belum ada yang pegang</option>
                {members.map((m) => (
                  <option key={m.id} value={m.id}>{m.name}</option>
                ))}
              </select>
              <select name="recur" className="rounded-card border border-border px-3 py-2">
                <option value="">Sekali aja</option>
                <option value="daily">Setiap hari</option>
                <option value="weekly">Setiap minggu</option>
              </select>
            </div>
            {showKidToggle && (
              <input name="icon" placeholder="Emoji buat tampilan anak (opsional), contoh: 👟" className="rounded-card border border-border px-3 py-2" />
            )}
            <button className="rounded-card bg-primary px-4 py-3 text-lg font-semibold text-primary-foreground">
              Simpan
            </button>
          </form>

          {dueToday.length === 0 && (
            <EmptyState example="Contoh: Cuci piring — Kayla" hint="Belum ada tugas hari ini. Tambah lewat form di atas." />
          )}

          {unowned.length > 0 && (
            <div>
              <h2 className="mb-2 font-semibold">Belum ada yang pegang — ambil aja</h2>
              <div className="flex flex-col gap-2">
                {unowned.map((t) => (
                  <div key={t.id} className="flex items-center justify-between rounded-card border border-dashed border-border p-3">
                    <span>{t.title}</span>
                    <form action={claimTask}>
                      <input type="hidden" name="taskId" value={t.id} />
                      <button className="tap-target rounded-full bg-primary px-3 text-sm text-primary-foreground">Ambil</button>
                    </form>
                  </div>
                ))}
              </div>
            </div>
          )}

          {owned.length > 0 && (
            <div>
              <h2 className="mb-2 font-semibold">Siapa ngerjain apa</h2>
              <div className="flex flex-col gap-2">
                {owned.map((t) => {
                  const m = t.member_id ? memberById.get(t.member_id) : undefined;
                  const done = doneToday.has(t.id);
                  return (
                    <div key={t.id} className="flex items-center gap-3 rounded-card border border-border p-3">
                      <span className="h-3 w-3 shrink-0 rounded-full" style={{ background: m?.color ?? "#999" }} />
                      <div className="flex-1">
                        <p className={done ? "line-through text-muted" : ""}>{t.title}</p>
                        <p className="text-sm text-muted">{m?.name}</p>
                      </div>
                      {!done && m && (
                        <form action={completeTask}>
                          <input type="hidden" name="taskId" value={t.id} />
                          <input type="hidden" name="memberId" value={m.id} />
                          <button className="tap-target rounded-full border border-success px-3 text-sm text-success">Selesai</button>
                        </form>
                      )}
                      <form action={deleteTask}>
                        <input type="hidden" name="id" value={t.id} />
                        <button className="text-sm text-muted" aria-label="Hapus">Hapus</button>
                      </form>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          <div className="rounded-card border border-border bg-surface p-3">
            <h2 className="mb-2 font-semibold">Review minggu ini</h2>
            <div className="flex flex-col gap-1 text-sm">
              {members.map((m) => (
                <p key={m.id}>{m.name}: {weeklyCount(m.id)} tugas selesai</p>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
