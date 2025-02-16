import { MenuDataItem } from "@ant-design/pro-components";
import { DashboardOutlined, FileOutlined, FileTextOutlined, UsergroupAddOutlined, } from "@ant-design/icons";

export const defaultMenuItems: MenuDataItem[] = [
    {
        name: 'Dashboard',
        icon: <DashboardOutlined />,
        path: `/`,
    },
    {
        name: 'Sản phẩm',
        icon: <FileOutlined />,
        children: [
            {
                name: 'Danh sách sản phẩm',
                path: '/product',
            },
            {
                name: 'Nhà cung cấp',
                path: '/provider',
            },
            {
                name: 'Danh mục',
                path: '/category',
            }
        ]
    },
    {
        name: 'Hoá đơn',
        icon: <FileTextOutlined />,
        path: `/invoice`,
    },
    {
        name: 'Tài khoản',
        icon: <UsergroupAddOutlined />,
        path: `/account`,
    },
];
