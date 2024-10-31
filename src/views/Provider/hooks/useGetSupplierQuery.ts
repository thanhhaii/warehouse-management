import apiService from "@/services/apiService/apiService";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { GetListSupplierResponse } from "../types/supplierModels";

const useGetSupplierQuery = (): UseQueryResult<GetListSupplierResponse> => { 
    return useQuery({
        queryKey: ['getSupplierQuery'],
        queryFn: () => {
            return apiService.getListSupplier<GetListSupplierResponse>();
        }
    });
};

export default useGetSupplierQuery;