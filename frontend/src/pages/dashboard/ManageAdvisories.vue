<template>
  <q-page class="q-pa-lg">
    <div class="row items-center q-mb-lg">
      <div>
        <div class="text-h5 text-weight-bold">Manajemen Advisory Keamanan</div>
        <div class="text-caption text-grey-6">Kelola tabel peringatan &amp; advisory yang muncul di beranda dan halaman /advisory.</div>
      </div>
      <q-space />
      <q-input v-model="search" dense filled placeholder="Cari judul atau CVE..." class="q-mr-md" style="width:260px">
        <template #prepend><q-icon name="search" /></template>
      </q-input>
      <q-btn unelevated icon="add" label="Tambah Advisory" color="primary" no-caps @click="openDialog()" class="font-bold rounded-lg" />
    </div>

    <q-card flat bordered class="rounded-xl overflow-hidden">
      <q-table :rows="filtered" :columns="columns" row-key="id" :loading="loading" flat
        no-data-label="Belum ada advisory">
        <template #body-cell-severity="props">
          <q-td :props="props">
            <q-badge :color="sevBadgeColor(props.value)" class="font-bold">{{ props.value }}</q-badge>
          </q-td>
        </template>
        <template #body-cell-status="props">
          <q-td :props="props">
            <q-badge outline :color="props.value === 'Aktif' ? 'negative' : props.value === 'Dalam Penanganan' ? 'warning' : 'positive'" class="font-bold">
              {{ props.value }}
            </q-badge>
          </q-td>
        </template>
        <template #body-cell-actions="props">
          <q-td :props="props" style="white-space:nowrap">
            <q-btn flat dense icon="edit" size="sm" color="primary" @click="openDialog(props.row)" />
            <q-btn flat dense icon="delete" size="sm" color="negative" @click="confirmDel(props.row)" />
          </q-td>
        </template>
      </q-table>
    </q-card>

    <q-dialog v-model="dialog" persistent>
      <q-card style="width: 800px; max-width: 95vw; max-height: 90vh;" class="rounded-2xl flex flex-col overflow-hidden shadow-2xl">
        <q-bar class="bg-[#0a1628] text-white h-12 flex-shrink-0">
          <q-icon name="shield" /><div class="q-ml-sm font-bold">{{ form.id ? 'Edit Advisory' : 'Tambah Advisory Baru' }}</div>
          <q-space /><q-btn dense flat icon="close" v-close-popup />
        </q-bar>
        <q-card-section class="scroll p-6 flex-1">
          <div class="row q-col-gutter-md">
            <div class="col-12 col-md-6"><q-input v-model="form.cveId" label="ID Advisory / CVE *" filled dense hint="Contoh: CVE-2025-24911 atau KD-ADV-2026-001" /></div>
            <div class="col-12 col-md-6"><q-input v-model="form.date" label="Tanggal *" filled dense hint="Contoh: 15 Mei 2025" /></div>
            <div class="col-12"><q-input v-model="form.title" label="Judul Advisory *" filled dense /></div>
            <div class="col-12 col-md-6">
              <q-select v-model="form.severity" :options="['Kritis','Tinggi','Sedang','Rendah']" label="Tingkat Keparahan *" filled dense />
            </div>
            <div class="col-12 col-md-6">
              <q-select v-model="form.status" :options="['Aktif','Dalam Penanganan','Selesai']" label="Status *" filled dense />
            </div>
            <div class="col-12">
              <div class="text-caption text-grey-7 q-mb-xs font-bold">Detail Teknis / Deskripsi Advisory (WYSIWYG)</div>
              <RichEditor v-model="form.body" />
            </div>
          </div>
        </q-card-section>
        <q-card-actions align="right" class="q-pa-md bg-gray-50 border-t border-gray-200 flex-shrink-0">
          <q-btn flat label="Batal" v-close-popup no-caps />
          <q-btn unelevated color="primary" :loading="saving" label="Simpan Advisory" no-caps @click="save" class="px-5 font-bold" />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-dialog v-model="delDialog">
      <q-card style="min-width:320px" class="rounded-xl">
        <q-card-section class="p-6">Hapus advisory "<b>{{ delTarget?.title }}</b>"?</q-card-section>
        <q-card-actions align="right" class="p-4 bg-gray-50">
          <q-btn flat label="Batal" v-close-popup no-caps />
          <q-btn flat label="Hapus" color="negative" no-caps @click="doDelete" class="font-bold" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useQuasar, Notify } from 'quasar';
import RichEditor from '@/components/RichEditor.vue';
import { getAdvisories, createAdvisory, updateAdvisory, deleteAdvisory } from '@/services/api';

const $q = useQuasar();
const rows = ref<any[]>([]);
const loading = ref(false);
const saving = ref(false);
const search = ref('');
const dialog = ref(false);
const delDialog = ref(false);
const delTarget = ref<any>(null);
const form = ref<any>({});

function notify(type: 'positive' | 'negative' | 'warning' | 'info', message: string) {
  if (typeof Notify !== 'undefined' && Notify.create) {
    Notify.create({ type, message, position: 'top' });
  } else if ($q && typeof $q.notify === 'function') {
    $q.notify({ type, message, position: 'top' });
  } else {
    alert(message);
  }
}

const columns: any[] = [
  { name: 'date', label: 'Tanggal', field: 'date', align: 'left', sortable: true },
  { name: 'cveId', label: 'ID Advisory / CVE', field: (row: any) => row.cveId || row.advisoryId, align: 'left', sortable: true },
  { name: 'title', label: 'Judul', field: 'title', align: 'left', sortable: true },
  { name: 'severity', label: 'Tingkat', field: 'severity', align: 'center' },
  { name: 'status', label: 'Status', field: 'status', align: 'center' },
  { name: 'actions', label: 'Aksi', field: 'actions', align: 'center' },
];

const filtered = computed(() => {
  const q = search.value.toLowerCase();
  return rows.value.filter(r => !q || r.title?.toLowerCase().includes(q) || (r.cveId || r.advisoryId)?.toLowerCase().includes(q));
});

function sevBadgeColor(s: string) {
  if (s === 'Kritis') return 'negative';
  if (s === 'Tinggi') return 'deep-orange';
  if (s === 'Sedang') return 'warning';
  return 'positive';
}

async function load() {
  loading.value = true;
  try {
    const res = await getAdvisories();
    rows.value = res.data;
  } catch { /* ignore */ }
  loading.value = false;
}
onMounted(load);

function openDialog(row: any = null) {
  if (row) {
    form.value = {
      ...row,
      cveId: row.cveId || row.advisoryId || '',
      severity: row.severity || 'Sedang',
      status: row.status || 'Aktif',
      body: row.body || ''
    };
  } else {
    const now = new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
    form.value = {
      cveId: 'CVE-' + new Date().getFullYear() + '-',
      date: now,
      title: '',
      severity: 'Sedang',
      status: 'Aktif',
      body: ''
    };
  }
  dialog.value = true;
}

function confirmDel(row: any) { delTarget.value = row; delDialog.value = true; }

async function save() {
  if (!form.value.cveId || !form.value.title) {
    notify('negative', 'ID Advisory / CVE dan judul wajib diisi');
    return;
  }
  saving.value = true;
  try {
    const payload = {
      ...form.value,
      advisoryId: form.value.cveId
    };
    if (form.value.id) await updateAdvisory(form.value.id, payload);
    else await createAdvisory(payload);
    notify('positive', 'Advisory berhasil disimpan');
    dialog.value = false;
    load();
  } catch {
    notify('negative', 'Gagal menyimpan advisory');
  }
  saving.value = false;
}

async function doDelete() {
  try {
    await deleteAdvisory(delTarget.value.id);
    notify('positive', 'Advisory dihapus');
    delDialog.value = false;
    load();
  } catch {
    notify('negative', 'Gagal menghapus');
  }
}
</script>
