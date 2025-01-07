import React from "react";
import Navbar from "../Components/Navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faBell,
  faCircle,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";

function Orders() {
  return (
    <>
      <Navbar />
      <div className="text-center p-2 display: grid block sm:block md:hidden"></div>
      <main className=" md:ml-64 hidden sm:hidden md:block">
        <div className="bg-white p-5 display: flex justify-between">
          <div>
            <h1 className="font-semibold text-3xl text-[#0A0500]">Dashboard</h1>
          </div>
          <div className="display: flex gap-3">
            <div>
              <button className="bg-[#D9851F] text-white px-3 py-2 rounded-lg text-sm font-sanns">
                <FontAwesomeIcon icon={faPlus} className="text-white mr-2" />
                Add New
              </button>
            </div>
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
                  stroke-width="0.5"
                />
                <path
                  d="M15 16.6666C15 15.3405 15.5268 14.0688 16.4645 13.1311C17.4021 12.1934 18.6739 11.6666 20 11.6666C21.3261 11.6666 22.5979 12.1934 23.5355 13.1311C24.4732 14.0688 25 15.3405 25 16.6666C25 22.5 27.5 24.1666 27.5 24.1666H12.5C12.5 24.1666 15 22.5 15 16.6666Z"
                  stroke="#0A0500"
                  stroke-width="1.25"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M18.583 27.5C18.7225 27.7537 18.9275 27.9653 19.1768 28.1127C19.426 28.26 19.7102 28.3378 19.9997 28.3378C20.2892 28.3378 20.5734 28.26 20.8226 28.1127C21.0718 27.9653 21.2769 27.7537 21.4163 27.5"
                  stroke="#0A0500"
                  stroke-width="1.25"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </div>
            <div className="text-3xl">
              <FontAwesomeIcon icon={faCircle} className="text-[#608AC9]" />
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default Orders;
