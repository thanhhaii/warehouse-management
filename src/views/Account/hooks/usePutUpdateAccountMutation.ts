// Vendor
import { useMutation, UseMutationResult, useQueryClient } from "@tanstack/react-query";
import { AxiosResponse } from "axios";

// Src
import apiService from "@/services/apiService/apiService.ts";
import { UpdateAccountModel } from "@/views/Account/models/accountFormModels.ts";
import { AccountModel } from "@/types/accountModels.ts";
import { App } from "antd";

const usePostCreateAccountMutation = (): UseMutationResult<AxiosResponse<AccountModel>, any, UpdateAccountModel> => {
    const queryClient = useQueryClient();
    const { message } = App.useApp();

    return useMutation({
        mutationFn: (args: UpdateAccountModel) => {
            return apiService.updateUser(args);
        },
        mutationKey: ['updateAccountMutation'],
        onSuccess: (data) => {
            message.info('Cập nhật thông tin tài khoản thành công!');
            if(data.status === 200){
                queryClient.invalidateQueries({
                    queryKey: ['findAllUser']
                });
            }
        }
    });
};

export default usePostCreateAccountMutation;

