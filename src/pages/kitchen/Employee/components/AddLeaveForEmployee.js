import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { addEmployeeLeaveAction } from "../../../../actions/kitchen/employee-profile";
import { ADD_LEAVE_FOR_EMP_RESET } from "../../../../actions/kitchen/typesEmployee";
import { notifyError, notifySuccess } from "../../../../alert/taostifyalert";
import DotPulse from "../../../../loader/DotPulse";
import { clearError } from "../../../../actions/error";

const AddLeaveForEmployee = ({ kitchenId, employee }) => {
  const dispatch = useDispatch();

  //get employee id from params
  const { employeeId } = useParams();

  //selection datas from redux store
  const { isadded, error, loading } = useSelector((state) => state.employeeLeave);

  //employee details input fields state managing
  const [inputs, setInputs] = useState({
    reason: "",
    dateFrom: "",
    dateTo: "",
  });

  const { reason, dateFrom, dateTo } = inputs;

  //submiting the form input data.
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      employeeId,
      kitchenId,
      reason,
      dateFrom,
      dateTo,
    };
    dispatch(addEmployeeLeaveAction(formData));
  };

  //changing the employee update input values.
  const onchange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  //alears
  useEffect(() => {
    if (isadded) {
      notifySuccess("Employee leave added.");
      dispatch({ type: ADD_LEAVE_FOR_EMP_RESET });
    }
  }, [isadded, dispatch]);

  //clearError
  useEffect(() => {
    if (error) {
      notifyError(error);
      dispatch(clearError());
    }
  }, [error, dispatch]);

  return (
    <div className="w-[500px] max-w-full mx-auto px-4 py-8 sm:py-12">
      <div className="p-4 w-full flex flex-col shadow-lg rounded bg-white sm:p-8">
        <div className="w-full mb-8">
          <h1 className="text-2xl font-medium mb-2">Add Employee Leave</h1>
        </div>
        {employee && (
          <form className="w-full" onSubmit={handleSubmit}>
            <div className="w-full mb-6 relative sm:mb-8 flex justify-between items-center">
              <input
                type="text"
                id="reason"
                name="reason"
                onChange={onchange}
                value={inputs.reason}
                placeholder="Reason"
                className="w-full outline-none border border-gray-300 p-2 focus:border-black"
              />
            </div>
            <div className="w-full mb-6 relative sm:mb-8">
              <label htmlFor="dateFrom">Leave Start</label>
              <input
                id="dateFrom"
                type="date"
                name="dateFrom"
                onChange={onchange}
                value={inputs.dateFrom}
                className="w-full outline-none border border-gray-300 p-2 focus:border-black"
              />
            </div>
            <div className="w-full mb-6 relative sm:mb-8">
              <label htmlFor="dateTo">Leave End</label>
              <input
                type="date"
                name="dateTo"
                onChange={onchange}
                value={inputs.dateTo}
                className="w-full outline-none border border-gray-300 p-2 focus:border-black"
              />
            </div>
            <button className="w-full text-center h-10 p-2 bg-cyan-600 text-white select-none cursor-pointer">
              {loading ? <DotPulse /> : <>Add leave</>}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default AddLeaveForEmployee;
