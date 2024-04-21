import { rulesHelper } from "@/helpers/formRulesHelper";
import { ProForm, ProFormDigit, ProFormGroup, ProFormMoney, ProFormSelect, ProFormText, ProFormTextArea } from "@ant-design/pro-components";
import { Content } from "antd/es/layout/layout";
import { useCallback } from "react";

const ProviderDetailPage: React.FunctionComponent = () => {
    const [form] = ProForm.useForm();

    const handleFinish = useCallback(async (value: any) => {
        console.log(value);
    }, []);

    return (
        <Content className="bg-white p-5 rounded-lg">
            <ProForm 
                onFinish={handleFinish}
                submitter={{
                    searchConfig: {
                        submitText: "Lưu thông tin"
                    }
                }}
                form={form} >
                <ProFormGroup title="Thông tin chung">
                    <ProFormText
                        label="Tên nhà cung cấp"
                        name="name"
                        required
                        width="lg"
                        rules={[rulesHelper.requiredRule]}
                    />
                    <ProFormText
                        label="Địa chỉ nhà cung cấp"
                        name="address"
                        required
                        width="xl"
                        rules={[rulesHelper.requiredRule]}
                    />
                    <ProFormText
                        label="Số điện thoại"
                        name="phone"
                        required
                        width="lg"
                        rules={[rulesHelper.requiredRule]}
                    />
                    <ProFormText
                        label="Email"
                        name="email"
                        required
                        width="lg"
                        rules={[rulesHelper.requiredRule]}
                    />
                </ProFormGroup>
                <ProFormGroup title="Thông tin sản phẩm">
                    <ProFormSelect 
                        required
                        name="productType"
                        width="lg"
                        label="Loại hàng hoá"
                        rules={[rulesHelper.requiredRule]}
                    />
                    <ProFormMoney 
                        required
                        name="price"
                        width="lg"
                        label="Giá thành"
                        locale="vi-VN"
                        rules={[rulesHelper.requiredRule]}
                    />
                    <ProFormDigit
                        name="quantity"
                        required
                        width="lg"
                        label="Số lượng"
                        rules={[rulesHelper.requiredRule]}
                    />
                    <ProFormTextArea 
                        name="description"
                        width="lg"
                        label="Mô tả sản phẩm"
                        required
                        rules={[rulesHelper.requiredRule]}
                    />
                </ProFormGroup>
            </ProForm>
        </Content>
    );
};

export default ProviderDetailPage;