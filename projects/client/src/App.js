import logo from "./logo.svg";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import LandingPage from "./pages/LandingPage";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Products from "./pages/Products";
import Dashboard from "./pages/Dashboard";
import Inventory from "./pages/Inventory";
import StockHistory from "./pages/StockHistory";
import ProductList from "./pages/ProductList";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import CheckOut from "./pages/CheckOut";
import OrderList from "./pages/OrderList";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Navbar />
              <LandingPage />
            </>
          }
        />
        <Route
          path="/product"
          element={
            <>
              <Navbar />
              <ProductList />
            </>
          }
        />
        <Route
          path="/product/:id"
          element={
            <>
              <Navbar />
              <ProductDetail />
            </>
          }
        />
        <Route
          path="/cart"
          element={
            <>
              <Navbar />
              <Cart />
            </>
          }
        />
        <Route
          path="/cart/checkout"
          element={
            <>
              <Navbar />
              <CheckOut />
            </>
          }
        />
        <Route
          path="/order_list"
          element={
            <>
              <Navbar />
              <OrderList />
            </>
          }
        />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/dashboard"
          element={<Sidebar element={<Dashboard />} />}
        />
        <Route
          path="/dashboard/products"
          element={<Sidebar element={<Products />} />}
        />
        <Route
          path="/dashboard/inventory"
          element={<Sidebar element={<Inventory />} />}
        />
        <Route
          path="/dashboard/stock-history"
          element={<Sidebar element={<StockHistory />} />}
        />
      </Routes>
    </div>
  );
}

export default App;
