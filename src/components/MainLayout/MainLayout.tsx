// Vendor
import { LogoutOutlined, UserOutlined } from "@ant-design/icons";
import { Dropdown } from "antd";
import { NavLink, useLocation, Outlet } from "react-router-dom";
import { ProLayout } from "@ant-design/pro-components";

// Src
import { defaultMenuItems } from "@/utils/menu.tsx";

const MainLayout: React.FunctionComponent = () => {
    const { pathname } = useLocation();

    return (
        <ProLayout
            title="WAREHOUSE MANAGEMENT"
            fixSiderbar
            layout="mix"
            location={{ pathname }}
            avatarProps={{
                icon: <UserOutlined />,
                size: 'large',
                render: (_, dom) => (
                    <Dropdown
                        menu={{
                            items: [{
                                key: 'logout',
                                icon: <LogoutOutlined />,
                                label: 'Logout',
                                onClick: () => {
                                    window.localStorage.clear();
                                    window.location.reload();
                                }
                            }]
                        }}
                        children={dom}
                    />
                )
            }}
            menu={{
                request: async () => defaultMenuItems
            }}
            menuItemRender={(menuItem, dom) => (
                <NavLink to={menuItem.path ?? ''}
                    children={dom}
                />
            )}
        >
            <Outlet />
        </ProLayout>
    );
};

export default MainLayout;
