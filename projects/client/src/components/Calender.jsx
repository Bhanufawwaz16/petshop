import { Fragment, useState } from "react";
import {
  CalendarIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  EllipsisHorizontalIcon,
  MapPinIcon,
} from "@heroicons/react/20/solid";
import { Menu, Transition } from "@headlessui/react";
import {
  add,
  eachDayOfInterval,
  endOfMonth,
  format,
  getDay,
  isEqual,
  isSameDay,
  isSameMonth,
  isToday,
  parse,
  parseISO,
  startOfToday,
} from "date-fns";
import { convertToDate } from "../helper/convertToDate";

const meetings = [
  {
    id: 1,
    date: "January 10th, 2022",
    time: "5:00 PM",
    datetime: "2022-01-10T17:00",
    name: "Leslie Alexander",
    imageUrl:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    location: "Starbucks",
  },
  // More meetings...
];
// const days = [
//   { date: "2021-12-27" },
//   { date: "2021-12-28" },
//   { date: "2021-12-29" },
//   { date: "2021-12-30" },
//   { date: "2021-12-31" },
//   { date: "2022-01-01", isCurrentMonth: true },
//   { date: "2022-01-02", isCurrentMonth: true },
//   { date: "2022-01-03", isCurrentMonth: true },
//   { date: "2022-01-04", isCurrentMonth: true },
//   { date: "2022-01-05", isCurrentMonth: true },
//   { date: "2022-01-06", isCurrentMonth: true },
//   { date: "2022-01-07", isCurrentMonth: true },
//   { date: "2022-01-08", isCurrentMonth: true },
//   { date: "2022-01-09", isCurrentMonth: true },
//   { date: "2022-01-10", isCurrentMonth: true },
//   { date: "2022-01-11", isCurrentMonth: true },
//   { date: "2022-01-12", isCurrentMonth: true, isToday: true },
//   { date: "2022-01-13", isCurrentMonth: true },
//   { date: "2022-01-14", isCurrentMonth: true },
//   { date: "2022-01-15", isCurrentMonth: true },
//   { date: "2022-01-16", isCurrentMonth: true },
//   { date: "2022-01-17", isCurrentMonth: true },
//   { date: "2022-01-18", isCurrentMonth: true },
//   { date: "2022-01-19", isCurrentMonth: true },
//   { date: "2022-01-20", isCurrentMonth: true },
//   { date: "2022-01-21", isCurrentMonth: true },
//   { date: "2022-01-22", isCurrentMonth: true, isSelected: true },
//   { date: "2022-01-23", isCurrentMonth: true },
//   { date: "2022-01-24", isCurrentMonth: true },
//   { date: "2022-01-25", isCurrentMonth: true },
//   { date: "2022-01-26", isCurrentMonth: true },
//   { date: "2022-01-27", isCurrentMonth: true },
//   { date: "2022-01-28", isCurrentMonth: true },
//   { date: "2022-01-29", isCurrentMonth: true },
//   { date: "2022-01-30", isCurrentMonth: true },
//   { date: "2022-01-31", isCurrentMonth: true },
//   { date: "2022-02-01" },
//   { date: "2022-02-02" },
//   { date: "2022-02-03" },
//   { date: "2022-02-04" },
//   { date: "2022-02-05" },
//   { date: "2022-02-06" },
// ];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Calender({ schedule = [], setPickDay }) {
  let today = startOfToday();
  let [selectedDay, setSelectedDay] = useState(today);
  let [currentMonth, setCurrentMonth] = useState(format(today, "MMM-yyyy"));
  let firstDayCurrentMonth = parse(currentMonth, "MMM-yyyy", new Date());
  setPickDay(selectedDay);
  let days = eachDayOfInterval({
    start: firstDayCurrentMonth,
    end: endOfMonth(firstDayCurrentMonth),
  });

  function previousMonth() {
    let firstDayNextMonth = add(firstDayCurrentMonth, { months: -1 });
    setCurrentMonth(format(firstDayNextMonth, "MMM-yyyy"));
  }

  function nextMonth() {
    let firstDayNextMonth = add(firstDayCurrentMonth, { months: 1 });
    setCurrentMonth(format(firstDayNextMonth, "MMM-yyyy"));
  }

  return (
    <div>
      <h2 className="text-lg font-semibold text-gray-900">Upcoming meetings</h2>
      <div className="lg:grid lg:grid-cols-12 lg:gap-x-16">
        <div className="mt-10 text-center lg:col-start-8 lg:col-end-13 lg:row-start-1 lg:mt-9 xl:col-start-9 ">
          <div className="flex items-center">
            <h2 className="flex-auto font-semibold text-gray-900">
              {format(firstDayCurrentMonth, "MMMM yyyy")}
            </h2>
            <button
              type="button"
              onClick={previousMonth}
              className="-my-1.5 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
            >
              <span className="sr-only">Previous month</span>
              <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
            </button>
            <button
              onClick={nextMonth}
              type="button"
              className="-my-1.5 -mr-1.5 ml-2 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
            >
              <span className="sr-only">Next month</span>
              <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
            </button>
                      
          </div>
          <div className="mt-6 grid grid-cols-7 text-xs leading-6 text-gray-500">
            <div>M</div>
            <div>T</div>
            <div>W</div>
            <div>T</div>
            <div>F</div>
            <div>S</div>
            <div>S</div>
          </div>
          <div className="isolate mt-2 grid grid-cols-7 gap-px rounded-lg text-sm shadow ring-1 ring-gray-200">
            {days.map((day, dayIdx) => (
              <div
                key={day.toString()}
                className={classNames(
                  dayIdx === 0 && colStartClasses[getDay(day)],
                  "py-1.5"
                )}
              >
                <button
                  type="button"
                  onClick={() => setSelectedDay(day)}
                  className={classNames(
                    isEqual(day, selectedDay) && "text-white",
                    !isEqual(day, selectedDay) &&
                      isToday(day) &&
                      "text-red-500",
                    !isEqual(day, selectedDay) &&
                      !isToday(day) &&
                      isSameMonth(day, firstDayCurrentMonth) &&
                      "text-gray-900",
                    !isEqual(day, selectedDay) &&
                      !isToday(day) &&
                      !isSameMonth(day, firstDayCurrentMonth) &&
                      "text-gray-400",
                    isEqual(day, selectedDay) && isToday(day) && "bg-red-500",
                    isEqual(day, selectedDay) && !isToday(day) && "bg-gray-900",
                    !isEqual(day, selectedDay) && "hover:bg-gray-200",
                    (isEqual(day, selectedDay) || isToday(day)) &&
                      "font-semibold",
                    "mx-auto flex h-8 w-8 items-center justify-center rounded-full"
                  )}
                >
                  <time dateTime={format(day, "yyyy-MM-dd")}>
                    {format(day, "d")}
                  </time>
                </button>

                <div className="mx-auto mt-1 h-1 w-1">
                  {meetings.some((meeting) =>
                    isSameDay(parseISO(meeting.startDatetime), day)
                  ) && <div className="h-1 w-1 rounded-full bg-sky-500"></div>}
                </div>
              </div>
            ))}
          </div>
          {/* <button
            type="button"
            className="mt-8 w-full rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Add event
          </button> */}
        </div>
        <ol className="mt-4 divide-y divide-gray-100 text-sm leading-6 lg:col-span-7 xl:col-span-8">
          {schedule.map((meeting) => (
            <li
              key={meeting.id}
              className="relative flex space-x-6 py-6 xl:static items-center"
            >
              <img
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                alt=""
                className="h-10 w-10 flex-none rounded-full"
              />
              <div className="flex-auto">
                <p className="text-gray-900 text-left">{meeting.name}</p>
                {/* <dl className="mt-2 flex flex-col text-gray-500 xl:flex-row"> */}
                <div className="mt-2 flex items-start space-x-3 xl:mt-0 xl:border-l xl:border-gray-400 xl:border-opacity-50">
                  {/* <div className="flex items-start space-x-3"> */}
                  <p className="mt-0.5">
                    <CalendarIcon
                      className="h-5 w-5 text-gray-400"
                      aria-hidden="true"
                    />
                  </p>
                  <p className="mt-0.5">
                    <time dateTime={meeting.date}>
                      {convertToDate(meeting.date)}
                    </time>
                  </p>
                  {/* </div> */}
                  <p className="mt-0.5">
                    {console.log("Meeting time_start:", meeting.time_start)}
                    <time dateTime={meeting.time_start}>
                      {format(
                        parse(meeting.time_start, "HH:mm:ss", new Date()),
                        "h:mm a"
                      ) || ""}
                    </time>{" "}
                    -{" "}
                    <time dateTime={meeting.time_finish}>
                      {format(
                        parse(meeting.time_finish, "HH:mm:ss", new Date()),
                        "h:mm a"
                      ) || ""}
                    </time>
                  </p>
                </div>
                {/* </dl> */}
              </div>
              <Menu
                as="div"
                className="absolute top-6 right-0 xl:relative xl:top-auto xl:right-auto xl:self-center"
              >
                {/* <div>
                  <Menu.Button className="-m-2 flex items-center rounded-full p-2 text-gray-500 hover:text-gray-600">
                    <span className="sr-only">Open options</span>
                    <EllipsisHorizontalIcon
                      className="h-5 w-5"
                      aria-hidden="true"
                    />
                  </Menu.Button>
                </div> */}

                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute right-0 z-10 mt-2 w-36 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            className={classNames(
                              active
                                ? "bg-gray-100 text-gray-900"
                                : "text-gray-700",
                              "block px-4 py-2 text-sm"
                            )}
                          >
                            Edit
                          </a>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            className={classNames(
                              active
                                ? "bg-gray-100 text-gray-900"
                                : "text-gray-700",
                              "block px-4 py-2 text-sm"
                            )}
                          >
                            Cancel
                          </a>
                        )}
                      </Menu.Item>
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>
            </li>
          ))}
        </ol>
      </div>
          
    </div>
  );
}

let colStartClasses = [
  "",
  "col-start-2",
  "col-start-3",
  "col-start-4",
  "col-start-5",
  "col-start-6",
  "col-start-7",
];
