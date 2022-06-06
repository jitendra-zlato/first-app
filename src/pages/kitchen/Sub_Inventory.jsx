import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getKitchenIdAction } from "../../actions/kitchen/kitchenId";
import { getSubInventoryAction } from "../../actions/kitchen/sub_inventory";
import MetaData from "../../utils/MetaData";

const Sub_Inventory = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { subInventory, error, loading } = useSelector(
    (state) => state.subInventory
  );
  const { kitchenId, error: idError } = useSelector((state) => state.getKitchenId);
  // get sub inventory
  useEffect(() => {
    if (id && typeof(kitchenId) === 'string') {
      dispatch(getSubInventoryAction(kitchenId, id));
    }
  }, [dispatch, id,kitchenId]);

  // geting kitchen id
  useEffect(() => {
    dispatch(getKitchenIdAction());
  }, [dispatch]);

  return (
    <>
      <MetaData title={loading ? "Loading..." : "kitchen sub-inventory"} />
      <div>Sub_Inventory</div>
    </>
  );
};

export default Sub_Inventory;
