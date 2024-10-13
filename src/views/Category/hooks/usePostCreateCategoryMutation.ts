import apiService from '@/services/apiService/apiService';
import { useMutation, UseMutationResult, useQueryClient } from '@tanstack/react-query';

import { CreateCategoryPayload, CreateCategoryFailedResponse } from '../types/categoryModels';
import { App } from 'antd';

const usePostCreateCategoryMutation = (): UseMutationResult<number, CreateCategoryFailedResponse, CreateCategoryPayload> => {
    const { message } = App.useApp();
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (args) => {
            return apiService.createCategory(args.name, args.createdBy);
        },
        onSuccess: () => {
            message.success("Tạo danh mục thành công!");
            queryClient.invalidateQueries({
                queryKey: ['getListCategoryQuery']
            });
        },
        onError: (error) => {
            message.error(`Tạo danh mục thất bại. Lỗi: ${error?.message || ''}`);
        }
    });
};

export default usePostCreateCategoryMutation;   