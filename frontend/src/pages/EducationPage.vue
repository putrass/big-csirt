<template>
  <div class="min-h-screen bg-[#eef4ff] font-geist text-[#111827]">
    <!-- Hero Banner -->
    <section class="bg-gradient-to-r from-[#0a1628] to-[#1a3a6b] text-white py-16 px-4 md:px-8 xl:px-12">
      <div class="max-w-[1440px] mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
        <div>
          <span class="text-blue-300 text-xs font-bold uppercase tracking-widest font-geist">LITERASI &amp; EDUKASI</span>
          <h1 class="font-grotesk font-extrabold text-3xl sm:text-4xl md:text-5xl text-white mt-2 leading-tight">
            Edukasi &amp; Kesadaran Keamanan Siber
          </h1>
          <p class="font-geist text-blue-100 text-base sm:text-lg max-w-[680px] mt-3 opacity-90 leading-relaxed">
            Tingkatkan pemahaman Anda mengenai berbagai modus kejahatan siber, pencegahan phishing, penanganan malware, dan perlindungan data pribadi.
          </p>
        </div>
        <div class="w-28 h-28 md:w-36 md:h-36 flex-shrink-0">
          <img src="/assets/logo-csirt-D9xGTNl_.png" alt="BIG-CSIRT Logo" class="w-full h-full object-contain filter drop-shadow-lg" />
        </div>
      </div>
    </section>

    <!-- Grid Edukasi -->
    <div class="max-w-[1440px] mx-auto px-4 md:px-8 xl:px-12 py-16">
      <div v-if="loading" class="text-center py-20">
        <div class="inline-block animate-spin rounded-full h-10 w-10 border-4 border-blue-600 border-t-transparent"></div>
        <p class="mt-4 text-gray-500">Memuat konten edukasi...</p>
      </div>

      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div
          v-for="edu in education"
          :key="edu.id"
          class="bg-white p-6 rounded-2xl flex flex-col gap-4 shadow-sm hover:shadow-lg transition-all border border-gray-100 justify-between group"
        >
          <div class="flex flex-col gap-4">
            <div
              class="h-44 rounded-xl bg-cover bg-center bg-no-repeat w-full shadow-inner"
              :style="{ backgroundImage: `url(${edu.imageUrl})` }"
            ></div>
            <h3 class="font-grotesk font-bold text-lg sm:text-xl text-[#0a1628] leading-tight group-hover:text-blue-600 transition-colors m-0">
              {{ edu.title }}
            </h3>
            <p class="font-geist font-normal text-sm text-[#6b7280] leading-relaxed m-0">
              {{ edu.description }}
            </p>
          </div>

          <div class="pt-4 border-t border-gray-50">
            <a
              :href="edu.downloadUrl || '#'"
              target="_blank"
              rel="noopener noreferrer"
              class="font-geist font-bold text-sm text-[#1b4fd8] hover:text-blue-800 transition-colors flex items-center gap-1.5 group/btn no-underline"
            >
              Unduh Infografis
              <span class="group-hover/btn:translate-x-1 transition-transform">→</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { getEducation } from '@/services/api';

const education = ref<any[]>([]);
const loading = ref(true);

onMounted(async () => {
  try {
    const res = await getEducation();
    education.value = res.data;
  } catch (e) {
    console.error(e);
  } finally {
    loading.value = false;
  }
});
</script>
