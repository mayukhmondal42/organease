import React, { Fragment, useState, useContext } from "react";
import { loginReq } from "./fetchApi";
import { LayoutContext } from "../index";

const Login = (props) => {
  const { data: layoutData, dispatch: layoutDispatch } = useContext(LayoutContext);

  const [data, setData] = useState({
    email: "",
    password: "",
    error: false,
    loading: true,
  });

  const alert = (msg) => <div className="text-xs text-red-500 font-medium mt-1">{msg}</div>;

  const formSubmit = async () => {
    setData({ ...data, loading: true });
    try {
      let responseData = await loginReq({
        email: data.email,
        password: data.password,
      });
      if (responseData.error) {
        setData({ ...data, loading: false, error: responseData.error, password: "" });
      } else if (responseData.token) {
        setData({ email: "", password: "", loading: false, error: false });
        localStorage.setItem("jwt", JSON.stringify(responseData));
        window.location.href = "/";
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Fragment>
      <div className="text-center">
        <div className="text-[26px] font-bold tracking-tight">Welcome Back</div>
        <p className="text-sm text-gray-500 mt-1">Login to Request Organs</p>
      </div>

      {layoutData.loginSignupError ? (
        <div className="bg-red-50 border border-red-100 text-red-600 text-sm py-3 px-4 rounded-[12px] mt-5">
          You need to login to Request Organs. Don't have an account ? Create new one.
        </div>
      ) : ""}

      <form className="space-y-4 mt-6">
        <div className="flex flex-col">
          <label htmlFor="name" className="text-sm font-semibold mb-1.5">
            Username or email address <span className="text-red-500">*</span>
          </label>
          <input
            onChange={(e) => { setData({ ...data, email: e.target.value, error: false }); layoutDispatch({ type: "loginSignupError", payload: false }); }}
            value={data.email}
            type="text"
            id="name"
            placeholder="Enter your email"
            className={`${!data.error ? "border-gray-200" : "border-red-500"} px-4 py-3 bg-gray-50 rounded-[12px] focus:outline-none focus:bg-white focus:ring-2 focus:ring-black border text-[15px]`}
          />
          {!data.error ? "" : alert(data.error)}
        </div>
        <div className="flex flex-col">
          <label htmlFor="password" className="text-sm font-semibold mb-1.5">
            Password <span className="text-red-500">*</span>
          </label>
          <input
            onChange={(e) => { setData({ ...data, password: e.target.value, error: false }); layoutDispatch({ type: "loginSignupError", payload: false }); }}
            value={data.password}
            type="password"
            id="password"
            placeholder="••••••••"
            className={`${!data.error ? "border-gray-200" : "border-red-500"} px-4 py-3 bg-gray-50 rounded-[12px] focus:outline-none focus:bg-white focus:ring-2 focus:ring-black border text-[15px]`}
          />
          {!data.error ? "" : alert(data.error)}
        </div>
        <div className="flex justify-between items-center text-sm">
          <label className="flex items-center gap-2 text-gray-600 cursor-pointer">
            <input type="checkbox" id="rememberMe" className="w-4 h-4 accent-black" /> Remember me
          </label>
          <a className="text-gray-600 underline" href="/">Lost password?</a>
        </div>
        <div
          onClick={(e) => formSubmit()}
          className="bg-black font-bold px-4 py-3.5 text-white text-center cursor-pointer rounded-full hover:bg-gray-800 active:scale-[0.98] transition"
        >
          Login
        </div>
      </form>
    </Fragment>
  );
};

export default Login;
