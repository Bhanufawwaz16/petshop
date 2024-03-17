import { Routes, Route } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import Sidebar from "../components/Sidebar";
import Management from "../pages/Management";
import Products from "../pages/Products";
import Transactions from "../pages/Transactions";
import Inventory from "../pages/Inventory";
import SalesReport from "../pages/SalesReport";
import StockHistory from "../pages/StockHistory";
import Schedule from "../pages/Schedule";
import ProtectedPageNotEmploye from "../middleware/ProtectedPageNotEmploye";

const RoutersAdmin = [
  <Route path="/dashboard" element={<Sidebar element={<Dashboard />} />} />,
  <Route
    path="/management"
    element={
      <Sidebar
        element={
          <ProtectedPageNotEmploye adminOnly={true}>
            <Management />
          </ProtectedPageNotEmploye>
        }
      />
    }
  />,
  <Route
    path="/dashboard/products"
    element={<Sidebar element={<Products />} />}
  />,
  <Route
    path="/dashboard/transactions"
    element={<Sidebar element={<Transactions />} />}
  />,
  <Route
    path="/dashboard/inventory/sales-report"
    element={<Sidebar element={<Inventory element={<SalesReport />} />} />}
  />,
  <Route
    path="/dashboard/inventory/stock-history"
    element={<Sidebar element={<Inventory element={<StockHistory />} />} />}
  />,
  <Route
    path="/dashboard/schedule"
    element={<Sidebar element={<Schedule />} />}
  />,
];

export default RoutersAdmin;
