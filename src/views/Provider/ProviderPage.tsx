// Vendor
import { ProTable } from "@ant-design/pro-components";
import { NavLink, useNavigate } from "react-router-dom";
import { Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";

// Src
import useColumnsTableProvider from "./hooks/useColumnsTableProvider";
import { useCallback } from "react";
import apiService from "@/services/apiService/apiService";
import { GetListSupplierResponse } from "./types/supplierModels";
import { buildMetricFilter } from "@/helpers/objectHelper";
import { ActionEnum } from "@/enums/commonEnum";

const ProviderPage: React.FunctionComponent = () => {
    const navigate = useNavigate();

    const handleUpdateSupplier = useCallback((supplierID: string) => {
        navigate(`/provider/${supplierID}/${ActionEnum.UPDATE}`);
    }, []);

    const handleViewSupplier = useCallback((supplierID: string) => {
        navigate(`/provider/${supplierID}/${ActionEnum.VIEW}`);
    }, []);

    const request = useCallback(async ({ current, pageSize, id, code, name, phone }: any) => {
        const resp = await apiService.getListSupplier<GetListSupplierResponse>({
            desc: false,
            metricFilters: buildMetricFilter({
                id,
                code,
                name,
                phone
            }),
            pageNumber: current - 1,
            pageSize: pageSize || 10,
            sortField: 'createDate'
        });

        return {
            data: resp.data.data || [],
            success: true
        };
    }, []);

    return (
        <ProTable
            request={request}
            columns={useColumnsTableProvider({
                onUpdateSupplier: handleUpdateSupplier,
                onViewSupplier: handleViewSupplier
            })}
            rowKey="id"
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
                <NavLink to="/provider/create"
                    key="create"
                >
                    <Button
                        icon={<PlusOutlined />}
                        type="primary"
                    >
                        Thêm nhà cung cấp
                    </Button>
                </NavLink>
            ]}
        />
    );
};

export default ProviderPage;