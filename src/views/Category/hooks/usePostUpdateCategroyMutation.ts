import { useMutation, UseMutationResult, useQueryClient } from '@tanstack/react-query';
import { UpdateCategoryFailedResponse, UpdateCategoryPayload } from '../types/categoryModels';
import apiService from '@/services/apiService/apiService';
import { App } from 'antd';

const usePostUpdateCategroyMutation = (): UseMutationResult<any, UpdateCategoryFailedResponse, UpdateCategoryPayload, any> => {
    const queryClient = useQueryClient();
    const { message } = App.useApp();

    return useMutation({
        mutationFn: async (args) => {
            return apiService.updateCategory(args);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['getListCategoryQuery']
            });
            message.success('Cập nhật danh mục thành công!');
        },
        onError: (error) => {
            message.error(`Cập nhật danh mục thất bại. Lỗi: ${error?.message || ''}`);
        }
    });
};

export default usePostUpdateCategroyMutation;