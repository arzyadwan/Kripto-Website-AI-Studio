import express from "express";
import path from "path";
import fs from "fs";
import { createServer as createViteServer } from "vite";
import { createClient } from "@supabase/supabase-js";

interface Comment {
  id: string;
  articleId: string;
  author: string;
  content: string;
  date: string;
  likes: number;
  avatar: string;
}

interface Article {
  id: string;
  title: string;
  summary: string;
  content: string;
  image: string;
  author: string;
  authorAvatar: string;
  date: string;
  readTime: string;
  category: 'Berita' | 'Analisis' | 'Edukasi' | 'Regulasi';
  likes: number;
  commentsCount: number;
  tags: string[];
  views: number;
}

const DB_PATH = path.join(process.cwd(), "db.json");

// Default initial data to serve if database file doesn't exist
const DEFAULT_INITIAL_ARTICLES: Article[] = [
  {
    id: 'art-1',
    title: 'Analisis Mendalam Dampak Regulasi Global Terhadap Harga Pasar Bitcoin Pasca-Halving',
    summary: 'Siklus pasca halving selalu diwarnai ketakutan regulasi ketat. Pelajari bagaimana kebijakan moneter AS dan Uni Eropa mempengaruhi dinamika pasokan likuiditas global.',
    content: `Bitcoin baru saja melewati tonggak sejarah krusial lainnya: peristiwa Halving keempat. Di tengah gegap gempita pengurangan pasokan emisi blok baru ini, mata dunia kini terarah pada satu faktor penentu krusial di luar rantai: **Regulasi Global**.

Dalam kurun waktu beberapa bulan ke depan, kita akan menyaksikan pengenalan kerangka kerja pelaporan baru yang intensif dari Komisi Sekuritas dan Bursa AS (SEC), serta implementasi penuh Markets in Crypto-Assets (MiCA) di wilayah Uni Eropa. 

### Gelombang Transparansi Baru

Para analis berargumen bahwa pengetatan audit kepatuhan ini di satu sisi melukai prinsip otonom mutlak awal blockchain, tetapi di sisi lain merupakan jalur tom (highway) tak terhindarkan bagi modal institusional raksasa senilai triliunan dolar untuk masuk secara legal melalui dana abadi dan ETF Spot.

### Pola Konsolidasi Klasik

Secara teknis, pergerakan harga historis pasca-halving selalu menunjukkan perlambatan awal atau konsolidasi yang melelahkan selama 3 hingga 5 bulan sebelum memasuki fase ekspansi parabola utama. Investor disarankan mengamati tingkat penutupan mingguan di atas level psikologis $64.500 untuk kepastian kelanjutan momentum bullish lanjutan.`,
    image: 'https://images.unsplash.com/photo-1516245834210-c4c142787335?q=80&w=600&auto=format&fit=crop',
    author: 'Rama Wijaya',
    authorAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=100&auto=format&fit=crop',
    date: '25 Mei 2026',
    readTime: '4 menit baca',
    category: 'Analisis',
    likes: 124,
    commentsCount: 3,
    tags: ['Bitcoin', 'Halving', 'Regulasi', 'Makro'],
    views: 850
  },
  {
    id: 'art-2',
    title: 'Ethereum Reclaimed: Upgrade Dencun Menurunkan Biaya Gas Fee L2 Hingga 90%',
    summary: 'Upgrade penting Dencun sukses diaktifkan. Pengenalan mekanisme Blob transaksi (EIP-4844) membawa efisiensi berlipatganda bagi jaringan solusi penskalaan sekunder.',
    content: `Jaringan terdesentralisasi Ethereum secara resmi merampungkan pemutakhiran bersejarah **Dencun (Deneb-Cancun)** di seluruh jaringan klien utamanya. Fokus utama dari perbaikan infrastruktur berskala besar ini adalah penyelesaian masalah klasik: biaya transaksi (gas fee) yang mencekik pada jaringan solusi penskalaan Layer-2 (L2) seperti Optimism, Arbitrum, Base, dan Linea.

Melalui integrasi EIP-4844, diperkenalkan konsep inovatif bernama **"Blobs"**—sebuah ruang penyimpanan data sementara yang terpisah untuk memarkir data gulungan rollup transaksi L2 tanpa mengotori ruang eksekusi utama Ethereum (Layer-1).

### Hasil Nyata Efisiensi Biaya

Hanya dalam hitungan jam pasca-aktivasi, data on-chain mencatat rekor penurunan gas fee yang mencengangkan. Pengiriman stablecoin di jaringan Base terpantau turun dari rata-rata $0.30 menjadi hanya senilai $0.01! Ini adalah batu loncatan terbesar untuk menjangkau adopsi ritel massal global dalam dekade ini.`,
    image: 'https://images.unsplash.com/photo-1621761191319-c6fb62004040?q=80&w=600&auto=format&fit=crop',
    author: 'Amelia Putri',
    authorAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=100&auto=format&fit=crop',
    date: '24 Mei 2026',
    readTime: '3 menit baca',
    category: 'Berita',
    likes: 232,
    commentsCount: 5,
    tags: ['Ethereum', 'Dencun', 'L2', 'Teknologi'],
    views: 1240
  },
  {
    id: 'art-3',
    title: 'Edukasi Dasar: Menakar Perbedaan Kunci Antara Cold-Wallet vs Hot-Wallet',
    summary: 'Keamanan dana adalah tanggung jawab mutlak Anda sendiri. Ketahui panduan lengkap kapan harus memakai penyimpanan offline keras dan kapan menggunakan aplikasi browser.',
    content: `Semboyan mutlak dunia Web3 adalah *"Not your keys, not your coins"*. Jika Anda menitipkan aset kripto Anda di bursa terpusat (CEX), Anda secara hukum tidak sepenuhnya memiliki aset tersebut. Memindahkan dana ke dompet pribadi (self-custody) adalah langkah pertama wajib bagi setiap investor.

Namun, di tengah banyaknya pilihan, bagaimana Anda memilih antara **Cold-Wallet (Penyimpanan Dingin)** dan **Hot-Wallet (Penyimpanan Panas)**?

### Hot-Wallet: Praktis namun Rawan Celah

Hot wallet adalah jenis dompet digital yang selalu terhubung ke jaringan internet. Contoh populernya termasuk MetaMask, Trust Wallet, atau Phantom. 
- **Kelebihan:** Sangat praktis, gratis, dan memudahkan interaksi langsung dengan dApps dApp DeFi secara instan.
- **Kekurangan:** Lebih rentan terhadap serangan peretasan siber, program malware pembaca tombol (keylogger), atau situs web phishing palsu yang licik.

### Cold-Wallet: Benteng Pertahanan Offline Terkuat

Cold wallet (biasa berupa perangkat keras fisik/hardware wallet seperti Ledger atau Trezor) menyimpan kunci pribadi Anda secara terisolasi sepenuhnya di luar jaringan internet.
- **Kelebihan:** Tingkat keamanan tertinggi. Peretas tidak dapat mencuri dana Anda secara online tanpa menekan tombol fisik langsung pada perangkat keras di tangan Anda.
- **Kekurangan:** Memerlukan biaya pembelian perangkat yang cukup mahal dan proses transaksi yang lebih lambat karena membutuhkan konfirmasi manual.`,
    image: 'https://images.unsplash.com/photo-1633156189779-b1417839f371?q=80&w=600&auto=format&fit=crop',
    author: 'Alvin Pratama',
    authorAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=100&auto=format&fit=crop',
    date: '22 Mei 2026',
    readTime: '5 menit baca',
    category: 'Edukasi',
    likes: 89,
    commentsCount: 2,
    tags: ['Edukasi', 'Securit-Wallet', 'MetaMask', 'Pemula'],
    views: 620
  },
  {
    id: 'art-4',
    title: 'AI Token Terus Menguat Seiring Integrasi Masif Teknologi Cloud Decentralized',
    summary: 'Kombinasi kecerdasan buatan dan komputasi awan berbasis blockchain melahirkan narasi DePIN raksasa baru. Simak ulasan performa koin Render dan Near Protocol.',
    content: `Sektor koin kecerdasan buatan (artificial intelligence tokens) kembali mencuri perhatian panggung utama pasar global. Kali ini penguatan tidak lagi didorong oleh sekadar spekulasi sentimen media sosial, melainkan bukti nyata integrasi utilitas komputasi awan yang mendalam.

Proyek seperti **Render Network (RENDER)** dan **Near Protocol (NEAR)** memimpin reli berkat adopsi masif dari para perancang CGI animasi, start-up penelitian machine-learning, dan pengembang dApps bertenaga AI generatif.

### DePIN: Desentralisasi GPU Global

Render Network berhasil mendemokrasikan rendering visual dengan memanfaatkan kapasitas komputasi GPU yang menganggur dari ribuan pemilik komputer berspesifikasi tinggi di seluruh dunia. Alih-alih menyewa server mahal dari korporasi monopoli tradisional, pengembang visual kini dapat memangkas ongkos produksi mereka hingga setengahnya, dibayar secara instan menggunakan utilitas token utilitas aslinya.`,
    image: 'https://images.unsplash.com/photo-1677442136019-21780efad99a?q=80&w=600&auto=format&fit=crop',
    author: 'Dian Nugraha',
    authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100&auto=format&fit=crop',
    date: '20 Mei 2026',
    readTime: '4 menit baca',
    category: 'Berita',
    likes: 184,
    commentsCount: 4,
    tags: ['Artificial Intelligence', 'Render', 'SOL', 'Fetch', 'TAO'],
    views: 1890
  },
  {
    id: 'art-5',
    title: 'Web3 Sandbox Indonesia: Regulasi Baru Pendukung Startup Blockchain Lokal',
    summary: 'Melalui inisiasi bersama pemerintah dan OJK, Indonesia resmi meluncurkan Regulatory Sandbox khusus aset digital dan Web3 untuk mempermudah pendaftaran dApps dan meminimalkan hambatan legalitas.',
    content: `Kabar gembira datang bagi para pendiri dan pengembang proyek Web3 tanah air. Otoritas Jasa Keuangan (OJK) bersama Kementerian Komunikasi dan Informatika secara resmi memperkenalkan program **"Web3 Regulatory Sandbox"** edisi perdana.

Kebijakan revolusioner ini ditujukan untuk memberikan ruang bagi platform keuangan terdesentralisasi (DeFi), dApps, pencipta game Web3, dan pengelola token RWA (Real World Assets) lokal untuk menguji sistem mereka secara legal tanpa dibayangi ketakutan akan sanksi administratif yang belum matang.

### Apa itu Regulatory Sandbox?

Secara sederhana, sandbox adalah "ruang bermain aman". Di dalam sandbox ini, pengembang startup blockchain dapat menguji produk keuangan mereka langsung kepada batas audiens tertentu. Selama fase uji coba, regulator akan mengamati model bisnis, kepatuhan mitigasi risiko keamanan dana nasabah, serta memantau audit kode smart contract sebelum akhirnya diberikan izin edar skala nasional penuh.

### Dampak Terhadap Ekosistem Web3 Indonesia

Dengan adanya sandbox ini, pengembang dApps tidak perlu lagi mendaftarkan diri secara ilegal di luar negeri seperti kepulauan Cayman atau Singapura hanya demi menerbitkan utilitas token dasar. Ini adalah wujud apresiasi besar terhadap kekuatan talenta developer lokal Indonesia yang terus berinovasi di kancah dunia.`,
    image: 'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?q=80&w=600&auto=format&fit=crop',
    author: 'Dian Nugraha',
    authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100&auto=format&fit=crop',
    date: '19 Mei 2026',
    readTime: '3 menit baca',
    category: 'Regulasi',
    likes: 154,
    commentsCount: 11,
    tags: ['Regulasi', 'Indonesia', 'Sandbox', 'OJK', 'Startup'],
    views: 1120
  },
  {
    id: 'art-6',
    title: 'Solana Melaju Pesat! Apakah Reli Koin Meme Mendominasi Ekosistem DePIN?',
    summary: 'Dengan throughput tinggi dan biaya gas super miring, Solana kembali memimpin pergerakan pasar. Namun berkaca dari volume transaksinya, seberapa besar porsi utilitas protokol DePIN sejati dibanding spekulasi koin meme?',
    content: `Solana terus merebut perhatian panggung dunia. Dalam beberapa bulan terakhir, volume transaksi harian di bursa terdesentralisasi (DEX) berbasis Solana seperti Jupiter dan Raydium berulang kali melampaui gabungan gas fee di mainnet Ethereum.

Fenomena ini dipicu oleh dua kutub yang sangat kontras: **Koin Meme** yang bergejolak tinggi, dan pengembangan infrastruktur fisik terdesentralisasi yang dikenal sebagai **DePIN (Decentralized Physical Infrastructure Networks)**.

### Gelombang DePIN: Jaringan Dunia Nyata di Solana

Solana dipilih oleh berbagai proyek infrastruktur raksasa karena performa on-chain miliknya yang super cepat. Proyek seperti Helium (jaringan nirkabel 5G terdesentralisasi) dan Hivemapper (peta global bertenaga kamera dasbor kontributor) mengandalkan token insentif mikro on-chain untuk ring kas perangkat fisik di seluruh dunia. Tanpa skalabilitas Solana tingkat tinggi, biaya mengklaim imbalan harian penambang akan habis terpotong gas fee.

### Koin Meme: Bahan Bakar Volatilitas

Di sisi lain, tidak dapat dimungkiri bahwa spekulasi koin meme (meme coin frenzy) menjadi pendorong utama meroketnya likuiditas on-chain. Ribuan koin baru dicetak setiap harinya menggunakan alat peluncuran mudah seperti Pump.fun. 

Meskipun menciptakan keuntungan berlipat (hype) bagi segelintir trader terampil, hal ini sekaligus mendatangkan risiko besar bagi investor pemula yang sering terjebak dalam skema pump-and-dump.`,
    image: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80&w=600&auto=format&fit=crop',
    author: 'Rama Wijaya',
    authorAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=100&auto=format&fit=crop',
    date: '18 Mei 2026',
    readTime: '5 menit baca',
    category: 'Analisis',
    likes: 295,
    commentsCount: 38,
    tags: ['Solana', 'DePIN', 'Altcoin', 'MemeCoin', 'Teknikal'],
    views: 2450
  },
  {
    id: 'art-7',
    title: 'Strategi Dollar-Cost Averaging (DCA): Kunci Bertahan & Membangun Portofolio Kripto Berkelanjutan',
    summary: 'Mengapa mencoba menebak arah pergerakan dasar harga (timing the market) sering berakhir dengan kerugian? Pelajari implementasi DCA yang emosional-bebas untuk meredam stres volatilitas.',
    content: `Pasar kripto terkenal sangat kejam dengan volatilitas ekstrem yang dapat membuat portofolio berayun puluhan persen hanya dalam hitungan hari. Bagi sebagian besar investor ritel, mencoba menebak dengan akurat kapan harga menemui titik terendah (bottom) atau tertinggi (top) adalah perjuangan menguras energi yang sering berujung pada kerugian FATAL.

Di sinilah konsep **Dollar-Cost Averaging (DCA)** hadir sebagai strategi investasi utama yang terbukti paling aman secara matematis dan psikologis.

### Apa itu Dollar-Cost Averaging?

DCA adalah metode investasi di mana Anda secara konsisten menyisihkan jumlah rupiah yang sama untuk membeli aset tertentu pada jadwal yang teratur—misalnya, Rp 500.000 setiap tanggal 25 setiap bulannya—tanpa memedulikan apakah harga Bitcoin sedang naik tinggi atau turun drastis.

Saat harga turun, uang Rp 500.000 Anda otomatis mendapatkan porsi token lebih banyak. Saat harga naik, Anda memang mendapatkan porsi token lebih sedikit, tetapi nilai aset yang sudah Anda beli sebelumnya mengalami kenaikan. Dalam jangka panjang, rata-rata harga beli Anda akan menjadi sangat seimbang dan rasional.

### Menghilangkan Faktor Emosional (FOMO & FUD)

Musuh terbesar seorang investor adalah emosi pribadi: keinginan membeli saat harga meroket karena takut ketinggalan (FOMO) dan keinginan menjual rugi saat pasar runtuh karena panik (FUD). Dengan berkomitmen pada DCA, Anda sepenuhnya mendisiplinkan diri sendiri layaknya bot otonom, menghilangkan bias emosi, dan meredam ketegangan stres psikologis di depan grafik lilin harian.`,
    image: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?q=80&w=600&auto=format&fit=crop',
    author: 'Alvin Pratama',
    authorAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=100&auto=format&fit=crop',
    date: '15 Mei 2026',
    readTime: '4 menit baca',
    category: 'Edukasi',
    likes: 341,
    commentsCount: 29,
    tags: ['Edukasi', 'DCA', 'Psikologi', 'Keuangan', 'Bitcoin'],
    views: 3120
  },
  {
    id: 'art-8',
    title: 'Aset RWA (Real World Assets) Mengalami Booming: Mengapa Obligasi Mulai Ditokenisasi?',
    summary: 'Raksasa finansial global seperti BlackRock meluncurkan dana kas terdelusi on-chain (BUIDL). Eksplorasi bagaimana aset riil di dunia nyata mulai berpindah ke jaringan pintar blockchain.',
    content: `Tokenisasi aset dunia nyata, atau dikenal sebagai **Real World Assets (RWA)**, kini bukan lagi eksperimen pinggiran melainkan pilar utama integrasi antara keuangan tradisional (TradFi) dengan ekosistem blockchain modern.

Pemicu utamanya adalah keputusan BlackRock meluncurkan USD Institutional Digital Liquidity Fund (BUIDL) di jaringan Ethereum, yang langsung mengumpulkan dana ratusan juta dolar hanya dalam hitungan hari dari investor institusional.

### Apa Saja yang Ditokenisasi?

1.  **Surat Utang Negara (Treasuries):** Obligasi pemerintah AS kini dapat dibeli dalam bentuk token on-chain oleh investor global terkualifikasi yang ingin menikmati imbal hasil (yield) dolar yang stabil langsung di dompet non-kustodian mereka.
2.  **Properti & Real Estate:** Kepemilikan gedung komersial besar dapat dibagi menjadi jutaan pecahan token digital kecil, mendemokrasikan akses kepemilikan bagi investor eceran dengan modal terbatas.
3.  **Logam Mulia:** Pembelian emas fisik yang direpresentasikan secara on-chain 1:1, mempermudah likuiditas penyelesaian transfer instan tanpa biaya fisik logistik pengiriman.

### Mengapa Institusi Sangat Tertarik?

Integrasi RWA menawarkan efisiensi operasional yang belum tertandingi oleh sistem kliring tradisional. Transaksi instan 24/7 tanpa perantara, transparansi on-chain publik secara real-time, serta kemampuan menggabungkan aset TradFi ke dalam fungsional dApps DeFi (misal meminjam stablecoin dengan jaminan token obligasi) adalah masa depan otomatisasi yang nyata.`,
    image: 'https://images.unsplash.com/photo-1640340434855-6084b1f4901c?q=80&w=600&auto=format&fit=crop',
    author: 'Amelia Putri',
    authorAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=100&auto=format&fit=crop',
    date: '12 Mei 2026',
    readTime: '5 menit baca',
    category: 'Berita',
    likes: 212,
    commentsCount: 14,
    tags: ['RWA', 'TradFi', 'Ethereum', 'BlackRock', 'DeFi'],
    views: 1420
  },
  {
    id: 'art-9',
    title: 'Keamanan Jaringan Layer-2: Menyoroti Kekhawatiran Sentralisasi Sequencer',
    summary: 'Meskipun Layer-2 sukses memotong gas fee secara drastis, ketergantungan sepihak terhadap sequencer tunggal masih menyimpan risiko titik kegagalan tunggal (single point of failure).',
    content: `Sejak selesainya peningkatan besar di ekosistem Ethereum, solusi penskalaan Layer-2 (L2) seperti Optimistic Rollups dan ZK-Rollups telah berhasil memproses lebih dari 80% volume transaksi harian dengan biaya transaksi miring.

Namun, di balik kehebatan teknis ini, komunitas riset Ethereum terus menyuarakan satu kekhawatiran kritis: **Sentralisasi Sequencer**.

### Apa Fungsi Sequencer dalam Layer-2?

Sequencer adalah entitas khusus yang bertugas mengumpulkan ribuan transaksi pengguna di jaringan L2, mengurutkannya, menggabungkannya menjadi satu paket ringkas (batch), kemudian mengirimkannya kembali ke mainnet Ethereum (Layer-1) untuk validasi permanen.

Saat ini, sebagian besar L2 terkemuka masih menjalankan sequencer tunggal yang dioperasikan sepihak oleh core team pendiri proyek tersebut sendiri.

### Risiko Utama Sequencer Tunggal

1.  **Sensor Transaksi (Censorship):** Sequencer tunggal memiliki wewenang memblokir atau menunda transaksi tertentu sesuka hati.
2.  **Kerentanan Server Mati (Single Point of Failure):** Jika server sequencer mengalami offline akibat kendala jaringan, dApp L2 tersebut sepenuhnya lumpuh total seketika.
3.  **Ekstraksi Nilai MEV:** Sequencer dapat mengekstrak keuntungan tambahan dengan mengaduk urutan transaksi transaksi berukuran besar (Maximal Extractable Value / MEV).

### Solusi: Membagikan Tata Kelola Sequencer Terdesentralisasi

Untuk menyelesaikan ini, proyek L2 sedang berlomba mengembangkan sequencer terdesentralisasi (Decentralized Shared Sequencers) seperti Espresso atau Astria, serta menyusun skema Proof of Stake di tingkat L2 untuk mengembalikan marwah kedaulatan desentralisasi tanpa mengorbankan kecepatan transaksi yang ramah pengguna.`,
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=600&auto=format&fit=crop',
    author: 'Rama Wijaya',
    authorAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=100&auto=format&fit=crop',
    date: '10 Mei 2026',
    readTime: '5 menit baca',
    category: 'Analisis',
    likes: 198,
    commentsCount: 22,
    tags: ['L2', 'Security', 'Ethereum', 'Sequencer', 'Rollup'],
    views: 1190
  }
];

const DEFAULT_INITIAL_COMMENTS: Comment[] = [
  {
    id: 'c-1',
    articleId: 'art-1',
    author: 'Budi Santoso',
    content: 'Sangat setuju! Regulasi MiCA di Eropa sebenarnya menguntungkan ritel karena bursa nakal tidak akan bisa lagi mencuri likuiditas nasabah sesuka hati.',
    date: '3 hari lalu',
    likes: 42,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100&auto=format&fit=crop'
  },
  {
    id: 'c-2',
    articleId: 'art-1',
    author: 'Lina Wijaya',
    content: 'Sebagai investor pemula, saya masih agak bingung cara membaca weekly close. Adakah edukasi khusus untuk ini?',
    date: '2 hari lalu',
    likes: 12,
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=100&auto=format&fit=crop'
  },
  {
    id: 'c-3',
    articleId: 'art-2',
    author: 'Rian Kripto',
    content: 'Luar biasa upgrade Dencun ini. Sekarang kirim gas fee di L2 Base berasa gratis. Bye Ethereum mainnet gas fee mahal!',
    date: '2 hari lalu',
    likes: 56,
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=100&auto=format&fit=crop'
  }
];

interface DBStructure {
  articles: Article[];
  comments: Comment[];
}

// Supabase client instance builder with local fallback safety
const SU_URL = process.env.SUPABASE_URL || "";
const SU_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_KEY || "";
const isSupaEnabled = SU_URL.trim().length > 0 && SU_KEY.trim().length > 0;
const supabase = isSupaEnabled ? createClient(SU_URL, SU_KEY) : null;

if (isSupaEnabled) {
  console.log("🟢 SUPABASE DETECTED: Running in cloud DB mode synced to Supabase PostgreSQL.");
} else {
  console.log("🟡 NO SUPABASE KEYS: Running in local DB mode using local standard db.json.");
}

// Read local JSON file database fallback
function readLocalDB(): DBStructure {
  try {
    if (fs.existsSync(DB_PATH)) {
      const data = fs.readFileSync(DB_PATH, "utf8");
      return JSON.parse(data);
    }
  } catch (err) {
    console.error("Error reading local db file.", err);
  }
  
  const initial = { articles: DEFAULT_INITIAL_ARTICLES, comments: DEFAULT_INITIAL_COMMENTS };
  writeLocalDB(initial);
  return initial;
}

function writeLocalDB(data: DBStructure) {
  try {
    fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2), "utf8");
  } catch (err) {
    console.error("Error writing db.json file:", err);
  }
}

// Auto-seed Supabase tables if they are empty on Cold Startup
async function seedSupabaseIfNeeded() {
  if (!isSupaEnabled || !supabase) return;
  try {
    const { data: artCheck, error: artErr } = await supabase.from("articles").select("id").limit(1);
    if (!artErr && (!artCheck || artCheck.length === 0)) {
      console.log("⏳ Supabase empty. Seeding DEFAULT_INITIAL_ARTICLES table...");
      // For each article, make sure tags is ready
      await supabase.from("articles").insert(DEFAULT_INITIAL_ARTICLES);
    }

    const { data: commCheck, error: commErr } = await supabase.from("comments").select("id").limit(1);
    if (!commErr && (!commCheck || commCheck.length === 0)) {
      console.log("⏳ Seeding DEFAULT_INITIAL_COMMENTS table into Supabase...");
      await supabase.from("comments").insert(DEFAULT_INITIAL_COMMENTS);
    }
  } catch (err) {
    console.warn("⚠️ Automatic Supabase seeding warning:", err);
  }
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Run the automatic seeding checker
  await seedSupabaseIfNeeded();

  // GET all articles
  app.get("/api/articles", async (req, res) => {
    try {
      if (isSupaEnabled && supabase) {
        const { data, error } = await supabase
          .from("articles")
          .select("*")
          .order("id", { ascending: false });
        
        if (error) throw error;
        return res.json(data || []);
      } else {
        const db = readLocalDB();
        res.json(db.articles);
      }
    } catch (err: any) {
      console.error("GET /api/articles database error:", err);
      res.status(500).json({ error: "Failed to read articles" });
    }
  });

  // GET article by id
  app.get("/api/articles/:id", async (req, res) => {
    try {
      const { id } = req.params;
      if (isSupaEnabled && supabase) {
        const { data, error } = await supabase
          .from("articles")
          .select("*")
          .eq("id", id)
          .maybeSingle();

        if (error) throw error;
        if (data) {
          return res.json(data);
        } else {
          return res.status(404).json({ error: "Article not found on Supabase" });
        }
      } else {
        const db = readLocalDB();
        const art = db.articles.find(a => a.id === id);
        if (art) {
          res.json(art);
        } else {
          res.status(404).json({ error: "Article not found on local db" });
        }
      }
    } catch (err: any) {
      console.error("GET article by id database error:", err);
      res.status(500).json({ error: "Error retrieving article" });
    }
  });

  // POST create new article
  app.post("/api/articles", async (req, res) => {
    try {
      const body = req.body;
      if (!body.title || !body.summary || !body.content || !body.category) {
        return res.status(400).json({ error: "Required fields are missing" });
      }

      const newArticle: Article = {
        id: `art-${Date.now()}`,
        title: body.title,
        summary: body.summary,
        content: body.content,
        image: body.image || "https://images.unsplash.com/photo-1516245834210-c4c142787335?q=80&w=600&auto=format&fit=crop",
        author: body.author || "Admin KriptoKini",
        authorAvatar: body.authorAvatar || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=100&auto=format&fit=crop",
        date: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }),
        readTime: body.readTime || "4 menit baca",
        category: body.category,
        likes: Number(body.likes) || 0,
        commentsCount: 0,
        tags: Array.isArray(body.tags) ? body.tags : [],
        views: Number(body.views) || 0
      };

      if (isSupaEnabled && supabase) {
        const { data, error } = await supabase
          .from("articles")
          .insert([newArticle])
          .select()
          .single();

        if (error) throw error;
        res.status(201).json(data);
      } else {
        const db = readLocalDB();
        db.articles.unshift(newArticle);
        writeLocalDB(db);
        res.status(201).json(newArticle);
      }
    } catch (err: any) {
      console.error("POST /api/articles database error:", err);
      res.status(500).json({ error: "Failed to create article on backend" });
    }
  });

  // PUT update article
  app.put("/api/articles/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const body = req.body;

      if (isSupaEnabled && supabase) {
        // Retrieve existing record first to merge keys safely
        const { data: existing, error: getErr } = await supabase
          .from("articles")
          .select("*")
          .eq("id", id)
          .maybeSingle();

        if (getErr) throw getErr;
        if (!existing) return res.status(404).json({ error: "Article not found on Supabase" });

        const updatedFields = {
          title: body.title !== undefined ? body.title : existing.title,
          summary: body.summary !== undefined ? body.summary : existing.summary,
          content: body.content !== undefined ? body.content : existing.content,
          image: body.image !== undefined ? body.image : existing.image,
          author: body.author !== undefined ? body.author : existing.author,
          readTime: body.readTime !== undefined ? body.readTime : existing.readTime,
          category: body.category !== undefined ? body.category : existing.category,
          tags: Array.isArray(body.tags) ? body.tags : existing.tags,
          likes: body.likes !== undefined ? Number(body.likes) : existing.likes,
          views: body.views !== undefined ? Number(body.views) : existing.views
        };

        const { data, error } = await supabase
          .from("articles")
          .update(updatedFields)
          .eq("id", id)
          .select()
          .single();

        if (error) throw error;
        res.json(data);
      } else {
        const db = readLocalDB();
        const index = db.articles.findIndex(a => a.id === id);

        if (index === -1) {
          return res.status(404).json({ error: "Article not found" });
        }

        const existing = db.articles[index];
        const updatedArticle: Article = {
          ...existing,
          title: body.title !== undefined ? body.title : existing.title,
          summary: body.summary !== undefined ? body.summary : existing.summary,
          content: body.content !== undefined ? body.content : existing.content,
          image: body.image !== undefined ? body.image : existing.image,
          author: body.author !== undefined ? body.author : existing.author,
          readTime: body.readTime !== undefined ? body.readTime : existing.readTime,
          category: body.category !== undefined ? body.category : existing.category,
          tags: Array.isArray(body.tags) ? body.tags : existing.tags,
          likes: body.likes !== undefined ? Number(body.likes) : existing.likes,
          views: body.views !== undefined ? Number(body.views) : existing.views
        };

        db.articles[index] = updatedArticle;
        writeLocalDB(db);
        res.json(updatedArticle);
      }
    } catch (err: any) {
      console.error("PUT /api/articles database error:", err);
      res.status(500).json({ error: "Failed to update article on backend" });
    }
  });

  // DELETE delete article
  app.delete("/api/articles/:id", async (req, res) => {
    try {
      const { id } = req.params;
      if (isSupaEnabled && supabase) {
        // Cascade delete on comments table is registered or we do it programmatically
        await supabase.from("comments").delete().eq("articleId", id);
        const { error } = await supabase.from("articles").delete().eq("id", id);
        if (error) throw error;

        res.json({ message: "Article and its comments deleted successfully from Supabase" });
      } else {
        const db = readLocalDB();
        const filtered = db.articles.filter(a => a.id !== id);
        
        if (filtered.length === db.articles.length) {
          return res.status(404).json({ error: "Article not found on local fallback" });
        }

        db.articles = filtered;
        db.comments = db.comments.filter(c => c.articleId !== id);
        writeLocalDB(db);

        res.json({ message: "Article and its comments deleted successfully from local db" });
      }
    } catch (err: any) {
      console.error("DELETE /api/articles database error:", err);
      res.status(500).json({ error: "Failed to delete article" });
    }
  });

  // INCREMENT likes on article
  app.post("/api/articles/:id/like", async (req, res) => {
    try {
      const { id } = req.params;
      if (isSupaEnabled && supabase) {
        // Get current, then increment
        const { data: art, error: getErr } = await supabase
          .from("articles")
          .select("likes")
          .eq("id", id)
          .maybeSingle();

        if (getErr) throw getErr;
        const currentLikes = art?.likes || 0;

        const { data, error } = await supabase
          .from("articles")
          .update({ likes: currentLikes + 1 })
          .eq("id", id)
          .select()
          .single();

        if (error) throw error;
        res.json(data);
      } else {
        const db = readLocalDB();
        const index = db.articles.findIndex(a => a.id === id);

        if (index === -1) {
          return res.status(404).json({ error: "Article not found" });
        }

        db.articles[index].likes += 1;
        writeLocalDB(db);
        res.json(db.articles[index]);
      }
    } catch (err: any) {
      console.error("POST like database error:", err);
      res.status(500).json({ error: "Failed to like article" });
    }
  });

  // INCREMENT views on article
  app.post("/api/articles/:id/view", async (req, res) => {
    try {
      const { id } = req.params;
      if (isSupaEnabled && supabase) {
        const { data: art, error: getErr } = await supabase
          .from("articles")
          .select("views")
          .eq("id", id)
          .maybeSingle();

        if (getErr) throw getErr;
        const currentViews = art?.views || 0;

        const { data, error } = await supabase
          .from("articles")
          .update({ views: currentViews + 1 })
          .eq("id", id)
          .select()
          .single();

        if (error) throw error;
        res.json(data);
      } else {
        const db = readLocalDB();
        const index = db.articles.findIndex(a => a.id === id);

        if (index === -1) {
          return res.status(404).json({ error: "Article not found" });
        }

        db.articles[index].views += 1;
        writeLocalDB(db);
        res.json(db.articles[index]);
      }
    } catch (err: any) {
      console.error("POST view database error:", err);
      res.status(500).json({ error: "Failed to track view" });
    }
  });

  // GET all comments
  app.get("/api/comments", async (req, res) => {
    try {
      if (isSupaEnabled && supabase) {
        const { data, error } = await supabase
          .from("comments")
          .select("*")
          .order("id", { ascending: true });

        if (error) throw error;
        res.json(data || []);
      } else {
        const db = readLocalDB();
        res.json(db.comments);
      }
    } catch (err: any) {
      console.error("GET comments database error:", err);
      res.status(500).json({ error: "Failed to read comments" });
    }
  });

  // POST create new comment
  app.post("/api/comments", async (req, res) => {
    try {
      const body = req.body;
      if (!body.articleId || !body.author || !body.content) {
        return res.status(400).json({ error: "Required comment fields are missing" });
      }

      const newComment: Comment = {
        id: `comment-${Date.now()}`,
        articleId: body.articleId,
        author: body.author,
        content: body.content,
        date: "Baru saja",
        likes: 0,
        avatar: body.avatar || `https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=100&auto=format&fit=crop`
      };

      if (isSupaEnabled && supabase) {
        // Find existing article commentsCount, increment it
        const { data: art, error: artErr } = await supabase
          .from("articles")
          .select("commentsCount")
          .eq("id", body.articleId)
          .maybeSingle();

        if (artErr) throw artErr;
        if (!art) return res.status(404).json({ error: "Article not found on Supabase" });

        const { data: commentData, error: insertCommentErr } = await supabase
          .from("comments")
          .insert([newComment])
          .select()
          .single();

        if (insertCommentErr) throw insertCommentErr;

        // update commentsCount inside articles
        await supabase
          .from("articles")
          .update({ commentsCount: (art.commentsCount || 0) + 1 })
          .eq("id", body.articleId);

        res.status(201).json(commentData);
      } else {
        const db = readLocalDB();
        const articleIndex = db.articles.findIndex(a => a.id === body.articleId);
        if (articleIndex === -1) {
          return res.status(404).json({ error: "Article not found on local db" });
        }

        db.comments.push(newComment);
        db.articles[articleIndex].commentsCount += 1;
        writeLocalDB(db);

        res.status(201).json(newComment);
      }
    } catch (err: any) {
      console.error("POST comment database error:", err);
      res.status(500).json({ error: "Failed to add comment to database" });
    }
  });

  // POST like comment
  app.post("/api/comments/:id/like", async (req, res) => {
    try {
      const { id } = req.params;
      if (isSupaEnabled && supabase) {
        const { data: comm, error: getErr } = await supabase
          .from("comments")
          .select("likes")
          .eq("id", id)
          .maybeSingle();

        if (getErr) throw getErr;
        if (!comm) return res.status(404).json({ error: "Comment not found on Supabase" });

        const { data, error } = await supabase
          .from("comments")
          .update({ likes: (comm.likes || 0) + 1 })
          .eq("id", id)
          .select()
          .single();

        if (error) throw error;
        res.json(data);
      } else {
        const db = readLocalDB();
        const index = db.comments.findIndex(c => c.id === id);

        if (index === -1) {
          return res.status(404).json({ error: "Comment not found" });
        }

        db.comments[index].likes += 1;
        writeLocalDB(db);
        res.json(db.comments[index]);
      }
    } catch (err: any) {
      console.error("POST comment like database error:", err);
      res.status(500).json({ error: "Failed to like comment" });
    }
  });

  // Vite development integration or static serving
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();

