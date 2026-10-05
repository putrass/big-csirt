<template>
  <q-page>
    <!-- Hero -->
    <div style="background:#0a1628;padding:4rem 0 2.5rem">
      <div class="container q-mx-auto q-px-lg" style="max-width:1200px">
        <div class="text-caption text-weight-bold q-mb-sm" style="color:#60a5fa;letter-spacing:2px;text-transform:uppercase">
          {{ categoryLabel }}
        </div>
        <h1 class="text-white text-h3 text-weight-bold q-my-none">{{ typeText }}</h1>
        <p class="text-grey-4 q-mt-sm q-mb-none">{{ categoryDesc }}</p>
      </div>
    </div>

    <!-- Breadcrumb -->
    <div style="background:#f4f6f9;border-bottom:1px solid #e0e0e0">
      <div class="container q-mx-auto q-px-lg q-py-sm" style="max-width:1200px">
        <q-breadcrumbs class="text-caption">
          <q-breadcrumbs-el label="Home" to="/" />
          <q-breadcrumbs-el :label="typeText" />
        </q-breadcrumbs>
      </div>
    </div>

    <div class="container q-mx-auto q-px-lg q-py-xl" style="max-width:1200px">
      <!-- Search + count -->
      <div class="row items-center q-mb-lg">
        <q-input v-model="search" placeholder="Cari artikel..." filled rounded dense style="max-width:380px">
          <template #prepend><q-icon name="search" /></template>
        </q-input>
        <q-space />
        <div class="text-caption text-grey-6" v-if="!loading">{{ filtered.length }} artikel ditemukan</div>
      </div>

      <!-- Loading -->
      <div v-if="loading" class="text-center q-py-xl">
        <q-spinner color="primary" size="48px" />
      </div>

      <!-- Grid -->
      <div v-else-if="filtered.length" class="row q-col-gutter-lg">
        <div v-for="item in filtered" :key="item.id" class="col-12 col-sm-6 col-lg-4">
          <q-card flat bordered class="article-card cursor-pointer full-height"
            @click="$router.push(`/content/${item.slug}/detail`)">
            <div class="article-img-wrap">
              <img :src="item.imageUrl || item.image || '/assets/news-featured-DEHxhDd0.png'" class="article-img" @error="imgFallback" />
              <q-chip dense square absolute style="top:10px;left:10px"
                :style="`background:${typeColor(item.type)}dd;color:#fff;font-size:.7rem`">
                {{ item.type }}
              </q-chip>
            </div>
            <q-card-section>
              <div class="text-caption text-grey-5 q-mb-xs">{{ formatDate(item.date ?? item.createdAt) }}</div>
              <div class="text-body2 text-weight-bold article-title">{{ item.title }}</div>
              <div class="text-caption text-grey-6 q-mt-sm article-excerpt">{{ item.excerpt }}</div>
            </q-card-section>
            <q-card-actions class="q-pt-none q-px-md q-pb-md">
              <span class="text-caption text-grey-6"><q-icon name="person" size="14px" class="q-mr-xs" />{{ item.author }}</span>
              <q-space />
              <span class="text-caption text-weight-bold" style="color:#60a5fa">Baca →</span>
            </q-card-actions>
          </q-card>
        </div>
      </div>

      <!-- Empty -->
      <div v-else class="text-center q-py-xl">
        <q-icon name="article" size="64px" color="grey-4" />
        <div class="text-grey-5 q-mt-md">Tidak ada artikel yang ditemukan</div>
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';
import { fetchArticles } from '@/services/api';

const route = useRoute();
const articles = ref<any[]>([]);
const search = ref('');
const loading = ref(true);

const routeTypeMap: Record<string, string> = {
  'berita-komdigi':      'berita',
  'informasi-kerentanan':'kerentanan',
  'peringatan-ancaman':  'ancaman',
};
const typeText = computed(() => {
  const t = route.params.type as string;
  return t === 'berita-komdigi' ? 'Berita Komdigi - CSIRT'
       : t === 'informasi-kerentanan' ? 'Informasi Kerentanan'
       : t === 'peringatan-ancaman' ? 'Peringatan Ancaman'
       : 'Artikel';
});
const categoryLabel = computed(() => {
  const t = route.params.type as string;
  return t === 'berita-komdigi' ? 'BERITA' : t === 'informasi-kerentanan' ? 'KEAMANAN' : 'ANCAMAN';
});
const categoryDesc = computed(() => {
  const t = route.params.type as string;
  return t === 'berita-komdigi' ? 'Berita terkini seputar keamanan siber dan aktivitas KOMDIGI-CSIRT'
       : t === 'informasi-kerentanan' ? 'Informasi kerentanan keamanan siber yang perlu diwaspadai'
       : 'Peringatan dan informasi ancaman siber aktif';
});

const filtered = computed(() => {
  const q = search.value.toLowerCase();
  return articles.value.filter(a => !q || a.title.toLowerCase().includes(q) || a.excerpt?.toLowerCase().includes(q));
});

function typeColor(t: string) {
  return t === 'kerentanan' ? '#ff8c00' : t === 'ancaman' ? '#ff3b5c' : '#0093dd';
}
function formatDate(d: string) {
  if (!d) return '';
  return new Date(d).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
}
function imgFallback(e: Event) {
  (e.target as HTMLImageElement).src = 'https://placehold.co/800x450?text=No+Image';
}

async function load() {
  loading.value = true;
  const typeFilter = routeTypeMap[route.params.type as string];
  try {
    const res = await fetchArticles();
    articles.value = typeFilter ? res.data.filter((a: any) => a.type === typeFilter) : res.data;
  } catch {}
  loading.value = false;
}

onMounted(load);
watch(() => route.params.type, load);
</script>

<style scoped>
.article-card { transition: box-shadow .2s, transform .2s; border-radius: 12px; overflow: hidden; }
.article-card:hover { box-shadow: 0 8px 30px rgba(0,0,0,.12); transform: translateY(-4px); }
.article-img-wrap { height: 200px; overflow: hidden; position: relative; background: #eee; }
.article-img { width: 100%; height: 100%; object-fit: cover; transition: transform .3s; }
.article-card:hover .article-img { transform: scale(1.05); }
.article-title { display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; line-height: 1.4; }
.article-excerpt { display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
</style>
