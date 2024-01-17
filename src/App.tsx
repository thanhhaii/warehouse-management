// Vendor
import { ConfigProvider, Dropdown } from "antd";
import { ProLayout } from "@ant-design/pro-components";
import { LogoutOutlined, UserOutlined } from "@ant-design/icons";
import { NavLink, useLocation } from "react-router-dom";

// Src
import './App.css';
import { defaultMenuItems } from "./utils/menu.tsx";
import AppRoutes from "./routes/AppRoutes.tsx";

function App() {
  const { pathname } = useLocation();

  return (
    <ConfigProvider>
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
        <AppRoutes />
      </ProLayout>
    </ConfigProvider>
  );
}

export default App;
