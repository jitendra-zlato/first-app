import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// kitchen side menu
import KithcneSideMenu from "./components/KitchenSideMenu/Kitchen_SideMenu";
import KTopBar from "./components/KitchenSideMenu/Kitchen_TopBar";

//importing toastify container
import { ToastContainer } from "react-toastify";

import Login from "./pages/kitchen/Login";
import ForgotPassword from "./pages/kitchen/ForgotPassword";
import ResetPassword from "./pages/kitchen/ResetPassword";
import ForgotPasswordOtp from "./pages/kitchen/ForgotPasswordOtp";
import KitchenOwnerProfile from "./pages/kitchen/KitchenOwnerProfile";
import AddKitchen from "./pages/kitchen/AddKitchen";
import AllKitchen from "./pages/kitchen/AllKitchen";
import UpdateKitchen from "./pages/kitchen/UpdateKitchen";
import NotFound404 from "./components/NotFound404";
import Kitchen from "./pages/kitchen/Kitchen";
import UpdateMenuItem from "./pages/kitchen/KitchenMenu/UpdateMenuItem";
import AddItemToMenu from "./pages/kitchen/KitchenMenu/AddItemToMenu";
import AddEmployee from "./pages/kitchen/Employee/AddEmployee";
import AllEmployee from "./pages/kitchen/Employee/AllEmployee";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import UpdateEmployee from "./pages/kitchen/Employee/UpdateEmployee";
import EmployeeLogin from "./pages/kitchen/Employee/EmployeeLogin";
import KitchenMenu from "./pages/kitchen/KitchenMenu/KitchenMenu";
import store from "./store";
import ViewAllMenu from "./pages/kitchen/KitchenMenu/ViewAllMenu";
import KitchenInventory from "./pages/kitchen/Kitchen_Inventory";
import { authenticateKitchenOwner } from "./actions/kitchen/auth";
import StartShift from "./pages/kitchen/Employee/StartShift";
import EndShift from "./pages/kitchen/Employee/EndShift";
import AllShifts from "./pages/kitchen/Employee/AllShifts";
import ProtectKitchen from "./middlewares/ProtectKitchen";
import AddItemInventory from "./pages/kitchen/AddItemInventory";
import UpdateInventory from "./pages/kitchen/UpdateInventory";
import LostInventory from "./pages/kitchen/Employee/LostInventory";
import KitchenOrders from "./pages/kitchen/Employee/KitchenOrders";
import AddInventory from "./pages/kitchen/AddInventory";
import ChangePassword from "./pages/profile/ChangePassword";
import Sub_Inventory from "./pages/kitchen/Sub_Inventory";
import { openKithenHamburger } from "./actions/kitchen/hamburger";

function App() {
  const { hamburger } = useSelector((state) => state.kitchenHamburger);
  const [kitchenHamburgerOpen, setKitchenHamburOpen] = useState(true);

  useEffect(() => {
    if (typeof hamburger === "boolean") setKitchenHamburOpen(hamburger);
  }, [hamburger]);

  // check is enyone is already logged in.
  useEffect(() => {
    store.dispatch(authenticateKitchenOwner());
    store.dispatch(openKithenHamburger());
    store.dispatch(openKithenHamburger());
    // store.dispatch(authenticateKitchenEmployee());
  }, []);

  return (
    <Router>
      <div className="App">
        <Routes>
          {/* kitchen owner routes */}
          <Route path="/" element={<Login />} />
          <Route path="/forgotpassword" element={<ForgotPassword />} />
          <Route
            path="/forgotpassword/verify"
            element={<ForgotPasswordOtp />}
          />
          <Route path="/resetpassword" element={<ResetPassword />} />
          {/* admin routes */}
          <Route
            element={
              <>
                <KithcneSideMenu />
                <div
                  className={
                    kitchenHamburgerOpen
                      ? "kitchen-view-h-open"
                      : "kitchen-view-h-close"
                  }
                >
                  <KTopBar />
                  <ProtectKitchen isAdmin={true} />
                </div>
              </>
            }
          >
            <Route path="/profile" element={<KitchenOwnerProfile />} />
            <Route path="/change-password" element={<ChangePassword />} />
            {/* add kitchen */}
            <Route path="/kitchen/add" element={<AddKitchen />} />
            {/* all kitchen */}
            <Route path="/kitchen/all" element={<AllKitchen />} />
            {/* get one kitchen */}
            <Route path="/kitchen/:id" element={<Kitchen />} />
            <Route
              path="/kitchen/update/:kitchenId"
              element={<UpdateKitchen />}
            />
            {/* view all menu */}
            <Route path="/kitchen/menu/all" element={<ViewAllMenu />} />
            {/* kitchen Inventory */}
            <Route
              path="/kitchen/inventory/:id"
              element={<KitchenInventory />}
            />
            <Route path="/kitchen/inventory/add" element={<AddInventory />} />
            <Route
              path="/kitchen/inventory/add-item"
              element={<AddItemInventory />}
            />
            <Route
              path="/kitchen/inventory/update"
              element={<UpdateInventory />}
            />
            <Route
              path="/kitchen/sub-inventory/:id"
              element={<Sub_Inventory />}
            />
            <Route path="/kitchen/menu/:id" element={<KitchenMenu />} />
            <Route
              path="/kitchen/menu/update/:id"
              element={<UpdateMenuItem />}
            />
            kitchen/menu/
            <Route path="/kitchen/menu/add" element={<AddItemToMenu />} />
            {/*Employee management - Kitchen Owner  */}
            <Route path="/kitchen/employee/add" element={<AddEmployee />} />
            <Route path="/kitchen/employees/:id" element={<AllEmployee />} />
            <Route
              path="/kitchen/employee/update/:employeeId"
              element={<UpdateEmployee />}
            />
            {/* employee routes */}
            <Route path="/kitchen/employee/login" element={<EmployeeLogin />} />
            <Route path="/employee/shift-start" element={<StartShift />} />
            <Route path="/employee/shift-end" element={<EndShift />} />
            <Route path="/employee/shifts" element={<AllShifts />} />
            <Route
              path="/employee/inventory/lost"
              element={<LostInventory />}
            />
            <Route path="/employee/order" element={<KitchenOrders />} />
          </Route>
          {/* 404 not found page */}
          <Route path="*" element={<NotFound404 />} />
        </Routes>
        <ToastContainer style={{ marginTop: "50px" }} />
      </div>
    </Router>
  );
}

export default App;
