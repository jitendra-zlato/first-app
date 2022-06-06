import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import {
  authenticateKitchenOwner,
  kitchenOwnerRegister,
} from "../../actions/kitchen/auth";
import { clearError } from "../../actions/error";
import MetaData from "../../utils/MetaData";
import DotPulse from "../../loader/DotPulse";
import { notifySuccess , notifyError} from "../../alert/taostifyalert";
import SetCookie from "../../hooks/SetCookie";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isAuthenticated, error, loading, token } = useSelector(
    (state) => state.kitchenOwnerAuth
  );

  //state for show and hide password
  const [show, setShow] = useState(false);

  //input fields state managing
  const [inputs, setInputs] = useState({ name: "", email: "", password: "" });
  const showPassword = () => {
    setShow(!show);
  };

  const { name, email, password } = inputs;

  //submiting the form input data.
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      name,
      email,
      password,
    };

    // dispatch(kitchenOwnerRegister(formData));
  };

  //changing the input values.
  const onchange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  //redirecting the user after login
  useEffect(() => {
    //redirecting the user if logged in
    if (isAuthenticated) {
      //if kitchen owner is logged in than setting the cookies in the browser
      if (typeof token === "string") {
        notifySuccess("You are logged in now.");
        SetCookie("x-auth-token", token, 365);
        dispatch(authenticateKitchenOwner());
      }
      navigate("/kitchen/all");
    }
  }, [navigate, isAuthenticated, token, dispatch]);

  //clearing error
  useEffect(() => {
    if (error) {
      notifyError(error);
      dispatch(clearError());
    }
  }, [error, dispatch]);

  return (
    <>
      <MetaData title={"register"} />
      <div className="w-full bg-gray-100 min-h-screen">
        <div className="w-[500px] max-w-full mx-auto px-4 py-8 sm:py-12">
          <div className="p-4 w-full flex flex-col shadow-lg rounded bg-white sm:p-8">
            <div className="w-full mb-8">
              <h1 className="text-2xl font-medium mb-2">Register</h1>
            </div>
            <form className="w-full" onSubmit={handleSubmit}>
              <div className="w-full mb-6 relative sm:mb-8">
                <input
                  type="text"
                  id="name"
                  name="name"
                  onChange={onchange}
                  value={inputs.name}
                  placeholder="Name"
                  className="w-full outline-none border border-gray-300 p-2 focus:border-black "
                />
              </div>
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

              <button className="w-full text-center h-10 p-2 bg-cyan-600 text-white select-none cursor-pointer">
                {loading ? <DotPulse /> : <>Register</>}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
