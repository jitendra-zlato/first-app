import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addKitchenAction } from "../../actions/kitchen/kitchen";
import { ADD_KITCHEN_RESET } from "../../actions/kitchen/typesKitchen";
import { notifyError, notifySuccess } from "../../alert/taostifyalert";
import { clearError } from "../../actions/error";
import DotPulse from "../../loader/DotPulse";
import MetaData from "../../utils/MetaData";
import SaveOrNot from "../../components/SaveOrNot";

const AddKitchen = () => {
  const dispatch = useDispatch();
  //selecting the state from the redux store
  const { isadded, error, loading } = useSelector((state) => state.addKitchen);
  const [inputError, setInputError] = useState("");

  //input fields state managing
  const [inputs, setInputs] = useState({ name: "", address: "" });

  const { name, address } = inputs;
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

  //submiting the form input data.
  const handleSubmit = async (e) => {
    e.preventDefault();
    //setting error
    if (!name || !address) {
      notifyError("all fields must be required.");
      return;
    }

    const formData = {
      name,
      address,
    };

    //dispatching the kitchen owner add kitchen action
    dispatch(addKitchenAction(formData));
    setOpen(false);
  };

  //changing the input values.
  const onchange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (isadded) {
      //if kitchen added than set it to not added kitchen
      notifySuccess("Your kitchen added successfully.");
      dispatch({ type: ADD_KITCHEN_RESET });
    }
  }, [isadded, dispatch]);

  //clearing error
  useEffect(() => {
    if (error) {
      notifyError(error);
      dispatch(clearError());
    }
  }, [error, dispatch]);

  useEffect(() => {
    if (inputError) {
      setInputError("");
    }
  }, []);
  return (
    <>
      <MetaData title={"add kitchen"} />
      <SaveOrNot formSubmit={handleSubmit} isopen={open} close={handleClose} />
      <div className="w-full bg-gray-100 min-h-screen">
        <div className="w-[500px] max-w-full mx-auto px-4 py-8 sm:py-12">
          <div className="p-4 w-full flex flex-col shadow-lg rounded bg-white sm:p-8">
            <div className="w-full mb-8">
              <h1 className="text-2xl font-medium mb-2">Add Kitchen</h1>
            </div>
            <form className="w-full" onSubmit={handleClickOpen}>
              <div className="w-full mb-6 relative sm:mb-8">
                <input
                  type="text"
                  id="name"
                  name="name"
                  onChange={onchange}
                  value={inputs.name}
                  placeholder="Name"
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
              <button className="w-full text-center h-10 p-2 bg-cyan-600 text-white select-none cursor-pointer">
                {loading ? <DotPulse /> : <>Add Kitchen</>}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddKitchen;
