import { Button } from 'antd';
import { ProColumns } from "@ant-design/pro-components";
import { InvoiceModel } from "../types/invoiceModel";
import { EyeOutlined } from '@ant-design/icons';
import { NavLink } from 'react-router-dom';

type ColumnsType = (props: any) => ProColumns<InvoiceModel>[];

const useColumnsTableCategory: ColumnsType = () => [
    {
        valueType: 'indexBorder',
        title: 'STT',
        align: 'center',
    },
    {
        title: 'Mã hoá đơn',
        copyable: true,
        dataIndex: 'orderId'
    },
    {
        title: 'Tên khách hàng',
        dataIndex: 'customerName'
    },
    {
        title: 'Số điện thoại',
        dataIndex: 'customerPhone',
    },
    {
        title: 'Địa chỉ',
        dataIndex: 'customerAddress',
    },
    {
        title: 'Tổng tiền',
        dataIndex: 'totalAmount',
        search: false,
        align: 'right',
        renderText: (value) => new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value)
    },
    {
        title: 'Hành động',
        align: 'center',
        search: false,
        render: (_, { orderId }) => [
            <NavLink to={`/invoice/detail/${orderId}`}>
                <Button 
                    key='view'
                    icon={<EyeOutlined />}
                    type="primary"
                    ghost
                    className='border-none'
                />
            </NavLink>,
        ]
    }
];

export default useColumnsTableCategory;