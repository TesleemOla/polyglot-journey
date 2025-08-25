import { api } from './api';
import { Language } from '../types';

export const languagesService = {
  getAll: async (): Promise<Language[]> => {
    const response = await api.get('/languages');
    return response.data;
  },

  getById: async (id: string): Promise<Language> => {
    const response = await api.get(`/languages/${id}`);
    return response.data;
  },
};