import { ProColumns } from "@ant-design/pro-components";

type ColumnsType = () => ProColumns<any>[];

const useColumnsTableProvider: ColumnsType = () => {
    return [
        {
            title: 'ID',
            dataIndex: 'id'
        },
        {
            title: 'Tên nhà cung cấp',
            dataIndex: 'name'
        },
        {
            title: 'Sản phẩm',
            dataIndex: 'product'
        },
        {
            title: 'Ngày tạo',
            dataIndex: 'createdAt'
        }
    ];
};

export default useColumnsTableProvider;