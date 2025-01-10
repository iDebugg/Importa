import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faArrowRight,
  faBars,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import NavLogo from "../Assets/img/importa_logo_1@4x.svg";
import DropdownLogo from "../Assets/img/importa_logo_1@4x.svg";
import "../Styles/Navbar.css";
import { toast } from "react-toastify";
import dashboardImg from "../Assets/img/Notification bell.svg";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  const handleLogout = () => {
    localStorage.removeItem("token");
    console.log("Token removed from local storage");

    toast.success("You have been logged out successfully!.");

    navigate("/LogIn");
  };
  const isActive = (path) => location.pathname === path;

  return (
    <div className="relative">
      <div className="flex items-center bg-white shadow-md p-4 rounded-full space-x-4 md:hidden">
        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100">
          <img src={NavLogo} alt="Logo" className="w-8 h-8" />
        </div>

        <div className="flex items-center bg-gray-100 rounded-lg px-4 py-2 flex-1 max-w-md">
          <FontAwesomeIcon icon={faSearch} className="text-gray-400 mr-2" />
          <input
            type="text"
            placeholder="Search"
            className="bg-transparent outline-none text-gray-600 placeholder-gray-400 flex-1"
          />
          <button className="ml-2">
            <FontAwesomeIcon icon={faArrowRight} className="text-gray-500" />
          </button>
        </div>

        <button onClick={toggleDropdown} className="ml-auto">
          <FontAwesomeIcon icon={faBars} className="text-gray-500 text-xl" />
        </button>
      </div>

      <div className="navvdrropdwn hidden md:flex flex-col w-64 h-screen p-4 text-white fixed top-0 left-0">
        <div className="flex items-center ">
          <img src={DropdownLogo} alt="Cemperium Logo" className="mb-20" />
        </div>

        <nav className="flex-grow space-y-2">
          <Link
            to="/Dashboard"
            className={`flex items-center p-3 text-sm  ${
              isActive("/Dashboard")
                ? "bg-[#D9851F] text-[#edecec] rounded-xl"
                : "text-[#7B7875]"
            }`}
          >
            <svg
              width="20"
              height="21"
              viewBox="0 0 20 21"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7.5 3.0079H3.33333C2.8731 3.0079 2.5 3.381 2.5 3.84124V9.67457C2.5 10.1348 2.8731 10.5079 3.33333 10.5079H7.5C7.96024 10.5079 8.33333 10.1348 8.33333 9.67457V3.84124C8.33333 3.381 7.96024 3.0079 7.5 3.0079Z"
                stroke="#989694"
                stroke-width="1.25"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M16.6665 3.0079H12.4998C12.0396 3.0079 11.6665 3.381 11.6665 3.84124V6.34124C11.6665 6.80147 12.0396 7.17457 12.4998 7.17457H16.6665C17.1267 7.17457 17.4998 6.80147 17.4998 6.34124V3.84124C17.4998 3.381 17.1267 3.0079 16.6665 3.0079Z"
                stroke="#989694"
                stroke-width="1.25"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M16.6665 10.5079H12.4998C12.0396 10.5079 11.6665 10.881 11.6665 11.3412V17.1746C11.6665 17.6348 12.0396 18.0079 12.4998 18.0079H16.6665C17.1267 18.0079 17.4998 17.6348 17.4998 17.1746V11.3412C17.4998 10.881 17.1267 10.5079 16.6665 10.5079Z"
                stroke="#989694"
                stroke-width="1.25"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M7.5 13.8412H3.33333C2.8731 13.8412 2.5 14.2143 2.5 14.6746V17.1746C2.5 17.6348 2.8731 18.0079 3.33333 18.0079H7.5C7.96024 18.0079 8.33333 17.6348 8.33333 17.1746V14.6746C8.33333 14.2143 7.96024 13.8412 7.5 13.8412Z"
                stroke="#989694"
                stroke-width="1.25"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            <span className="sidemenus ml-2 text-lg">Dashboard</span>
          </Link>
          <Link
            to="/RecentOrders"
            className={`flex items-center p-3 ${
              isActive("/RecentOrders")
                ? "bg-[#D9851F] text-[#edecec] rounded-xl"
                : "text-[#7B7875]"
            }`}
          >
            <svg
              width="20"
              height="21"
              viewBox="0 0 20 21"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10 18.8412V11.3412"
                stroke="#989694"
                stroke-width="1.25"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M12.6414 2.34959C12.849 2.23354 13.0828 2.17261 13.3206 2.17261C13.5584 2.17261 13.7922 2.23354 13.9998 2.34959L17.4998 4.31625C17.7476 4.45642 17.9539 4.65989 18.0973 4.90586C18.2408 5.15183 18.3164 5.43149 18.3164 5.71625C18.3164 6.00101 18.2408 6.28067 18.0973 6.52664C17.9539 6.77262 17.7476 6.97608 17.4998 7.11625L7.34977 12.8329C7.1416 12.9517 6.90609 13.0141 6.66644 13.0141C6.42679 13.0141 6.19127 12.9517 5.98311 12.8329L2.49977 10.8663C2.2519 10.7261 2.04568 10.5226 1.90219 10.2766C1.75871 10.0307 1.68311 9.75101 1.68311 9.46625C1.68311 9.18149 1.75871 8.90183 1.90219 8.65586C2.04568 8.40989 2.2519 8.20642 2.49977 8.06625L12.6414 2.34959Z"
                stroke="#989694"
                stroke-width="1.25"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M16.6668 11.3412V14.5662C16.6672 14.8808 16.5811 15.1894 16.4179 15.4583C16.2548 15.7272 16.0209 15.9462 15.7418 16.0912L10.7418 18.6579C10.5127 18.777 10.2583 18.8391 10.0002 18.8391C9.74198 18.8391 9.48759 18.777 9.2585 18.6579L4.2585 16.0912C3.9794 15.9462 3.74552 15.7272 3.5824 15.4583C3.41927 15.1894 3.33317 14.8808 3.3335 14.5662V11.3412"
                stroke="#989694"
                stroke-width="1.25"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M17.4998 10.8663C17.7476 10.7261 17.9539 10.5227 18.0973 10.2767C18.2408 10.0307 18.3164 9.75105 18.3164 9.46629C18.3164 9.18152 18.2408 8.90187 18.0973 8.65589C17.9539 8.40992 17.7476 8.20645 17.4998 8.06629L7.35811 2.34129C7.15134 2.22288 6.91721 2.16058 6.67894 2.16058C6.44067 2.16058 6.20654 2.22288 5.99977 2.34129L2.49977 4.31629C2.2519 4.45645 2.04568 4.65992 1.90219 4.90589C1.75871 5.15187 1.68311 5.43152 1.68311 5.71629C1.68311 6.00105 1.75871 6.28071 1.90219 6.52668C2.04568 6.77265 2.2519 6.97612 2.49977 7.11629L12.6498 12.833C12.8564 12.9517 13.0906 13.0142 13.3289 13.0142C13.5673 13.0142 13.8014 12.9517 14.0081 12.833L17.4998 10.8663Z"
                stroke="#989694"
                stroke-width="1.25"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            <span className="sidemenus ml-2 mr-4 text-lg">Items & Ads</span>{" "}
            <svg
              width="20"
              height="10"
              viewBox="0 0 10 6"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1 1L5 5L9 1"
                stroke="#7B7875"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </Link>
          <Link
            to="/Orders"
            className={`flex items-center p-3 ${
              isActive("/Orders")
                ? "bg-[#D9851F] text-[#edecec] rounded-xl"
                : "text-[#7B7875]"
            }`}
          >
            <svg
              width="20"
              height="21"
              viewBox="0 0 20 21"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12.4998 9.67456L11.6665 17.1746"
                stroke="#989694"
                stroke-width="1.25"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M15.8333 9.67464L12.5 3.84131"
                stroke="#989694"
                stroke-width="1.25"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M1.6665 9.67456H18.3332"
                stroke="#989694"
                stroke-width="1.25"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M2.9165 9.67456L4.24984 15.8412C4.32776 16.2234 4.53721 16.5661 4.84174 16.8097C5.14627 17.0533 5.52659 17.1824 5.9165 17.1746H14.0832C14.4731 17.1824 14.8534 17.0533 15.1579 16.8097C15.4625 16.5661 15.6719 16.2234 15.7498 15.8412L17.1665 9.67456"
                stroke="#989694"
                stroke-width="1.25"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M3.75 13.4246H16.25"
                stroke="#989694"
                stroke-width="1.25"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M4.1665 9.67464L7.49984 3.84131"
                stroke="#989694"
                stroke-width="1.25"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M7.5 9.67456L8.33333 17.1746"
                stroke="#989694"
                stroke-width="1.25"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            <span className="sidemenus ml-2 text-lg">Orders</span>
          </Link>
          <Link
            to="/Customers"
            className={`flex items-center p-3 ${
              isActive("/Customers")
                ? "bg-[#D9851F] text-[#edecec] rounded-xl"
                : "text-[#7B7875]"
            }`}
          >
            <svg
              width="20"
              height="21"
              viewBox="0 0 20 21"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M14.9998 18.008C14.9998 16.2399 14.2975 14.5442 13.0472 13.2939C11.797 12.0437 10.1013 11.3413 8.33317 11.3413C6.56506 11.3413 4.86937 12.0437 3.61913 13.2939C2.36888 14.5442 1.6665 16.2399 1.6665 18.008"
                stroke="#989694"
                stroke-width="1.25"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M8.33317 11.3413C10.6344 11.3413 12.4998 9.47579 12.4998 7.1746C12.4998 4.87341 10.6344 3.00793 8.33317 3.00793C6.03198 3.00793 4.1665 4.87341 4.1665 7.1746C4.1665 9.47579 6.03198 11.3413 8.33317 11.3413Z"
                stroke="#989694"
                stroke-width="1.25"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M18.3333 17.1746C18.3333 14.3663 16.6667 11.758 15 10.508C15.5478 10.0969 15.9859 9.55721 16.2755 8.93653C16.565 8.31585 16.6971 7.63337 16.66 6.94948C16.6229 6.26559 16.4178 5.60138 16.0629 5.01564C15.7079 4.4299 15.2141 3.94069 14.625 3.59131"
                stroke="#989694"
                stroke-width="1.25"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            <span className="sidemenus ml-2 text-lg">Customers</span>
          </Link>
          <Link
            to="/Payments"
            className={`flex items-center p-3 ${
              isActive("/Payments")
                ? "bg-[#D9851F] text-[#edecec] rounded-xl"
                : "text-[#7B7875]"
            }`}
          >
            <svg
              width="20"
              height="21"
              viewBox="0 0 20 21"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M16.6665 4.67456H3.33317C2.4127 4.67456 1.6665 5.42075 1.6665 6.34123V14.6746C1.6665 15.595 2.4127 16.3412 3.33317 16.3412H16.6665C17.587 16.3412 18.3332 15.595 18.3332 14.6746V6.34123C18.3332 5.42075 17.587 4.67456 16.6665 4.67456Z"
                stroke="#989694"
                stroke-width="1.25"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M1.6665 8.84131H18.3332"
                stroke="#989694"
                stroke-width="1.25"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            <span className="sidemenus ml-2 text-lg">Payments</span>
          </Link>
          <Link
            to="/ShippingAndLogistics"
            className={`flex items-center p-3 ${
              isActive("/ShippingAndLogistics")
                ? "bg-[#D9851F] text-[#edecec] rounded-xl"
                : "text-[#7B7875]"
            }`}
          >
            <svg
              width="20"
              height="21"
              viewBox="0 0 20 21"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M11.6665 15.508V5.50798C11.6665 5.06595 11.4909 4.64202 11.1783 4.32946C10.8658 4.0169 10.4419 3.84131 9.99984 3.84131H3.33317C2.89114 3.84131 2.46722 4.0169 2.15466 4.32946C1.8421 4.64202 1.6665 5.06595 1.6665 5.50798V14.6746C1.6665 14.8957 1.7543 15.1076 1.91058 15.2639C2.06686 15.4202 2.27882 15.508 2.49984 15.508H4.1665"
                stroke="#989694"
                stroke-width="1.25"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M12.5 15.5079H7.5"
                stroke="#989694"
                stroke-width="1.25"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M15.8332 15.5079H17.4998C17.7209 15.5079 17.9328 15.4201 18.0891 15.2638C18.2454 15.1075 18.3332 14.8956 18.3332 14.6746V11.6329C18.3328 11.4438 18.2682 11.2604 18.1498 11.1129L15.2498 7.48789C15.1719 7.39029 15.073 7.31146 14.9605 7.25723C14.848 7.20299 14.7247 7.17474 14.5998 7.17456H11.6665"
                stroke="#989694"
                stroke-width="1.25"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M14.1667 17.1746C15.0871 17.1746 15.8333 16.4284 15.8333 15.508C15.8333 14.5875 15.0871 13.8413 14.1667 13.8413C13.2462 13.8413 12.5 14.5875 12.5 15.508C12.5 16.4284 13.2462 17.1746 14.1667 17.1746Z"
                stroke="#989694"
                stroke-width="1.25"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M5.83317 17.1746C6.75365 17.1746 7.49984 16.4284 7.49984 15.508C7.49984 14.5875 6.75365 13.8413 5.83317 13.8413C4.9127 13.8413 4.1665 14.5875 4.1665 15.508C4.1665 16.4284 4.9127 17.1746 5.83317 17.1746Z"
                stroke="#989694"
                stroke-width="1.25"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            <span className="sidemenus ml-2 text-lg">Shipping & Logistics</span>
          </Link>
          <Link
            to="/Cryptocurrency"
            className={`flex items-center p-3 ${
              isActive("/Cryptocurrency")
                ? "bg-[#D9851F] text-[#edecec] rounded-xl"
                : "text-[#7B7875]"
            }`}
          >
            <svg
              width="20"
              height="21"
              viewBox="0 0 20 21"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9.99984 18.8412C14.6022 18.8412 18.3332 15.1103 18.3332 10.5079C18.3332 5.90552 14.6022 2.17456 9.99984 2.17456C5.39746 2.17456 1.6665 5.90552 1.6665 10.5079C1.6665 15.1103 5.39746 18.8412 9.99984 18.8412Z"
                stroke="#989694"
                stroke-width="1.25"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M7.5752 8.00792C7.77112 7.45098 8.15782 6.98134 8.66682 6.6822C9.17583 6.38305 9.77427 6.2737 10.3562 6.37351C10.9381 6.47333 11.4659 6.77586 11.8461 7.22753C12.2263 7.6792 12.4344 8.25086 12.4335 8.84125C12.4335 10.5079 9.93353 11.3413 9.93353 11.3413"
                stroke="#989694"
                stroke-width="1.25"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M10 14.6746H10.0083"
                stroke="#989694"
                stroke-width="1.25"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            <span className="sidemenus ml-2 text-lg">FAQs</span>
          </Link>
        </nav>

        <div>
          <Link onClick={handleLogout}>
            <a href="#logout" className="flex items-center p-2 text-white">
              <span className="ml-2 text-2xl text-[#7B7875]">Log Out</span>
            </a>
          </Link>
        </div>
      </div>

      {isOpen && (
        <>
          <div
            className={`fixed top-0 left-0 h-full w-full bg-white transform ${
              isOpen ? "translate-x-0" : "-translate-x-full"
            } transition-transform duration-300 ease-in-out z-50 md:hidden`}
          >
            {/* Close Icon */}
            <button
              onClick={toggleDropdown}
              className="absolute top-4 right-4 text-gray-500 text-2xl"
            >
              <FontAwesomeIcon icon={faTimes} />
            </button>

            <nav className="navvdrropdwn flex flex-col h-full p-8 space-y-6">
              <img src={DropdownLogo} alt="" className="mb-20" />
              <Link
                to="/Home"
                className={`flex items-center p-2 mb-4 ${
                  isActive("/Home")
                    ? "bg-white text-blue-500 rounded-xl"
                    : "text-white"
                }`}
              >
                <span className="text-2xl">Home</span>
              </Link>
              <Link
                to="/Activity"
                className={`flex items-center p-2 mb-4 ${
                  isActive("/Activity")
                    ? "bg-white text-blue-500 rounded-xl"
                    : "text-white"
                }`}
              >
                <span className="text-2xl">Activity</span>
              </Link>
              <Link
                to="/Wallet"
                className={`flex items-center p-2 mb-4 ${
                  isActive("/Wallet")
                    ? "bg-white text-blue-500 rounded-xl"
                    : "text-white"
                }`}
              >
                <span className="text-2xl">Wallet</span>
              </Link>
              <Link
                to="/Cryptocurrency"
                className={`flex items-center p-2 mb-4 ${
                  isActive("/Cryptocurrency")
                    ? "bg-white text-blue-500 rounded-xl"
                    : "text-white"
                }`}
              >
                <span className="text-2xl">Cryptocurrency</span>
              </Link>
              <Link
                to=""
                className={`flex items-center p-2 mb-4 ${
                  isActive("/Settings")
                    ? "bg-white text-blue-500 rounded-xl"
                    : "text-white"
                }`}
              >
                <span className="text-2xl">Settings</span>
              </Link>

              <div className="flex-grow"></div>
              <Link onClick={handleLogout}>
                <a
                  href="#logout"
                  className="text-slate-100 text-2xl hover:text-red-700 p-2 mb-8"
                >
                  Logout
                </a>
              </Link>
            </nav>
          </div>

          <div
            onClick={toggleDropdown}
            className="fixed inset-0 bg-black opacity-50 z-40"
          ></div>
        </>
      )}
    </div>
  );
};

export default Navbar;
