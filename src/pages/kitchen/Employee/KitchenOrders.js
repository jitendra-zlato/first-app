import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearError } from "../../../actions/error";
import { notifyError } from "../../../alert/taostifyalert";
import { getOrderInQueue } from "../../../actions/kitchen/employee-inventory";
import OrderCard from "./components/OrderCard";
import MetaData from "../../../utils/MetaData";

const KitchenOrders = () => {
  const dispatch = useDispatch();
  const [datas, setDatas] = useState([]);

  const { order, error , loading} = useSelector((state) => state.getOrder);

  useEffect(() => {
    order && setDatas([...order]);
  }, [order]);

  //getting all the employee of the specific kitchen
  useEffect(() => {
    dispatch(getOrderInQueue());
  }, [dispatch]);

  //clearing error
  useEffect(() => {
    if (error) {
      notifyError(error);
      dispatch(clearError());
    }
  }, [error, dispatch]);

  return (
    <>
      <MetaData title={loading ? "Loading..." : "orders"} />
      <div className="w-full bg-gray-100 min-h-screen">
        <div className="relative w-full max-w-7xl mx-auto">
          <div className="w-full grid grid-cols-1 gap-4 p-4 md:grid-cols-2 lg:grid-cols-3">
            {datas &&
              datas.map((i, index) => <OrderCard data={i} key={index} />)}
          </div>
        </div>
      </div>
    </>
  );
};

export default KitchenOrders;
