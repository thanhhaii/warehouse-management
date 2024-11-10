import { Route, Routes } from "react-router-dom";
import MainLayout from "@/components/MainLayout/MainLayout.tsx";
import ProtectedRoute from "@/routes/ProtectedRoute.tsx";
import { lazy } from "react";

// Page
const ProviderPage = lazy(() => import("@/views/Provider/ProviderPage.tsx"));
const ProviderDetailPage = lazy(() => import("@/views/Provider/ProviderDetailPage.tsx"));
const CreateProviderPage = lazy(() => import("@/views/Provider/CreateProviderPage"));

const AccountPage = lazy(() => import("@/views/Account/AccountPage.tsx"));
const LoginPage = lazy(() => import("@/views/Login/LoginPage.tsx"));
const CategoryPage = lazy(() => import("@/views/Category/index.tsx"));

// Product Page
const ProductPage = lazy(() => import("@/views/Product/ProductPage.tsx"));
const UpdateProductPage = lazy(() => import("@/views/Product/UpdateProductPage.tsx"));
const CreateProductPage = lazy(() => import("@/views/Product/CreateProductPage"));

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
                    path="product/create"
                    element={
                        <ProtectedRoute children={<CreateProductPage />} />
                    }
                />
                <Route
                    path="product/:id/:action"
                    element={
                        <ProtectedRoute children={<UpdateProductPage />} />
                    }
                />
                <Route
                    path="provider"
                    element={
                        <ProtectedRoute children={<ProviderPage />} />
                    }
                />
                <Route 
                    path="provider/create"
                    element={
                        <ProtectedRoute children={<CreateProviderPage />} />
                    }
                />
                <Route
                    path="provider/:id/:action"
                    element={
                        <ProtectedRoute children={<ProviderDetailPage />} />
                    }
                />
                <Route
                    path="category"
                    element={
                        <ProtectedRoute children={<CategoryPage />} />
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
