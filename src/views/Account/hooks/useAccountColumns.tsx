import { AccountModel, Role } from "@/types/accountModels.ts";
import { ProColumns } from "@ant-design/pro-components";
import useDeleteAccountMutation from "@/views/Account/hooks/useDeleteAccountMutation.ts";
import { Button, Popconfirm, Space } from "antd";
import { DeleteOutlined, EditOutlined, EyeInvisibleOutlined } from "@ant-design/icons";
import { AccountRole } from "@/enums/accountEnums";

type ColumnsProps = { 
    onView: (data: AccountModel) => void;
    onUpdate: (data: AccountModel) => void;
};

const useAccountColumns = ({
    onView,
    onUpdate
}: ColumnsProps): ProColumns<AccountModel>[] => {
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
            dataIndex: 'phoneNumber',
            align: 'center',
            formItemProps: {
                name: 'searchPhone'
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
                    text: AccountRole.ADMIN_ROLE
                },
                STAFF_ROLE: {
                    text: AccountRole.STAFF_ROLE
                }
            },
            renderText: (role: Role[]) => {
                console.log({ role });
                return {
                    [AccountRole.ADMIN_ROLE]: 'Quản trị viên',
                    [AccountRole.STAFF_ROLE]: 'Nhân viên',
                }[role[0].name];
            }
        },
        {
            search: false,
            title: 'Hành động',
            align: 'center',
            render: (_, entity) => {
                return (
                    <Space>
                        <Button
                            type="primary"
                            icon={<EditOutlined /> }
                            ghost
                            onClick={() => onUpdate(entity)}
                        />
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
                        <Button
                            type="primary"
                            icon={<EyeInvisibleOutlined /> }
                            ghost
                            onClick={() => onView(entity)}
                        />
                    </Space>
                );
            }
        }
    ];
};

export default useAccountColumns;
