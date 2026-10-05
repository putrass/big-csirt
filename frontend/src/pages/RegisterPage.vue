<template>
  <div style="min-height:100vh;background:#0a1628;display:flex;align-items:center;justify-content:center">
    <div style="width:100%;max-width:440px;padding:2rem">
      <div class="text-center q-mb-xl">
        <img src="https://csirt.komdigi.go.id/storage/uploads/general-configs/komdigi-csirt.svg" width="72" class="q-mb-md" />
        <div class="text-white text-h6 text-weight-bold">KOMDIGI-CSIRT</div>
        <div class="text-grey-5 text-caption">Buat akun baru</div>
      </div>

      <q-card flat style="background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.12);border-radius:16px">
        <q-card-section class="q-pa-xl">
          <div class="text-white text-h6 text-weight-bold q-mb-xs">Daftar Akun</div>
          <div class="text-grey-5 text-caption q-mb-lg">Isi form berikut untuk mendaftar</div>

          <q-form @submit="doRegister">
            <div class="text-grey-4 text-caption q-mb-xs">Nama Lengkap</div>
            <q-input v-model="form.name" filled dense dark placeholder="Nama Anda"
              class="q-mb-md" :rules="[v => !!v || 'Nama wajib diisi']" />

            <div class="text-grey-4 text-caption q-mb-xs">Email</div>
            <q-input v-model="form.email" type="email" filled dense dark
              placeholder="email@example.com" class="q-mb-md"
              :rules="[v => !!v || 'Email wajib diisi']" />

            <div class="text-grey-4 text-caption q-mb-xs">Password</div>
            <q-input v-model="form.password" :type="showPass ? 'text' : 'password'"
              filled dense dark placeholder="Min. 6 karakter" class="q-mb-lg"
              :rules="[v => v.length >= 6 || 'Minimal 6 karakter']">
              <template #append>
                <q-icon :name="showPass ? 'visibility_off' : 'visibility'"
                  class="cursor-pointer text-grey-5" @click="showPass = !showPass" />
              </template>
            </q-input>

            <div v-if="error" class="text-negative text-caption q-mb-md">{{ error }}</div>

            <q-btn type="submit" unelevated :loading="loading" label="Daftar Sekarang"
              class="full-width q-py-sm text-weight-bold"
              style="background:#60a5fa;color:#0a1628;border-radius:8px;font-size:1rem" />
          </q-form>

          <div class="text-center q-mt-lg">
            <span class="text-grey-5 text-caption">Sudah punya akun? </span>
            <router-link to="/login" class="text-caption"
              style="color:#60a5fa;text-decoration:none;font-weight:600">Masuk</router-link>
          </div>
          <div class="text-center q-mt-sm">
            <router-link to="/" class="text-grey-6 text-caption" style="text-decoration:none">
              ← Kembali ke Beranda
            </router-link>
          </div>
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/authStore';

const router = useRouter();
const auth = useAuthStore();
const showPass = ref(false);
const loading = ref(false);
const error = ref('');
const form = ref({ name: '', email: '', password: '' });

async function doRegister() {
  loading.value = true;
  error.value = '';
  try {
    await auth.register(form.value.name, form.value.email, form.value.password);
    router.push('/bug-hunter/dashboard');
  } catch (e: any) {
    error.value = e?.response?.data?.error ?? 'Pendaftaran gagal.';
  } finally {
    loading.value = false;
  }
}
</script>
