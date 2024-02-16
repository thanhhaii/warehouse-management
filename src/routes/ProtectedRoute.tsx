// Vendor
import { Navigate, useLocation } from "react-router-dom";
import { PropsWithChildren } from "react";

// Src
import { useAppSelector } from "@/states/hooks.ts";
import { selectUserIsSignedIn } from "@/states/selectors/authSelector.ts";

export type ProtectedRouteProps = PropsWithChildren;

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
    const isLogin = useAppSelector(selectUserIsSignedIn);
    const location = useLocation();

    if(!isLogin){
        return <Navigate to="/login" replace={true} state={{ from: location }} />;
    }

    return children;
};

export default ProtectedRoute;
