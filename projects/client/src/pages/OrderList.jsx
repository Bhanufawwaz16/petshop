import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { ShoppingBagIcon } from "@heroicons/react/24/outline";
import pattern from "../assets/pattern.jpg";
import Dropdown from "../components/Dropdown";
import api from "../api/api";
import { numToIDRCurrency } from "../helper/currency";
import { convertToDate } from "../helper/convertToDate";
import Pagination from "../components/Pagination";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import DropImageModal from "../components/subcomponents/DropImageModal";
import WarningModalOrderdList from "../components/subcomponents/WarningModalOrderList";
import NoAddress from "../assets/noAddress.png";
import Swal from "sweetalert2";
import DateRange from "../components/DateRange";

const sortOptions = [
  { value: "", label: "None" },
  { value: "Menunggu Pembayaran", label: "Menunggu Pembayaran" },
  {
    value: "Menunggu Konfirmasi Pembayaran",
    label: "Menunggu Konfirmasi Pembayaran",
  },
  { value: "Diproses", label: "Diproses" },
  { value: "Dikirim", label: "Dikirim" },
  { value: "Pesanan Dikonfirmasi", label: "Pesanan Dikonfirmasi" },
  { value: "Dibatalkan", label: "Dibatalkan" },
];

const sortBy = [
  { value: "", label: "None" },
  { value: "invoice_asc", label: "Invoice (older - newer)" },
  { value: "invoice_desc", label: "Invoice (newer - older)" },
  { value: "date_asc", label: "Date (older - newer)" },
  { value: "date_desc", label: "Date (newer - older)" },
];

const OrderList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const user = useSelector((state) => state.user);
  console.log("user global", user);
  const [usersCart, setUsersCart] = useState([]);
  console.log("user Cart", usersCart);
  const [count, setCount] = useState();
  const [statusFilter, setstatusFilter] = useState(sortOptions[0]);
  const [sortByOption, setSortByOption] = useState(sortBy[0]);
  const [searchFilter, setSearchFilter] = useState("");

  const [dates, setDates] = useState([]);

  const getUsersCart = async () => {
    const result = await api.get(
      "/transaction/get_transaction/" +
        user.id +
        `?page=${currentPage}` +
        `&status=${statusFilter.value}` +
        `&q=${searchFilter}` +
        `&sort=${sortByOption.value}` +
        `&startDate=${dates[0]}` +
        `&endDate=${dates[1]}`
    );
    console.log("result", result);
    setUsersCart(result.data.data.Transaction_Header.rows);
    setCount(result.data.data.count.count);
  };

  const selesaikanPesanan = async (value) => {
    try {
      const result = await api.patch(
        `/transaction/update_transaction/confirm/${value}`
      );
      await Swal.fire({
        icon: "success",
        title: result.data.message,
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      // console.log(error);
      Swal.fire({
        icon: "error",
        title: error.response.data.message,
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  const finishOrder = async (value) => {
    await Swal.fire({
      icon: "success",
      // title: result.data.message,
      title: "Are You Sure You Want to Confirm This Transaction ?",
      confirmButtonText: "Yes",
      denyButtonText: "No",
      showConfirmButton: true,
      showDenyButton: true,
      isConfirmed: () => selesaikanPesanan(value),
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          console.log("user global 2", user);
          const result = await api.patch(
            `/transaction/update_transaction/confirm/${value}`,
            {
              username: user.username,
            }
          );
          await Swal.fire({
            icon: "success",
            title: result.data.message,
            showConfirmButton: false,
            timer: 1500,
          });
          getUsersCart();
        } catch (error) {
          // console.log(error);
          Swal.fire({
            icon: "error",
            title: error.response.data.message,
            showConfirmButton: false,
            timer: 1500,
          });
        }
      }
    });
  };

  useEffect(() => {
    getUsersCart();
  }, [user, currentPage, statusFilter, searchFilter, sortByOption, dates]);

  function handleSubmit(e) {
    e.preventDefault();
    const searchFilter = e.target.search.value.trim();
    setSearchFilter(searchFilter);
  }

  return (
    <div
      style={{
        backgroundImage: `url(${pattern})`,
        backgroundRepeat: "repeat",
        backgroundSize: "20rem 20rem",
      }}
    >
      <div className="container-screen flex flex-col py-4">
        <div className="font-bold text-5xl py-2 border-b-2 border-b-blue-300 mb-4">
          Order List
        </div>
        <div className="flex gap-2 items-center flex-wrap">
          <DateRange dates={dates} setDates={setDates} />
          <div className="flex  flex-1 px-7">
            <div className="w-1/2max-w-xl lg:max-w-2xl">
              <label htmlFor="search" className="sr-only">
                Search Invoice
              </label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <MagnifyingGlassIcon
                    className="h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                </div>
                <form onSubmit={handleSubmit}>
                  <input
                    id="search"
                    name="search"
                    className="block w-full rounded-md border border-transparent bg-white py-2 pl-10 pr-3 leading-5 text-gray-300 placeholder-gray-400 focus:border-white focus:bg-white focus:text-gray-900 focus:outline-none focus:ring-white sm:text-sm"
                    placeholder="Search Invoice"
                    type="search"
                  />
                  <input type="submit" hidden />
                </form>
              </div>
            </div>
          </div>
          <Dropdown
            label="Sort"
            options={sortBy}
            selectedValue={sortByOption}
            onChange={setSortByOption}
            className="ml-10"
          />
          <Dropdown
            label="Order Status"
            options={sortOptions}
            selectedValue={statusFilter}
            onChange={setstatusFilter}
            className="ml-auto"
          />
        </div>
        {usersCart.length > 0 ? (
          usersCart.map((value) => (
            <div className="rounded-lg border mt-3 overflow-hidden bg-white">
              <div className="bg-blue-500 flex items-center justify-between">
                <div className="flex items-center">
                  <ShoppingBagIcon className="h-9 w-9 py-1 pl-3 text-blue-50" />
                  <p className="text-white mx-3">
                    <span className="text-yellow-300">
                      {convertToDate(value.date)}
                    </span>{" "}
                    || <span className="">INV/</span>
                    {value.invoice}{" "}
                  </p>
                </div>
                <p className="mr-3 text-yellow-300 font-semibold">
                  Status:{" "}
                  <span className="text-white">{value.m_status.name}</span>
                </p>
              </div>

              <div className=" flex items-center relative">
                <div className="rounded-lg overflow-hidden my-4 mx-2">
                  <img
                    className=""
                    src={`${process.env.REACT_APP_PRODUCT_IMG_BASE_URL}/${value.m_transaction_details[0].m_product.image_url}`}
                    style={{ width: "8rem", height: "8rem" }}
                  ></img>
                </div>
                <div className="">
                  <p className="font-bold text-xl mb-2">
                    {value.m_transaction_details[0].product_name}
                  </p>
                  <p className="mb-2">
                    {value.m_transaction_details[0].qty} X{" "}
                    {numToIDRCurrency(
                      value.m_transaction_details[0].m_product.price
                    )}
                  </p>
                  {value.m_transaction_details.length > 1 ? (
                    <p className="mb-2">
                      +{value.m_transaction_details.length - 1} other products
                    </p>
                  ) : null}
                </div>
                <div className="absolute right-3 font-bold">
                  Total Belanja
                  <p>{numToIDRCurrency(value.total_price)}</p>
                </div>
              </div>

              <div className="flex items-center relative">
                {/* <button className="rounded-lg bg-blue-500 m-3 py-2 text-white px-5 text-center hover:bg-blue-600 hover:text-white transition-all duration-300">
                  Upload Payment
                </button> */}
                {value.m_status.name === "Menunggu Pembayaran" ? (
                  <>
                    <DropImageModal
                      id={value.id}
                      getUsersCart={() => getUsersCart()}
                      usersCart={value}
                    />
                    <WarningModalOrderdList
                      headersId={value.id}
                      getUsersCart={() => getUsersCart()}
                      transaction={value}
                    />
                  </>
                ) : (
                  <></>
                )}

                {value.m_status.name === "Dikirim" ? (
                  <>
                    <button
                      onClick={() => finishOrder(value.id)}
                      className="rounded-lg bg-blue-500 m-3 py-2 text-white px-5 text-center hover:bg-blue-600 hover:text-white transition-all duration-300"
                    >
                      Konfirmasi Pesanan
                    </button>
                  </>
                ) : (
                  <></>
                )}
              </div>
            </div>
          ))
        ) : (
          <section>
            <div className="text-3xl flex flex-row justify-center items-center font-bold text-slate-400">
              <img className="w-1/3 mr-10" src={NoAddress} alt="No Address" />
              Theres No Transaction
              <br />
              Available.
            </div>
          </section>
        )}

        <Pagination
          itemsInPage={usersCart.length}
          itemsPerPage={3}
          totalItems={count}
          totalPages={Math.ceil(count / 3)}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </div>
  );
};

export default OrderList;
