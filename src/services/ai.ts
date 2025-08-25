import { api } from './api';
import { AIResponse } from '../types';

export const aiService = {
  generateContent: async (data: {
    prompt: string;
    language: string;
    level: string;
    contextType: string;
  }): Promise<AIResponse> => {
    const response = await api.post('/ai/generate', data);
    return response.data;
  },

  generateConversation: async (data: {
    language: string;
    level: string;
    topic: string;
    userMessage: string;
  }): Promise<AIResponse> => {
    const response = await api.post('/ai/conversation', data);
    return response.data;
  },

  generateFeedback: async (data: {
    language: string;
    level: string;
    content: string;
    contentType: string;
  }): Promise<AIResponse> => {
    const response = await api.post('/ai/feedback', data);
    return response.data;
  },

  generateAssessment: async (data: {
    language: string;
    level: string;
    week: number;
    topics: string[];
  }): Promise<AIResponse> => {
    const response = await api.post('/ai/assessment', data);
    return response.data;
  },
};