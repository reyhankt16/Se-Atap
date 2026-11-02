import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { getHouseholdContext } from "@/lib/context";
import { createHousehold, captureFirstThing, skipToApp } from "./actions";

export default async function OnboardingPage({
  searchParams,
}: {
  searchParams: Promise<{ step?: string; error?: string }>;
}) {
  const { step, error } = await searchParams;
  const { household } = await getHouseholdContext();

  if (household && step !== "undang") redirect("/app");

  const h = await headers();
  const origin = `${h.get("x-forwarded-proto") ?? "http"}://${h.get("host")}`;
  const inviteLink = household ? `${origin}/join/${household.id}` : "";

  return (
    <main className="mx-auto flex min-h-screen max-w-sm flex-col justify-center gap-6 px-6 py-12">
      {error && (
        <p className="rounded-card bg-red-50 px-4 py-3 text-danger" role="alert">
          {error}
        </p>
      )}

      {!household && (
        <>
          <div>
            <h1 className="text-2xl font-bold">Bikin rumah lu</h1>
            <p className="mt-1 text-muted">Cuma butuh nama rumah &amp; nama lu. Nggak perlu isi anggota lain dulu.</p>
          </div>
          <form action={createHousehold} className="flex flex-col gap-3">
            <label className="flex flex-col gap-1">
              <span className="text-lg font-medium">Nama rumah</span>
              <input
                name="householdName"
                required
                placeholder="Rumah Sari & Ardan"
                className="rounded-card border border-border px-4 py-3 text-lg"
              />
            </label>
            <label className="flex flex-col gap-1">
              <span className="text-lg font-medium">Nama lu</span>
              <input
                name="memberName"
                required
                placeholder="Sari"
                className="rounded-card border border-border px-4 py-3 text-lg"
              />
            </label>
            <button className="mt-2 rounded-card bg-primary px-4 py-3 text-lg font-semibold text-primary-foreground">
              Lanjut
            </button>
          </form>
        </>
      )}

      {household && step !== "undang" && (
        <>
          <div>
            <h1 className="text-2xl font-bold">Catat 1 hal pertama</h1>
            <p className="mt-1 text-muted">Satu tugas rumah aja. Nanti bisa ditambah lagi di menu Tugas.</p>
          </div>
          <form action={captureFirstThing} className="flex flex-col gap-3">
            <input
              name="title"
              placeholder="Contoh: Cuci baju"
              className="rounded-card border border-border px-4 py-3 text-lg"
            />
            <button className="mt-2 rounded-card bg-primary px-4 py-3 text-lg font-semibold text-primary-foreground">
              Lanjut
            </button>
          </form>
        </>
      )}

      {household && step === "undang" && (
        <>
          <div>
            <h1 className="text-2xl font-bold">Undang anggota rumah</h1>
            <p className="mt-1 text-muted">Opsional — bisa dilewati, tambah kapan aja dari menu Anggota.</p>
          </div>
          <div className="rounded-card border border-border bg-surface px-4 py-3 text-sm break-all">
            {inviteLink}
          </div>
          <p className="text-sm text-muted">Salin link di atas, tempel di grup WA keluarga.</p>
          <form action={skipToApp}>
            <button className="mt-2 w-full rounded-card bg-primary px-4 py-3 text-lg font-semibold text-primary-foreground">
              Mulai pakai SeAtap
            </button>
          </form>
        </>
      )}
    </main>
  );
}
