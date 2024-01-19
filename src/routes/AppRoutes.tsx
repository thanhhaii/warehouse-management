import { Route, Routes } from "react-router-dom";
import AccountPage from "../views/Account/AccountPage.tsx";
import ProductPage from "../views/ProductPage.tsx";

const AppRoutes: React.FunctionComponent = () => {
    return (
        <Routes>
            <Route
                path="/"
                element={<h1>Path /</h1>}
            />
            <Route
                path="account"
                element={<AccountPage />}
            />
            <Route
                path="product"
                element={<ProductPage />}
            />
        </Routes>
    );
};

export default AppRoutes;
