import { Breadcrumb } from "antd";
import { Content } from "antd/es/layout/layout";
import { useLocation } from "react-router-dom";

const breadcrumbNameMap = {
    '/': 'Bảng điều khiển',
    '/provider': 'Nhà cung cấp',
    '/product': 'Sản phẩm',
    '/category': 'Danh mục'
};

const AppBreadcrumb: React.FunctionComponent = () => {
    const location = useLocation();

    console.log({ location });

    return (
        <Content className="mb-4 bg-white p-5 rounded-lg">
            <Breadcrumb 
                items={[
                    {
                        href: '/',
                        title: 'Bảng điều khiển',
                    },
                    {
                        href: '/provider',
                        title: 'Nhà cung cấp',
                        children: [
                            {
                                href: '/provider/create',
                                title: 'Thêm nhà cung cấp',
                            },
                        ],
                    },
                    {
                        href: '/product',
                        title: 'Sản phẩm',
                        children: [
                            {
                                path: '/provider/create',
                                title: 'Thêm nhà cung cấp',
                            },
                        ],
                    }
                ]}
            />
        </Content>
    );
};

export default AppBreadcrumb;