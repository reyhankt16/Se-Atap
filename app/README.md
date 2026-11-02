# SeAtap

PWA keluarga — jadwal, tugas, belanja, keuangan, acara, catatan. Lihat `PRD-Website-SeAtap.md` di root project buat spesifikasi lengkap.

## Jalanin lokal

1. `npm install`
2. Bikin project di [supabase.com](https://supabase.com), lalu salin **Project URL** & **anon public key** dari Settings → API ke `.env.local`:
   ```
   NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=xxxxx
   ```
3. Buka **SQL Editor** di dashboard Supabase, paste isi `supabase/schema.sql`, klik **Run**.
4. `npm run dev` → buka `http://localhost:3000`.

Tanpa langkah 2–3, app otomatis nunjukin halaman `/setup` yang ngasih tau apa yang kurang.

## Coba alurnya

1. `/login` → klik "Daftar rumah baru", isi email + password.
2. Diarahin ke onboarding: bikin rumah → catat 1 tugas pertama → (opsional) salin link undangan.
3. Masuk ke app: coba Jadwal, Tugas, Belanja, Keuangan, Acara, Catatan dari nav bawah.
4. Buka link undangan (menu Anggota) di browser lain / mode incognito, login dengan akun lain → gabung ke rumah yang sama → data yang sama kelihatan.
5. Tambah anggota tanpa HP (anak) di menu Anggota, centang "belum bisa baca" → menu Tugas nampilin tombol "Tampilan anak".

## Test

```bash
npm test
```

Nguji `T2` (uang integer) dan `T3` (tugas berulang). `T1` (isolasi data antar rumah) ada di `src/lib/rls.integration.test.ts` — butuh `SUPABASE_SERVICE_ROLE_KEY` project nyata, auto-skip tanpa itu.

## Ubah tampilan

Lihat `CARA-UBAH-TAMPILAN.md`.

## Yang belum dibangun di tahap ini

Landing page, 6 aset printable, push notification/PWA install prompt, rumah contoh buat syuting — lihat `PRD-Website-SeAtap.md` bagian F4–F7.
