export type GetListResponse<T = any> = { 
    message: string;
    data: {
        pageSize: number;
        totalItems: number;
        hasNext: boolean;
        totalPage: number;
        data: T[];
    }
};

export type GetDetailResponse<T = any> = {
    message: string;
    data: T;
};