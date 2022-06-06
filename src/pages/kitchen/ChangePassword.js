import React, { useState, useEffect } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearError } from "../../actions/error";
import { changePassword } from "../../actions/kitchen/owner-profile";
import { CHANGE_PASSWORD_RESET } from "../../actions/kitchen/typesOwner";
import { notifySuccess } from "../../alert/taostifyalert";
import SaveOrNot from "../../components/SaveOrNot";
import DotPulse from "../../loader/DotPulse";
import MetaData from "../../utils/MetaData";

const ChangePassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { ischanged, error, loading } = useSelector(
    (state) => state.kitchenOwnerChangePass
  );
  //state for show and hide password
  const [show, setShow] = useState(false);
  const [showcfmpass, setShowcfmpass] = useState(false);

  //input fields state managing
  const [inputs, setInputs] = useState({ oldPassword: "", newPassword: "" });
  const [open, setOpen] = useState(false);

  //click open
  const handleClickOpen = (e) => {
    e.preventDefault();
    setOpen(true);
  };

  //click close
  const handleClose = () => {
    setOpen(false);
  };

  //show and hide password
  const showPassword = () => {
    setShow(!show);
  };
  const showCfnPassword = () => {
    setShowcfmpass(!showcfmpass);
  };

  const { oldPassword, newPassword } = inputs;

  //submiting the form input data.
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      oldPassword,
      newPassword,
    };

    dispatch(changePassword(formData));
    setOpen(false);
  };

  //changing the input values.
  const onchange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (ischanged) {
      // show your password is changed successfully message.
      notifySuccess("your password changed successfully.");
      dispatch({ type: CHANGE_PASSWORD_RESET });
    }
  }, [navigate, ischanged, dispatch]);

  //clearing error
  useEffect(() => {
    error && dispatch(clearError());
  }, [error, dispatch]);

  return (
    <>
      <MetaData title={"change password"} />
      <SaveOrNot formSubmit={handleSubmit} isopen={open} close={handleClose} />
      <div className="w-full bg-gray-100 min-h-screen">
        <div className="w-[500px] max-w-full mx-auto px-4 py-8 sm:py-12">
          <div className="p-4 w-full flex flex-col shadow-lg rounded bg-white sm:p-8">
            <div className="w-full mb-8">
              <h1 className="text-2xl font-medium mb-2">Change Password</h1>
            </div>
            <form className="w-full" onSubmit={handleClickOpen}>
              <div className="w-full mb-6 relative flex flex-col items-end sm:mb-8">
                <input
                  type={show ? "text" : "password"}
                  id="oldPassword"
                  name="oldPassword"
                  onChange={onchange}
                  value={inputs.oldPassword}
                  placeholder="Old Password"
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
                  id="newPassword"
                  name="newPassword"
                  onChange={onchange}
                  value={inputs.newPassword}
                  placeholder="New Password"
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
                {loading ? <DotPulse /> : <>Change password</>}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChangePassword;
