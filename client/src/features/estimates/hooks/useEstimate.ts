import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '../../../api/client';
import type { Estimate } from '../types';


const fetchEstimates = async (): Promise<Estimate[]> => {
  const response = await apiClient.get<Estimate[]>('/estimates');
  return response.data;
};

const createEstimate = async (newEstimate: { title: string }) => {
  const payload = { ...newEstimate, items: [] };
  const response = await apiClient.post<Estimate>('/estimates', payload);
  return response.data;
};

const deleteEstimate = async (id: string) => {
  const response = await apiClient.delete(`/estimates/${id}`);
  return response.data;
};


export const useEstimates = () => {
  const queryClient = useQueryClient();

  const estimatesQuery = useQuery({
    queryKey: ['estimates'],
    queryFn: fetchEstimates,
  });

  const createMutation = useMutation({
    mutationFn: createEstimate,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['estimates'] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteEstimate,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['estimates'] });
    },
  });

  return {
    estimates: estimatesQuery.data || [],
    isLoading: estimatesQuery.isLoading,
    isError: estimatesQuery.isError,
    
    createEstimate: createMutation.mutate,
    isCreating: createMutation.isPending,
    
    deleteEstimate: deleteMutation.mutate,
    isDeleting: deleteMutation.isPending,
  };
};