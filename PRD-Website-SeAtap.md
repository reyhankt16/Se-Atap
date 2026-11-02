# PRD — SeAtap

**Versi:** 2.0 · **Tanggal:** 2 November 2026
**Status:** Siap direview. Belum ada kode yang ditulis.
**Sumber:** `SeAtap — Kampanye Konten 30 Hari | Niche: Keluarga_Hasil Opus.pdf` (39 hal., dibaca lengkap)

---

## 0. Cara review dokumen ini

Tiap requirement punya **ID stabil**. Waktu review, cukup tulis ID-nya — `"ubah M4-2"`, `"hapus M6-2"`, `"R7 nggak perlu"`. Gue nggak akan ganti nomor ID walaupun isinya berubah, biar referensi lu nggak basi.

| Prefix | Artinya |
|---|---|
| `Dx` | Keputusan yang udah fix (jangan diubah tanpa sadar konsekuensinya — tiap Dx nyebut apa yang dia matiin) |
| `DB-x` | Tabel database |
| `Mx-n` | Requirement modul produk |
| `Rx` | Requirement lintas-fitur |
| `Lx` | Requirement landing page |
| `Ax` | Aset printable (lead magnet) |
| `Cx` | Requirement khusus karena app-nya jadi bahan syuting |
| `Fx` | Fase pengerjaan |
| `Ox` | Keputusan yang masih terbuka |

File ini markdown — lu bisa edit langsung. Kalau lu edit sendiri, gue baca ulang sebelum mulai bangun.

**Yang masih perlu lu putusin:** cuma 5 item di bagian 11 (`O1`–`O5`). Semuanya kecil dan nggak ngeblokir mulai kerja.

---

## 1. Keputusan yang udah fix

Empat ini udah lu jawab dan jadi fondasi seluruh dokumen. Tiap keputusan gue tulis **apa yang dia matiin**, karena itu yang bikin scope kebendung.

### D1 — Produk dulu, kampanye nanti
Kampanye 30 hari **baru mulai setelah produk beneran jalan**. Nggak ada syuting sebelum app-nya bisa dipakai orang asing.

**Yang dimatiin:** tahap "prototype buat syuting" ilang. Nggak perlu bikin layar bohongan yang nanti dibuang. Semua yang dibangun = produk sungguhan.

**Harganya:** 6 modul dibangun tanpa validasi pasar. Lihat risiko `RK-1`.

### D2 — Web app mobile-first (PWA), bukan native
Satu codebase. Dibuka dari link di bio tanpa perantara app store.

**Yang dimatiin:** nggak ada project Android/iOS, nggak ada review app store, nggak ada rilis terpisah per platform, nggak ada React Native. Desktop jalan tapi bukan prioritas.

**Batasnya:** push notification di iOS cuma jalan kalau PWA-nya di-install ke homescreen (iOS 16.4+). Lihat `R8` dan risiko `RK-4`.

### D3 — Gratis selama season 1, harga diputusin setelah H30
Jawaban H28 di depan kamera: *"Sekarang gratis. Gue masih bangun ini sambil dipakai di rumah sendiri. Nanti kalau ada versi berbayar, yang udah pakai dari awal gue kasih tau duluan."*

**Yang dimatiin:** **nol kode billing.** Nggak ada payment gateway, nggak ada paket, nggak ada batas kuota, nggak ada halaman harga, nggak ada trial, nggak ada invoice. Landing page cuma butuh satu baris di FAQ (`L6-3`).

**Kapan dibuka lagi:** setelah H30, kalau retensi kelihatan. 10 pembayar pertama ditagih manual lewat transfer — jangan bangun sistem pembayaran buat 10 orang.

### D4 — Gue yang bangun, lu yang kontrol lewat dokumen ini
Lu review PRD ini, kasih perubahan, baru gue eksekusi. Karena itu dokumen ini pakai ID stabil dan nyantumin model data — bagian yang paling mahal kalau salah dan baru ketahuan belakangan.

### D8 — Rumah 2 orang harus udah kerasa gunanya
Pasangan tanpa anak harus ngerasa app ini berguna di menit pertama, bukan nunggu keluarganya lengkap.

**Yang dimatiin:** onboarding nggak boleh maksa nambah anggota (`R9` jadi lebih ketat). Fitur anak — tampilan ikon, stiker, reward — **tersembunyi** sampai ada anggota yang belum bisa baca.

**Yang ditambahin:** tiap modul butuh tampilan kosong yang ngajarin, bukan layar kosong → `R10`, `R11`.

**Kenapa ini penting:** pasangan yang baru daftar bakal lihat 6 modul kosong sekaligus. Itu momen paling gampang orang nyerah, dan dokumen sumber nggak pernah nunjukin kondisi ini karena keluarga di cerita udah lengkap dari awal.

### D9 — Tampilan bisa lu ubah sendiri tanpa nunggu gue
Warna, font, ukuran teks, jarak, sudut, dan urutan beberapa section dikumpulin di **satu file**, plus tutorial singkat.

**Yang dimatiin:** nggak ada warna atau ukuran font yang ditulis langsung di tengah kode. Nggak ada cara penulisan style yang bikin nilai tampilan susah dicari.

**Batasnya — baca ini biar nggak kecewa:** ini nutup ganti warna, font, ukuran teks, jarak antar elemen, sudut, dan urutan section. **Nggak** nutup mindahin tombol ke tempat lain atau ngubah struktur halaman — itu masih butuh gue. "Adjust posisi sedikit" kecover lewat jarak & urutan; mindahin beneran nggak.

**Kapan dikerjain:** nilainya dikumpulin dari `F1` (biar nggak perlu dibongkar belakangan), tutorialnya ditulis di `F5` → `R12`.

---

## 1.5 Daftar fitur — apa yang user dapet

Ringkasan seluruh fitur dalam satu halaman. Detail & alasan tiap fitur ada di bagian 5–7.

### Di dalam app

**Jadwal keluarga** (`M1`)
- Satu jadwal gabungan seluruh rumah
- Lihat jadwal anggota lain tanpa nanya
- Warna beda per orang
- Filter: gabungan atau per anggota
- Acara bentrok kelihatan numpuk, bukan kelewat
- Layar pertama = "hari ini" & "besok"

**Tugas & piket** (`M2`)
- Daftar tugas rumah + siapa penanggung jawabnya
- Tampilan "siapa ngerjain apa hari ini"
- Tugas tanpa pemilik, bisa **diambil sendiri** oleh siapa pun
- Tugas berulang: harian & mingguan
- **Tampilan anak:** ikon/gambar buat yang belum bisa baca
- **Stiker/reward** buat anak yang nyelesaiin tugas
- Penanda review mingguan 5 menit

**Belanja & stok** (`M3`)
- Daftar belanja bersama, bisa dicentang
- Semua anggota bisa nambah item
- Barang rutin + penanda "udah abis" → otomatis masuk daftar belanja
- Lokasi penyimpanan barang (biar nggak beli dobel)
- **Sinkron realtime** — satu di toko, satu di rumah, lihat hal yang sama

**Keuangan rumah** (`M4`)
- Catat pengeluaran, 3 kategori: Wajib / Rumah / Senang
- **Input ≤5 detik, ≤3 tap**
- Ringkasan bulanan: 3 angka besar, bukan grafik
- Bisa dilihat bareng pasangan
- Rupiah, tanpa desimal

**Acara keluarga** (`M5`)
- Acara se-rumah yang kelihatan semua anggota
- **Pengingat/notifikasi** ke semua yang kena
- Bagikan ke grup WA

**Catatan & momen** (`M6`)
- Catatan bebas + 1 foto
- Satu tempat buat resep Mbah dan kalimat lucu anak

**Dasar & akun** (`R1`–`R9`, `DB-*`)
- Daftar & login
- Bikin rumah, undang anggota lewat share link (tempel di grup WA)
- **Anggota tanpa akun** — anak kecil jadi anggota tanpa perlu HP sendiri
- Semua data kelihatan seluruh anggota rumah (default)
- Install ke homescreen (PWA) + push notification
- Bahasa Indonesia, WIB, Rupiah, minggu mulai Senin
- Alur utama selesai ≤2 tap dari buka app
- **Kepakai dari 2 orang** — fitur anak tersembunyi sampai ada anak (`D8`)
- Tiap modul punya tampilan kosong yang ngajarin, bukan layar kosong (`R10`)
- **Tampilan bisa lu ubah sendiri** — warna, font, ukuran, jarak, urutan section, dari satu file + tutorial (`D9`)

### Di landing page

- Hero + tagline + hero image keranjang HP
- Section "ini masalahnya, bukan kamu" (3 masalah)
- Section "6 hal yang bisa kamu atur di satu tempat" + screenshot asli
- Cerita Keluarga Satu Atap + link Instagram
- FAQ: "ini app apa?" · "susah nggak?" · "bayar nggak?"
- **6 aset printable** yang bisa diunduh langsung tanpa isi email
- Form notifikasi Season 2
- Tracking per hari & per checkpoint H7/H14/H21/H30

### Jumlah

| Bagian | Fitur |
|---|---|
| 6 modul app | 25 requirement |
| Dasar & akun | 9 requirement lintas-fitur |
| Landing page | 8 section + 6 aset printable |

Yang **tidak** ada: lihat bagian 12.

---

## 2. Produk

### 2.1 Masalah yang dijual

Kampanye 30 hari itu nggak jualan "rumah rapi". Yang dijual: **mental load yang numpuk di satu orang.**

Dinyatakan eksplisit di H4 ("Capek yang Nggak Kelihatan"), H9 ("Kalau satu orang jadi 'Google-nya keluarga', dia capek"), H19 ("sistem crash"), dan jadi resolusi di H30: *"yang bikin rumah berat bukan jumlah pekerjaannya, tapi nggak ada yang tahu apa-apa selain satu orang."*

**Thesis produk:**
> "Rumah nggak harus rapi. Yang penting semua tahu."

**Konsekuensi yang mengikat seluruh desain:** nilai jual SeAtap bukan fitur, tapi **visibilitas bersama**. Tiap keputusan yang bikin info jadi privat per-user = melawan thesis produk sekaligus melawan 30 hari konten. Ini dikunci di `R1`.

**Yang digantikan SeAtap** (dari dokumen, bukan tebakan): grup WhatsApp yang kepencar (H20 — *"Berapa grup WA yang isinya info penting di HP lu sekarang?"*), kalender dinding, dan kepala ibu (H3 poll: *"jadwal disimpen di mana? Kepala ibu / HP / kalender dinding"*).

### 2.2 Audiens

Dari halaman 1 dokumen sumber:

- Orang tua muda **25–40 tahun**
- Ibu/papa yang urus rumah sambil kerja (WFH & kerja kantor dua-duanya ada)
- Keluarga serumah **sampai 3 generasi**
- Rumah kecil, 5 orang, 1 kamar mandi

### 2.3 Persona — dan requirement yang lahir dari masing-masing

5 karakter kampanye bukan cuma tokoh cerita. Mereka daftar tipe user yang harus kepakai appnya:

| Persona | Kondisi | Requirement yang lahir |
|---|---|---|
| **Sari** (32), mama, WFH | "pusat informasi rumah" | Butuh cara **nurunin** info dari kepala ke tempat yang semua bisa lihat → `R1` |
| **Ardan** (35), papa, kerja kantor | "jawab iya tanpa nyimpen info" | Bisa cek sendiri tanpa nanya. H25: *"Aku tau jadwal anak sendiri sekarang."* → `M1-5` |
| **Kayla** (8), anak pertama | bisa baca, suka aturan yang kelihatan | Lihat tugasnya sendiri + reward kelihatan → `M2-4` |
| **Bima** (4), anak kedua | **belum bisa baca, nggak punya HP** | Tampilan ikon + stiker, tanpa akun → `R3`, `DB-2` |
| **Mbah Uti** (60), serumah | lansia, nggak tech-savvy | H28 dijawab di kamera: *"nggak susah, malah Mbah Uti bisa."* Janji publik → `R2` |

`DB-2` (member tanpa akun) dan `R2` (aksesibilitas 60 tahun) itu dua requirement yang lahir langsung dari persona dan **paling gampang kelewat** kalau cuma baca daftar fitur.

---

## 3. Keputusan teknis

Prinsipnya: **sesedikit mungkin kode yang gue tulis sendiri.** Tiap baris yang gue tulis adalah baris yang harus gue rawat.

### D5 — Tanpa backend sendiri
Pakai layanan terkelola yang udah nanganin auth + database + realtime + storage dalam satu paket (Supabase: Postgres + Auth + Realtime + Storage + Row Level Security).

**Alasannya bukan selera.** Yang dibutuhin produk ini: login, isolasi data per-rumah, sinkron realtime (`M3-4`), simpan foto (`M6-1`). Nulis itu sendiri = server, session, migration, websocket, dan aturan izin yang gue tulis tangan — tempat bug keamanan paling sering lahir. Isolasi per-rumah ditangani Row Level Security di level database, satu pola diulang per tabel, bukan if-else di kode aplikasi.

**Yang dimatiin:** nggak ada server sendiri, nggak ada ORM, nggak ada API layer buatan sendiri, nggak ada Docker, nggak ada antrean job.

### D6 — Satu project, satu deploy
Landing page dan app ada di satu project. Landing di `/`, app di `/app`. Hosting statis + CDN.

**Yang dimatiin:** nggak ada dua repo, dua pipeline deploy, dua domain. Landing page tetap statis (penting buat `L7-1` — trafik datang bursty).

### D7 — Uang disimpan sebagai integer Rupiah
Nggak ada desimal, nggak ada float. Rupiah nggak pakai sen.

**Alasannya:** float buat uang itu bug yang nunggu waktu. Ini salah satu dari tiga bagian yang **wajib ada test**-nya (lihat bagian 9).

---

## 4. Model data

7 tabel. Ini bagian yang paling mahal kalau salah, jadi review bagian ini paling teliti.

### DB-1 — `households`
`id` · `name` · `created_at`

Satu rumah. Semua tabel lain nempel ke sini.

### DB-2 — `members`
`id` · `household_id` · `user_id` **(boleh kosong)** · `name` · `color` · `is_adult` · `can_read` · `created_at`

**`user_id` boleh kosong — ini keputusan desain, bukan kelalaian.** Bima (4 th) adalah anggota rumah tapi nggak punya akun dan nggak punya HP. Jadi "anggota rumah" dan "user yang login" itu dua hal berbeda. Tanpa ini, satu-satunya cara masukin anak kecil adalah bikinin dia akun palsu — dan itu ngerusak `M2-4` dan `R3`.

`can_read` buat milih tampilan teks vs ikon (`R3`). `color` buat pembeda visual di jadwal (`M1-2`), diambil dari H10 yang harfiah nunjukin 3 warna berbeda di layar.

### DB-3 — `events`
`id` · `household_id` · `member_id` (boleh kosong) · `title` · `starts_at` · `ends_at` (boleh kosong) · `is_household` · `remind_at` (boleh kosong) · `created_by`

**Satu tabel buat M1 (jadwal pribadi) dan M5 (acara keluarga).** Bentuk datanya identik; yang beda cuma `is_household` dan tampilannya. Dua tabel buat ini = duplikasi tanpa imbalan.

`remind_at` kosong = nggak ada pengingat. Cuma `M5` yang pakai.

### DB-4 — `tasks`
`id` · `household_id` · `member_id` **(boleh kosong)** · `title` · `icon` (boleh kosong) · `recur` (`null` | `daily` | `weekly`) · `due_date` (boleh kosong) · `created_by`

**`member_id` boleh kosong = tugas yang belum ada pemiliknya, bisa diambil sendiri.** Ini dari H17: *"Dia nggak nanya. Dia lihat catatan, terus ambil bagiannya."* Kalau tugas selalu harus di-assign dari atas, adegan H17 nggak mungkin kejadian — dan itu titik emosional paling penting di minggu 3.

`icon` buat tampilan anak (`M2-4`).

### DB-5 — `task_logs`
`id` · `task_id` · `member_id` · `done_on` (tanggal) · `created_at`

Riwayat penyelesaian, dipisah dari `tasks` karena tugas berulang diselesaikan berkali-kali. Ini yang bikin reward chart anak (`M2-5`) mungkin — tanpa tabel ini, stiker nggak punya tempat hidup.

### DB-6 — `items`
`id` · `household_id` · `name` · `location` (boleh kosong) · `is_routine` · `needed` · `checked_at` (boleh kosong) · `added_by`

**Satu tabel buat dua masalah berbeda di dokumen:**
- H2 "sabun hantu" — *tahu kita punya apa dan di mana* → `location`
- H6 belanja tanpa list — *inget mau beli apa* → `needed` + `checked_at`

Barang rutin yang abis tinggal di-set `needed = true`, langsung muncul di daftar belanja. Nggak perlu dua tabel.

### DB-7 — `expenses`
`id` · `household_id` · `amount_idr` **(integer)** · `category` (`wajib` | `rumah` | `senang`) · `note` (boleh kosong) · `spent_on` (tanggal) · `added_by`

Kategori **cuma 3 dan namanya dikunci**, persis dari H13: Wajib (cicilan, listrik) · Rumah (belanja, dapur) · Senang (jajan, hobi). Audiens 30 hari udah diajarin tiga istilah ini — ganti nama = konten jadi nggak nyambung.

`amount_idr` integer (lihat `D7`).

### DB-8 — `notes`
`id` · `household_id` · `title` · `body` · `photo_path` (boleh kosong) · `created_by` · `created_at`

Satu tabel buat semua catatan: resep Mbah Uti (H5) dan momen anak (H18). Nggak ada tipe terpisah.

### DB-9 — Aturan akses (berlaku ke DB-2 sampai DB-8)
Satu pola, diulang di tiap tabel: **user cuma bisa baca/tulis baris yang `household_id`-nya adalah rumah tempat dia jadi anggota.** Ditegakkan di level database (Row Level Security), bukan di kode aplikasi.

Ini batas kepercayaan utama produk. Nggak boleh dilewat, nggak boleh ditunda, dan wajib ada test-nya (bagian 9).

---

## 5. Modul produk

Format: **apa yang dokumen tunjukin** → requirement bernomor → kriteria selesai.

Enam modul ini bukan pilihan gue. H9 Feed 4 nyebut 4 kategori info wajib; H28 Feed 12 nyebut *"6 Hal yang Bisa Kamu Atur di Satu Tempat"*. Dua angka itu klop kalau ditambah Acara (H20, H27) dan Catatan (H18).

### M1 — Jadwal keluarga

**Dokumen tunjukin:** H3 (21–26s) *"Sari buka HP, layar jadwal, klik → masuk ke jadwal Ardan"* · H10 (17–23s) *"catatan di HP, tanda 3 warna berbeda"*, kasusnya 3 acara bentrok di jam 9 · H25 Ardan *"tunjukin layar"* · H28 (5–13s) close-up agenda.

| ID | Requirement |
|---|---|
| M1-1 | Satu jadwal gabungan seluruh rumah, kelihatan semua anggota |
| M1-2 | Tiap acara punya pemilik + **pembeda warna per anggota** (H10 harfiah nunjukin 3 warna) |
| M1-3 | Bisa dilihat gabungan atau difilter per anggota |
| M1-4 | **Bentrok kelihatan.** Dua acara di jam sama harus tampak numpuk, bukan kelewat. Ini premis utuh H10 |
| M1-5 | "Hari ini" & "besok" jadi tampilan pertama — ritual 10 menit (H8) dan 5 menit (H22) dua-duanya soal ngecek agenda besok |

**Selesai kalau:** Ardan bisa jawab "pentas Kayla tanggal berapa?" tanpa nanya Sari, dalam ≤3 tap dari buka app.

### M2 — Tugas & piket

**Dokumen tunjukin:** H4 (26–32s) Sari bagi tugas · H11 tiga langkah (tulis semua tugas → bagi realistis → sepakati review mingguan) · H17 (23–29s) *"Dia lihat catatan, terus ambil bagiannya"* · H24 (12–20s) *"siapa ngerjain apa hari ini"* · H12 & H23 tugas anak + reward chart + stiker; tugas Bima: sepatu ke rak, botol ke wastafel, baju kotor ke keranjang.

| ID | Requirement |
|---|---|
| M2-1 | Daftar tugas dengan penanggung jawab; "hari ini" jadi tampilan utama |
| M2-2 | Tugas bisa **belum ada pemiliknya** dan **diambil sendiri** oleh anggota (H17). Bukan cuma assign dari atas |
| M2-3 | Tugas berulang: harian & mingguan |
| M2-4 | **Tampilan anak:** ikon/gambar, bukan teks (H23). Dipilih lewat `can_read` di `DB-2` |
| M2-5 | **Stiker/reward sebagai umpan balik** (H12: *"Nggak dapet stiker"*; H23: *"ada stiker"*). Pakai `DB-5` |
| M2-6 | Penanda review mingguan 5 menit (H11 langkah 3) |

**Selesai kalau:** Bima (4 th) bisa lihat 3 tugasnya tanpa bisa baca, dan Sari nggak perlu ngingetin.

### M3 — Belanja & stok

**Dokumen tunjukin:** H2 "sabun hantu" — beli dobel padahal di rumah ada 3; penutup *"Rumah nggak butuh lebih banyak barang. Butuh catatan."* · H6 minyak goreng kelupaan; *"Bukan boros. Cuma nggak ada catatannya."* · H24 (4–12s) *"daftar belanja bulan ini, item yang udah kebeli dicentang."*

| ID | Requirement |
|---|---|
| M3-1 | Daftar belanja bersama, **bisa dicentang** (eksplisit di H24) |
| M3-2 | Siapa pun anggota bisa nambah item — ini yang nyelesaiin masalah "kelupaan" |
| M3-3 | Barang rutin punya penanda "udah abis" yang langsung masuk daftar belanja, plus lokasi penyimpanan (masalah H2) |
| M3-4 | **Sinkron realtime.** Satu orang di toko, satu di rumah, harus lihat hal yang sama detik itu |

**Selesai kalau:** Sari di toko tahu dalam 5 detik apakah minyak goreng masih ada di rumah.

### M4 — Keuangan rumah

**Dokumen tunjukin:** H13 tiga kategori (Wajib / Rumah / Senang) + trik *"catat struk di HP 5 detik"* divisualkan di 20–28s · H16 ngobrol uang tanggal 1, *"lihat catatan bareng"*, *"tunjukin layar, dua orang lihat"*.

| ID | Requirement |
|---|---|
| M4-1 | Pencatatan pengeluaran, 3 kategori terkunci: **Wajib / Rumah / Senang** |
| M4-2 | **Input ≤5 detik, ≤3 tap.** Ini bukan aspirasi — diucapin di depan kamera di H13. Kalau butuh milih dompet, tanggal, sub-kategori dan tag, H13 jadi klaim bohong |
| M4-3 | Tampilan "ke mana uangnya pergi" per bulan: **3 angka besar**, bukan grafik. H13 visualnya 3 kotak warna |
| M4-4 | Dua orang bisa lihat angka yang sama (H16). **Nggak ada dompet pribadi** — itu melawan premis H16 |
| M4-5 | Rupiah, format Indonesia, tanpa desimal (`D7`) |

**Selesai kalau:** pengeluaran kecatat dalam 5 detik, dan tanggal 1 pasangan buka satu layar lihat 3 angka tanpa perlu dijelasin.

### M5 — Acara keluarga + pengingat

**Dokumen tunjukin:** H20 info "besok ke rumah Oma" nyasar ke grup WA yang salah; solusi di 18–24s *"Sari bikin catatan acara, semua bisa lihat, **ada reminder**"*; penutup *"Satu info. Satu tempat. Semua tahu."* · H27 (16–22s) *"acara Minggu depan: keluarga Oma — semua bisa lihat"*.

| ID | Requirement |
|---|---|
| M5-1 | Acara se-rumah yang kelihatan semua anggota (`is_household` di `DB-3`) |
| M5-2 | **Pengingat/notifikasi** — satu-satunya fitur notifikasi yang dokumen sebut eksplisit. Dikirim ke semua anggota yang kena. Lihat batasnya di `R8` |
| M5-3 | Bisa dibagikan ke luar app (share ke grup WA) — yang digantikan adalah grup WA, dan transisinya nggak instan |

**Selesai kalau:** nggak ada lagi anggota rumah yang bilang *"kok aku nggak dikasih tau?"* — kalimat pembuka H20.

### M6 — Catatan & momen

**Dokumen tunjukin:** H18 Feed 8 *"5 Momen Keluarga yang Nggak Bisa Diulang"*, slide akhir *"Yang bikin kami mulai nyatet hal-hal kecil"* · H5 (20–25s) *"resep Mbah... ini satu-satunya yang kami catat"* · H30 momen kecil jadi penutup emosional.

| ID | Requirement |
|---|---|
| M6-1 | Catatan bebas + 1 foto, kelihatan semua anggota |
| M6-2 | **Satu jenis catatan saja.** Jangan bikin tipe terpisah buat resep, momen, dan kutipan anak — satu daftar bertitel udah nutup H5 dan H18 |

**Selesai kalau:** resep Mbah Uti dan kalimat lucu Bima bisa disimpen di tempat yang sama tanpa mikir mau ditaruh di mana.

---

## 6. Requirement lintas-fitur

Ini yang paling gampang kelewat karena nggak nempel di satu modul.

| ID | Requirement | Dari |
|---|---|---|
| **R1** | **Visibilitas bersama sebagai default.** Semua modul default-nya kelihatan seluruh anggota rumah. Tiap fitur yang bikin data privat per-user harus dipertanyain — itu melawan thesis produk | H20, seluruh struktur kampanye |
| **R2** | **"Mbah Uti bisa."** Teks besar secara default, kontras tinggi, **nggak ada gesture tersembunyi** (swipe-to-reveal atau long-press sebagai satu-satunya jalan), nggak ada jargon di UI. Alur utama (lihat jadwal hari ini / tugas hari ini) selesai **≤2 tap** dari buka app | H28 Q2 — janji publik |
| **R3** | **Anggota yang belum bisa baca.** Tampilan ikon + stiker, dibuka dari HP orang tua, tanpa akun sendiri | H12, H23, `DB-2` |
| **R4** | **Input cepat di semua modul.** Pengeluaran ≤5 detik (`M4-2`); item belanja dan tugas harus setara. Semua adegan "nyatet di HP" di dokumen durasinya 2–5 detik di layar — kalau prosesnya lebih lama dari yang divideoin, kampanyenya nggak akurat | H2, H6, H13, H24 |
| **R5** | **Lokal Indonesia.** Bahasa Indonesia, WIB, Rupiah, format tanggal Indonesia, minggu mulai Senin | H1 ff. |
| **R6** | **Mobile-first.** Semua adegan di dokumen pakai HP. Desktop jalan tapi bukan prioritas | `D2` |
| **R7** | **Undang anggota lewat share link.** Yang digantikan adalah grup WA, jadi jalur masuk paling natural: salin link undangan → tempel di grup WA | konsekuensi H20 |
| **R8** | **PWA installable + push notification.** `M5-2` butuh notifikasi. Batas yang harus diterima: di iOS, push cuma jalan kalau PWA di-install ke homescreen (iOS 16.4+). Jadi perlu ajakan install yang jelas, dan pengingat **nggak boleh jadi satu-satunya cara** info nyampe — acara tetap kelihatan di app | `D2` |
| **R9** | **Onboarding sependek mungkin.** User baru harus sampai ke "satu info kecatat dan kelihatan anggota lain" **tanpa harus ngisi profil seluruh keluarga dulu.** Urutan: daftar → bikin rumah → catat 1 hal → **baru** diajak undang anggota. Nambah anggota **nggak boleh jadi langkah wajib** (`D8`) | H30 *"mulai aja dari satu kebiasaan kecil"*; Feed 10 *"pilih satu yang mau lu mulai minggu ini"*; `D8` |
| **R10** | **Tampilan kosong yang ngajarin.** Tiap modul, waktu belum ada isinya, nunjukin 1 contoh + 1 tombol buat ngisi hal pertama. Bukan layar kosong, bukan tulisan "belum ada data" | `D8` |
| **R11** | **Fitur anak cuma muncul kalau ada anak.** Tampilan ikon, stiker, dan reward chart tersembunyi sampai ada anggota yang belum bisa baca. Rumah isi 2 orang nggak boleh lihat menu yang nggak relevan | `D8` |
| **R12** | **Satu file buat semua nilai tampilan** + tutorial `CARA-UBAH-TAMPILAN.md`: warna, font, ukuran teks, jarak, sudut, urutan section. Nilainya dikumpulin sejak `F1`; tutorialnya ditulis di `F5` | `D9` |

**Kenapa `R9` penting:** onboarding yang minta setup 5 anggota + 6 modul melawan pesan kampanyenya sendiri. Pesannya "mulai dari satu kebiasaan kecil" selama 30 hari, terus produknya minta setup 20 menit — itu kontradiksi yang kerasa.

---

## 7. Landing page

### L1 — Tujuan & KPI

Jadi satu-satunya tujuan "link in bio" selama 30 hari.

| ID | Metrik | Dari |
|---|---|---|
| L1-1 | Klik link bio → sesi landing page | H30: *"cek konversi ke link bio"* — satu-satunya metrik konversi yang dokumen sebut |
| L1-2 | Download aset printable, per aset | H3, H8, H11, H12, H22 semua janjiin aset ke yang komen |
| L1-3 | Pendaftaran SeAtap | tujuan akhir |
| L1-4 | Pendaftaran notifikasi Season 2 | H30: *"Season 2 mulai minggu depan"* — nangkep yang belum siap pakai app |

Laporan harus bisa dipotong **per hari** dan di checkpoint **H7 / H14 / H21 / H30** (dari bagian "Checkpoint Evaluasi" dokumen sumber).

**Catatan: nggak ada target angka absolut di sini, dan itu disengaja.** Akun Instagram-nya mulai dari nol follower (lihat `RK-9`), jadi titik awalnya nol dan angka target apa pun cuma bakal jadi karangan. Yang diukur: arah dan rasio, bukan angka. Target absolut baru masuk akal setelah ada data 7 hari pertama.

### L2 — Konteks pemakaian (ini yang nentuin requirement teknis)

| ID | Fakta | Konsekuensi |
|---|---|---|
| L2-1 | Semua trafik lewat **in-app browser Instagram** | Jangan andelin fitur browser penuh; hati-hati download file (`A7`); jangan andelin cookie lintas-situs |
| L2-2 | **Jam puncak 18.00–20.00 WIB**, tiap hari (Reels dipost jam itu) | Trafik datang bursty, bukan rata → `L7-1` |
| L2-3 | **Hari puncak: H3, H11, H24, H28, H30** | H3 & H11 = janji printable. H24/H28/H30 = app ditunjukin & link dipromosiin |
| L2-4 | HP & koneksi kelas menengah Indonesia | `L7-1` |

### L3 — ⚠️ Trafik web pertama itu H3, bukan H24

Di **H3 story frame 3** isinya: *"Link jadwal keluarga versi printable"*. Lalu **H11** janjiin template tugas & checklist bulanan "versi siap-print".

**Jadi landing page + aset printable pertama harus live sebelum H3** — dan karena syuting dilakukan batch 1×/minggu sebelum tayang, praktisnya sebelum H1.

### L4 — Pesan & tone

| ID | Requirement |
|---|---|
| L4-1 | Kalimat pendek, **hindari jargon fitur** (aturan tone dokumen) |
| L4-2 | Fitur ditulis sebagai **"dipakai buat apa"**, bukan nama fitur. Instruksi literal H28 Feed 12 |
| L4-3 | Bahasa Indonesia kasual, "gue/lu" — sama kayak caption. Bukan bahasa korporat |
| L4-4 | **Nggak boleh kerasa kayak iklan.** H28: *"Jangan pakai template iklan."* Nggak ada countdown palsu, nggak ada "LIMITED OFFER", nggak ada popup yang nutupin layar pas baru masuk |

**Aset verbal yang udah fix di dokumen — pakai apa adanya:**
- Tagline: **"Rumah nggak harus rapi. Yang penting semua tahu."**
- Penutup: **"Satu atap, satu tim."**
- Hashtag: `#SebulanSeatap` `#SatuAtapSatuTim` `#KeluargaSeAtap`
- Deskripsi satu kalimat (caption H28): **"buat ngatur rumah dalam satu tempat."**

### L5 — Struktur halaman

Urutannya ngikutin urutan pertanyaan di kepala orang yang baru nonton Reels dan ngeklik bio.

| ID | Section | Isi |
|---|---|---|
| L5-1 | **Hero** | Tagline + deskripsi satu kalimat. **Hero image-nya udah ditentuin dokumen:** H18 visual note — *"Ending shot keranjang HP jadi 'hero image' brand."* Pakai itu, bukan mockup app. Satu CTA saja. Nggak ada dinding badge app store (`D2` bikin itu nggak relevan) |
| L5-2 | **"Ini masalahnya, bukan kamu"** | Persis 3 masalah yang dokumen udah pilih di Feed 3: (1) info cuma di satu kepala, (2) barang nggak ada catatan, (3) belanja tanpa list. Audiens dari Reels udah dikasih framing ini — harus nyambung |
| L5-3 | **"6 hal yang bisa kamu atur di satu tempat"** | Judul & isi dari Feed 12 (H28). Tabel di bawah |
| L5-4 | **Cerita Keluarga Satu Atap** | Ringkas 30 hari (chaos → adem → diuji → lebih ringan) + link ke Instagram. **Belum ada testimoni user — jangan bikin yang palsu.** Bukti sosialnya cerita + angka follower/komentar yang nyata. **Disclaimer wajib**, nyontek footer dokumen sumber: *"Semua nama, karakter, dan cerita bersifat fiktif contoh."* |
| L5-5 | **Aset gratis** | Lihat bagian 8 |
| L5-6 | **FAQ** | Lihat `L6` |
| L5-7 | **Penutup + Season 2** | "Satu atap, satu tim." + CTA diulang + daftar notifikasi Season 2 (`L1-4`) |

**Isi `L5-3`** — 6 item, ditulis gaya "dipakai buat apa" (`L4-2`):

| # | Ditulis sebagai | Modul | Asal |
|---|---|---|---|
| 1 | Jadwal semua orang, kelihatan semua orang | M1 | H3, H10, H25, Feed 4 |
| 2 | Siapa ngerjain apa hari ini | M2 | H4, H11, H17, H24, Feed 4 |
| 3 | Daftar belanja & stok yang nggak dobel beli | M3 | H2, H6, H24, Feed 4 |
| 4 | Ke mana uangnya pergi | M4 | H13, H16, Feed 4 |
| 5 | Acara keluarga + yang ngingetin | M5 | H20, H27 |
| 6 | Momen kecil yang nggak mau dilupain | M6 | H18 |

Tiap item pakai **screenshot asli** (Feed 12: *"+ screenshot asli"*), bukan ilustrasi. Lihat `C1`.

### L6 — FAQ: pertanyaan yang HARUS kejawab

Tiga ini bukan tebakan. Dokumen nulisnya sebagai pertanyaan follower yang dijawab di H28, plus story H24 frame 4 (*"FAQ singkat jawab 'ini app apa?'"*).

| ID | Pertanyaan | Requirement |
|---|---|---|
| L6-1 | **"Ini app apa?"** | Jawab 1 kalimat, pakai kalimat caption H28. Ini pertanyaan nomor satu — kampanye sengaja mancing orang nanya ini. **Harus ketemu dalam 5 detik** di halaman |
| L6-2 | **"Susah nggak pakainya?"** | Jawaban publik yang udah diucapin: *"nggak, malah Mbah Uti bisa."* Halaman harus **buktiin**, bukan ngulang klaim → tunjukin tampilan `R2` |
| L6-3 | **"Bayar nggak?"** | Satu baris, dari `D3`: gratis selama season 1, harga nanti, yang pakai dari awal dikasih tau duluan. **Nggak ada halaman harga** |

FAQ tambahan yang pantes ada: butuh semua anggota punya HP? (jawabannya `R3`: nggak) · datanya aman? (`DB-9`) · bisa kalau serumah 3 generasi? (ya, itu desainnya).

### L7 — Non-fungsional

| ID | Requirement |
|---|---|
| L7-1 | **Statis + CDN.** LCP < 2,5s di 4G HP kelas menengah. Trafik datang lonjakan 2 jam/hari (`L2-2`) dan H24/H28/H30 bisa 10× hari biasa. Halaman statis itu jawaban yang benar, bukan jawaban yang malas |
| L7-2 | **Aksesibilitas:** kontras cukup, font ≥16px, target tap ≥44px. Audiensnya termasuk orang 60 tahun — Mbah Uti itu representasi segmen, bukan cuma tokoh |
| L7-3 | **OG image & title rapi** — link bakal di-share ke grup WA. Itu jalur distribusi sekunder yang jelas (H16 *"Share ke pasangan lu"*; Feed 4 *"tempel di chat keluarga"*) |
| L7-4 | **Tracking tanpa cookie banner yang nutupin layar.** Banner gede = ngerusak tone `L4-4` dan bunuh konversi di webview. Pakai analytics tanpa cookie pihak ketiga |

### L8 — Tracking

Kampanye punya **CTA keyword beda tiap hari** — itu sebenernya skema tracking yang udah kebentuk sendiri. Manfaatin.

| ID | Requirement |
|---|---|
| L8-1 | Satu URL kanonik yang isinya bisa dialihin per hari tanpa ganti link di Instagram (link bio cuma satu, dipakai 30 hari) |
| L8-2 | Story link sticker (H24, H28, H30) pakai parameter sendiri, biar kebedain dari link bio |
| L8-3 | Event minimum: sesi masuk · sumber (bio vs story) · klik CTA utama · unduh per aset · submit email Season 2 · mulai daftar · selesai daftar |
| L8-4 | Laporan bisa dipotong per hari + per checkpoint H7/H14/H21/H30 |

**Keyword komentar dari dokumen**, buat dicocokin ke lonjakan trafik: `PAGI` (H1) · `NUMPUK` (H10) · `MINGGU INI` + `CHECKLIST` (H11) · `MINGGU 3` (H14) · `keranjang HP` (H18) · `MULAI` (H22) · `APA` (H24) · `SATU TIM` (H29).

### L9 — Out of scope landing page
Blog · halaman harga (`D3` matiin ini) · halaman per-fitur · live chat · multi-bahasa · SEO berat · SSR dinamis.

---

## 8. Aset printable (lead magnet)

Ini utang. Tiap item di bawah udah dijanjiin di depan kamera atau di CTA.

| ID | Aset | Dijanjiin di | Bentuk | Deadline |
|---|---|---|---|---|
| A1 | Jadwal keluarga printable | H3 story 3 | PDF A4 | **sebelum H3** |
| A2 | Checklist "ngobrol 10 menit malam" | H8 story 1 | PDF / gambar | sebelum H8 |
| A3 | Template pembagian tugas rumah | H11 CTA: komen **"MINGGU INI"** | PDF A4 | sebelum H11 |
| A4 | Checklist bulanan keluarga | H11 Feed 5 CTA: komen **"CHECKLIST"** | PDF A4, 6 kategori: keuangan · dapur & stok · anak & sekolah · rumah & kebersihan · kesehatan · momen bersama | sebelum H11 |
| A5 | Ide 3 tugas pertama per umur anak | H12 CTA, diulang H23 | PDF, dibagi rentang umur | sebelum H12 |
| A6 | Checklist ritual 5 menit malam | H22 story 1 | PDF / gambar | sebelum H22 |

**Requirement perilaku:**

| ID | Requirement |
|---|---|
| A7 | **Harus jalan di in-app browser Instagram.** Download PDF di webview IG sering gagal atau bingungin. Tiap aset punya **halaman view HTML** yang kebaca di webview + tombol unduh PDF + petunjuk "buka di browser" kalau unduhan gagal. **Jangan cuma kasih link PDF mentah** |
| A8 | **Jangan di-gate pakai email.** Kampanye dibangun di atas tone "nggak jualan"; paywall email di H3 (hari ke-3, orang belum percaya) ngerusak itu. Unduh langsung; tawarin email **sesudah** unduh, opsional |
| A9 | Tiap aset punya URL sendiri yang terlacak (`L1-2`) |
| A10 | Enak di-print hitam-putih — audiens cetak di rumah atau di warnet |

---

## 9. Yang wajib ada test-nya

Sebagian besar app ini CRUD — nggak perlu test. Tiga bagian ini beda, dan nggak gue lewat:

| ID | Apa | Kenapa |
|---|---|---|
| T1 | **Isolasi data antar rumah** (`DB-9`) | Batas kepercayaan. Bug di sini = data keluarga orang kebaca keluarga lain. Test: user rumah A nggak bisa baca/tulis apa pun milik rumah B, di semua 7 tabel |
| T2 | **Uang** (`D7`, `M4-5`) | Integer Rupiah: input, simpan, jumlahin per kategori, tampilkan. Test angka besar dan nol |
| T3 | **Tugas berulang** (`M2-3`, `DB-5`) | Logika tanggal selalu lebih ribet dari kelihatannya. Test: tugas harian & mingguan menghasilkan daftar "hari ini" yang benar, dan diselesaikan dua kali di hari yang sama nggak bikin dobel |

Sisanya nggak di-test. Kalau lu mau cakupan lebih luas, itu permintaan terpisah.

---

## 10. Requirement dari kebutuhan syuting

App-nya jadi bahan syuting. Ini yang gampang kelewat dan bikin produksi macet.

| ID | Requirement |
|---|---|
| **C1** | **Rumah contoh yang aman ditayangin.** H24 nyebut *"Screen recording asli (tanpa data pribadi)"*. Perlu satu rumah berisi data contoh yang kelihatan asli: nama Sari/Ardan/Kayla/Bima/Mbah Uti, angka Rupiah yang masuk akal, jadwal yang masuk akal. Dipakai buat screen recording H20, H24, H28, H30 **dan** screenshot `L5-3` |
| **C2** | **Navigasi 3 modul harus mulus.** H24 butuh satu screen recording tanpa jeda yang nunjukin belanja → tugas → jadwal dalam 30 detik. Artinya pindah antar modul harus udah enak, bukan sekadar jalan |
| **C3** | **Nama produk nggak boleh mendominasi layar.** Nama SeAtap cuma muncul 3–4× dalam 30 hari dan baru "diungkap" di H28, padahal layarnya udah di-screenshot dari H2. Logo kecil, jangan ada banner nama di tiap halaman |

Karena `D1` (produk dulu), semua modul udah jalan sebelum syuting. Jadi tabel dependency per-minggu dari versi 1 **nggak relevan lagi** — tapi `C1` masih perlu nyakup semua layar yang muncul di 30 hari:

**Layar yang muncul di konten** (buat mastiin data contoh nyakup semuanya): H2 catat stok · H3 jadwal + jadwal anggota lain · H4 bagi tugas · H5 catatan · H6 daftar belanja · H10 jadwal warna · H13 catat pengeluaran · H16 keuangan dilihat bareng · H17 ambil tugas · H20 acara + reminder · H23 tampilan anak · H24 belanja+tugas+jadwal · H25 jadwal anak · H28 agenda close-up · H30 beberapa layar.

---

## 11. Tahapan pengerjaan

Urutan ini hasil `D1`: produk beneran selesai dulu, kampanye belakangan.

| ID | Fase | Isi | Kode baru |
|---|---|---|---|
| **F0** | Review PRD | Lu baca dokumen ini, kasih perubahan pakai ID | nol |
| **F1** | Fondasi | Project PWA, auth, 7 tabel, aturan akses `DB-9` + test `T1`, bikin rumah, undang anggota (`R7`), onboarding `R9`, **satu file nilai tampilan** (`R12`) | sedang |
| **F2** | 3 modul inti | M1 jadwal · M2 tugas · M3 belanja/stok. Tiga ini yang paling sering muncul di konten | besar |
| **F3** | 3 modul sisa | M4 keuangan (+test `T2`) · M5 acara+reminder · M6 catatan | sedang |
| **F4** | Anak + PWA | Tampilan anak `R3`/`M2-4` (tersembunyi kalau nggak ada anak, `R11`) · stiker `M2-5` (+test `T3`) · install prompt & push `R8` · navigasi mulus `C2` · aksesibilitas `R2` | sedang |
| **F5** | Landing page | `L5` seluruh section + `L8` tracking + tutorial `CARA-UBAH-TAMPILAN.md` (`R12`) | kecil |
| **F6** | 6 aset printable | A1–A6 + perilaku A7–A10 | kecil |
| **F7** | Rumah contoh | `C1` data contoh yang nyakup semua layar di bagian 10 | kecil |
| **F8** | Syuting | 4 batch × 3–4 jam, 7 Reels per batch | nol |
| **F9** | Kampanye | H1–H30 jalan | nol |
| **F10** | Setelah H30 | Cek retensi → **baru** mikir harga & billing (`D3`) | ditunda |

**Jalur kritis:** `F1` → `F2` → `F3`. `F5`, `F6`, `F7` bisa jalan paralel sama akhir `F3`.

**Yang bisa digeser ke depan tanpa ngubah keputusan lu:** `F5` + `F6` (landing page + printable) sebenernya nggak butuh produk jadi. Kalau ditayangin lebih awal, lu bisa ngumpulin email dan ngukur minat **sambil** produk dibangun — itu mitigasi buat `RK-1` yang nggak ngorbankan `D1`. Keputusan lu.

---

## 12. Yang TIDAK dibangun

Nggak ada di 30 hari konten, atau dimatiin sama keputusan di bagian 1:

Billing / payment gateway / paket / kuota / halaman harga (`D3`) · app native Android & iOS (`D2`) · backend sendiri, ORM, API layer (`D5`) · integrasi kalender eksternal · chat di dalam app · meal planning / resep sebagai modul sendiri · laporan keuangan canggih & grafik · multi-rumah per user · web desktop penuh · kolaborasi di luar keluarga · AI / otomasi · dark mode · ekspor data.

Kalau lu mau salah satu masuk, itu permintaan baru — bukan turunan dokumen sumber.

---

## 13. Keputusan yang masih terbuka

Lima ini kecil dan **nggak ngeblokir `F1`**. Gue pakai default di bawah kalau lu nggak bilang apa-apa.

| ID | Pertanyaan | Default gue |
|---|---|---|
| **O1** | Keuangan boleh dilihat anak? `R1` bilang semua lihat semua, tapi angka cicilan di mata anak 8 tahun mungkin nggak lu mau | **Modul keuangan cuma kelihatan anggota `is_adult`.** Satu pengecualian dari `R1`, dan satu-satunya |
| **O2** | Nama domain | belum ada — perlu dari lu sebelum `F5` |
| **O3** | Logo & warna brand | Gue pakai palet netral dulu. `D9`/`R12` bikin lu bisa ganti sendiri belakangan tanpa nunggu gue |
| **O4** | Teks CTA utama di hero | "Coba di rumah lu" |
| **O5** | ~~"Bisa di-edit langsung"~~ — **terjawab**: jadi `D9` + `R12` (satu file nilai tampilan + tutorial) | selesai |
| **O6** | Lu pakai SeAtap buat rumah sendiri selama dibangun? Lu bilang "lihat nanti" | Gue tanya ulang di akhir `F3`, sebelum masuk fitur anak — karena di titik itu umpan balik nyata paling ngaruh |

---

## 14. Risiko

| ID | Risiko | Dampak | Catatan |
|---|---|---|---|
| **RK-1** | **6 modul dibangun tanpa validasi pasar** | Kalau ternyata orang nggak butuh, yang kebuang bukan cuma kode tapi 4 batch syuting juga | Konsekuensi langsung `D1`. Lu udah tau dan milih ini. Diperparah `RK-9`. Mitigasi murah tanpa ngubah `D1`: tayangin `F5`+`F6` lebih awal, kumpulin email, ukur minat sambil bangun |
| **RK-2** | `M4-2` (input 5 detik) nggak kecapai | H13 jadi klaim bohong yang gampang dibantah di kolom komentar | Ukur beneran sebelum syuting H13, pakai stopwatch |
| **RK-3** | `R2` ("Mbah Uti bisa") cuma jadi klaim | H28 jadi bohong di depan kamera | Tes sama satu orang di atas 55 tahun yang bukan keluarga sebelum syuting H28 |
| **RK-4** | Push notification nggak nyampe di iOS | `M5-2` lemah di sebagian user | Sudah dibatasi di `R8`: acara tetap kelihatan di app, notifikasi cuma pelengkap. Pasar Indonesia mayoritas Android |
| **RK-5** | Landing page kerasa kayak iklan | Ngerusak tone 80% konten non-jualan yang dibangun 27 hari | `L4-4`; dokumen eksplisit: "Jangan pakai template iklan" |
| **RK-6** | Download PDF gagal di webview Instagram | Janji `A1` & `A3`/`A4` nggak kesampaian, tepat di hari trafik puncak | Dimitigasi `A7` |
| **RK-7** | Isolasi data antar rumah bocor | Data keluarga orang kebaca keluarga lain | `DB-9` + test `T1`. Nggak boleh ditunda |
| **RK-8** | Karakter fiktif dianggap keluarga nyata | Masalah kepercayaan kalau kebuka | Disclaimer `L5-4`, diambil dari footer dokumen sumber |
| **RK-9** | **Akun Instagram mulai dari nol follower** | Rencana 30 hari mengasumsikan ada yang nonton. Dari nol, H1–H7 kemungkinan views-nya sangat kecil — dan justru 7 hari itu dipakai buat bangun karakter, yang cuma berguna kalau ada yang ngikutin | **Risiko yang dokumen sumber nggak bahas sama sekali.** Lihat bagian 15 |

---

## 15. RK-9: akun mulai dari nol

Ini bukan masalah teknis, tapi dia yang nentuin apakah seluruh isi dokumen ini kepakai. Gue tulis di sini karena **dokumen sumber nggak nyinggung ini sama sekali** — dia mengasumsikan ada yang nonton.

### Masalahnya

Rencana 30 hari itu **rencana retensi & konversi, bukan rencana tumbuh dari nol.** Buktinya ada di dokumennya sendiri:

- Format serial ("ngikutin 30 hari hidup mereka") cuma jalan kalau ada yang ngikutin dari H1.
- Minggu 1 dipakai buat **bangun karakter** — investasi yang hangus kalau penontonnya nol.
- Feed 6 (Q&A) nyuruh pakai pertanyaan follower, dengan catatan *"buat sendiri kalau belum ada"*. Itu tanda penulisnya sendiri sadar asumsi ini rapuh.
- Checkpoint H7 nyuruh *"lihat 3 Reels dengan views tertinggi → gandakan gaya itu di minggu 2"*. Instingnya benar: tes dulu, baru gandakan. Tapi dari nol follower, lu butuh umpan balik itu **sebelum** komit 4 batch syuting, bukan di H7.

### Episode mana yang jalan tanpa audiens

| Jalan dari nol (berdiri sendiri) | Butuh audiens dulu |
|---|---|
| H2 sabun hantu · H5 Mbah Uti vs resep · H6 belanja bulanan · H10 jadwal bentrok · H12 piket anak · H19 semua minta barengan · H20 drama grup WA · H26 papa masak · H27 tamu datang | H7 · H14 · H21 · H25 · H29 · H30 — semuanya recap atau before/after yang nyebut episode yang nggak ada yang nonton |
| Yang edukasi juga jalan (banyak disimpan): H8 · H9 · H11 · H13 · H16 · H22 · H23 | Feed 6 Q&A — butuh follower yang nanya |

9 episode komedi + 7 edukasi bisa jalan tanpa audiens. 6 episode recap nggak.

### Mitigasi yang gue saranin

**Posting 5–10 Reels berdiri sendiri dari kolom kiri, sebelum komit 4 batch syuting.** Pakai yang butuh produksi paling ringan (H2 dan H20 cuma butuh 1 kamera statis / screen recording).

Kenapa ini murah: kalau nggak ada yang nembus, lu hemat 4 batch syuting **dan** tau lebih awal sebelum 6 modul kelar. Kalau ada yang nembus, lu udah punya follower awal pas H1 mulai — dan minggu 1 jadi nggak hangus.

Ini bisa jalan **paralel sama `F1`–`F3`** dan **nggak ngubah `D1`**: syutingnya nggak nunjukin layar app sama sekali, jadi nggak nunggu produk jadi.

**Gue nggak ngubah rencana 30 hari lu.** Ini keputusan lu; gue cuma nunjukin bagian mana yang rapuh kalau dimulai dari nol.

---

*Diturunkan dari rencana konten 30 hari versi Opus. Tiap requirement nyantumin hari/halaman asalnya; yang nggak ada di dokumen sumber ditandai sebagai keputusan (`Dx`) atau pertanyaan terbuka (`Ox`).*
