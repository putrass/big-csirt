<template>
  <div class="min-h-screen bg-white font-geist text-[#111827]">
    <!-- Hero Banner -->
    <section class="bg-gradient-to-r from-[#0a1628] to-[#1a3a6b] text-white py-16 px-4 md:px-8 xl:px-12">
      <div class="max-w-[1440px] mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
        <div>
          <span class="text-blue-300 text-xs font-bold uppercase tracking-widest font-geist">DOKUMENTASI KEGIATAN</span>
          <h1 class="font-grotesk font-extrabold text-3xl sm:text-4xl md:text-5xl text-white mt-2 leading-tight">
            Infografis &amp; Galeri Kegiatan
          </h1>
          <p class="font-geist text-blue-100 text-base sm:text-lg max-w-[680px] mt-3 opacity-90 leading-relaxed">
            Dokumentasi pelaksanaan simulasi drill test, bimbingan teknis, workshop keamanan, dan koordinasi penguatan infrastruktur siber BIG-CSIRT.
          </p>
        </div>
        <div class="w-28 h-28 md:w-36 md:h-36 flex-shrink-0">
          <img :src="getAssetUrl('assets/logo-csirt-D9xGTNl_.png')" alt="BIG-CSIRT Logo" class="w-full h-full object-contain filter drop-shadow-lg" />
        </div>
      </div>
    </section>

    <!-- Grid Galeri -->
    <div class="max-w-[1440px] mx-auto px-4 md:px-8 xl:px-12 py-16">
      <div v-if="loading" class="text-center py-20">
        <div class="inline-block animate-spin rounded-full h-10 w-10 border-4 border-blue-600 border-t-transparent"></div>
        <p class="mt-4 text-gray-500">Memuat galeri kegiatan...</p>
      </div>

      <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        <div
          v-for="item in gallery"
          :key="item.id"
          class="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all group"
        >
          <div class="h-60 overflow-hidden relative bg-gray-100">
            <img
              :src="item.imageUrl || item.thumbnail || item.image"
              :alt="item.caption || item.title"
              class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>
          <div class="p-6">
            <h3 class="font-grotesk font-bold text-lg text-[#0a1628] leading-snug m-0">
              {{ item.caption || item.title }}
            </h3>
            <p class="text-xs text-gray-400 mt-2 font-geist m-0">Badan Informasi Geospasial</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { fetchGallery } from '@/services/api';
import { getAssetUrl } from '@/utils/assets';

const gallery = ref<any[]>([]);
const loading = ref(true);

onMounted(async () => {
  try {
    const res = await fetchGallery();
    gallery.value = res.data;
  } catch (e) {
    console.error(e);
  } finally {
    loading.value = false;
  }
});
</script>
