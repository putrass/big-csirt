<template>
  <div class="min-h-screen bg-[#f8fafc] font-geist text-[#111827]">
    <!-- Hero Banner -->
    <section class="bg-gradient-to-r from-[#0a1628] to-[#1a3a6b] text-white py-16 px-4 md:px-8 xl:px-12">
      <div class="max-w-[1440px] mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
        <div>
          <span class="text-blue-300 text-xs font-bold uppercase tracking-widest font-geist">PUBLIKASI &amp; ARTIKEL</span>
          <h1 class="font-grotesk font-extrabold text-3xl sm:text-4xl md:text-5xl text-white mt-2 leading-tight">
            Berita Keamanan Siber
          </h1>
          <p class="font-geist text-blue-100 text-base sm:text-lg max-w-[680px] mt-3 opacity-90 leading-relaxed">
            Informasi terkini mengenai insiden, kolaborasi, dan kewaspadaan keamanan informasi di lingkungan Badan Informasi Geospasial.
          </p>
        </div>
        <div class="w-28 h-28 md:w-36 md:h-36 flex-shrink-0">
          <img :src="getAssetUrl('assets/logo-csirt-D9xGTNl_.png')" alt="BIG-CSIRT Logo" class="w-full h-full object-contain filter drop-shadow-lg" />
        </div>
      </div>
    </section>

    <!-- Filter & Pencarian -->
    <div class="max-w-[1440px] mx-auto px-4 md:px-8 xl:px-12 py-12">
      <div class="flex flex-col md:flex-row items-center justify-between gap-4 mb-10">
        <!-- Tab Kategori -->
        <div class="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0">
          <button
            v-for="cat in categories"
            :key="cat"
            @click="selectedCategory = cat"
            :class="selectedCategory === cat ? 'bg-[#1b4fd8] text-white font-bold shadow-sm' : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'"
            class="px-4 py-2 rounded-lg text-sm font-geist transition-all whitespace-nowrap cursor-pointer"
          >
            {{ cat }}
          </button>
        </div>

        <!-- Input Search -->
        <div class="relative w-full md:w-80">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Cari judul berita..."
            class="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 font-geist shadow-sm"
          />
          <svg class="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
          </svg>
        </div>
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="text-center py-20">
        <div class="inline-block animate-spin rounded-full h-10 w-10 border-4 border-blue-600 border-t-transparent"></div>
        <p class="mt-4 text-gray-500 text-sm">Memuat berita...</p>
      </div>

      <!-- Daftar Berita (Grid) -->
      <div v-else-if="filteredNews.length" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div
          v-for="item in filteredNews"
          :key="item.id"
          class="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-lg transition-all flex flex-col justify-between group"
        >
          <div>
            <div class="h-48 overflow-hidden relative bg-gray-100">
              <img
                :src="item.imageUrl || item.image || getAssetUrl('assets/news-featured-DEHxhDd0.png')"
                :alt="item.title"
                class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <span
                class="absolute top-3 left-3 text-[10px] font-bold px-2.5 py-1 rounded-md uppercase tracking-wider text-white"
                :class="badgeColor(item.category)"
              >
                {{ item.category || 'BERITA' }}
              </span>
            </div>
            <div class="p-6 flex flex-col gap-3">
              <span class="text-xs text-gray-400 font-geist">{{ item.date }}</span>
              <h3 class="font-grotesk font-bold text-lg sm:text-xl text-[#0a1628] group-hover:text-blue-600 transition-colors leading-snug m-0">
                {{ item.title }}
              </h3>
              <p class="text-sm text-gray-600 leading-relaxed font-geist line-clamp-3 m-0">
                {{ item.description || item.excerpt }}
              </p>
            </div>
          </div>

          <div class="px-6 pb-6 pt-2">
            <router-link
              :to="`/content/${item.slug || item.id}/detail`"
              class="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-600 hover:text-blue-800 transition-colors no-underline group-hover:translate-x-1"
            >
              Baca Selengkapnya <span>→</span>
            </router-link>
          </div>
        </div>
      </div>

      <!-- Kosong -->
      <div v-else class="text-center py-20 bg-white rounded-2xl border border-gray-100 p-8">
        <p class="text-gray-500 text-base m-0">Tidak ada berita yang sesuai dengan pencarian Anda.</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { fetchArticles } from '@/services/api';
import { getAssetUrl } from '@/utils/assets';

const news = ref<any[]>([]);
const loading = ref(true);
const searchQuery = ref('');
const selectedCategory = ref('Semua');
const categories = ['Semua', 'INSIDEN', 'KERJASAMA', 'WASPADA'];

const filteredNews = computed(() => {
  return news.value.filter(item => {
    const matchCat = selectedCategory.value === 'Semua' || (item.category && item.category.toUpperCase() === selectedCategory.value);
    const matchSearch = !searchQuery.value || item.title?.toLowerCase().includes(searchQuery.value.toLowerCase()) || (item.description || item.excerpt)?.toLowerCase().includes(searchQuery.value.toLowerCase());
    return matchCat && matchSearch;
  });
});

function badgeColor(cat: string) {
  if (cat === 'INSIDEN') return 'bg-[#dc2626]';
  if (cat === 'KERJASAMA') return 'bg-[#1b4fd8]';
  if (cat === 'WASPADA') return 'bg-[#f59e0b]';
  return 'bg-blue-600';
}

onMounted(async () => {
  try {
    const res = await fetchArticles();
    news.value = res.data;
  } catch (e) {
    console.error(e);
  } finally {
    loading.value = false;
  }
});
</script>
