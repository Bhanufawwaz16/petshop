import Table from "../Table";
import api from "../../api/api";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

import TransactionTableBody from "./TransactionTableBody";
import {
  deleteConfirmationAlert,
  errorAlert,
  errorAlertWithMessage,
  successAlert,
} from "../../helper/alert";
import TransactionTableBody2 from "./TransactionTableBody2";
export default function TransactionWaitingForConfirmation() {
  const user = useSelector((state) => state.user);
  const [transHead, setTransHead] = useState([]);

  const getTransHead = async () => {
    const result = await api.get("/transaction/get_transactions");
    setTransHead(result.data.result.rows);
  };

  async function changeStatusToDeliver(transactionId) {
    try {
      const res = await api.patch(`/transactions/${transactionId}`, {
        status: "Diproses",
      });
      if (res.status === 200) successAlert("Order Delivered!");
      getTransHead();
    } catch (err) {
      errorAlert();
    }
  }

  function cancelOrder(transactionId) {
    deleteConfirmationAlert(() =>
      api
        .patch(`/transactions/${transactionId}`, {
          status: "Menunggu Pembayaran",
        })
        .then((res) => {
          if (res.status === 200) successAlert("Order Canceled!");
          getTransHead();
        })
        .catch((err) => errorAlertWithMessage(err.response.data.error))
    );
  }

  useEffect(() => {
    getTransHead();
  }, []);

  return (
    <div className="sm:flex sm:items-center">
      <Table
        className="mb-3"
        headCols={[
          "Invoice No.",
          "Product",
          "Date",
          "Payment",
          "name",
          "phone",
          "address",
        ]}
        tableBody={
          <TransactionTableBody2
            transaction={transHead}
            status={"Menunggu Konfirmasi Pembayaran"}
            button1={"Process"}
            button2={"Cancle"}
            onClickBtn1={changeStatusToDeliver}
            onClickBtn2={cancelOrder}
          />
        }
      />
    </div>
  );
}
