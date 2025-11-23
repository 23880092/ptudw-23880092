//Định nghĩa đường dẫn các route trong ứng dụng

import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import ProductDetail from "./pages/ProductDetail";

export default function RoutesDef() {
  return (
    <Routes>
      {/* Ví dụ định nghĩa các route */}
      <Route path="/" element={<Home />} />
      <Route path="/product" element={<Home />} />
      <Route path="/product/:id" element={<ProductDetail />} />
      <Route path="/contact" element={<Contact />} />
    </Routes>
  );
}
