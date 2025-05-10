import { AccountModel } from "@/types/accountModels.ts";

export type GetAllUserResponse = AccountModel[];

export type LoginResponse = {
    token: string;
    tokenExpire: string;
    error: any;
};

export type ResponseBase<T = any> = {
    message: string;
    data: T;
};

export type GetListResponseBase<T = any> = {
    message: string;
    data: {
        data: T[];
        pageSize: number;
        totalItems: number;
        hasNext: boolean;
        totalPage: number;
    }
};

export type GetUserProfileResponse = Pick<AccountModel, 'username' | 'fullName' | 'phoneNumber' | 'individualCard' | 'email'  | 'active' | 'address'>;