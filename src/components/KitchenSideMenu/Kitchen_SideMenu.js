import React, { Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { BiMenu } from "react-icons/bi";
import { IoIosArrowForward } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import KitchenIcon from "@mui/icons-material/Kitchen";
import { openKithenHamburger } from "../../actions/kitchen/hamburger";

const KSideMenu = () => {
  const dispatch = useDispatch();
  const { hamburger } = useSelector((state) => state.kitchenHamburger);
  const [kitchenHamburgerOpen, setKitchenHamburOpen] = useState(true);

  const [kitchenOpen, setKitchenOpen] = useState(false);

  const Hamburger = () => {
    // dispatching the hamburger
    dispatch(openKithenHamburger());

    //menu options
    setKitchenOpen(false);
  };

  const closeMenu = (set, value) => {
    //check if hamburger is colse
    if (kitchenHamburgerOpen === false) {
      dispatch(openKithenHamburger());
      set(!value);
    } else {
      set(!value);
    }
  };

  useEffect(() => {
    if (typeof hamburger === "boolean") setKitchenHamburOpen(hamburger);
  }, [hamburger]);

  return (
    <Fragment>
      <div
        className={`${
          kitchenHamburgerOpen ? "left-0" : "-left-72 md:w-20 md:left-0 "
        } fixed  top-0 h-screen w-72 overflow-x-hidden bg-white z-[100] dark:bg-[#282828] duration-300`}
      >
        <div className="relative select-none flex items-center h-14 min-h-[56px] py-2 px-3 cursor-pointer overflow-x-hidden">
          <span className="mx-3" onClick={Hamburger}>
            <BiMenu style={{ fontSize: "2rem", color: "#6e82a5" }} />
          </span>
          <Link to={"/kitchen/all"}>
            <h1
              className={`${
                !kitchenHamburgerOpen && "opacity-0"
              } text-white text-2xl w-full relative text-left whitespace-nowrap font-Nunito`}
            >
              Kunggy
            </h1>
          </Link>
        </div>

        {/* kitchen owner sidebar options */}
        <div className="relative w-full flex flex-col overflow-y-auto overflow-x-hidden pt-4 select-none duration-200">
          {/* kitchen all  */}
          <div className="w-full flex flex-col items-start py-1">
            <div
              className="relative flex items-center cursor-pointer transition-all py-2 px-7 w-full overflow-hidden hover:bg-black"
              onClick={() => closeMenu(setKitchenOpen, kitchenOpen)}
            >
              <span className="w-6 h-6 min-w-[24px] flex items-center justify-center mr-3">
                <KitchenIcon style={{ fontSize: "1.5rem", color: "#6e82a5" }} />
              </span>
              <span
                className={`${
                  !kitchenHamburgerOpen && "opacity-0"
                } text-[#6e82a5] font-normal leading-5 normal-case whitespace-nowrap tracking-wide`}
              >
                Kitchen
              </span>
              <span
                className={`${
                  kitchenOpen && "rotate-90"
                } aboslute right-0 mr-4`}
              >
                <IoIosArrowForward
                  style={
                    kitchenHamburgerOpen
                      ? { color: "#6e82a5" }
                      : { color: "#6e82a5", opacity: "0" }
                  }
                />
              </span>
            </div>
            <div
              className={`${
                kitchenOpen ? "h-fit" : "h-0"
              } flex flex-col overflow-hidden relative items-start`}
            >
              <Link
                to="/kitchen/all"
                className="py-2 px-16 text-gray-500 whitespace-nowrap"
              >
                Manage kitchen
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default KSideMenu;
