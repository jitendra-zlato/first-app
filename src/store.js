import { combineReducers, createStore, applyMiddleware } from "redux";

import thunk from "redux-thunk";

// external import for development purpose
import { composeWithDevTools } from "redux-devtools-extension";

import {
  kitchenEmployeeAuthReducer,
  kitchenOwnerAuthReducer,
} from "./reducers/kitchen/auth";
import {
  kitchenOwnerChangePasswordReducer,
  kitchenOwnerForgotPasswordReducer,
  kitchenOwnerProfileReducer,
  kitchenOwnerProfileUpdateReducer,
  kitchenOwnerResetPasswordReducer,
  kitchenOwnerVerifyOtpReducer,
} from "./reducers/kitchen/owner-profile";
import {
  addKitchenReducer,
  deleteKitchenReducer,
  getAllKitchensReducer,
  getKitchenReducer,
  updateKitchenReducer,
} from "./reducers/kitchen/kitchen";

import {
  addEmployeeReducer,
  getAllEmployeeReducer,
  getEmployeeByIdReducer,
} from "./reducers/kitchen/employee";
import {
  addKitcheMenuItemReducer,
  addKitcheMenuReducer,
  deleteKitchenMenuItemReducer,
  getKitchenMenuReducer,
  updateKitchenMenuItemReducer,
} from "./reducers/kitchen/menu";
import { kitchenHamburgerReducer } from "./reducers/kitchen/hamburger";
import {
  employeeDeleteReducer,
  updateEmployeeReducer,
} from "./reducers/kitchen/employee-profile";
import {
  getKitchenIdReducer,
  setKitchenIdReducer,
} from "./reducers/kitchen/kitchenId";
import {
  employeeShiftEndReducer,
  employeeShifts,
  employeeShiftStartReducer,
} from "./reducers/kitchen/employee-shift";

import {
  getInventoryEmployeeReducer,
  getOrderEmployeeReducer,
  reportLostInventoryReducer,
  updateOrderStatusReducer,
} from "./reducers/kitchen/inventory_employee";
import {
  addItemToInventoryReducer,
  createInventoryReducer,
  getOwnerInventoryReducer,
  updateItemFromInventoryReducer,
} from "./reducers/kitchen/inventory_owner";
import {
  employeeLeaveDeleteReducer,
  employeeLeaveReducer,
  employeePermissionDeleteReducer,
  employeePermissionReducer,
  employeeWorkDeleteReducer,
  employeeWorkReducer,
} from "./reducers/kitchen/leave-work-permission";
import { uploadMenuImages } from "./reducers/kitchen/upload_image_menu";
import {
  addItemToSubInventory,
  getInventoriesReducer,
  getOneInventoryReducer,
} from "./reducers/kitchen/sub_inventory";

const reducer = combineReducers({
  // kitchen owner auth reducer
  kitchenOwnerAuth: kitchenOwnerAuthReducer,
  kitchenOwnerForPass: kitchenOwnerForgotPasswordReducer,
  kitchenOwnerVefiryOpt: kitchenOwnerVerifyOtpReducer,
  kitchenOwnerResetPass: kitchenOwnerResetPasswordReducer,
  kitchenOwnerChangePass: kitchenOwnerChangePasswordReducer,
  kitchenOwnerProfile: kitchenOwnerProfileReducer,
  kitchenOwnerProfileUpdate: kitchenOwnerProfileUpdateReducer,

  //kitchen reducer - kitchen owner
  addKitchen: addKitchenReducer,
  allKitchens: getAllKitchensReducer,
  kitchen: getKitchenReducer,
  updateKitchen: updateKitchenReducer,
  deleteKitchen: deleteKitchenReducer,
  addEmployee: addEmployeeReducer,
  getAllEmployee: getAllEmployeeReducer,

  kitchenHamburger: kitchenHamburgerReducer,
  
  //kitchen menu reducer - kitchen owner
  addMenu: addKitcheMenuReducer,
  addMenuItem: addKitcheMenuItemReducer,
  getKitchenMenu: getKitchenMenuReducer,
  updateMenuItem: updateKitchenMenuItemReducer,
  deleteMenuItem: deleteKitchenMenuItemReducer,

  uploadMenuImage: uploadMenuImages,

  //kitchen employee reducer - kitchen owner
  addKitchenEmployee: addEmployeeReducer,
  allEmployee: getAllEmployeeReducer,
  kitchenEmployee: getEmployeeByIdReducer,
  kitchenEmployeeProfile: updateEmployeeReducer,
  kEmployeeAuth: kitchenEmployeeAuthReducer,
  deleteEmployee: employeeDeleteReducer,
  employeeLeave: employeeLeaveReducer,
  deleteLeave: employeeLeaveDeleteReducer,
  employeeWork: employeeWorkReducer,
  deleteWork: employeeWorkDeleteReducer,
  employeePermission: employeePermissionReducer,
  deletePermission: employeePermissionDeleteReducer,

  //kitchen id reducer
  getKitchenId: getKitchenIdReducer,
  setKitchenId: setKitchenIdReducer,

  //employee shifts
  employeeShiftStart: employeeShiftStartReducer,
  employeeShiftEnd: employeeShiftEndReducer,
  employeeShifts: employeeShifts,

  //inventory - employee
  employeeInventory: getInventoryEmployeeReducer,
  reportInventory: reportLostInventoryReducer,
  getOrder: getOrderEmployeeReducer,
  updateOrder: updateOrderStatusReducer,

  //inventory - owner
  createInventory: createInventoryReducer,
  addItemInventory: addItemToInventoryReducer,
  inventory: getOwnerInventoryReducer,
  updateInventory: updateItemFromInventoryReducer,

  // sub inventories
  allSubInventory: getInventoriesReducer,
  subInventory: getOneInventoryReducer,
  addSubInventory: addItemToSubInventory,
});

const initialState = {};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
