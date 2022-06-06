import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearError } from "../../actions/error";
import { verifyOpt } from "../../actions/kitchen/owner-profile";
import { VERIFY_OTP_RESET } from "../../actions/kitchen/typesOwner";
import MetaData from "../../utils/MetaData";

const ForgotPasswordOtp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error: otpError, isverified } = useSelector(
    (state) => state.kitchenOwnerVefiryOpt
  );
  const { forgotPassword, error } = useSelector(
    (state) => state.kitchenOwnerForPass
  );
  const { email } = useSelector((state) => state.kitchenOwnerForPass);
  const [opt, setOtp] = useState(new Array(4).fill(""));

  //submit otp form
  const handleSubmit = (e) => {
    e.preventDefault();
    let data = "";
    opt.map((i) => {
      data = data + i;
    });
    const formData = {
      email,
      otp: Number(data),
    };
    dispatch(verifyOpt(formData));
  };

  // onchange event
  const handleChange = (element, index) => {
    if (isNaN(element.value)) return false;

    setOtp([...opt.map((d, idx) => (idx === index ? element.value : d))]);

    // focus next input
    if (element.nextSibling) {
      element.nextSibling.focus();
    }
  };

  //redirecting the user
  useEffect(() => {
    if (isverified) {
      dispatch({ type: VERIFY_OTP_RESET });
    }
  }, [navigate, isverified, dispatch]);

  //clearing error
  useEffect(() => {
    if ((error, otpError)) dispatch(clearError());
  }, [otpError, error, dispatch]);

  //alerts
  useEffect(() => {
    
    return () => {
      
    };
  }, []);

  return (
    <>
    <MetaData title={"verify otp"}/>
      <div className="w-full bg-gray-100 min-h-screen">
        <div className="w-[500px] max-w-full mx-auto px-4 py-8 sm:py-12">
          <div className="p-4 w-full flex flex-col shadow-lg rounded bg-white sm:p-8">
            <div className="w-full mb-8">
              <h1 className="text-2xl font-medium mb-2">Verify OTP</h1>
              {/* <p>We are sent you a opt on {forgotPassword}</p> */}
            </div>
            <form className="w-full" onSubmit={handleSubmit}>
              <div className="w-full mb-6 relative sm:mb-8 flex justify-between">
                {opt.map((data, index) => {
                  return (
                    <input
                      type="text"
                      name="otp"
                      key={index}
                      value={data}
                      maxLength={1}
                      onChange={(e) => handleChange(e.target, index)}
                      className="w-14 text-center mx-2 rounded outline-none border border-gray-300 p-2 focus:border-black"
                      onFocus={(e) => e.target.select()}
                    />
                  );
                })}
              </div>
              <button className="w-full text-center h-10 p-2 bg-cyan-600 text-white select-none cursor-pointer">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ForgotPasswordOtp;
