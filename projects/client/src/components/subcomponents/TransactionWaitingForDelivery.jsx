import Table from "../Table";
import TransactionTableBody from "./TransactionTableBody2";
import api from "../../api/api";
import { useSelector, useNavigate } from "react-redux";
import { useEffect, useState } from "react";
import {
  deleteConfirmationAlert,
  errorAlert,
  errorAlertWithMessage,
  successAlert,
} from "../../helper/alert";

export default function TransactionWaitingForDelivery() {
  const user = useSelector((state) => state.user);
  const [transHead, setTransHead] = useState([]);
  const [action, setAction] = useState(false);
  const [transWaitingForPayment, setTrans] = useState([]);

  const wantAction = "Pesanan Dikonfirmasi";

  const getTransHead = async () => {
    const result = await api.get("/transaction/get_transactions", {
      branch_id: user.branch_id,
    });
    console.log("result", result);
    setTransHead(result.data.result.rows);
  };

  async function changeStatusToDeliver(transactionId) {
    try {
      const res = await api.patch(`/transaction/${transactionId}`, {
        status: "Dikirim",
        role: user.role,
        wantAction: wantAction,
      });
      if (res.status === 200) {
        setAction(true);
        successAlert("Order Delivered!");
      }
    } catch (err) {
      console.log("err", err);
      errorAlertWithMessage(err.response.data.message);
    }
  }

  function cancelOrder(transactionId) {
    deleteConfirmationAlert(() =>
      api
        .patch(`/transaction/${transactionId}`, {
          status: "Dibatalkan",
          role: user.role,
          wantAction: wantAction,
        })
        .then((res) => {
          if (res.status === 200) {
            setAction(true);
            successAlert("Order Canceled!");
          }
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
        className="mb-4"
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
          <TransactionTableBody
            transaction={transHead}
            status={"Diproses"}
            button1={"Deliver"}
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
