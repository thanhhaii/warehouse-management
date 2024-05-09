import { Breadcrumb } from "antd";
import { Content } from "antd/es/layout/layout";

const AppBreadcrumb: React.FunctionComponent = () => {
    return (
        <Content className="mb-4 bg-white p-5 rounded-lg">
            <Breadcrumb 
                items={[
                    {
                        path: '/index',
                        title: 'home',
                    },
                    {
                        path: '/provider',
                        title: 'Nhà cung cấp',
                        children: [
                            {
                                path: '/provider/create',
                                title: 'Thêm nhà cung cấp',
                            },
                            {
                                path: '/layout',
                                title: 'Layout',
                            },
                            {
                                path: '/navigation',
                                title: 'Navigation',
                            },
                        ],
                    },
                    {
                        path: '/second',
                        title: 'second',
                    }
                ]}
            />
        </Content>
    );
};

export default AppBreadcrumb;