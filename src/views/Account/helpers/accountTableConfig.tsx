import { ProColumns } from "@ant-design/pro-components";
import { AccountModel } from "../../../types/accountModels.ts";

export const accountTableConfig: ProColumns<AccountModel>[] = [
    {
        title: 'STT',
        valueType: 'index',
        align: 'center'
    },
    {
        title: 'ID',
        dataIndex: 'id'
    },
    {
        title: 'Họ và tên',
        dataIndex: 'fullName'
    },
    {
        title: 'Điện thoại',
        dataIndex: 'phone',
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
        dataIndex: 'role'
    }
];
