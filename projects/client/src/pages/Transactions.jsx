import React, { useState } from "react";
import { useDispatch } from "react-redux";
import TransactionHeader from "../components/TransactionHeader";
import NavDashGlobal from "../components/NavDashGlobal";

const Transactions = () => {
  const dispatch = useDispatch();
  const [showAddProductForm, setShowAddProductForm] = useState(false);
  const [showEditProductForm, setShowEditProductForm] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [editedProduct, setEditedProduct] = useState({});

  const init = [
    { name: "Waiting for Payment", current: true },
    { name: "Waiting for Confirmation", current: false },
    { name: "In Process", current: false },
    { name: "On Delivery", current: false },
    { name: "Order Confirmed", current: false },
    { name: "Order Canceled", current: false },
  ];

  return (
    <div>
      <TransactionHeader title="Transaction" desc="A List Of All Transaction" />
      <NavDashGlobal init={init} />
    </div>
  );
};

export default Transactions;
