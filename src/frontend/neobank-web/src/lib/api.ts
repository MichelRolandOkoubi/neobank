import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000'; // Gateway URL

export const api = axios.create({
  baseURL: API_BASE_URL,
});

api.interceptors.request.use((config) => {
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authApi = {
  login: (data: any) => api.post('/auth/login', data),
  register: (data: any) => api.post('/auth/register', data),
};

export const accountApi = {
  getAccount: (userId: string) => api.get(`/api/accounts/user/${userId}`),
  createAccount: (userId: string) => api.post(`/api/accounts?userId=${userId}`),
};

export const transactionApi = {
  create: (data: any) => api.post('/api/transactions/transactions', data),
};

export const aiApi = {
  categorize: (data: any) => api.post('/api/insights/insights/categorize', data),
  getSuggestion: (summary: string) => api.post('/api/insights/insights/suggest', summary),
};
