import React, { Fragment, createContext, useReducer, useEffect } from "react";
import { Navber, Footer, CartModal } from "../partials";
import Sidebar from "./Sidebar";
import { dashboardUserState, dashboardUserReducer } from "./DashboardUserContext";
import { fetchData } from "./Action";

export const DashboardUserContext = createContext();

const Layout = ({ children }) => {
  const [data, dispatch] = useReducer(dashboardUserReducer, dashboardUserState);

  useEffect(() => {
    fetchData(dispatch);
  }, []);

  return (
    <Fragment>
      <DashboardUserContext.Provider value={{ data, dispatch }}>
        <div className="flex-grow bg-gray-50 min-h-screen">
          <Navber />
          <CartModal />
          <div className="mx-4 mt-24 md:mx-6 lg:mx-10 md:mt-28 flex flex-col md:flex-row gap-6 pb-10">
            <Sidebar />
            <div className="flex-1 bg-white rounded-[24px] border shadow-sm p-5 md:p-7">
              {children}
            </div>
          </div>
        </div>
        <Footer />
      </DashboardUserContext.Provider>
    </Fragment>
  );
};

export default Layout;