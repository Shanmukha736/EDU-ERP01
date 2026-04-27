import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
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
  (response) => response,
  (error) => {
    if (error.response) {
      // Handle 401 Unauthorized errors (token expired, etc.)
      if (error.response.status === 401) {
        localStorage.removeItem('eduerp_token');
        localStorage.removeItem('eduerp_user');
        localStorage.removeItem('eduerp_role');
        window.location.href = '/login';
      }
      
      const message = error.response.data?.message || 'An unexpected error occurred.';
      return Promise.reject(new Error(message));
    }
    return Promise.reject(new Error('Network error. Please check your connection.'));
  }
);

export default api;
