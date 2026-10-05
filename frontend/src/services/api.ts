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

export const fetchNav = () => hasBackend ? api.get('/nav').catch(() => ({ data: [] })) : Promise.resolve({ data: [] });
export const fetchCarousel = () => hasBackend ? api.get('/carousel').catch(() => ({ data: [] })) : Promise.resolve({ data: [] });
export const fetchArticles = () => hasBackend ? api.get('/articles').catch(() => ({ data: DEFAULT_ARTICLES })) : Promise.resolve({ data: DEFAULT_ARTICLES });
export const fetchGallery = () => hasBackend ? api.get('/gallery').catch(() => ({ data: DEFAULT_GALLERY })) : Promise.resolve({ data: DEFAULT_GALLERY });
export const fetchAttackStats = () => hasBackend ? api.get('/attack-stats').catch(() => ({ data: {} })) : Promise.resolve({ data: {} });
export const fetchAbout = () => hasBackend ? api.get('/about').catch(() => ({ data: DEFAULT_ABOUT })) : Promise.resolve({ data: DEFAULT_ABOUT });

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

export const createArticle = (data:any) => api.post('/articles', data);
export const updateArticle = (id:string, data:any) => api.put(`/articles/${id}`, data);
export const deleteArticle = (id:string) => api.delete(`/articles/${id}`);

export const createGallery = (data:any) => api.post('/gallery', data);
export const updateGallery = (id:any, data:any) => api.put(`/gallery/${id}`, data);
export const deleteGallery = (id:any) => api.delete(`/gallery/${id}`);

export const updateAbout = (data:any) => api.put('/about', data);

export const getAdvisories = () => hasBackend ? api.get('/advisories').catch(() => ({ data: DEFAULT_ADVISORIES })) : Promise.resolve({ data: DEFAULT_ADVISORIES });
export const getAdvisory = (id: string) => hasBackend ? api.get(`/advisories/${id}`).catch(() => ({ data: DEFAULT_ADVISORIES.find(a => a.id === id) || null })) : Promise.resolve({ data: DEFAULT_ADVISORIES.find(a => a.id === id) || null });
export const createAdvisory = (data: any) => api.post('/advisories', data);
export const updateAdvisory = (id: string, data: any) => api.put(`/advisories/${id}`, data);
export const deleteAdvisory = (id: string) => api.delete(`/advisories/${id}`);

export const getEducation = () => hasBackend ? api.get('/education').catch(() => ({ data: DEFAULT_EDUCATION })) : Promise.resolve({ data: DEFAULT_EDUCATION });
export const createEducation = (data: any) => api.post('/education', data);
export const updateEducation = (id: string, data: any) => api.put(`/education/${id}`, data);
export const deleteEducation = (id: string) => api.delete(`/education/${id}`);

export const uploadFile = (file: File) => {
  const formData = new FormData();
  formData.append('file', file);
  return api.post('/upload', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });
};

