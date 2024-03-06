import Table from "../Table";
import TransactionTableBody from "./TransactionTableBody2";
import api from "../../api/api";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
export default function TransactionDone() {
  const user = useSelector((state) => state.user);
  const [transHead, setTransHead] = useState([]);
  const [transWaitingForPayment, setTrans] = useState([]);
  const [action, setAction] = useState(false);

  const getTransHead = async () => {
    const result = await api.get("/transaction/get_transactions", {
      branch_id: user.branch_id,
    });
    setTransHead(result.data.result.rows);
  };

  useEffect(() => {
    getTransHead();
  }, []);

  return (
    <div className="sm:flex sm:items-center">
      <Table
        className="mb-4"
        headCols={["Invoice No.", "Product", "Date", "Payment", "Name", "Phone", "Address"]}
        tableBody={
          <TransactionTableBody
            transaction={transHead}
            wantAction={"Completed"}
            action={action}
            setAction={setAction}
          />
        }
      />
    </div>
  );
}
