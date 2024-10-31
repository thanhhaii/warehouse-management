import { ProForm, ProFormGroup, ProFormText } from "@ant-design/pro-components";
import { Content } from "antd/es/layout/layout";
import { useCallback, useEffect, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";

// Src
import { rulesHelper } from "@/helpers/formRulesHelper";
import { FormCreateSupplier, GetDetailSupplierResponse } from "./types/supplierModels";
import usePostCreateSupplierMutation from "./hooks/usePostCreateSupplierMutation";
import { useAppSelector } from "@/states/hooks";
import { selectNameOfuser } from "@/states/selectors/authSelector";
import apiService from "@/services/apiService/apiService";

const ProviderDetailPage: React.FunctionComponent = () => {
    const nameOfCurrentUser = useAppSelector(selectNameOfuser);

    const { id } = useParams<{id: string}>();
    console.log({ id });
    const [form] = ProForm.useForm<FormCreateSupplier>();
    const createSupplierMutation = usePostCreateSupplierMutation();
    const navigate = useNavigate();
    
    const isCreate = useMemo(() => !id || id === 'create', [id]);

    // Handler
    const handleFinish = useCallback(async (value: FormCreateSupplier) => {
        createSupplierMutation.mutate({
            address: value.address,
            name: value.name,
            phone: value.phone,
            createdBy: nameOfCurrentUser,
        });
    }, [nameOfCurrentUser]);

    const request = useCallback(async (): Promise<FormCreateSupplier> => {
        if(!id || id === 'create') return {
            address: '',
            createdBy: '',
            name: '',
            phone: ''
        };

        const resp = await apiService.getDetailSupplier<GetDetailSupplierResponse>(id);
        return resp.data;
    }, [id]);

    // Effect
    useEffect(() => {
        if(createSupplierMutation.status === 'success'){
            navigate('/provider', {
                replace: true
            });
        }
    }, [createSupplierMutation.status]);

    return (
        <Content className="bg-white p-5 rounded-lg">
            <ProForm 
                request={request}
                onFinish={handleFinish}
                submitter={!isCreate  ? false : {
                    searchConfig: {
                        submitText: "Lưu thông tin"
                    }
                }}
                disabled={!isCreate}
                form={form} >
                <ProFormGroup title="Thông tin chung">
                    <ProFormText
                        label="Tên nhà cung cấp"
                        placeholder="Tên nhà cung cấp"
                        name="name"
                        required
                        width="lg"
                        rules={[rulesHelper.requiredRule]}
                    />
                    <ProFormText
                        label="Địa chỉ nhà cung cấp"
                        placeholder="Địa chỉ nhà cung cấp"
                        name="address"
                        required
                        width="xl"
                        rules={[rulesHelper.requiredRule]}
                    />
                    <ProFormText
                        label="Số điện thoại"
                        placeholder="Số điện thoại"
                        name="phone"
                        required
                        width="lg"
                        rules={[rulesHelper.requiredRule]}
                    />
                    {/* <ProFormText
                        label="Email"
                        name="email"
                        required
                        width="lg"
                        rules={[rulesHelper.requiredRule]}
                    /> */}
                </ProFormGroup>
                {/* <ProFormGroup title="Thông tin sản phẩm">
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
                </ProFormGroup> */}
            </ProForm>
        </Content>
    );
};

export default ProviderDetailPage;