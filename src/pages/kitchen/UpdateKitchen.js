import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { clearError } from "../../actions/error";
import { getKitchenAction, updateKitchen } from "../../actions/kitchen/kitchen";
import { UPDATE_KITCHEN_RESET } from "../../actions/kitchen/typesKitchen";
import { notifySuccess } from "../../alert/taostifyalert";
import SaveOrNot from "../../components/SaveOrNot";
import MetaData from "../../utils/MetaData";

//importing for iskitchen added check

const UpdateKitchen = () => {
  const dispatch = useDispatch();

  //selecting the state from the redux store
  const { isupdated, error } = useSelector((state) => state.updateKitchen);

  const [inputError, setInputError] = useState("");
  const { kitchenId } = useParams();

  //input fields state managing
  const [inputs, setInputs] = useState({ name: "", address: "", contact: "" });const [open, setOpen] = useState(false);

  //click open
  const handleClickOpen = (e) => {
    e.preventDefault();
    setOpen(true);
  };

  //click close
  const handleClose = () => {
    setOpen(false);
  };

  const { name, address, contact } = inputs;

  //get kitchen by id
  useEffect(() => {
    dispatch(getKitchenAction(kitchenId));
  }, [kitchenId, dispatch]);

  //update kitchen name
  const handleUpdateName = async (e) => {
    e.preventDefault();
    const formData = {
      kitchenId,
      name,
    };
    dispatch(updateKitchen(formData));
  };

  //update kitchen name
  const handleUpdateAddress = async (e) => {
    e.preventDefault();
    const formData = {
      kitchenId,
      address,
    };
    dispatch(updateKitchen(formData));
    setOpen(false);
  };

  //update kitchen name
  const handleUpdateContact = async (e) => {
    e.preventDefault();
    const formData = {
      kitchenId,
      contact,
    };

    dispatch(updateKitchen(formData));
  };

  //changing the input values.
  const onchange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (isupdated) {
      //if kitchen added than set it to not added kitchen
      notifySuccess("kitchen updated successfully.");
      dispatch({ type: UPDATE_KITCHEN_RESET });
    }
  }, [isupdated, dispatch]);

  //clearing error
  useEffect(() => {
    if (error) {
      dispatch(clearError());
    }
  }, [error, dispatch]);

  useEffect(() => {
    if (inputError) {
      setInputError("");
    }
  }, [inputError]);

  return (
    <>
      <MetaData title={"update kitchen"} />
      <SaveOrNot formSubmit={handleUpdateAddress} isopen={open} close={handleClose} />
      <div className="w-full bg-gray-100 min-h-screen">
        <div className="w-[700px] max-w-full mx-auto px-4 py-8 sm:py-12">
          <div className="p-4 w-full flex flex-col shadow-lg rounded bg-white sm:p-8">
            <div className="w-full mb-8">
              <h1 className="text-2xl font-medium mb-2">Update Kitchen</h1>
            </div>
            {/* update kitchen name */}
            <form className="w-full" onSubmit={handleClickOpen}>
              <div className="w-full mb-6 relative sm:mb-8 flex justify-between">
                <input
                  type="text"
                  id="name"
                  name="name"
                  onChange={onchange}
                  value={inputs.name}
                  placeholder="Name"
                  className="w-[70%] outline-none border border-gray-300 p-2 focus:border-black "
                />
                <button className="w-[25%] text-center h-10 p-2 bg-cyan-600 text-white select-none cursor-pointer">
                  save
                </button>
              </div>
            </form>
            {/* update kitchen address */}
            <form className="w-full" onSubmit={handleUpdateAddress}>
              <div className="w-full mb-6 relative sm:mb-8 flex justify-between">
                <input
                  type="text"
                  id="address"
                  name="address"
                  onChange={onchange}
                  value={inputs.address}
                  placeholder="Address"
                  className="w-[70%] outline-none border border-gray-300 p-2 focus:border-black "
                />
                <button className="w-[25%] text-center h-10 p-2 bg-cyan-600 text-white select-none cursor-pointer">
                  save
                </button>
              </div>
            </form>
            {/* update kitchen contact */}
            <form className="w-full" onSubmit={handleUpdateContact}>
              <div className="w-full mb-6 relative sm:mb-8 flex justify-between">
                <input
                  type="text"
                  id="contact"
                  name="contact"
                  onChange={onchange}
                  value={inputs.contact}
                  placeholder="Contact"
                  className="w-[70%] outline-none border border-gray-300 p-2 focus:border-black "
                />
                <button className="w-[25%] text-center h-10 p-2 bg-cyan-600 text-white select-none cursor-pointer">
                  save
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdateKitchen;
