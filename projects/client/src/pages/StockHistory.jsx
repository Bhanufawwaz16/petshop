import React, { useState } from "react";
import Header from "../components/Header";
import DateRange from "../components/DateRange";
import Table2 from "../components/Table2";
import SalesReportTable from "../components/SalesReportTable";
import Footer from "../components/Footer";
import { useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";
import api from "../api/api";
import StockHistoryTable from "../components/StockHistoryTable";

const StockHistory = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const userGlobal = useSelector((state) => state.user);
  const [dataStockHistory, setDataStockHistory] = useState([]);
  console.log("data stock history", dataStockHistory);
  const [Dates, setDates] = useState();

  async function handleSearch() {
    let query = ``;

    Dates[0]
      ? searchParams.set("startDate", Dates[0])
      : searchParams.delete("startDate");

    Dates[1]
      ? searchParams.set("endDate", Dates[1])
      : searchParams.delete("endDate");

    query += `&${searchParams.toString()}`;

    const res = await api.get(`/transaction-header/stock_history?${query}`);
    console.log("res", res);
    setDataStockHistory(res.data.data);
  }

  return (
    <div>
      <Header title="Stock History" desc="A list stock history" />;
      <div className="flex items-center justify-between flex-wrap gap-2 pb-4 mb-6 mt-12 border-b border-gray-200">
        <div className="flex gap-2 items-center flex-wrap">
          <DateRange setDates={setDates} className="w-96" />
          <button
            onClick={handleSearch}
            className="bg-blue-500 text-white font-bold py-1 px-8 rounded shadow border-2 border-blue-500 hover:bg-transparent hover:text-blue-500 transition-all duration-300"
          >
            search
          </button>
        </div>
      </div>
      <Table2
        headCols={[
          "No",
          "Product Name",
          "Suplier/customer",
          "Status",
          "Date",
          "qty",
          "Total Price",
        ]}
        tableBody={<StockHistoryTable data={dataStockHistory} />}
        // tfoot={<Footer dataSalesReport={dataSalesReport} />}
      />
    </div>
  );
};

export default StockHistory;
