import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { clearError } from "../../actions/error";
import {  getKitchenAction, updateKitchen } from "../../actions/kitchen/kitchen";
import { UPDATE_KITCHEN_RESET } from "../../actions/kitchen/typesKitchen";
import MetaData from "../../utils/MetaData";

const Kitchen = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  // select kitchen from the redux
  const { isupdated, error } = useSelector((state) => state.updateKitchen);

  //input fields state managing
  const [inputs, setInputs] = useState({ name: "", address: "", contact: "" });

  const { name, address, contact } = inputs;

  //submiting the form input data.
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      kitchenId: id,
      name,
      address,
      contact,
    };
    dispatch(updateKitchen(formData));
  };

  //changing the input values.
  const onchange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  //getting kitchen by id
  useEffect(() => {
    dispatch(getKitchenAction(id));
  }, [dispatch, id]);

  //checking is kitchen is updated
  useEffect(() => {
    if (isupdated) {
      //show success message
      dispatch({ type: UPDATE_KITCHEN_RESET });
    }
  }, [isupdated, dispatch]);

  //clearing error
  useEffect(() => {
    error && dispatch(clearError());
  }, [error, dispatch]);

  return (
    <div className="w-full bg-gray-100 min-h-screen">
      <div className="w-[500px] max-w-full mx-auto px-4 py-8 sm:py-12">
        <div className="p-4 w-full flex flex-col shadow-lg rounded bg-white sm:p-8">
          <div className="w-full mb-8">
            <h1 className="text-2xl font-medium mb-2">Update Kitchen</h1>
          </div>
          <form className="w-full" onSubmit={handleSubmit}>
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
            <div className="w-full mb-6 relative sm:mb-8">
              <input
                type="number"
                id="contact"
                name="contact"
                onChange={onchange}
                value={inputs.contact}
                placeholder="Contact No"
                className="w-full outline-none border border-gray-300 p-2 focus:border-black "
              />
            </div>
            <button className="w-full text-center h-10 p-2 bg-cyan-600 text-white select-none cursor-pointer">
              Update Kitchen
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Kitchen;
