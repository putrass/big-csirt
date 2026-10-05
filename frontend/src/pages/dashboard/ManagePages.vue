<template>
  <q-page class="q-pa-lg">
    <div class="row items-center q-mb-lg">
      <div class="text-h5 text-weight-bold">Halaman Statis</div>
    </div>

    <div class="row q-col-gutter-md">
      <!-- Page list -->
      <div class="col-12 col-md-4">
        <q-card flat bordered>
          <q-card-section class="q-py-sm">
            <div class="text-subtitle2 text-weight-bold text-grey-7">Pilih Halaman</div>
          </q-card-section>
          <q-separator />
          <q-list separator>
            <q-item v-for="p in pageList" :key="p.slug" clickable v-ripple
              :active="selected === p.slug" active-class="bg-amber-1"
              @click="selectPage(p.slug)" class="q-py-sm">
              <q-item-section avatar>
                <q-icon name="description" :color="selected === p.slug ? 'amber-9' : 'grey-5'" />
              </q-item-section>
              <q-item-section>
                <q-item-label class="text-body2">{{ p.label }}</q-item-label>
                <q-item-label caption class="text-grey-6">/page/{{ p.slug }}</q-item-label>
              </q-item-section>
              <q-item-section side v-if="selected === p.slug">
                <q-icon name="chevron_right" color="amber-9" />
              </q-item-section>
            </q-item>
          </q-list>
        </q-card>
      </div>

      <!-- Editor -->
      <div class="col-12 col-md-8">
        <q-card flat bordered v-if="selected">
          <q-card-section class="row items-center">
            <div>
              <div class="text-subtitle1 text-weight-bold">{{ currentPage?.label }}</div>
              <div class="text-caption text-grey-6">/page/{{ selected }}</div>
            </div>
            <q-space />
            <q-btn unelevated :loading="saving" label="Simpan Perubahan" icon="save"
              color="primary" @click="save" no-caps />
          </q-card-section>
          <q-separator />
          <q-card-section v-if="loading" class="text-center q-py-xl">
            <q-spinner color="primary" size="40px" />
          </q-card-section>
          <q-card-section v-else>
            <q-input v-model="form.title" label="Judul Halaman" filled dense class="q-mb-md" />
            <div class="text-caption text-grey-7 q-mb-xs">Konten</div>
            <RichEditor v-model="form.body" />
          </q-card-section>
        </q-card>

        <div v-else class="column items-center justify-center" style="height:300px;color:#bbb">
          <q-icon name="description" size="64px" />
          <div class="q-mt-md text-body2">Pilih halaman di sebelah kiri</div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useQuasar } from 'quasar';
import RichEditor from '@/components/RichEditor.vue';
import { getPage, updatePage } from '@/services/api';

const $q = useQuasar();
const selected = ref('');
const loading = ref(false);
const saving = ref(false);
const form = ref<any>({ title: '', body: '' });

const pageList = [
  { slug: 'visi-dan-misi',       label: 'Visi dan Misi' },
  { slug: 'tugas-dan-fungsi',    label: 'Tugas dan Fungsi' },
  { slug: 'layanan',             label: 'Layanan' },
  { slug: 'capaian-dan-prestasi',label: 'Capaian dan Prestasi' },
  { slug: 'pgp-key',             label: 'PGP Key' },
  { slug: 'tentang-kami',        label: 'Tentang Kami' },
  { slug: 'kebijakan-privasi',   label: 'Kebijakan Privasi' },
  { slug: 'syarat-dan-ketentuan',label: 'Syarat dan Ketentuan' },
];

const currentPage = computed(() => pageList.find(p => p.slug === selected.value));

async function selectPage(slug: string) {
  selected.value = slug;
  loading.value = true;
  try {
    const res = await getPage(slug);
    form.value = { ...res.data };
  } catch { form.value = { title: '', body: '' }; }
  loading.value = false;
}

async function save() {
  saving.value = true;
  try {
    await updatePage(selected.value, form.value);
    $q.notify({ type: 'positive', message: 'Halaman berhasil disimpan' });
  } catch { $q.notify({ type: 'negative', message: 'Gagal menyimpan' }); }
  saving.value = false;
}
</script>
