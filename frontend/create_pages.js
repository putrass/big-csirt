const fs = require('fs');
const path = require('path');

const baseDir = 'd:/quasar/csirt/frontend/src';

const files = {
  'layouts/DashboardLayout.vue': `<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated style="background:#020b2d">
      <q-toolbar>
        <q-btn flat dense round icon="menu" aria-label="Menu" @click="leftDrawerOpen = !leftDrawerOpen" />
        <q-toolbar-title>Admin Dashboard</q-toolbar-title>
        <q-btn flat round icon="person" />
        <q-btn flat icon="logout" @click="handleLogout" />
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered style="background-color: #020b2d" class="text-white">
      <q-list>
        <q-item-label header class="text-white text-h6 text-center q-my-md">KOMDIGI CSIRT</q-item-label>
        
        <q-item clickable v-ripple to="/bug-hunter/dashboard" active-class="text-amber">
          <q-item-section avatar><q-icon name="home" /></q-item-section>
          <q-item-section>Dashboard</q-item-section>
        </q-item>
        <q-item clickable v-ripple to="/bug-hunter/carousel" active-class="text-amber">
          <q-item-section avatar><q-icon name="image" /></q-item-section>
          <q-item-section>Carousel</q-item-section>
        </q-item>
        <q-item clickable v-ripple to="/bug-hunter/articles" active-class="text-amber">
          <q-item-section avatar><q-icon name="article" /></q-item-section>
          <q-item-section>Artikel</q-item-section>
        </q-item>
        <q-item clickable v-ripple to="/bug-hunter/gallery" active-class="text-amber">
          <q-item-section avatar><q-icon name="photo" /></q-item-section>
          <q-item-section>Galeri</q-item-section>
        </q-item>
        <q-item clickable v-ripple to="/bug-hunter/pages" active-class="text-amber">
          <q-item-section avatar><q-icon name="pages" /></q-item-section>
          <q-item-section>Halaman Statis</q-item-section>
        </q-item>
        <q-item clickable v-ripple to="/bug-hunter/leaderboard" active-class="text-amber">
          <q-item-section avatar><q-icon name="leaderboard" /></q-item-section>
          <q-item-section>Leaderboard</q-item-section>
        </q-item>
        <q-item clickable v-ripple to="/bug-hunter/agenda" active-class="text-amber">
          <q-item-section avatar><q-icon name="event" /></q-item-section>
          <q-item-section>Agenda</q-item-section>
        </q-item>
        <q-item clickable v-ripple to="/bug-hunter/faq" active-class="text-amber">
          <q-item-section avatar><q-icon name="help" /></q-item-section>
          <q-item-section>FAQ</q-item-section>
        </q-item>
        <q-item clickable v-ripple to="/bug-hunter/about" active-class="text-amber">
          <q-item-section avatar><q-icon name="info" /></q-item-section>
          <q-item-section>Tentang Kami</q-item-section>
        </q-item>
        <q-item clickable v-ripple to="/bug-hunter/users" active-class="text-amber">
          <q-item-section avatar><q-icon name="people" /></q-item-section>
          <q-item-section>Users</q-item-section>
        </q-item>
        <q-item clickable v-ripple to="/bug-hunter/attack-stats" active-class="text-amber">
          <q-item-section avatar><q-icon name="security" /></q-item-section>
          <q-item-section>Attack Stats</q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/authStore';

const leftDrawerOpen = ref(false);
const authStore = useAuthStore();
const router = useRouter();

const handleLogout = () => {
  authStore.logout();
  router.push('/login');
};
</script>
<style scoped>
.text-amber { color: #e5aa17 !important; }
</style>
`,
  'pages/LoginPage.vue': `<template>
  <q-layout>
    <q-page-container>
      <q-page class="flex flex-center" style="background:#020b2d; min-height: 100vh;">
        <q-card style="width: 400px; max-width: 90vw;" class="q-pa-md">
          <q-card-section class="text-center">
            <h4 class="q-mt-none q-mb-md">Login</h4>
          </q-card-section>
          <q-card-section>
            <q-form @submit="onSubmit">
              <q-input v-model="email" label="Email" type="email" required class="q-mb-md" />
              <q-input v-model="password" label="Password" type="password" required class="q-mb-lg" />
              <q-btn type="submit" label="Login" class="full-width" style="background:#e5aa17; color: white;" rounded />
            </q-form>
          </q-card-section>
          <q-card-section class="text-center">
            <router-link to="/register">Don't have an account? Register</router-link>
          </q-card-section>
        </q-card>
      </q-page>
    </q-page-container>
  </q-layout>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import { useAuthStore } from '@/stores/authStore';
import { useRouter } from 'vue-router';
import { useQuasar } from 'quasar';
const email = ref('');
const password = ref('');
const authStore = useAuthStore();
const router = useRouter();
const $q = useQuasar();
const onSubmit = async () => {
  try {
    await authStore.login(email.value, password.value);
    router.push('/bug-hunter/dashboard');
  } catch (e) {
    $q.notify({ type: 'negative', message: 'Login failed' });
  }
};
</script>
`,
  'pages/RegisterPage.vue': `<template>
  <q-layout>
    <q-page-container>
      <q-page class="flex flex-center" style="background:#020b2d; min-height: 100vh;">
        <q-card style="width: 400px; max-width: 90vw;" class="q-pa-md">
          <q-card-section class="text-center">
            <h4 class="q-mt-none q-mb-md">Register</h4>
          </q-card-section>
          <q-card-section>
            <q-form @submit="onSubmit">
              <q-input v-model="name" label="Name" required class="q-mb-md" />
              <q-input v-model="email" label="Email" type="email" required class="q-mb-md" />
              <q-input v-model="password" label="Password" type="password" required class="q-mb-lg" />
              <q-btn type="submit" label="Register" class="full-width" style="background:#e5aa17; color: white;" rounded />
            </q-form>
          </q-card-section>
          <q-card-section class="text-center">
            <router-link to="/login">Already have an account? Login</router-link>
          </q-card-section>
        </q-card>
      </q-page>
    </q-page-container>
  </q-layout>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useQuasar } from 'quasar';
import * as api from '@/services/api';
const name = ref('');
const email = ref('');
const password = ref('');
const router = useRouter();
const $q = useQuasar();
const onSubmit = async () => {
  try {
    await api.register({ name: name.value, email: email.value, password: password.value });
    $q.notify({ type: 'positive', message: 'Registration successful' });
    router.push('/login');
  } catch (e) {
    $q.notify({ type: 'negative', message: 'Registration failed' });
  }
};
</script>
`,
  'pages/LeaderboardPage.vue': `<template>
  <q-page>
    <div style="background:#020b2d; padding: 4rem 0 2rem;">
      <div class="container q-px-md">
        <h5 style="color:#e5aa17" class="q-my-none">Peringkat</h5>
        <h1 class="text-white q-mt-sm q-mb-none text-h3">Leaderboard</h1>
      </div>
    </div>
    <div class="container q-py-xl q-px-md">
      <q-table
        title="Bug Hunters Leaderboard"
        :rows="rows"
        :columns="columns"
        row-key="id"
      />
    </div>
  </q-page>
</template>
<script setup lang="ts">
import { ref, onMounted } from 'vue';
import * as api from '@/services/api';
const rows = ref([]);
const columns = [
  { name: 'rank', label: 'Rank', field: 'rank', sortable: true },
  { name: 'name', label: 'Nama', field: 'name' },
  { name: 'points', label: 'Points', field: 'points' },
  { name: 'findings', label: 'Temuan', field: 'findings' },
  { name: 'badge', label: 'Badge', field: 'badge' },
];
onMounted(async () => {
  try {
    const res = await api.getLeaderboard();
    rows.value = res.data;
  } catch (e) {}
});
</script>
`,
  'pages/StaticPage.vue': `<template>
  <q-page>
    <div style="background:#020b2d; padding: 4rem 0 2rem;">
      <div class="container q-px-md">
        <h5 style="color:#e5aa17" class="q-my-none">Halaman</h5>
        <h1 class="text-white q-mt-sm q-mb-none text-h3">{{ pageData?.title }}</h1>
      </div>
    </div>
    <div class="container q-py-xl q-px-md">
      <div v-html="pageData?.body"></div>
    </div>
  </q-page>
</template>
<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';
import * as api from '@/services/api';
const route = useRoute();
const pageData = ref<any>(null);
const fetchPage = async () => {
  try {
    const res = await api.getPage(route.params.slug as string);
    pageData.value = res.data;
  } catch(e) {}
};
onMounted(fetchPage);
watch(() => route.params.slug, fetchPage);
</script>
`,
  'pages/ArticleList.vue': `<template>
  <q-page>
    <div style="background:#020b2d; padding: 4rem 0 2rem;">
      <div class="container q-px-md">
        <h5 style="color:#e5aa17" class="q-my-none">Artikel</h5>
        <h1 class="text-white q-mt-sm q-mb-none text-h3">{{ typeText }}</h1>
      </div>
    </div>
    <div class="container q-py-xl q-px-md">
      <q-input v-model="search" placeholder="Search..." class="q-mb-md" />
      <div class="row q-col-gutter-md">
        <div class="col-12 col-md-4" v-for="item in articles" :key="item.id">
          <q-card @click="$router.push(\`/content/\${item.slug}/detail\`)" class="cursor-pointer">
            <q-img :src="item.image" :ratio="16/9" />
            <q-card-section>
              <div class="text-h6">{{ item.title }}</div>
              <div class="text-caption text-grey">{{ item.date }}</div>
              <p>{{ item.excerpt }}</p>
            </q-card-section>
          </q-card>
        </div>
      </div>
    </div>
  </q-page>
</template>
<script setup lang="ts">
import { ref, onMounted, computed, watch } from 'vue';
import { useRoute } from 'vue-router';
import * as api from '@/services/api';
const route = useRoute();
const articles = ref<any[]>([]);
const search = ref('');
const typeText = computed(() => {
  if (route.params.type === 'berita') return 'Berita Komdigi';
  if (route.params.type === 'kerentanan') return 'Informasi Kerentanan';
  if (route.params.type === 'ancaman') return 'Peringatan Ancaman';
  return 'Artikel';
});
const fetchArticles = async () => {
  try {
    const res = await api.fetchArticles();
    articles.value = res.data.filter((a:any) => a.type === route.params.type);
  } catch(e){}
};
onMounted(fetchArticles);
watch(() => route.params.type, fetchArticles);
</script>
`,
  'pages/ArticleDetail.vue': `<template>
  <q-page>
    <div style="background:#020b2d; padding: 4rem 0 2rem;">
      <div class="container q-px-md">
        <h5 style="color:#e5aa17" class="q-my-none">Detail Artikel</h5>
        <h1 class="text-white q-mt-sm q-mb-none text-h3">{{ article?.title }}</h1>
      </div>
    </div>
    <div class="container q-py-xl q-px-md" v-if="article">
      <q-img :src="article.image" class="q-mb-lg" />
      <div class="text-caption text-grey q-mb-md">By {{ article.author }} on {{ article.date }}</div>
      <q-chip v-if="article.cvss" color="red" text-color="white">CVSS: {{ article.cvss }}</q-chip>
      <div v-html="article.body" class="q-mt-lg"></div>
    </div>
  </q-page>
</template>
<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import * as api from '@/services/api';
const route = useRoute();
const article = ref<any>(null);
onMounted(async () => {
  try {
    const res = await api.fetchArticles();
    article.value = res.data.find((a:any) => a.slug === route.params.slug);
  } catch(e){}
});
</script>
`,
  'pages/GaleriPage.vue': `<template>
  <q-page>
    <div style="background:#020b2d; padding: 4rem 0 2rem;">
      <div class="container q-px-md">
        <h5 style="color:#e5aa17" class="q-my-none">Galeri</h5>
        <h1 class="text-white q-mt-sm q-mb-none text-h3">Foto & Video</h1>
      </div>
    </div>
    <div class="container q-py-xl q-px-md">
      <q-tabs v-model="tab" class="text-primary q-mb-md">
        <q-tab name="foto" label="Foto" />
        <q-tab name="video" label="Video" />
      </q-tabs>
      <q-tab-panels v-model="tab" animated>
        <q-tab-panel name="foto">
          <div class="row q-col-gutter-md">
            <div class="col-12 col-md-4" v-for="item in photos" :key="item.id">
              <q-card @click="$router.push(\`/galeri/\${item.slug}/detail\`)" class="cursor-pointer">
                <q-img :src="item.image" :ratio="4/3" />
                <q-card-section>{{ item.title }}</q-card-section>
              </q-card>
            </div>
          </div>
        </q-tab-panel>
        <q-tab-panel name="video">
          <div class="row q-col-gutter-md">
            <div class="col-12 col-md-6" v-for="item in videos" :key="item.id">
              <q-video :src="item.videoUrl" style="height: 300px" />
              <div class="q-mt-sm text-h6">{{ item.title }}</div>
            </div>
          </div>
        </q-tab-panel>
      </q-tab-panels>
    </div>
  </q-page>
</template>
<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import * as api from '@/services/api';
const route = useRoute();
const router = useRouter();
const tab = ref((route.query.type as string) || 'foto');
const gallery = ref<any[]>([]);
const photos = computed(() => gallery.value.filter(g => g.type === 'foto'));
const videos = computed(() => gallery.value.filter(g => g.type === 'video'));

onMounted(async () => {
  try {
    const res = await api.fetchGallery();
    gallery.value = res.data;
  } catch(e) {}
});
</script>
`,
  'pages/GaleriDetail.vue': `<template>
  <q-page>
    <div style="background:#020b2d; padding: 4rem 0 2rem;">
      <div class="container q-px-md">
        <h5 style="color:#e5aa17" class="q-my-none">Detail Galeri</h5>
        <h1 class="text-white q-mt-sm q-mb-none text-h3">{{ item?.title }}</h1>
      </div>
    </div>
    <div class="container q-py-xl q-px-md" v-if="item">
      <q-img v-if="item.type === 'foto'" :src="item.image" />
      <q-video v-if="item.type === 'video'" :src="item.videoUrl" style="height: 500px" />
      <div class="q-mt-lg text-body1">{{ item.description }}</div>
    </div>
  </q-page>
</template>
<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import * as api from '@/services/api';
const route = useRoute();
const item = ref<any>(null);
onMounted(async () => {
  try {
    const res = await api.fetchGallery();
    item.value = res.data.find((g:any) => g.slug === route.params.slug);
  } catch(e){}
});
</script>
`,
  'pages/AgendaPage.vue': `<template>
  <q-page>
    <div style="background:#020b2d; padding: 4rem 0 2rem;">
      <div class="container q-px-md">
        <h5 style="color:#e5aa17" class="q-my-none">Agenda</h5>
        <h1 class="text-white q-mt-sm q-mb-none text-h3">Agenda Kegiatan</h1>
      </div>
    </div>
    <div class="container q-py-xl q-px-md">
      <q-timeline color="secondary">
        <q-timeline-entry
          v-for="item in agenda"
          :key="item.id"
          :title="item.title"
          :subtitle="item.date"
          :color="item.status === 'upcoming' ? 'green' : 'grey'"
        >
          <div>
            <strong>{{ item.location }}</strong><br/>
            {{ item.description }}
          </div>
        </q-timeline-entry>
      </q-timeline>
    </div>
  </q-page>
</template>
<script setup lang="ts">
import { ref, onMounted } from 'vue';
import * as api from '@/services/api';
const agenda = ref<any[]>([]);
onMounted(async () => {
  try {
    const res = await api.getAgenda();
    agenda.value = res.data;
  } catch(e){}
});
</script>
`,
  'pages/FaqPage.vue': `<template>
  <q-page>
    <div style="background:#020b2d; padding: 4rem 0 2rem;">
      <div class="container q-px-md">
        <h5 style="color:#e5aa17" class="q-my-none">Bantuan</h5>
        <h1 class="text-white q-mt-sm q-mb-none text-h3">FAQ</h1>
      </div>
    </div>
    <div class="container q-py-xl q-px-md">
      <q-input v-model="search" placeholder="Cari pertanyaan..." class="q-mb-lg" />
      <q-list bordered class="rounded-borders">
        <q-expansion-item
          v-for="item in filteredFaq"
          :key="item.id"
          group="faq"
          icon="help"
          :label="item.question"
          header-class="text-weight-bold"
        >
          <q-card>
            <q-card-section>{{ item.answer }}</q-card-section>
          </q-card>
        </q-expansion-item>
      </q-list>
    </div>
  </q-page>
</template>
<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import * as api from '@/services/api';
const faq = ref<any[]>([]);
const search = ref('');
const filteredFaq = computed(() => {
  return faq.value.filter(f => f.question.toLowerCase().includes(search.value.toLowerCase()));
});
onMounted(async () => {
  try {
    const res = await api.getFaq();
    faq.value = res.data;
  } catch(e){}
});
</script>
`,
  'pages/HubungiKamiPage.vue': `<template>
  <q-page>
    <div style="background:#020b2d; padding: 4rem 0 2rem;">
      <div class="container q-px-md">
        <h5 style="color:#e5aa17" class="q-my-none">Kontak</h5>
        <h1 class="text-white q-mt-sm q-mb-none text-h3">Hubungi Kami</h1>
      </div>
    </div>
    <div class="container q-py-xl q-px-md">
      <div class="row q-col-gutter-xl">
        <div class="col-12 col-md-6">
          <q-form @submit="onSubmit">
            <q-input v-model="form.name" label="Nama" required class="q-mb-md" />
            <q-input v-model="form.email" label="Email" type="email" required class="q-mb-md" />
            <q-input v-model="form.subject" label="Subjek" required class="q-mb-md" />
            <q-input v-model="form.message" label="Pesan" type="textarea" required class="q-mb-lg" />
            <q-btn type="submit" label="Kirim Pesan" style="background:#e5aa17; color:white" rounded />
          </q-form>
        </div>
        <div class="col-12 col-md-6">
          <q-card class="q-mb-md bg-grey-2" flat>
            <q-card-section>
              <div class="text-h6">Alamat</div>
              <p>Jl. Medan Merdeka Barat 9, Jakarta</p>
              <div class="text-h6">Telepon</div>
              <p>+62 XXX XXXX</p>
            </q-card-section>
          </q-card>
          <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.6111054366687!2d106.82079091476906!3d-6.182772595524317!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f42dfb94ecdb%3A0xe54199bd6507c89!2sKementerian%20Komunikasi%20dan%20Informatika%20RI!5e0!3m2!1sen!2sid!4v1680000000000!5m2!1sen!2sid" width="100%" height="250" style="border:0;" allowfullscreen="" loading="lazy"></iframe>
        </div>
      </div>
    </div>
  </q-page>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import { useQuasar } from 'quasar';
import * as api from '@/services/api';
const $q = useQuasar();
const form = ref({ name: '', email: '', subject: '', message: '' });
const onSubmit = async () => {
  try {
    await api.sendContact(form.value);
    $q.notify({ type: 'positive', message: 'Pesan terkirim' });
    form.value = { name: '', email: '', subject: '', message: '' };
  } catch(e) {
    $q.notify({ type: 'negative', message: 'Gagal mengirim pesan' });
  }
};
</script>
`,
  'pages/DokumenPage.vue': `<template>
  <q-page>
    <div style="background:#020b2d; padding: 4rem 0 2rem;">
      <div class="container q-px-md">
        <h5 style="color:#e5aa17" class="q-my-none">Dokumen</h5>
        <h1 class="text-white q-mt-sm q-mb-none text-h3">{{ route.params.type }}</h1>
      </div>
    </div>
    <div class="container q-py-xl q-px-md">
      <q-table :rows="[]" :columns="columns" row-key="id" />
    </div>
  </q-page>
</template>
<script setup lang="ts">
import { useRoute } from 'vue-router';
const route = useRoute();
const columns = [
  { name: 'name', label: 'Nama Dokumen', field: 'name' },
  { name: 'date', label: 'Tanggal', field: 'date' },
  { name: 'action', label: 'Aksi', field: 'action' }
];
</script>
`,
  'pages/dashboard/DashboardHome.vue': `<template>
  <q-page class="q-pa-md">
    <div class="row q-col-gutter-md">
      <div class="col-12 col-sm-3">
        <q-card class="bg-primary text-white">
          <q-card-section>
            <div class="text-h6">Total Artikel</div>
            <div class="text-h4">120</div>
          </q-card-section>
        </q-card>
      </div>
      <div class="col-12 col-sm-3">
        <q-card class="bg-secondary text-white">
          <q-card-section>
            <div class="text-h6">Total Galeri</div>
            <div class="text-h4">45</div>
          </q-card-section>
        </q-card>
      </div>
      <div class="col-12 col-sm-3">
        <q-card class="bg-accent text-white">
          <q-card-section>
            <div class="text-h6">Total Users</div>
            <div class="text-h4">350</div>
          </q-card-section>
        </q-card>
      </div>
      <div class="col-12 col-sm-3">
        <q-card class="bg-negative text-white">
          <q-card-section>
            <div class="text-h6">Live Attacks</div>
            <div class="text-h4">1,204</div>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>
<script setup lang="ts"></script>
`,
  'pages/dashboard/ManageCarousel.vue': `<template>
  <q-page class="q-pa-md">
    <div class="text-h5 q-mb-md">Manage Carousel</div>
    <q-btn label="Tambah" color="primary" class="q-mb-md" @click="openDialog()" />
    <q-table :rows="rows" :columns="columns" row-key="id">
      <template v-slot:body-cell-actions="props">
        <q-td :props="props">
          <q-btn icon="edit" size="sm" flat @click="openDialog(props.row)" />
          <q-btn icon="delete" size="sm" flat color="negative" @click="del(props.row.id)" />
        </q-td>
      </template>
    </q-table>
    <q-dialog v-model="dialog">
      <q-card style="min-width: 350px">
        <q-card-section>
          <div class="text-h6">{{ form.id ? 'Edit' : 'Tambah' }} Carousel</div>
        </q-card-section>
        <q-card-section>
          <q-input v-model="form.title" label="Title" autofocus />
          <q-input v-model="form.image" label="Image URL" />
          <q-input v-model="form.slug" label="Slug" />
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="Cancel" v-close-popup />
          <q-btn flat label="Simpan" color="primary" @click="save" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>
<script setup lang="ts">
import { ref, onMounted } from 'vue';
import * as api from '@/services/api';
import { useQuasar } from 'quasar';
const $q = useQuasar();
const rows = ref([]);
const columns = [
  { name: 'title', label: 'Title', field: 'title' },
  { name: 'image', label: 'Image', field: 'image' },
  { name: 'actions', label: 'Actions', field: 'actions' }
];
const dialog = ref(false);
const form = ref<any>({});
const load = async () => { try { const res = await api.fetchCarousel(); rows.value = res.data; } catch(e){} };
onMounted(load);
const openDialog = (row:any = {id:null, title:'', image:'', slug:''}) => { form.value = {...row}; dialog.value = true; };
const save = async () => {
  try {
    if (form.value.id) await api.updateCarousel(form.value.id, form.value);
    else await api.createCarousel(form.value);
    dialog.value = false;
    load();
  } catch(e){}
};
const del = async (id:any) => { try { await api.deleteCarousel(id); load(); } catch(e){} };
</script>
`,
  'pages/dashboard/ManageArticles.vue': `<template>
  <q-page class="q-pa-md">
    <div class="text-h5 q-mb-md">Manage Articles</div>
    <q-btn label="Tambah" color="primary" class="q-mb-md" @click="openDialog()" />
    <q-table :rows="rows" :columns="columns" row-key="id">
      <template v-slot:body-cell-actions="props">
        <q-td :props="props">
          <q-btn icon="edit" size="sm" flat @click="openDialog(props.row)" />
          <q-btn icon="delete" size="sm" flat color="negative" @click="del(props.row.id)" />
        </q-td>
      </template>
    </q-table>
    <q-dialog v-model="dialog">
      <q-card style="min-width: 500px">
        <q-card-section>
          <div class="text-h6">Artikel Form</div>
        </q-card-section>
        <q-card-section>
          <q-input v-model="form.title" label="Title" />
          <q-input v-model="form.slug" label="Slug" />
          <q-select v-model="form.type" :options="['berita', 'kerentanan', 'ancaman']" label="Type" />
          <q-input v-model="form.excerpt" label="Excerpt" type="textarea" />
          <q-input v-model="form.body" label="Body (HTML)" type="textarea" />
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="Cancel" v-close-popup />
          <q-btn flat label="Simpan" color="primary" @click="save" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>
<script setup lang="ts">
import { ref, onMounted } from 'vue';
import * as api from '@/services/api';
const rows = ref([]);
const columns = [
  { name: 'title', label: 'Title', field: 'title' },
  { name: 'type', label: 'Type', field: 'type' },
  { name: 'actions', label: 'Actions', field: 'actions' }
];
const dialog = ref(false);
const form = ref<any>({});
const load = async () => { try { const res = await api.fetchArticles(); rows.value = res.data; } catch(e){} };
onMounted(load);
const openDialog = (row:any = {}) => { form.value = {...row}; dialog.value = true; };
const save = async () => {
  try {
    if (form.value.id) await api.updateArticle(form.value.id, form.value);
    else await api.createArticle(form.value);
    dialog.value = false;
    load();
  } catch(e){}
};
const del = async (id:any) => { try { await api.deleteArticle(id); load(); } catch(e){} };
</script>
`,
  'pages/dashboard/ManageGallery.vue': `<template>
  <q-page class="q-pa-md">
    <div class="text-h5 q-mb-md">Manage Gallery</div>
    <q-btn label="Tambah" color="primary" class="q-mb-md" @click="openDialog()" />
    <q-table :rows="rows" :columns="columns" row-key="id">
      <template v-slot:body-cell-actions="props">
        <q-td :props="props">
          <q-btn icon="edit" size="sm" flat @click="openDialog(props.row)" />
          <q-btn icon="delete" size="sm" flat color="negative" @click="del(props.row.id)" />
        </q-td>
      </template>
    </q-table>
    <q-dialog v-model="dialog">
      <q-card style="min-width: 400px">
        <q-card-section>
          <div class="text-h6">Gallery Form</div>
        </q-card-section>
        <q-card-section>
          <q-input v-model="form.title" label="Title" />
          <q-select v-model="form.type" :options="['foto', 'video']" label="Type" />
          <q-input v-model="form.image" label="Image URL" v-if="form.type === 'foto'" />
          <q-input v-model="form.videoUrl" label="Video URL" v-if="form.type === 'video'" />
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="Cancel" v-close-popup />
          <q-btn flat label="Simpan" color="primary" @click="save" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>
<script setup lang="ts">
import { ref, onMounted } from 'vue';
import * as api from '@/services/api';
const rows = ref([]);
const columns = [
  { name: 'title', label: 'Title', field: 'title' },
  { name: 'type', label: 'Type', field: 'type' },
  { name: 'actions', label: 'Actions', field: 'actions' }
];
const dialog = ref(false);
const form = ref<any>({});
const load = async () => { try { const res = await api.fetchGallery(); rows.value = res.data; } catch(e){} };
onMounted(load);
const openDialog = (row:any = {}) => { form.value = {...row}; dialog.value = true; };
const save = async () => {
  try {
    if (form.value.id) await api.updateGallery(form.value.id, form.value);
    else await api.createGallery(form.value);
    dialog.value = false;
    load();
  } catch(e){}
};
const del = async (id:any) => { try { await api.deleteGallery(id); load(); } catch(e){} };
</script>
`,
  'pages/dashboard/ManagePages.vue': `<template>
  <q-page class="q-pa-md">
    <div class="text-h5 q-mb-md">Manage Static Pages</div>
    <q-list bordered separator>
      <q-item v-for="page in ['profil', 'visi-misi', 'struktur']" :key="page" clickable @click="editPage(page)">
        <q-item-section>{{ page }}</q-item-section>
        <q-item-section side><q-icon name="edit" /></q-item-section>
      </q-item>
    </q-list>
    <q-dialog v-model="dialog">
      <q-card style="min-width: 500px">
        <q-card-section><div class="text-h6">Edit {{ currentSlug }}</div></q-card-section>
        <q-card-section>
          <q-input v-model="form.title" label="Title" />
          <q-input v-model="form.body" label="Body HTML" type="textarea" />
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="Cancel" v-close-popup />
          <q-btn flat label="Simpan" color="primary" @click="save" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import * as api from '@/services/api';
const dialog = ref(false);
const currentSlug = ref('');
const form = ref<any>({});
const editPage = async (slug:string) => {
  currentSlug.value = slug;
  try {
    const res = await api.getPage(slug);
    form.value = res.data || { title:'', body:'' };
  } catch(e) { form.value = { title:'', body:'' }; }
  dialog.value = true;
};
const save = async () => {
  try {
    await api.updatePage(currentSlug.value, form.value);
    dialog.value = false;
  } catch(e){}
};
</script>
`,
  'pages/dashboard/ManageLeaderboard.vue': `<template>
  <q-page class="q-pa-md">
    <div class="text-h5 q-mb-md">Manage Leaderboard</div>
    <q-btn label="Tambah" color="primary" class="q-mb-md" @click="openDialog()" />
    <q-table :rows="rows" :columns="columns" row-key="id">
      <template v-slot:body-cell-actions="props">
        <q-td :props="props">
          <q-btn icon="edit" size="sm" flat @click="openDialog(props.row)" />
          <q-btn icon="delete" size="sm" flat color="negative" @click="del(props.row.id)" />
        </q-td>
      </template>
    </q-table>
    <q-dialog v-model="dialog">
      <q-card style="min-width: 400px">
        <q-card-section><div class="text-h6">Leaderboard Form</div></q-card-section>
        <q-card-section>
          <q-input v-model.number="form.rank" label="Rank" type="number" />
          <q-input v-model="form.name" label="Name" />
          <q-input v-model.number="form.points" label="Points" type="number" />
          <q-input v-model.number="form.findings" label="Findings" type="number" />
          <q-input v-model="form.badge" label="Badge" />
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="Cancel" v-close-popup />
          <q-btn flat label="Simpan" color="primary" @click="save" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>
<script setup lang="ts">
import { ref, onMounted } from 'vue';
import * as api from '@/services/api';
const rows = ref([]);
const columns = [
  { name: 'rank', label: 'Rank', field: 'rank' },
  { name: 'name', label: 'Name', field: 'name' },
  { name: 'actions', label: 'Actions', field: 'actions' }
];
const dialog = ref(false);
const form = ref<any>({});
const load = async () => { try { const res = await api.getLeaderboard(); rows.value = res.data; } catch(e){} };
onMounted(load);
const openDialog = (row:any = {}) => { form.value = {...row}; dialog.value = true; };
const save = async () => {
  try {
    if (form.value.id) await api.updateLeaderboard(form.value.id, form.value);
    else await api.createLeaderboard(form.value);
    dialog.value = false;
    load();
  } catch(e){}
};
const del = async (id:any) => { try { await api.deleteLeaderboard(id); load(); } catch(e){} };
</script>
`,
  'pages/dashboard/ManageAgenda.vue': `<template>
  <q-page class="q-pa-md">
    <div class="text-h5 q-mb-md">Manage Agenda</div>
    <q-btn label="Tambah" color="primary" class="q-mb-md" @click="openDialog()" />
    <q-table :rows="rows" :columns="columns" row-key="id">
      <template v-slot:body-cell-actions="props">
        <q-td :props="props">
          <q-btn icon="edit" size="sm" flat @click="openDialog(props.row)" />
          <q-btn icon="delete" size="sm" flat color="negative" @click="del(props.row.id)" />
        </q-td>
      </template>
    </q-table>
    <q-dialog v-model="dialog">
      <q-card style="min-width: 400px">
        <q-card-section><div class="text-h6">Agenda Form</div></q-card-section>
        <q-card-section>
          <q-input v-model="form.title" label="Title" />
          <q-input v-model="form.date" label="Date" />
          <q-input v-model="form.location" label="Location" />
          <q-input v-model="form.description" label="Description" type="textarea" />
          <q-select v-model="form.status" :options="['upcoming', 'past']" label="Status" />
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="Cancel" v-close-popup />
          <q-btn flat label="Simpan" color="primary" @click="save" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>
<script setup lang="ts">
import { ref, onMounted } from 'vue';
import * as api from '@/services/api';
const rows = ref([]);
const columns = [
  { name: 'title', label: 'Title', field: 'title' },
  { name: 'date', label: 'Date', field: 'date' },
  { name: 'actions', label: 'Actions', field: 'actions' }
];
const dialog = ref(false);
const form = ref<any>({});
const load = async () => { try { const res = await api.getAgenda(); rows.value = res.data; } catch(e){} };
onMounted(load);
const openDialog = (row:any = {}) => { form.value = {...row}; dialog.value = true; };
const save = async () => {
  try {
    if (form.value.id) await api.updateAgenda(form.value.id, form.value);
    else await api.createAgenda(form.value);
    dialog.value = false;
    load();
  } catch(e){}
};
const del = async (id:any) => { try { await api.deleteAgenda(id); load(); } catch(e){} };
</script>
`,
  'pages/dashboard/ManageFaq.vue': `<template>
  <q-page class="q-pa-md">
    <div class="text-h5 q-mb-md">Manage FAQ</div>
    <q-btn label="Tambah" color="primary" class="q-mb-md" @click="openDialog()" />
    <q-table :rows="rows" :columns="columns" row-key="id">
      <template v-slot:body-cell-actions="props">
        <q-td :props="props">
          <q-btn icon="edit" size="sm" flat @click="openDialog(props.row)" />
          <q-btn icon="delete" size="sm" flat color="negative" @click="del(props.row.id)" />
        </q-td>
      </template>
    </q-table>
    <q-dialog v-model="dialog">
      <q-card style="min-width: 500px">
        <q-card-section><div class="text-h6">FAQ Form</div></q-card-section>
        <q-card-section>
          <q-input v-model="form.question" label="Question" type="textarea" />
          <q-input v-model="form.answer" label="Answer" type="textarea" />
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="Cancel" v-close-popup />
          <q-btn flat label="Simpan" color="primary" @click="save" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>
<script setup lang="ts">
import { ref, onMounted } from 'vue';
import * as api from '@/services/api';
const rows = ref([]);
const columns = [
  { name: 'question', label: 'Question', field: 'question' },
  { name: 'actions', label: 'Actions', field: 'actions' }
];
const dialog = ref(false);
const form = ref<any>({});
const load = async () => { try { const res = await api.getFaq(); rows.value = res.data; } catch(e){} };
onMounted(load);
const openDialog = (row:any = {}) => { form.value = {...row}; dialog.value = true; };
const save = async () => {
  try {
    if (form.value.id) await api.updateFaq(form.value.id, form.value);
    else await api.createFaq(form.value);
    dialog.value = false;
    load();
  } catch(e){}
};
const del = async (id:any) => { try { await api.deleteFaq(id); load(); } catch(e){} };
</script>
`,
  'pages/dashboard/ManageAbout.vue': `<template>
  <q-page class="q-pa-md">
    <div class="text-h5 q-mb-md">Manage About</div>
    <q-card>
      <q-card-section>
        <q-input v-model="form.title" label="Title" />
        <q-input v-model="form.subtitle" label="Subtitle" />
        <q-input v-model="form.logoSrc" label="Logo URL" />
        <div class="q-mt-md">Paragraphs</div>
        <q-input v-for="(p, i) in form.paragraphs" :key="i" v-model="form.paragraphs[i]" type="textarea" label="Paragraph" class="q-mb-sm" />
        <q-btn label="Add Paragraph" flat @click="form.paragraphs.push('')" />
      </q-card-section>
      <q-card-actions>
        <q-btn label="Simpan" color="primary" @click="save" />
      </q-card-actions>
    </q-card>
  </q-page>
</template>
<script setup lang="ts">
import { ref, onMounted } from 'vue';
import * as api from '@/services/api';
import { useQuasar } from 'quasar';
const $q = useQuasar();
const form = ref<any>({ title:'', subtitle:'', logoSrc:'', paragraphs:[] });
const load = async () => { try { const res = await api.fetchAbout(); form.value = res.data; if(!form.value.paragraphs) form.value.paragraphs = []; } catch(e){} };
onMounted(load);
const save = async () => {
  try {
    await api.updateAbout(form.value);
    $q.notify({ type: 'positive', message: 'Saved' });
  } catch(e){}
};
</script>
`,
  'pages/dashboard/ManageUsers.vue': `<template>
  <q-page class="q-pa-md">
    <div class="text-h5 q-mb-md">Manage Users</div>
    <q-table :rows="rows" :columns="columns" row-key="id">
      <template v-slot:body-cell-role="props">
        <q-td :props="props">
          <q-select v-model="props.row.role" :options="['admin', 'user']" dense @update:model-value="updateRole(props.row)" />
        </q-td>
      </template>
      <template v-slot:body-cell-actions="props">
        <q-td :props="props">
          <q-btn icon="delete" size="sm" flat color="negative" @click="del(props.row.id)" />
        </q-td>
      </template>
    </q-table>
  </q-page>
</template>
<script setup lang="ts">
import { ref, onMounted } from 'vue';
import * as api from '@/services/api';
const rows = ref([]);
const columns = [
  { name: 'name', label: 'Name', field: 'name' },
  { name: 'email', label: 'Email', field: 'email' },
  { name: 'role', label: 'Role', field: 'role' },
  { name: 'actions', label: 'Actions', field: 'actions' }
];
const load = async () => { try { const res = await api.getUsers(); rows.value = res.data; } catch(e){} };
onMounted(load);
const updateRole = async (row:any) => {
  try { await api.updateUser(row.id, { role: row.role }); } catch(e){}
};
const del = async (id:any) => { try { await api.deleteUser(id); load(); } catch(e){} };
</script>
`,
  'pages/dashboard/AttackStatsPage.vue': `<template>
  <q-page class="q-pa-md">
    <div class="text-h5 q-mb-md">Attack Statistics</div>
    <div class="text-h3 q-mb-lg text-negative">{{ stats.totalAttacks || 0 }} Total Attacks</div>
    <div class="row q-col-gutter-md">
      <div class="col-12 col-md-6">
        <q-card>
          <q-card-section class="text-h6">Top Countries</q-card-section>
          <q-card-section>
             <q-list bordered separator>
               <q-item v-for="c in stats.topCountries" :key="c.country">
                 <q-item-section>{{ c.country }}</q-item-section>
                 <q-item-section side>{{ c.count }}</q-item-section>
               </q-item>
             </q-list>
          </q-card-section>
        </q-card>
      </div>
      <div class="col-12 col-md-6">
        <q-card>
          <q-card-section class="text-h6">Top IPs</q-card-section>
          <q-card-section>
             <q-list bordered separator>
               <q-item v-for="ip in stats.topIps" :key="ip.ip">
                 <q-item-section>{{ ip.ip }}</q-item-section>
                 <q-item-section side>{{ ip.count }}</q-item-section>
               </q-item>
             </q-list>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>
<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import * as api from '@/services/api';
const stats = ref<any>({});
let interval: any;
const load = async () => { try { const res = await api.fetchAttackStats(); stats.value = res.data; } catch(e){} };
onMounted(() => {
  load();
  interval = setInterval(load, 30000);
});
onUnmounted(() => { clearInterval(interval); });
</script>
`
};

Object.entries(files).forEach(([filepath, content]) => {
  const fullPath = path.join(baseDir, filepath);
  const dir = path.dirname(fullPath);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(fullPath, content);
  console.log('Created ' + fullPath);
});
