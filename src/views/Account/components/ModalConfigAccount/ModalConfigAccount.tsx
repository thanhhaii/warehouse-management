// Vendor
import { ModalForm, ProForm, ProFormSelect, ProFormText } from "@ant-design/pro-components";
import { Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { rulesHelper } from "@/helpers/formRulesHelper.ts";
import { useEffect } from "react";

// Src
import { AccountFormModels } from "@/views/Account/models/accountFormModels.ts";

export type ModalConfigAccountProps = {
    data?: any
};

const ModalConfigAccount: React.FC<ModalConfigAccountProps> = () => {
    const [form] = ProForm.useForm<AccountFormModels>();

    useEffect(() => {
        form.resetFields();
    }, []);

    return (
        <ModalForm
            modalProps={{
                forceRender: true
            }}
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
            rowProps={{
                gutter: [24, 12]
            }}
        >
            <ProFormText
                name="id"
                placeholder="ID tài khoản"
                label="ID"
                required
                rules={[rulesHelper.requiredRule]}
                colProps={{ span: 12 }}
            />
            <ProFormText.Password
                name="password"
                placeholder="Mật khẩu"
                label="Mật khẩu"
                required
                rules={[rulesHelper.requiredRule]}
                colProps={{ span: 12 }}
            />
            <ProFormText
                name="fullname"
                placeholder="Họ và tên"
                label="Họ và tên"
                required
                rules={[rulesHelper.requiredRule]}
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
            <ProFormSelect 
                name="role"
                placeholder="Vai trò"
                label="Vai trò"
                valueEnum={undefined}
                options={[
                    { value: 'admin', label: 'Admin' },
                ]}
                required
                rules={[rulesHelper.requiredRule]}
                colProps={{ span: 12 }}
            />
        </ModalForm>
    );
};

export default ModalConfigAccount;
