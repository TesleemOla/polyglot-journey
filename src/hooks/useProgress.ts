import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { progressService } from '../services/progress';

export const useUserProgress = () => {
  return useQuery({
    queryKey: ['userProgress'],
    queryFn: progressService.getUserProgress,
  });
};

export const useProgressByLearningPath = (learningPathId: string) => {
  return useQuery({
    queryKey: ['progress', learningPathId],
    queryFn: () => progressService.getProgressByLearningPath(learningPathId),
    enabled: !!learningPathId,
  });
};

export const useStartLearningPath = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: progressService.startLearningPath,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userProgress'] });
      queryClient.invalidateQueries({ queryKey: ['progress'] });
    },
  });
};

export const useCompleteLesson = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: progressService.completeLesson,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userProgress'] });
      queryClient.invalidateQueries({ queryKey: ['progress'] });
    },
  });
};

export const useSubmitWeeklyAssessment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: progressService.submitWeeklyAssessment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userProgress'] });
      queryClient.invalidateQueries({ queryKey: ['progress'] });
    },
  });
};

export const useAddVocabularyWord = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: progressService.addVocabularyWord,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['progress'] });
    },
  });
};