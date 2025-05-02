import { configureStore } from "@reduxjs/toolkit";
import kitRenewalReducer from "../slice/renewalSlice";

export const store = configureStore({
  reducer: {
    kitRenewals: kitRenewalReducer,
  },
});
