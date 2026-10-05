<template>
  <q-page>
    <div class="page-hero">
      <div class="container-x">
        <div class="section-eyebrow" style="color:#93c5fd">Advisory {{ item?.advisoryId }}</div>
        <h1 class="section-title" style="color:#fff;font-size:2.2rem;max-width:900px">{{ item?.title ?? '...' }}</h1>
        <div v-if="item" class="q-mt-md row items-center q-gutter-sm">
          <q-badge :color="sevColor(item.severity)">{{ item.severity }}</q-badge>
          <q-badge outline color="white">{{ item.status }}</q-badge>
          <span v-if="item.cve && item.cve !== '-'" style="font-family:monospace">{{ item.cve }}</span>
          <span class="text-grey-4">{{ item.date }}</span>
        </div>
      </div>
    </div>
    <div class="container-x q-py-xl" style="max-width:900px">
      <div v-if="item" class="rich-content" v-html="item.body" />
      <div v-else-if="!loading" class="text-grey-6">Advisory tidak ditemukan.</div>
      <q-btn flat no-caps color="primary" icon="arrow_back" label="Kembali ke daftar" to="/advisory" class="q-mt-xl" />
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { getAdvisory } from '@/services/api';

const route = useRoute();
const item = ref<any>(null);
const loading = ref(true);
const sevColor = (s: string) => s === 'Critical' ? 'negative' : s === 'High' ? 'deep-orange' : s === 'Medium' ? 'warning' : 'info';

onMounted(async () => {
  try { item.value = (await getAdvisory(route.params.id as string)).data; } catch { /* not found */ }
  loading.value = false;
});
</script>

