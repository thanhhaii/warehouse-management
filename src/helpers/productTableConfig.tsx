import { ProColumns } from "@ant-design/pro-components";
import { ProductItem } from "@/views/Product/types/productModels.ts";
import { formatConcurrency, formatTime } from "./numberHelper";
import { Button, Space, Typography } from "antd";
import { EditOutlined } from "@ant-design/icons";

export const productTableConfig: ProColumns<ProductItem>[] = [
    {
        title: 'ID',
        dataIndex: 'id',
        copyable: true,
        render: (_, {  id }) => { 
            return <Typography.Paragraph ellipsis={{
                rows: 1,
            }} className="w-40 !mb-0" copyable>
                {id}
            </Typography.Paragraph>;
        }
    },
    {
        title: 'Tên sản phẩm',
        dataIndex: 'name',
        copyable: true,
    },
    {
        title: 'Mã sản phẩm',
        dataIndex: 'productCode',
        copyable: true,
    },
    {
        title: 'Số lượng',
        dataIndex: ['quantity', 'value'],
        align: 'right',
        search: false,
    },
    {
        title: 'Giá',
        dataIndex: 'price',
        renderText: (value) => formatConcurrency(value || 0),
        align: 'right',
        search: false,
    },
    {
        title: 'Danh mục',
        dataIndex: ['category', 'name']
    },
    {
        title: 'Nhà cung cấp',
        dataIndex: ['supplier', 'name']
    },
    {
        title: 'Ngày tạo',
        dataIndex: 'createDate',
        align: 'center',
        renderText: (value) => formatTime(value),
        search: false,
    },
    {
        title: 'Hành động',
        dataIndex: '',
        fixed: 'right',
        width: 100,
        align: 'center',
        search: false,
        render: () => (
            <Space> 
                <Button icon={<EditOutlined />} className="border-none" />
            </Space>
        )
    }
];
