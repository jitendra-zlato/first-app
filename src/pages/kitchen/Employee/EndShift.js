import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearError } from "../../../actions/error";
import DotPulse from "../../../loader/DotPulse";
import { notifyError, notifySuccess } from "../../../alert/taostifyalert";
import { employeeEndShift } from "../../../actions/kitchen/employee-shift";
import { useNavigate } from "react-router-dom";
import MetaData from "../../../utils/MetaData";

const EndShift = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error, isended, loading } = useSelector(
    (state) => state.employeeShiftEnd
  );
  const endShift = () => {
    dispatch(employeeEndShift());
  };

  //errors
  useEffect(() => {
    if (error) {
      notifyError(error);
      dispatch(clearError());
    }
  }, [error, dispatch]);

  //alerts
  useEffect(() => {
    if (isended) {
      notifySuccess("Your shift is ended now.");
      navigate("/employee/start-shift");
    }
  }, [isended, dispatch, navigate]);

  return (
    <>
    <MetaData title={"shift started"}/>
      <div className="w-full bg-gray-100 min-h-screen flex flex-col items-center justify-center">
        <div className="w-72 max-w-full mx-auto px-4 py-8 sm:py-12 bg-white">
          <button
            className="w-full text-center h-10 p-2 bg-cyan-600 text-white select-none cursor-pointer rounded"
            onClick={endShift}
          >
            {loading ? <DotPulse /> : <>End Shift</>}
          </button>
        </div>
      </div>
    </>
  );
};

export default EndShift;
