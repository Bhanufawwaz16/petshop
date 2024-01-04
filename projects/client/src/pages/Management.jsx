import React, { useState } from "react";
import AddDataHeader from "../components/AddDataHeader";
import ModalForm from "../components/ModalForm";
import FormAddAdmin from "../components/FormAddAdmin";

const Management = () => {
  const [openModal, setOpenModal] = useState(false);

  function handleAddAdmin(e) {
    e.preventDefault();
    const email = e.target.email.value;
    const username = e.target.username.value;
    const password = e.target.password.value;
  }
  return (
    <div>
      <ModalForm
        title="Add Admin Form"
        setOpen={setOpenModal}
        open={openModal}
        action="Add"
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
    </div>
  );
};

export default Management;
