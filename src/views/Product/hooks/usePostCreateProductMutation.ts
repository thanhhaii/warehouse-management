import { useMutation, UseMutationResult } from '@tanstack/react-query';

// Src
import { CreateProductPayload, CreateProductResponse } from '../types/productModels';
import apiService from '@/services/apiService/apiService';

const usePostCreateProductMutation = (): UseMutationResult<CreateProductResponse, any, Partial<CreateProductPayload>, any> => {
    return useMutation({
        mutationFn: async (args) => {
            return apiService.createProduct(args);
        }
    });
};

export default usePostCreateProductMutation;