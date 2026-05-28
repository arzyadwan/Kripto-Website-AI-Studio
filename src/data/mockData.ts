import { Article, TechnicalAnalysisData, CoinPrice, Comment, CareerItem, EventItem, EducationItem } from '../types';

export const INITIAL_COINS: CoinPrice[] = [
  {
    id: 'bitcoin',
    symbol: 'BTC',
    name: 'Bitcoin',
    price: 68420.50,
    change24h: 2.45,
    high24h: 69100.00,
    low24h: 66800.00,
    sparkline: [66800, 67100, 67400, 67200, 67600, 67900, 68100, 68420],
    marketCap: '$1.34 Triliun',
  },
  {
    id: 'ethereum',
    symbol: 'ETH',
    name: 'Ethereum',
    price: 3485.20,
    change24h: 4.82,
    high24h: 3510.50,
    low24h: 3310.20,
    sparkline: [3310, 3340, 3380, 3360, 3410, 3430, 3460, 3485],
    marketCap: '$418.5 Miliar',
  },
  {
    id: 'solana',
    symbol: 'SOL',
    name: 'Solana',
    price: 172.40,
    change24h: -1.75,
    high24h: 178.60,
    low24h: 169.50,
    sparkline: [178, 176, 175, 173, 174, 171, 170, 172.4],
    marketCap: '$77.2 Miliar',
  },
  {
    id: 'ripple',
    symbol: 'XRP',
    name: 'Ripple',
    price: 0.584,
    change24h: 0.65,
    high24h: 0.592,
    low24h: 0.578,
    sparkline: [0.578, 0.581, 0.580, 0.582, 0.586, 0.583, 0.585, 0.584],
    marketCap: '$32.4 Miliar',
  },
  {
    id: 'cardano',
    symbol: 'ADA',
    name: 'Cardano',
    price: 0.442,
    change24h: 3.12,
    high24h: 0.448,
    low24h: 0.428,
    sparkline: [0.428, 0.431, 0.433, 0.430, 0.435, 0.438, 0.441, 0.442],
    marketCap: '$15.8 Miliar',
  },
  {
    id: 'dogecoin',
    symbol: 'DOGE',
    name: 'Dogecoin',
    price: 0.148,
    change24h: -5.40,
    high24h: 0.158,
    low24h: 0.142,
    sparkline: [0.158, 0.154, 0.151, 0.149, 0.146, 0.143, 0.145, 0.148],
    marketCap: '$21.3 Miliar',
  }
];

export const MOCK_ARTICLES: Article[] = [
  {
    id: 'art-1',
    title: 'SEC Menyetujui ETF Ethereum Spot, ETH Siap Menembus $4.000?',
    summary: 'Langkah bersejarah SEC menyetujui dokumen 19b-4 untuk ETF Ethereum spot memicu optimisme besar di pasar. Simak analisis dampak jangka pendek dan panjang terhadap ekosistem DeFi.',
    content: `Komisi Sekuritas dan Bursa Amerika Serikat (SEC) baru saja membuat langkah mengejutkan yang akan dicatat dalam sejarah aset kripto. Mereka secara resmi menyetujui pengajuan ETF Ethereum spot dari beberapa raksasa manajemen aset global termasuk BlackRock, Fidelity, dan Grayscale.

Keputusan ini memicu gelombang reli di mana ETH langsung melonjak lebih dari 15% dalam waktu singkat, melampaui hambatan psikologis di $3.400 dan kini mempersiapkan jalur menuju rekor tertinggi baru (ATH).

### Mengapa Ini Berbeda dengan ETF Bitcoin?

Hadirnya ETF Ethereum membawa implikasi yang berbeda dibanding Bitcoin. Ethereum bukan sekadar 'emas digital'; ia adalah komputer dunia, fondasi dari ribuan protokol finansial terdesentralisasi (DeFi), tokenisasi aset dunia nyata (RWA), dan pasar NFT.

Dengan integrasi keuangan tradisional (TradFi) melalui ETF, likuiditas institusional akan mengalir langsung ke aset yang memiliki utilitas produktif. Beberapa analis memproyeksikan inflow bersih sebesar $5 miliar hingga $8 miliar dalam lima bulan pertama perdagangan aktif.

### Dampak Pada Gas Fee dan Skalabilitas L2

Salah satu kekhawatiran terbesar adalah lonjakan biaya transaksi (gas fee) di mainnet Ethereum akibat lonjakan aktivitas spekulatif. Namun, berkat pembaruan Dencun (EIP-4844) beberapa waktu lalu, jaringan Layer-2 seperti Arbitrum, Optimism, dan Base memiliki biaya yang sangat murah sehingga mampu menyerap lonjakan pengguna baru tanpa membebani jaringan utama.

### Prospek Harga: Apakah $4.000 Realistis?

Secara teknikal, ETH kini bergerak di atas Exponential Moving Average (EMA) 50 dan 200 hari yang menunjukkan bias super bullish. Jika level support $3.350 dapat dipertahankan, target harga realistis berikutnya berada di kisaran $3.850 sebelum akhirnya meluncur bebas menguji kembali resistensi kuat di angka $4.000.

Tetap waspada terhadap volatilitas jangka pendek akibat aksi ambil untung (profit-taking) dari para trader leverage tinggi sebelum peluncuran perdagangan nyata ETF secara resmi dalam beberapa minggu ke depan.`,
    image: 'https://images.unsplash.com/photo-1621761191319-c6fb62004040?q=80&w=600&auto=format&fit=crop',
    author: 'Rama Wijaya',
    authorAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=100&auto=format&fit=crop',
    date: '25 Mei 2026',
    readTime: '4 menit baca',
    category: 'Berita',
    likes: 245,
    commentsCount: 24,
    tags: ['Ethereum', 'ETF', 'SEC', 'Altcoin', 'DeFi'],
    views: 1240
  },
  {
    id: 'art-2',
    title: 'Siklus Pasca Halving Bitcoin: Mengapa Koreksi Kali Ini Berbeda?',
    summary: 'Meskipun pola historis memproyeksikan koreksi tajam beberapa bulan setelah peristiwa Halving, faktor makroekonomi dan adopsi institusional yang kuat membuat siklus kali ini berjalan di luar perkiraan konvensional.',
    content: `Peristiwa Bitcoin Halving keempat telah berlalu sekitar satu bulan, memotong hadiah blok para penambang dari 6.25 BTC menjadi 3.125 BTC per blok. Secara historis, periode 're-accumulation' setelah halving selalu diwarnai oleh kebosanan pasar dan koreksi harga berkisar antara 15% hingga 20%.

Namun, siklus tahun 2026 ini menunjukkan karakteristik yang sangat tidak biasa. Mengapa konsolidasi kali ini tidak sedalam siklus-siklus sebelumnya?

### 1. Pelindung Likuiditas ETF Bitcoin Spot

Faktor pembeda terbesar dalam siklus ini adalah keberadaan ETF Bitcoin Spot di AS, Hong Kong, dan London. Aliran masuk dana institusional yang stabil bertindak sebagai spons raksasa yang terus menyerap tekanan jual dari para penambang mandiri yang terpaksa menutup operasi akibat berkurangnya margin keuntungan.

### 2. Suku Bunga Makro dan Kebijakan Fed

Indikasi penurunan inflasi global serta sinyal pelonggaran moneter (pemotongan suku bunga) oleh Federal Reserve memberikan dorongan likuiditas ke aset-aset berisiko tinggi. Saat imbal hasil obligasi pemerintah menurun, daya tarik Bitcoin sebagai lindung nilai inflasi non-berdaulat meningkat pesat.

### Analisis Grafik Grafik Mingguan

Bitcoin saat ini tertahan di dalam pola "Bullish Flag" raksasa pada grafik mingguan. Rentang harga $65.000 hingga $67.000 berfungsi sebagai zona akumulasi utama bagi para whale. Relative Strength Index (RSI) berada di angka netral 56, memberikan ruang yang sangat luas bagi pergerakan naik tanpa risiko "overbought" berlebih.

Jika BTC berhasil menembus batas atas pola flag di $71.200 dengan volume perdagangan yang solid, kita kemungkinan akan melihat percepatan tren menuju target $85.000 pada kuartal ketiga tahun ini.`,
    image: 'https://images.unsplash.com/photo-1516245834210-c4c142787335?q=80&w=600&auto=format&fit=crop',
    author: 'Amelia Putri',
    authorAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=100&auto=format&fit=crop',
    date: '24 Mei 2026',
    readTime: '5 menit baca',
    category: 'Analisis',
    likes: 189,
    commentsCount: 16,
    tags: ['Bitcoin', 'Halving', 'Makro', 'Teknikal', 'ETF'],
    views: 955
  },
  {
    id: 'art-3',
    title: 'Bappebti Rencanakan Pengalihan Pengawasan Kripto ke OJK Tahun Depan, Apa Dampaknya?',
    summary: 'Transisi penguasaan aset digital dari Bappebti ke Otoritas Jasa Keuangan (OJK) dijadwalkan mulai awal 2025. Eksplorasi mendalam tentang regulasi pajak, klasifikasi sekuritas, dan masa depan bursa kripto berlisensi.',
    content: `Industri aset kripto di Indonesia bersiap menghadapi babak baru regulasi yang lebih ketat sekaligus formal. Badan Pengawas Perdagangan Berjangka Komoditi (Bappebti) mengonfirmasi bahwa seluruh mandat pengawasan, pengaturan, dan perlindungan konsumen aset kripto akan diserahkan sepenuhnya ke Otoritas Jasa Keuangan (OJK) mulai tahun depan.

Langkah ini diambil sesuai dengan amanat Undang-Undang Pengembangan dan Penguatan Sektor Keuangan (UU PPSK) yang mengkategorikan kripto dalam klaster Inovasi Teknologi Sektor Keuangan (ITSK).

### Transisi Komoditas Menjadi Aset Keuangan

Perpindahan pengawasan ini kemungkinan besar akan mengubah cara pandang hukum terhadap token kripto. Jika selama ini kripto diposisikan murni sebagai komoditas berjangka, OJK memiliki wewenang untuk melihatnya dari sudut pandang instrumen investasi keuangan terstruktur.

Hal ini memunculkan spekulasi kuat bahwa beberapa token dengan struktur bagi hasil (seperti native token protokol DeFi) dapat diklasifikasikan sebagai sekuritas digital (digital securities), mirip dengan pendekatan yang dilakukan SEC di Amerika Serikat.

### Apakah Pajak Kripto Akan Ditinjau Ulang?

Salah satu keluhan terbesar dari pelaku industri lokal dan asosiasi pedagang kripto (Aspakrindo) adalah skema pajak berganda (PPN + PPh) yang dinilai terlalu tinggi, sehingga mendorong volume perdagangan lari ke bursa luar negeri tak berizin.

Dengan pengawasan OJK, industri mengharapkan adanya harmonisasi pajak baru menyamakan kedudukan kripto dengan instrumen pasar modal tradisional, yang berpotensi mengurangi beban pajak transaksi harian demi memperkuat bursa dalam negeri.`,
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=600&auto=format&fit=crop',
    author: 'Dian Nugraha',
    authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100&auto=format&fit=crop',
    date: '22 Mei 2026',
    readTime: '3 menit baca',
    category: 'Regulasi',
    likes: 112,
    commentsCount: 19,
    tags: ['Regulasi', 'Indonesia', 'OJK', 'Pajak', 'Bappebti'],
    views: 742
  },
  {
    id: 'art-4',
    title: 'Kombinasi AI dan Blockchain: Daftar Token AI Terpopuler Semester Ini',
    summary: 'Kecerdasan Buatan (AI) terus mendominasi percakapan global. Di dunia kripto, token-token berbasis penyediaan komputasi awan terdesentralisasi dan agen AI menikmati pertumbuhan eksponensial di pertengahan tahun ini.',
    content: `Narasi Artificial Intelligence (AI) terus terbukti menjadi narasi paling tangguh di pasar kripto sepanjang tahun 2026. Di balik gelembung spekulasi, ada kegunaan nyata yang diselesaikan: penyediaan server GPU yang lebih murah, perlindungan hak cipta konten AI, serta pembuatan asisten agen otonom on-chain.

Berikut adalah tiga token AI yang menunjukkan performa fundamental paling cemerlang semester ini:

### 1. Render Network (RENDER) - Komputasi Grafis Terdesentralisasi

Render Network bertindak sebagai protokol yang mendemokratisasikan daya GPU. Artis 3D, pengembang game, dan perusahaan AI membutuhkan daya GPU yang masif untuk rendering. Render memfasilitasi ini dengan menyewa sisa kapasitas GPU dari penambang di seluruh dunia secara peer-to-peer. Perpindahan migrasi token dari Ethereum ke Solana juga memicu kecepatan transaksi yang jauh lebih efisien.

### 2. Fetch.ai (FET) / Artificial Superintelligence Alliance (ASI)

Penyatuan token Fetch.ai, SingularityNET, dan Ocean Protocol menjadi satu token berbendera 'ASI' merupakan salah satu tonggak sejarah kolaborasi decentralized AI terbesar. Dengan menyatukan kekuatan riset agen pintar, pengolahan Big Data, dan pasar model AI, aliansi ini mencoba menyaingi dominasi Google dan OpenAI dalam bentuk arsitektur tanpa sensor.

### 3. Bittensor (TAO) - Pasar Model Pembelajaran Mesin

TAO memposisikan dirinya sebagai internet pembelajaran mesin terdesentralisasi. Komunitas mengembangkan ribuan "sub-network" khusus yang bersaing memecahkan masalah matematika, logika, ataupun pemrosesan bahasa alami. Model terbaik akan diberi hadiah berupa token TAO. Ini adalah cara yang revolusioner untuk memicu riset AI yang terbuka, transparan, dan tidak tersentralisasi di satu kubu perusahaan teknologi raksasa.`,
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=600&auto=format&fit=crop',
    author: 'Alvin Pratama',
    authorAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=100&auto=format&fit=crop',
    date: '20 Mei 2026',
    readTime: '6 menit baca',
    category: 'Edukasi',
    likes: 312,
    commentsCount: 42,
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

Solana dipilih oleh berbagai proyek infrastruktur raksasa karena performa on-chain miliknya yang super cepat. Proyek seperti Helium (jaringan nirkabel 5G terdesentralisasi) dan Hivemapper (peta global bertenaga kamera dasbor kontributor) mengandalkan token insentif mikro on-chain untuk ribuan perangkat fisik di seluruh dunia. Tanpa skalabilitas Solana tingkat tinggi, biaya mengklaim imbalan harian penambang akan habis terpotong gas fee.

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

export const MOCK_TECHNICAL_ANALYSIS: TechnicalAnalysisData[] = [
  {
    id: 'ta-btc',
    coinSymbol: 'BTC',
    coinName: 'Bitcoin',
    title: 'Analisis BTC/USDT: Pertahanan Kokoh di EMA 50, Menguji Symmetrical Triangle',
    summary: 'Bitcoin sedang membentuk pola Symmetrical Triangle di garis waktu harian. Indikasi volume yang menurun menunjukkan potensi breakout besar dalam waktu 48 jam.',
    content: `Bitcoin (BTC) terus menunjukkan ketahanan luar biasa dengan mempertahankan posisinya di atas level $67.000. Dalam grafik 4 jam terakhir, pergerakan BTC terperangkap di dalam pola Symmetrical Triangle, yang mengindikasikan ketidakyakinan pasar sementara (konsolidasi) sebelum pergerakan arah berikutnya yang masif.

RSI harian saat ini santai di level 56, menunjukkan ketahanan kekuatan pembeli tanpa risiko wilayah jenuh beli (overbought). Garis MACD sedang berjalan mendatar tepat di atas garis nol, memberikan indikasi netral-bullish.

### Strategi Trading yang Direkomendasikan:

*   **Skenario Bullish:** Jika penutupan lilin harian berada di atas $69.100 (resisten utama), pasang entri beli instan dengan target pertama di $71.200 dan target puncak di $73.400.
*   **Skenario Bearish:** Sebaliknya, jika level support $66.800 runtuh dibarengi volume penjualan tinggi, kita dapat menyaksikan koreksi sementara menguji kembali tingkat likuiditas berikutnya di area $65.200.`,
    trend: 'up',
    rsi: 56,
    macd: 'Bullish Crossover Pasif',
    movingAverage: 'BUY (Di Atas EMA 50 harian)',
    support: 66800,
    resistance: 69100,
    chartPoints: [
      { label: '09:00', price: 67100 },
      { label: '11:00', price: 66900 },
      { label: '13:00', price: 67450 },
      { label: '15:00', price: 67200 },
      { label: '17:00', price: 68100 },
      { label: '19:00', price: 67900 },
      { label: '21:00', price: 68420 },
    ],
    date: 'Hari Ini, 12:45'
  },
  {
    id: 'ta-eth',
    coinSymbol: 'ETH',
    coinName: 'Ethereum',
    title: 'Analisis ETH/USDT: Efek Persetujuan ETF Mendorong Harga Menguji Level Resisten $3.600',
    summary: 'Ethereum bersiap untuk putaran reli kedua setelah konsolidasi singkat di rentang $3.400. Volume perdagangan meningkat 40% dalam 24 jam terakhir.',
    content: `Persetujuan ETF spot Ethereum memicu aksi beli gila-gilaan. Ethereum sukses mempertahankan area support psikologis baru di $3.350, yang sebelumnya merupakan level resisten dinamis yang sulit ditembus.

Pada grafik 2 jam, ETH membentuk pola Bullish Rectangle, menunjukkan akumulasi berkelanjutan di kisaran harga tinggi. Indikator Momentum RSI berada di 68, sudah dekat dengan area Overbought tetapi masih memiliki tenaga dorongan terakhir. 

### Rencana Eksekusi:

*   **Entri:** Mencari pullback minor di sekitar $3.420 untuk rasio Risk-to-Reward terbaik.
*   **Target:** Ambil keuntungan (Take Profit) di level pertahanan berikutnya di $3.620 dan $3.780. Stop Loss ketat di bawah $3.310.`,
    trend: 'up',
    rsi: 68,
    macd: 'Strong Bullish Expansion',
    movingAverage: 'STRONG BUY (Di Atas EMA 20 & 50)',
    support: 3350,
    resistance: 3620,
    chartPoints: [
      { label: '09:00', price: 3320 },
      { label: '11:00', price: 3380 },
      { label: '13:00', price: 3410 },
      { label: '15:00', price: 3390 },
      { label: '17:00', price: 3450 },
      { label: '19:00', price: 3440 },
      { label: '21:00', price: 3485 },
    ],
    date: 'Hari Ini, 11:30'
  }
];

export const MOCK_COMMENTS: Comment[] = [
  {
    id: 'c-1',
    articleId: 'art-1',
    author: 'CryptoWarior99',
    content: 'Ini adalah keputusan yang sangat logis dari SEC. Institusi tidak ingin ketinggalan lagi seperti yang terjadi pada BTC ETF. ETH $5k akhir tahun ini sangat mungkin terjadi!',
    date: '2 jam yang lalu',
    likes: 42,
    avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?q=80&w=100&auto=format&fit=crop',
  },
  {
    id: 'c-2',
    articleId: 'art-1',
    author: 'DeFi_King',
    content: 'Tapi bagaimana dengan staking reward? ETF ini tidak memiliki yield staking, jadi memegang ETH asli on-chain masih jauh lebih menguntungkan buat pelaku retail sejati.',
    date: '1 jam yang lalu',
    likes: 21,
    avatar: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?q=80&w=100&auto=format&fit=crop',
  },
  {
    id: 'c-3',
    articleId: 'art-2',
    author: 'SatoshiMindset',
    content: 'Koreksi setelah halving di siklus ini memang terasa lebih dangkal. Saya setuju, ETF bertindak sebagai bantalan besar bagi penjual harian. Tambah muatan terus di support $65k!',
    date: '3 jam yang lalu',
    likes: 15,
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=100&auto=format&fit=crop',
  }
];

export const MOCK_CAREERS: CareerItem[] = [
  {
    id: 'car-1',
    title: 'Senior Blockchain Smart Contract Auditor',
    department: 'Keamanan / Audit',
    location: 'Jakarta / Remote',
    type: 'Full-time',
    salary: 'Rp 28.000.000 - Rp 45.000.000',
    description: 'Kami mencari auditor smart contract senior berpengalaman dalam melakukan penetration testing, analisis audit Solidity dan Rust on-chain, serta validasi tokenomics.',
    requirements: [
      'Pengalaman minimal 3 tahun menulis dan mengaudit smart contract Solidity atau Rust.',
      'Memahami alat analisis keamanan seperti Slither, Mythril, atau Echidna.',
      'Memahami mekanisme serangan reentrancy, integer overflow, flash loan attacks, dan oracle manipulation.'
    ]
  },
  {
    id: 'car-2',
    title: 'Web3 Frontend Developer (React / Wagmi)',
    department: 'Teknik / Rekayasa',
    location: 'Remote',
    type: 'Full-time',
    salary: 'Rp 18.000.000 - Rp 30.000.000',
    description: 'Bertanggung jawab membangun antarmuka DeFi Dashboard mutakhir, menghubungkan library provider Ethers.js/Viem dengan backend, serta mengoptimalkan dApp UX.',
    requirements: [
      'Sangat menguasai React, TypeScript, Tailwind CSS, dan Next.js/Vite.',
      'Berpengalaman mengintegrasikan wallet koneksi Web3 menggunakan Wagmi, RainbowKit, atau Web3Modal.',
      'Memahami RPC Nodes, IPFS, dan optimalisasi rendering state on-chain.'
    ]
  },
  {
    id: 'car-3',
    title: 'Crypto Technical Writer & Researcher',
    department: 'Konten / Riset',
    location: 'Jakarta (Hybrid)',
    type: 'Part-time / Contract',
    salary: 'Rp 8.000.000 - Rp 14.000.000',
    description: 'Menulis ulasan mendalam mengenai protokol DeFi baru, merangkum regulasi kripto global, serta memproduksi konten edukasi berkualitas ramah pemula.',
    requirements: [
      'Gairah mendalam tentang kripto, DeFi, NFT, dan ekosistem L1/L2.',
      'Kemampuan merangkum topik-topik rumit (misal ZK-Rollups, MEV) ke dalam tulisan yang mudah dicerna.',
      'Memiliki portofolio tulisan atau analisis riset kripto.'
    ]
  }
];

export const MOCK_EVENTS: EventItem[] = [
  {
    id: 'evt-1',
    title: 'Strategi Mengarungi Siklus Bull Run 2026',
    date: '31 Mei 2026, 19:30 WIB',
    location: 'Online via Zoom & YouTube Live',
    type: 'Webinar',
    description: 'Kupas tuntas peta jalan Altcoins setelah ETF Ethereum disetujui. Dapatkan wawasan tentang rotasi sektor dari Narasi AI ke RWA dan L2.',
    speaker: 'Rama Wijaya (Analist Utama KriptoKini)',
    link: 'https://zoom.us/j/kriptokini-webinar-1',
    registeredCount: 345
  },
  {
    id: 'evt-2',
    title: 'Temu Komunitas Web3 & Developer Hub Jakarta',
    date: '12 Juni 2026, 14:00 WIB',
    location: 'WeWork SCBD Tower, Jakarta Selatan',
    type: 'Meetup',
    description: 'Ajang networking santai antara developer Solidity, pendiri proyek Web3 lokal, serta pemodal ventura untuk berkolaborasi membangun ekosistem di Indonesia.',
    speaker: 'Dian Nugraha (Kepala Regulasi & Komunitas)',
    link: 'https://meetup.com/kriptokini-community-meetup',
    registeredCount: 120
  },
  {
    id: 'evt-3',
    title: 'Eksplorasi Keamanan Smart Contract & Flash-Loan Attack',
    date: '25 Juni 2026, 15:00 WIB',
    location: 'Online Workshop / Google Meet',
    type: 'AMA',
    description: 'Sesi kupas tuntas kasus peretasan manipulasi harga oracle DeFi legendaris, serta tips praktis menulis kode Solidity anti-hack.',
    speaker: 'Adrian Hartanto (Lead Security Auditor)',
    link: 'https://meetup.com/kriptokini-ama-solidity',
    registeredCount: 92
  }
];

export const MOCK_EDUCATION: EducationItem[] = [
  {
    id: 'edu-1',
    title: 'Dasar Teknologi Blockchain & Kriptografi',
    level: 'Pemula',
    estimatedTime: '45 menit',
    modulesCount: 4,
    description: 'Pelajari dasar-dasar cara kerja blockchain, konsensus Proof of Work vs Proof of Stake, kriptografi kunci publik, serta keamanan dasar dompet kripto Anda.',
    chapters: [
      'Pengenalan Cara Kerja Blok dan Rantai Data',
      'Mekanisme Konsensus: Menjaga Keamanan tanpa Server Sentral',
      'Memahami Kunci Publik, Kunci Privat, dan Seed Phrase',
      'Cara Memulai Transaksi Pertama dengan Aman'
    ]
  },
  {
    id: 'edu-2',
    title: 'Menyelami Keuangan Terdesentralisasi (DeFi)',
    level: 'Menengah',
    estimatedTime: '60 menit',
    modulesCount: 5,
    description: 'Kuasai konsep Automated Market Makers (AMM), Liquidity Pool, Yield Farming, DeFi Lending & Borrowing, hingga risiko Impairment Loss secara mendalam.',
    chapters: [
      'Evolusi Keuangan Tradisional Menuju DeFi',
      'Cara Kerja Liquidity Pool dan Skema Swap Token',
      'Menjadi Penyedia Likuiditas & Memahami Impairment Loss',
      'Protokol Pinjam Meminjam (Aave, Compound) Tanpa Jaminan KTP',
      'Strategi Membaca Yield APY vs APR Secara Akurat'
    ]
  },
  {
    id: 'edu-3',
    title: 'Arsitektur Ethereum Virtual Machine (EVM) & Solidity Lanjut',
    level: 'Ahli',
    estimatedTime: '90 menit',
    modulesCount: 6,
    description: 'Panduan teknis memahami reentrancy attacks, tata kelola proxy contracts, optimalisasi konsumsi gas limit, serta integrasi Chainlink Oracles.',
    chapters: [
      'Instruksi Assembly EVM & Penataan Storage Slot',
      'Menulis Kode Solidity yang Hemat Gas (Gas Optimization)',
      'Security Coding: Desain Reentrancy Guard & SafeTransfer',
      'Membangun Upgradable Contracts Menggunakan Pola UUPS',
      'Integrasi Data Eksternal Melalui Oracles',
      'Menerbitkan Token ERC-20 & ERC-721 di Jaringan Testnet'
    ]
  }
];
