<template>
  <q-page class="q-pa-lg">
    <div class="row items-center q-mb-lg">
      <div>
        <div class="text-h5 text-weight-bold">Manajemen Edukasi &amp; Kesadaran</div>
        <div class="text-caption text-grey-6">Kelola kartu infografis edukasi siber yang tampil di beranda dan halaman /edukasi.</div>
      </div>
      <q-space />
      <q-btn unelevated icon="add" label="Tambah Edukasi" color="primary" no-caps @click="openDialog()" class="font-bold rounded-lg" />
    </div>

    <div class="row q-col-gutter-lg">
      <div v-for="item in rows" :key="item.id" class="col-12 col-sm-6 col-md-4">
        <q-card flat bordered class="rounded-xl overflow-hidden hover:shadow-md transition-shadow">
          <div class="h-44 bg-gray-100 relative">
            <img :src="item.imageUrl || item.image" class="w-full h-full object-cover" />
          </div>
          <q-card-section class="q-py-md">
            <div class="font-grotesk font-bold text-base text-gray-900 leading-snug">{{ item.title }}</div>
            <div class="font-geist text-xs text-gray-500 mt-1 line-clamp-2">{{ item.description }}</div>
          </q-card-section>
          <q-card-actions class="px-4 pb-4 pt-0">
            <q-btn flat dense size="sm" icon="edit" color="primary" label="Edit" no-caps @click="openDialog(item)" />
            <q-btn flat dense size="sm" icon="delete" color="negative" label="Hapus" no-caps @click="confirmDel(item)" />
            <q-space />
            <a v-if="item.downloadUrl && item.downloadUrl !== '#'" :href="item.downloadUrl" target="_blank" class="text-xs text-blue-600 font-semibold no-underline">
              Unduh →
            </a>
          </q-card-actions>
        </q-card>
      </div>
      <div v-if="!rows.length && !loading" class="col-12 text-grey-5 text-center q-py-xl">Belum ada konten edukasi</div>
    </div>

    <!-- Dialog Create / Edit -->
    <q-dialog v-model="dialog" persistent>
      <q-card style="min-width:540px;max-width:92vw" class="rounded-xl">
        <q-bar class="bg-[#0a1628] text-white h-12">
          <q-icon name="school" /><div class="q-ml-sm font-bold">{{ form.id ? 'Edit Edukasi' : 'Tambah Edukasi Baru' }}</div>
          <q-space /><q-btn dense flat icon="close" v-close-popup />
        </q-bar>
        <q-card-section class="p-6">
          <q-input v-model="form.title" label="Judul Infografis *" filled dense class="q-mb-md" />
          <q-input v-model="form.description" label="Deskripsi Singkat *" filled dense type="textarea" :rows="3" class="q-mb-md" />
          <q-input v-model="form.imageUrl" label="URL Gambar Infografis *" filled dense class="q-mb-md"
            hint="Contoh: /assets/edu-phishing-DCOW8l44.png atau URL eksternal" />
          <div v-if="form.imageUrl" class="mb-4">
            <img :src="form.imageUrl" class="rounded-lg h-32 object-cover border border-gray-200" />
          </div>
          <q-input v-model="form.downloadUrl" label="URL Unduh Dokumen / PDF (Opsional)" filled dense hint="Link Google Drive atau file download" />
        </q-card-section>
        <q-card-actions align="right" class="p-4 bg-gray-50 border-t border-gray-200">
          <q-btn flat label="Batal" v-close-popup no-caps />
          <q-btn unelevated color="primary" :loading="saving" label="Simpan Edukasi" no-caps @click="save" class="px-5 font-bold" />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <!-- Dialog Delete -->
    <q-dialog v-model="delDialog">
      <q-card style="min-width:320px" class="rounded-xl">
        <q-card-section class="p-6">Hapus konten edukasi "<b>{{ delTarget?.title }}</b>"?</q-card-section>
        <q-card-actions align="right" class="p-4 bg-gray-50">
          <q-btn flat label="Batal" v-close-popup no-caps />
          <q-btn flat label="Hapus" color="negative" no-caps @click="doDelete" class="font-bold" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useQuasar } from 'quasar';
import { getEducation, createEducation, updateEducation, deleteEducation } from '@/services/api';

const $q = useQuasar();
const rows = ref<any[]>([]);
const loading = ref(false);
const saving = ref(false);
const dialog = ref(false);
const delDialog = ref(false);
const delTarget = ref<any>(null);
const form = ref<any>({});

async function load() {
  loading.value = true;
  try {
    const res = await getEducation();
    rows.value = res.data;
  } catch { /* ignore */ }
  loading.value = false;
}
onMounted(load);

function openDialog(row: any = null) {
  if (row) {
    form.value = {
      ...row,
      imageUrl: row.imageUrl || row.image || ''
    };
  } else {
    form.value = {
      title: '',
      description: '',
      imageUrl: '/assets/edu-phishing-DCOW8l44.png',
      downloadUrl: 'https://drive.google.com'
    };
  }
  dialog.value = true;
}

function confirmDel(row: any) { delTarget.value = row; delDialog.value = true; }

async function save() {
  if (!form.value.title || !form.value.description) {
    $q.notify({ type: 'negative', message: 'Judul dan deskripsi wajib diisi' });
    return;
  }
  saving.value = true;
  try {
    const payload = {
      ...form.value,
      image: form.value.imageUrl
    };
    if (form.value.id) await updateEducation(form.value.id, payload);
    else await createEducation(payload);
    $q.notify({ type: 'positive', message: 'Konten edukasi berhasil disimpan' });
    dialog.value = false;
    load();
  } catch {
    $q.notify({ type: 'negative', message: 'Gagal menyimpan' });
  }
  saving.value = false;
}

async function doDelete() {
  try {
    await deleteEducation(delTarget.value.id);
    $q.notify({ type: 'positive', message: 'Konten edukasi dihapus' });
    delDialog.value = false;
    load();
  } catch {
    $q.notify({ type: 'negative', message: 'Gagal menghapus' });
  }
}
</script>
