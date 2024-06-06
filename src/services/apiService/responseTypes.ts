import { AccountModel } from "@/types/accountModels.ts";

export type GetAllUserResponse = AccountModel[];

export type LoginResponse = { 
    token: string;
    tokenExpire: string;
    error: any;
};