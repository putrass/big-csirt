<template>
  <div class="min-h-screen bg-gradient-to-br from-[#0a1628] to-[#1a3a6b] flex items-center justify-center px-4 font-geist">
    <div class="w-full max-w-md">
      <div class="bg-white rounded-2xl shadow-2xl overflow-hidden">
        <!-- Header -->
        <div class="bg-[#0a1628] px-8 py-8 flex flex-col items-center gap-3">
          <img src="/assets/logo-csirt-D9xGTNl_.png" alt="BIG-CSIRT" class="w-16 h-16 object-contain" />
          <div class="text-center">
            <h1 class="font-grotesk font-extrabold text-white text-2xl m-0">BIG-CSIRT</h1>
            <p class="font-geist text-blue-300 text-xs mt-1 uppercase tracking-widest m-0">Panel Administrasi</p>
          </div>
        </div>

        <!-- Form Body -->
        <div class="px-8 py-8">
          <h2 class="font-grotesk font-bold text-[#111827] text-xl mb-6 m-0">Masuk ke Dashboard</h2>

          <div v-if="error" class="mb-4 bg-red-50 border border-red-200 text-red-700 rounded-lg px-4 py-3 text-sm font-geist">
            {{ error }}
          </div>

          <form @submit.prevent="doLogin" class="flex flex-col gap-5">
            <div class="flex flex-col gap-1.5">
              <label class="font-geist font-semibold text-sm text-gray-700">Username atau Email</label>
              <input
                v-model="email"
                type="text"
                placeholder="Masukkan username / email"
                required
                class="border border-gray-300 rounded-lg px-4 py-2.5 text-sm font-geist focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow"
              />
            </div>

            <div class="flex flex-col gap-1.5">
              <label class="font-geist font-semibold text-sm text-gray-700">Password</label>
              <input
                v-model="password"
                type="password"
                placeholder="Masukkan password"
                required
                class="border border-gray-300 rounded-lg px-4 py-2.5 text-sm font-geist focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow"
              />
            </div>

            <button
              type="submit"
              :disabled="loading"
              class="w-full bg-[#1b4fd8] hover:bg-[#153eb2] disabled:opacity-50 text-white font-geist font-semibold py-2.5 rounded-lg transition-colors shadow-sm text-sm cursor-pointer mt-2"
            >
              {{ loading ? 'Memproses...' : 'Masuk' }}
            </button>
          </form>

          <div class="mt-6 pt-6 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
            <router-link to="/" class="hover:text-blue-600 transition-colors no-underline text-gray-500">
              ← Kembali ke Beranda
            </router-link>
            <span>Default: admin / admin123</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/authStore';

const router = useRouter();
const auth = useAuthStore();

const email = ref('admin@komdigi.go.id');
const password = ref('admin123');
const loading = ref(false);
const error = ref('');

async function doLogin() {
  loading.value = true;
  error.value = '';
  try {
    // If user enters 'admin', convert to seeded email 'admin@komdigi.go.id'
    const loginUser = email.value === 'admin' ? 'admin@komdigi.go.id' : email.value;
    await auth.login(loginUser, password.value);
    router.push('/bug-hunter/dashboard');
  } catch (e: any) {
    error.value = e?.response?.data?.error || 'Username atau password salah.';
  } finally {
    loading.value = false;
  }
}
</script>

