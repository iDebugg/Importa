import React, { useState, useEffect } from "react";
import Navbar from "../Components/Navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle } from "@fortawesome/free-solid-svg-icons";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import gdgd from "../Assets/img/Vector.svg";

const Customers = () => {
  const [selectedOrders, setSelectedOrders] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [showExportOptions, setShowExportOptions] = useState(false);
  const [showFilterOptions, setShowFilterOptions] = useState(false);
  const [showSortOptions, setShowSortOptions] = useState(false);
  const [filterBy, setFilterBy] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [visibleOrders, setVisibleOrders] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [orders, setOrders] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch("https://api.example.com/orders");
        const data = await response.json();
        setOrders(data);
        setTotalPages(Math.ceil(data.length / rowsPerPage));
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };
    fetchOrders();
  }, [rowsPerPage]);

  useEffect(() => {
    let filteredOrders = orders.filter(
      (order) =>
        order.id.toString().includes(searchQuery) ||
        order.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.date.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.deliveryType.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.orderCount.toString().includes(searchQuery) ||
        order.price.toString().includes(searchQuery) ||
        order.status.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (filterBy) {
      filteredOrders = filteredOrders.filter(
        (order) => order.status.toLowerCase() === filterBy.toLowerCase()
      );
    }

    if (sortBy === "price") {
      filteredOrders = [...filteredOrders].sort((a, b) => a.price - b.price);
    } else if (sortBy === "date") {
      filteredOrders = [...filteredOrders].sort(
        (a, b) => new Date(a.date) - new Date(b.date)
      );
    }

    setTotalPages(Math.ceil(filteredOrders.length / rowsPerPage));

    const startIndex = (currentPage - 1) * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;
    setVisibleOrders(filteredOrders.slice(startIndex, endIndex));
  }, [searchQuery, currentPage, rowsPerPage, orders, filterBy, sortBy]);

  const handleSelectAll = () => {
    setSelectAll(!selectAll);
    setSelectedOrders(!selectAll ? orders.map((order) => order.id) : []);
  };

  const handleSelectOrder = (id) => {
    setSelectedOrders((prev) =>
      prev.includes(id)
        ? prev.filter((orderId) => orderId !== id)
        : [...prev, id]
    );
  };

  const handleExport = async (type) => {
    const tableElement = document.getElementById("orders-table");
    const canvas = await html2canvas(tableElement);
    const imgData = canvas.toDataURL("image/png");

    if (type === "pdf") {
      const pdf = new jsPDF();
      pdf.addImage(imgData, "PNG", 10, 10, 190, 0);
      pdf.save("customers.pdf");
    } else if (type === "image") {
      const link = document.createElement("a");
      link.href = imgData;
      link.download = "customers.png";
      link.click();
    }
    setShowExportOptions(false);
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  return (
    <>
      <Navbar />
      <div className="text-center p-2 display: grid block sm:block md:hidden"></div>
      <main className="md:ml-64 hidden sm:hidden md:block">
        <div className="bg-white p-5 display: flex justify-between">
          <div className="display: flex gap-2">
            <h1 className="font-semibold text-3xl text-[#0A0500]">Customers</h1>
            <div className="p-2 display: flex items-center gap-2 border rounded-lg">
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9.16667 15.8333C12.8486 15.8333 15.8333 12.8486 15.8333 9.16667C15.8333 5.48477 12.8486 2.5 9.16667 2.5C5.48477 2.5 2.5 5.48477 2.5 9.16667C2.5 12.8486 5.48477 15.8333 9.16667 15.8333Z"
                  stroke="#0A0500"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M17.4998 17.5L13.9165 13.9167"
                  stroke="#0A0500"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              <input
                type="text"
                className="outline-transparent w-56"
                placeholder="Search ..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          <div className="display: flex gap-3">
            <div className="">
              <svg
                width="40"
                height="40"
                viewBox="0 0 40 40"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0.25 8C0.25 3.71979 3.71979 0.25 8 0.25H32C36.2802 0.25 39.75 3.71979 39.75 8V32C39.75 36.2802 36.2802 39.75 32 39.75H8C3.71979 39.75 0.25 36.2802 0.25 32V8Z"
                  stroke="#DFDFDE"
                  strokeWidth="0.5"
                />
                <path
                  d="M15 16.6666C15 15.3405 15.5268 14.0688 16.4645 13.1311C17.4021 12.1934 18.6739 11.6666 20 11.6666C21.3261 11.6666 22.5979 12.1934 23.5355 13.1311C24.4732 14.0688 25 15.3405 25 16.6666C25 22.5 27.5 24.1666 27.5 24.1666H12.5C12.5 24.1666 15 22.5 15 16.6666Z"
                  stroke="#0A0500"
                  strokeWidth="1.25"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M18.583 27.5C18.7225 27.7537 18.9275 27.9653 19.1768 28.1127C19.426 28.26 19.7102 28.3378 19.9997 28.3378C20.2892 28.3378 20.5734 28.26 20.8226 28.1127C21.0718 27.9653 21.2769 27.7537 21.4163 27.5"
                  stroke="#0A0500"
                  strokeWidth="1.25"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div className="text-3xl">
              <FontAwesomeIcon icon={faCircle} className="text-[#608AC9]" />
            </div>
          </div>
        </div>
        <div className="p-4 h-[calc(100vh-85px)]">
          <div className="p-4 bg-white rounded-xl h-full">
            <div className="flex justify-between items-center mb-4">
              <h1 className="text-sm font-semibold">
                All Customers{" "}
                <span className="text-[#7B7875]">({orders.length})</span>
              </h1>
              <div className="pool display: flex gap-2">
                <div className="relative inline-block">
                  <button
                    className="border px-3 py-2 rounded-md display: flex gap-2 items-center text-sm"
                    onClick={() => setShowFilterOptions(!showFilterOptions)}
                  >
                    Filter by{" "}
                    <svg
                      width="10"
                      height="6"
                      viewBox="0 0 10 6"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M1 1L5 5L9 1"
                        stroke="#0A0500"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </button>
                  {showFilterOptions && (
                    <div className="absolute mt-2 w-40 bg-white border rounded-md shadow-md z-10">
                      <button
                        className="w-full text-left px-4 py-2 hover:bg-gray-100"
                        onClick={() => {
                          setFilterBy("");
                          setShowFilterOptions(false);
                        }}
                      >
                        All
                      </button>
                      <button
                        className="w-full text-left px-4 py-2 hover:bg-gray-100"
                        onClick={() => {
                          setFilterBy("Pending");
                          setShowFilterOptions(false);
                        }}
                      >
                        Pending
                      </button>
                      <button
                        className="w-full text-left px-4 py-2 hover:bg-gray-100"
                        onClick={() => {
                          setFilterBy("Enroute");
                          setShowFilterOptions(false);
                        }}
                      >
                        Enroute
                      </button>
                      <button
                        className="w-full text-left px-4 py-2 hover:bg-gray-100"
                        onClick={() => {
                          setFilterBy("Delivered");
                          setShowFilterOptions(false);
                        }}
                      >
                        Delivered
                      </button>
                    </div>
                  )}
                </div>

                <div className="relative inline-block">
                  <button
                    className="border px-3 py-2 rounded-md display: flex items-center gap-2 text-sm"
                    onClick={() => setShowSortOptions(!showSortOptions)}
                  >
                    Sort by{" "}
                    <svg
                      width="10"
                      height="6"
                      viewBox="0 0 10 6"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M1 1L5 5L9 1"
                        stroke="#0A0500"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </button>
                  {showSortOptions && (
                    <div className="absolute mt-2 w-40 bg-white border rounded-md shadow-md z-10">
                      <button
                        className="w-full text-left px-4 py-2 hover:bg-gray-100"
                        onClick={() => {
                          setSortBy("");
                          setShowSortOptions(false);
                        }}
                      >
                        None
                      </button>
                      <button
                        className="w-full text-left px-4 py-2 hover:bg-gray-100"
                        onClick={() => {
                          setSortBy("date");
                          setShowSortOptions(false);
                        }}
                      >
                        Date
                      </button>
                      <button
                        className="w-full text-left px-4 py-2 hover:bg-gray-100"
                        onClick={() => {
                          setSortBy("price");
                          setShowSortOptions(false);
                        }}
                      >
                        Price
                      </button>
                    </div>
                  )}
                </div>

                <div className="relative">
                  <button
                    className="bg-[#D9851F] display: flex gap-1 text-white text-sm px-4 py-2 rounded-md"
                    onClick={() => setShowExportOptions(!showExportOptions)}
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M14 10V12.6667C14 13.0203 13.8595 13.3594 13.6095 13.6095C13.3594 13.8595 13.0203 14 12.6667 14H3.33333C2.97971 14 2.64057 13.8595 2.39052 13.6095C2.14048 13.3594 2 13.0203 2 12.6667V10"
                        stroke="#FDF4E9"
                        stroke-width="1.25"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M4.6665 6.66666L7.99984 9.99999L11.3332 6.66666"
                        stroke="#FDF4E9"
                        stroke-width="1.25"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M8 10V2"
                        stroke="#FDF4E9"
                        stroke-width="1.25"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                    Export as
                  </button>
                  {showExportOptions && (
                    <div className="absolute right-0 mt-2 w-40 bg-white border rounded-md shadow-md">
                      <button
                        className="w-full text-left px-4 py-2 hover:bg-gray-100"
                        onClick={() => handleExport("pdf")}
                      >
                        PDF
                      </button>
                      <button
                        className="w-full text-left px-4 py-2 hover:bg-gray-100"
                        onClick={() => handleExport("image")}
                      >
                        Image
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <table
              id="orders-table"
              className="w-full table-auto border-collapse"
            >
              <thead>
                <tr className="bg-[#F5F5F5]">
                  <th className="p-2">
                    <input
                      type="checkbox"
                      checked={selectAll}
                      onChange={handleSelectAll}
                    />
                  </th>
                  <th className="p-2 text-[#7B7875] text-sm font-semibold">
                    Customer ID
                  </th>
                  <th className="p-2 text-[#7B7875] text-sm font-semibold">
                    Customer Name
                  </th>
                  <th className="p-2 text-[#7B7875] text-sm font-semibold">
                    Email
                  </th>
                  <th className="p-2 text-[#7B7875] text-sm font-semibold">
                    Reg Date
                  </th>
                  <th className="p-2 text-[#7B7875] text-sm font-semibold">
                    Phone Number
                  </th>
                  <th className="p-2 text-[#7B7875] text-sm font-semibold">
                    Total Orders
                  </th>
                  <th className="p-2 text-[#7B7875] text-sm font-semibold">
                    Total Spend
                  </th>
                  <th className="p-2 text-[#7B7875] text-sm font-semibold">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {visibleOrders.map((order) => (
                  <tr key={order.id}>
                    <td className="p-2">
                      <input
                        type="checkbox"
                        checked={selectedOrders.includes(order.id)}
                        onChange={() => handleSelectOrder(order.id)}
                      />
                    </td>
                    <td className="p-2 text-[#0A0500] font-light">
                      {order.id}
                    </td>
                    <td className="p-2 text-[#0A0500] font-light">
                      {order.customer}
                    </td>
                    <td className="p-2 text-[#0A0500] font-light">
                      {order.date}
                    </td>
                    <td className="p-2 text-[#0A0500] font-light">
                      {order.deliveryType}
                    </td>
                    <td className="p-2 text-[#0A0500] font-light">
                      {order.orderCount}
                    </td>
                    <td className="p-2 text-[#0A0500] font-light">
                      ${order.price}
                    </td>
                    <td className="p-2 text-[#0A0500] font-light">
                      {order.status}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="flex justify-end items-center mt-4 gap-2 absolute bottom-10 right-10">
              <span className="mr-7 text-[#7B7875]">{`Page ${currentPage} of ${totalPages}`}</span>
              <button
                className={`px-4 py-2 text-xs rounded-md ${
                  currentPage === 1
                    ? "border border-[#e0b784] text-[#e0b784]"
                    : "border border-[#D9851F] text-[#D9851F]"
                }`}
                onClick={handlePrevious}
                disabled={currentPage === 1}
              >
                Previous Page
              </button>

              <button
                className={`px-4 py-2 bg-[#D9851F] text-[#FDF4E9] text-xs rounded-md ${
                  currentPage === totalPages ? "bg-[#D9851F]" : "bg-[#e0b784]"
                }`}
                onClick={handleNext}
                disabled={currentPage === totalPages}
              >
                Next Page
              </button>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Customers;
