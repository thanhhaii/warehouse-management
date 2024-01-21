import { ProColumns } from "@ant-design/pro-components";
import { AccountModel } from "../../../types/accountModels.ts";

export const accountTableConfig: ProColumns<AccountModel>[] = [
    {
        title: 'STT',
        valueType: 'index',
        align: 'center',
    },
    {
        title: 'ID',
        dataIndex: 'id',
        copyable: true
    },
    {
        title: 'Họ và tên',
        dataIndex: 'fullName'
    },
    {
        title: 'Điện thoại',
        dataIndex: 'phone',
        align: 'center'
    },
    {
        title: 'Căn cước công dân',
        dataIndex: 'individualCard'
    },
    {
        title: 'Email',
        dataIndex: 'email',
    },
    {
        title: 'Vai trò',
        dataIndex: 'role',
        align: 'center'
    }
];
