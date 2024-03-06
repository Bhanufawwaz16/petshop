import Table from "../Table";
import TransactionTableBody from "./TransactionTableBody2";
import api from "../../api/api";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
export default function TransactionCanceled() {
  const user = useSelector((state) => state.user);
  const [transHead, setTransHead] = useState([]);
  const [transWaitingForPayment, setTrans] = useState([]);
  const [action, setAction] = useState(false);

  const getTransHead = async () => {
    const result = await api.get("/transaction/get_transaction/" + user.id);
    setTransHead(result.data.data.Transaction_Header.rows);
  };

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
          "Name",
          "Phone",
          "Address",
        ]}
        tableBody={
          <TransactionTableBody
            transaction={transHead}
            wantAction={"Dibatalkan"}
            action={action}
            setAction={setAction}
          />
        }
      />
    </div>
  );
}
