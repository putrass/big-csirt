<template>
  <div class="min-h-screen bg-white font-geist text-[#111827]">
    <!-- Hero Banner -->
    <section class="bg-gradient-to-r from-[#0a1628] to-[#1a3a6b] text-white py-16 px-4 md:px-8 xl:px-12">
      <div class="max-w-[1440px] mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
        <div>
          <span class="text-blue-300 text-xs font-bold uppercase tracking-widest font-geist">PERINGATAN RESMI</span>
          <h1 class="font-grotesk font-extrabold text-3xl sm:text-4xl md:text-5xl text-white mt-2 leading-tight">
            Peringatan &amp; Advisory Keamanan
          </h1>
          <p class="font-geist text-blue-100 text-base sm:text-lg max-w-[680px] mt-3 opacity-90 leading-relaxed">
            Daftar peringatan kerentanan keamanan informasi dan advisory teknis yang telah dianalisis oleh tim BIG-CSIRT.
          </p>
        </div>
        <div class="w-28 h-28 md:w-36 md:h-36 flex-shrink-0">
          <img :src="getAssetUrl('assets/logo-csirt-D9xGTNl_.png')" alt="BIG-CSIRT Logo" class="w-full h-full object-contain filter drop-shadow-lg" />
        </div>
      </div>
    </section>

    <!-- Konten Tabel Advisory -->
    <div class="max-w-[1440px] mx-auto px-4 md:px-8 xl:px-12 py-12">
      <!-- Search & Status Filter -->
      <div class="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
        <div class="flex items-center gap-2 overflow-x-auto w-full sm:w-auto">
          <button
            v-for="st in ['Semua', 'Aktif', 'Dalam Penanganan', 'Selesai']"
            :key="st"
            @click="selectedStatus = st"
            :class="selectedStatus === st ? 'bg-[#1b4fd8] text-white font-bold' : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'"
            class="px-4 py-2 rounded-lg text-sm transition-all cursor-pointer whitespace-nowrap"
          >
            {{ st }}
          </button>
        </div>

        <div class="relative w-full sm:w-80">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Cari ID CVE atau judul..."
            class="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
          />
          <svg class="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
          </svg>
        </div>
      </div>

      <!-- Tabel -->
      <div class="border border-gray-200 rounded-xl overflow-hidden shadow-sm flex flex-col w-full">
        <div class="w-full overflow-x-auto">
          <div class="min-w-[760px]">
            <div class="bg-[#f5f7fa] border-b border-gray-200 flex gap-4 md:gap-5 items-center p-4 md:p-5 font-geist font-bold text-sm text-black">
              <p class="w-[140px] pl-2 m-0">Tanggal</p>
              <p class="w-[150px] m-0">ID Advisory / CVE</p>
              <p class="flex-1 m-0">Judul Advisory</p>
              <p class="w-[120px] m-0">Tingkat</p>
              <p class="w-[120px] m-0">Status</p>
            </div>

            <div v-if="loading" class="text-center py-12 text-gray-500">Memuat advisory...</div>
            <div v-else-if="!filteredAdvisories.length" class="text-center py-12 text-gray-400">
              Tidak ada advisory yang ditemukan.
            </div>
            <div v-else class="flex flex-col">
              <div
                v-for="adv in filteredAdvisories"
                :key="adv.id"
                class="bg-white border-b border-gray-200 flex gap-4 md:gap-5 items-center p-4 md:p-5 relative hover:bg-gray-50 transition-colors"
              >
                <div class="absolute left-0 top-[15px] bottom-[15px] w-1 rounded-r-sm" :class="severityAccent(adv.severity)"></div>
                <p class="font-geist font-normal text-sm text-[#6b7280] w-[140px] pl-2 m-0">{{ adv.date }}</p>
                <p class="font-geist font-semibold text-sm text-[#1b4fd8] w-[150px] m-0">{{ adv.cveId || adv.advisoryId }}</p>
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
                <p class="font-geist text-sm w-[120px] m-0" :class="statusStyle(adv.status)">
                  {{ adv.status }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { getAdvisories } from '@/services/api';
import { getAssetUrl } from '@/utils/assets';

const advisories = ref<any[]>([]);
const loading = ref(true);
const searchQuery = ref('');
const selectedStatus = ref('Semua');

const filteredAdvisories = computed(() => {
  return advisories.value.filter(a => {
    const matchStatus = selectedStatus.value === 'Semua' || a.status === selectedStatus.value;
    const matchSearch = !searchQuery.value ||
      a.title?.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      (a.cveId || a.advisoryId)?.toLowerCase().includes(searchQuery.value.toLowerCase());
    return matchStatus && matchSearch;
  });
});

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
  try {
    const res = await getAdvisories();
    advisories.value = res.data;
  } catch (e) {
    console.error(e);
  } finally {
    loading.value = false;
  }
});
</script>
