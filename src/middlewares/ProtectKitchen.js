import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const ProtectKitchen = ({ isAdmin }) => {
  const { isAuthenticated } = useSelector((state) => state.kitchenOwnerAuth);
  if (!isAuthenticated) {
    <Navigate to={"/"} />;
  }
  if (isAuthenticated && !isAdmin) {
    <Navigate to={"/"} />;
  }
  return <Outlet />;
};

export default ProtectKitchen;
