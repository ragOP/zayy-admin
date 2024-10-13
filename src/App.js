// App.js

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import ProductPage from "./pages/ProductPage";
import UsersPage from "./pages/UsersPage";
import SellerPage from "./pages/SellerPage";
import SingleProductPage from "./pages/SingleProductPage";
import ThumbnailPage from "./pages/ThumbnailPage";
import BannerPage from "./pages/BannerPage";
import DetailPage from "./pages/DetailPage";
import AddCategory from "./pages/AddCategory";
import Protected from "./pages/Auth/Protected";
import Notification from "./pages/Notification";
import DiscoverPostPage from "./pages/DiscoverPostPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Protected element={<LoginPage />} screen="login"/>} />
        <Route path="/dashboard" element={<Protected element={<DashboardPage />} />} />
        <Route path="/dashboard/products" element={<Protected element={<ProductPage />} />} />
        <Route path="/dashboard/users" element={<Protected element={<UsersPage />} />} />
        <Route path="/dashboard/sellers" element={<Protected element={<SellerPage />} />} />
        <Route path="/dashboard/thumbnail" element={<Protected element={<ThumbnailPage />} />} />
        <Route path="/dashboard/banner" element={<Protected element={<BannerPage />} />} />
        <Route path="/dashboard/product/:id" element={<Protected element={<SingleProductPage />} />} />
        <Route path="/dashboard/user/details/:id" element={<Protected element={<DetailPage />} />} />
        <Route path="/dashboard/addcategory" element={<Protected element={<AddCategory />} />} />
        <Route path="/notification" element={<Protected element={<Notification />} />} />
        <Route path="/discover-post" element={<Protected element={<DiscoverPostPage />} />} />


      </Routes>
    </Router>
  );
}

export default App;
