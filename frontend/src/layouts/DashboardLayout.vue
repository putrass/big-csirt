<template>
  <q-layout view="lHh Lpr lFf">
    <!-- Header -->
    <q-header elevated class="bg-[#0a1628] text-white" style="border-bottom:1px solid rgba(255,255,255,0.1)">
      <q-toolbar class="px-6 h-16">
        <q-btn flat dense round icon="menu" @click="drawer = !drawer" class="mr-2" />
        <div class="flex items-center gap-3">
          <img src="/assets/logo-csirt-D9xGTNl_.png" alt="BIG-CSIRT" class="w-8 h-8 object-contain" />
          <div class="flex flex-col">
            <span class="font-grotesk font-extrabold text-base leading-tight">BIG-CSIRT</span>
            <span class="font-geist text-[10px] text-blue-300 uppercase tracking-wider">Panel Administrasi</span>
          </div>
        </div>

        <q-space />

        <div class="flex items-center gap-4">
          <router-link to="/" target="_blank" class="text-xs text-blue-300 hover:text-white no-underline flex items-center gap-1">
            <i class="fas fa-external-link-alt text-[10px]"></i> Lihat Website
          </router-link>
          <div class="h-4 w-px bg-gray-700"></div>
          <span class="text-xs font-semibold text-gray-300">
            {{ auth.user?.name || 'Administrator' }}
          </span>
          <button @click="doLogout" class="text-xs bg-red-600 hover:bg-red-700 text-white px-3 py-1.5 rounded transition-colors cursor-pointer">
            Keluar
          </button>
        </div>
      </q-toolbar>
    </q-header>

    <!-- Sidebar -->
    <q-drawer v-model="drawer" show-if-above bordered class="bg-[#0a1628] text-gray-300" :width="240">
      <div class="p-5 border-b border-gray-800 flex flex-col items-center justify-center gap-2">
        <img src="/assets/logo-big-crCCDRIX.png" alt="BIG" class="max-w-[140px] w-full h-auto object-contain" />
        <span class="text-[11px] font-medium text-gray-400 text-center tracking-wide">Badan Informasi Geospasial</span>
      </div>

      <q-list class="py-4">
        <q-item
          v-for="item in navItems"
          :key="item.to"
          clickable
          v-ripple
          :to="item.to"
          active-class="bg-[#1b4fd8] text-white font-semibold"
          class="my-1 mx-3 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800 transition-colors"
        >
          <q-item-section avatar style="min-width: 36px">
            <q-icon :name="item.icon" size="20px" />
          </q-item-section>
          <q-item-section class="text-sm font-geist">{{ item.label }}</q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <!-- Page Container -->
    <q-page-container class="bg-[#f8fafc]">
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/authStore';

const drawer = ref(true);
const auth = useAuthStore();
const router = useRouter();

const navItems = [
  { to: '/bug-hunter/dashboard',  icon: 'dashboard',    label: 'Dashboard' },
  { to: '/bug-hunter/about',      icon: 'campaign',     label: 'Pengumuman & Hero' },
  { to: '/bug-hunter/articles',   icon: 'article',      label: 'Berita' },
  { to: '/bug-hunter/advisories', icon: 'shield',       label: 'Advisory' },
  { to: '/bug-hunter/education',  icon: 'school',       label: 'Edukasi' },
  { to: '/bug-hunter/gallery',    icon: 'photo_library',label: 'Foto Kegiatan' },
  { to: '/bug-hunter/pages',      icon: 'description',  label: 'Halaman Statis' },
  { to: '/bug-hunter/users',      icon: 'people',       label: 'Users' },
];

function doLogout() {
  auth.logout();
  router.push('/login');
}
</script>

