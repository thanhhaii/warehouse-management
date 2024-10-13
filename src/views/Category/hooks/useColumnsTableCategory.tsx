import { ProColumns } from "@ant-design/pro-components";
import { CategoryItem } from "../types/categoryModels";
import dayjs from "dayjs";
import Constants from "@/helpers/constVariable";
import { Button } from "antd";
import { EditOutlined } from "@ant-design/icons";

type ColumnsType = (props: { 
    onUpdate: (category: CategoryItem) => void
}) => ProColumns<CategoryItem>[];

const useColumnsTableCategory: ColumnsType = ({
    onUpdate
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
        search: false,
    },
    {
        title: 'Người tạo',
        dataIndex: 'createdBy',
        align: 'center',
        search: false,
    },
    {
        title: 'Ngày tạo',
        align: 'center',
        dataIndex: 'createDate',
        search: false,
        renderText: (value: number) => dayjs(value).format(Constants.defaultFormatDateTime)
    },
    {
        title: 'Lần chỉnh sửa cuối cùng',
        align: 'center',
        dataIndex: 'lastModifiedDate',
        search: false,
        renderText: (value: number) => dayjs(value).format(Constants.defaultFormatDateTime)
    },
    {
        title: 'Hành động',
        align: 'center',
        search: false,
        render: (_, category) => [
            <Button key="update" icon={<EditOutlined />} onClick={() => onUpdate(category)} />
        ]
    }
];

export default useColumnsTableCategory;