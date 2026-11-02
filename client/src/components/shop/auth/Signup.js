import React, { Fragment, useState } from "react";
import { signupReq } from "./fetchApi";

const Signup = (props) => {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    cPassword: "",
    error: false,
    loading: false,
    success: false,
  });

  const alert = (msg, type) => (
    <div className={`text-sm font-medium ${type === "green" ? "text-green-600 bg-green-50 border border-green-100 p-3 rounded-[12px]" : "text-red-500"} mt-1`}>{msg}</div>
  );

  const formSubmit = async () => {
    setData({ ...data, loading: true });
    if (data.cPassword !== data.password) {
      return setData({
        ...data,
        error: {
          cPassword: "Password doesn't match",
          password: "Password doesn't match",
        },
      });
    }
    try {
      let responseData = await signupReq({
        name: data.name,
        email: data.email,
        password: data.password,
        cPassword: data.cPassword,
      });
      if (responseData.error) {
        setData({ ...data, loading: false, error: responseData.error, password: "", cPassword: "" });
      } else if (responseData.success) {
        setData({ success: responseData.success, name: "", email: "", password: "", cPassword: "", loading: false, error: false });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Fragment>
      <div className="text-center">
        <div className="text-[26px] font-bold tracking-tight">Create Account</div>
        <p className="text-sm text-gray-500 mt-1">Join to Request Organs</p>
      </div>
      <form className="space-y-4 mt-6">
        {data.success ? alert(data.success, "green") : ""}
        <div className="flex flex-col">
          <label htmlFor="name" className="text-sm font-semibold mb-1.5">Name <span className="text-red-500">*</span></label>
          <input onChange={(e) => setData({ ...data, success: false, error: {}, name: e.target.value })} value={data.name} type="text" id="name" placeholder="Your full name" className={`${data.error.name ? "border-red-500" : "border-gray-200"} px-4 py-3 bg-gray-50 rounded-[12px] focus:outline-none focus:bg-white focus:ring-2 focus:ring-black border text-[15px]`} />
          {!data.error ? "" : alert(data.error.name, "red")}
        </div>
        <div className="flex flex-col">
          <label htmlFor="email" className="text-sm font-semibold mb-1.5">Email address <span className="text-red-500">*</span></label>
          <input onChange={(e) => setData({ ...data, success: false, error: {}, email: e.target.value })} value={data.email} type="email" id="email" placeholder="you@example.com" className={`${data.error.email ? "border-red-500" : "border-gray-200"} px-4 py-3 bg-gray-50 rounded-[12px] focus:outline-none focus:bg-white focus:ring-2 focus:ring-black border text-[15px]`} />
          {!data.error ? "" : alert(data.error.email, "red")}
        </div>
        <div className="flex flex-col">
          <label htmlFor="password" className="text-sm font-semibold mb-1.5">Password <span className="text-red-500">*</span></label>
          <input onChange={(e) => setData({ ...data, success: false, error: {}, password: e.target.value })} value={data.password} type="password" id="password" placeholder="••••••••" className={`${data.error.password ? "border-red-500" : "border-gray-200"} px-4 py-3 bg-gray-50 rounded-[12px] focus:outline-none focus:bg-white focus:ring-2 focus:ring-black border text-[15px]`} />
          {!data.error ? "" : alert(data.error.password, "red")}
        </div>
        <div className="flex flex-col">
          <label htmlFor="cPassword" className="text-sm font-semibold mb-1.5">Confirm password <span className="text-red-500">*</span></label>
          <input onChange={(e) => setData({ ...data, success: false, error: {}, cPassword: e.target.value })} value={data.cPassword} type="password" id="cPassword" placeholder="••••••••" className={`${data.error.cPassword ? "border-red-500" : "border-gray-200"} px-4 py-3 bg-gray-50 rounded-[12px] focus:outline-none focus:bg-white focus:ring-2 focus:ring-black border text-[15px]`} />
          {!data.error ? "" : alert(data.error.cPassword, "red")}
        </div>
        <div className="flex justify-between items-center text-sm">
          <label className="flex items-center gap-2 text-gray-600 cursor-pointer"><input type="checkbox" id="rememberMe" className="w-4 h-4 accent-black" /> Remember me</label>
          <a className="text-gray-600 underline" href="/">Forgot password?</a>
        </div>
        <div onClick={(e) => formSubmit()} className="bg-black px-4 py-3.5 text-white text-center cursor-pointer font-bold rounded-full hover:bg-gray-800 active:scale-[0.98] transition">
          Create an account
        </div>
      </form>
    </Fragment>
  );
};

export default Signup;