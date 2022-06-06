import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearError } from "../../../actions/error";
import { reportLostInventory } from "../../../actions/kitchen/employee-inventory";
import { REPORT_LOST_INVENTORY_RESET } from "../../../actions/kitchen/types-inventory";
import { notifyError, notifySuccess } from "../../../alert/taostifyalert";
import DotPulse from "../../../loader/DotPulse";
import MetaData from "../../../utils/MetaData";

const LostInventory = () => {
  const dispatch = useDispatch();
  const { error, isadded, loading } = useSelector(
    (state) => state.reportInventory
  );

  //input fields state managing
  const [inputs, setInputs] = useState({
    id: "",
    missingQuantity: "",
    description: "",
  });

  const { id, missingQuantity, description } = inputs;

  //submiting the form input data.
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      id,
      missingQuantity,
      description,
    };
    dispatch(reportLostInventory(formData));
  };

  //changing the input values.
  const onchange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (isadded) {
      notifySuccess("Report added.");
      dispatch({ type: REPORT_LOST_INVENTORY_RESET });
    }
  }, [isadded, dispatch]);

  //clearing error
  useEffect(() => {
    if (error) {
      notifyError(error);
      dispatch(clearError());
    }
  }, [error, dispatch]);

  return (
    <>
      <MetaData title={"add lost inventory"} />
      <div className="w-full bg-gray-100 min-h-screen">
        <div className="w-[500px] max-w-full mx-auto px-4 py-8 sm:py-12">
          <div className="p-4 w-full flex flex-col shadow-lg rounded bg-white sm:p-8">
            <div className="w-full mb-8">
              <h1 className="text-2xl font-medium mb-2">
                Report Lost Inventory
              </h1>
            </div>
            <form className="w-full" onSubmit={handleSubmit}>
              <div className="w-full mb-6 relative sm:mb-8">
                <input
                  type="text"
                  name="id"
                  onChange={onchange}
                  value={inputs.id}
                  placeholder="ID"
                  className="w-full outline-none border border-gray-300 p-2 focus:border-black "
                />
              </div>
              <div className="w-full mb-6 relative sm:mb-8">
                <input
                  type="text"
                  name="missingQuantity"
                  onChange={onchange}
                  value={inputs.missingQuantity}
                  placeholder="Missing Quantity"
                  className="w-full outline-none border border-gray-300 p-2 focus:border-black"
                />
              </div>
              <div className="w-full mb-6 relative sm:mb-8">
                <input
                  type="text"
                  name="description"
                  onChange={onchange}
                  value={inputs.description}
                  placeholder="Description"
                  className="w-full outline-none border border-gray-300 p-2 focus:border-black"
                />
              </div>
              <button className="w-full text-center h-10 p-2 bg-cyan-600 text-white select-none cursor-pointer">
                {loading ? <DotPulse /> : <>Submit Report</>}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default LostInventory;
