<template>
  <q-page class="q-pa-lg">
    <div class="row items-center q-mb-lg">
      <div>
        <div class="text-h5 text-weight-bold">Manajemen Foto Kegiatan</div>
        <div class="text-caption text-grey-6">Kelola foto kegiatan yang tampil pada galeri asimetris beranda dan halaman /galeri.</div>
      </div>
      <q-space />
      <q-btn unelevated icon="add" label="Tambah Foto Kegiatan" @click="openDialog()"
        color="primary" no-caps class="font-bold rounded-lg" />
    </div>

    <!-- Grid View Foto Kegiatan -->
    <div class="row q-col-gutter-lg">
      <div v-for="item in rows" :key="item.id" class="col-12 col-sm-6 col-md-3">
        <q-card flat bordered class="rounded-xl overflow-hidden hover:shadow-md transition-shadow">
          <div class="h-44 bg-gray-100 relative">
            <img :src="item.imageUrl || item.thumbnail || item.image" class="w-full h-full object-cover" />
          </div>
          <q-card-section class="q-py-sm">
            <div class="font-grotesk font-bold text-sm text-gray-900 leading-snug ellipsis">{{ item.caption || item.title }}</div>
          </q-card-section>
          <q-card-actions class="px-4 pb-3 pt-0">
            <q-btn flat dense size="sm" icon="edit" color="primary" @click="openDialog(item)" no-caps label="Edit" />
            <q-btn flat dense size="sm" icon="delete" color="negative" @click="confirmDel(item)" no-caps label="Hapus" />
          </q-card-actions>
        </q-card>
      </div>
      <div v-if="!rows.length && !loading" class="col-12 text-grey-5 text-center q-py-xl">
        Belum ada foto kegiatan.
      </div>
    </div>

    <!-- Dialog form -->
    <q-dialog v-model="dialog" persistent>
      <q-card style="min-width:480px;max-width:92vw" class="rounded-xl">
        <q-bar class="bg-[#0a1628] text-white h-12">
          <q-icon name="photo_library" />
          <div class="q-ml-sm font-bold">{{ form.id ? 'Edit Foto Kegiatan' : 'Tambah Foto Kegiatan' }}</div>
          <q-space /><q-btn dense flat icon="close" v-close-popup />
        </q-bar>
        <q-card-section class="p-6">
          <q-input v-model="form.caption" label="Keterangan / Judul Kegiatan *" filled dense class="q-mb-md" />
          <q-input v-model="form.imageUrl" label="URL Foto Kegiatan *" filled dense class="q-mb-md"
            hint="Contoh: /assets/gallery-1-Dw-hkkPo.png atau URL web" />
          <div v-if="form.imageUrl" class="mb-4">
            <img :src="form.imageUrl" class="rounded-lg h-36 object-cover border border-gray-200" />
          </div>
        </q-card-section>
        <q-card-actions align="right" class="p-4 bg-gray-50 border-t border-gray-200">
          <q-btn flat label="Batal" v-close-popup no-caps />
          <q-btn unelevated color="primary" :loading="saving" label="Simpan Foto" no-caps @click="save" class="px-5 font-bold" />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <!-- Dialog Delete -->
    <q-dialog v-model="delDialog">
      <q-card style="min-width:320px" class="rounded-xl">
        <q-card-section class="p-6">Hapus foto "<b>{{ delTarget?.caption || delTarget?.title }}</b>"?</q-card-section>
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
import { fetchGallery, createGallery, updateGallery, deleteGallery } from '@/services/api';

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
    const res = await fetchGallery();
    rows.value = res.data;
  } catch { /* ignore */ }
  loading.value = false;
}
onMounted(load);

function openDialog(row: any = null) {
  if (row) {
    form.value = {
      ...row,
      caption: row.caption || row.title || '',
      imageUrl: row.imageUrl || row.thumbnail || row.image || ''
    };
  } else {
    form.value = {
      caption: '',
      imageUrl: '/assets/gallery-1-Dw-hkkPo.png'
    };
  }
  dialog.value = true;
}

function confirmDel(row: any) { delTarget.value = row; delDialog.value = true; }

async function save() {
  if (!form.value.caption || !form.value.imageUrl) {
    $q.notify({ type: 'negative', message: 'Keterangan dan URL foto wajib diisi' });
    return;
  }
  saving.value = true;
  try {
    const payload = {
      ...form.value,
      title: form.value.caption,
      thumbnail: form.value.imageUrl,
      image: form.value.imageUrl
    };
    if (form.value.id) await updateGallery(form.value.id, payload);
    else await createGallery(payload);
    $q.notify({ type: 'positive', message: 'Foto kegiatan disimpan' });
    dialog.value = false;
    load();
  } catch {
    $q.notify({ type: 'negative', message: 'Gagal menyimpan foto' });
  }
  saving.value = false;
}

async function doDelete() {
  try {
    await deleteGallery(delTarget.value.id);
    $q.notify({ type: 'positive', message: 'Foto kegiatan dihapus' });
    delDialog.value = false;
    load();
  } catch {
    $q.notify({ type: 'negative', message: 'Gagal menghapus' });
  }
}
</script>
