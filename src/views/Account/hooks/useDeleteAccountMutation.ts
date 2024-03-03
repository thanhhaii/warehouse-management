import { useMutation, UseMutationResult, useQueryClient } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import apiService from "@/services/apiService/apiService.ts";

const useDeleteAccountMutation = (): UseMutationResult<AxiosResponse<string>, any, number> => {
    const queryClient = useQueryClient();

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
        }
    });
};

export default useDeleteAccountMutation;
