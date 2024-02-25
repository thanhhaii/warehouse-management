import { AccountRole } from "@/enums/accountEnums.ts";
import { Role } from "@/types/accountModels.ts";

export const defaultOptionsRole = [
    {
        label: 'ADMIN_ROLE',
        value: AccountRole.ADMIN_ROLE
    },
    {
        label: 'STAFF_ROLE',
        value: AccountRole.STAFF_ROLE
    }
];

export const dictRoleEnumToRoleData: Record<AccountRole, Role> = {
    [AccountRole.ADMIN_ROLE]: {
        role: 'ADMIN_ROLE',
        id: AccountRole.ADMIN_ROLE
    },
    [AccountRole.STAFF_ROLE]: {
        role: 'STAFF_ROLE',
        id: AccountRole.STAFF_ROLE
    }
};
