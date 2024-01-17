import { Route, Routes } from "react-router-dom";

const AppRoutes: React.FunctionComponent = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={<h1>Path /</h1>}
      />
      <Route
        path="account"
        element={<h1>Account /</h1>}
      />
      <Route
        path="product"
        element={<h1>Product /</h1>}
      />
    </Routes>
  );
};

export default AppRoutes;
