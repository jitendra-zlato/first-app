import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { clearError } from "../../../actions/error";
import { getEmployeeById } from "../../../actions/kitchen/employee";
import { updateKitchenEmployee } from "../../../actions/kitchen/employee-profile";
import { getKitchenIdAction } from "../../../actions/kitchen/kitchenId";
import { UPDATE_KITCHEN_EMP_RESET } from "../../../actions/kitchen/typesEmployee";
import { notifySuccess } from "../../../alert/taostifyalert";

import AddLeaveForEmployee from "./components/AddLeaveForEmployee";
import AddPermission from "./components/AddPermission";
import EmployeeLeave from "./components/EmployeeLeave";
import ExtraWork from "./components/ExtraWork";
import DeletePermission from "./components/DeletePermission";
import DotPulse from "../../../loader/DotPulse";
import MetaData from "../../../utils/MetaData";

const UpdateEmployee = () => {
  const dispatch = useDispatch();

  //get employee id from params
  const { employeeId } = useParams();

  //selection datas from redux store
  const { kitchenId: kid } = useSelector((state) => state.getKitchenId);
  const { isupdated, error, loading } = useSelector(
    (state) => state.kitchenEmployeeProfile
  );
  const { employee, error: empErr } = useSelector(
    (state) => state.kitchenEmployee
  );

  //employee details input fields state managing
  const [inputs, setInputs] = useState({
    name: employee && employee.name,
    password: employee.password,
    phone: employee.phone,
    role: employee.role,
    salary: employee.salary,
    shiftStartTime: employee.shiftStartTime,
    shiftEndTime: employee.shiftEndTime,
  });

  const { name, password, phone, salary, role, shiftStartTime, shiftEndTime } =
    inputs;

  //setting auto complete the form data

  //submiting the form input data.
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      employeeId,
      kitchenId: kid,
      name,
      password,
      phone,
      salary,
      role,
      shiftStartTime,
      shiftEndTime,
    };

    dispatch(updateKitchenEmployee(formData));
  };

  //changing the employee update input values.
  const onchange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  //get kitchen id
  useEffect(() => {
    dispatch(getKitchenIdAction());
  }, [dispatch]);

  useEffect(() => {
    //getting employee
    if (typeof kid === "string") dispatch(getEmployeeById(employeeId, kid));
  }, [dispatch, kid, isupdated, employeeId]);

  //clearing errors
  useEffect(() => {
    if (error || empErr) {
      dispatch(clearError());
    }
  }, [error, empErr, dispatch]);

  //alears
  useEffect(() => {
    if (isupdated) {
      notifySuccess("Employee updated.");
      dispatch({ type: UPDATE_KITCHEN_EMP_RESET });
    }
  }, [isupdated, dispatch]);

  return (
    <>
      <MetaData title={"employee details"} />

      <div className="w-full bg-gray-100 min-h-[calc(100vh-56px)]">
        <div className="w-full flex flex-wrap justify-between">
          {/* update employee details */}
          {employee && (
            <div className="w-[500px] max-w-full mx-auto px-4 py-8 sm:py-12">
              <div className="p-4 w-full flex flex-col shadow-lg rounded bg-white sm:p-8">
                <div className="w-full mb-8">
                  <h1 className="text-2xl font-medium mb-2">
                    Update Employee Details
                  </h1>
                </div>
                {employee && (
                  <form className="w-full" onSubmit={handleSubmit}>
                    <div className="w-full mb-6 relative sm:mb-8">
                      <input
                        type="text"
                        id="name"
                        name="name"
                        onChange={onchange}
                        value={inputs.name}
                        placeholder="Name"
                        className="w-full outline-none border border-gray-300 p-2 focus:border-black"
                      />
                    </div>
                    <div className="w-full mb-6 relative sm:mb-8">
                      <input
                        type="text"
                        id="password"
                        name="password"
                        onChange={onchange}
                        value={inputs.password}
                        placeholder="Employee Password"
                        className="w-full outline-none border border-gray-300 p-2 focus:border-black"
                      />
                    </div>
                    <div className="w-full mb-6 relative sm:mb-8">
                      <input
                        type="text"
                        id="phone"
                        name="phone"
                        onChange={onchange}
                        value={inputs.phone}
                        placeholder="Phone"
                        className="w-full outline-none border border-gray-300 p-2 focus:border-black"
                      />
                    </div>
                    <div className="w-full mb-6 relative sm:mb-8">
                      <select
                        className="w-full outline-none border border-gray-300 p-2 focus:border-black"
                        onChange={onchange}
                        name="role"
                        value={inputs.role}
                      >
                        <option></option>
                        <option value={"user"}>user</option>
                        <option value={"employee"}>employee</option>
                        <option value={"owner"}>owner</option>
                      </select>
                    </div>
                    <div className="w-full mb-6 relative sm:mb-8">
                      <input
                        type="number"
                        name="salary"
                        onChange={onchange}
                        value={inputs.salary}
                        placeholder="Salary"
                        className="w-full outline-none border border-gray-300 p-2 focus:border-black"
                      />
                    </div>
                    <div className="w-full mb-6 relative sm:mb-8">
                      <div className="whitespace-nowrap mr-2">
                        <label htmlFor="shiftStartTime">Shift start</label>
                      </div>
                      <input
                        id="shiftStartTime"
                        type="time"
                        name="shiftStartTime"
                        onChange={onchange}
                        value={inputs.shiftStartTime}
                        placeholder="Shift Start Time"
                        className="shiftStartTime w-full outline-none border border-gray-300 p-2 focus:border-black"
                      />
                    </div>
                    <div className="w-full mb-6 relative sm:mb-8">
                      <div className="whitespace-nowrap mr-2">
                        <span>Shift End</span>
                      </div>
                      <input
                        type="time"
                        name="shiftEndTime"
                        onChange={onchange}
                        value={inputs.shiftEndTime}
                        placeholder="Shift End Time"
                        className="w-full outline-none border border-gray-300 p-2 focus:border-black"
                      />
                    </div>
                    <button className="w-full text-center h-10 p-2 bg-cyan-600 text-white select-none cursor-pointer">
                      {loading ? <DotPulse /> : <>Update Employee</>}
                    </button>
                  </form>
                )}
              </div>
            </div>
          )}
          {/* employee leave */}
          {employee && (
            <AddLeaveForEmployee kitchenId={kid} employee={employee} />
          )}
          {employee && <ExtraWork kitchenId={kid} employeeId={employee._id} />}
          {/* {employee && (
            <AddPermission kitchenId={kid} employeeId={employee._id} />
          )}
          {employee && (
            <DeletePermission kitchenId={kid} employeeId={employee._id} />
          )} */}
          {employee && employee.leaves && (
            <EmployeeLeave
              leaves={employee.leaves}
              kitchenId={kid}
              employeeId={employee._id}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default UpdateEmployee;
