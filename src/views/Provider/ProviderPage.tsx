// Vendor
import { ProTable } from "@ant-design/pro-components";
import { NavLink, useNavigate } from "react-router-dom";
import { Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";

// Src
import useColumnsTableProvider from "./hooks/useColumnsTableProvider";
import useGetSupplierQuery from "./hooks/useGetSupplierQuery";
import { useCallback } from "react";
import apiService from "@/services/apiService/apiService";
import { GetListSupplierResponse } from "./types/supplierModels";

const ProviderPage: React.FunctionComponent = () => {
    const navigate = useNavigate();
    const getSupplierQuery = useGetSupplierQuery();    

    const handleUpdateSupplier = useCallback((supplierID: string) => { 
        navigate(`/provider/${supplierID}/update`);
    }, []);

    const request = useCallback(async (param: any) => {
        console.log({ param });
        const resp = await apiService.getListSupplier<GetListSupplierResponse>(param?.filter);

        return {
            data: resp.data || [],
            success: true
        };
    }, []);

    return (
        <ProTable 
            request={request}
            columns={useColumnsTableProvider({
                onUpdateSupplier: handleUpdateSupplier
            })}
            rowKey="id"
            loading={getSupplierQuery.isFetching}
            size="small"
            options={{
                density: false,
                setting: false,
            }}
            scroll={{
                x: "max-content"
            }}
            pagination={{
                defaultPageSize: 10,
                pageSize: 10,
                hideOnSinglePage: true,
                showTotal(total, range) {
                    return `${range[0]}-${range[1]} trên ${total} nhà cung cấp`;
                },
            }}
            search={{
                labelWidth: 'auto'
            }}
            toolBarRender={() => [
                <NavLink to="/provider/create" >
                    <Button 
                        icon={<PlusOutlined />}
                        children="Thêm nhà cung cấp" 
                        type="primary"
                    />
                </NavLink>
            ]}
        />
    );
};

export default ProviderPage;