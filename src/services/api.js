import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5002/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const authAPI = {
  login: (credentials) => api.post('/auth/login', credentials),
  register: (userData) => api.post('/auth/register', userData),
  logout: () => api.post('/auth/logout'),
  getMe: () => api.get('/auth/me'),
  updatePassword: (passwordData) => api.put('/auth/updatepassword', passwordData),
};

export const userAPI = {
  getUsers: (params) => api.get('/users', { params }),
  getUser: (id) => api.get(`/users/${id}`),
  createUser: (userData) => api.post('/users', userData),
  updateUser: (id, userData) => api.put(`/users/${id}`, userData),
  deleteUser: (id) => api.delete(`/users/${id}`),
};

export const assetAPI = {
  getAssets: (params) => api.get('/assets', { params }),
  getAsset: (id) => api.get(`/assets/${id}`),
  createAsset: (assetData) => api.post('/assets', assetData),
  updateAsset: (id, assetData) => api.put(`/assets/${id}`, assetData),
  deleteAsset: (id) => api.delete(`/assets/${id}`),
  assignAsset: (id, userId) => api.post(`/assets/${id}/assign`, { userId }),
  unassignAsset: (id) => api.post(`/assets/${id}/unassign`),
  getAssetStats: () => api.get('/assets/stats'),
  uploadImages: (formData) => api.post('/assets/upload', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  }),
};

export const reportAPI = {
  getReports: (params) => api.get('/reports', { params }),
  getReport: (id) => api.get(`/reports/${id}`),
  generateReport: (reportData) => api.post('/reports', reportData),
  deleteReport: (id) => api.delete(`/reports/${id}`),
};

export const settingAPI = {
  getSettings: (params) => api.get('/settings', { params }),
  getSetting: (key) => api.get(`/settings/${key}`),
  createSetting: (settingData) => api.post('/settings', settingData),
  updateSetting: (key, settingData) => api.put(`/settings/${key}`, settingData),
  deleteSetting: (key) => api.delete(`/settings/${key}`),
};

export const dashboardAPI = {
  getStats: () => api.get('/dashboard/stats'),
};

export const auditAPI = {
  getAuditLogs: (params) => api.get('/audit', { params }),
};

export default api;
