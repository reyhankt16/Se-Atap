# Cara ubah tampilan

Semua nilai tampilan (warna, font, ukuran teks, jarak, sudut) ada di **satu file**:

```
src/app/globals.css
```

Buka bagian `:root { ... }` di atas file itu. Isinya:

| Variabel | Fungsi |
|---|---|
| `--color-primary` | Warna tombol utama & aksen |
| `--color-bg` / `--color-fg` | Warna latar & teks utama |
| `--color-muted` | Warna teks sekunder (deskripsi, label) |
| `--color-border` | Warna garis pembatas kartu/input |
| `--color-surface` | Warna latar kartu kosong |
| `--color-success` / `--color-danger` | Warna hijau (selesai) & merah (error/bentrok) |
| `--text-base` | Ukuran font dasar seluruh app (jangan di bawah 16px) |
| `--radius` | Sudut lengkung kartu & tombol |
| `--space-unit` | Satuan jarak (dipakai manual lewat kelas Tailwind seperti `gap-4`, `p-4`) |

**Ganti warna:** tulis ulang nilai hex-nya, contoh:
```css
--color-primary: #16a34a; /* ganti dari biru ke hijau */
```
Simpan file, refresh browser — langsung keganti di semua halaman.

**Ganti font:** ganti baris `--font-sans` di `:root`, atau ganti font Google Fonts yang di-load di `src/app/layout.tsx` (import `Geist` diganti font lain dari `next/font/google`).

**Ganti ukuran teks tombol/judul per halaman:** dipakai lewat kelas Tailwind langsung di tiap file (`text-lg`, `text-2xl`, dst) — bukan di `globals.css`. Ini **di luar** cakupan satu-file: ganti ukuran per-elemen begini tetap butuh edit kode halamannya.

**Yang nggak bisa diubah lewat file ini:** posisi tombol, urutan field di form, struktur halaman. Itu masih butuh perubahan kode.

**Warna per anggota keluarga** (titik warna di jadwal) diset per orang di menu Anggota, bukan di file ini — karena itu data, bukan tema.
