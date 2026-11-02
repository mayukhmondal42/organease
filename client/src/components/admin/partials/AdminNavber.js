import React, { Fragment } from "react";
import { useHistory } from "react-router-dom";

const AdminNavber = (props) => {
  const history = useHistory();

  const logout = () => {
    localStorage.removeItem("jwt");
    localStorage.removeItem("cart");
    localStorage.removeItem("wishList");
    window.location.href = "/";
  };

  const toggleSidebar = () => {
    window.dispatchEvent(new Event("toggleAdminSidebar"));
  };

  return (
    <Fragment>
      <nav className="sticky z-10 flex items-center shadow-md justify-between px-4 py-4 md:px-8 top-0 w-full bg-white">
        <div className="hidden lg:block">
          <span
            onClick={(e) => history.push("/")}
            style={{ letterSpacing: "0.70rem" }}
            className="flex items-left text-center font-bold uppercase text-gray-800 text-2xl cursor-pointer px-2 text-center"
          >
            OrganEase
          </span>
        </div>
        <div className="lg:hidden flex items-center">
          <svg
            id="hamburgerBtn"
            onClick={toggleSidebar}
            className="lg:hidden w-8 h-8 cursor-pointer text-gray-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
          <span
            onClick={(e) => history.push("/")}
            style={{ letterSpacing: "0.10rem" }}
            className="flex items-left text-center font-bold uppercase text-gray-800 text-xl md:text-2xl cursor-pointer px-2 text-center"
          >
            OrganEase
          </span>
        </div>
        <div className="flex items-center">
          <div
            className="userDropdownBtn hover:bg-gray-200 px-2 py-2 rounded-lg relative"
            title="Logout"
          >
            <svg
              className="cursor-pointer w-8 h-8 text-gray-600 hover:text-gray-800"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <div className="userDropdown absolute right-0 mt-1 bg-gray-200 rounded">
              <li className="flex flex-col text-gray-700">
                <span
                  onClick={(e) => history.push("/")}
                  className="flex space-x-1 py-2 px-8 hover:bg-gray-400 cursor-pointer"
                >
                  <span>Organs</span>
                </span>
                <span
                  onClick={(e) => logout()}
                  className="flex space-x-1 py-2 px-8 hover:bg-gray-400 cursor-pointer"
                >
                  <span>Logout</span>
                </span>
              </li>
            </div>
          </div>
        </div>
      </nav>
    </Fragment>
  );
};

export default AdminNavber;