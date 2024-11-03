import { ProCard, ProForm, ProFormDigit, ProFormMoney, ProFormText } from "@ant-design/pro-components";
import FieldSelecteCategory from "../Category/components/FieldSelectCategory";
import FieldSelectProvider from "../Provider/components/FieldSelectProvider";
import { rulesHelper } from "@/helpers/formRulesHelper";
import usePostCreateProductMutation from "./hooks/usePostCreateProductMutation";
import { useCallback } from "react";
import { CreateProductPayload } from "./types/productModels";
import { App } from "antd";
import { useNavigate } from "react-router-dom";

const CreateProductPage: React.FunctionComponent = () => {
    const { notification } = App.useApp();
    const [form] = ProForm.useForm<CreateProductPayload>();
    const createProductMutation = usePostCreateProductMutation();
    const navigate = useNavigate();


    // Handler
    const handleCreateProduct = useCallback(async(values: CreateProductPayload) => { 
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
        <ProCard title="Tạo sản phẩm">
            <ProForm 
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
                }}>
                <ProForm.Group>
                    <ProFormText 
                        name="name" 
                        label="Tên sản phẩm" 
                        placeholder="Tên sản phẩm"
                        required
                        rules={[
                            rulesHelper.requiredRule
                        ]}
                        width="lg"
                    />
                    <ProFormMoney 
                        name="price"
                        label="Giá tiền"
                        placeholder="Giá tiền"
                        required
                        width="lg"
                        rules={[
                            rulesHelper.requiredRule
                        ]}
                    />
                    <ProFormDigit 
                        name="quantity"
                        label="Số lượng"
                        placeholder="Số lượng"
                        required
                        width="lg"
                        rules={[
                            rulesHelper.requiredRule
                        ]}
                    />
                    
                </ProForm.Group>
                <ProForm.Group>
                    <FieldSelecteCategory
                        name="categoryId"
                        label="Danh mục"
                        placeholder="Danh mục"
                        required
                        width="lg"
                        rules={[
                            rulesHelper.requiredRule
                        ]}
                    />
                    <FieldSelectProvider
                        name="supplierId"
                        label="Nhà cung cấp"
                        placeholder="Nhà cung cấp"
                        required
                        width="lg" 
                        rules={[
                            rulesHelper.requiredRule
                        ]}
                    />
                </ProForm.Group>
            </ProForm>
        </ProCard>
    );
};

export default CreateProductPage;