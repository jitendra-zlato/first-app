import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { setKitchenIdAction } from "../../../actions/kitchen/kitchenId";
import { notifyError, notifySuccess } from "../../../alert/taostifyalert";
import { AiOutlinePlus } from "react-icons/ai";
import {
  deleteMenuItem,
  getKitchenMenuAction,
} from "../../../actions/kitchen/menu";
import { clearError } from "../../../actions/error";
import MetaData from "../../../utils/MetaData";
import { getKitchenAction } from "../../../actions/kitchen/kitchen";
import { getAllSubInventory } from "../../../actions/kitchen/sub_inventory";
import { DELETE_MENU_ITEM_RESET } from "../../../actions/kitchen/typesMenu";

const KitchenMenu = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const [datas, setDatas] = useState({});
  const [subInvent, setSubInvent] = useState([]);

  //selecting the values from the redux store
  const { kitchenMenu, error, loading } = useSelector(
    (state) => state.getKitchenMenu
  );
  const { kitchen, error: kitchenError } = useSelector(
    (state) => state.kitchen
  );
  const { subInventory } = useSelector((state) => state.allSubInventory);
  const { isdeleted, error: delError } = useSelector(
    (state) => state.deleteMenuItem
  );

  //set kitchen menu as datas
  useEffect(() => {
    if (kitchenMenu && kitchenMenu.length > 0) {
      setDatas([...kitchenMenu]);
    }
  }, [kitchenMenu]);
  useEffect(() => {
    if (subInventory && subInventory.items && subInventory.items.length > 0) {
      setSubInvent([...subInventory.items]);
    }
  }, [subInventory]);

  //get all subinventory
  useEffect(() => {
    if (id) {
      dispatch(getAllSubInventory(id));
    }
  }, [dispatch, id, isdeleted]);

  //getting kitchen menu by id
  useEffect(() => {
    if (id) dispatch(getKitchenMenuAction(id));
  }, [dispatch, id, isdeleted]);

  // set kitchen id
  useEffect(() => {
    if (id) {
      dispatch(setKitchenIdAction(id));
    }
  }, [id, dispatch]);

  // get kitchen
  useEffect(() => {
    if (id) {
      dispatch(getKitchenAction(id));
    }
  }, [id, dispatch]);

  //delete item
  const deleteItem = (itemId) => {
    dispatch(deleteMenuItem(id, itemId));
  };

  useEffect(() => {
    if (isdeleted) {
      notifySuccess("Item deleted successfully.");
      dispatch({ type: DELETE_MENU_ITEM_RESET });
    }
  }, [isdeleted, dispatch]);

  //clear all the error
  useEffect(() => {
    if (error || kitchenError || delError) {
      error && notifyError(error);
      delError && notifyError(delError);
      dispatch(clearError());
    }
  }, [error, dispatch, kitchenError, delError]);

  return (
    <>
      <MetaData title={loading ? "Loading..." : "kitchen menu"} />
      {datas && datas.length > 0 ? (
        <div className="p-4 md:p-4 lg:p-8 w-full bg-gray-100 min-h-[calc(100vh-56px)]">
          <div className="relative w-full max-w-7xl mx-auto bg-white shadow-md p-4">
            <div className="absolute top-4 right-4 flex">
              <div className="p-2 text-xl bg-cyan-500 text-white rounded ml-2">
                <Link to="/kitchen/menu/add">
                  <AiOutlinePlus />
                </Link>
              </div>
            </div>
            <h1 className="text-2xl">Menu - {kitchen && kitchen.name}</h1>
            {datas.map((item) => (
              <div className="w-full py-4" key={item._id}>
                <div className="font-semibold flex items-center w-full justify-start relative">
                  Menu ID -
                  <div className="flex items-center">
                    <div>{item && item.id}</div>
                    <div className="absolute right-0 p-2 py-0 items-center flex bg-green-500 text-white rounded">
                      <Link to={`/kitchen/menu/update/${id}`}>Edit </Link>
                    </div>
                  </div>
                </div>
                <div className="font-semibold">Name - {item && item.name}</div>
                <div className="font-semibold">
                  Price - {item && item.price}
                </div>
                <div className="font-semibold">
                  Quantity - {item && item.quantity}
                </div>
                <div className="font-semibold">
                  Available - {item && item.quantityAvailable}
                </div>
                <div className="font-semibold">
                  Portion For - {item && item.portionFor}
                </div>
                <div className="font-semibold">
                  Portion Size -{" "}
                  {item && item.portionSize === "02" ? <>Full</> : <>Half</>}
                </div>
                <div className="font-semibold">
                  {item && item.isNonVeg === true ? <>Non-veg</> : <>Veg</>}
                </div>
                <div className="h-32 w-32 relative">
                  <img
                    src={item && item.images[0] && item.images[0].url}
                    alt=""
                    className="absolute top-0 left-0 object-contain h-full w-full"
                  />
                </div>
              </div>
            ))}
            <div>
              Sub-Inventory
              {subInvent &&
                subInvent.length > 0 &&
                subInvent.map((i) => (
                  <div key={i.id} className="flex flex-wrap justify-between">
                    <div className="text-left w-1/2">{i && i.name}</div>
                    <div className="">{i && i.quantity} gm</div>
                    <button
                      className="bg-red-600 rounded px-1 text-white text-sm mx-4 my-1"
                      onClick={() => deleteItem(i.id)}
                    >
                      Delete
                    </button>
                  </div>
                ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="p-2 m-6 text-xl bg-cyan-500 text-white rounded w-fit">
          <Link to="/kitchen/menu/add">
            <AiOutlinePlus />
          </Link>
        </div>
      )}
    </>
  );
};

export default KitchenMenu;
