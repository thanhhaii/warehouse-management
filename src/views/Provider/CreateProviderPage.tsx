// Vendor
import { ProForm } from "@ant-design/pro-components";
import { Content } from "antd/es/layout/layout";
import { useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Src
import usePostCreateSupplierMutation from "./hooks/usePostCreateSupplierMutation";
import FormSupplierPresentation from "./components/FormSupplierPresentation";
import { FormCreateSupplier } from "./types/supplierModels";
import { useAppSelector } from "@/states/hooks";
import { selectNameOfuser } from "@/states/selectors/authSelector";

const CreateProviderPage: React.FunctionComponent = () => {
    const [form] = ProForm.useForm<FormCreateSupplier>();
    const nameOfCurrentUser = useAppSelector(selectNameOfuser);
    const createSupplierMutation = usePostCreateSupplierMutation();
    const navigate = useNavigate();

    // Handler
    const handleCreate = useCallback(async (values: FormCreateSupplier) => {
        createSupplierMutation.mutate({
            address: values.address,
            name: values.name,
            phone: values.phone,
            createdBy: nameOfCurrentUser,
        });
    }, [nameOfCurrentUser]);

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
                onFinish={handleCreate}
                loading={createSupplierMutation.isPending}
                submitter={{
                    searchConfig: {
                        submitText: 'Thêm nhà cung cấp'
                    }
                }}
                form={form}
            >
                <FormSupplierPresentation isCreate />
            </ProForm>
        </Content>
    );
};

export default CreateProviderPage;