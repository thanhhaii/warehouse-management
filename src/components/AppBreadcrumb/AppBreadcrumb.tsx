import { Breadcrumb } from "antd";
import { ItemType } from "antd/es/breadcrumb/Breadcrumb";
import { Content } from "antd/es/layout/layout";
import { useCallback, useMemo } from "react";
import { Link, useLocation } from "react-router-dom";

const breadcrumbNameMap: Record<string, string> = {
    '/': 'Bảng điều khiển',
    '/account': 'Danh sách tài khoản',
    '/provider': 'Danh sách nhà cung cấp',
    '/provider/create': 'Thêm nhà cung cấp',
    '/product': 'Danh sách sản phẩm',
    '/product/create': 'Thêm sản phẩm',
    '/category': 'Danh mục'
};

const AppBreadcrumb: React.FunctionComponent = () => {
    const location = useLocation();

    const breadcrumbItem = useMemo(( ): any => {
        const pathSnippets = location.pathname.split('/').filter((i) => i);
        if(pathSnippets.length === 0){
            return [
                {
                    path: '/',
                    title: 'Bảng điều khiển'
                }
            ];
        }

        return pathSnippets.map((_, index) => {
            const url = `/${pathSnippets.slice(0, index + 1).join('/')}`;
            return {
                path: url,
                title: breadcrumbNameMap[url] || ''
            };
        });
    }, [location]);

    const itemRender = useCallback((currentRoute: ItemType, _: any, items: any, paths: any) => { 
        const isLast = currentRoute?.path === items[items.length - 1]?.path;
                  
        return isLast ? (
            <span>{currentRoute.title}</span>
        ) : (
            <Link to={`/${paths.join("/")}`}>{currentRoute.title}</Link>
        );
    }, []);

    return (
        <Content className="mb-4 bg-white p-5 rounded-lg">
            <Breadcrumb 
                items={breadcrumbItem}
                itemRender={itemRender}
            />
        </Content>
    );
};

export default AppBreadcrumb;