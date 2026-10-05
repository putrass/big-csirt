<template>
  <q-layout view="lHh Lpr lFf" class="min-h-screen flex flex-col font-geist bg-white text-[#111827] overflow-x-hidden w-full">
    <!-- Combined Navbar: BIG-CSIRT + Badan Informasi Geospasial -->
    <q-header class="bg-white border-b border-gray-100 shadow-sm text-[#111827]">
      <div class="max-w-[1440px] mx-auto min-h-[80px] py-2 flex items-center justify-between px-4 md:px-8 xl:px-12 gap-2 sm:gap-4">
        <!-- Logo & Branding Kiri -->
        <router-link to="/" class="flex items-center gap-2 sm:gap-3 md:gap-4 text-inherit no-underline flex-shrink-0 min-w-0">
          <!-- Logo BIG & CSIRT -->
          <div class="flex items-center gap-1.5 sm:gap-2 flex-shrink-0">
            <div class="h-[32px] w-[28px] sm:h-[42px] sm:w-[38px] flex-shrink-0">
              <img src="/assets/logo-big-crCCDRIX.png" alt="Badan Informasi Geospasial Logo" class="w-full h-full object-contain" />
            </div>
            <div class="w-[36px] h-[36px] sm:w-[50px] sm:h-[50px] flex-shrink-0">
              <img src="/assets/logo-csirt-D9xGTNl_.png" alt="CSIRT Logo" class="w-full h-full object-contain" />
            </div>
          </div>
          <!-- Title Branding -->
          <div class="flex flex-col text-[#0a1628] min-w-0">
            <span class="font-grotesk font-extrabold text-base sm:text-xl md:text-[22px] leading-tight tracking-tight truncate">
              BIG-CSIRT
            </span>
            <span class="font-geist font-medium text-[8px] sm:text-[10px] md:text-[11px] text-gray-500 tracking-wider truncate">
              Badan Informasi Geospasial
            </span>
          </div>
        </router-link>

        <!-- Menu Desktop: Langsung Menuju Page Masing-Masing -->
        <div class="desktop-nav-menu items-center gap-6 xl:gap-8 text-sm font-geist font-medium text-gray-700">
          <router-link
            to="/"
            class="nav-link-item hover:text-blue-600 transition-colors no-underline"
            :class="{ 'text-blue-600 font-bold active-indicator': $route.path === '/' }"
          >
            Beranda
          </router-link>

          <router-link
            to="/profil"
            class="nav-link-item hover:text-blue-600 transition-colors no-underline"
            :class="{ 'text-blue-600 font-bold active-indicator': $route.path === '/profil' || $route.path === '/page/profil' }"
          >
            Profil
          </router-link>

          <router-link
            to="/rfc-2350"
            class="nav-link-item hover:text-blue-600 transition-colors no-underline"
            :class="{ 'text-blue-600 font-bold active-indicator': $route.path === '/rfc-2350' }"
          >
            RFC 2350
          </router-link>

          <router-link
            to="/berita"
            class="nav-link-item hover:text-blue-600 transition-colors no-underline"
            :class="{ 'text-blue-600 font-bold active-indicator': $route.path.startsWith('/berita') || $route.path.startsWith('/content') }"
          >
            Berita
          </router-link>

          <router-link
            to="/advisory"
            class="nav-link-item hover:text-blue-600 transition-colors no-underline"
            :class="{ 'text-blue-600 font-bold active-indicator': $route.path.startsWith('/advisory') }"
          >
            Advisory
          </router-link>

          <router-link
            to="/edukasi"
            class="nav-link-item hover:text-blue-600 transition-colors no-underline"
            :class="{ 'text-blue-600 font-bold active-indicator': $route.path === '/edukasi' }"
          >
            Edukasi
          </router-link>

          <router-link
            to="/galeri"
            class="nav-link-item hover:text-blue-600 transition-colors no-underline"
            :class="{ 'text-blue-600 font-bold active-indicator': $route.path.startsWith('/galeri') }"
          >
            Galeri
          </router-link>

          <!-- Divider & ID | EN Switcher -->
          <div class="h-4 w-[1px] bg-gray-200 mx-1"></div>

          <div class="flex items-center gap-3">
            <span class="font-geist font-bold text-xs text-[#0a1628] hover:text-blue-600 cursor-pointer transition-colors">
              ID | EN
            </span>
            <button class="w-4 h-4 text-gray-500 hover:text-gray-900 transition-colors" aria-label="Accessibility settings" title="Aksesibilitas">
              <svg class="w-full h-full fill-current" viewBox="0 0 24 24"><path d="M12 2c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zm9 7h-6v13h-2v-6h-2v6H9V9H3V7h18v2z"/></svg>
            </button>
            <button class="w-4 h-4 text-gray-500 hover:text-gray-900 transition-colors" aria-label="Search" title="Cari">
              <svg class="w-full h-full fill-none stroke-current" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
            </button>
          </div>
        </div>

        <!-- Tombol Mobile (Layar Kecil) -->
        <div class="mobile-toggle-btn items-center gap-3">
          <span class="font-geist font-bold text-xs text-[#0a1628]">
            ID | EN
          </span>
          <button @click="mobileMenuOpen = !mobileMenuOpen" class="text-[#0a1628] hover:text-blue-600 focus:outline-none p-1.5 rounded-lg border border-gray-200" aria-label="Toggle menu">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7"></path>
            </svg>
          </button>
        </div>
      </div>

      <!-- Menu Dropdown Mobile -->
      <div v-if="mobileMenuOpen" class="mobile-nav-drawer bg-white border-b border-gray-200 px-6 py-4 flex flex-col gap-3 font-geist text-sm text-gray-700 shadow-lg">
        <router-link @click="mobileMenuOpen = false" to="/" class="text-left hover:text-blue-600 py-1 no-underline text-inherit" :class="{ 'text-blue-600 font-bold': $route.path === '/' }">
          Beranda
        </router-link>
        <router-link @click="mobileMenuOpen = false" to="/profil" class="text-left hover:text-blue-600 py-1 no-underline text-inherit" :class="{ 'text-blue-600 font-bold': $route.path === '/profil' }">
          Profil
        </router-link>
        <router-link @click="mobileMenuOpen = false" to="/rfc-2350" class="text-left hover:text-blue-600 py-1 no-underline text-inherit" :class="{ 'text-blue-600 font-bold': $route.path === '/rfc-2350' }">
          RFC 2350
        </router-link>
        <router-link @click="mobileMenuOpen = false" to="/berita" class="text-left hover:text-blue-600 py-1 no-underline text-inherit" :class="{ 'text-blue-600 font-bold': $route.path.startsWith('/berita') }">
          Berita
        </router-link>
        <router-link @click="mobileMenuOpen = false" to="/advisory" class="text-left hover:text-blue-600 py-1 no-underline text-inherit" :class="{ 'text-blue-600 font-bold': $route.path.startsWith('/advisory') }">
          Advisory
        </router-link>
        <router-link @click="mobileMenuOpen = false" to="/edukasi" class="text-left hover:text-blue-600 py-1 no-underline text-inherit" :class="{ 'text-blue-600 font-bold': $route.path === '/edukasi' }">
          Edukasi
        </router-link>
        <router-link @click="mobileMenuOpen = false" to="/galeri" class="text-left hover:text-blue-600 py-1 no-underline text-inherit" :class="{ 'text-blue-600 font-bold': $route.path.startsWith('/galeri') }">
          Galeri
        </router-link>
      </div>
    </q-header>

    <!-- Main Content -->
    <q-page-container class="flex-1 overflow-x-hidden w-full">
      <router-view />
    </q-page-container>

    <!-- Footer: Plek Ketiplek ttis-web -->
    <footer class="bg-[#071120] w-full text-white">
      <div class="max-w-[1440px] mx-auto px-4 md:px-8 xl:px-12 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
        <div class="flex flex-col gap-6 lg:col-span-2">
          <div class="flex items-center gap-3">
            <div class="w-[64px] h-[64px] sm:w-[80px] sm:h-[80px] flex-shrink-0 bg-white p-1 rounded-xl shadow-md">
              <img src="/assets/logo-csirt-D9xGTNl_.png" alt="CSIRT Logo" class="w-full h-full object-contain" />
            </div>
            <div class="flex flex-col">
              <span class="font-grotesk font-extrabold text-[22px] sm:text-[26px] text-white leading-tight">
                BIG-CSIRT
              </span>
              <span class="text-xs text-blue-300 font-medium">Badan Informasi Geospasial</span>
            </div>
          </div>
          <p class="font-geist font-normal text-sm text-gray-400 leading-relaxed max-w-[500px]">
            Badan Informasi Geospasial<br />
            Jl. Raya Jakarta-Bogor Km 46, Cibinong, Bogor 16911<br />
            Email: csirt[at]big.go.id
          </p>
          <div class="flex items-center gap-4">
            <a href="https://x.com" target="_blank" class="w-9 h-9 bg-[#0a1628] hover:bg-blue-600 transition-colors flex items-center justify-center rounded-full text-white no-underline" aria-label="Twitter">
              <i class="fab fa-x-twitter text-sm"></i>
            </a>
            <a href="https://instagram.com" target="_blank" class="w-9 h-9 bg-[#0a1628] hover:bg-pink-600 transition-colors flex items-center justify-center rounded-full text-white no-underline" aria-label="Instagram">
              <i class="fab fa-instagram text-sm"></i>
            </a>
            <a href="https://linkedin.com" target="_blank" class="w-9 h-9 bg-[#0a1628] hover:bg-blue-700 transition-colors flex items-center justify-center rounded-full text-white no-underline" aria-label="LinkedIn">
              <i class="fab fa-linkedin-in text-sm"></i>
            </a>
            <a href="https://youtube.com" target="_blank" class="w-9 h-9 bg-[#0a1628] hover:bg-red-600 transition-colors flex items-center justify-center rounded-full text-white no-underline" aria-label="YouTube">
              <i class="fab fa-youtube text-sm"></i>
            </a>
          </div>
        </div>

        <div class="flex flex-col gap-5">
          <h3 class="font-geist font-bold text-base sm:text-lg text-white m-0">Tautan Terkait</h3>
          <ul class="flex flex-col gap-3 font-geist font-normal text-sm text-gray-400 p-0 m-0 list-none">
            <li>
              <a href="https://big.go.id" target="_blank" rel="noopener noreferrer" class="hover:text-blue-400 transition-colors no-underline text-gray-400">
                Badan Informasi Geospasial
              </a>
            </li>
            <li>
              <a href="https://bssn.go.id" target="_blank" rel="noopener noreferrer" class="hover:text-blue-400 transition-colors no-underline text-gray-400">
                BSSN
              </a>
            </li>
            <li>
              <a href="https://idsirtii.or.id" target="_blank" rel="noopener noreferrer" class="hover:text-blue-400 transition-colors no-underline text-gray-400">
                ID-SIRTII/CC
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div class="bg-[#0d1f3c] border-t border-[#1a3a6b] py-6">
        <div class="max-w-[1440px] mx-auto px-4 md:px-8 xl:px-12 flex flex-col sm:flex-row items-center justify-between gap-4 font-geist font-normal text-xs sm:text-sm text-gray-400 text-center sm:text-left">
          <p class="m-0">© 2026 BIG-CSIRT — Badan Informasi Geospasial. Hak Cipta Dilindungi.</p>
          <div class="flex items-center gap-6">
            <router-link to="/page/kebijakan-privasi" class="hover:text-white transition-colors text-gray-400 no-underline text-xs sm:text-sm">
              Kebijakan Privasi
            </router-link>
            <router-link to="/page/syarat-dan-ketentuan" class="hover:text-white transition-colors text-gray-400 no-underline text-xs sm:text-sm">
              Syarat &amp; Ketentuan
            </router-link>
            <div class="w-[20px] h-[12px] flex-shrink-0">
              <img src="/assets/flag-UQ417Inh.png" alt="Country Flag" class="w-full h-full object-contain" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  </q-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const mobileMenuOpen = ref(false);
</script>

<style scoped>
@media (min-width: 768px) {
  .desktop-nav-menu {
    display: flex !important;
  }
  .mobile-toggle-btn {
    display: none !important;
  }
}

@media (max-width: 767px) {
  .desktop-nav-menu {
    display: none !important;
  }
  .mobile-toggle-btn {
    display: flex !important;
  }
}

.nav-link-item {
  color: #374151;
  font-size: 14px;
  font-weight: 500;
  padding: 6px 2px;
  position: relative;
  transition: color 0.15s ease-in-out;
}

.nav-link-item:hover {
  color: #1b4fd8;
}

.active-indicator {
  color: #1b4fd8 !important;
  border-bottom: 2px solid #1b4fd8;
}
</style>
