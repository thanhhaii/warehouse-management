import { AccountRole } from "@/enums/accountEnums.ts";

export const defaultOptionsRole = [
    {
        label: 'Quản trị viên',
        value: AccountRole.ADMIN_ROLE
    },
    {
        label: 'Nhân viên',
        value: AccountRole.STAFF_ROLE
    }
];

export const dictRoleEnumToRoleData: Record<AccountRole, string> = {
    [AccountRole.ADMIN_ROLE]: 'ROLE_ADMIN',
    [AccountRole.STAFF_ROLE]: 'ROLE_USER',
};
