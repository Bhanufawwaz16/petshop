import { useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
// import LoadingButton from "./LoadingButton";
import Comboboxes from "./Comboboxes";
import ImageDragAndDrop from "./ImageDragAndDrop";

const time = [
  {
    id: 1,
    name: "07:00",
  },
  {
    id: 2,
    name: "14:00",
  },
];

export default function ScheduleForm({
  employe = [],
  name,
  setName,
  setStartDate,
  setFinishDate,
  StartTime,
  setStartTime,
  endTime,
  setEndTime,
}) {
  const isHidden = false;
  const handleStartTimeChange = (selectedStartTime) => {
    console.log("selectedStartTime", selectedStartTime);
    // Set start time
    setStartTime(selectedStartTime);

    // Jika end time sama dengan start time, atur end time ke nilai default
    if (selectedStartTime.name === "07:00") {
      setEndTime(time[1]); // Atur ke nilai default atau sesuaikan dengan kebutuhan
    } else if (selectedStartTime.name === "14:00") {
      setEndTime({
        id: 3,
        name: "22:00",
      });
    }
  };

  const handleEndTimeChange = (selectedEndTime) => {
    // Set end time
    setEndTime(selectedEndTime);

    // Jika end time sama dengan start time, atur start time ke nilai default
    if (StartTime === selectedEndTime) {
      setStartTime(""); // Atur ke nilai default atau sesuaikan dengan kebutuhan
    }
  };

  const filteredEndTimes = time.filter(
    ({ name }) => name > StartTime && name !== "22:00"
  );
  return (
    <form
      className="space-y-8 divide-y divide-gray-200"
      // onSubmit={handleSubmit}
    >
      <div className="space-y-8 divide-y divide-gray-200">
        <div>
          <div>
            <h3 className="text-lg font-medium leading-6 text-gray-900">
              {/* {title} Product */}
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              {/* {title} product's information. */}
            </p>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
            <div className="sm:col-span-3 sm:col-start-1">
              <label
                htmlFor="category"
                className="block text-sm font-medium text-gray-700"
              >
                Employe Name
              </label>
              <Comboboxes
                label="Employe Name"
                people={employe}
                selectedValue={name}
                setSelectedValue={setName}
                className="text-sm rounded-md border-0 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 sm:text-sm sm:leading-6"
              />
            </div>

            <div className="sm:col-span-4">
              <label
                htmlFor="productName"
                className="block text-sm font-medium text-gray-700"
              >
                Start Date
              </label>
              <input
                type="date"
                name="startDate"
                id="startDate"
                className="block w-full min-w-0 flex-1 rounded-md border-gray-300 focus:border-orange-500 focus:ring-orange-500 sm:text-sm"
                // defaultValue={product.name}

                onChange={(e) => {
                  setStartDate(e.target.value);
                }}
                required
              />
            </div>

            <div className="sm:col-span-4">
              <label
                htmlFor="productName"
                className="block text-sm font-medium text-gray-700"
              >
                Finish Date
              </label>
              <input
                type="date"
                name="finishDate"
                id="finishDate"
                className="block w-full min-w-0 flex-1 rounded-md border-gray-300 focus:border-orange-500 focus:ring-orange-500 sm:text-sm"
                // defaultValue={product.name}

                onChange={(e) => {
                  setFinishDate(e.target.value);
                }}
                required
              />
            </div>

            <div className="sm:col-span-3 sm:col-start-1">
              <label
                htmlFor="category"
                className="block text-sm font-medium text-gray-700"
              >
                Start Time
              </label>
              <Comboboxes
                label="Start Time"
                people={time}
                selectedValue={StartTime}
                setSelectedValue={handleStartTimeChange}
                className="text-sm rounded-md border-0 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 sm:text-sm sm:leading-6"
              />
            </div>

            <div className="sm:col-span-3 sm:col-start-1">
              <label
                htmlFor="category"
                className="block text-sm font-medium text-gray-700"
              >
                End Time
              </label>
              <Comboboxes
                label="End Time"
                people={filteredEndTimes}
                selectedValue={endTime}
                setSelectedValue={handleEndTimeChange}
                isInputDisabled={isHidden}
                className="text-sm rounded-md border-0 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 sm:text-sm sm:leading-6"
              />
            </div>

            {/* )} */}
          </div>
        </div>
      </div>
      {/* <div className="pt-5">
        <div className="flex justify-end">
          <button
            type="button"
            className="rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
            onClick={() => setShowForm(false)}
          >
            Cancel
          </button>
          {isLoading ? (
            <LoadingButton className="ml-3" />
          ) : (
          <button
            type="submit"
            className="ml-3 inline-flex justify-center rounded-md border border-transparent bg-amber-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
          >
            Save
          </button>
          )}
        </div>
      </div> */}
        
    </form>
  );
}
