export type GetAllUserRequest = {
    pageNumber: number
    pageSize: number
};

export type LoginRequest = {
    username: string;
    password: string;
};

export type GetListFilterPayload = {
    sortField: string;
    desc: boolean;
    pageSize: number;
    pageNumber: number; // start with 0
    metricFilters: {
        filterField: string;
        value: string;
    }[];
};

export type ChangePasswordPayload = {
    userName: string
    oldPassword: string
    newPassword: string
};