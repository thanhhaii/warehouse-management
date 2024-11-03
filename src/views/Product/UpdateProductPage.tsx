import { useNavigate, useParams } from "react-router-dom";
import FormProductPresentation from "./components/FormProductPresentation";
import { ActionEnum } from "@/enums/commonEnum";
import { useCallback } from "react";
import apiService from "@/services/apiService/apiService";
import { CreateProductPayload } from "./types/productModels";

type PageParams = {
    id: string;
    action: ActionEnum;
};

const UpdateProductPage: React.FunctionComponent = () => {
    const { id, action } = useParams<PageParams>();
    const navigate = useNavigate();

    // Handler
    const request = useCallback(async(): Promise<Partial<CreateProductPayload>> => {
        if(!id){
            navigate('/product', {
                replace: true
            });
            return {};
        }

        const resp = await apiService.getDetailProduct(id);

        return {
            categoryId: resp.data.category.id,
            name: resp.data.name,
            price: resp.data.price,
            quantity: resp.data.quantity.value,
            supplierId: resp.data.supplier.id
        };
    }, [id, navigate]);

    return (
        <FormProductPresentation 
            cardTitle={action === ActionEnum.UPDATE ? 'Cập nhật thông tin sản phẩm' : 'Chi tiết thông tin sản phẩm'} 
            request={request} 
            disabled={action === ActionEnum.VIEW}
        />
    );
};

export default UpdateProductPage;