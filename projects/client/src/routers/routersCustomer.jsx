import { Routes, Route } from "react-router-dom";
import Navbar from "../components/Navbar";
import LandingPage from "../pages/LandingPage";
import ProductList from "../pages/ProductList";
import ProductDetail from "../pages/ProductDetail";
import Cart from "../pages/Cart";
import CheckOut from "../pages/CheckOut";
import OrderList from "../pages/OrderList";
import Register from "../pages/Register";
import Login from "../pages/Login";
import Profile from "../pages/Profile";

const routersCustomer = [
  <Route
    path="/"
    element={
      <>
        <Navbar />
        <LandingPage />
      </>
    }
  />,
  <Route
    path="/products"
    element={
      <>
        <Navbar />
        <ProductList />
      </>
    }
  />,
  <Route
    path="/product/:id"
    element={
      <>
        <Navbar />
        <ProductDetail />
      </>
    }
  />,
  <Route
    path="/cart"
    element={
      <>
        <Navbar />
        <Cart />
      </>
    }
  />,
  <Route
    path="/cart/checkout"
    element={
      <>
        <Navbar />
        <CheckOut />
      </>
    }
  />,
  <Route
    path="/order_list"
    element={
      <>
        <Navbar />
        <OrderList />
      </>
    }
  />,
  <Route
    path="/profile"
    element={
      <>
        <Navbar />
        <Profile />
      </>
    }
  />,
  <Route path="/register" element={<Register />} />,
  <Route path="/login" element={<Login />} />,
];

export default routersCustomer;
