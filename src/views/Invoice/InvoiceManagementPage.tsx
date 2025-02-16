import { buildMetricFilter } from "@/helpers/objectHelper";
import apiService from "@/services/apiService/apiService";
import { PlusOutlined } from "@ant-design/icons";
import { ProTable } from "@ant-design/pro-components";
import { Button } from "antd";
import { useCallback } from "react";
import { NavLink } from "react-router-dom";
import useColumnsTableCategory from "./hooks/useColumnInvoice";

const InvoiceManagementPage: React.FunctionComponent = () => { 
    const request = useCallback(async ({
        current, 
        pageSize,
        orderId,
        customerName,
        customerPhone,
        customerAddress,
    }: Record<string, any>) => {
        const resp = await apiService.getListOrder({
            desc: false,
            metricFilters: buildMetricFilter({
                orderId,
                customerName,
                customerPhone,
                customerAddress,
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
            toolBarRender={() => [
                <NavLink to="/invoice/create">
                    <Button 
                        icon={<PlusOutlined />}
                        type="primary"
                        key="add_order">Tạo hoá đơn mới</Button>
                </NavLink>
            ]}
            columns={useColumnsTableCategory({})}
            request={request}
            pagination={{
                hideOnSinglePage: true
            }}
            search={{
                labelWidth: 'auto'
            }}
        />
    );
};

export default InvoiceManagementPage;