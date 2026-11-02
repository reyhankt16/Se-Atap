export default function SetupPage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-sm flex-col justify-center gap-4 px-6 py-12">
      <h1 className="text-2xl font-bold">Supabase belum disambungkan</h1>
      <p className="text-muted">
        Isi <code>NEXT_PUBLIC_SUPABASE_URL</code> dan <code>NEXT_PUBLIC_SUPABASE_ANON_KEY</code> di file{" "}
        <code>.env.local</code>, lalu jalanin <code>supabase/schema.sql</code> di SQL Editor project Supabase lu.
        Restart <code>npm run dev</code> sesudahnya.
      </p>
    </main>
  );
}
