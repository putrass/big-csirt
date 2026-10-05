import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  // Public layout
  {
    path: '/',
    component: () => import('@/layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('@/pages/IndexPage.vue') },
      { path: 'profil', component: () => import('@/pages/ProfilePage.vue') },
      { path: 'page/profil', component: () => import('@/pages/ProfilePage.vue') },
      { path: 'rfc-2350', component: () => import('@/pages/RfcPage.vue') },
      { path: 'berita', component: () => import('@/pages/BeritaPage.vue') },
      { path: 'content/berita-komdigi', component: () => import('@/pages/BeritaPage.vue') },
      { path: 'content/:type', component: () => import('@/pages/BeritaPage.vue') },
      { path: 'content/:slug/detail', component: () => import('@/pages/ArticleDetail.vue') },
      { path: 'advisory', component: () => import('@/pages/AdvisoryPage.vue') },
      { path: 'advisory/:id', component: () => import('@/pages/AdvisoryDetail.vue') },
      { path: 'edukasi', component: () => import('@/pages/EducationPage.vue') },
      { path: 'galeri', component: () => import('@/pages/GaleriPage.vue') },
      { path: 'galeri/:slug/detail', component: () => import('@/pages/GaleriDetail.vue') },
      { path: 'hubungi-kami', component: () => import('@/pages/HubungiKamiPage.vue') },
      { path: 'page/:slug', component: () => import('@/pages/StaticPage.vue') },
    ],
  },
  // Auth pages (no layout)
  { path: '/login', component: () => import('@/pages/LoginPage.vue') },
  { path: '/register', component: () => import('@/pages/RegisterPage.vue') },
  // Dashboard layout
  {
    path: '/bug-hunter',
    component: () => import('@/layouts/DashboardLayout.vue'),
    meta: { requiresAuth: true },
    children: [
      { path: 'dashboard', component: () => import('@/pages/dashboard/DashboardHome.vue') },
      { path: 'articles', component: () => import('@/pages/dashboard/ManageArticles.vue') },
      { path: 'advisories', component: () => import('@/pages/dashboard/ManageAdvisories.vue') },
      { path: 'education', component: () => import('@/pages/dashboard/ManageEducation.vue') },
      { path: 'gallery', component: () => import('@/pages/dashboard/ManageGallery.vue') },
      { path: 'pages', component: () => import('@/pages/dashboard/ManagePages.vue') },
      { path: 'about', component: () => import('@/pages/dashboard/ManageAbout.vue') },
      { path: 'users', component: () => import('@/pages/dashboard/ManageUsers.vue') },
    ],
  },
  { path: '/user-login', redirect: '/login' },
  { path: '/user-register', redirect: '/register' },
  { path: '/:catchAll(.*)*', component: () => import('@/pages/ErrorNotFound.vue') },
];

export default routes;
