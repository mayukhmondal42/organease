import React, { Fragment, useContext } from "react";
import { useLocation, useHistory } from "react-router-dom";
import { logout } from "./Action";
import { DashboardUserContext } from "./Layout";

const Sidebar = (props) => {
  const { data } = useContext(DashboardUserContext);
  const history = useHistory();
  const location = useLocation();

  const item = (path, label) => `px-4 py-3.5 rounded-xl cursor-pointer text-[15px] font-medium transition ${location.pathname === path ? "bg-black text-white" : "hover:bg-gray-100 text-gray-700"}`;

  return (
    <Fragment>
      <div className="flex flex-col w-full space-y-4 md:w-3/12">
        <div className="flex items-center gap-3 bg-black rounded-[20px] p-4 text-white shadow-sm">
          <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center text-xl font-bold">
            {data.userDetails ? data.userDetails.name?.charAt(0)?.toUpperCase() : "M"}
          </div>
          <div className="flex flex-col">
            <span className="text-xs text-gray-300">Hello, Welcome</span>
            <span className="font-bold truncate max-w-[150px]">{data.userDetails ? data.userDetails.name : "Mayukh Mondal"}</span>
            <span className="text-[11px] text-gray-400">OrganEase Member</span>
          </div>
        </div>

        <div className="bg-white border shadow-sm rounded-[20px] p-2 hidden md:flex flex-col gap-1">
          <div onClick={()=>history.push("/user/orders")} className={item("/user/orders","My Requests")}>📦 My Requests</div>
          <div onClick={()=>history.push("/user/profile")} className={item("/user/profile","My Accounts")}>👤 My Accounts</div>
          <div onClick={()=>history.push("/user/setting")} className={item("/user/setting","Setting")}>⚙️ Setting</div>
          <div onClick={()=>logout()} className="px-4 py-3.5 rounded-xl cursor-pointer text-[15px] font-medium text-red-600 hover:bg-red-50">🚪 Logout</div>
        </div>
        <div className="flex md:hidden gap-2 overflow-x-auto pb-1">
          <button onClick={()=>history.push("/user/orders")} className="whitespace-nowrap bg-black text-white px-4 py-2 rounded-full text-sm">My Requests</button>
          <button onClick={()=>history.push("/user/profile")} className="whitespace-nowrap bg-white border px-4 py-2 rounded-full text-sm">My Accounts</button>
          <button onClick={()=>history.push("/user/setting")} className="whitespace-nowrap bg-white border px-4 py-2 rounded-full text-sm">Setting</button>
        </div>
      </div>
    </Fragment>
  );
};

export default Sidebar;