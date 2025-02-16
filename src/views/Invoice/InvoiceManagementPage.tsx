import { buildMetricFilter } from "@/helpers/objectHelper";
import apiService from "@/services/apiService/apiService";
import { PlusOutlined } from "@ant-design/icons";
import { ProTable } from "@ant-design/pro-components";
import { Button } from "antd";
import { useCallback } from "react";
import { NavLink } from "react-router-dom";

const InvoiceManagementPage: React.FunctionComponent = () => { 
    const request = useCallback(async ({
        current, 
        pageSize,
    }: Record<string, any>) => {
        const resp = await apiService.getListOrder({
            desc: false,
            metricFilters: buildMetricFilter({}),
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
            request={request} />
    );
};

export default InvoiceManagementPage;