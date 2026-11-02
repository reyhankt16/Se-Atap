import { getHouseholdContext } from "@/lib/context";
import { EmptyState } from "@/components/EmptyState";
import type { Note } from "@/lib/types";
import { createNote, deleteNote } from "./actions";

export default async function CatatanPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;
  const { supabase, household } = await getHouseholdContext();
  if (!household) return null;

  const { data } = await supabase
    .from("notes")
    .select("*")
    .eq("household_id", household.id)
    .order("created_at", { ascending: false });
  const notes = (data ?? []) as Note[];

  return (
    <div className="flex flex-col gap-4 p-4">
      <h1 className="text-2xl font-bold">Catatan &amp; momen</h1>
      <p className="text-muted">Resep Mbah, kalimat lucu anak — satu tempat buat semua.</p>

      {error && <p className="text-danger">{error}</p>}

      <form action={createNote} className="flex flex-col gap-2 rounded-card border border-border p-3">
        <p className="font-medium">Catatan baru</p>
        <input name="title" required placeholder="Judul" className="rounded-card border border-border px-3 py-2" />
        <textarea name="body" placeholder="Isi catatan (opsional)" className="rounded-card border border-border px-3 py-2" />
        <input name="photo" type="file" accept="image/*" className="text-sm" />
        <button className="rounded-card bg-primary px-4 py-3 text-lg font-semibold text-primary-foreground">
          Simpan
        </button>
      </form>

      {notes.length === 0 && (
        <EmptyState example="Contoh: Resep sambal Mbah Uti" hint="Belum ada catatan. Tulis yang pertama lewat form di atas." />
      )}

      <div className="flex flex-col gap-3">
        {notes.map((n) => {
          const photoUrl = n.photo_path
            ? supabase.storage.from("notes").getPublicUrl(n.photo_path).data.publicUrl
            : null;
          return (
            <div key={n.id} className="rounded-card border border-border p-3">
              {photoUrl && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={photoUrl} alt={n.title} className="mb-2 max-h-64 w-full rounded-card object-cover" />
              )}
              <p className="font-medium">{n.title}</p>
              {n.body && <p className="text-sm text-muted whitespace-pre-wrap">{n.body}</p>}
              <form action={deleteNote} className="mt-2">
                <input type="hidden" name="id" value={n.id} />
                <button className="text-sm text-muted">Hapus</button>
              </form>
            </div>
          );
        })}
      </div>
    </div>
  );
}
