import { useMutation, UseMutationResult, useQueryClient } from '@tanstack/react-query';
import { CreateSupplierPayload } from '../types/supplierModels';
import apiService from '@/services/apiService/apiService';

const usePostCreateSupplierMutation = (): UseMutationResult<any, any, CreateSupplierPayload, any> => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (args) => {
            return apiService.createSupplier<CreateSupplierPayload>(args);
        }, 
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['getSupplierQuery']
            });
        }
    });
};

export default usePostCreateSupplierMutation;