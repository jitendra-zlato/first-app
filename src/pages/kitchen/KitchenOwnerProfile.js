import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearError } from "../../actions/error";
import {
  kitchenOwnerGetProfile,
  updateProfile,
} from "../../actions/kitchen/owner-profile";
import { PROFILE_UPDATE_RESET } from "../../actions/kitchen/typesOwner";
import MetaData from "../../utils/MetaData";
import DotPulse from "../../loader/DotPulse";
import { notifyError, notifySuccess } from "../../alert/taostifyalert";
import { Link } from "react-router-dom";

const KitchenOwnerProfile = () => {
  const dispatch = useDispatch();
  const { isupdated, error, loading } = useSelector(
    (state) => state.kitchenOwnerProfileUpdate
  );
  //input fields state managing
  const [inputs, setInputs] = useState({
    mobile: "",
    address: "",
    gender: "",
  });

  const { mobile, address, gender } = inputs;

  //submiting the form input data.
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      mobile,
      address,
      gender,
    };

    dispatch(updateProfile(formData));
  };

  //changing the input values.
  const onchange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  //getting owner profile
  useEffect(() => {
    dispatch(kitchenOwnerGetProfile());
  }, [dispatch]);

  //redirecting the user after login
  useEffect(() => {
    //redirecting the user if logged in
    if (isupdated) {
      notifySuccess("Your profile updated.");
      dispatch({ type: PROFILE_UPDATE_RESET });
    }
  }, [isupdated, dispatch]);

  //clearing error
  useEffect(() => {
    if (error) {
      notifyError(error);
      dispatch(clearError());
    }
  }, [error, dispatch]);

  return (
    <>
      <MetaData title={"my profile"} />

      <div className="w-full bg-gray-100 min-h-screen">
        <div className="max-w-full mx-auto px-4 py-8 sm:py-12 flex justify-evenly items-center">
          <div className="w-[400px] p-4 flex flex-col shadow-lg rounded bg-white sm:p-8">
            <div className="w-full mb-8">
              <h1 className="text-2xl font-medium mb-2">Update</h1>
            </div>
            <form className="w-full" onSubmit={handleSubmit}>
              <div className="w-full mb-6 relative sm:mb-8">
                <input
                  type="number"
                  id="mobile"
                  name="mobile"
                  onChange={onchange}
                  value={inputs.mobile}
                  placeholder="Mobile No"
                  className="w-full outline-none border border-gray-300 p-2 focus:border-black "
                />
              </div>
              <div className="w-full mb-6 relative sm:mb-8">
                <input
                  type="text"
                  id="address"
                  name="address"
                  onChange={onchange}
                  value={inputs.address}
                  placeholder="Address"
                  className="w-full outline-none border border-gray-300 p-2 focus:border-black "
                />
              </div>
              <div
                className="w-full mb-6 relative flex flex-wrap items-center sm:mb-8"
                onChange={onchange}
              >
                <span className="text-black mr-4">Gender</span>
                <input type="radio" value="Male" name="gender" id="gmale" />
                <label htmlFor="gmale" className="ml-1 mr-4 text-gray-600">
                  Male
                </label>
                <input type="radio" value="Female" name="gender" id="gfemale" />
                <label htmlFor="gfemale" className="ml-1 mr-4 text-gray-600">
                  Female
                </label>
                <input type="radio" value="Other" name="gender" id="gother" />
                <label htmlFor="gother" className="ml-1 mr-4 text-gray-600">
                  Other
                </label>
              </div>
              <button className="w-full text-center h-10 p-2 bg-cyan-600 text-white select-none cursor-pointer">
                {loading ? <DotPulse /> : "Save"}
              </button>
            </form>
          </div>
          <Link to={'/change-password'} className="px-4 py-2 bg-cyan-500 rounded text-white">Change password</Link>
        </div>
      </div>
    </>
  );
};

export default KitchenOwnerProfile;
