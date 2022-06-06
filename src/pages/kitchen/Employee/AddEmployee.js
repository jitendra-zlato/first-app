import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearError } from "../../../actions/error";
import { addEmployee } from "../../../actions/kitchen/employee";
import { getKitchenAction } from "../../../actions/kitchen/kitchen";
import { getKitchenIdAction } from "../../../actions/kitchen/kitchenId";
import { ADD_EMPLOYEE_RESET } from "../../../actions/kitchen/typesEmployee";
import { notifyError, notifySuccess } from "../../../alert/taostifyalert";
import SaveOrNot from "../../../components/SaveOrNot";
import DotPulse from "../../../loader/DotPulse";
import MetaData from "../../../utils/MetaData";

const AddEmployee = () => {
  const dispatch = useDispatch();

  const { kitchenId } = useSelector((state) => state.getKitchenId);
  const { error, isadded, loading } = useSelector(
    (state) => state.addKitchenEmployee
  );
  const { kitchen, error: kError } = useSelector((state) => state.kitchen);

  //input fields state managing
  const [inputs, setInputs] = useState({
    name: "",
    password: "",
    confirmPassword: "",
    phone: "",
  });

  const { name, password, confirmPassword, phone } = inputs;
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

  //get kitchen id
  useEffect(() => {
    dispatch(getKitchenIdAction());
  }, [dispatch]);

  //submiting the form input data.
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password != confirmPassword) {
      notifyError("Password does not match.");
      return;
    }

    const formData = {
      name,
      kitchenId,
      password,
      phone,
    };
    dispatch(addEmployee(formData));
    setOpen(false);
  };

  //changing the input values.
  const onchange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  //get kitchen
  useEffect(() => {
    if (kitchenId) {
      dispatch(getKitchenAction(kitchenId));
    }
  }, [dispatch, kitchenId]);

  useEffect(() => {
    if (isadded) {
      notifySuccess("Employee added successfully.");
      dispatch({ type: ADD_EMPLOYEE_RESET });
    }
  }, [isadded, dispatch]);

  //clearing error
  useEffect(() => {
    if (error || kError) {
      error && notifyError(error);
      kError && notifyError(error);
      dispatch(clearError());
    }
  }, [error, dispatch, kError]);

  return (
    <>
      <MetaData title={"add employee"} />
      <SaveOrNot formSubmit={handleSubmit} isopen={open} close={handleClose} />
      {kitchenId && (
        <div className="w-full bg-gray-100 min-h-screen">
          <div className="w-[500px] max-w-full mx-auto px-4 py-8">
            <h2 className="text-2xl font-medium mb-6">{kitchen && kitchen.name}</h2>
            <div className="p-4 w-full flex flex-col shadow-lg rounded bg-white sm:p-8">
              <div className="w-full mb-8">
                <h1 className="text-2xl font-medium mb-2">Add Employee </h1>
              </div>
              <form className="w-full" onSubmit={handleClickOpen}>
                <div className="w-full mb-6 relative sm:mb-8">
                  <input
                    type="text"
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
                    name="password"
                    onChange={onchange}
                    value={inputs.password}
                    minLength={8}
                    placeholder="Password"
                    className="w-full outline-none border border-gray-300 p-2 focus:border-black"
                  />
                </div>
                <div className="w-full mb-6 relative sm:mb-8">
                  <input
                    type="text"
                    name="confirmPassword"
                    onChange={onchange}
                    value={inputs.confirmPassword}
                    minLength={8}
                    placeholder="Confirm Password"
                    className="w-full outline-none border border-gray-300 p-2 focus:border-black"
                  />
                </div>
                <div className="w-full mb-6 relative sm:mb-8">
                  <input
                    type="number"
                    name="phone"
                    onChange={onchange}
                    value={inputs.phone}
                    placeholder="Phone"
                    className="w-full outline-none border border-gray-300 p-2 focus:border-black"
                  />
                </div>
                <button className="w-full text-center h-10 p-2 bg-cyan-600 text-white select-none cursor-pointer">
                  {loading ? <DotPulse /> : <>Add Employee</>}
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AddEmployee;
