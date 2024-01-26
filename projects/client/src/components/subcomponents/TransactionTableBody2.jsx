import api from "../../api/api";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { convertToDate } from "../../helper/convertToDate";
import Modal from "./Modal";
import ModalDetail from "../ModalDetail";
import TransactionDetails from "../TransactionDetails";

export default function TransactionTableBody2() {
  const user = useSelector((state) => state.user);
  const [openModal, setOpenModal] = useState(false);
  const [transHead, setTransHead] = useState([]);
  const [transWaitingForPayment, setTrans] = useState([]);
  console.log("transWaitingForPayment", transWaitingForPayment);
  const [detailData, setDetailData] = useState([]);
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
    <>
      <div>
        <ModalDetail
          setOpen={setOpenModal}
          open={openModal}
          children={<TransactionDetails detailData={detailData} />}
        />
      </div>

      <tbody>
        {transWaitingForPayment.map((value) => (
          <tr className="border-b-slate-200 border text-sm">
            <td className="px-3">INV/{value.invoice}</td>
            <td className="pr-6">
              {value.m_transaction_details[0].product_name}
              <br />
              <button
                onClick={() => {
                  setOpenModal(true);
                  setDetailData(value);
                }}
                // onClick={() => onDetails(value.id)}
                className="text-slate-400 hover:text-yellow-400 transition-all duration-200 "
              >
                {" "}
                Details
              </button>
            </td>
            <td>{convertToDate(value.date)}</td>
            <td className="text-center">{value.m_user.name}</td>
            <td className="text-center">{value.m_user.name}</td>
            <td className="text-center">{value.m_user.phone}</td>
            <td className="text-center">{value.m_user.addres}</td>
          </tr>
        ))}
      </tbody>
    </>
  );
}
