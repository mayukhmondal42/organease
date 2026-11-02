import React, { Fragment, useState, useContext } from "react";
import Layout from "./Layout";
import { handleChangePassword } from "./Action";
import { DashboardUserContext } from "./Layout";

const SettingComponent = () => {
  const { data, dispatch } = useContext(DashboardUserContext);
  const [fData, setFdata] = useState({
    oldPassword: "", newPassword: "", confirmPassword: "",
    success: false, error: false, passwordView: false, type: "password",
  });

  if (fData.success || fData.error) {
    setTimeout(() => setFdata({ ...fData, success: false, error: false }), 2000);
  }

  if (data.loading) {
    return <div className="w-full flex items-center justify-center py-16"><div className="w-10 h-10 border-4 border-gray-200 border-t-black rounded-full animate-spin"></div></div>;
  }

  return (
    <Fragment>
      <div className="flex flex-col w-full my-4 md:my-0 md:w-9/12 md:px-8">
        <div className="bg-white shadow-sm border rounded-[24px] overflow-hidden">
          <div className="py-5 px-6 text-lg font-bold border-b">Change Password</div>
          <div className="py-6 px-6 md:px-8 flex flex-col space-y-4">
            {fData.success && <div className="bg-green-50 border border-green-100 text-green-700 px-4 py-3 rounded-xl text-sm font-medium">{fData.success}</div>}
            {fData.error && <div className="bg-red-50 border border-red-100 text-red-600 px-4 py-3 rounded-xl text-sm font-medium">{fData.error}</div>}

            <div className="flex flex-col space-y-1.5">
              <label htmlFor="oldPassword" className="text-sm font-medium text-gray-600">Old Password</label>
              <div className="relative">
                <input onChange={(e)=>setFdata({...fData, oldPassword:e.target.value})} value={fData.oldPassword} type={fData.type} id="oldPassword" placeholder="••••••••" className="border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-black outline-none px-4 py-3.5 w-full rounded-xl" />
                <span onClick={()=>setFdata({...fData, passwordView:!fData.passwordView, type: fData.type==="password"?"text":"password"})} className="absolute right-3 top-3.5 cursor-pointer text-gray-500 text-sm font-bold">{fData.passwordView ? "HIDE" : "SHOW"}</span>
              </div>
            </div>
            <div className="flex flex-col space-y-1.5">
              <label className="text-sm font-medium text-gray-600">New Password</label>
              <input onChange={(e)=>setFdata({...fData, newPassword:e.target.value})} value={fData.newPassword} type="password" placeholder="New password" className="border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-black outline-none px-4 py-3.5 w-full rounded-xl" />
            </div>
            <div className="flex flex-col space-y-1.5">
              <label className="text-sm font-medium text-gray-600">Confirm Password</label>
              <input onChange={(e)=>setFdata({...fData, confirmPassword:e.target.value})} value={fData.confirmPassword} type="password" placeholder="Confirm password" className="border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-black outline-none px-4 py-3.5 w-full rounded-xl" />
            </div>

            <div onClick={()=>handleChangePassword(fData, setFdata, dispatch)} className="w-full text-center cursor-pointer bg-black text-white px-4 py-3.5 rounded-full font-bold hover:bg-gray-800">Change Password</div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

const SettingUser = (props) => {
  return <Fragment><Layout children={<SettingComponent />} /></Fragment>;
};

export default SettingUser;