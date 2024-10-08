// Vendor
import { ModalForm, ProForm, ProFormSelect, ProFormText } from "@ant-design/pro-components";
import { rulesHelper } from "@/helpers/formRulesHelper.ts";
import { useCallback, useEffect, useState } from "react";

// Src
import { AccountFormModels, CreateAccountModel } from "@/views/Account/models/accountFormModels.ts";
import { defaultOptionsRole } from "@/views/Account/helpers/accountOptions.ts";
import usePostCreateAccountMutation from "@/views/Account/hooks/usePostCreateAccountMutation.ts";
import { AccountRole } from "@/enums/accountEnums.ts";
import { AccountModel } from "@/types/accountModels.ts";
import usePutUpdateAccountMutation from "@/views/Account/hooks/usePutUpdateAccountMutation.ts";
import Constants from "@/helpers/constVariable";
import { ActionEnum } from "@/enums/commonEnum";

export type ModalConfigAccountProps = {
    data?: AccountModel
    open: boolean;
    setOpen: (open: boolean) => void;
    action: ActionEnum;
};

const ModalConfigAccount: React.FC<ModalConfigAccountProps> = ({
    data,
    open,
    setOpen,
    action
}) => {
    // States
    const [isLoading, setLoading] = useState<boolean>(false);

    // Hooks
    const [form] = ProForm.useForm<AccountFormModels>();
    const createAccountMutation = usePostCreateAccountMutation();
    const updateAccountMutation = usePutUpdateAccountMutation();

    // Handler
    const handleFinish = useCallback(async (value: AccountFormModels)=> {
        setLoading(true);
        try {
            const payload: CreateAccountModel = {
                ...value,
                roles: [value.roles],
                username: value.phoneNumber,
                password: Constants.defaultPassword,
            };
            if(!data){
                await createAccountMutation.mutateAsync(payload);
            } else {
                await updateAccountMutation.mutateAsync({
                    ...data,
                    ...payload,
                    id: data.id,
                    roles: data.roles,
                });
            }
        } finally {
            setLoading(false);
        }
    }, [data]);

    // Effect
    useEffect(() => {
        form.resetFields();
    }, []);

    useEffect(() => {
        if(action === ActionEnum.CREATE){
            form.resetFields();
        }
    }, [action]);

    useEffect(() => {
        if(open && data){
            form.setFieldsValue({
                address: data.address,
                roles: data.roles[0]?.name,
                email: data.email,
                fullName: data.fullName,
                phoneNumber: data.phoneNumber,
                individualCard: data.individualCard,
            });
        }
    }, [open]);

    useEffect(() => {
        if(createAccountMutation.status === 'success' || updateAccountMutation.status === 'success'){
            setOpen(false);
        }
    }, [createAccountMutation.status, updateAccountMutation.status]);

    return (
        <ModalForm
            modalProps={{
                forceRender: true
            }}
            loading={isLoading}
            open={open}
            onOpenChange={setOpen}
            initialValues={{
                roles: AccountRole.STAFF_ROLE
            }}
            submitter={action === ActionEnum.VIEW ? false : {
                searchConfig: {
                    submitText: {
                        [ActionEnum.CREATE]: 'Tạo tài khoản',
                        [ActionEnum.VIEW]: 'Xem chi tiết tài khoản',
                        [ActionEnum.UPDATE]: 'Cập nhật tài khoản'
                    }[action]
                },
            }}
            title={{
                [ActionEnum.CREATE]: 'Tạo tài khoản',
                [ActionEnum.VIEW]: 'Xem chi tiết tài khoản',
                [ActionEnum.UPDATE]: 'Cập nhật tài khoản'
            }[action]}
            form={form}
            grid
            disabled={action === ActionEnum.VIEW}
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
            <ProFormText
                name="phoneNumber"
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
                name="roles"
                placeholder="Vai trò"
                label="Vai trò"
                valueEnum={AccountRole}
                options={defaultOptionsRole}
                required
                rules={[rulesHelper.requiredRule]}
                colProps={{ span: 12 }}
                disabled={action === ActionEnum.VIEW || action === ActionEnum.UPDATE}
            />
        </ModalForm>
    );
};

export default ModalConfigAccount;
