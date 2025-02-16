import { ProColumns } from "@ant-design/pro-components";
import { CategoryItem } from "../types/categoryModels";
import dayjs from "dayjs";
import { Button, Popconfirm } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

type ColumnsType = (props: { 
    onUpdate: (category: CategoryItem) => void;
    onDelete: (category: CategoryItem) => Promise<void>;
}) => ProColumns<CategoryItem>[];

const useColumnsTableCategory: ColumnsType = ({
    onUpdate,
    onDelete
}) => [
    {
        title: 'Mã danh mục',
        dataIndex: 'id',
        copyable: true,
        align: 'center',
        search: false,
    },
    {
        title: 'Tên danh mục',
        dataIndex: 'name',
    },
    {
        title: 'Mã danh mục',
        dataIndex: 'categoryCode',
        copyable: true,
    },
    {
        title: 'Người tạo',
        dataIndex: 'createdBy',
        align: 'center',
    },
    {
        title: 'Ngày tạo',
        align: 'center',
        dataIndex: 'createDate',
        search: false,
        renderText: (value) => dayjs(value).format('DD/MM/YYYY HH:mm:ss'),
    },
    {
        title: 'Lần chỉnh sửa cuối cùng',
        align: 'center',
        dataIndex: 'lastModifiedDate',
        search: false,
        renderText: (value) => dayjs(value).format('DD/MM/YYYY HH:mm:ss'),
    },
    {
        title: 'Hành động',
        align: 'center',
        search: false,
        fixed: 'right',
        width: 100,
        render: (_, category) => [
            <Button 
                className="border-none" 
                key="update" 
                icon={<EditOutlined />} 
                onClick={() => onUpdate(category)} 
            />,
            <Popconfirm
                title="Xoá danh mục"
                description="Bạn không thể hoàn tác hành động này sau khi xác nhận!"
                onConfirm={() => onDelete(category)}
                key="delete" 
            >
                <Button 
                    className="border-none mx-2"                      
                    icon={<DeleteOutlined />} 
                    danger 
                />
            </Popconfirm>
        ]
    }
];

export default useColumnsTableCategory;