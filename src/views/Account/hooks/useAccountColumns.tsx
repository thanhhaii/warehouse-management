import { AccountModel, Role } from "@/types/accountModels.ts";
import ModalConfigAccount from "@/views/Account/components/ModalConfigAccount/ModalConfigAccount.tsx";
import { ProColumns } from "@ant-design/pro-components";
import useDeleteAccountMutation from "@/views/Account/hooks/useDeleteAccountMutation.ts";
import { Button, Popconfirm, Space } from "antd";
import { DeleteOutlined } from "@ant-design/icons";

const useAccountColumns = (): ProColumns<AccountModel>[] => {
    const deleteAccountMutation = useDeleteAccountMutation();

    return [
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
                    <Space>
                        <ModalConfigAccount data={entity}/>
                        <Popconfirm
                            title="Xoá tài khoản"
                            description="Bạn có chắc chắn muốn xoá tài khoản này không?"
                            okText="Xác nhận"
                            cancelText="Huỷ"
                            onConfirm={() => deleteAccountMutation.mutateAsync(entity.id)}
                        >
                            <Button
                                danger
                                ghost
                                icon={<DeleteOutlined />}
                            />
                        </Popconfirm>
                    </Space>
                );
            }
        }
    ];
};

export default useAccountColumns;
