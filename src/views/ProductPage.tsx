import { ProTable } from "@ant-design/pro-components";
import { productTableConfig } from "../helpers/productTableConfig.tsx";

const ProductPage: React.FunctionComponent = () => {
    return (
        <ProTable
            columns={productTableConfig}
            search={{
                labelWidth: 'auto'
            }}
        />
    );
};

export default ProductPage;
