<template>
  <q-page class="q-pa-lg">
    <div class="text-h5 text-weight-bold">Selamat datang, {{ auth.user?.name ?? 'Admin' }}</div>
    <div class="text-grey-6 text-caption q-mb-lg">Kelola seluruh konten website BIG-CSIRT dari sini.</div>

    <div class="row q-col-gutter-md q-mb-xl">
      <div v-for="s in stats" :key="s.label" class="col-6 col-md-3">
        <q-card flat bordered>
          <q-card-section class="row items-center no-wrap">
            <div>
              <div class="text-caption text-grey-6">{{ s.label }}</div>
              <div class="text-h4 text-weight-bold text-primary">{{ s.value }}</div>
            </div>
            <q-space />
            <q-icon :name="s.icon" size="36px" color="primary" style="opacity:.25" />
          </q-card-section>
        </q-card>
      </div>
    </div>

    <div class="text-subtitle1 text-weight-bold q-mb-sm">Aksi Cepat</div>
    <div class="row q-gutter-sm">
      <q-btn v-for="q in quick" :key="q.to" unelevated no-caps color="primary" :icon="q.icon" :label="q.label" :to="q.to" />
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { fetchArticles, getAdvisories, getEducation, fetchGallery } from '@/services/api';
import { useAuthStore } from '@/stores/authStore';

const auth = useAuthStore();
const stats = ref([
  { label: 'Berita', value: 0, icon: 'article' },
  { label: 'Advisory', value: 0, icon: 'shield' },
  { label: 'Edukasi', value: 0, icon: 'school' },
  { label: 'Foto Kegiatan', value: 0, icon: 'photo_library' },
]);
const quick = [
  { label: 'Tambah Berita', icon: 'add', to: '/bug-hunter/articles' },
  { label: 'Tambah Advisory', icon: 'add', to: '/bug-hunter/advisories' },
  { label: 'Tambah Edukasi', icon: 'add', to: '/bug-hunter/education' },
  { label: 'Tambah Foto', icon: 'add', to: '/bug-hunter/gallery' },
];

onMounted(async () => {
  const r = await Promise.allSettled([fetchArticles(), getAdvisories(), getEducation(), fetchGallery()]);
  r.forEach((x, i) => {
    if (x.status === 'fulfilled') stats.value[i]!.value = x.value.data.length;
  });
});
</script>

