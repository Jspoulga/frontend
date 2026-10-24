import React from 'react';
import { Routes, Route } from 'react-router-dom';

import MainLayout from './layouts/MainLayout';
import AuthLayout from './layouts/AuthLayout';
import DashboardLayout from './layouts/DashboardLayout';

import { useSelector } from 'react-redux';

import AppBootstrap from './components/common/AppBootstrap';
import BrandIntro from './components/brand/BrandIntro';
import PrivateRoute from './routes/PrivateRoute';
import AdminRoute from './routes/AdminRoute';

// SHOP
import Home from './pages/shop/Home';
import Shop from './pages/shop/Shop';
import ProductDetails from './pages/shop/ProductDetails';
import Category from './pages/shop/Category';
import Search from './pages/shop/Search';
import Wishlist from './pages/shop/Wishlist';

// AUTH
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import ForgotPassword from './pages/auth/ForgotPassword';
import ResetPassword from './pages/auth/ResetPassword';

// CART
import Cart from './pages/cart/Cart';
import Checkout from './pages/cart/Checkout';

// ORDERS
import Orders from './pages/orders/Orders';
import OrderDetails from './pages/orders/OrderDetails';
import TrackOrder from './pages/orders/TrackOrder';

// ACCOUNT
import Profile from './pages/account/Profile';
import Addresses from './pages/account/Addresses';
import Measurements from './pages/account/Measurements';
import Security from './pages/account/Security';
import Notifications from './pages/account/Notifications';
import AccountSettings from './pages/account/Settings';
import PayOnPhone from './pages/cart/PayOnPhone';

// ADMIN
import Dashboard from './pages/admin/Dashboard';
import Products from './pages/admin/Products';
import AddProduct from './pages/admin/AddProduct';
import EditProduct from './pages/admin/EditProduct';
import Categories from './pages/admin/Categories';
import AdminOrders from './pages/admin/Orders';
import Customers from './pages/admin/Customers';
import Payments from './pages/admin/Payments';
import Coupons from './pages/admin/Coupons';
import Reviews from './pages/admin/Reviews';
import Settings from './pages/admin/Settings';
import Catalogue from './pages/admin/Catalogue';

function App() {
  const language = useSelector(state => state.settings.language);
  const currency = useSelector(state => state.settings.currency);

  return (
    <>
      <AppBootstrap />

      {/* Le rideau de marque : posé par-dessus la boutique déjà montée. */}
      <BrandIntro />

      {/* Changer de langue ou de devise remonte l'arbre : les prix sont
          formatés par un module, que React ne surveille pas tout seul. */}
      <Routes key={`${language}-${currency}`}>

      {/* =========================
          CUSTOMER WEBSITE
      ========================== */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/category/:category" element={<Category />} />
        <Route path="/search" element={<Search />} />
        <Route path="/wishlist" element={<Wishlist />} />

        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />

        <Route
          path="/orders"
          element={
            <PrivateRoute>
              <Orders />
            </PrivateRoute>
          }
        />

        {/* Page de confirmation : accessible sans compte, sinon un achat en
            tant qu'invité se termine par une redirection vers /login juste
            après le paiement. Elle n'affiche que le numéro de commande. */}
        <Route
          path="/orders/:id"
          element={<OrderDetails />}
        />

        <Route
          path="/track-order/:id"
          element={
            <PrivateRoute>
              <TrackOrder />
            </PrivateRoute>
          }
        />

        <Route
          path="/account/profile"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />

        <Route
          path="/account/measurements"
          element={
            <PrivateRoute>
              <Measurements />
            </PrivateRoute>
          }
        />

        <Route
          path="/account/addresses"
          element={
            <PrivateRoute>
              <Addresses />
            </PrivateRoute>
          }
        />

        <Route
          path="/account/security"
          element={
            <PrivateRoute>
              <Security />
            </PrivateRoute>
          }
        />

        <Route
          path="/account/notifications"
          element={
            <PrivateRoute>
              <Notifications />
            </PrivateRoute>
          }
        />

        <Route
          path="/account/settings"
          element={
            <PrivateRoute>
              <AccountSettings />
            </PrivateRoute>
          }
        />
      </Route>

      {/* Paiement par QR : page autonome ouverte sur le téléphone du client,
          sans en-tête boutique et accessible sans compte. */}
      <Route path="/pay/:sessionId" element={<PayOnPhone />} />

      {/* =========================
          AUTHENTICATION
      ========================== */}
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
      </Route>

      {/* =========================
          ADMIN
      ========================== */}
      <Route
        path="/admin"
        element={
          <AdminRoute>
            <DashboardLayout />
          </AdminRoute>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="products" element={<Products />} />
        <Route path="catalogue" element={<Catalogue />} />
        <Route path="products/add" element={<AddProduct />} />
        <Route path="products/edit/:id" element={<EditProduct />} />
        <Route path="categories" element={<Categories />} />
        <Route path="orders" element={<AdminOrders />} />
        <Route path="customers" element={<Customers />} />
        <Route path="payments" element={<Payments />} />
        <Route path="coupons" element={<Coupons />} />
        <Route path="reviews" element={<Reviews />} />
        <Route path="settings" element={<Settings />} />
      </Route>

      {/* 404 */}
      <Route
        path="*"
        element={
          <div style={{ padding: 40 }}>
            <h1>404</h1>
            <p>Page introuvable.</p>
          </div>
        }
      />

      </Routes>
    </>
  );
}

export default App;