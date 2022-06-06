import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import SetCookie from "../../hooks/SetCookie";

import DotPulse from "../../loader/DotPulse";
import { notifyError, notifySuccess } from "../../alert/taostifyalert";
import {
  authenticateKitchenOwner,
  kitchenOwnerLogin,
} from "../../actions/kitchen/auth";
import { clearError } from "../../actions/error";
import MetaData from "../../utils/MetaData";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isAuthenticated, error, loading, token } = useSelector(
    (state) => state.kitchenOwnerAuth
  );

  const [show, setShow] = useState(false);

  //input fields state managing
  const [inputs, setInputs] = useState({ email: "", password: "" });

  //state for show and hide password
  const showPassword = () => {
    setShow(!show);
  };

  const { email, password } = inputs;

  //submiting the form input data.
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      email,
      password,
    };

    dispatch(kitchenOwnerLogin(formData));
  };

  //changing the input values.
  const onchange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  //redirecting the user after login
  useEffect(async () => {
    if (isAuthenticated) {
      //if kitchen owner is logged in than setting the cookies in the browser
      if (typeof token === "string") {
        notifySuccess("You are logged in now.");
        SetCookie("x-auth-token", token, 365);
        dispatch(authenticateKitchenOwner());
      }
      navigate("/kitchen/all");
    }
  }, [navigate, isAuthenticated, dispatch, token]);

  //clearing error
  useEffect(() => {
    if(error) {
      notifyError(error);
      dispatch(clearError());
    }
  }, [error, dispatch]);

  return (
    <>
      <MetaData title={"Login kitchen owner"} />
      <div className="w-full bg-gray-100 min-h-screen">
        <div className="w-[500px] max-w-full mx-auto px-4 py-8 sm:py-12">
          <div className="p-4 w-full flex flex-col shadow-lg rounded bg-white sm:p-8">
            <div className="w-full mb-8">
              <h1 className="text-2xl font-medium mb-2">Sign in</h1>
            </div>
            <form className="w-full" onSubmit={handleSubmit}>
              <div className="w-full mb-6 relative sm:mb-8">
                <input
                  type="text"
                  id="email"
                  name="email"
                  onChange={onchange}
                  value={inputs.email}
                  placeholder="Email"
                  className="w-full outline-none border border-gray-300 p-2 focus:border-black "
                />
              </div>
              <div className="w-full mb-6 relative flex flex-col items-end sm:mb-8">
                <input
                  type={show ? "text" : "password"}
                  id="password"
                  name="password"
                  onChange={onchange}
                  value={inputs.password}
                  placeholder="Password"
                  className="w-full outline-none border border-gray-300 p-2 focus:border-black pr-12"
                />
                <span
                  className="absolute top-1/2 -translate-y-1/2 px-4 select-none cursor-pointer text-black"
                  onClick={showPassword}
                >
                  {show ? (
                    <AiOutlineEye style={{ fontSize: "1.5rem" }} />
                  ) : (
                    <AiOutlineEyeInvisible style={{ fontSize: "1.5rem" }} />
                  )}
                </span>
              </div>
              <div className="w-full mb-4">
                <Link to="/forgotpassword" className="text-blue-600 font-sans">
                  forget password?
                </Link>
              </div>
              <button className="w-full text-center h-10 py-0 bg-cyan-600 text-white select-none cursor-pointer relative">
                {loading ? <DotPulse /> : <>Login</>}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
