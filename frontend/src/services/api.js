import axios from 'axios';

// Get base URL from environment variable, fallback to localhost, and trim trailing slash
const API_BASE_URL = (import.meta.env.VITE_API_URL || 'http://localhost:8080').replace(/\/$/, "");

console.log("Portal starting... API URL:", API_BASE_URL);

if (!import.meta.env.VITE_API_URL && import.meta.env.PROD) {
  console.error("VITE_API_URL is not defined in production!");
}

const api = axios.create({
  baseURL: API_BASE_URL, // We will include /api prefix in the individual calls as requested
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for adding JWT token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('eduerp_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for handling common errors
api.interceptors.response.use(
  (response) => {
    console.debug(`API Success: ${response.config.method.toUpperCase()} ${response.config.url}`, response.data);
    return response;
  },
  (error) => {
    console.error(`API Error: ${error.config?.method?.toUpperCase()} ${error.config?.url}`, error.response?.data || error.message);
    
    if (error.response) {
      if (error.response.status === 401) {
        localStorage.removeItem('eduerp_token');
        localStorage.removeItem('eduerp_user');
        localStorage.removeItem('eduerp_role');
        if (!window.location.pathname.includes('/login')) {
          window.location.href = '/login';
        }
      }
      
      const message = error.response.data?.message || error.response.data?.error || 'An unexpected error occurred.';
      return Promise.reject(new Error(message));
    }
    return Promise.reject(new Error('Network error. Please check your connection.'));
  }
);

export default api;
