import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { notifyError, notifySuccess } from "../../../../alert/taostifyalert";
import DotPulse from "../../../../loader/DotPulse";
import { clearError } from "../../../../actions/error";
import { addEmployeePermission } from "../../../../actions/kitchen/employee-profile";
import { UPDATE_KITCHEN_EMP_RESET } from "../../../../actions/kitchen/typesEmployee";

const AddPermission = ({ kitchenId, employeeId }) => {
  const dispatch = useDispatch();

  //selection datas from redux store
  const { isadded, error, loading } = useSelector(
    (state) => state.employeePermission
  );

  //employee details input fields state managing
  const [inputs, setInputs] = useState({
    permissionId: "",
  });

  const { permissionId } = inputs;

  //submiting the form input data.
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      employeeId,
      kitchenId,
      permissionId,
    };
    dispatch(addEmployeePermission(formData));
  };

  //changing the employee update input values.
  const onchange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  //clearing errors
  useEffect(() => {
    if (error) {
      notifyError(error);
      dispatch(clearError());
    }
  }, [error, dispatch]);

  //alears
  useEffect(() => {
    if (isadded) {
      notifySuccess("Employee Work permission.");
      dispatch({ type: UPDATE_KITCHEN_EMP_RESET });
    }
  }, [isadded, dispatch]);

  return (
    <div className="w-[500px] max-w-full mx-auto px-4 py-8 sm:py-12">
      <div className="p-4 w-full flex flex-col shadow-lg rounded bg-white sm:p-8">
        <div className="w-full mb-8">
          <h1 className="text-2xl font-medium mb-2">Add Permission</h1>
        </div>
        <form className="w-full" onSubmit={handleSubmit}>
          <div className="w-full mb-6 relative sm:mb-8 flex justify-between items-center">
            <input
              type="text"
              name="permissionId"
              onChange={onchange}
              value={inputs.permissionId}
              placeholder="Permission ID"
              className="w-full outline-none border border-gray-300 p-2 focus:border-black "
            />
          </div>
          <button className="w-full text-center h-10 p-2 bg-cyan-600 text-white select-none cursor-pointer">
            {loading ? <DotPulse /> : <>Add Permission</>}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddPermission;
