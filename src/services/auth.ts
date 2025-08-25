import { api } from './api';
import { AuthResponse, User } from '../types';

export const authService = {
  register: async (userData: {
    name: string;
    email: string;
    password: string;
    nativeLanguage: string;
  }): Promise<AuthResponse> => {
    const response = await api.post('/auth/register', userData);
    return response.data;
  },

  login: async (credentials: {
    email: string;
    password: string;
  }): Promise<AuthResponse> => {
    const response = await api.post('/auth/login', credentials);
    return response.data;
  },

  getProfile: async (): Promise<User> => {
    const response = await api.get('/auth/profile');
    return response.data;
  },

  updateProfile: async (userData: Partial<User>): Promise<User> => {
    const response = await api.put('/auth/profile', userData);
    return response.data;
  },

  googleAuth: () => {
    window.location.href = `${api.defaults.baseURL}/auth/google`;
  },
};