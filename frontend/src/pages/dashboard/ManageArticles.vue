<template>
  <q-page class="q-pa-lg">
    <div class="row items-center q-mb-lg">
      <div>
        <div class="text-h5 text-weight-bold">Manajemen Berita</div>
        <div class="text-caption text-grey-6">Kelola berita keamanan siber yang tampil di halaman depan dan halaman berita.</div>
      </div>
      <q-space />
      <q-btn unelevated icon="add" label="Tambah Berita" @click="openDialog()"
        color="primary" class="rounded-lg font-bold" no-caps />
    </div>

    <!-- Filter Tab -->
    <q-tabs v-model="tab" dense align="left" class="q-mb-md text-primary"
      active-color="primary" indicator-color="primary">
      <q-tab name="all" label="Semua" />
      <q-tab name="INSIDEN" label="Insiden" />
      <q-tab name="KERJASAMA" label="Kerjasama" />
      <q-tab name="WASPADA" label="Waspada" />
    </q-tabs>

    <q-card flat bordered class="rounded-xl overflow-hidden">
      <q-table :rows="filteredRows" :columns="columns" row-key="id"
        :loading="loading" rows-per-page-label="Per halaman"
        no-data-label="Belum ada berita">
        <template #body-cell-image="props">
          <q-td :props="props">
            <q-avatar square size="54px" style="border-radius:8px;overflow:hidden">
              <img :src="props.row.imageUrl || props.row.image || '/assets/news-featured-DEHxhDd0.png'" style="object-fit:cover;width:100%;height:100%" />
            </q-avatar>
          </q-td>
        </template>
        <template #body-cell-category="props">
          <q-td :props="props">
            <q-badge :color="categoryBadgeColor(props.value)" class="q-px-sm font-bold">{{ props.value || 'BERITA' }}</q-badge>
          </q-td>
        </template>
        <template #body-cell-type="props">
          <q-td :props="props">
            <q-badge v-if="props.value === 'featured'" color="red-10" label="★ Berita Utama" />
            <q-badge v-else color="grey-6" label="Standar" />
          </q-td>
        </template>
        <template #body-cell-actions="props">
          <q-td :props="props" style="white-space:nowrap">
            <q-btn flat dense icon="edit" size="sm" color="primary" @click="openDialog(props.row)" />
            <q-btn flat dense icon="delete" size="sm" color="negative" @click="confirmDelete(props.row)" />
          </q-td>
        </template>
      </q-table>
    </q-card>

    <!-- Create/Edit Dialog -->
    <q-dialog v-model="dialog" persistent>
      <q-card style="width: 850px; max-width: 95vw; max-height: 90vh;" class="rounded-2xl flex flex-col overflow-hidden shadow-2xl">
        <q-bar class="bg-[#0a1628] text-white h-12 flex-shrink-0">
          <q-icon name="article" />
          <div class="q-ml-sm font-bold">{{ form.id ? 'Edit Berita' : 'Tambah Berita Baru' }}</div>
          <q-space />
          <q-btn dense flat icon="close" v-close-popup />
        </q-bar>

        <q-card-section class="scroll p-6 flex-1">
          <div class="row q-col-gutter-md">
            <div class="col-12 col-md-8">
              <q-input v-model="form.title" label="Judul Berita *" filled dense @update:model-value="autoSlug" />
            </div>
            <div class="col-12 col-md-4">
              <q-input v-model="form.slug" label="Slug URL" filled dense hint="Auto-generate dari judul" />
            </div>

            <div class="col-12 col-md-4">
              <q-select v-model="form.category" :options="['INSIDEN','KERJASAMA','WASPADA']"
                label="Kategori *" filled dense />
            </div>
            <div class="col-12 col-md-4">
              <q-select v-model="form.type" :options="[
                { label: '★ Berita Utama (Featured Besar di Kiri Beranda)', value: 'featured' },
                { label: 'Standar (Kolom Kanan Beranda)', value: 'standard' }
              ]" emit-value map-options label="Posisi Tampilan Beranda *" filled dense />
            </div>
            <div class="col-12 col-md-4">
              <q-input v-model="form.date" label="Tanggal (cth: 25 Mei 2025)" filled dense />
            </div>

            <div class="col-12">
              <div class="text-caption text-grey-8 font-bold q-mb-xs">Gambar Sampul Berita (Cover)</div>
              <div class="flex items-center gap-3">
                <q-file
                  v-model="uploadingFile"
                  label="Pilih File Gambar dari Komputer"
                  filled
                  dense
                  class="flex-1"
                  accept="image/*"
                  @update:model-value="handleFileUpload"
                  :loading="uploading"
                >
                  <template v-slot:prepend>
                    <q-icon name="cloud_upload" />
                  </template>
                </q-file>
              </div>
              <div v-if="form.imageUrl" class="mt-3 flex items-center gap-4 bg-gray-50 p-3 rounded-lg border border-gray-200">
                <img :src="form.imageUrl" class="rounded-lg h-24 w-36 object-cover border border-gray-300 shadow-sm" />
                <div class="flex flex-col text-xs text-gray-500 overflow-hidden">
                  <span class="font-bold text-gray-800">Preview Gambar Terpilih:</span>
                  <span class="truncate max-w-xs">{{ form.imageUrl }}</span>
                </div>
              </div>
            </div>

            <div class="col-12">
              <q-input v-model="form.description" label="Ringkasan Singkat (Muncul di kartu beranda) *" filled dense type="textarea" :rows="2" />
            </div>

            <div class="col-12">
              <div class="text-caption text-grey-7 q-mb-xs font-bold">Isi Berita Lengkap (WYSIWYG Editor)</div>
              <RichEditor v-model="form.body" />
            </div>
          </div>
        </q-card-section>

        <q-card-actions align="right" class="q-pa-md bg-gray-50 border-t border-gray-200">
          <q-btn flat label="Batal" v-close-popup no-caps />
          <q-btn unelevated :loading="saving" label="Simpan Berita"
            color="primary" @click="save" no-caps class="px-5 font-bold" />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <!-- Delete confirm -->
    <q-dialog v-model="deleteDialog">
      <q-card style="min-width:320px" class="rounded-xl">
        <q-card-section class="row items-center p-6">
          <q-avatar icon="warning" color="negative" text-color="white" />
          <span class="q-ml-md font-geist">Hapus berita "<strong>{{ deleteTarget?.title }}</strong>"?</span>
        </q-card-section>
        <q-card-actions align="right" class="p-4 bg-gray-50">
          <q-btn flat label="Batal" v-close-popup no-caps />
          <q-btn flat label="Hapus" color="negative" @click="doDelete" no-caps font-bold />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useQuasar, Notify } from 'quasar';
import RichEditor from '@/components/RichEditor.vue';
import { fetchArticles, createArticle, updateArticle, deleteArticle, uploadFile } from '@/services/api';

const $q = useQuasar();
const loading = ref(false);
const saving = ref(false);
const uploading = ref(false);
const uploadingFile = ref<File | null>(null);
const rows = ref<any[]>([]);
const tab = ref('all');

const dialog = ref(false);
const deleteDialog = ref(false);
const deleteTarget = ref<any>(null);

const form = ref<any>({
  id: null,
  title: '',
  slug: '',
  category: 'INSIDEN',
  type: 'standard',
  date: '',
  imageUrl: '',
  description: '',
  body: ''
});

function notify(type: 'positive' | 'negative' | 'warning' | 'info', message: string) {
  if (typeof Notify !== 'undefined' && Notify.create) {
    Notify.create({ type, message, position: 'top' });
  } else if ($q && typeof $q.notify === 'function') {
    $q.notify({ type, message, position: 'top' });
  } else {
    alert(message);
  }
}

async function handleFileUpload(file: any) {
  if (!file) return;
  uploading.value = true;
  try {
    const res = await uploadFile(file);
    if (res.data && res.data.url) {
      form.value.imageUrl = res.data.url;
      notify('positive', 'Gambar berhasil diunggah!');
    }
  } catch (err) {
    notify('negative', 'Gagal mengunggah file gambar');
  } finally {
    uploading.value = false;
  }
}

const columns: any[] = [
  { name: 'image',    label: 'Gambar',   field: 'imageUrl', align: 'center' },
  { name: 'title',    label: 'Judul',    field: 'title',    align: 'left', sortable: true },
  { name: 'category', label: 'Kategori', field: 'category', align: 'center', sortable: true },
  { name: 'type',     label: 'Tampilan', field: 'type',     align: 'center', sortable: true },
  { name: 'date',     label: 'Tanggal',  field: 'date',     align: 'center' },
  { name: 'actions',  label: 'Aksi',     field: 'actions',  align: 'center' },
];

const filteredRows = computed(() => {
  if (tab.value === 'all') return rows.value;
  return rows.value.filter(r => r.category === tab.value);
});

function categoryBadgeColor(cat: string) {
  if (cat === 'INSIDEN') return 'negative';
  if (cat === 'KERJASAMA') return 'primary';
  if (cat === 'WASPADA') return 'warning';
  return 'primary';
}

function autoSlug(val: string) {
  if (!form.value.id) {
    form.value.slug = val.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  }
}

async function load() {
  loading.value = true;
  try {
    const res = await fetchArticles();
    rows.value = res.data;
  } catch (e) {
    notify('negative', 'Gagal memuat berita');
  } finally {
    loading.value = false;
  }
}

onMounted(load);

function openDialog(row: any = null) {
  uploadingFile.value = null;
  if (row) {
    form.value = {
      ...row,
      imageUrl: row.imageUrl || row.image || '',
      description: row.description || row.excerpt || ''
    };
  } else {
    const now = new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
    form.value = {
      id: null,
      title: '',
      slug: '',
      category: 'INSIDEN',
      type: 'standard',
      date: now,
      imageUrl: '/assets/news-featured-DEHxhDd0.png',
      description: '',
      body: ''
    };
  }
  dialog.value = true;
}

async function save() {
  if (!form.value.title) {
    notify('negative', 'Judul wajib diisi');
    return;
  }
  saving.value = true;
  try {
    const payload = {
      ...form.value,
      image: form.value.imageUrl,
      excerpt: form.value.description
    };
    if (form.value.id) {
      await updateArticle(form.value.id, payload);
      notify('positive', 'Berita berhasil diperbarui');
    } else {
      await createArticle(payload);
      notify('positive', 'Berita baru berhasil ditambahkan');
    }
    dialog.value = false;
    load();
  } catch (e) {
    notify('negative', 'Gagal menyimpan berita');
  } finally {
    saving.value = false;
  }
}

function confirmDelete(row: any) {
  deleteTarget.value = row;
  deleteDialog.value = true;
}

async function doDelete() {
  try {
    await deleteArticle(deleteTarget.value.id);
    notify('positive', 'Berita dihapus');
    deleteDialog.value = false;
    load();
  } catch (e) {
    notify('negative', 'Gagal menghapus berita');
  }
}
</script>
