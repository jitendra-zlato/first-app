import React, { Fragment, useEffect, useState } from "react";
import { AiOutlineUser } from "react-icons/ai";
import { IoMdNotificationsOutline } from "react-icons/io";
import { BsChevronDown } from "react-icons/bs";
import { BiLogOut, BiUser } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import { IconButton } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { openKithenHamburger } from "../../actions/kitchen/hamburger";
import { BiMenu } from "react-icons/bi";
import RemoveCookie from "../../hooks/RemoveCookie";
import { AUTH_FAIL } from "../../actions/kitchen/typesAuth";
import { notifySuccess } from "../../alert/taostifyalert";

const KTopBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { owner } = useSelector(
    (state) => state.kitchenOwnerAuth
  );
  const [show, setShow] = useState(false);

  const Hamburger = () => {
    // dispatching the hamburger
    dispatch(openKithenHamburger());
  };

  const showHide = () => {
    setShow(!show);
  };

  //logout
  const logoutMe = () => {
    const remove = RemoveCookie("x-auth-token");
    if (remove) {
      notifySuccess("your are logged out.")
      navigate("/");
      dispatch({ type: AUTH_FAIL });
    }
  };

  return (
    <Fragment>
      <div className="sticky top-0 h-14 flex items-center justify-end px-4 md:px-8 border-b border-b-gray-300 z-50 w-full bg-white">
        {/* hamburger on mobile view */}
        <div className="p-4 fixed top-0 left-0">
          <div className="" onClick={Hamburger}>
            <BiMenu style={{ fontSize: "2rem" }} />
          </div>
        </div>

        <div className="relative h-full flex items-center justify-between w-fit">
          <div
            className="flex items-center cursor-pointer select-none"
            onClick={showHide}
          >
            <AiOutlineUser
              style={{
                background: "#00CD00",
                borderRadius: "50%",
                fontSize: "2rem",
                padding: ".5rem",
                color: "white",
              }}
            />
            <div className="flex flex-col mx-4 w-[100px]">
              <div className="text-sm mb-1">Administrator</div>
              <div className="text-blue-400 font-semibold flex items-center justify-center">
                <span>{owner && owner.name}</span>
                <span>
                  <BsChevronDown
                    style={{
                      fontWeight: "900",
                      fontSize: ".7rem",
                      marginLeft: ".5rem",
                    }}
                  />
                </span>
              </div>
            </div>
          </div>
          <div
            className={
              show
                ? "absolute top-[110%] -right-2 w-72 rounded bg-white overflow-hidden h-52 shadow-md duration-300"
                : "absolute top-[110%] -right-2 w-72 rounded bg-white overflow-hidden h-0 shadow-md duration-300"
            }
          >
            <div className="w-full relative flex flex-col">
              <div className="flex items-center justify-start bg-gray-200 w-full p-4">
                <div className="flex flex-col items-start">
                  <div className="text-base whitespace-nowrap text-gray-700 font-semibold">
                    {owner && owner.name}
                  </div>
                  <div className="font-semibold">
                    <small>{owner && owner.email}</small>
                  </div>
                </div>
              </div>
              <Link
                to={`/profile`}
                className="w-full p-3 text-gray-500 mt-2 flex items-center cursor-pointer text-sm my-2 hover:bg-blue-100"
              >
                <BiUser
                  style={{
                    marginRight: ".5rem",
                    color: "black",
                    fontSize: "1.5rem",
                  }}
                />
                My Profile
              </Link>

              <button
                className="w-full p-3 text-gray-500 mt-2 flex items-center cursor-pointer text-sm my-2 hover:bg-blue-100"
                onClick={() => logoutMe()}
              >
                <BiLogOut
                  style={{
                    marginRight: ".5rem",
                    color: "black",
                    fontSize: "1.5rem",
                  }}
                />
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default KTopBar;
