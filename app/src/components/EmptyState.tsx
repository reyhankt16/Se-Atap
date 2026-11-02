// R10: tiap modul kosong nunjukin contoh, bukan cuma teks "belum ada data".
export function EmptyState({ example, hint }: { example: string; hint: string }) {
  return (
    <div className="rounded-card border border-dashed border-border bg-surface px-4 py-6 text-center">
      <p className="text-lg text-muted">{example}</p>
      <p className="mt-1 text-sm text-muted">{hint}</p>
    </div>
  );
}
