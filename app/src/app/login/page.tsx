import { signIn, signUp } from "./actions";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;

  return (
    <main className="mx-auto flex min-h-screen max-w-sm flex-col justify-center gap-6 px-6 py-12">
      <div>
        <h1 className="text-2xl font-bold">SeAtap</h1>
        <p className="mt-1 text-muted">Rumah nggak harus rapi. Yang penting semua tahu.</p>
      </div>

      {error && (
        <p className="rounded-card bg-red-50 px-4 py-3 text-danger" role="alert">
          {error}
        </p>
      )}

      <form className="flex flex-col gap-3">
        <label className="flex flex-col gap-1">
          <span className="text-lg font-medium">Email</span>
          <input
            name="email"
            type="email"
            required
            autoComplete="email"
            className="rounded-card border border-border px-4 py-3 text-lg"
          />
        </label>
        <label className="flex flex-col gap-1">
          <span className="text-lg font-medium">Kata sandi</span>
          <input
            name="password"
            type="password"
            required
            minLength={6}
            autoComplete="current-password"
            className="rounded-card border border-border px-4 py-3 text-lg"
          />
        </label>
        <button
          formAction={signIn}
          className="mt-2 rounded-card bg-primary px-4 py-3 text-lg font-semibold text-primary-foreground"
        >
          Masuk
        </button>
        <button
          formAction={signUp}
          className="rounded-card border border-primary px-4 py-3 text-lg font-semibold text-primary"
        >
          Daftar rumah baru
        </button>
      </form>
    </main>
  );
}
