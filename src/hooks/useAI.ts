import { useMutation } from '@tanstack/react-query';
import { aiService } from '../services/ai';

export const useGenerateContent = () => {
  return useMutation({
    mutationFn: aiService.generateContent,
  });
};

export const useGenerateConversation = () => {
  return useMutation({
    mutationFn: aiService.generateConversation,
  });
};

export const useGenerateFeedback = () => {
  return useMutation({
    mutationFn: aiService.generateFeedback,
  });
};

export const useGenerateAssessment = () => {
  return useMutation({
    mutationFn: aiService.generateAssessment,
  });
};