import { ProFormGroup, ProFormText } from "@ant-design/pro-components";

// Src
import { rulesHelper } from "@/helpers/formRulesHelper";

type FormSupplierPresentationProps = {
    isCreate?: boolean;
};

const FormSupplierPresentation: React.FC<FormSupplierPresentationProps> = ({
    isCreate = false,
}) => {
    return (
        <ProFormGroup title="Thông tin chung">
            <ProFormText
                label="Tên nhà cung cấp"
                placeholder="Tên nhà cung cấp"
                name="name"
                required
                width="xl"
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
                width="xl"
                rules={[rulesHelper.requiredRule]}
            />
            {!isCreate && (
                <ProFormText 
                    label="Mã nhà cung cấp"
                    width="xl"
                    name="code"
                    required
                    readonly
                />
            )}
        </ProFormGroup>
    );
};

export default FormSupplierPresentation;