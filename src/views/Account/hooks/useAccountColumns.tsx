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
            formItemProps: {
                name: 'searchFullName'
            }
        },
        {
            title: 'Điện thoại',
            dataIndex: 'phone',
            align: 'center',
            formItemProps: {
                name: 'searchPhone'
            }
        },
        {
            title: 'Căn cước công dân',
            dataIndex: 'individualCard',
            search: false
        },
        {
            title: 'Địa chỉ',
            dataIndex: 'address',
            formItemProps: {
                name: 'searchAddress'
            }
        },
        {
            title: 'Email',
            dataIndex: 'email',
            formItemProps: {
                name: 'searchEmail'
            }
        },
        {
            title: 'Vai trò',
            dataIndex: 'roles',
            align: 'center',
            valueType: 'select',
            formItemProps: {
                name: 'searchRole',
            },
            valueEnum: {
                ADMIN_ROLE: {
                    text: 'ADMIN_ROLE'
                },
                STAFF_ROLE: {
                    text: 'STAFF_ROLE'
                }
            },
            renderText: (role: Role[]) => {
                return role?.[0]?.role;
            }
        },
        {
            search: false,
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
