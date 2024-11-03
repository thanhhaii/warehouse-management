// Vendor
import { Navigate, useLocation } from "react-router-dom";
import { PropsWithChildren, Suspense } from "react";

// Src
import { useAppSelector } from "@/states/hooks.ts";
import { selectUserIsSignedIn } from "@/states/selectors/authSelector.ts";
import { ProCard } from "@ant-design/pro-components";
import { Spin } from "antd";

export type ProtectedRouteProps = PropsWithChildren;

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
    const isLogin = useAppSelector(selectUserIsSignedIn);
    const location = useLocation();

    if(!isLogin){
        return <Navigate to="/login" replace={true} state={{ from: location }} />;
    }

    return (
        <Suspense 
            fallback={
                <ProCard className="h-[400px]" bodyStyle={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    alignContent: 'center',
                    flexDirection: 'column'
                }}>
                    <Spin size="large" />
                    <h3 className="text-gray-500 mt-2">Đang tải trang...</h3>
                </ProCard>
            }
        >
            {children}
        </Suspense>
    );
};

export default ProtectedRoute;
