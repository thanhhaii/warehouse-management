import { ProColumns } from "@ant-design/pro-components";
import { ProductModel } from "../types/productModels.ts";

export const productTableConfig: ProColumns<ProductModel>[] = [
    {
        title: 'Index',
        valueType: 'index',
        align: 'center'
    },
    {
        title: 'ID',
        dataIndex: 'id'
    },
    {
        title: 'Tên sản phẩm',
        dataIndex: 'name'
    },
    {
        title: 'Số lượng',
        dataIndex: 'quantity',
    },
    {
        title: 'Giá',
        dataIndex: 'price'
    },
    {
        title: 'Nhà cung cấp',
        dataIndex: 'provider',
    },
    {
        title: 'Màu sắc',
        dataIndex: 'color'
    },
    {
        title: 'Mô tả',
        dataIndex: 'description'
    },
    {
        title: 'Ngày tạo',
        dataIndex: 'createdYear'
    }
];
