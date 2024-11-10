import { useMutation, UseMutationResult } from '@tanstack/react-query';

import { UpdateSupplierPayload } from '../types/supplierModels';
import apiService from '@/services/apiService/apiService';

const usePatchUpdateSupplierMutation = (): UseMutationResult<any, any, UpdateSupplierPayload, any> => {
    return useMutation({
        mutationFn: async (args) => {
            return apiService.updateSupplier(args);
        }
    });
};

export default usePatchUpdateSupplierMutation;