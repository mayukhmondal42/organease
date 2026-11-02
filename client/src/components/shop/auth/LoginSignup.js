import React, { Fragment, useState, useContext } from "react";
import Login from "./Login";
import Signup from "./Signup";
import { LayoutContext } from "../index";

const LoginSignup = (props) => {
  const { data, dispatch } = useContext(LayoutContext);

  const [login, setLogin] = useState(true);
  const [loginValue, setLoginValue] = useState("Create an account");

  const loginSignupModalToggle = () =>
    data.loginSignupModal
      ? dispatch({ type: "loginSignupModalToggle", payload: false })
      : dispatch({ type: "loginSignupModalToggle", payload: true });

  const changeLoginSignup = () => {
    if (login) {
      setLogin(false);
      setLoginValue("Login");
    } else {
      setLogin(true);
      setLoginValue("Create an account");
    }
  };

  return (
    <Fragment>
      <div
        onClick={(e) => loginSignupModalToggle()}
        className={`${data.loginSignupModal ? "" : "hidden"} fixed top-0 z-40 w-full h-screen bg-black/60 backdrop-blur-sm cursor-pointer`}
      ></div>
      <section
        className={`${data.loginSignupModal ? "" : "hidden"} fixed z-50 inset-0 my-6 md:my-12 flex items-start justify-center overflow-auto px-4`}
      >
        <div className="w-full max-w-[480px] relative bg-white p-6 md:p-8 rounded-[24px] shadow-2xl">
          {login ? <Login /> : <Signup />}
          <div className="flex items-center gap-3 my-5">
            <span className="border-b border-gray-200 w-full" />
            <span className="text-sm text-gray-400 font-medium">or</span>
            <span className="border-b border-gray-200 w-full" />
          </div>
          <div
            onClick={(e) => changeLoginSignup()}
            className="px-4 py-3 font-bold text-center cursor-pointer rounded-full border-2 border-black hover:bg-black hover:text-white transition"
          >
            {loginValue}
          </div>
          <div className="absolute top-4 right-4">
            <div
              onClick={(e) => {
                loginSignupModalToggle();
                dispatch({ type: "loginSignupError", payload: false });
              }}
              className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center cursor-pointer hover:bg-black hover:text-white transition"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
        </div>
      </section>
    </Fragment>
  );
};

export default LoginSignup;