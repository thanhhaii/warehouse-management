// Vendor
import { LogoutOutlined, UserOutlined } from "@ant-design/icons";
import { Dropdown } from "antd";
import { NavLink, useLocation, Outlet } from "react-router-dom";
import { ProLayout } from "@ant-design/pro-components";

// Src
import { defaultMenuItems } from "@/utils/menu.tsx";
import AppBreadcrumb from "../AppBreadcrumb/AppBreadcrumb";
import { useAppDispatch } from "@/states/hooks";
import { authActions } from "@/states/slices/authSlice";

const MainLayout: React.FunctionComponent = () => {
    const { pathname } = useLocation();
    const dispatch = useAppDispatch();

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
                            items: [
                                {
                                    key: 'profile',
                                    icon: <UserOutlined />,
                                    label: <NavLink to="/profile">Thông tin tài khoản</NavLink>,
                                },
                                {
                                    key: 'logout',
                                    icon: <LogoutOutlined />,
                                    label: 'Logout',
                                    onClick: () => {
                                        dispatch(authActions.logout());
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
            <AppBreadcrumb />
            <Outlet />
        </ProLayout>
    );
};

export default MainLayout;
