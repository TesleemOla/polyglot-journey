import { api } from './api';
import { Progress, VocabularyWord } from '../types';

export const progressService = {
  getUserProgress: async (): Promise<Progress[]> => {
    const response = await api.get('/progress');
    return response.data;
  },

  getProgressByLearningPath: async (learningPathId: string): Promise<Progress> => {
    const response = await api.get(`/progress/${learningPathId}`);
    return response.data;
  },

  startLearningPath: async (learningPathId: string): Promise<Progress> => {
    const response = await api.post(`/progress/start/${learningPathId}`);
    return response.data;
  },

  completeLesson: async (data: {
    learningPathId: string;
    lessonId: string;
    score?: number;
    timeSpent?: number;
    notes?: string;
  }): Promise<Progress> => {
    const response = await api.post('/progress/complete-lesson', data);
    return response.data;
  },

  submitWeeklyAssessment: async (data: {
    learningPathId: string;
    week: number;
    score: number;
    feedback?: string;
    strengths?: string[];
    areasToImprove?: string[];
  }): Promise<Progress> => {
    const response = await api.post('/progress/weekly-assessment', data);
    return response.data;
  },

  addVocabularyWord: async (data: {
    learningPathId: string;
    word: string;
    translation: string;
    mastered?: boolean;
  }): Promise<VocabularyWord[]> => {
    const response = await api.post('/progress/vocabulary', data);
    return response.data;
  },
};