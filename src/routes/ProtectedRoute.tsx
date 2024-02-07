import { Navigate, useLocation } from "react-router-dom";
import { PropsWithChildren } from "react";

export type ProtectedRouteProps = PropsWithChildren;

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
    const isLogin = localStorage.getItem('isLogin');
    const location = useLocation();

    if(!isLogin){
        return <Navigate to="/login" replace={true} state={{ from: location }} />;
    }

    return children;
};

export default ProtectedRoute;
