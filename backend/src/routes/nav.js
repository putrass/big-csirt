const router = require('express').Router();

const socials = [
  { icon: 'fab fa-youtube', url: 'https://www.youtube.com/@KemkomdigiTV' },
  { icon: 'fab fa-instagram', url: 'https://www.instagram.com/kemkomdigi/' },
  { icon: 'fab fa-facebook', url: 'https://www.facebook.com/kemenkomdigi/' },
  { icon: 'fab fa-x-twitter', url: 'https://x.com/kemkomdigi/' },
];

const topLinks = [
  { label: 'Daftar', icon: 'fa fa-user', url: '/register' },
  { label: 'Masuk', icon: 'fa fa-sign-in-alt', url: '/login' },
  { label: 'Dashboard', icon: 'fa fa-home', url: '/bug-hunter/dashboard' },
];

const navItems = [
  { label: 'Home', path: '/', type: 'link' },
  { label: 'Leaderboard', path: '/leaderboard', type: 'link' },
  {
    label: 'Profil',
    type: 'dropdown',
    children: [
      { label: 'Visi dan Misi', path: '/page/visi-dan-misi' },
      { label: 'Tugas dan Fungsi', path: '/page/tugas-dan-fungsi' },
      { label: 'Layanan', path: '/page/layanan' },
      { label: 'Capaian dan Prestasi', path: '/page/capaian-dan-prestasi' },
    ],
  },
  {
    label: 'Berita',
    type: 'dropdown',
    children: [
      { label: 'Berita Komdigi - CSIRT', path: '/content/berita-komdigi' },
      { label: 'Galeri Foto', path: '/galeri?type=photo' },
      { label: 'Galeri Video', path: '/galeri?type=video' },
    ],
  },
  {
    label: 'Layanan',
    type: 'dropdown',
    children: [{ label: 'PGP Key', path: '/page/pgp-key' }],
  },
  {
    label: 'Informasi Kerentanan',
    path: '/content/informasi-kerentanan',
    type: 'dropdown',
    children: [
      { label: 'Peringatan Ancaman', path: '/content/peringatan-ancaman' },
    ],
  },
  {
    label: 'Informasi Lain',
    type: 'dropdown',
    children: [
      { label: 'Informasi Publik', path: '/dokumen/informasi-publik' },
      { label: 'Informasi Berkala', path: '/dokumen/informasi-berkala' },
      { label: 'Informasi Tahunan', path: '#' },
      { label: 'Agenda', path: '/agenda' },
    ],
  },
];

router.get('/', (_req, res) => {
  res.json({ socials, topLinks, navItems });
});

module.exports = router;
