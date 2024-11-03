import { ProCard, ProForm, ProFormDigit, ProFormMoney, ProFormProps, ProFormText } from "@ant-design/pro-components";
import { rulesHelper } from "@/helpers/formRulesHelper";
import FieldSelecteCategory from "@/views/Category/components/FieldSelectCategory";
import FieldSelectProvider from "@/views/Provider/components/FieldSelectProvider";
import { CreateProductPayload } from "../../types/productModels";

type FormProductPresentationProps = ProFormProps<Partial<CreateProductPayload>> & {
    cardTitle: string;
};

const FormProductPresentation: React.FC<FormProductPresentationProps> = ({
    cardTitle,
    ...props
}) => { 
    return (
        <ProCard title={cardTitle}>
            <ProForm 
                {...props}
            >
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

export default FormProductPresentation;