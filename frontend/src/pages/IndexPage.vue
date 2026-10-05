<template>
  <q-page class="w-full overflow-x-hidden">
    <!-- 1. Hero Section (Responsive height & typography) -->
    <section class="relative w-full bg-gradient-to-r from-[#0a1628] to-[#1a3a6b] overflow-hidden min-h-[420px] md:min-h-[calc(100vh-136px)] flex items-center justify-center">
      <div class="absolute inset-0 bg-cover bg-center opacity-25 mix-blend-overlay pointer-events-none transition-all duration-700" :style="{ backgroundImage: `url(${about.heroBg || getAssetUrl('assets/bg-map-DqRDIy-6.png')})` }"></div>
      <div class="max-w-[1440px] mx-auto w-full px-4 sm:px-6 md:px-8 xl:px-12 py-12 md:py-16 flex flex-col items-center justify-center text-center relative z-10">
        <div class="max-w-[960px] flex flex-col items-center gap-4 sm:gap-6">
          <h1 class="font-grotesk font-extrabold text-3xl sm:text-4xl md:text-6xl lg:text-7xl xl:text-[76px] text-white leading-tight tracking-tight">
            {{ about.heroTitle || 'BIG CSIRT' }}
          </h1>
          <p class="font-geist font-normal text-base sm:text-lg md:text-xl lg:text-2xl text-blue-100 opacity-90 leading-relaxed max-w-[820px] mx-auto px-2">
            {{ about.heroSubtitle || 'BIG-CSIRT siap merespons dan menangani insiden keamanan siber di lingkungan BIG' }}
          </p>
        </div>
      </div>
    </section>

    <!-- 2. Running Marquee Announcement (Oren-oren 1 baris) -->
    <div class="bg-[#f59e0b] w-full h-[56px] flex items-center overflow-hidden shadow-sm">
      <div class="max-w-[1440px] mx-auto w-full px-4 md:px-8 xl:px-12 flex flex-row flex-nowrap items-center text-[#0a1628] font-geist font-medium text-sm sm:text-base gap-3">
        <span class="bg-[#0a1628] text-white text-[10px] sm:text-xs font-bold px-2.5 py-1 rounded uppercase tracking-wider flex-shrink-0 whitespace-nowrap animate-pulse self-center">
          PENTING
        </span>
        <div class="flex-1 min-w-0 h-[24px] relative overflow-hidden flex items-center">
          <p class="whitespace-nowrap absolute m-0 text-sm sm:text-base font-semibold leading-none animate-marquee hover:[animation-play-state:paused] cursor-pointer">
            {{ about.announcement || 'Waspada terhadap kampanye phishing yang menargetkan email instansi pemerintah menggunakan domain palsu .go.id. Laporkan segera jika menemukan kejanggalan!' }}
          </p>
        </div>
      </div>
    </div>

    <!-- 3. Tentang BIG-CSIRT -->
    <section id="tentang" class="bg-white w-full text-[#111827] py-16 md:py-24 border-b border-gray-100 reveal-on-scroll">
      <div class="max-w-[1440px] mx-auto px-4 md:px-8 xl:px-12 grid grid-cols-1 md:grid-cols-12 items-center gap-8 md:gap-12 lg:gap-16">
        <!-- Kolom Teks (Kiri) -->
        <div class="md:col-span-7 lg:col-span-8 flex flex-col gap-5 text-left order-1">
          <div class="flex items-center gap-4">
            <h2 class="font-grotesk font-extrabold text-3xl sm:text-4xl text-[#111827] tracking-tight">
              {{ about.title || 'Tentang BIG-CSIRT' }}
            </h2>
          </div>
          <div class="font-geist font-normal text-base sm:text-lg text-[#4b5563] leading-relaxed flex flex-col gap-4">
            <template v-if="about.body && about.body.length">
              <p v-for="(p, i) in about.body" :key="i">{{ p }}</p>
            </template>
            <template v-else>
              <p>
                BIG-CSIRT adalah tim respons insiden keamanan siber yang berada di bawah Badan Informasi Geospasial (BIG). Kami bertugas melindungi infrastruktur teknologi informasi dan data geospasial nasional dari ancaman siber.
              </p>
              <p>
                Dibentuk sesuai mandat keamanan siber nasional, BIG-CSIRT berkolaborasi dengan BSSN, instansi pemerintah, dan mitra internasional dalam ekosistem keamanan siber Indonesia.
              </p>
            </template>
          </div>
          <div class="flex flex-wrap items-center gap-6 mt-2 font-geist font-bold text-sm sm:text-base text-[#1b4fd8]">
            <router-link :to="about.link || '/profil'" class="hover:text-blue-700 transition-colors flex items-center gap-1 group no-underline text-[#1b4fd8]">
              {{ about.linkText || 'Pelajari Profil Lengkap' }}
              <span class="group-hover:translate-x-1 transition-transform">→</span>
            </router-link>
            <router-link to="/rfc-2350" class="hover:text-blue-700 transition-colors flex items-center gap-1 group no-underline text-[#1b4fd8]">
              Unduh RFC 2350
              <span class="group-hover:translate-x-1 transition-transform">→</span>
            </router-link>
          </div>
        </div>

        <!-- Kolom Gambar / Logo (Kanan - di sebelah teks) -->
        <div class="md:col-span-5 lg:col-span-4 flex justify-center md:justify-end items-center order-2">
          <div class="w-[260px] h-[260px] sm:w-[320px] sm:h-[320px] md:w-[360px] md:h-[360px] lg:w-[420px] lg:h-[420px] relative hover:scale-105 transition-transform duration-500">
            <img :src="about.logoSrc || getAssetUrl('assets/logo-csirt-D9xGTNl_.png')" alt="BIG-CSIRT Logo" class="w-full h-full object-contain" />
          </div>
        </div>
      </div>
    </section>

    <!-- 4. Berita Keamanan Siber Terkini -->
    <section id="berita" class="bg-white w-full py-16 transition-all duration-700 reveal-on-scroll">
      <div class="max-w-[1440px] mx-auto px-4 md:px-8 xl:px-12 flex flex-col gap-8">
        <div class="flex items-center justify-between">
          <h2 class="font-grotesk font-bold text-2xl sm:text-3xl lg:text-[36px] text-[#111827]">
            Berita Keamanan Siber Terkini
          </h2>
          <router-link to="/berita" class="font-geist font-bold text-sm sm:text-base text-[#1b4fd8] hover:text-blue-700 transition-colors flex items-center gap-1 group whitespace-nowrap no-underline">
            Lihat Semua <span class="group-hover:translate-x-1 transition-transform">→</span>
          </router-link>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8" v-if="articles.length">
          <!-- Featured News Card (Left 2 cols) -->
          <div class="lg:col-span-2 bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md border border-gray-100 transition-shadow flex flex-col md:flex-row" v-if="featuredArticle">
            <div class="w-full md:w-[40%] h-[240px] md:h-auto min-h-[240px] relative">
              <img :src="featuredArticle.imageUrl || getAssetUrl('assets/news-featured-DEHxhDd0.png')" :alt="featuredArticle.title" class="absolute inset-0 w-full h-full object-cover" />
            </div>
            <div class="w-full md:w-[60%] p-6 md:p-8 flex flex-col justify-between gap-6">
              <div class="flex flex-col gap-3">
                <div class="flex items-center gap-3">
                  <span class="bg-[#dc2626] text-white text-[10px] font-bold px-2 py-0.5 rounded tracking-wide uppercase">
                    {{ featuredArticle.category || 'INSIDEN' }}
                  </span>
                  <span class="font-geist font-normal text-sm text-gray-500">{{ featuredArticle.date }}</span>
                </div>
                <h3 class="font-grotesk font-bold text-xl sm:text-2xl text-[#111827] leading-snug hover:text-[#1b4fd8] cursor-pointer transition-colors">
                  {{ featuredArticle.title }}
                </h3>
                <p class="font-geist font-normal text-sm sm:text-base text-[#6b7280] leading-relaxed">
                  {{ featuredArticle.description }}
                </p>
              </div>
              <div>
                <router-link :to="`/content/${featuredArticle.slug || featuredArticle.id}/detail`" class="bg-[#1b4fd8] hover:bg-[#153eb2] text-white font-geist font-semibold text-sm px-6 py-2.5 rounded transition-colors inline-block no-underline">
                  Baca Selengkapnya
                </router-link>
              </div>
            </div>
          </div>

          <!-- Side News (Right 1 col) -->
          <div class="flex flex-col gap-6">
            <div v-for="item in standardArticles" :key="item.id" class="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow flex flex-col gap-3">
              <div class="flex items-center gap-3 text-xs">
                <span class="font-geist font-extrabold tracking-wider" :class="categoryColor(item.category)">
                  {{ item.category }}
                </span>
                <span class="font-geist font-normal text-gray-500">{{ item.date }}</span>
              </div>
              <h4 class="font-grotesk font-bold text-lg text-[#111827] hover:text-[#1b4fd8] cursor-pointer transition-colors leading-snug">
                {{ item.title }}
              </h4>
              <router-link :to="`/content/${item.slug || item.id}/detail`" class="font-geist font-semibold text-sm text-[#1b4fd8] hover:text-blue-700 transition-colors flex items-center gap-1 group w-max no-underline">
                Baca <span class="group-hover:translate-x-1 transition-transform">→</span>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 5. Peringatan & Advisory Keamanan -->
    <section id="advisory" class="bg-white w-full py-16 reveal-on-scroll">
      <div class="max-w-[1440px] mx-auto px-4 md:px-8 xl:px-12 flex flex-col gap-8">
        <div class="flex flex-col gap-2">
          <h2 class="font-grotesk font-bold text-2xl sm:text-3xl lg:text-[36px] text-[#111827]">
            Peringatan &amp; Advisory Keamanan
          </h2>
        </div>

        <!-- Table container with responsive horizontal scroll -->
        <div class="border border-gray-200 rounded-xl overflow-hidden shadow-sm flex flex-col w-full">
          <div class="w-full overflow-x-auto">
            <div class="min-w-[760px]">
              <!-- Table Header -->
              <div class="bg-[#f5f7fa] border-b border-gray-200 flex gap-4 md:gap-5 items-center p-4 md:p-5 font-geist font-bold text-sm text-black">
                <p class="w-[140px] pl-2 m-0">Tanggal</p>
                <p class="w-[140px] m-0">ID Advisory</p>
                <p class="flex-1 m-0">Judul Advisory</p>
                <p class="w-[120px] m-0">Tingkat</p>
                <p class="w-[100px] m-0">Status</p>
              </div>

              <!-- Table Body -->
              <div class="flex flex-col">
              <div v-if="!advisories.length" class="text-center text-gray-400 py-8 font-geist text-sm">
                Belum ada advisory.
              </div>
              <div
                v-for="adv in advisories"
                :key="adv.id"
                class="bg-white border-b border-gray-200 flex gap-4 md:gap-5 items-center p-4 md:p-5 relative min-w-[760px] hover:bg-gray-50 transition-colors"
              >
                <div class="absolute left-0 top-[15px] bottom-[15px] w-1 rounded-r-sm" :class="severityAccent(adv.severity)"></div>
                <p class="font-geist font-normal text-sm text-[#6b7280] w-[140px] pl-2 m-0">{{ adv.date }}</p>
                <p class="font-geist font-semibold text-sm text-[#1b4fd8] w-[140px] m-0">{{ adv.cveId || adv.advisoryId }}</p>
                <p class="flex-1 font-geist font-semibold text-sm text-[#111827] pr-4 m-0">
                  <router-link :to="`/advisory/${adv.id}`" class="text-inherit hover:text-blue-600 no-underline">
                    {{ adv.title }}
                  </router-link>
                </p>
                <div class="w-[120px] flex-shrink-0">
                  <span class="font-geist font-bold text-xs px-2.5 py-1 rounded inline-block" :class="severityBadge(adv.severity)">
                    {{ adv.severity }}
                  </span>
                </div>
                <p class="font-geist text-sm w-[100px] m-0" :class="statusStyle(adv.status)">
                  {{ adv.status }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="flex justify-center mt-4">
        <router-link to="/advisory" class="bg-[#1b4fd8] hover:bg-[#153eb2] text-white font-geist font-semibold text-sm px-6 py-3 rounded-md transition-colors shadow-md hover:shadow-lg inline-flex items-center no-underline">
          Lihat Semua Advisory →
        </router-link>
      </div>
    </div>
  </section>

    <!-- 6. Edukasi & Kesadaran Keamanan Siber -->
    <section id="edukasi" class="relative w-full bg-gradient-to-r from-[#0a1628] to-[#1a3a6b] py-20 text-white overflow-hidden reveal-on-scroll">
      <div class="absolute inset-0 bg-cover bg-center opacity-15 mix-blend-overlay pointer-events-none" :style="{ backgroundImage: `url(${getAssetUrl('assets/bg-map-DqRDIy-6.png')})` }"></div>
      <div class="max-w-[1440px] mx-auto px-4 md:px-8 xl:px-12 flex flex-col gap-10 relative z-10">
        <div class="text-center flex flex-col gap-3">
          <span class="text-blue-300 font-geist text-xs font-bold uppercase tracking-widest">LITERASI &amp; KEAMANAN SIBER</span>
          <h2 class="font-grotesk font-extrabold text-2xl sm:text-3xl lg:text-[40px] text-white tracking-tight m-0">
            Edukasi &amp; Kesadaran Keamanan Siber
          </h2>
          <p class="font-geist text-blue-100 text-sm sm:text-base max-w-[680px] mx-auto opacity-90 m-0">
            Panduan dan infografis praktis untuk meningkatkan kewaspadaan terhadap ancaman siber di lingkungan kerja dan publik.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div v-if="!education.length" class="col-span-3 text-center text-blue-200 py-8 font-geist">
            Belum ada konten edukasi.
          </div>
          <div
            v-for="edu in education"
            :key="edu.id"
            class="bg-white/95 backdrop-blur-sm p-6 rounded-2xl flex flex-col gap-4 shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 border border-white/20 h-full justify-between group"
          >
            <div class="flex flex-col gap-4">
              <div
                class="h-[150px] rounded-xl bg-cover bg-center bg-no-repeat w-full shadow-inner"
                :style="{ backgroundImage: `url(${edu.imageUrl})` }"
              ></div>
              <h3 class="font-grotesk font-bold text-lg sm:text-xl text-[#0a1628] leading-snug m-0 group-hover:text-blue-700 transition-colors">
                {{ edu.title }}
              </h3>
              <p class="font-geist font-normal text-sm text-[#4b5563] leading-relaxed m-0">
                {{ edu.description }}
              </p>
            </div>
            <a
              :href="edu.downloadUrl || '#'"
              target="_blank"
              rel="noopener noreferrer"
              class="font-geist font-bold text-sm text-[#1b4fd8] hover:text-blue-700 transition-colors flex items-center gap-1 group/btn mt-3 w-max no-underline"
            >
              Unduh Infografis <span class="group-hover/btn:translate-x-1 transition-transform">→</span>
            </a>
          </div>
        </div>
      </div>
    </section>

    <!-- 7. Infografis Kegiatan (Galeri Foto Asimetris) -->
    <section id="galeri" class="bg-white w-full py-16 reveal-on-scroll">
      <div class="max-w-[1440px] mx-auto px-4 md:px-8 xl:px-12 flex flex-col gap-8">
        <div class="text-center flex flex-col gap-2">
          <h2 class="font-grotesk font-bold text-2xl sm:text-3xl lg:text-[36px] text-[#111827]">
            Infografis Kegiatan
          </h2>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 h-auto lg:h-[400px]" v-if="gallery.length">
          <!-- Photo 1: Big left column -->
          <div v-if="gallery[0]" class="h-[250px] sm:h-[300px] lg:h-full rounded-lg overflow-hidden relative shadow-sm hover:shadow-md transition-shadow group">
            <img :src="gallery[0].imageUrl" :alt="gallery[0].caption || 'Kegiatan 1'" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
          </div>

          <!-- Photo 2 & 3: Middle stacked column -->
          <div class="flex flex-col gap-5 h-full" v-if="gallery[1] || gallery[2]">
            <div v-if="gallery[1]" class="h-[120px] sm:h-[140px] lg:flex-1 rounded-lg overflow-hidden relative shadow-sm hover:shadow-md transition-shadow group">
              <img :src="gallery[1].imageUrl" :alt="gallery[1].caption || 'Kegiatan 2'" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            </div>
            <div v-if="gallery[2]" class="h-[120px] sm:h-[140px] lg:flex-1 rounded-lg overflow-hidden relative shadow-sm hover:shadow-md transition-shadow group">
              <img :src="gallery[2].imageUrl" :alt="gallery[2].caption || 'Kegiatan 3'" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            </div>
          </div>

          <!-- Photo 4: Right column -->
          <div v-if="gallery[3]" class="h-[250px] sm:h-[300px] lg:h-full rounded-lg overflow-hidden relative shadow-sm hover:shadow-md transition-shadow group md:col-span-2 lg:col-span-1">
            <img :src="gallery[3].imageUrl" :alt="gallery[3].caption || 'Kegiatan 4'" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
          </div>
        </div>

        <div class="flex justify-center mt-4">
          <router-link to="/galeri" class="border-2 border-[#1b4fd8] text-[#1b4fd8] hover:bg-[#1b4fd8] hover:text-white font-geist font-semibold text-sm px-6 py-3 rounded-md transition-all inline-flex items-center no-underline">
            Lihat Galeri Lengkap →
          </router-link>
        </div>
      </div>
    </section>
  </q-page>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { fetchAbout, fetchArticles, getAdvisories, getEducation, fetchGallery } from '@/services/api';
import { getAssetUrl } from '@/utils/assets';

const about = ref<any>({ body: [] });
const articles = ref<any[]>([]);
const advisories = ref<any[]>([]);
const education = ref<any[]>([]);
const gallery = ref<any[]>([]);

const featuredArticle = computed(() => {
  return articles.value.find(a => a.type === 'featured') || articles.value[0] || null;
});

const standardArticles = computed(() => {
  return articles.value.filter(a => a.id !== featuredArticle.value?.id).slice(0, 2);
});

function categoryColor(cat: string) {
  if (cat === 'INSIDEN') return 'text-[#dc2626]';
  if (cat === 'KERJASAMA') return 'text-[#1b4fd8]';
  if (cat === 'WASPADA') return 'text-[#f59e0b]';
  return 'text-[#1b4fd8]';
}

function severityAccent(s: string) {
  if (s === 'Kritis') return 'bg-red-600';
  if (s === 'Tinggi') return 'bg-orange-500';
  if (s === 'Sedang') return 'bg-yellow-500';
  return 'bg-green-500';
}

function severityBadge(s: string) {
  if (s === 'Kritis') return 'text-red-700 bg-red-50';
  if (s === 'Tinggi') return 'text-orange-700 bg-orange-50';
  if (s === 'Sedang') return 'text-yellow-700 bg-yellow-50';
  return 'text-green-700 bg-green-50';
}

function statusStyle(st: string) {
  if (st === 'Aktif') return 'text-red-600 font-semibold';
  if (st === 'Dalam Penanganan') return 'text-orange-600 font-semibold';
  return 'text-gray-500';
}

onMounted(async () => {
  const [aboutRes, newsRes, advRes, eduRes, galRes] = await Promise.allSettled([
    fetchAbout(),
    fetchArticles(),
    getAdvisories(),
    getEducation(),
    fetchGallery()
  ]);

  if (aboutRes.status === 'fulfilled') about.value = aboutRes.value.data;
  if (newsRes.status === 'fulfilled') articles.value = newsRes.value.data;
  if (advRes.status === 'fulfilled') advisories.value = advRes.value.data;
  if (eduRes.status === 'fulfilled') education.value = eduRes.value.data;
  if (galRes.status === 'fulfilled') gallery.value = galRes.value.data;

  // Modern Intersection Observer for smooth reveal on scroll
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
      }
    });
  }, { threshold: 0.05 });

  document.querySelectorAll('.reveal-on-scroll').forEach((el, index) => {
    // Reveal elemen bagian atas seketika agar tidak memicu layout shift / jump scroll saat refresh
    if (index === 0) {
      el.classList.add('revealed');
    } else {
      observer.observe(el);
    }
  });

  // Pastikan posisi scroll berada di paling atas saat refresh
  if (typeof window !== 'undefined') {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
  }
});
</script>

<style scoped>
@keyframes marquee {
  0% { transform: translateX(100%); }
  100% { transform: translateX(-100%); }
}

.animate-marquee {
  animation: marquee 25s linear infinite;
}

.reveal-on-scroll {
  opacity: 0;
  transition: opacity 0.5s ease-out;
}

.reveal-on-scroll.revealed {
  opacity: 1;
}
</style>
