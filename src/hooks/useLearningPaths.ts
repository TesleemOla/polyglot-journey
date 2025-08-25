import { useQuery } from '@tanstack/react-query';
import { learningPathsService } from '../services/learningPaths';

export const useLearningPaths = (params?: { language?: string; level?: string }) => {
  return useQuery({
    queryKey: ['learningPaths', params],
    queryFn: () => learningPathsService.getAll(params),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useLearningPath = (id: string) => {
  return useQuery({
    queryKey: ['learningPath', id],
    queryFn: () => learningPathsService.getById(id),
    enabled: !!id,
  });
};