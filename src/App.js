// App.js

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import ProductPage from "./pages/ProductPage";
import UsersPage from "./pages/UsersPage";
import SellerPage from "./pages/SellerPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/dashboard/products" element={<ProductPage />} />
        <Route path="/dashboard/users" element={<UsersPage />} />
        <Route path="/dashboard/sellers" element={<SellerPage />} />
      </Routes>
    </Router>
  );
}

export default App;
