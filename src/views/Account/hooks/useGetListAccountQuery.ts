import { useQuery, UseQueryResult } from "@tanstack/react-query";
import apiService from "@/services/apiService/apiService.ts";
import { GetAllUserResponse } from "@/services/apiService/responseTypes.ts";

export type GetListAccountQueryProps = {
    pageSize?: number;
    pageNumber?: number;
};

const useGetListAccountQuery = (props: GetListAccountQueryProps): UseQueryResult<GetAllUserResponse> => {
    return useQuery({
        queryKey: ['findAllUser'],
        queryFn: async () => await apiService.getUser(props),
    });
};

export default useGetListAccountQuery;
