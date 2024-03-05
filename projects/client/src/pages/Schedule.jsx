import React, { useEffect, useState } from "react";
import Calender from "../components/Calender";
import AddDataHeader from "../components/AddDataHeader";
import { PlusIcon } from "@heroicons/react/20/solid";
import ModalForm from "../components/ModalForm";
import ScheduleForm from "../components/ScheduleForm";
import api from "../api/api";
import { useSelector } from "react-redux";
import { errorAlertWithMessage, successAlert } from "../helper/alert";

const Schedule = () => {
  const userGlobal = useSelector((state) => state.user);

  const [openModal, setOpenModal] = useState(false);
  const [employe, setEmploye] = useState([]);
  const [schedule, setSchedule] = useState([]);
  const [pickDay, setPickDay] = useState("");
  console.log("pickDay", pickDay);
  const [name, setName] = useState({});
  const [startDate, setStartDate] = useState();
  const [finishDate, setFinishDate] = useState();
  const [startTime, setStartTime] = useState();
  const [endTime, setEndTime] = useState();

  async function getEmploye() {
    const res = await api.get("/user");
    console.log("res", res);

    setEmploye(res.data.employe);
  }
  async function getSchedule() {
    const resSchedule = await api.get("/user/schedule", {
      params: {
        date: pickDay,
      },
    });

    setSchedule(resSchedule.data.schedule);
    console.log("resSchedule", resSchedule);
  }
  useEffect(() => {
    getEmploye();
    getSchedule();
  }, [pickDay]);

  async function handleSubmit(e) {
    e.preventDefault();
    const userId = name ? name.id : null;
    const timeIn = startTime ? startTime.name : null;
    const timeOut = endTime ? endTime.name : null;
    try {
      const res = await api.post("/user", {
        userId: userId,
        startDate: startDate,
        finishDate: finishDate,
        startTime: timeIn,
        endTime: timeOut,
      });
      if (res.status === 200) {
        setTimeout(() => {
          setOpenModal(false);
        }, 2000);
      }
      successAlert(res.data.message);
    } catch (error) {
      console.log("error", error);
      errorAlertWithMessage(error.response.data.message);
    }
  }

  function handleOpenModal() {
    setOpenModal(true);
  }
  return (
    <div>
      <ModalForm
        title="Schedule"
        open={openModal}
        setOpen={setOpenModal}
        onSubmit={handleSubmit}
        actionSend="add"
        children={
          <ScheduleForm
            employe={employe}
            name={name}
            setName={setName}
            setStartDate={setStartDate}
            setFinishDate={setFinishDate}
            StartTime={startTime}
            setStartTime={setStartTime}
            endTime={endTime}
            setEndTime={setEndTime}
          />
        }
      />

      <div className="flex justify-end mb-4">
        <button
          type="button"
          className="inline-flex items-center rounded-md border border-transparent bg-amber-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
          onClick={() => {
            setOpenModal(true);
          }}
        >
          <PlusIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
          add schedule
        </button>
      </div>

      <Calender schedule={schedule} setPickDay={setPickDay} />
    </div>
  );
};

export default Schedule;
