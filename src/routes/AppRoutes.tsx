import { Route, Routes } from "react-router-dom";
import AccountPage from "../views/Account/AccountPage.tsx";
import ProductPage from "../views/ProductPage.tsx";
import MainLayout from "@/components/MainLayout/MainLayout.tsx";
import LoginPage from "@/views/Login/LoginPage.tsx";
import ProtectedRoute from "@/routes/ProtectedRoute.tsx";

const AppRoutes: React.FunctionComponent = () => {
    return (
        <Routes>
            <Route
                path="login"
                element={<LoginPage />}
            />
            <Route element={<MainLayout />}>
                <Route
                    path="/"
                    element={<h1>Path /</h1>}
                />
                <Route
                    path="account"
                    element={
                        <ProtectedRoute children={<AccountPage />} />
                    }
                />
                <Route
                    path="product"
                    element={
                        <ProtectedRoute children={<ProductPage />} />
                    }
                />
            </Route>
        </Routes>
    );
};

export default AppRoutes;
