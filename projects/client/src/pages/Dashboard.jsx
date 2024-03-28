import React, { useEffect, useState } from "react";
import api from "../api/api";
import BarChart from "../components/BarChart";

const Dashboard = () => {
  const [buyAndSell, setBuyAndSell] = useState([]);

  async function getBuyAndSell() {
    const res = await api.get("/transaction-header/get_buy_and_sell");
    console.log("res", res);
    setBuyAndSell(res.data.historyBuyAndSell);
  }
  useEffect(() => {
    getBuyAndSell();
  }, []);

  return (
    <div>
      <h3>Dashboard</h3>
      <BarChart data={buyAndSell} />
    </div>
  );
};

export default Dashboard;
