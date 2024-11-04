import { ProTable } from "@ant-design/pro-components";
import { productTableConfig } from "../../helpers/productTableConfig.tsx";
import { useCallback } from "react";
import apiService from "@/services/apiService/apiService.ts";
import { buildMetricFilter } from "@/helpers/objectHelper.ts";
import { Link } from "react-router-dom";
import { Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";

const ProductPage: React.FunctionComponent = () => {
    const request = useCallback(async({
        current, 
        pageSize,
        id,
        name,
        productCode,
    }: any) => { 
        const resp = await apiService.getListProduct({
            desc: false,
            metricFilters: buildMetricFilter({
                id,
                name,
                productCode,
            }),
            pageNumber: current - 1,
            pageSize: pageSize || 10,
            sortField: 'createDate'
        });
        
        return {
            data: resp?.data?.data || [],
            success: true,
            total: resp?.data?.totalItems,
        };
    }, []);

    return (
        <ProTable
            columns={productTableConfig}
            search={{  
                labelWidth: 'auto'
            }}
            rowKey="id"
            scroll={{
                x: 'max-content'
            }}
            optionsRender={(_, defaultDom) => [
                <Link to="/product/create" key="add">
                    <Button icon={<PlusOutlined />} type="primary" >
                        Thêm sản phẩm
                    </Button>
                </Link>,
                ...defaultDom,
            ]}
            pagination={{
                hideOnSinglePage: true,
                pageSize: 10,
            }}
            request={request}
        />
    );
};

export default ProductPage;
