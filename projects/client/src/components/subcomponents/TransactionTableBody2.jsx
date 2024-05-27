import api from "../../api/api";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { convertToDate } from "../../helper/convertToDate";
import Modal from "./Modal";
import ModalDetail from "../ModalDetail";
import TransactionDetails from "../TransactionDetails";
import ModalImage from "../ModalImage";

export default function TransactionTableBody2({
  button1,
  button2,
  onClickBtn1,
  onClickBtn2,
  action,
  setAction,
  wantAction,
}) {
  const user = useSelector((state) => state.user);
  const [openModal, setOpenModal] = useState(false);
  const [openModalImage, setOpenModalImage] = useState(false);
  const [transHead, setTransHead] = useState([]);
  const [transWaitingForPayment, setTrans] = useState([]);
  console.log("transWaitingForPayment", transWaitingForPayment);
  const [detailData, setDetailData] = useState([]);
  const [imgPayment, setImgPayment] = useState();
  const navigate = useNavigate();

  const getTransHead = async () => {
    const result = await api.get("/transaction/get_transactions", {});
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
    setAction(false);
  }, [user.role, action]);

  useEffect(() => {
    const filter = transHead.filter((value) => {
      return value.m_status.name === `${wantAction}`;
    });
    setTrans(filter);
  }, [transHead]);

  const handleOpenModal = (data) => {
    setImgPayment(data);
    console.log("data", data);
    setOpenModalImage(true);
  };

  return (
    <>
      <div>
        <ModalDetail
          setOpen={setOpenModal}
          open={openModal}
          children={<TransactionDetails detailData={detailData} />}
        />
        <ModalImage
          setOpen={setOpenModalImage}
          open={openModalImage}
          linkContent={imgPayment}
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
                className="text-slate-400 hover:text-yellow-400 transition-all duration-200 "
              >
                {" "}
                Details
              </button>
            </td>
            <td>{convertToDate(value.date)}</td>
            <td className="text-center">
              <a
                className="flex items-center cursor-pointer"
                onClick={() => handleOpenModal(value.user_payment)}
              >
                <img
                  className="h-10 w-10 mx-auto"
                  src={`http://localhost:2000/static/transHead/${value.user_payment}`}
                  alt={`${value.user_payment}`}
                />
              </a>
            </td>
            <td className="text-center">{value.m_user.name}</td>
            <td className="text-center">{value.m_user.phone}</td>
            <td className="text-center">
              {value.m_user.addres} {value.m_user.location}
            </td>
            {button1 ? (
              <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                <button
                  className="text-teal-600 hover:text-teal-900"
                  onClick={() => onClickBtn1(value.id)}
                >
                  {button1}
                </button>
              </td>
            ) : (
              <></>
            )}
            {button2 ? (
              <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                <button
                  className="text-red-600 hover:text-red-900 ml-4"
                  onClick={() => onClickBtn2(value.id, value.m_status.name)}
                >
                  {button2}
                </button>
              </td>
            ) : (
              <></>
            )}
          </tr>
        ))}
      </tbody>
    </>
  );
}
