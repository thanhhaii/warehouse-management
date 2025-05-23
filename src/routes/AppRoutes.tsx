import { Route, Routes } from "react-router-dom";
import MainLayout from "@/components/MainLayout/MainLayout.tsx";
import ProtectedRoute from "@/routes/ProtectedRoute.tsx";
import { lazy } from "react";
import useAxiosInterceptor from "@/hooks/useAxiosInterceptor";
import DashboardPage from "@/views/Dashboard/DashboardPage";

// Page
const ProviderPage = lazy(() => import("@/views/Provider/ProviderPage.tsx"));
const ProviderDetailPage = lazy(() => import("@/views/Provider/ProviderDetailPage.tsx"));
const CreateProviderPage = lazy(() => import("@/views/Provider/CreateProviderPage"));

const AccountPage = lazy(() => import("@/views/Account/AccountPage.tsx"));
const ProfilePage = lazy(() => import("@/views/Profile/ProfilePage"));
const LoginPage = lazy(() => import("@/views/Login/LoginPage.tsx"));
const CategoryPage = lazy(() => import("@/views/Category/index.tsx"));

// Product Page
const ProductPage = lazy(() => import("@/views/Product/ProductPage.tsx"));
const UpdateProductPage = lazy(() => import("@/views/Product/UpdateProductPage.tsx"));
const CreateProductPage = lazy(() => import("@/views/Product/CreateProductPage"));

// Invoice page
const CreateInvoicePage = lazy(() => import("@/views/Invoice/CreateInvoicePage"));
const InvoiceManagementPage = lazy(() => import("@/views/Invoice/InvoiceManagementPage"));

const AppRoutes: React.FunctionComponent = () => {
    useAxiosInterceptor();

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
                        <ProtectedRoute >
                            <DashboardPage />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="account"
                    element={
                        <ProtectedRoute>
                            <AccountPage />
                        </ProtectedRoute>
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
                        <ProtectedRoute children={<InvoiceManagementPage />} />
                    }
                />
                <Route
                    path="invoice/create"
                    element={
                        <ProtectedRoute children={<CreateInvoicePage />} />
                    }
                />
                <Route
                    path="profile"
                    element={
                        <ProtectedRoute children={<ProfilePage />} />
                    }
                />
            </Route>
        </Routes>
    );
};

export default AppRoutes;
