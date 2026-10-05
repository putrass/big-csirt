<template>
  <q-page class="q-pa-lg">
    <div class="row items-center q-mb-lg">
      <div>
        <div class="text-h5 text-weight-bold">Pengaturan Beranda &amp; Tentang Kami</div>
        <div class="text-caption text-grey-6">Kelola teks hero, pengumuman pita kuning (marquee), dan section tentang kami.</div>
      </div>
      <q-space />
      <q-btn unelevated :loading="saving" icon="save" label="Simpan Perubahan"
        color="primary" @click="save" no-caps class="px-5 py-2 rounded-lg font-bold" />
    </div>

    <div class="row q-col-gutter-lg">
      <!-- Kolom Kiri: Hero & Pengumuman -->
      <div class="col-12 col-md-6">
        <!-- Pita Pengumuman (Marquee) -->
        <q-card flat bordered class="q-mb-lg rounded-xl">
          <q-card-section>
            <div class="text-subtitle2 text-weight-bold q-mb-xs flex items-center gap-2">
              <span class="bg-[#f59e0b] text-[#0a1628] text-xs font-bold px-2 py-0.5 rounded">PENTING</span>
              Teks Pengumuman Berjalan (Marquee)
            </div>
            <div class="text-caption text-grey-6 q-mb-md">Teks ini akan berjalan di pita kuning di bawah hero beranda.</div>
            <q-input v-model="form.announcement" label="Pesan Pengumuman *" filled dense type="textarea" :rows="3" />
          </q-card-section>
        </q-card>

        <!-- Hero Section -->
        <q-card flat bordered class="q-mb-lg rounded-xl">
          <q-card-section>
            <div class="text-subtitle2 text-weight-bold q-mb-xs">Hero Banner Atas</div>
            <div class="text-caption text-grey-6 q-mb-md">Judul besar, deskripsi, dan gambar latar belakang (background) hero.</div>
            <q-input v-model="form.heroTitle" label="Judul Hero (cth: BIG CSIRT)" filled dense class="q-mb-md" />
            <q-input v-model="form.heroSubtitle" label="Subjudul / Slogan Hero" filled dense type="textarea" :rows="3" class="q-mb-md" />

            <!-- Background Image Upload -->
            <div class="p-3 bg-gray-50 rounded-xl border border-gray-200">
              <div class="text-xs font-bold text-gray-700 mb-1 flex items-center justify-between">
                <span>Gambar Latar Belakang Hero (Background Map/Graphic)</span>
                <span class="text-gray-400 font-normal">Maks. 3 MB</span>
              </div>
              <div class="text-[11px] text-gray-500 mb-2">
                Ukuran hero tetap statis dan proporsional (aspect cover). Format didukung: JPG, PNG, WebP.
              </div>
              <div class="flex items-center gap-2">
                <q-file
                  v-model="bgFile"
                  label="Pilih File Gambar Background"
                  filled
                  dense
                  class="flex-1"
                  accept="image/*"
                  :loading="uploadingBg"
                  @update:model-value="handleBgUpload"
                >
                  <template v-slot:prepend>
                    <q-icon name="image" />
                  </template>
                </q-file>
                <q-btn
                  v-if="form.heroBg"
                  flat
                  dense
                  color="grey-7"
                  label="Reset Default"
                  no-caps
                  class="text-xs"
                  @click="form.heroBg = ''"
                />
              </div>

              <!-- Thumbnail Preview -->
              <div class="mt-3 flex items-center gap-3">
                <div class="w-24 h-14 rounded-lg border border-gray-300 overflow-hidden bg-[#0a1628] flex-shrink-0 relative">
                  <img
                    :src="form.heroBg || '/assets/bg-map-DqRDIy-6.png'"
                    alt="Hero BG"
                    class="w-full h-full object-cover opacity-75"
                  />
                </div>
                <div class="flex flex-col text-[11px] text-gray-600 overflow-hidden">
                  <span class="font-bold text-gray-800">Background Aktif:</span>
                  <span class="truncate max-w-xs">{{ form.heroBg || 'Default (/assets/bg-map-DqRDIy-6.png)' }}</span>
                </div>
              </div>
            </div>
          </q-card-section>
        </q-card>

        <!-- Preview Live -->
        <q-card flat bordered class="rounded-xl bg-[#0a1628] text-white overflow-hidden relative">
          <!-- Background image overlay in preview -->
          <div
            class="absolute inset-0 bg-cover bg-center opacity-25 mix-blend-overlay pointer-events-none"
            :style="{ backgroundImage: `url(${form.heroBg || '/assets/bg-map-DqRDIy-6.png'})` }"
          ></div>
          <q-card-section class="p-6 relative z-10">
            <div class="text-caption text-blue-300 font-bold mb-2">PREVIEW HERO BERANDA</div>
            <h3 class="font-grotesk font-extrabold text-2xl text-white m-0">{{ form.heroTitle || 'BIG CSIRT' }}</h3>
            <p class="font-geist text-sm text-blue-100 opacity-90 mt-2 mb-4">{{ form.heroSubtitle }}</p>
            <div class="bg-[#f59e0b] text-[#0a1628] text-xs font-bold p-2.5 rounded-lg flex items-center gap-2">
              <span class="bg-[#0a1628] text-white text-[10px] px-1.5 py-0.5 rounded">PENTING</span>
              <span class="truncate">{{ form.announcement }}</span>
            </div>
          </q-card-section>
        </q-card>
      </div>

      <!-- Kolom Kanan: Section Tentang Kami -->
      <div class="col-12 col-md-6">
        <q-card flat bordered class="rounded-xl">
          <q-card-section>
            <div class="row items-center q-mb-md">
              <div>
                <div class="text-subtitle2 text-weight-bold">Section Tentang Kami</div>
                <div class="text-caption text-grey-6">Paragraf pengantar di beranda.</div>
              </div>
              <q-space />
              <q-btn flat dense icon="add" label="Tambah Paragraf" @click="addPara" no-caps color="primary" />
            </div>

            <q-input v-model="form.title" label="Judul Section (cth: Tentang BIG-CSIRT)" filled dense class="q-mb-md" />

            <div v-for="(para, i) in form.body" :key="i" class="row items-start no-wrap q-mb-md q-gutter-xs">
              <q-input v-model="form.body[i]" filled dense type="textarea" :rows="3"
                :label="`Paragraf ${i+1}`" class="col" />
              <q-btn flat dense icon="delete" color="negative" class="q-mt-sm"
                @click="removePara(i)" title="Hapus Paragraf" />
            </div>

            <div v-if="!form.body?.length" class="text-caption text-grey-5 text-center q-py-md">
              Klik "Tambah Paragraf" untuk menambahkan teks deskripsi.
            </div>

            <div class="row q-col-gutter-md mt-4 pt-4 border-t border-gray-100">
              <div class="col-6">
                <q-input v-model="form.linkText" label="Teks Tombol (cth: Pelajari Profil Lengkap)" filled dense />
              </div>
              <div class="col-6">
                <q-input v-model="form.link" label="URL Tombol (cth: /profil)" filled dense />
              </div>
            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useQuasar, Notify } from 'quasar';
import { fetchAbout, updateAbout, uploadFile } from '@/services/api';

const $q = useQuasar();
const saving = ref(false);
const uploadingBg = ref(false);
const bgFile = ref<File | null>(null);

const form = ref<any>({
  heroTitle: '',
  heroSubtitle: '',
  heroBg: '',
  announcement: '',
  title: '',
  subtitle: '',
  body: [],
  logoSrc: '',
  link: '/profil',
  linkText: 'Pelajari Profil Lengkap'
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

async function handleBgUpload(file: any) {
  if (!file) return;

  // Batasan ukuran gambar maks 3 MB (3 * 1024 * 1024 bytes)
  const maxBytes = 3 * 1024 * 1024;
  if (file.size > maxBytes) {
    notify('negative', 'Ukuran gambar terlalu besar! Maksimal 3 MB.');
    bgFile.value = null;
    return;
  }

  uploadingBg.value = true;
  try {
    const res = await uploadFile(file);
    if (res.data && res.data.url) {
      form.value.heroBg = res.data.url;
      notify('positive', 'Gambar background berhasil diunggah!');
    }
  } catch (e) {
    notify('negative', 'Gagal mengunggah file background');
  } finally {
    uploadingBg.value = false;
  }
}

onMounted(async () => {
  try {
    const res = await fetchAbout();
    form.value = { ...res.data, body: res.data.body ?? [] };
  } catch (e) {
    console.error(e);
  }
});

function addPara() {
  form.value.body = [...(form.value.body ?? []), ''];
}

function removePara(i: number) {
  form.value.body.splice(i, 1);
}

async function save() {
  saving.value = true;
  try {
    await updateAbout(form.value);
    notify('positive', 'Konten beranda & Tentang Kami berhasil disimpan!');
  } catch (e) {
    notify('negative', 'Gagal menyimpan konten.');
  } finally {
    saving.value = false;
  }
}
</script>
