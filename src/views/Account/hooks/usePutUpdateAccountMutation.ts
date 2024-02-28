// Vendor
import { useMutation, UseMutationResult, useQueryClient } from "@tanstack/react-query";
import { AxiosResponse } from "axios";

// Src
import apiService from "@/services/apiService/apiService.ts";
import { UpdateAccountModel } from "@/views/Account/models/accountFormModels.ts";
import { AccountModel } from "@/types/accountModels.ts";

const usePostCreateAccountMutation = (): UseMutationResult<AxiosResponse<AccountModel>, any, UpdateAccountModel> => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (args: UpdateAccountModel) => {
            return apiService.updateUser(args);
        },
        mutationKey: ['updateAccountMutation'],
        onSuccess: (data) => {
            if(data.status === 200){
                queryClient.invalidateQueries({
                    queryKey: ['findAllUser']
                });
            }
        }
    });
};

export default usePostCreateAccountMutation;

