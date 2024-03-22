import logo from "./logo.svg";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import RoutersAdmin from "./routers/RoutersAdmin";
import routersCustomer from "./routers/routersCustomer";
import ProtectedPageNotEmploye from "./middleware/ProtectedPageNotEmploye";

function App() {
  return (
    <div className="">
      <Routes>{RoutersAdmin}</Routes>

      <ProtectedPageNotEmploye adminOnly={true}>
        <Routes>{routersCustomer}</Routes>
      </ProtectedPageNotEmploye>
    </div>
  );
}

export default App;
