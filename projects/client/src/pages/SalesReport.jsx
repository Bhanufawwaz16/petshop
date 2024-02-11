import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import api from "../api/api";
import { useSelector } from "react-redux";
import Table2 from "../components/Table2";
import SalesReportTable from "../components/SalesReportTable";

const SalesReport = () => {
  const userGlobal = useSelector((state) => state.user);
  const [dataSalesReport, setDataSalesReport] = useState([]);

  async function getData(query) {
    const res = await api.get(`/transaction-header/sales_report?${query}`);
    console.log("res", res);
    setDataSalesReport(res.data.data);
  }
  useEffect(() => {
    getData();
  }, [userGlobal]);
  return (
    <div>
      <Header title="Sales Report" desc="A list sales report" />;
      <Table2
        headCols={["No", "Product Name", "Transaction Date", "Username","qty", "Price"]}
        tableBody={<SalesReportTable detailData={dataSalesReport} />}
      />
    </div>
  );
};

export default SalesReport;
