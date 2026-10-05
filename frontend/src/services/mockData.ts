export const DEFAULT_ABOUT = {
  heroTitle: 'BIG CSIRT',
  heroSubtitle: 'BIG-CSIRT siap merespons dan menangani insiden keamanan siber di lingkungan BIG',
  heroBg: '',
  announcement: 'Waspada terhadap kampanye phishing yang menargetkan email instansi pemerintah menggunakan domain palsu .go.id. Laporkan segera jika menemukan kejanggalan!',
  title: 'Tentang BIG-CSIRT',
  subtitle: 'Badan Informasi Geospasial',
  body: [
    'BIG-CSIRT adalah tim respons insiden keamanan siber yang berada di bawah Badan Informasi Geospasial (BIG). Kami bertugas melindungi infrastruktur teknologi informasi dan data geospasial nasional dari ancaman siber.',
    'Dibentuk sesuai mandat keamanan siber nasional, BIG-CSIRT berkolaborasi dengan BSSN, instansi pemerintah, dan mitra internasional dalam ekosistem keamanan siber Indonesia.'
  ],
  logoSrc: '/assets/logo-csirt-D9xGTNl_.png',
  link: '/profil',
  linkText: 'Pelajari Profil Lengkap'
};

export const DEFAULT_ARTICLES = [
  {
    id: '1',
    title: 'BIG-CSIRT Berhasil Menangani Web Defacement di BIG',
    category: 'INSIDEN',
    date: '25 Mei 2025',
    description: 'Tim respons cepat berhasil mengisolasi serangan dalam waktu kurang dari 2 jam dan memulihkan data geospasial kritis secara penuh...',
    imageUrl: '/assets/news-featured-DEHxhDd0.png',
    type: 'featured',
    body: '<p>Tim respons cepat berhasil mengisolasi serangan dalam waktu kurang dari 2 jam dan memulihkan data geospasial kritis secara penuh. Insiden ini ditangani secara profesional sesuai SOP yang berlaku.</p>'
  },
  {
    id: '2',
    title: 'Kolaborasi BSSN dan BIG-CSIRT dalam Penguatan Keamanan Infrastruktur',
    category: 'KERJASAMA',
    date: '22 Mei 2025',
    description: 'Kolaborasi strategis antara BSSN dan BIG-CSIRT untuk memperkuat keamanan infrastruktur.',
    imageUrl: '/assets/news-featured-DEHxhDd0.png',
    type: 'standard',
    body: '<p>Kolaborasi strategis antara BSSN dan BIG-CSIRT untuk memperkuat keamanan infrastruktur informasi geospasial nasional.</p>'
  },
  {
    id: '3',
    title: 'Waspada: Kampanye Phishing Targetkan Email Instansi Pemerintah',
    category: 'WASPADA',
    date: '18 Mei 2025',
    description: 'Peringatan dini mengenai upaya phishing yang meniru domain instansi pemerintah.',
    imageUrl: '/assets/news-featured-DEHxhDd0.png',
    type: 'standard',
    body: '<p>Ditemukan beberapa indikasi pengiriman email phishing masif dengan lampiran dokumen berbahaya.</p>'
  }
];

export const DEFAULT_ADVISORIES = [
  {
    id: '1',
    date: '15 Mei 2025',
    cveId: 'CVE-2025-24911',
    advisoryId: 'CVE-2025-24911',
    title: 'Protection Mechanism Failure - Testing',
    severity: 'Kritis',
    status: 'Selesai',
    body: '<p>Kerentanan kritis pada mekanisme proteksi sistem yang memungkinkan eksekusi kode berbahaya tanpa otentikasi.</p>'
  },
  {
    id: '2',
    date: '10 Mei 2025',
    cveId: 'CVE-2025-30089',
    advisoryId: 'CVE-2025-30089',
    title: 'Kerentanan pada Claude Code CLI dan Claude Agent SDK Masif Menggunakan Domain Palsu .go.id',
    severity: 'Tinggi',
    status: 'Aktif',
    body: '<p>Ditemukan upaya eksploitasi aktif memanfaatkan Claude Code CLI dan domain palsu untuk mengecoh pengguna.</p>'
  },
  {
    id: '3',
    date: '05 Mei 2025',
    cveId: 'CVE-2025-18452',
    advisoryId: 'CVE-2025-18452',
    title: 'Improper Privilege Management',
    severity: 'Sedang',
    status: 'Dalam Penanganan',
    body: '<p>Kelemahan pengelolaan hak akses pada sistem manajemen dokumen yang memungkinkan eskalasi hak istimewa.</p>'
  }
];

export const DEFAULT_EDUCATION = [
  {
    id: '1',
    title: 'Cara Mengenali Email Phishing',
    description: 'Langkah-langkah mudah mendeteksi email penipuan.',
    imageUrl: '/assets/edu-phishing-DCOW8l44.png',
    downloadUrl: 'https://drive.google.com'
  },
  {
    id: '2',
    title: 'Kalau Kena Hacking, kita harus ngapain.',
    description: 'Panduan tanggap darurat saat akun atau sistem terindikasi disusupi.',
    imageUrl: '/assets/edu-hacking-bYfdzDsZ.png',
    downloadUrl: 'https://drive.google.com'
  },
  {
    id: '3',
    title: 'Web Defacement',
    description: 'Apa itu defacement dan langkah pencegahannya.',
    imageUrl: '/assets/edu-defacement-C1fLWBZw.png',
    downloadUrl: 'https://drive.google.com'
  },
  {
    id: '4',
    title: 'Kok Jaringan nya lambat banget ya.',
    description: 'Mengenali serangan DDoS dan pembebanan jaringan abnormal.',
    imageUrl: '/assets/edu-ddos-MDj7WsaY.png',
    downloadUrl: 'https://drive.google.com'
  },
  {
    id: '5',
    title: 'Data Breach / Kebocoran Data.',
    description: 'Langkah penanganan dan pencegahan kebocoran data sensitif.',
    imageUrl: '/assets/edu-breach-9pshQO5v.png',
    downloadUrl: 'https://drive.google.com'
  },
  {
    id: '6',
    title: 'Infeksi Malware',
    description: 'Panduan keamanan ketika mengalami infeksi malware.',
    imageUrl: '/assets/edu-malware-B7EvBYrY.png',
    downloadUrl: 'https://drive.google.com'
  }
];

export const DEFAULT_GALLERY = [
  {
    id: '1',
    imageUrl: '/assets/gallery-1-Dw-hkkPo.png',
    caption: 'Kegiatan 1'
  },
  {
    id: '2',
    imageUrl: '/assets/gallery-2-kXKk9Ygw.png',
    caption: 'Kegiatan 2'
  },
  {
    id: '3',
    imageUrl: '/assets/gallery-3-D0wMoKTO.png',
    caption: 'Kegiatan 3'
  },
  {
    id: '4',
    imageUrl: '/assets/gallery-4-yCTvLm5t.png',
    caption: 'Kegiatan 4'
  }
];
