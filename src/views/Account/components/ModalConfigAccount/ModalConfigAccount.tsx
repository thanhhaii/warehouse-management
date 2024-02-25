// Vendor
import { ModalForm, ProForm, ProFormSelect, ProFormText } from "@ant-design/pro-components";
import { Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { rulesHelper } from "@/helpers/formRulesHelper.ts";
import { useCallback, useEffect, useState } from "react";

// Src
import { AccountFormModels, CreateAccountModel } from "@/views/Account/models/accountFormModels.ts";
import { defaultOptionsRole, dictRoleEnumToRoleData } from "@/views/Account/helpers/accountOptions.ts";
import usePostCreateAccountMutation from "@/views/Account/hooks/usePostCreateAccountMutation.ts";

export type ModalConfigAccountProps = {
    data?: any
};

const ModalConfigAccount: React.FC<ModalConfigAccountProps> = () => {
    // States
    const [open, setOpen] = useState<boolean>(false);
    const [isLoading, setLoading] = useState<boolean>(false);

    // Hooks
    const [form] = ProForm.useForm<AccountFormModels>();
    const createAccountMutation = usePostCreateAccountMutation();

    // Handler
    const handleFinish = useCallback(async (value: AccountFormModels)=> {
        try {
            setLoading(true);
            const payload: CreateAccountModel = {
                ...value,
                roles: [dictRoleEnumToRoleData[value.roles]]
            };
            await createAccountMutation.mutateAsync(payload);
        } finally {
            setLoading(false);
        }
    }, []);

    // Effect
    useEffect(() => {
        form.resetFields();
    }, []);

    useEffect(() => {
        if(createAccountMutation.status === 'success'){
            setOpen(false);
        }
    }, [createAccountMutation.status]);

    return (
        <ModalForm
            modalProps={{
                forceRender: true
            }}
            loading={isLoading}
            open={open}
            onOpenChange={setOpen}
            trigger={
                <Button
                    type="primary"
                    icon={<PlusOutlined /> }
                    children="Tạo tài khoản"
                />
            }
            submitter={{
                searchConfig: {
                    submitText: 'Tạo tài khoản'
                }
            }}
            title="Tạo tài khoản mới"
            form={form}
            grid
            onFinish={handleFinish}
            rowProps={{
                gutter: [24, 12]
            }}
        >
            <ProFormText
                name="fullName"
                placeholder="Họ và tên"
                label="Họ và tên"
                required
                rules={[rulesHelper.requiredRule]}
                colProps={{ span: 12 }}
            />
            <ProFormText.Password
                name="password"
                placeholder="Mật khẩu"
                label="Mật khẩu"
                required
                rules={[rulesHelper.requiredRule, rulesHelper.passwordRule]}
                colProps={{ span: 12 }}
            />
            <ProFormText
                name="phone"
                placeholder="Số điện thoại"
                label="Số điện thoại"
                required
                rules={[rulesHelper.requiredRule]}
                colProps={{ span: 12 }}
            />
            <ProFormText
                name="individualCard"
                placeholder="CCCD/CMND"
                label="CCCD/CMND"
                required
                rules={[rulesHelper.requiredRule]}
                colProps={{ span: 12 }}
            />
            <ProFormText
                name="email"
                placeholder="example@gmail.com"
                label="Email"
                required
                rules={[rulesHelper.requiredRule, rulesHelper.typeEmail]}
                colProps={{ span: 12 }}
            />
            <ProFormText
                name="address"
                placeholder="TP. Hồ Chí Minh"
                label="Địa chỉ"
                required
                rules={[rulesHelper.requiredRule]}
                colProps={{ span: 12 }}
            />
            <ProFormSelect
                name="role"
                placeholder="Vai trò"
                label="Vai trò"
                valueEnum={undefined}
                options={defaultOptionsRole}
                required
                rules={[rulesHelper.requiredRule]}
                colProps={{ span: 12 }}
            />
        </ModalForm>
    );
};

export default ModalConfigAccount;
