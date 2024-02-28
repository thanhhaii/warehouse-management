import { ProColumns } from "@ant-design/pro-components";
import { AccountModel, Role } from "@/types/accountModels.ts";
import ModalConfigAccount from "@/views/Account/components/ModalConfigAccount/ModalConfigAccount.tsx";

export const accountTableConfig: ProColumns<AccountModel>[] = [
    {
        title: 'STT',
        valueType: 'index',
        align: 'center',
    },
    {
        title: 'Họ và tên',
        dataIndex: 'fullName',
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
        title: 'Địa chỉ',
        dataIndex: 'address',
    },
    {
        title: 'Email',
        dataIndex: 'email',
    },
    {
        title: 'Vai trò',
        dataIndex: 'roles',
        align: 'center',
        renderText: (role: Role[]) => {
            return role?.[0]?.role;
        }
    },
    {
        title: 'Hành động',
        align: 'center',
        render: (_, entity) => {
            return (
                <ModalConfigAccount data={entity}/>
            );
        }
    }
];
