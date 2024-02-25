// Vendor
import { useMutation, UseMutationResult, useQueryClient } from "@tanstack/react-query";
import { AxiosResponse } from "axios";

// Src
import apiService from "@/services/apiService/apiService.ts";
import { CreateAccountModel } from "@/views/Account/models/accountFormModels.ts";

const usePostCreateAccountMutation = (): UseMutationResult<AxiosResponse<string>, any, CreateAccountModel> => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (args: CreateAccountModel) => {
            return apiService.createUser(args);
        },
        mutationKey: ['createAccountMutation'],
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

