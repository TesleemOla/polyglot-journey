import { useQuery } from '@tanstack/react-query';
import { languagesService } from '../services/languages';

export const useLanguages = () => {
  return useQuery({
    queryKey: ['languages'],
    queryFn: languagesService.getAll,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useLanguage = (id: string) => {
  return useQuery({
    queryKey: ['language', id],
    queryFn: () => languagesService.getById(id),
    enabled: !!id,
  });
};