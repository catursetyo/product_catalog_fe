import { Navigate, Route, Routes } from "react-router";
import PageLayout from "./components/templates/PageLayout/index.jsx";
import ProductsPage from "./components/pages/ProductsPage/index.jsx";

export default function App() {
  return (
    <Routes>
      <Route element={<PageLayout />}>
        <Route index element={<Navigate to="/products" replace />} />
        <Route path="products" element={<ProductsPage />} />
      </Route>
    </Routes>
  );
}
