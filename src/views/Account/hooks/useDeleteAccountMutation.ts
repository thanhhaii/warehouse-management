import { useMutation, UseMutationResult, useQueryClient } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import apiService from "@/services/apiService/apiService.ts";
import { App } from "antd";

const useDeleteAccountMutation = (): UseMutationResult<AxiosResponse<string>, any, number> => {
    const queryClient = useQueryClient();
    const { message } = App.useApp();

    return useMutation({
        mutationFn: (accountId: number) => {
            return apiService.deleteUser(accountId);
        },
        onSuccess: (data) => {
            if(data.status === 200){
                queryClient.invalidateQueries({
                    queryKey: ['findAllUser']
                });
            }
        },
        onError: () => {
            message.error('Có lỗi xảy ra khi xoá tài khoản.');
        }
    });
};

export default useDeleteAccountMutation;
