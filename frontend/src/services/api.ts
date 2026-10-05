import axios from 'axios';
import {
  DEFAULT_ABOUT,
  DEFAULT_ARTICLES,
  DEFAULT_ADVISORIES,
  DEFAULT_EDUCATION,
  DEFAULT_GALLERY
} from './mockData';

const isProd = import.meta.env.PROD;
const customApi = import.meta.env.VITE_API_BASE_URL;

// On production GitHub Pages without a configured backend URL, immediately use mock data without causing CORS errors
const hasBackend = Boolean(customApi || !isProd);

const api = axios.create({
  baseURL: customApi || 'http://localhost:3000/api',
  timeout: 5000,
});

api.interceptors.request.use(cfg => {
  const token = localStorage.getItem('csirt_token');
  if (token) cfg.headers.Authorization = `Bearer ${token}`;
  return cfg;
});

// Helper for local browser storage when running statically without a backend database
function getLocal<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(`csirt_${key}`);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function setLocal<T>(key: string, val: T): void {
  try {
    localStorage.setItem(`csirt_${key}`, JSON.stringify(val));
  } catch (e) {
    console.warn('LocalStorage save failed:', e);
  }
}

export const fetchNav = () => hasBackend ? api.get('/nav').catch(() => ({ data: [] })) : Promise.resolve({ data: [] });
export const fetchCarousel = () => hasBackend ? api.get('/carousel').catch(() => ({ data: [] })) : Promise.resolve({ data: [] });
export const fetchArticles = () => hasBackend ? api.get('/articles').catch(() => ({ data: getLocal('articles', DEFAULT_ARTICLES) })) : Promise.resolve({ data: getLocal('articles', DEFAULT_ARTICLES) });
export const fetchGallery = () => hasBackend ? api.get('/gallery').catch(() => ({ data: getLocal('gallery', DEFAULT_GALLERY) })) : Promise.resolve({ data: getLocal('gallery', DEFAULT_GALLERY) });
export const fetchAttackStats = () => hasBackend ? api.get('/attack-stats').catch(() => ({ data: {} })) : Promise.resolve({ data: {} });
export const fetchAbout = () => hasBackend ? api.get('/about').catch(() => ({ data: getLocal('about', DEFAULT_ABOUT) })) : Promise.resolve({ data: getLocal('about', DEFAULT_ABOUT) });

export const login = (data: {email:string,password:string}) => api.post('/auth/login', data);
export const register = (data: {name:string,email:string,password:string}) => api.post('/auth/register', data);
export const getMe = () => api.get('/auth/me');
export const getUsers = () => api.get('/auth/users');
export const deleteUser = (id:string) => api.delete(`/auth/users/${id}`);
export const updateUser = (id:string, data:any) => api.put(`/auth/users/${id}`, data);

export const getPage = (slug:string) => api.get(`/pages/${slug}`);
export const updatePage = (slug:string, data:any) => api.put(`/pages/${slug}`, data);

export const getLeaderboard = () => api.get('/leaderboard');
export const createLeaderboard = (data:any) => api.post('/leaderboard', data);
export const updateLeaderboard = (id:string, data:any) => api.put(`/leaderboard/${id}`, data);
export const deleteLeaderboard = (id:string) => api.delete(`/leaderboard/${id}`);

export const getAgenda = () => api.get('/agenda');
export const createAgenda = (data:any) => api.post('/agenda', data);
export const updateAgenda = (id:string, data:any) => api.put(`/agenda/${id}`, data);
export const deleteAgenda = (id:string) => api.delete(`/agenda/${id}`);

export const getFaq = () => api.get('/faq');
export const createFaq = (data:any) => api.post('/faq', data);
export const updateFaq = (id:string, data:any) => api.put(`/faq/${id}`, data);
export const deleteFaq = (id:string) => api.delete(`/faq/${id}`);

export const sendContact = (data:any) => api.post('/contact', data);

export const createCarousel = (data:any) => api.post('/carousel', data);
export const updateCarousel = (id:any, data:any) => api.put(`/carousel/${id}`, data);
export const deleteCarousel = (id:any) => api.delete(`/carousel/${id}`);

export const createArticle = async (data:any) => {
  const current = getLocal('articles', DEFAULT_ARTICLES);
  const newItem = { ...data, id: data.id || `art-${Date.now()}` };
  setLocal('articles', [newItem, ...current]);
  if (hasBackend) {
    try { await api.post('/articles', data); } catch (e) { console.warn(e); }
  }
  return { data: newItem };
};

export const updateArticle = async (id:string, data:any) => {
  const current = getLocal('articles', DEFAULT_ARTICLES);
  const updated = current.map((item: any) => item.id === id ? { ...item, ...data } : item);
  setLocal('articles', updated);
  if (hasBackend) {
    try { await api.put(`/articles/${id}`, data); } catch (e) { console.warn(e); }
  }
  return { data };
};

export const deleteArticle = async (id:string) => {
  const current = getLocal('articles', DEFAULT_ARTICLES);
  setLocal('articles', current.filter((item: any) => item.id !== id));
  if (hasBackend) {
    try { await api.delete(`/articles/${id}`); } catch (e) { console.warn(e); }
  }
  return { data: { success: true } };
};

export const createGallery = (data:any) => api.post('/gallery', data);
export const updateGallery = (id:any, data:any) => api.put(`/gallery/${id}`, data);
export const deleteGallery = (id:any) => api.delete(`/gallery/${id}`);

export const updateAbout = async (data:any) => {
  setLocal('about', data);
  if (hasBackend) {
    try { await api.put('/about', data); } catch (e) { console.warn(e); }
  }
  return { data };
};

export const getAdvisories = () => hasBackend ? api.get('/advisories').catch(() => ({ data: getLocal('advisories', DEFAULT_ADVISORIES) })) : Promise.resolve({ data: getLocal('advisories', DEFAULT_ADVISORIES) });
export const getAdvisory = (id: string) => {
  const all = getLocal('advisories', DEFAULT_ADVISORIES);
  const found = all.find((a: any) => a.id === id) || null;
  return hasBackend ? api.get(`/advisories/${id}`).catch(() => ({ data: found })) : Promise.resolve({ data: found });
};

export const createAdvisory = async (data: any) => {
  const current = getLocal('advisories', DEFAULT_ADVISORIES);
  const newItem = { ...data, id: data.id || `adv-${Date.now()}` };
  setLocal('advisories', [newItem, ...current]);
  if (hasBackend) {
    try { await api.post('/advisories', data); } catch (e) { console.warn(e); }
  }
  return { data: newItem };
};

export const updateAdvisory = async (id: string, data: any) => {
  const current = getLocal('advisories', DEFAULT_ADVISORIES);
  const updated = current.map((item: any) => item.id === id ? { ...item, ...data } : item);
  setLocal('advisories', updated);
  if (hasBackend) {
    try { await api.put(`/advisories/${id}`, data); } catch (e) { console.warn(e); }
  }
  return { data };
};

export const deleteAdvisory = async (id: string) => {
  const current = getLocal('advisories', DEFAULT_ADVISORIES);
  setLocal('advisories', current.filter((item: any) => item.id !== id));
  if (hasBackend) {
    try { await api.delete(`/advisories/${id}`); } catch (e) { console.warn(e); }
  }
  return { data: { success: true } };
};

export const getEducation = () => hasBackend ? api.get('/education').catch(() => ({ data: getLocal('education', DEFAULT_EDUCATION) })) : Promise.resolve({ data: getLocal('education', DEFAULT_EDUCATION) });
export const createEducation = async (data: any) => {
  const current = getLocal('education', DEFAULT_EDUCATION);
  const newItem = { ...data, id: data.id || `edu-${Date.now()}` };
  setLocal('education', [newItem, ...current]);
  if (hasBackend) {
    try { await api.post('/education', data); } catch (e) { console.warn(e); }
  }
  return { data: newItem };
};
export const updateEducation = async (id: string, data: any) => {
  const current = getLocal('education', DEFAULT_EDUCATION);
  const updated = current.map((item: any) => item.id === id ? { ...item, ...data } : item);
  setLocal('education', updated);
  if (hasBackend) {
    try { await api.put(`/education/${id}`, data); } catch (e) { console.warn(e); }
  }
  return { data };
};
export const deleteEducation = async (id: string) => {
  const current = getLocal('education', DEFAULT_EDUCATION);
  setLocal('education', current.filter((item: any) => item.id !== id));
  if (hasBackend) {
    try { await api.delete(`/education/${id}`); } catch (e) { console.warn(e); }
  }
  return { data: { success: true } };
};

export const uploadFile = (file: File) => {
  const formData = new FormData();
  formData.append('file', file);
  return api.post('/upload', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });
};

