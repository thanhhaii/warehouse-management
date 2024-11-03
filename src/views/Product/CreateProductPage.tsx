import { ProForm } from "@ant-design/pro-components";
import { useCallback } from "react";
import { App } from "antd";
import { useNavigate } from "react-router-dom";

// Src
import usePostCreateProductMutation from "./hooks/usePostCreateProductMutation";
import { CreateProductPayload } from "./types/productModels";
import FormProductPresentation from "./components/FormProductPresentation";

const CreateProductPage: React.FunctionComponent = () => {
    const { notification } = App.useApp();
    const [form] = ProForm.useForm<CreateProductPayload>();
    const createProductMutation = usePostCreateProductMutation();
    const navigate = useNavigate();

    // Handler
    const handleCreateProduct = useCallback(async(values: Partial<CreateProductPayload>) => { 
        const resp = await createProductMutation.mutateAsync(values);
        if(resp.message === 'Product is created'){
            navigate('/product');
        }
    }, [createProductMutation, navigate]);

    const handleCreateProductFailed = useCallback(() => { 
        notification.error({
            message: 'Không thể tạo sản phẩm',
            description: 'Đã xảy ra lỗi trong quá trình tạo sản phẩm. Vui lòng thử lại sau.'
        });
    }, []);
    
    return (
        <FormProductPresentation 
            cardTitle="Tạo sản phẩm"
            loading={createProductMutation.isPending}
            onFinish={handleCreateProduct}
            onFinishFailed={handleCreateProductFailed}
            form={form}
            submitter={{
                searchConfig: {
                    resetText: 'Điền lại',
                    submitText: 'Tạo sản phẩm'
                },
                render(_, dom) {
                    return (
                        <div className="mt-2 flex gap-4">{dom}</div>
                    );
                },
            }} 
        />
    );
};

export default CreateProductPage;