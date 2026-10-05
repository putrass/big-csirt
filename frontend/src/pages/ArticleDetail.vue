<template>
  <q-page>
    <!-- Hero header -->
    <div style="background:#0a1628;padding:4rem 0 2.5rem">
      <div class="container q-mx-auto q-px-lg" style="max-width:1200px">
        <div class="text-caption text-weight-bold q-mb-sm" style="color:#60a5fa;letter-spacing:2px;text-transform:uppercase">Detail Artikel</div>
        <h1 class="text-white text-h4 text-weight-bold q-my-none" style="max-width:800px;line-height:1.3">
          {{ article?.title ?? '...' }}
        </h1>
        <div v-if="article" class="row items-center no-wrap q-mt-md q-gutter-md">
          <q-chip dense square :style="`background:${typeColor(article.type)}22;color:${typeColor(article.type)};border:1px solid ${typeColor(article.type)}44`">
            {{ article.type }}
          </q-chip>
          <span class="text-grey-5 text-caption">{{ article.author }}</span>
          <span class="text-grey-6 text-caption">·</span>
          <span class="text-grey-5 text-caption">{{ formatDate(article.date) }}</span>
          <q-chip v-if="article.cvss" dense square style="background:#ff3b5c22;color:#ff3b5c;border:1px solid #ff3b5c44;font-family:monospace">
            CVSS {{ article.cvss }}
          </q-chip>
        </div>
      </div>
    </div>

    <!-- Breadcrumb -->
    <div style="background:#f4f6f9;border-bottom:1px solid #e0e0e0">
      <div class="container q-mx-auto q-px-lg q-py-sm" style="max-width:1200px">
        <q-breadcrumbs class="text-caption">
          <q-breadcrumbs-el label="Home" to="/" />
          <q-breadcrumbs-el :label="typeLabel" :to="`/content/${article?.type === 'berita' ? 'berita-komdigi' : article?.type === 'ancaman' ? 'peringatan-ancaman' : 'informasi-kerentanan'}`" />
          <q-breadcrumbs-el :label="article?.title ?? ''" />
        </q-breadcrumbs>
      </div>
    </div>

    <!-- Content -->
    <div class="container q-mx-auto q-px-lg q-py-xl" style="max-width:1200px">
      <div class="row q-col-gutter-xl">

        <!-- Article body -->
        <div class="col-12 col-md-8">
          <q-card v-if="loading" flat bordered class="text-center q-py-xl">
            <q-spinner color="primary" size="48px" />
          </q-card>

          <div v-else-if="article">
            <!-- Hero image -->
            <div class="rounded-xl overflow-hidden shadow-sm border border-gray-100 mb-8 bg-gray-50 max-h-[460px] flex items-center justify-center">
              <img
                :src="article.imageUrl || article.image || '/assets/news-featured-DEHxhDd0.png'"
                :alt="article.title"
                class="w-full h-full max-h-[460px] object-cover"
                @error="($event.target as HTMLImageElement).src = '/assets/news-featured-DEHxhDd0.png'"
              />
            </div>

            <!-- Body HTML -->
            <div class="article-body" v-html="article.body" />

            <!-- Share section -->
            <q-separator class="q-my-xl" />
            <div class="row items-center q-gutter-sm">
              <span class="text-grey-6 text-caption text-weight-bold">Bagikan:</span>
              <q-btn round unelevated size="sm" icon="fab fa-twitter"
                style="background:#1da1f233;color:#1da1f2" />
              <q-btn round unelevated size="sm" icon="fab fa-facebook"
                style="background:#1877f233;color:#1877f2" />
              <q-btn round unelevated size="sm" icon="fab fa-whatsapp"
                style="background:#25d36633;color:#25d366" />
            </div>
          </div>

          <div v-else class="text-center q-py-xl text-grey-5">
            <q-icon name="article" size="64px" /><br>Artikel tidak ditemukan
          </div>
        </div>

        <!-- Sidebar -->
        <div class="col-12 col-md-4">
          <!-- Related articles -->
          <q-card flat bordered class="q-mb-lg">
            <q-card-section class="q-py-sm" style="border-bottom:3px solid #60a5fa">
              <div class="text-subtitle2 text-weight-bold">Artikel Terkait</div>
            </q-card-section>
            <q-list separator>
              <q-item v-for="rel in related" :key="rel.id"
                clickable v-ripple :to="`/content/${rel.slug}/detail`" class="q-py-sm">
                <q-item-section avatar>
                  <q-avatar square size="56px" style="border-radius:6px;overflow:hidden">
                    <img :src="rel.image" style="object-fit:cover;width:100%;height:100%" />
                  </q-avatar>
                </q-item-section>
                <q-item-section>
                  <q-item-label class="text-caption text-weight-medium ellipsis-2-lines">{{ rel.title }}</q-item-label>
                  <q-item-label caption class="text-grey-5">{{ formatDate(rel.date) }}</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-card>

          <!-- Lapor Temuan CTA -->
          <q-card flat style="background:#0a1628;border-radius:12px">
            <q-card-section class="text-center q-pa-xl">
              <q-icon name="security" size="48px" color="yellow-8" />
              <div class="text-white text-subtitle1 text-weight-bold q-mt-md q-mb-sm">Temukan Kerentanan?</div>
              <div class="text-grey-4 text-caption q-mb-lg">Laporkan temuan Anda dan dapatkan reward dari program bug bounty kami.</div>
              <q-btn unelevated rounded label="Lapor Temuan!" to="/bug-hunter/dashboard"
                color="primary" no-caps />
            </q-card-section>
          </q-card>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';
import { fetchArticles } from '@/services/api';

const route = useRoute();
const loading = ref(true);
const article = ref<any>(null);
const allArticles = ref<any[]>([]);

const related = computed(() =>
  allArticles.value.filter(a => a.slug !== route.params.slug).slice(0, 4)
);
const typeLabel = computed(() => {
  const t = article.value?.type;
  return t === 'berita' ? 'Berita' : t === 'ancaman' ? 'Peringatan Ancaman' : 'Informasi Kerentanan';
});

function typeColor(t: string) {
  return t === 'kerentanan' ? '#ff8c00' : t === 'ancaman' ? '#ff3b5c' : '#0093dd';
}
function formatDate(d: string) {
  if (!d) return '';
  return new Date(d).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
}

async function load() {
  loading.value = true;
  try {
    const res = await fetchArticles();
    allArticles.value = res.data;
    article.value = res.data.find((a: any) => a.slug === route.params.slug) ?? null;
  } catch {}
  loading.value = false;
}

onMounted(load);
watch(() => route.params.slug, load);
</script>

<style scoped>
.article-body { line-height: 1.9; font-size: .95rem; color: #333; }
.article-body :deep(h2) { font-size: 1.4rem; font-weight: 700; margin: 1.5rem 0 .75rem; color: #0a1628; }
.article-body :deep(h3) { font-size: 1.15rem; font-weight: 700; margin: 1.2rem 0 .5rem; color: #0a1628; }
.article-body :deep(p)  { margin-bottom: 1rem; }
.article-body :deep(ul), .article-body :deep(ol) { padding-left: 1.5rem; margin-bottom: 1rem; }
.article-body :deep(li) { margin-bottom: .4rem; }
.article-body :deep(pre) { background: #f4f6f9; padding: 1rem; border-radius: 8px; overflow-x: auto; font-size: .85rem; }
.article-body :deep(strong) { color: #0a1628; }
.ellipsis-2-lines { display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
</style>
