import React, { useState, useEffect } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { clearError } from "../../actions/error";
import { resetPassword } from "../../actions/kitchen/owner-profile";
import { RESET_PASSWORD_RESET } from "../../actions/kitchen/typesOwner";
import { notifyError, notifySuccess } from "../../alert/taostifyalert";
import DotPulse from "../../loader/DotPulse";
import MetaData from "../../utils/MetaData";

const ResetPassword = () => {
  const dispatch = useDispatch();
  const { isreset, error, loading } = useSelector(
    (state) => state.kitchenOwnerResetPass
  );
  //state for show and hide password
  const [show, setShow] = useState(false);
  const [showcfmpass, setShowcfmpass] = useState(false);

  //input fields state managing
  const [inputs, setInputs] = useState({ password: "", confirmPassword: "" });

  //show and hide password
  const showPassword = () => {
    setShow(!show);
  };
  const showCfnPassword = () => {
    setShowcfmpass(!showcfmpass);
  };

  const { password, confirmPassword } = inputs;

  //submiting the form input data.
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      password,
      confirmPassword,
    };

    dispatch(resetPassword(formData));
  };

  useEffect(() => {
    if (isreset) {
      notifySuccess("your password saved successfully.");
      dispatch({ type: RESET_PASSWORD_RESET });
    }
  }, [isreset, dispatch]);

  //changing the input values.
  const onchange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  //clearing error
  useEffect(() => {
    if (error) {
      notifyError(error);
      dispatch(clearError());
    }
  }, [error, dispatch]);

  return (
    <>
      <MetaData title={"reset password"} />
      <div className="w-full bg-gray-100 min-h-screen">
        <div className="w-[500px] max-w-full mx-auto px-4 py-8 sm:py-12">
          <div className="p-4 w-full flex flex-col shadow-lg rounded bg-white sm:p-8">
            <div className="w-full mb-8">
              <h1 className="text-2xl font-medium mb-2">Reset Password</h1>
            </div>
            <form className="w-full" onSubmit={handleSubmit}>
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
              <div className="w-full mb-6 relative flex flex-col items-end sm:mb-8">
                <input
                  type={showcfmpass ? "text" : "password"}
                  id="confirmPassword"
                  name="confirmPassword"
                  onChange={onchange}
                  value={inputs.confirmPassword}
                  placeholder="Confirm Password"
                  className="w-full outline-none border border-gray-300 p-2 focus:border-black pr-12"
                />
                <span
                  className="absolute top-1/2 -translate-y-1/2 px-4 select-none cursor-pointer text-black"
                  onClick={showCfnPassword}
                >
                  {showcfmpass ? (
                    <AiOutlineEye style={{ fontSize: "1.5rem" }} />
                  ) : (
                    <AiOutlineEyeInvisible style={{ fontSize: "1.5rem" }} />
                  )}
                </span>
              </div>
              <button className="w-full text-center h-10 p-2 bg-cyan-600 text-white select-none cursor-pointer">
                {loading ? <DotPulse /> : "Reset Password"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ResetPassword;
