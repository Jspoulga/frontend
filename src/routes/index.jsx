import React from 'react';

import {
  Routes,
  Route,
} from 'react-router-dom';

import MainLayout from '../layouts/MainLayout';

import Home from '../pages/shop/Home';
import Shop from '../pages/shop/Shop';
import ProductDetails from '../pages/shop/ProductDetails';

import Login from '../pages/auth/Login';
import Register from '../pages/auth/Register';
import ForgotPassword from '../pages/auth/ForgotPassword';
import ResetPassword from '../pages/auth/ResetPassword';

import Cart from '../pages/cart/Cart';
import Checkout from '../pages/cart/Checkout';

import Orders from '../pages/orders/Orders';
import OrderDetails from '../pages/orders/OrderDetails';
import TrackOrder from '../pages/orders/TrackOrder';

import Profile from '../pages/account/Profile';
import Addresses from '../pages/account/Addresses';
import Security from '../pages/account/Security';
import Notifications from '../pages/account/Notifications';

import Wishlist from '../pages/shop/Wishlist';
import Search from '../pages/shop/Search';
import Category from '../pages/shop/Category';

import Dashboard from '../pages/admin/Dashboard';

export default function AppRoutes() {
  return (
    <Routes>

      <Route
        element={
          <MainLayout />
        }
      >

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/shop"
          element={<Shop />}
        />

        <Route
          path="/product/:id"
          element={
            <ProductDetails />
          }
        />

        <Route
          path="/category/:slug"
          element={
            <Category />
          }
        />

        <Route
          path="/search"
          element={<Search />}
        />

        <Route
          path="/wishlist"
          element={
            <Wishlist />
          }
        />

        <Route
          path="/cart"
          element={<Cart />}
        />

        <Route
          path="/checkout"
          element={
            <Checkout />
          }
        />

        <Route
          path="/orders"
          element={<Orders />}
        />

        <Route
          path="/orders/:id"
          element={
            <OrderDetails />
          }
        />

        <Route
          path="/track/:id"
          element={
            <TrackOrder />
          }
        />

        <Route
          path="/account"
          element={<Profile />}
        />

        <Route
          path="/account/addresses"
          element={
            <Addresses />
          }
        />

        <Route
          path="/account/security"
          element={
            <Security />
          }
        />

        <Route
          path="/account/notifications"
          element={
            <Notifications />
          }
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="/forgot-password"
          element={
            <ForgotPassword />
          }
        />

        <Route
          path="/reset-password"
          element={
            <ResetPassword />
          }
        />

        <Route
          path="/admin"
          element={
            <Dashboard />
          }
        />

      </Route>

    </Routes>
  );
}