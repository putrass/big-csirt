<template>
  <q-page>
    <!-- Hero -->
    <div style="background:#0a1628;padding:4rem 0 2.5rem">
      <div class="container q-mx-auto q-px-lg" style="max-width:1200px">
        <div class="text-caption text-weight-bold q-mb-sm" style="color:#60a5fa;letter-spacing:2px;text-transform:uppercase">
          Profil
        </div>
        <h1 class="text-white text-h3 text-weight-bold q-my-none">{{ page.title }}</h1>
      </div>
    </div>

    <!-- Breadcrumb -->
    <div style="background:#f4f6f9;border-bottom:1px solid #e0e0e0">
      <div class="container q-mx-auto q-px-lg q-py-sm" style="max-width:1200px">
        <q-breadcrumbs class="text-caption">
          <q-breadcrumbs-el label="Home" to="/" />
          <q-breadcrumbs-el :label="page.title" />
        </q-breadcrumbs>
      </div>
    </div>

    <!-- Content -->
    <div class="container q-mx-auto q-px-lg q-py-xl" style="max-width:1200px">
      <div class="row q-col-gutter-xl">
        <div class="col-12 col-md-8">
          <q-card flat bordered v-if="loading" class="text-center q-py-xl">
            <q-spinner color="primary" size="48px" />
          </q-card>
          <div v-else class="static-body" v-html="page.body" />
        </div>

        <!-- Sidebar navigation -->
        <div class="col-12 col-md-4">
          <q-card flat bordered>
            <q-card-section class="q-py-sm" style="border-bottom:3px solid #60a5fa">
              <div class="text-subtitle2 text-weight-bold">Profil CSIRT</div>
            </q-card-section>
            <q-list separator>
              <q-item v-for="p in profilPages" :key="p.slug" clickable v-ripple
                :to="`/page/${p.slug}`" :active="route.params.slug === p.slug" active-class="text-amber-9 bg-amber-1">
                <q-item-section avatar>
                  <q-icon name="chevron_right" />
                </q-item-section>
                <q-item-section class="text-body2">{{ p.label }}</q-item-section>
              </q-item>
            </q-list>
          </q-card>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';
import { getPage } from '@/services/api';

const route = useRoute();
const loading = ref(true);
const page = ref<any>({ title: '', body: '' });

const profilPages = [
  { slug: 'visi-dan-misi',        label: 'Visi dan Misi' },
  { slug: 'tugas-dan-fungsi',     label: 'Tugas dan Fungsi' },
  { slug: 'layanan',              label: 'Layanan' },
  { slug: 'capaian-dan-prestasi', label: 'Capaian dan Prestasi' },
  { slug: 'pgp-key',              label: 'PGP Key' },
  { slug: 'tentang-kami',         label: 'Tentang Kami' },
];

async function load() {
  loading.value = true;
  try {
    const res = await getPage(route.params.slug as string);
    page.value = res.data;
  } catch { page.value = { title: 'Halaman tidak ditemukan', body: '<p>Halaman ini tidak tersedia.</p>' }; }
  loading.value = false;
}

onMounted(load);
watch(() => route.params.slug, load);
</script>

<style scoped>
.static-body { line-height: 1.85; font-size: .95rem; color: #333; }
.static-body :deep(h2) { font-size: 1.4rem; font-weight: 700; margin: 1.5rem 0 .75rem; color: #0a1628; padding-bottom: .4rem; border-bottom: 2px solid #60a5fa; }
.static-body :deep(h3) { font-size: 1.15rem; font-weight: 700; margin: 1.2rem 0 .5rem; color: #0a1628; }
.static-body :deep(p)  { margin-bottom: 1rem; }
.static-body :deep(ul), .static-body :deep(ol) { padding-left: 1.5rem; margin-bottom: 1rem; }
.static-body :deep(li) { margin-bottom: .4rem; }
.static-body :deep(pre) { background: #f4f6f9; padding: 1rem; border-radius: 8px; font-size: .82rem; overflow-x: auto; }
</style>
