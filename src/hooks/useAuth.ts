import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { authService } from '../services/auth';
import { AuthResponse, User } from '../types';

export const useAuth = () => {
  const queryClient = useQueryClient();
  const token = localStorage.getItem('token');

  const { data: user, isLoading, error } = useQuery({
    queryKey: ['user'],
    queryFn: authService.getProfile,
    enabled: !!token,
    retry: false,
  });

  const loginMutation = useMutation({
    mutationFn: authService.login,
    onSuccess: (data: AuthResponse) => {
      localStorage.setItem('token', data.token);
      queryClient.setQueryData(['user'], data);
      queryClient.invalidateQueries({ queryKey: ['user'] });
    },
  });

  const registerMutation = useMutation({
    mutationFn: authService.register,
    onSuccess: (data: AuthResponse) => {
      localStorage.setItem('token', data.token);
      queryClient.setQueryData(['user'], data);
      queryClient.invalidateQueries({ queryKey: ['user'] });
    },
  });

  const updateProfileMutation = useMutation({
    mutationFn: authService.updateProfile,
    onSuccess: (data: User) => {
      queryClient.setQueryData(['user'], data);
    },
  });

  const logout = () => {
    localStorage.removeItem('token');
    queryClient.setQueryData(['user'], null);
    queryClient.clear();
  };

  return {
    user,
    isLoading,
    error,
    isAuthenticated: !!user && !!token,
    login: loginMutation.mutateAsync,
    register: registerMutation.mutateAsync,
    updateProfile: updateProfileMutation.mutateAsync,
    logout,
    loginLoading: loginMutation.isPending,
    registerLoading: registerMutation.isPending,
    updateLoading: updateProfileMutation.isPending,
  };
};