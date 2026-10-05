<template>
  <q-page>
    <div style="background:#0a1628; padding: 4rem 0 2rem;">
      <div class="container q-px-md">
        <h5 style="color:#60a5fa" class="q-my-none">Detail Galeri</h5>
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
