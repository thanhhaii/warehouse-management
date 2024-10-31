import Constants from "@/helpers/constVariable";
import { EditOutlined } from "@ant-design/icons";
import { ProColumns } from "@ant-design/pro-components";
import { Button, Space } from "antd";
import dayjs from "dayjs";
import { SupplierModel } from "../types/supplierModels";

type ColumnsType = (props: {
    onUpdateSupplier: (supplierId: string) => void;
}) => ProColumns<SupplierModel>[];

const useColumnsTableProvider: ColumnsType = ({
    onUpdateSupplier   
}) => {
    return [
        {
            dataIndex: 'filter',
            hideInTable: true,
            title: 'Tìm kiếm',
            fieldProps: {
                placeholder: 'Tìm kiếm thông tin'
            }
        },
        {
            title: 'ID',
            dataIndex: 'id',
            align: 'center',
            ellipsis: true,
            copyable: true,
            search: false,
        },
        {
            title: 'Tên nhà cung cấp',
            dataIndex: 'name',
            search: false,
        },
        {
            title: 'Mã nhà cung cấp',
            dataIndex: 'code',
            copyable: true,
            search: false,
        },
        {
            title: 'Địa chỉ',
            dataIndex: 'address',
            search: false,
        },
        {
            title: 'Số điện thoại',
            dataIndex: 'phone',  
            search: false,          
        },
        {
            title: 'Ngày tạo',
            dataIndex: 'createDate',
            renderText: (value: number) => dayjs(value * 1000).format(Constants.defaultFormatDateTime),
            align: 'center',
            search: false,
        },
        {
            title: 'Người tạo',
            dataIndex: 'createdBy',
            align: 'center',
            search: false,
        },
        {
            dataIndex: '',
            title: 'Hành động',
            align: 'center',
            search: false,
            fixed: 'right',
            render: (_, entity) => (
                <Space>
                    <Button 
                        type="primary" 
                        ghost 
                        icon={<EditOutlined />} 
                        className="border-none"
                        onClick={() => onUpdateSupplier(entity.id)}
                    />
                </Space>
            )
        }
    ];
};

export default useColumnsTableProvider;