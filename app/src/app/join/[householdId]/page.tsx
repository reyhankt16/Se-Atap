import { getHouseholdContext } from "@/lib/context";
import { joinHousehold } from "./actions";

export default async function JoinPage({
  params,
  searchParams,
}: {
  params: Promise<{ householdId: string }>;
  searchParams: Promise<{ error?: string }>;
}) {
  const { householdId } = await params;
  const { error } = await searchParams;
  const { supabase, household: myHousehold } = await getHouseholdContext();

  if (myHousehold) {
    const already = myHousehold.id === householdId;
    return (
      <main className="mx-auto flex min-h-screen max-w-sm flex-col justify-center gap-4 px-6 py-12 text-center">
        <p className="text-lg">
          {already
            ? "Lu udah jadi anggota rumah ini."
            : `Lu udah punya rumah sendiri (${myHousehold.name}). Satu akun cuma bisa gabung satu rumah.`}
        </p>
        <a href="/app" className="rounded-card bg-primary px-4 py-3 text-lg font-semibold text-primary-foreground">
          Balik ke app
        </a>
      </main>
    );
  }

  const { data: name } = await supabase.rpc("household_name", { hh: householdId });

  return (
    <main className="mx-auto flex min-h-screen max-w-sm flex-col justify-center gap-6 px-6 py-12">
      <div>
        <h1 className="text-2xl font-bold">Gabung ke {name ?? "rumah ini"}?</h1>
        <p className="mt-1 text-muted">Semua jadwal, tugas, belanja, dan catatan rumah ini bakal kelihatan buat lu.</p>
      </div>
      {error && (
        <p className="rounded-card bg-red-50 px-4 py-3 text-danger" role="alert">
          {error}
        </p>
      )}
      <form action={joinHousehold} className="flex flex-col gap-3">
        <input type="hidden" name="householdId" value={householdId} />
        <label className="flex flex-col gap-1">
          <span className="text-lg font-medium">Nama lu</span>
          <input
            name="memberName"
            required
            placeholder="Ardan"
            className="rounded-card border border-border px-4 py-3 text-lg"
          />
        </label>
        <button className="mt-2 rounded-card bg-primary px-4 py-3 text-lg font-semibold text-primary-foreground">
          Gabung
        </button>
      </form>
    </main>
  );
}
