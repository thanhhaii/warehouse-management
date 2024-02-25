import { AccountModel } from "@/types/accountModels.ts";
import { AccountRole } from "@/enums/accountEnums.ts";

export type AccountFormModels = Omit<AccountModel, 'id' | 'roles'> & {
    roles: AccountRole
};
export type CreateAccountModel = Omit<AccountModel, 'id'>;
