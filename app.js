/* =====================================================
   DigitalBook — app.js
   Satu berkas untuk tiga halaman. Halaman ditentukan oleh
   atribut <body data-halaman="katalog | detail | baca">.
   Data dibaca dari window.BUKU (js/data.js).
   Status pengguna (favorit, progres, tema) disimpan di localStorage.
   ===================================================== */
'use strict';

(function () {
  var BUKU = window.BUKU || [];
  var KUNCI = 'digitalbook.v1';

  /* ───────── Penyimpanan ───────── */
  var DEFAULT = { favorit: [], progres: {}, tema: 'terang', ukuran: 19, huruf: 'serif' };
  var S = muat();

  function muat() {
    try {
      var d = JSON.parse(localStorage.getItem(KUNCI));
      return Object.assign({}, DEFAULT, d || {});
    } catch (e) { return Object.assign({}, DEFAULT); }
  }
  function simpan() {
    try { localStorage.setItem(KUNCI, JSON.stringify(S)); } catch (e) { /* mode privat: abaikan */ }
  }

  /* ───────── Helper ───────── */
  function esc(t) {
    return String(t).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  function $(id) { return document.getElementById(id); }
  function param(n) { return new URLSearchParams(location.search).get(n); }
  function cari(id) { return BUKU.filter(function (b) { return b.id === id; })[0]; }
  function adaFavorit(id) { return S.favorit.indexOf(id) > -1; }
  function toggleFavorit(id) {
    var i = S.favorit.indexOf(id);
    if (i > -1) S.favorit.splice(i, 1); else S.favorit.push(id);
    simpan();
  }
  function persenBuku(b) {
    var p = S.progres[b.id];
    if (!p) return 0;
    return Math.min(100, Math.round(((p.bab + (p.persen || 0) / 100) / b.bab.length) * 100));
  }
  function terakhirDibaca() {
    var hasil = null;
    BUKU.forEach(function (b) {
      var p = S.progres[b.id];
      if (p && (!hasil || p.waktu > S.progres[hasil.id].waktu)) hasil = b;
    });
    return hasil;
  }

  var IKON_HATI = '<svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path d="M12 21s-7.5-4.7-9.5-9.3A5.4 5.4 0 0 1 12 6.4a5.4 5.4 0 0 1 9.5 5.3C19.5 16.3 12 21 12 21z"/></svg>';

  /* ───────── Sampul buku (pola SVG per buku) ───────── */
  var POLA = {
    garis: '<g stroke="#fff" stroke-opacity=".2" stroke-width="2"><path d="M-10 40L130 -20M-10 70L130 10M-10 100L130 40M-10 130L130 70M-10 160L130 100M-10 190L130 130"/></g>',
    lingkaran: '<g fill="#fff" fill-opacity=".14"><circle cx="98" cy="32" r="40"/><circle cx="14" cy="150" r="30"/></g><circle cx="98" cy="32" r="24" fill="none" stroke="#fff" stroke-opacity=".35" stroke-width="2"/>',
    segitiga: '<g fill="#fff" fill-opacity=".13"><polygon points="120,0 120,90 40,0"/><polygon points="0,170 0,100 70,170"/></g><polygon points="120,40 120,90 80,40" fill="#fff" fill-opacity=".1"/>',
    gelombang: '<g fill="none" stroke="#fff" stroke-opacity=".22" stroke-width="2.5"><path d="M-5 30Q15 15 35 30T75 30T115 30T155 30"/><path d="M-5 50Q15 35 35 50T75 50T115 50T155 50"/><path d="M-5 70Q15 55 35 70T75 70T115 70T155 70"/></g>'
  };
  function sampul(b, kelas) {
    return '<div class="sampul ' + (kelas || '') + '" style="--a:' + b.warna[0] + ';--b:' + b.warna[1] + '">' +
      '<svg class="sampul-pola" viewBox="0 0 120 170" preserveAspectRatio="xMidYMid slice" aria-hidden="true">' + (POLA[b.pola] || '') + '</svg>' +
      '<div class="sampul-teks"><span class="sampul-kat">' + esc(b.kategori) + '</span>' +
      '<strong>' + esc(b.judul) + '</strong><em>' + esc(b.penulis) + '</em></div></div>';
  }

  /* ───────── Navbar & footer ───────── */
  function pasangNavFooter(aktif) {
    var nav = $('nav');
    if (nav) {
      nav.innerHTML =
        '<header class="nav"><div class="nav-isi wrap">' +
        '<a class="nav-brand" href="index.html" aria-label="DigitalBook — beranda"><img src="assets/logo.png" alt="DigitalBook"></a>' +
        '<nav class="nav-menu" aria-label="Menu utama">' +
        '<a href="index.html" id="mKatalog" class="' + (aktif === 'katalog' ? 'aktif' : '') + '">Katalog</a>' +
        '<a href="index.html#rak" id="mRak">Rak saya</a></nav></div></header>';
    }
    var f = $('footer');
    if (f) {
      f.innerHTML = '<footer class="footer"><div class="wrap"><span>© 2026 DigitalBook. Isi buku di situs ini adalah contoh karangan sendiri.</span><span>Dibuat dengan HTML, CSS, dan JavaScript</span></div></footer>';
    }
  }

  /* ═════════════ HALAMAN KATALOG ═════════════ */
  function halamanKatalog() {
    pasangNavFooter('katalog');
    var st = { q: '', kat: 'Semua', tab: 'semua', urut: 'rating' };
    var kategori = ['Semua'].concat(BUKU.map(function (b) { return b.kategori; }).filter(function (k, i, a) { return a.indexOf(k) === i; }));

    function kartu(b) {
      var p = persenBuku(b);
      return '<article class="kartu">' +
        '<a class="kartu-link" href="buku.html?id=' + b.id + '" aria-label="' + esc(b.judul) + ', ' + esc(b.penulis) + '">' + sampul(b) +
        '<h3>' + esc(b.judul) + '</h3><p class="penulis">' + esc(b.penulis) + '</p>' +
        '<p class="meta"><span>★ ' + b.rating.toFixed(1) + '</span><span>' + b.halaman + ' hlm</span></p>' +
        (p ? '<div class="progres" role="progressbar" aria-valuenow="' + p + '" aria-valuemin="0" aria-valuemax="100" aria-label="Progres baca"><i style="width:' + p + '%"></i></div>' : '') +
        '</a>' +
        '<button class="fav" data-fav="' + b.id + '" aria-pressed="' + adaFavorit(b.id) + '" aria-label="Favorit: ' + esc(b.judul) + '">' + IKON_HATI + '</button></article>';
    }

    function tersaring() {
      var q = st.q.trim().toLowerCase();
      var l = BUKU.filter(function (b) {
        if (st.kat !== 'Semua' && b.kategori !== st.kat) return false;
        if (st.tab === 'favorit' && !adaFavorit(b.id)) return false;
        if (st.tab === 'dibaca' && !S.progres[b.id]) return false;
        if (q && (b.judul + ' ' + b.penulis + ' ' + b.kategori).toLowerCase().indexOf(q) < 0) return false;
        return true;
      });
      l.sort(function (a, b) {
        if (st.urut === 'judul') return a.judul.localeCompare(b.judul, 'id');
        if (st.urut === 'baru') return b.tahun - a.tahun || b.rating - a.rating;
        return b.rating - a.rating;
      });
      return l;
    }

    function gambarHero() {
      var b = terakhirDibaca();
      var el = $('heroKartu');
      if (b) {
        var p = S.progres[b.id];
        el.innerHTML = sampul(b) + '<div><p class="label">Lanjutkan membaca</p><h2>' + esc(b.judul) + '</h2>' +
          '<p class="penulis">' + esc(b.penulis) + '</p>' +
          '<div class="progres"><i style="width:' + persenBuku(b) + '%"></i></div><p class="progres-teks">' + persenBuku(b) + '% selesai · Bab ' + (p.bab + 1) + '</p>' +
          '<p style="margin-top:14px"><a class="tombol tombol-hijau" href="baca.html?id=' + b.id + '&bab=' + p.bab + '">Lanjutkan</a></p></div>';
      } else {
        b = BUKU[0];
        el.innerHTML = sampul(b) + '<div><p class="label">Mulai dari sini</p><h2>' + esc(b.judul) + '</h2>' +
          '<p class="penulis">' + esc(b.penulis) + '</p>' +
          '<p><a class="tombol tombol-hijau" href="baca.html?id=' + b.id + '&bab=0">Baca sekarang</a></p></div>';
      }
    }

    function gambarChips() {
      $('chips').innerHTML = kategori.map(function (k) {
        return '<button class="chip" data-kat="' + esc(k) + '" aria-pressed="' + (st.kat === k) + '">' + esc(k) + '</button>';
      }).join('');
    }

    function gambarGrid() {
      var l = tersaring();
      $('hitung').textContent = l.length + ' buku';
      $('grid').innerHTML = l.map(kartu).join('');
      var kosong = $('kosong');
      kosong.hidden = l.length > 0;
      if (!l.length) {
        var pesan = {
          favorit: ['Belum ada favorit', 'Tekan ikon hati pada sampul buku untuk menyimpannya di sini.'],
          dibaca: ['Belum ada yang sedang dibaca', 'Buka sebuah buku, lalu bacanya akan tercatat di sini.'],
          semua: ['Buku tidak ditemukan', 'Coba kata kunci atau kategori lain.']
        }[st.tab];
        if (st.tab === 'semua' || !pesan) pesan = ['Buku tidak ditemukan', 'Coba kata kunci atau kategori lain.'];
        kosong.innerHTML = '<strong>' + pesan[0] + '</strong>' + pesan[1];
      }
      Array.prototype.forEach.call(document.querySelectorAll('.tab button'), function (t) {
        t.setAttribute('aria-selected', t.dataset.tab === st.tab);
      });
    }

    function gambarBaris() {
      var l = BUKU.slice().sort(function (a, b) { return b.rating - a.rating; }).slice(0, 5);
      $('baris').innerHTML = l.map(kartu).join('');
    }

    function semua() { gambarHero(); gambarBaris(); gambarChips(); gambarGrid(); }

    /* acara */
    $('formCari').addEventListener('submit', function (e) {
      e.preventDefault();
      st.q = $('q').value; st.tab = 'semua'; gambarGrid();
      $('katalog').scrollIntoView();
    });
    $('q').addEventListener('input', function () { st.q = this.value; gambarGrid(); });
    $('urut').addEventListener('change', function () { st.urut = this.value; gambarGrid(); });
    $('chips').addEventListener('click', function (e) {
      var t = e.target.closest('[data-kat]'); if (!t) return;
      st.kat = t.dataset.kat; gambarChips(); gambarGrid();
    });
    document.querySelector('.tab').addEventListener('click', function (e) {
      var t = e.target.closest('[data-tab]'); if (!t) return;
      st.tab = t.dataset.tab; gambarGrid();
    });
    document.addEventListener('click', function (e) {
      var f = e.target.closest('[data-fav]'); if (!f) return;
      toggleFavorit(f.dataset.fav);
      gambarBaris(); gambarGrid();
    });

    function dariHash() {
      if (location.hash === '#rak') {
        st.tab = 'favorit'; gambarGrid();
        $('katalog').scrollIntoView();
      }
    }
    window.addEventListener('hashchange', dariHash);

    semua();
    dariHash();
  }

  /* ═════════════ HALAMAN DETAIL ═════════════ */
  function halamanDetail() {
    pasangNavFooter('');
    var b = cari(param('id'));
    var root = $('detail');
    if (!b) {
      root.innerHTML = '<div class="kosong"><strong>Buku tidak ditemukan</strong><a class="tombol" href="index.html" style="margin-top:14px">Kembali ke katalog</a></div>';
      return;
    }
    document.title = b.judul + ' — DigitalBook';

    function gambar() {
      var p = S.progres[b.id];
      var mulai = p ? p.bab : 0;
      var persen = persenBuku(b);
      root.innerHTML =
        '<p class="remah"><a href="index.html">Katalog</a> / ' + esc(b.kategori) + '</p>' +
        '<div class="detail"><div>' + sampul(b) + '</div><div>' +
        '<h1>' + esc(b.judul) + '</h1><p class="penulis">oleh ' + esc(b.penulis) + '</p>' +
        '<div class="lencana"><span>' + esc(b.kategori) + '</span><span>★ ' + b.rating.toFixed(1) + '</span><span>' + b.halaman + ' halaman</span><span>' + b.bab.length + ' bab</span><span>' + b.tahun + '</span></div>' +
        '<p class="sinopsis">' + esc(b.sinopsis) + '</p>' +
        '<div class="aksi"><a class="tombol tombol-hijau" href="baca.html?id=' + b.id + '&bab=' + mulai + '">' + (p ? 'Lanjutkan membaca' : 'Mulai membaca') + '</a>' +
        '<button class="tombol tombol-garis" id="btnFav" aria-pressed="' + adaFavorit(b.id) + '">' + (adaFavorit(b.id) ? '♥ Tersimpan' : '♡ Simpan ke favorit') + '</button></div>' +
        (persen ? '<div class="progres"><i style="width:' + persen + '%"></i></div><p class="progres-teks">' + persen + '% selesai</p>' : '') +
        '</div></div>' +
        '<section class="blok" style="padding-top:12px"><div class="blok-kepala"><h2>Daftar bab</h2></div><ul class="daftar-bab">' +
        b.bab.map(function (c, i) {
          return '<li><a href="baca.html?id=' + b.id + '&bab=' + i + '"><span class="no">' + (i + 1) + '</span><span>' + esc(c.judul) + '</span><span class="panah" aria-hidden="true">→</span></a></li>';
        }).join('') + '</ul></section>' +
        '<section class="blok"><div class="blok-kepala"><h2>Buku lainnya</h2></div><div class="baris">' +
        BUKU.filter(function (x) { return x.id !== b.id; })
          .sort(function (x, y) { return (y.kategori === b.kategori) - (x.kategori === b.kategori) || y.rating - x.rating; })
          .slice(0, 5).map(function (x) {
            return '<article class="kartu"><a class="kartu-link" href="buku.html?id=' + x.id + '">' + sampul(x) + '<h3>' + esc(x.judul) + '</h3><p class="penulis">' + esc(x.penulis) + '</p></a></article>';
          }).join('') + '</div></section>';

      $('btnFav').addEventListener('click', function () { toggleFavorit(b.id); gambar(); $('btnFav').focus(); });
    }
    gambar();
  }

  /* ═════════════ HALAMAN PEMBACA ═════════════ */
  function halamanBaca() {
    var b = cari(param('id'));
    var artikel = $('artikel');
    if (!b) {
      artikel.innerHTML = '<h1>Buku tidak ditemukan</h1><p><a href="index.html" style="text-decoration:underline">Kembali ke katalog</a></p>';
      return;
    }
    document.title = b.judul + ' — Baca';
    var n = b.bab.length;
    var awal = parseInt(param('bab'), 10);
    if (isNaN(awal)) awal = S.progres[b.id] ? S.progres[b.id].bab : 0;
    var idx = Math.max(0, Math.min(n - 1, awal));
    var timer = null;

    /* tampilan */
    function terapkanTampilan() {
      var h = document.documentElement;
      h.setAttribute('data-tema', S.tema);
      h.setAttribute('data-huruf', S.huruf);
      h.style.setProperty('--fs', S.ukuran + 'px');
      Array.prototype.forEach.call(document.querySelectorAll('[data-tema-pilih]'), function (t) {
        t.setAttribute('aria-pressed', t.dataset.temaPilih === S.tema);
      });
      Array.prototype.forEach.call(document.querySelectorAll('[data-huruf-pilih]'), function (t) {
        t.setAttribute('aria-pressed', t.dataset.hurufPilih === S.huruf);
      });
      $('ukuranTeks').textContent = S.ukuran + ' px';
    }

    $('rJudul').textContent = b.judul;
    $('rKembali').href = 'buku.html?id=' + b.id;
    $('tocJudul').textContent = b.judul;

    function gambarToc() {
      $('tocList').innerHTML = b.bab.map(function (c, i) {
        return '<a href="#" data-bab="' + i + '"' + (i === idx ? ' aria-current="true"' : '') + '><span class="no">' + (i + 1) + '</span><span>' + esc(c.judul) + '</span></a>';
      }).join('');
    }

    function gambarBab(gulirAtas) {
      var c = b.bab[idx];
      artikel.innerHTML = '<p class="bab-no">Bab ' + (idx + 1) + ' dari ' + n + '</p><h1>' + esc(c.judul) + '</h1>' +
        c.isi.map(function (p) { return '<p>' + esc(p) + '</p>'; }).join('');
      $('prev').disabled = idx === 0;
      var next = $('next');
      if (idx === n - 1) { next.textContent = 'Selesai ✓'; next.href = 'buku.html?id=' + b.id; }
      else { next.textContent = 'Bab berikutnya →'; next.href = '#'; }
      $('prev').textContent = '← Bab sebelumnya';
      history.replaceState(null, '', '?id=' + b.id + '&bab=' + idx);
      gambarToc();
      if (gulirAtas) window.scrollTo(0, 0);
      catat();
    }

    function persenBab() {
      var maks = document.documentElement.scrollHeight - window.innerHeight;
      return maks > 8 ? Math.min(100, Math.round((window.scrollY / maks) * 100)) : 100;
    }
    function catat() {
      var pb = persenBab();
      var total = Math.round(((idx + pb / 100) / n) * 100);
      $('rGaris').style.width = total + '%';
      clearTimeout(timer);
      timer = setTimeout(function () {
        S.progres[b.id] = { bab: idx, persen: pb, waktu: Date.now() };
        simpan();
      }, 400);
    }
    function pindah(i) {
      if (i < 0 || i > n - 1) return;
      idx = i; tutupPanel(); gambarBab(true);
    }

    /* panel */
    function tutupPanel() { $('pSet').hidden = true; $('pToc').hidden = true; $('btnSet').setAttribute('aria-expanded', 'false'); $('btnToc').setAttribute('aria-expanded', 'false'); }
    function bukaPanel(id, tombol) {
      var el = $(id), buka = el.hidden;
      tutupPanel();
      if (buka) { el.hidden = false; $(tombol).setAttribute('aria-expanded', 'true'); }
    }
    $('btnSet').addEventListener('click', function () { bukaPanel('pSet', 'btnSet'); });
    $('btnToc').addEventListener('click', function () { bukaPanel('pToc', 'btnToc'); });
    document.addEventListener('click', function (e) {
      if (!e.target.closest('.panel') && !e.target.closest('.r-tombol')) tutupPanel();
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') tutupPanel();
      if (e.target.tagName === 'INPUT') return;
      if (e.key === 'ArrowRight') pindah(idx + 1);
      if (e.key === 'ArrowLeft') pindah(idx - 1);
    });

    $('tocList').addEventListener('click', function (e) {
      var a = e.target.closest('[data-bab]'); if (!a) return;
      e.preventDefault(); pindah(parseInt(a.dataset.bab, 10));
    });
    $('prev').addEventListener('click', function (e) { e.preventDefault(); pindah(idx - 1); });
    $('next').addEventListener('click', function (e) {
      if (idx === n - 1) { S.progres[b.id] = { bab: idx, persen: 100, waktu: Date.now() }; simpan(); return; }
      e.preventDefault(); pindah(idx + 1);
    });

    /* pengaturan */
    document.addEventListener('click', function (e) {
      var t = e.target.closest('[data-tema-pilih]');
      if (t) { S.tema = t.dataset.temaPilih; simpan(); terapkanTampilan(); }
      var h = e.target.closest('[data-huruf-pilih]');
      if (h) { S.huruf = h.dataset.hurufPilih; simpan(); terapkanTampilan(); }
    });
    $('kecil').addEventListener('click', function () { S.ukuran = Math.max(15, S.ukuran - 1); simpan(); terapkanTampilan(); catat(); });
    $('besar').addEventListener('click', function () { S.ukuran = Math.min(30, S.ukuran + 1); simpan(); terapkanTampilan(); catat(); });

    window.addEventListener('scroll', catat, { passive: true });

    terapkanTampilan();
    gambarBab(false);

    /* pulihkan posisi gulir jika membuka bab yang sama dengan terakhir dibaca */
    var p = S.progres[b.id];
    if (p && p.bab === idx && p.persen > 0 && p.persen < 100) {
      var maks = document.documentElement.scrollHeight - window.innerHeight;
      window.scrollTo(0, (p.persen / 100) * maks);
    }
  }

  /* ───────── Mulai ───────── */
  var h = document.body.getAttribute('data-halaman');
  if (h === 'katalog') halamanKatalog();
  else if (h === 'detail') halamanDetail();
  else if (h === 'baca') halamanBaca();
}());
