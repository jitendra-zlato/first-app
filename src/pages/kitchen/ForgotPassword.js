import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearError } from "../../actions/error";
import { forgotPasswordAction } from "../../actions/kitchen/owner-profile";
import { notifyError, notifySuccess } from "../../alert/taostifyalert";
import DotPulse from "../../loader/DotPulse";
import MetaData from "../../utils/MetaData";

const ForgotPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { forgotPassword, isforgoted, loading, error } = useSelector(
    (state) => state.kitchenOwnerForPass
  );
  const [inputs, setInputs] = useState({ email: "" });

  const { email } = inputs;

  //submiting the form input data.
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      email,
    };

    dispatch(forgotPasswordAction(formData));
  };

  //changing the input values.
  const onchange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  //redirecting the user and showing the alerts
  useEffect(() => {
    if (isforgoted) {
      notifySuccess("OTP Sent Successfully, Please Check Your Mail");
      navigate("/forgotpassword/verify");
    }
  }, [navigate, isforgoted]);

  //clear errors
  useEffect(() => {
    if (error) {
      notifyError(error);
      dispatch(clearError());
    }
  }, [error, dispatch]);

  return (
    <>
      <MetaData title={"forgot password"} />
      <div className="w-full bg-gray-100 min-h-screen">
        <div className="w-[500px] max-w-full mx-auto px-4 py-8 sm:py-12">
          <div className="p-4 w-full flex flex-col shadow-lg rounded bg-white sm:p-8">
            <div className="w-full mb-8">
              <h1 className="text-2xl font-medium mb-2">Forgot Password</h1>
              <p className="text-sm text-gray-600">
                Enter the Email address asociated with your account and we'll
                send you a link to reset your password.
              </p>
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
              <button className="w-full text-center h-10 p-2 bg-cyan-600 text-white select-none uppercase cursor-pointer">
                {
                  loading ? <DotPulse/> : <>Get Otp</>
                }
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
