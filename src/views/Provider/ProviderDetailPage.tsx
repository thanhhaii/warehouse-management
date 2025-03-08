import { ProForm } from "@ant-design/pro-components";
import { Content } from "antd/es/layout/layout";
import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

// Src
import { GetDetailSupplierResponse, SupplierModel } from "./types/supplierModels";
import { useAppSelector } from "@/states/hooks";
import { selectNameOfUser } from "@/states/selectors/authSelector";
import apiService from "@/services/apiService/apiService";
import { ActionEnum } from "@/enums/commonEnum";
import FormSupplierPresentation from "./components/FormSupplierPresentation";
import usePatchUpdateSupplierMutation from "./hooks/usePatchUpdateSupplierMutation";
import { App } from "antd";

const ProviderDetailPage: React.FunctionComponent = () => {
    const { id, action } = useParams<{id: string, action: ActionEnum}>();
    const { notification } = App.useApp();
    const [initData, setInitData] = useState<SupplierModel>();
    const nameOfCurrentUser = useAppSelector(selectNameOfUser);
    const [form] = ProForm.useForm<Partial<SupplierModel>>();
    const navigate = useNavigate();
    const updateSupplierMutation = usePatchUpdateSupplierMutation();
    
    // Handler
    const handleFinish = useCallback(async (values: Partial<SupplierModel>) => {    
        if(!initData){
            return;
        }
        updateSupplierMutation.mutate({
            id: initData.id,
            code: values.code || initData.code,
            address: values.address || initData.address,
            phone: values.phone || initData.phone,
            name: values.code || initData.name,
        });
    }, [nameOfCurrentUser, initData]);

    const request = useCallback(async (): Promise<Partial<SupplierModel>> => {
        if(!id) return {};

        const resp = await apiService.getDetailSupplier<GetDetailSupplierResponse>(id);
        setInitData(resp.data);
        return resp.data;
    }, [id]);

    // Effect
    useEffect(() => {
        if(!id || updateSupplierMutation.status === 'success'){
            navigate('/provider', {
                replace: true
            });
            notification.success({
                message: 'Thành công',
                description: 'Cập nhật thông tin nhà cung cấp thành công!'
            });
        }
    }, [id, updateSupplierMutation.status]);

    return (
        <Content className="bg-white p-5 rounded-lg">
            <ProForm 
                request={request}
                onFinish={handleFinish}
                disabled={action === ActionEnum.VIEW}
                loading={updateSupplierMutation.isPending}
                submitter={action === ActionEnum.VIEW ? false : {
                    searchConfig: {
                        submitText: "Cập nhật thông tin"
                    },
                    resetButtonProps: false
                }}
                form={form} >
                <FormSupplierPresentation />
            </ProForm>
        </Content>
    );
};

export default ProviderDetailPage;