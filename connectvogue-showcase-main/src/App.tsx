import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "./context/CartContext";

import Index from "./pages/Index";
import CategoryPage from "./pages/CategoryPage";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Payment from "./pages/Payment";
import About from "./pages/About";
import Contact from "./pages/Contact";

import AdminLogin from "./admin/Login";
import Dashboard from "./admin/pages/Dashboard";
import AdminLayout from "./admin/components/AdminLayout";
import AdminNavbar from "./admin/AdminNavbar";
import AdminCategories from "./admin/AdminCategories";
import AdminProducts from "./admin/AdminProducts";
import AdminAbout from "./admin/AdminAbout";
import Orders from "./admin/Orders";
import ContactMessages from "./admin/ContactMessages";
import CompanyContact from "./admin/CompanyContact";
import AdminHero from "./admin/AdminHero";
import FeatureManagement from "./admin/AdminFeature";
import AdminProductsdetail from "./admin/AdminProductsdetail";
import AdminFooter from "./admin/AdminFooter";
import AdminPendingProducts from "./admin/AdminPendingProducts";
import AdminCreateVendor from "./admin/AdminCreateVendor";
import AdminVendorApproval from "./admin/AdminVendorApproval";
import VendorAuth from "./vendor/VendorAuth";

import VendorLogin from "./VendorLogin";
import VendorDashboard from "./vendor/VendorDashboard";
import AdminProduct from "./vendor/VendorAddProduct";
import VendorProducts from "./vendor/VendorProducts";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <CartProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Index />} />
            <Route path="/category/:category" element={<CategoryPage />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/payment" element={<Payment />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />

            {/* Admin Routes */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<Dashboard />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="navbar" element={<AdminNavbar />} />
              <Route path="categories" element={<AdminCategories />} />
              <Route path="products" element={<AdminProducts />} />
              <Route path="about" element={<AdminAbout />} />
              <Route path="orders" element={<Orders />} />
              <Route path="contacts" element={<ContactMessages />} />
              <Route path="company-contact" element={<CompanyContact />} />
              <Route path="hero" element={<AdminHero />} />
              <Route path="features" element={<FeatureManagement />} />
              <Route path="productdetails" element={<AdminProductsdetail />} />
              <Route path="footer" element={<AdminFooter />} />
              <Route path="pending-products" element={<AdminPendingProducts />} />
              <Route path="create-vendor" element={<AdminCreateVendor />} />
              <Route path="vendor-approvals" element={<AdminVendorApproval />} />
            </Route>

            {/* Vendor Routes */}
            <Route path="/vendor/login" element={<VendorLogin />} />
            <Route
              path="/vendor/dashboard"
              element={
                <VendorAuth>
                  <VendorDashboard />
                </VendorAuth>
              }
            />
            <Route path="/vendor/products" element={<VendorProducts />} />
            <Route path="/vendor/add-product" element={<AdminProduct />} />


            {/* 404 */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
