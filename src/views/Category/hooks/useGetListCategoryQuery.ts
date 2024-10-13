import { useQuery, UseQueryResult } from '@tanstack/react-query';

import { GetListCategoryResponse } from '../types/categoryModels';
import apiService from '@/services/apiService/apiService';

const useGetListCategoryQuery = (searchName?: string): UseQueryResult<GetListCategoryResponse> => { 
    return useQuery({
        queryKey: ['getListCategoryQuery', searchName],
        queryFn: () => apiService.getListCategory<GetListCategoryResponse>(searchName)
    });
};

export default useGetListCategoryQuery;