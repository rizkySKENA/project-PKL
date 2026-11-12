# Prompt untuk membuat / mengembangkan web e-book "DigitalBook"

Salin salah satu prompt di bawah ke Claude (atau AI lain). Ganti bagian dalam [kurung siku].

---

## 1. Prompt dasar (membuat dari nol)

```
Kamu adalah front-end developer. Buatkan website e-book bernama "DigitalBook"
dengan HTML, CSS, dan JavaScript murni (tanpa framework, tanpa build tool),
sehingga bisa dibuka langsung dengan klik dua kali pada index.html.

TUJUAN
Perpustakaan e-book berbahasa Indonesia: pengguna bisa mencari buku, menyimpan
favorit, membaca per bab, dan melanjutkan bacaan terakhir.

HALAMAN (3 berkas HTML)
1. index.html (katalog)
   - Navbar atas (BUKAN sidebar kiri): logo, menu "Katalog" dan "Rak saya".
   - Hero dengan kolom pencarian dan kartu "Lanjutkan membaca"
     (jika belum ada bacaan, tampilkan buku pilihan).
   - Bagian "Pilihan editor": baris horizontal yang bisa digeser.
   - Katalog: chip kategori, tab (Semua / Favorit / Sedang dibaca),
     urutkan (rating, terbaru, judul A-Z), grid kartu buku, tombol hati (favorit).
   - Pesan kosong yang ramah bila hasil filter tidak ada.
2. buku.html?id=... (detail)
   - Sampul besar, judul, penulis, rating, jumlah halaman dan bab, sinopsis.
   - Tombol "Mulai/Lanjutkan membaca" dan "Simpan ke favorit", bar progres.
   - Daftar bab (klik untuk langsung membaca) dan bagian "Buku lainnya".
3. baca.html?id=...&bab=... (pembaca)
   - Teks di tengah, lebar maksimal ~680px, line-height lega.
   - Pengaturan: tema Terang / Sepia / Gelap, ukuran huruf (A- / A+),
     jenis huruf Serif / Sans.
   - Daftar isi (panel), tombol bab sebelumnya/berikutnya, pintasan keyboard
     panah kiri/kanan, bar progres membaca di atas.
   - Simpan progres (bab dan posisi gulir) dan pulihkan saat dibuka lagi.

STRUKTUR BERKAS
digitalbook/
  index.html, buku.html, baca.html
  css/style.css
  js/data.js   (data buku: window.BUKU = [...], tiap buku punya id, judul,
                penulis, kategori, rating, halaman, tahun, warna[2], pola,
                sinopsis, bab[{judul, isi[paragraf]}])
  js/app.js    (satu berkas, memilih logika dari <body data-halaman="...">)
  assets/logo.png

DATA
- Buat [8] buku contoh dengan judul dan isi karangan sendiri (bukan buku asli,
  bukan kutipan dari buku berhak cipta). Tiap buku [3] bab, tiap bab [2] paragraf.
- Sampul dibuat dengan CSS gradien + SVG pola (garis, lingkaran, segitiga,
  gelombang), BUKAN gambar dari internet.
- Status pengguna (favorit, progres, tema) disimpan di localStorage dengan
  try/catch agar tidak error di mode privat.

DESAIN
- Warna: hitam #151515 untuk navbar, hijau #2ec27e sebagai aksen, latar
  #f6f7f4. Hero hijau tua gelap. Font: Inter (UI) dan Literata (teks bacaan).
- Desain orisinal, jangan menyalin desain dari Dribbble/Behance/situs lain.
  Boleh terinspirasi dari pola umum (pencarian, grid sampul, kategori).
- Responsif sampai lebar 360px, tanpa scroll horizontal pada halaman.

KUALITAS
- HTML semantik, label ARIA untuk tombol ikon, fokus keyboard terlihat.
- Kontras teks memenuhi WCAG AA. Hormati prefers-reduced-motion.
- Kode diberi komentar bahasa Indonesia yang singkat dan jelas, nama
  variabel/kelas CSS dalam bahasa Indonesia.
- Semua teks antarmuka dalam bahasa Indonesia.

KELUARAN
Berikan seluruh berkas lengkap, lalu ringkasan singkat cara membukanya
dan cara menambah buku baru di js/data.js.
```

---

## 2. Prompt tambahan (pilih sesuai kebutuhan)

**Menambah buku baru**
```
Tambahkan [3] buku baru ke js/data.js dengan format yang sama persis.
Kategori: [Teknologi/Bisnis/...]. Isi bab karangan sendiri, masing-masing [3] bab.
Jangan ubah berkas lain.
```

**Menghubungkan ke PHP + MySQL**
```
Ubah proyek ini agar data buku diambil dari PHP + MySQL (XAMPP).
Buat: database.sql (tabel buku, bab, pengguna, favorit, progres),
api/buku.php (daftar + pencarian), api/buku_detail.php?id=,
api/favorit.php (POST toggle), api/progres.php (POST simpan).
Gunakan PDO dengan prepared statement. Ganti window.BUKU di app.js
dengan fetch() ke API. Pertahankan tampilan yang ada.
```

**Fitur login sederhana**
```
Tambahkan register dan login (PHP session, password_hash/password_verify).
Favorit dan progres membaca disimpan per pengguna di database,
bukan di localStorage.
```

**Memakai berkas EPUB/PDF sungguhan**
```
Ganti isi bab di data.js dengan pembaca EPUB memakai epub.js
(atau PDF memakai PDF.js) untuk berkas di folder books/.
Pertahankan pengaturan tema dan ukuran huruf.
```

---

## 3. Tips supaya hasil AI lebih bagus
1. Sebutkan batasan teknologi (misalnya "tanpa framework").
2. Sebutkan halaman dan fitur satu per satu seperti di atas.
3. Lampirkan referensi dan tulis "terinspirasi, bukan menyalin".
4. Minta AI menguji hasilnya (buka halaman, cek error konsol, cek tampilan HP).
5. Kerjakan bertahap: katalog dulu, lalu detail, lalu pembaca.
