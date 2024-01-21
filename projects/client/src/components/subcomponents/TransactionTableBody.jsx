import api from "../../api/api";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { convertToDate } from "../../helper/convertToDate";

export default function TransactionTableBody() {
  const user = useSelector((state) => state.user);
  const [transHead, setTransHead] = useState([]);
  const [transWaitingForPayment, setTrans] = useState([]);
  console.log("transWaitingForPayment", transWaitingForPayment);
  const navigate = useNavigate();

  const getTransHead = async () => {
    const result = await api.get("/transaction/get_transactions", {
      //   branch_id: user.branch_id,
    });
    console.log("result", result);
    setTransHead(result.data.result.rows);
  };

  const onDetails = (headerId) => {
    navigate("/dashboard/transactions/transdet/" + headerId);
  };
  useEffect(() => {
    if (user.role === "super admin" || user.role === "employe") {
      getTransHead();
    }
  }, [user.role]);

  useEffect(() => {
    const filter = transHead.filter((value) => {
      return value.m_status.name === "Menunggu Pembayaran";
    });
    setTrans(filter);
  }, [transHead]);
  return (
    <tbody>
      {transWaitingForPayment.map((value) => (
        <tr className="border-b-slate-200 border text-sm">
          <td className="px-3">INV/{value.invoice}</td>
          <td className="pr-6">
            {value.m_transaction_details.product_name}
            <br />
            <button
              onClick={() => onDetails(value.id)}
              className="text-slate-400 hover:text-yellow-400 transition-all duration-200 "
            >
              {" "}
              Details
            </button>
          </td>
          <td>{convertToDate(value.date)}</td>
          {/* <td className="text-center">{value.Branch.name}</td> */}
        </tr>
      ))}
       
    </tbody>
  );
}
