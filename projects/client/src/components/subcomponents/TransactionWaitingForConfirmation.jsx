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
  const [action, setAction] = useState(false);
  const wantAction = "Menunggu Konfirmasi";

  const getTransHead = async () => {
    const result = await api.get("/transaction/get_transactions");
    setTransHead(result.data.result.rows);
    setAction(false);
  };

  async function changeStatusToDeliver(transactionId) {
    try {
      const res = await api.patch(`/transaction/${transactionId}`, {
        status: "Pesanan Dikonfirmasi",
        role: user.role,
        wantAction: wantAction,
      });
      if (res.status === 200) {
        setAction(true);
        successAlert("Order In Process");
      }
    } catch (err) {
      console.log("err", err);
      errorAlertWithMessage(err.response.data.message);
    }
  }

  async function cancelOrder(transactionId, beforeStatus) {
    deleteConfirmationAlert(() =>
      api
        .patch(`/transaction/${transactionId}`, {
          status: "Dibatalkan",
          wantAction: beforeStatus,
          role: user.role,
        })
        .then((res) => {
          console.log("res", res);
          if (res.status === 200) {
            setAction(true); // Toggle the value
            successAlert("Order Canceled!");
          }
        })
        .catch((err) => errorAlertWithMessage(err.response.data.error))
    );
  }

  useEffect(() => {
    if (action) {
      console.log("test action");
      getTransHead();
    }
  }, [action]);

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
            button2={"Cancel"}
            onClickBtn1={changeStatusToDeliver}
            onClickBtn2={cancelOrder}
            action={action}
            setAction={setAction}
            wantAction={wantAction}
          />
        }
      />
    </div>
  );
}
