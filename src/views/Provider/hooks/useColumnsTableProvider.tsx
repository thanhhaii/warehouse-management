import Constants from "@/helpers/constVariable";
import { EditOutlined } from "@ant-design/icons";
import { ProColumns } from "@ant-design/pro-components";
import { Button, Space, Typography } from "antd";
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
            title: 'ID',
            dataIndex: 'id',
            align: 'center',
            ellipsis: true,
            copyable: true,         
            search: false,   
            render: (_, { id }) => 
                <Typography.Paragraph 
                    className="w-40 !mb-0" 
                    copyable 
                    ellipsis={{ rows: 1 }} >
                    {id}
                </Typography.Paragraph>
        },
        {
            title: 'Tên nhà cung cấp',
            dataIndex: 'name',       
        },
        {
            title: 'Mã nhà cung cấp',
            dataIndex: 'code',
            copyable: true,            
        },
        {
            title: 'Địa chỉ',
            dataIndex: 'address',
            search: false,
        },
        {
            title: 'Số điện thoại',
            dataIndex: 'phone',                  
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
            width: 100,
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