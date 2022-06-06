import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ADD_ITEM_RESET } from "../../actions/kitchen/types-inventory";
import { notifyError, notifySuccess } from "../../alert/taostifyalert";
import { clearError } from "../../actions/error";
import DotPulse from "../../loader/DotPulse";
import { getKitchenIdAction } from "../../actions/kitchen/kitchenId";
import { addItemToInventory } from "../../actions/kitchen/owner_inventory";
import MetaData from "../../utils/MetaData";
import SaveOrNot from "../../components/SaveOrNot";

const AddItemInventory = () => {
  const dispatch = useDispatch();
  //selecting the state from the redux store
  const { isadded, error, loading } = useSelector(
    (state) => state.addItemInventory
  );
  const { kitchenId, kerror } = useSelector((state) => state.getKitchenId);

  //input fields state managing
  const [inputs, setInputs] = useState({
    itemId: "",
    itemName: "",
    itemWeight: "",
    itemQuantity: "",
  });

  const { itemId, itemName, itemWeight, itemQuantity } = inputs;
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

    const formData = {
      kitchenId,
      itemId,
      itemName,
      itemWeight,
      itemQuantity,
    };

    dispatch(addItemToInventory(formData));
    setOpen(false);
  };

  //changing the input values.
  const onchange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  //get kitchen id
  useEffect(() => {
    dispatch(getKitchenIdAction());
  }, [dispatch]);

  useEffect(() => {
    if (isadded) {
      notifySuccess("Your item added.");
      dispatch({ type: ADD_ITEM_RESET });
    }
  }, [isadded, dispatch]);

  //clearing error
  useEffect(() => {
    if (error) {
      notifyError(error);
      dispatch(clearError());
    }
  }, [error, dispatch, kerror]);

  return (
    <>
      <MetaData title={"add inventory item"} />
      <SaveOrNot formSubmit={handleSubmit} isopen={open} close={handleClose} />
      <div className="w-full bg-gray-100 min-h-screen">
        <div className="w-[500px] max-w-full mx-auto px-4 py-8 sm:py-12">
          <div className="p-4 w-full flex flex-col shadow-lg rounded bg-white sm:p-8">
            <div className="w-full mb-8">
              <h1 className="text-2xl font-medium mb-2">Add Item</h1>
            </div>
            <form className="w-full" onSubmit={handleClickOpen}>
              <div className="w-full mb-6 relative sm:mb-8">
                <input
                  type="text"
                  name="itemId"
                  onChange={onchange}
                  value={inputs.itemId}
                  placeholder="Item ID"
                  className="w-full outline-none border border-gray-300 p-2 focus:border-black "
                />
              </div>
              <div className="w-full mb-6 relative sm:mb-8">
                <input
                  type="text"
                  name="itemName"
                  onChange={onchange}
                  value={inputs.itemName}
                  placeholder="Item Name"
                  className="w-full outline-none border border-gray-300 p-2 focus:border-black "
                />
              </div>
              <div className="w-full mb-6 relative sm:mb-8">
                <input
                  type="number"
                  name="itemWeight"
                  onChange={onchange}
                  value={inputs.itemWeight}
                  placeholder="Item Weight"
                  className="w-full outline-none border border-gray-300 p-2 focus:border-black "
                />
              </div>
              <div className="w-full mb-6 relative sm:mb-8">
                <input
                  type="number"
                  name="itemQuantity"
                  onChange={onchange}
                  value={inputs.itemQuantity}
                  placeholder="Item Quantity"
                  className="w-full outline-none border border-gray-300 p-2 focus:border-black "
                />
              </div>
              <button className="w-full text-center h-10 p-2 bg-cyan-600 text-white select-none cursor-pointer">
                {loading ? <DotPulse /> : <>Add Item</>}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddItemInventory;
