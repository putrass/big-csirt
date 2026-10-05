import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import * as api from '@/services/api';

export const useAuthStore = defineStore('auth', () => {
  const token = ref<string|null>(localStorage.getItem('csirt_token'));
  const user = ref<any>(null);
  const isLoggedIn = computed(() => !!token.value);
  const isAdmin = computed(() => user.value?.role === 'admin');

  async function login(email: string, password: string) {
    const res = await api.login({ email, password });
    token.value = res.data.token;
    user.value = res.data.user;
    localStorage.setItem('csirt_token', res.data.token);
  }

  async function register(name: string, email: string, password: string) {
    const res = await api.register({ name, email, password });
    token.value = res.data.token;
    user.value = res.data.user;
    localStorage.setItem('csirt_token', res.data.token);
  }

  async function fetchMe() {
    if (!token.value) return;
    try {
      const res = await api.getMe();
      user.value = res.data;
    } catch { logout(); }
  }

  function logout() {
    token.value = null;
    user.value = null;
    localStorage.removeItem('csirt_token');
  }

  return { token, user, isLoggedIn, isAdmin, login, register, fetchMe, logout };
});
