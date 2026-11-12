/* =====================================================
   DigitalBook — data.js
   Data buku (judul, penulis, dan isi bab adalah fiktif/karangan sendiri).
   Dipakai sebagai "database" sederhana. Nanti bisa diganti
   dengan JSON + fetch() atau PHP + MySQL (lihat README.md).
   ===================================================== */
window.BUKU = [
  {
    id: 'web-pemula',
    judul: 'Pemrograman Web untuk Pemula',
    penulis: 'Rina Maharani',
    kategori: 'Teknologi',
    rating: 4.7,
    halaman: 128,
    tahun: 2026,
    warna: ['#12306b', '#2e86de'],
    pola: 'garis',
    sinopsis: 'Panduan langkah demi langkah membangun website pertamamu: dari struktur HTML, mempercantik dengan CSS, sampai membuatnya interaktif dengan JavaScript.',
    bab: [
      { judul: 'Mengenal Cara Kerja Web', isi: [
        'Setiap kali kamu mengetik alamat di browser, sebuah permintaan dikirim ke server. Server membalas dengan berkas HTML, CSS, dan JavaScript, lalu browser menyusunnya menjadi halaman yang kamu lihat.',
        'Jadi, membuat website pada dasarnya adalah menyiapkan berkas-berkas itu dengan rapi. Tiga bahasa inti punya tugas masing-masing: HTML untuk struktur, CSS untuk tampilan, dan JavaScript untuk perilaku.'
      ]},
      { judul: 'HTML: Kerangka Halaman', isi: [
        'HTML memakai tag untuk menandai arti sebuah isi. Judul memakai h1, paragraf memakai p, tautan memakai a, dan gambar memakai img. Pilih tag sesuai maknanya, bukan sekadar tampilannya.',
        'Mulailah dengan kerangka sederhana: head berisi judul dan pengaturan, body berisi isi yang terlihat. Dari situ, tambahkan bagian demi bagian seperti header, main, dan footer.'
      ]},
      { judul: 'CSS dan JavaScript', isi: [
        'CSS bekerja dengan aturan: pilih elemen, lalu tentukan warna, ukuran, jarak, dan tata letaknya. Fokus awal yang paling berguna adalah flexbox dan grid untuk menyusun tata letak.',
        'JavaScript membuat halaman bereaksi pada pengguna. Misalnya menampilkan menu saat tombol ditekan, atau memeriksa isian formulir sebelum dikirim. Mulailah dari hal kecil, lalu tambah sedikit demi sedikit.'
      ]}
    ]
  },
  {
    id: 'kota-lama',
    judul: 'Jejak di Kota Lama',
    penulis: 'Dimas Aryo',
    kategori: 'Fiksi',
    rating: 4.5,
    halaman: 214,
    tahun: 2025,
    warna: ['#3b2a20', '#b5703a'],
    pola: 'segitiga',
    sinopsis: 'Seorang arsiparis muda menemukan peta tua di balik rak buku perpustakaan kota. Peta itu membawanya menyusuri lorong-lorong yang sudah lama dilupakan orang.',
    bab: [
      { judul: 'Peta di Balik Rak', isi: [
        'Hujan baru reda ketika Naya menggeser rak terakhir di gudang arsip. Di baliknya, selembar kertas kekuningan terselip rapi, digulung dan diikat benang yang sudah rapuh.',
        'Ia membukanya pelan-pelan. Garis-garis tinta membentuk lorong, jembatan kecil, dan satu titik merah di tengah kota lama. Di pojok bawah tertulis sebuah tanggal: tepat seratus tahun lalu.'
      ]},
      { judul: 'Lorong yang Terlupa', isi: [
        'Keesokan paginya Naya membawa peta itu berjalan kaki. Toko-toko tua berderet dengan papan nama pudar, dan setiap persimpangan terasa seperti mengenalnya.',
        'Di ujung gang sempit, sebuah pintu kayu terkunci menunggu. Di gagangnya terukir simbol yang sama dengan segel di sudut peta. Naya menarik napas, lalu mengetuk tiga kali.'
      ]},
      { judul: 'Pintu Kayu', isi: [
        'Tidak ada jawaban. Namun dari balik pintu terdengar suara lonceng kecil, seperti dari toko yang baru saja dibuka. Pintu bergeser, dan aroma kertas tua menyambutnya.',
        'Di dalam, rak-rak menjulang sampai langit-langit. Satu buku tergeletak di meja, terbuka pada halaman yang bertuliskan namanya sendiri.'
      ]}
    ]
  },
  {
    id: 'kopi-hujan',
    judul: 'Kopi, Hujan, dan Kamu',
    penulis: 'Salsa Nirmala',
    kategori: 'Romantis',
    rating: 4.4,
    halaman: 176,
    tahun: 2026,
    warna: ['#7a1f3d', '#e0607e'],
    pola: 'lingkaran',
    sinopsis: 'Di sebuah kedai kopi kecil, dua orang asing selalu duduk di meja yang sama setiap hujan turun. Lama-lama, mereka mulai menunggu hujan.',
    bab: [
      { judul: 'Meja di Dekat Jendela', isi: [
        'Kedai itu hanya punya enam meja, tetapi Arka selalu memilih yang sama: dekat jendela, tempat tetesan hujan membentuk garis-garis panjang di kaca.',
        'Hari itu meja tersebut sudah terisi. Seorang perempuan dengan jaket kuning membaca buku sambil mengaduk kopinya yang sudah dingin. Arka ragu sejenak, lalu bertanya apakah kursi di depannya kosong.'
      ]},
      { judul: 'Jadwal Hujan', isi: [
        'Sejak itu, mereka tidak pernah janjian, tetapi selalu bertemu. Setiap langit mulai gelap, Arka mengambil payung dan berjalan ke kedai tanpa benar-benar memutuskan.',
        'Namanya Lintang. Ia suka kopi tanpa gula dan buku dengan akhir yang menggantung. Percakapan mereka pendek, tetapi selalu terasa selesai.'
      ]},
      { judul: 'Hari Tanpa Hujan', isi: [
        'Pada minggu yang cerah, Arka tetap datang. Meja dekat jendela kosong, dan untuk pertama kalinya ia merasa kedai itu terlalu sepi.',
        'Ponselnya bergetar. Sebuah pesan singkat dari nomor yang belum ia simpan: Langitnya kering hari ini. Mau cari hujan bareng?'
      ]}
    ]
  },
  {
    id: 'majapahit',
    judul: 'Kisah Majapahit Singkat',
    penulis: 'Prof. Hendra Wijaya',
    kategori: 'Sejarah',
    rating: 4.6,
    halaman: 152,
    tahun: 2024,
    warna: ['#1f4d3a', '#7bb661'],
    pola: 'gelombang',
    sinopsis: 'Ringkasan perjalanan kerajaan besar di Nusantara: dari berdirinya pada 1293, masa kejayaan, hingga meredupnya pengaruhnya.',
    bab: [
      { judul: 'Awal Berdirinya', isi: [
        'Majapahit berdiri pada tahun 1293 di wilayah Jawa Timur, dipelopori oleh Raden Wijaya. Kerajaan ini lahir setelah runtuhnya Singasari dan masuknya pasukan Mongol ke Jawa.',
        'Dengan strategi yang cerdik, Raden Wijaya memanfaatkan pasukan asing itu untuk menyingkirkan lawannya, lalu mengusir mereka. Ibu kota baru dibangun di Trowulan.'
      ]},
      { judul: 'Masa Kejayaan', isi: [
        'Puncak kejayaan Majapahit terjadi pada masa Raja Hayam Wuruk, dengan Gajah Mada sebagai patih yang terkenal lewat Sumpah Palapa untuk menyatukan Nusantara.',
        'Kehidupan sastra dan budaya berkembang. Kitab Negarakertagama karya Mpu Prapanca, yang ditulis pada 1365, menjadi salah satu sumber penting untuk mengenal masa itu.'
      ]},
      { judul: 'Meredupnya Pengaruh', isi: [
        'Sepeninggal Hayam Wuruk, perebutan kekuasaan melemahkan kerajaan. Daerah-daerah bawahan perlahan melepaskan diri, sementara pelabuhan-pelabuhan baru tumbuh di pesisir.',
        'Meski demikian, warisan Majapahit tetap hidup dalam seni, bahasa, dan gagasan persatuan yang terus dikenang sampai sekarang.'
      ]}
    ]
  },
  {
    id: 'lima-menit',
    judul: 'Mulai dari Lima Menit',
    penulis: 'Laras Setiawan',
    kategori: 'Motivasi',
    rating: 4.3,
    halaman: 96,
    tahun: 2026,
    warna: ['#b4491f', '#f2a541'],
    pola: 'lingkaran',
    sinopsis: 'Kebiasaan besar dimulai dari langkah yang sangat kecil. Buku ringkas ini mengajak kamu mulai dari lima menit sehari, tanpa menunggu waktu yang sempurna.',
    bab: [
      { judul: 'Mengapa Sulit Memulai', isi: [
        'Sering kali kita tidak malas, kita hanya kewalahan. Tugas yang terlihat besar membuat otak mencari alasan untuk menundanya.',
        'Kuncinya adalah memperkecil langkah pertama sampai terasa konyol untuk ditolak. Menulis satu kalimat, membuka satu berkas, atau berjalan satu putaran saja.'
      ]},
      { judul: 'Aturan Lima Menit', isi: [
        'Katakan pada dirimu: aku hanya akan mengerjakannya selama lima menit. Setelah itu, kamu bebas berhenti. Hampir selalu, kamu akan terus lanjut karena awal adalah bagian tersulit.',
        'Pasang pengatur waktu, singkirkan gangguan, dan mulai. Tidak perlu hasil bagus, cukup hadir.'
      ]},
      { judul: 'Menjaga Kebiasaan', isi: [
        'Kaitkan kebiasaan baru dengan kebiasaan lama, misalnya membaca dua halaman setelah menyikat gigi. Pola yang sudah ada menjadi pengingat alami.',
        'Rayakan hal kecil. Mencentang daftar harianmu memberi rasa maju yang membuat kebiasaan itu ingin diulang besok.'
      ]}
    ]
  },
  {
    id: 'kancil-sungai',
    judul: 'Si Kancil dan Sungai Ajaib',
    penulis: 'Wulan Sari',
    kategori: 'Anak',
    rating: 4.8,
    halaman: 48,
    tahun: 2025,
    warna: ['#0b7a75', '#7fdbca'],
    pola: 'gelombang',
    sinopsis: 'Kancil menemukan sungai yang bisa berbicara. Tetapi sungai itu hanya mau menolong siapa pun yang berkata jujur.',
    bab: [
      { judul: 'Sungai yang Berbisik', isi: [
        'Pagi itu Kancil berjalan ke tepi hutan mencari air. Di sana mengalir sungai yang jernih, dan dari riaknya terdengar suara pelan: Halo, Kancil.',
        'Kancil terlonjak. Ia menoleh ke kiri dan ke kanan, tetapi tidak ada siapa-siapa selain batu dan daun-daun basah.'
      ]},
      { judul: 'Syarat dari Sungai', isi: [
        'Sungai berkata, Aku bisa membantumu menyeberang, tetapi hanya jika kamu menjawab jujur. Kancil mengangguk cepat, walau dalam hati ia ingin mencari akal.',
        'Pertanyaan pertama muncul: Apakah kamu pernah mengambil timun milik Pak Tani? Kancil menelan ludah. Pelan-pelan ia mengaku, Pernah, tetapi aku menyesal.'
      ]},
      { judul: 'Menyeberang dengan Jujur', isi: [
        'Air sungai menjadi tenang, dan batu-batu muncul membentuk jalan. Kancil melompat dari satu batu ke batu lain sampai tiba di seberang.',
        'Sejak hari itu, Kancil belajar bahwa akal paling baik adalah kejujuran. Ia mengembalikan timun-timun itu dengan membantu Pak Tani di kebun.'
      ]}
    ]
  },
  {
    id: 'mercusuar',
    judul: 'Misteri Lampu Mercusuar',
    penulis: 'Fajar Pratama',
    kategori: 'Kriminal',
    rating: 4.2,
    halaman: 240,
    tahun: 2025,
    warna: ['#111827', '#4b6a8a'],
    pola: 'segitiga',
    sinopsis: 'Lampu mercusuar tua di pesisir menyala sendiri pada malam yang seharusnya gelap. Seorang inspektur dikirim untuk mencari tahu siapa yang menyalakannya.',
    bab: [
      { judul: 'Lampu yang Menyala', isi: [
        'Sudah sepuluh tahun mercusuar di Tanjung Karang tidak berpenghuni. Namun malam itu nelayan melihat cahaya berputar di puncaknya, tiga kali dalam satu menit, seperti memberi isyarat.',
        'Inspektur Bima tiba keesokan harinya dengan perahu kecil. Pintu menara terkunci dari dalam, dan di tanah ada jejak sepatu yang berhenti tepat di ambang pintu.'
      ]},
      { judul: 'Jejak yang Terhenti', isi: [
        'Bima memeriksa jejak itu. Ukurannya sedang, dalam di bagian tumit, seperti orang yang membawa beban berat. Tidak ada jejak keluar.',
        'Ia memanjat tangga besi yang berkarat. Di ruang lampu, ia menemukan secangkir teh yang masih hangat.'
      ]},
      { judul: 'Secangkir Teh Hangat', isi: [
        'Teh itu berarti seseorang baru saja pergi, atau masih bersembunyi. Bima mengamati ruangan: jendela tertutup, lantai bersih, dan sebuah buku catatan terbuka di meja.',
        'Halaman terakhirnya berisi sederet angka. Bima mengenalinya sebagai koordinat, dan titiknya bukan di laut, melainkan di tengah kota.'
      ]}
    ]
  },
  {
    id: 'semesta-teh',
    judul: 'Alam Semesta dalam Secangkir Teh',
    penulis: 'Dr. Bayu Kusuma',
    kategori: 'Sains',
    rating: 4.6,
    halaman: 188,
    tahun: 2026,
    warna: ['#2b1b5a', '#8e6bd8'],
    pola: 'lingkaran',
    sinopsis: 'Dari uap teh hingga bintang-bintang, buku ini menjelaskan fisika sehari-hari dengan bahasa yang ringan dan contoh yang dekat dengan kita.',
    bab: [
      { judul: 'Uap yang Naik', isi: [
        'Saat air mendidih, molekulnya bergerak makin cepat sampai sebagian lepas ke udara sebagai uap. Itulah penguapan, proses yang juga membentuk awan di langit.',
        'Uap yang bertemu udara dingin kembali menjadi titik air, dan terlihat sebagai kabut tipis di atas cangkirmu.'
      ]},
      { judul: 'Mengapa Teh Mendingin', isi: [
        'Panas selalu berpindah dari benda yang lebih panas ke yang lebih dingin. Teh melepaskan panasnya ke udara, ke cangkir, dan ke meja sampai suhunya sama dengan lingkungan.',
        'Karena itu, tutup cangkir membantu menjaga hangat: ia memperlambat perpindahan panas ke udara.'
      ]},
      { judul: 'Dari Cangkir ke Bintang', isi: [
        'Prinsip yang sama berlaku di skala besar. Bintang memancarkan panas dan cahaya selama miliaran tahun sambil perlahan berubah.',
        'Memahami hal sederhana di meja makan memberi kita bekal untuk memahami alam semesta yang luas.'
      ]}
    ]
  }
];
