import { Route, Routes } from "react-router-dom";
import AccountPage from "../views/Account/AccountPage.tsx";
import ProductPage from "../views/ProductPage.tsx";
import MainLayout from "@/components/MainLayout/MainLayout.tsx";
import LoginPage from "@/views/Login/LoginPage.tsx";
import ProtectedRoute from "@/routes/ProtectedRoute.tsx";
import { lazy } from "react";

const ProviderPage = lazy(() => import("@/views/Provider/ProviderPage.tsx"));
const ProviderDetailPage = lazy(() => import("@/views/Provider/ProviderDetailPage.tsx"));

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
                    element={
                        <ProtectedRoute children={<h1>Path /</h1>} />
                    }
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
                <Route
                    path="provider"
                    element={
                        <ProtectedRoute children={<ProviderPage />} />
                    }
                />
                <Route
                    path="provider/:id/:action?"
                    element={
                        <ProtectedRoute children={<ProviderDetailPage />} />
                    }
                />
                <Route
                    path="category"
                    element={
                        <ProtectedRoute children={<h1>Category /</h1>} />
                    }
                />
                <Route
                    path="invoice"
                    element={
                        <ProtectedRoute children={<h1>Invoice /</h1>} />
                    }
                />
            </Route>
        </Routes>
    );
};

export default AppRoutes;
