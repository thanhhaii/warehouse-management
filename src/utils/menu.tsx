import { MenuDataItem } from "@ant-design/pro-components";
import { DashboardOutlined, FileOutlined, UserOutlined } from "@ant-design/icons";

export const defaultMenuItems: MenuDataItem[] = [
    {
        name: 'Dashboard',
        icon: <DashboardOutlined />,
        path: `/`,
    },
    {
        name: 'Tài khoản',
        icon: <UserOutlined />,
        path: `/account`,
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
    }
];
