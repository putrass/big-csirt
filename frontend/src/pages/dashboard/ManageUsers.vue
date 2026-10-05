<template>
  <q-page class="q-pa-lg">
    <div class="row items-center q-mb-lg">
      <div class="text-h5 text-weight-bold">Manajemen Users</div>
    </div>
    <q-card flat bordered>
      <q-table :rows="rows" :columns="columns" row-key="id" :loading="loading" flat
        no-data-label="Belum ada user">
        <template #body-cell-role="props">
          <q-td :props="props">
            <q-badge :color="props.value === 'admin' ? 'deep-purple' : 'primary'">{{ props.value }}</q-badge>
          </q-td>
        </template>
        <template #body-cell-createdAt="props">
          <q-td :props="props">{{ formatDate(props.value) }}</q-td>
        </template>
        <template #body-cell-actions="props">
          <q-td :props="props" style="white-space:nowrap">
            <q-btn flat dense size="sm" icon="admin_panel_settings" color="primary"
              :label="props.row.role === 'admin' ? 'Jadikan User' : 'Jadikan Admin'"
              no-caps @click="toggleRole(props.row)" />
            <q-btn flat dense size="sm" icon="delete" color="negative"
              @click="confirmDel(props.row)" />
          </q-td>
        </template>
      </q-table>
    </q-card>

    <q-dialog v-model="delDialog">
      <q-card style="min-width:320px">
        <q-card-section class="row items-center">
          <q-avatar icon="warning" color="negative" text-color="white" />
          <span class="q-ml-md">Hapus user "<b>{{ delTarget?.name }}</b>"?</span>
        </q-card-section>
        <q-card-section class="text-caption text-negative">
          Tindakan ini tidak dapat dibatalkan.
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="Batal" v-close-popup no-caps />
          <q-btn flat label="Hapus" color="negative" @click="doDelete" no-caps />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useQuasar } from 'quasar';
import { getUsers, updateUser, deleteUser } from '@/services/api';

const $q = useQuasar();
const rows = ref<any[]>([]);
const loading = ref(false);
const delDialog = ref(false);
const delTarget = ref<any>(null);

const columns: any[] = [
  { name: 'name',      label: 'Nama',     field: 'name',      align: 'left', sortable: true },
  { name: 'email',     label: 'Email',    field: 'email',     align: 'left', sortable: true },
  { name: 'role',      label: 'Role',     field: 'role',      align: 'center' },
  { name: 'createdAt', label: 'Terdaftar',field: 'createdAt', align: 'center' },
  { name: 'actions',   label: 'Aksi',     field: 'actions',   align: 'center' },
];

function formatDate(d: string) {
  if (!d) return '-';
  return new Date(d).toLocaleDateString('id-ID', { day:'numeric', month:'short', year:'numeric' });
}

async function load() {
  loading.value = true;
  try { const r = await getUsers(); rows.value = r.data; } catch {}
  loading.value = false;
}
onMounted(load);

async function toggleRole(user: any) {
  const newRole = user.role === 'admin' ? 'user' : 'admin';
  try {
    await updateUser(user.id, { role: newRole });
    $q.notify({ type: 'positive', message: `Role ${user.name} diubah ke ${newRole}` });
    load();
  } catch { $q.notify({ type: 'negative', message: 'Gagal mengubah role' }); }
}

function confirmDel(user: any) { delTarget.value = user; delDialog.value = true; }
async function doDelete() {
  try {
    await deleteUser(delTarget.value.id);
    $q.notify({ type: 'positive', message: 'User dihapus' });
    delDialog.value = false; load();
  } catch { $q.notify({ type: 'negative', message: 'Gagal menghapus' }); }
}
</script>
