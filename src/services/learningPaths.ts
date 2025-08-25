import { api } from './api';
import { LearningPath } from '../types';

export const learningPathsService = {
  getAll: async (params?: { language?: string; level?: string }): Promise<LearningPath[]> => {
    const response = await api.get('/learning-paths', { params });
    return response.data;
  },

  getById: async (id: string): Promise<LearningPath> => {
    const response = await api.get(`/learning-paths/${id}`);
    return response.data;
  },
};