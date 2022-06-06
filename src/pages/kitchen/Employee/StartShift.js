import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { employeeStartShift } from "../../../actions/kitchen/employee-shift";
import { clearError } from "../../../actions/error";
import DotPulse from "../../../loader/DotPulse";
import { notifyError, notifySuccess } from "../../../alert/taostifyalert";
import { useNavigate } from "react-router-dom";
import MetaData from "../../../utils/MetaData";

const StartShift = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error, isstarted, loading } = useSelector(
    (state) => state.employeeShiftStart
  );
  const startShift = () => {
    dispatch(employeeStartShift());
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
    if (isstarted) {
      notifySuccess("Your shift is started now.");
      navigate("/employee/shift-end");
    }
  }, [isstarted, dispatch, navigate]);

  return (
    <>
      <MetaData title={"shift"} />
      <div className="w-full bg-gray-100 min-h-screen flex flex-col items-center justify-center">
        <div className="w-72 max-w-full mx-auto px-4 py-8 sm:py-12 bg-white">
          <button
            className="w-full text-center h-10 p-2 bg-cyan-600 text-white select-none cursor-pointer rounded"
            onClick={startShift}
          >
            {loading ? <DotPulse /> : <>Start Shift</>}
          </button>
        </div>
      </div>
    </>
  );
};

export default StartShift;
