import { MenuDataItem } from "@ant-design/pro-components";
import { DashboardOutlined, FileOutlined, UserOutlined } from "@ant-design/icons";

export const defaultMenuItems: MenuDataItem[] = [
  {
    name: 'Dashboard',
    icon: <DashboardOutlined />,
    path: `/`,
  },
  {
    name: 'Account',
    icon: <UserOutlined />,
    path: `/account`,
  },
  {
    name: 'Product',
    icon: <FileOutlined />,
    path: '/product'
  }
];
