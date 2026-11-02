import { headers } from "next/headers";
import { getHouseholdContext } from "@/lib/context";
import { addMember } from "./actions";

export default async function AnggotaPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;
  const { household, members } = await getHouseholdContext();
  if (!household) return null;

  const h = await headers();
  const origin = `${h.get("x-forwarded-proto") ?? "http"}://${h.get("host")}`;
  const inviteLink = `${origin}/join/${household.id}`;

  return (
    <div className="flex flex-col gap-4 p-4">
      <h1 className="text-2xl font-bold">Anggota rumah</h1>

      <div className="flex flex-col gap-2">
        {members.map((m) => (
          <div key={m.id} className="flex items-center gap-3 rounded-card border border-border p-3">
            <span className="h-3 w-3 shrink-0 rounded-full" style={{ background: m.color }} />
            <div className="flex-1">
              <p className="font-medium">{m.name}</p>
              <p className="text-sm text-muted">
                {m.user_id ? "Punya akun" : "Tanpa akun"}
                {!m.can_read && " · tampilan anak"}
                {!m.is_adult && " · bukan dewasa"}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="rounded-card border border-border bg-surface p-3">
        <p className="mb-1 font-medium">Link undangan</p>
        <p className="break-all text-sm">{inviteLink}</p>
        <p className="mt-1 text-sm text-muted">Salin, tempel di grup WA keluarga.</p>
      </div>

      {error && <p className="text-danger">{error}</p>}

      <form action={addMember} className="flex flex-col gap-2 rounded-card border border-border p-3">
        <p className="font-medium">Tambah anggota tanpa HP</p>
        <p className="text-sm text-muted">Buat anak kecil yang belum punya akun sendiri.</p>
        <input name="name" required placeholder="Nama" className="rounded-card border border-border px-3 py-2" />
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" name="isAdult" />
          Dewasa
        </label>
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" name="canRead" defaultChecked />
          Udah bisa baca
        </label>
        <button className="rounded-card bg-primary px-4 py-3 text-lg font-semibold text-primary-foreground">
          Tambah
        </button>
      </form>
    </div>
  );
}
