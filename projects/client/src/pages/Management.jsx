import React, { useEffect, useState } from "react";
import AddDataHeader from "../components/AddDataHeader";
import ModalForm from "../components/ModalForm";
import FormAddAdmin from "../components/FormAddAdmin";
import api from "../api/api";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../reducer/userSlice";
import { errorAlertWithMessage, successAlert } from "../helper/alert";
import Table from "../components/Table";
import TableAdmin from "../components/TableAdmin";

const Management = () => {
  const [openModal, setOpenModal] = useState(false);
  const userGlobal = useSelector((state) => state.user);
  console.log("userGlobal", userGlobal);
  const dispatch = useDispatch();

  const [dataAdmin, setDataAdmin] = useState([]);

  async function fetchAdminUser() {
    const res = await api.get(`/admin/user/` + userGlobal.m_role_id);
    console.log("res fetch user", res);
    setDataAdmin(res.data.userAdmin);
  }

  useEffect(() => {
    if (userGlobal.role == "super admin") {
      fetchAdminUser();
    }
  }, [userGlobal]);

  async function handleAddAdmin(e) {
    e.preventDefault();

    try {
      const res = await api.post(`/admin/user`, {
        email: e.target.email.value,
        username: e.target.username.value,
        password: e.target.password.value,
      });
      console.log("res", res);
      successAlert(res.data.message);
    } catch (error) {
      console.log("error", error);
      errorAlertWithMessage(error.response.data.message);
    }
  }
  return (
    <div>
      <ModalForm
        title="Add Admin Form"
        setOpen={setOpenModal}
        open={openModal}
        action="Add"
        onSubmit={handleAddAdmin}
        children={<FormAddAdmin />}
      />
      <div>
        <AddDataHeader
          title="Management Admin"
          desc="A List Off All Admin"
          addButtonText="Add Admin"
          onAddClick={() => setOpenModal(true)}
        />
      </div>
      <Table
        headCols={["Email", "Username"]}
        // tableBody={<TableAdmin value={dataAdmin.rows} />}
      />
    </div>
  );
};

export default Management;
