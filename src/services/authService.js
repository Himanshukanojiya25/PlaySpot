import api from './api';

export const authService = {
  async login(email, password) {
    const response = await api.post('/auth/login', { email, password });
    if (response.data.token) {
      localStorage.setItem('authToken', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }
    return response.data;
  },

  async signup(userData) {
    const response = await api.post('/auth/signup', userData);
    if (response.data.token) {
      localStorage.setItem('authToken', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }
    return response.data;
  },

  async logout() {
    try {
      await api.post('/auth/logout');
    } finally {
      localStorage.removeItem('authToken');
      localStorage.removeItem('user');
    }
  },

  async getCurrentUser() {
    const response = await api.get('/auth/me');
    return response.data;
  },

  async updateProfile(userData) {
    const response = await api.put('/auth/profile', userData);
    localStorage.setItem('user', JSON.stringify(response.data.user));
    return response.data;
  },

  getStoredUser() {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },

  getStoredToken() {
    return localStorage.getItem('authToken');
  },

  isAuthenticated() {
    return !!this.getStoredToken();
  },
};
