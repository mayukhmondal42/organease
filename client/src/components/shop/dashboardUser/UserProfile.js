import React, { Fragment, useContext, useState, useEffect } from "react";
import Layout from "./Layout";
import { DashboardUserContext } from "./Layout";
import { updatePersonalInformationAction } from "./Action";

const ProfileComponent = () => {
  const { data, dispatch } = useContext(DashboardUserContext);
  const userDetails = data.userDetails !== null ? data.userDetails : "";

  const [fData, setFdata] = useState({ id: "", name: "", email: "", phone: "", success: false });

  useEffect(() => {
    setFdata({ ...fData, id: userDetails._id, name: userDetails.name, email: userDetails.email, phone: userDetails.phoneNumber });
  }, [userDetails]);

  const handleSubmit = () => updatePersonalInformationAction(dispatch, fData);

  if (data.loading) {
    return <div className="w-full flex items-center justify-center py-16"><div className="w-10 h-10 border-4 border-gray-200 border-t-black rounded-full animate-spin"></div></div>;
  }

  return (
    <Fragment>
      <div className="flex flex-col w-full my-4 md:my-0 md:w-9/12 md:px-8">
        <div className="bg-white shadow-sm border rounded-[24px] overflow-hidden">
          <div className="flex items-center gap-4 p-6 border-b bg-gray-50">
            <div className="w-14 h-14 rounded-full bg-black text-white flex items-center justify-center text-2xl font-bold">{fData.name?.charAt(0)?.toUpperCase() || "M"}</div>
            <div><h3 className="text-lg font-bold">Personal Information</h3><p className="text-sm text-gray-500">OrganEase - Organ Donation & Request • Mayukh Mondal</p></div>
          </div>

          <div className="py-6 px-6 md:px-8 flex flex-col space-y-4">
            {fData.success && <div className="bg-green-50 border border-green-100 text-green-700 px-4 py-3 rounded-xl text-sm font-medium">{fData.success}</div>}

            <div className="flex flex-col space-y-1.5">
              <label htmlFor="name" className="text-sm font-medium text-gray-600">Hospital Name</label>
              <input onChange={(e)=>setFdata({...fData, name:e.target.value})} value={fData.name || ""} type="text" id="name" className="border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-black outline-none px-4 py-3.5 w-full rounded-xl" />
            </div>
            <div className="flex flex-col space-y-1.5">
              <label htmlFor="email" className="text-sm font-medium text-gray-600">Hospital Email</label>
              <input value={fData.email || ""} readOnly type="email" id="email" className="cursor-not-allowed border border-gray-200 px-4 py-3.5 bg-gray-100 w-full rounded-xl text-gray-500" />
              <span className="text-xs text-gray-400">You can't change your email</span>
            </div>
            <div className="flex flex-col space-y-1.5">
              <label htmlFor="number" className="text-sm font-medium text-gray-600">Phone Number</label>
              <input onChange={(e)=>setFdata({...fData, phone:e.target.value})} value={fData.phone || ""} type="number" id="number" className="border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-black outline-none px-4 py-3.5 w-full rounded-xl" />
            </div>

            <div onClick={()=>handleSubmit()} className="w-full text-center cursor-pointer bg-black text-white px-4 py-3.5 rounded-full font-bold hover:bg-gray-800">Update Information</div>
            <p className="text-center text-xs text-gray-400">Need help? WhatsApp: +91 81013 08803</p>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

const UserProfile = (props) => {
  return <Fragment><Layout children={<ProfileComponent />} /></Fragment>;
};

export default UserProfile;