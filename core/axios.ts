import axios from 'axios';

export const IMAGE_URL = process.env.NEXT_PUBLIC_IMAGE_BASE_URL;

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  timeout: 10000, // 10 seconds
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2OGFjYmE0NGRmMzQ5ZWY3Y2ZiNDA0YzIiLCJ2ZW5kb3JJZCI6IjY4YWNiYTQ0ZGYzNDllZjdjZmI0MDRiZCIsImlhdCI6MTc1NjE1MDM1MSwiZXhwIjoxNzU2MjM2NzUxfQ.VcXdsKlg-w9rKxwWkixWOPIGiHJTFOuPmlC2mpr6qLE'
  },
});

// Request interceptor
api.interceptors.request.use(
  config => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  error => Promise.reject(error)
);

// Response interceptor
api.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      console.error('Unauthorized! Redirecting...');
    }
    return Promise.reject(error);
  }
);

export default api;
