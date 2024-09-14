import { AccountModel } from "@/types/accountModels.ts";

export type AccountFormModels = Omit<AccountModel, 'id' | 'roles'> & {
    roles: string;
};
export type CreateAccountModel = Omit<AccountModel, 'id' | 'roles'> & {
    roles: string[];
};
export type UpdateAccountModel = Omit<AccountModel, 'password' | 'roles'> & {
    roles: string[];
};
