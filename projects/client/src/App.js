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
import Management from "./pages/Management";
import SalesReport from "./pages/SalesReport";
import Transaction from "./pages/Transactions";
import Transactions from "./pages/Transactions";

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
          path="/products"
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
          path="/management"
          element={<Sidebar element={<Management />} />}
        />
        <Route
          path="/dashboard/products"
          element={<Sidebar element={<Products />} />}
        />
        <Route
          path="/dashboard/transactions"
          element={<Sidebar element={<Transactions />} />}
        />
        <Route
          path="/dashboard/inventory/sales-report"
          element={
            <Sidebar element={<Inventory element={<SalesReport />} />} />
          }
        />
        <Route
          path="/dashboard/inventory/stock-history"
          element={
            <Sidebar element={<Inventory element={<StockHistory />} />} />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
