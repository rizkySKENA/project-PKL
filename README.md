# DigitalBook — Web E-Book

Website e-book dengan HTML, CSS, dan JavaScript murni. Tanpa framework dan tanpa server.

## Cara membuka
Klik dua kali `index.html`. Itu saja.
(Font Inter dan Literata dimuat dari Google Fonts, jadi butuh internet. Tanpa internet, tampilan tetap jalan memakai font cadangan.)

## Struktur
```
digitalbook/
├── index.html      Katalog (hero, pilihan editor, filter, tab favorit)
├── buku.html       Detail buku (?id=...)
├── baca.html       Pembaca per bab (?id=...&bab=...)
├── css/style.css   Semua gaya
├── js/data.js      "Database" buku (window.BUKU)
├── js/app.js       Logika tiga halaman
├── assets/logo.png Logo
└── PROMPT.md       Prompt untuk AI
```

## Menambah buku
Buka `js/data.js`, salin satu blok buku, lalu ganti `id` (harus unik), judul, penulis, kategori, `warna`, `pola` (`garis`, `lingkaran`, `segitiga`, atau `gelombang`), dan isi `bab`. Katalog, filter, dan kategori ikut menyesuaikan otomatis.

## Fitur
- Pencarian, filter kategori, urutan, tab Semua / Favorit / Sedang dibaca
- Favorit dan progres baca tersimpan di browser (localStorage)
- Pembaca: tema terang/sepia/gelap, ukuran dan jenis huruf, daftar isi, panah keyboard
- Responsif (diuji di lebar 1280px dan 390px)

## JSON atau PHP + database?

| | Data file (sekarang) | JSON + fetch | PHP + MySQL |
|---|---|---|---|
| Butuh server | Tidak | Ya (Live Server / XAMPP) | Ya (XAMPP / hosting) |
| Cocok untuk | Tugas, demo, belajar | Data banyak tapi statis | Login, admin, data berubah |
| Tambah buku | Edit `data.js` | Edit `buku.json` | Lewat halaman admin |
| Favorit/progres | Per browser | Per browser | Per akun, lintas perangkat |

**Rekomendasi:**
1. **Sekarang tetap pakai file data** (seperti ini). `fetch("buku.json")` tidak bisa jalan saat file dibuka langsung dengan klik dua kali, karena browser memblokirnya. Makanya data ditaruh di `data.js`.
2. **Pindah ke PHP + MySQL jika** dosen atau proyekmu meminta login, upload buku oleh admin, atau data tersimpan di server. Itu juga nilai tambah untuk mata kuliah web programming.
3. Kalau tidak memerlukan server tapi ingin data terpisah, ubah ke `buku.json` dan buka lewat ekstensi Live Server di VS Code.

Rancangan tabel bila nanti ke MySQL:
```
buku(id, slug, judul, penulis, kategori, rating, halaman, tahun, warna1, warna2, pola, sinopsis)
bab(id, buku_id, nomor, judul, isi)
pengguna(id, nama, email, password_hash)
favorit(pengguna_id, buku_id)
progres(pengguna_id, buku_id, bab, persen, diperbarui)
```

## Catatan hak cipta
Judul, penulis, dan isi bab di `data.js` adalah contoh karangan sendiri. Tata letak dan sampul dibuat orisinal, bukan salinan desain pihak lain. Jika memasukkan buku sungguhan, pastikan kamu punya izin atau memakai buku domain publik.
