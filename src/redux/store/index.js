import { configureStore } from "@reduxjs/toolkit";
import kitRenewalReducer from "../slice/renewalSlice";
import kitReducer from "../slice/kitSlice";
import userReducer from "../slice/userSlice";

export const store = configureStore({
  reducer: {
    kitRenewals: kitRenewalReducer,
    kits: kitReducer,
    users: userReducer,
  },
});
