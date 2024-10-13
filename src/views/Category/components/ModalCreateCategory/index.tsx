import { useCallback, useEffect } from "react";
import { ModalForm, ProForm, ProFormText } from "@ant-design/pro-components";
import { Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";

// Src
import { CategoryItem } from "../../types/categoryModels";
import usePostCreateCategoryMutation from "../../hooks/usePostCreateCategoryMutation";
import { useAppSelector } from "@/states/hooks";
import { selectNameOfuser } from "@/states/selectors/authSelector";
import usePostUpdateCategroyMutation from "../../hooks/usePostUpdateCategroyMutation";

type FormType = {
    name: string;
};

type ModalCreateCategoryProps = {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    dataUpdate?: CategoryItem;
};

const ModalCreateCategory: React.FC<ModalCreateCategoryProps> = ({
    open,
    onOpenChange,
    dataUpdate
}) => { 
    const nameOfCurrentUser = useAppSelector(selectNameOfuser);

    const [form] = ProForm.useForm<FormType>();
    const createCategory = usePostCreateCategoryMutation();
    const updateCategory = usePostUpdateCategroyMutation();

    const handleFinish = useCallback(async ({ name }: FormType) => {
        if(!dataUpdate) {
            createCategory.mutate({
                name,
                createdBy: nameOfCurrentUser
            });
        } else {
            updateCategory.mutate({
                categoryCode: dataUpdate.categoryCode,
                id: dataUpdate.id,
                name: name,
            });
        }
        
    },[createCategory, nameOfCurrentUser, dataUpdate]);

    useEffect(() => {
        if(createCategory.status === 'success' || updateCategory.status === 'success') {
            onOpenChange(false);
        }
    }, [createCategory.status, updateCategory.status]);

    useEffect(() => {
        if(open){
            if(dataUpdate) {
                form.setFieldsValue({
                    name: dataUpdate.name
                });
            } else {
                form.resetFields();
            }
        }
    }, [open]);

    return (
        <ModalForm 
            form={form}
            onFinish={handleFinish}
            open={open} 
            onOpenChange={onOpenChange} 
            modalProps={{
                centered: true,
            }}
            trigger={
                <Button
                    type="primary" 
                    icon={<PlusOutlined />} >
                    Thêm danh mục
                </Button>
            }
            width="40%"
            loading={createCategory.isPending}
            title={dataUpdate ? 'Cập nhật thông tin danh mục' : 'Tạo mới danh mục'}
        >
            <ProFormText label="Tên danh mục" name="name" />
        </ModalForm>
    );
};

export default ModalCreateCategory;