import React, { Fragment, useContext, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import "./style.css";

import { logout } from "./Action";
import { LayoutContext } from "../index";
import { isAdmin } from "../auth/fetchApi";

const Navber = (props) => {
  const history = useHistory();
  const location = useLocation();
  const { data, dispatch } = useContext(LayoutContext);
  const [showCat, setShowCat] = useState(false);

  const navberToggleOpen = () =>
    data.navberHamburger
      ? dispatch({ type: "hamburgerToggle", payload: false })
      : dispatch({ type: "hamburgerToggle", payload: true });

  const loginModalOpen = () =>
    data.loginSignupModal
      ? dispatch({ type: "loginSignupModalToggle", payload: false })
      : dispatch({ type: "loginSignupModalToggle", payload: true });

  const cartModalOpen = () =>
    data.cartModal
      ? dispatch({ type: "cartModalToggle", payload: false })
      : dispatch({ type: "cartModalToggle", payload: true });
  const handleAllOrgans = () => {
    setShowCat(false);
    if (location.pathname === "/") {
      const el = document.getElementById("all-products");
      if (el) el.scrollIntoView({ behavior: "smooth" });
      else window.scrollTo({ top: 600, behavior: "smooth" });
    } else {
      history.push("/");
      setTimeout(() => {
        const el = document.getElementById("all-products");
        if (el) el.scrollIntoView({ behavior: "smooth" });
        else window.scrollTo({ top: 600, behavior: "smooth" });
      }, 300);
    }
  };

  return (
    <Fragment>
      <nav className="fixed top-0 w-full z-20 shadow-lg bg-white">
        <div className="m-4 md:mx-12 md:my-6 grid grid-cols-4 lg:grid-cols-3">
          <div className="hidden lg:flex col-span-1 text-gray-600 mt-1 items-center">
            <div className="relative">
              <span
                className="hover:bg-gray-200 px-4 py-3 rounded-lg font-light tracking-widest hover:text-gray-800 cursor-pointer transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-md active:scale-95"
                onClick={(e) => setShowCat(!showCat)}
              >
                View Organs ▾
              </span>
              {showCat && (
                <div className="absolute top-12 left-0 w-64 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden z-50">
                  <span
                    onClick={handleAllOrgans}
                    className="block px-5 py-4 hover:bg-teal-50 hover:text-teal-700 cursor-pointer text-sm font-bold text-gray-700 border-b border-gray-100"
                  >
                    🫀 All Organs
                  </span>
                  <span
                    onClick={(e) => { setShowCat(false); history.push("/categories"); window.scrollTo(0,0); }}
                    className="block px-5 py-4 hover:bg-teal-50 hover:text-teal-700 cursor-pointer text-sm font-bold text-gray-700"
                  >
                    📂 Select Your Category →
                  </span>
                </div>
              )}
            </div>
            <span className="hover:bg-gray-200 px-4 py-3 rounded-lg font-light tracking-widest hover:text-gray-800 cursor-pointer transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-md active:scale-95" onClick={(e) => history.push("/contact-us")}>
              Contact us
            </span>
          </div>

          <div className="col-span-2 lg:hidden flex items-center">
            <svg onClick={(e) => navberToggleOpen()} className="w-8 h-8 cursor-pointer text-gray-600 transition-all duration-300 hover:scale-110 hover:text-gray-900 active:scale-90" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            <span onClick={(e) => history.push("/")} style={{ letterSpacing: "0.10rem" }} className="font-bold uppercase text-gray-800 text-2xl cursor-pointer px-2 transition-all duration-300 hover:scale-105">
              OrganEase
            </span>
          </div>

          <div onClick={(e) => history.push("/")} style={{ letterSpacing: "0.70rem" }} className="hidden lg:block flex items-left col-span-1 text-center text-gray-800 font-bold tracking-widest uppercase text-2xl cursor-pointer transition-all duration-300 hover:scale-105 hover:text-teal-700">
            OrganEase
          </div>

          <div className="flex col-span-2 lg:col-span-1 justify-end items-center">
            {localStorage.getItem("jwt") ? (
              <div className="userDropdownBtn hover:bg-gray-200 px-2 py-2 rounded-lg relative transition-all duration-300 hover:scale-105 active:scale-95" title="Logout">
                <svg className="cursor-pointer w-8 h-8 text-gray-600 hover:text-gray-800 transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                <div className="userDropdown absolute right-0 mt-1 bg-gray-200 rounded">
                  {!isAdmin() ? (
                    <li className="flex flex-col text-gray-700 w-48 shadow-lg">
                      <span onClick={(e) => history.push("/user/orders")} className="flex space-x-2 py-2 px-8 hover:bg-gray-400 cursor-pointer transition-all duration-200 hover:pl-10"><span>Requests</span></span>
                      <span onClick={(e) => history.push("/user/profile")} className="flex space-x-2 py-2 px-8 hover:bg-gray-400 cursor-pointer transition-all duration-200 hover:pl-10"><span>My Account</span></span>
                      <span onClick={(e) => logout()} className="flex space-x-2 py-2 px-8 hover:bg-gray-400 cursor-pointer transition-all duration-200 hover:pl-10"><span>Logout</span></span>
                    </li>
                  ) : (
                    <li className="flex flex-col text-gray-700 w-48 shadow-lg">
                      <span onClick={(e) => history.push("/admin/dashboard")} className="flex space-x-2 py-2 px-8 hover:bg-gray-400 cursor-pointer transition-all duration-200 hover:pl-10"><span>Admin Panel</span></span>
                      <span onClick={(e) => logout()} className="flex space-x-2 py-2 px-8 hover:bg-gray-400 cursor-pointer transition-all duration-200 hover:pl-10"><span>Logout</span></span>
                    </li>
                  )}
                </div>
              </div>
            ) : (
              <div onClick={(e) => loginModalOpen()} className="cursor-pointer hover:bg-gray-200 px-2 py-2 rounded-lg transition-all duration-300 hover:scale-110 hover:shadow-md active:scale-95" title="Login">
                <svg className="w-8 h-8 text-gray-600 hover:text-gray-800 transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" /></svg>
              </div>
            )}
            <div onClick={(e) => cartModalOpen()} className="hover:bg-gray-200 px-2 py-2 rounded-lg relative cursor-pointer transition-all duration-300 hover:scale-110 hover:shadow-md active:scale-95" title="Organs">
              <svg className="w-8 h-8 text-black transition-all duration-300 hover:rotate-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3V1M8 4v3H4v12a2 2 0 002 2h12a2 2 0 002-2V7h-4V4h-4zm4 0h-2V1h2v3z" /></svg>
              <span className="absolute top-0 ml-6 mt-1 bg-yellow-700 rounded px-1 text-white text-xs font-semibold transition-all duration-300">{data.cartProduct !== null ? data.cartProduct.length : 0}</span>
            </div>
          </div>
        </div>

        <div className={data.navberHamburger ? "px-1 pb-2 md:px-10" : "hidden px-1 pb-2 md:px-10"}>
          <div className="flex flex-col text-gray-600">
            <span className="font-medium text-lg tracking-widest hover:text-gray-800 hover:bg-gray-200 px-3 py-2 rounded-lg cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:pl-5" onClick={(e) => { handleAllOrgans(); navberToggleOpen(); }}>All Organs</span>
            <span className="font-medium text-lg tracking-widest hover:text-gray-800 hover:bg-gray-200 px-3 py-2 rounded-lg cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:pl-5" onClick={(e) => { history.push("/categories"); window.scrollTo(0,0); navberToggleOpen(); }}>Select Your Category</span>
            <span className="font-medium text-lg tracking-widest hover:text-gray-800 hover:bg-gray-200 px-3 py-2 rounded-lg cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:pl-5" onClick={(e) => { history.push("/contact-us"); navberToggleOpen(); }}>Contact us</span>
          </div>
        </div>
      </nav>
    </Fragment>
  );
};

export default Navber;