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
import Spinner from "../components/Spinner";
import Pagination from "../components/Pagination";
import { useSearchParams } from "react-router-dom";
import { setLoading } from "../reducer/categorySlice";

const Management = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [openModal, setOpenModal] = useState(false);
  const userGlobal = useSelector((state) => state.user);
  console.log("userGlobal", userGlobal);
  const dispatch = useDispatch();

  const [refreshData, setRefreshData] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [dataAdmin, setDataAdmin] = useState([]);
  console.log("data admin", dataAdmin);

  async function fetchAdminUser(query) {
    setIsLoading(true);
    const res = await api.get(`/admin/user/${userGlobal.m_role_id}?${query}`);
    console.log("res fetch user", res);
    setDataAdmin(res.data.userAdmin);
    setIsLoading(false);
  }

  useEffect(() => {
    let query = `page=${currentPage}`;
    query += `&${searchParams.toString}`;
    setSearchParams(searchParams);

    if (userGlobal.role == "super admin") {
      fetchAdminUser(query);
      setRefreshData(false);
    }
  }, [userGlobal, searchParams, setSearchParams, currentPage, refreshData]);

  async function handleAddAdmin(e) {
    e.preventDefault();

    try {
      const res = await api.post(`/admin/user`, {
        email: e.target.email.value,
        username: e.target.username.value,
        password: e.target.password.value,
        name: e.target.name.value,
        salary: e.target.salary.value,
      });
      console.log("res", res);
      if (res.status == 200) {
        setRefreshData(true);
        setOpenModal(false);
      }
      successAlert(res.data.message);
    } catch (error) {
      console.log("error", error);
      errorAlertWithMessage(error.response.data.message);
    }
  }

  if (isLoading) return <Spinner />;

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
        className="mb-4"
        headCols={["Email", "Username", "Role", "Salary"]}
        tableBody={
          <TableAdmin
            value={dataAdmin && dataAdmin.rows ? dataAdmin.rows : []}
          />
        }
      />
      <Pagination
        itemsInPage={dataAdmin && dataAdmin.rows ? dataAdmin.rows.length : null}
        totalItems={dataAdmin.count}
        totalPages={Math.ceil(dataAdmin.count / 6)}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
};

export default Management;
