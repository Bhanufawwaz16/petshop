import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import api from "../api/api";
import { useSelector } from "react-redux";
import Table2 from "../components/Table2";
import SalesReportTable from "../components/SalesReportTable";
import Footer from "../components/Footer";
import DateRange from "../components/DateRange";
import { Button } from "antd";
import { useSearchParams } from "react-router-dom";
import Item from "antd/es/list/Item";

const SalesReport = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const userGlobal = useSelector((state) => state.user);
  const [dataSalesReport, setDataSalesReport] = useState([]);
  const [Dates, setDates] = useState();
  console.log("dates", Dates);

  // async function getData(query) {
  //   const res = await api.get(`/transaction-header/sales_report?${query}`);
  //   console.log("res", res);
  //   setDataSalesReport(res.data.data);
  // }
  // useEffect(() => {
  //   getData();
  // }, [userGlobal]);

  async function handleSearch() {
    let query = ``;

    Dates[0]
      ? searchParams.set("startDate", Dates[0])
      : searchParams.delete("startDate");

    Dates[1]
      ? searchParams.set("endDate", Dates[1])
      : searchParams.delete("endDate");

    query += `&${searchParams.toString()}`;

    const res = await api.get(`/transaction-header/sales_report?${query}`);
    console.log("res", res);
    setDataSalesReport(res.data.data);
  }
  return (
    <div>
      <Header title="Sales Report" desc="A list sales report" />;
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
          "Transaction Date",
          "Username",
          "qty",
          "Price",
        ]}
        tableBody={<SalesReportTable detailData={dataSalesReport} />}
        tfoot={<Footer dataSalesReport={dataSalesReport} />}
      />
    </div>
  );
};

export default SalesReport;
