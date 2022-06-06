import React, { useState, useEffect } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { clearError } from "../../../actions/error";
import { kitchenEmployeeLogin } from "../../../actions/kitchen/auth-employee";
import { notifySuccess } from "../../../alert/taostifyalert";
import DotPulse from "../../../loader/DotPulse";
import SetCookie from "../../../hooks/SetCookie";
import { useNavigate } from "react-router-dom";
import MetaData from "../../../utils/MetaData";

const EmployeeLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  //state for show and hide password
  const [show, setShow] = useState(false);

  const { error, isAuthenticated, loading, token } = useSelector(
    (state) => state.kEmployeeAuth
  );
  //input fields state managing
  const [inputs, setInputs] = useState({
    employeeId: "",
    password: "",
    kitchenId: "",
  });
  const showPassword = () => {
    setShow(!show);
  };

  const { employeeId, password, kitchenId } = inputs;

  //submiting the form input data.
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      employeeId,
      password,
      kitchenId,
    };

    dispatch(kitchenEmployeeLogin(formData));
  };

  //changing the input values.
  const onchange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  //alerts
  useEffect(() => {
    if (isAuthenticated) {
      notifySuccess("You are logged in.");
      if (typeof token === "string") {
        SetCookie("x-auth-token", token, 90);
      }
      //redirect the employee
      navigate("/employee/shift-start");
    }
  }, [isAuthenticated, token, navigate]);

  //errors
  useEffect(() => {
    if (error) {
      dispatch(clearError());
    }
  }, [error, dispatch]);

  return (
    <>
    <MetaData title={"Employee login"} />
      <div className="w-full bg-gray-100 min-h-screen">
        <div className="w-[500px] max-w-full mx-auto px-4 py-8 sm:py-12">
          <div className="p-4 w-full flex flex-col shadow-lg rounded bg-white sm:p-8">
            <div className="w-full mb-8">
              <h1 className="text-2xl font-medium mb-2">Login</h1>
              <p className="text-sm">Please login to your kitchen first.</p>
            </div>
            <form className="w-full" onSubmit={handleSubmit}>
              <div className="w-full mb-6 relative sm:mb-8">
                <input
                  type="text"
                  name="employeeId"
                  onChange={onchange}
                  value={inputs.employeeId}
                  placeholder="Employee ID"
                  className="w-full outline-none border border-gray-300 p-2 focus:border-black "
                />
              </div>
              <div className="w-full mb-6 relative sm:mb-8">
                <input
                  type="text"
                  name="kitchenId"
                  onChange={onchange}
                  value={inputs.kitchenId}
                  placeholder="Kitchen ID"
                  className="w-full outline-none border border-gray-300 p-2 focus:border-black "
                />
              </div>
              <div className="w-full mb-6 relative flex flex-col items-end sm:mb-8">
                <input
                  type={show ? "text" : "password"}
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
                {loading ? <DotPulse /> : <>Login</>}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default EmployeeLogin;
