// src/redux/slices/kitRenewalSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { createAxiosInstance } from "../../config/axios";

export const fetchKitRenewals = createAsyncThunk(
  "kitRenewals/fetchKitRenewals",
  async (_, { rejectWithValue }) => {
    try {
      const axiosInstance = createAxiosInstance();
      const response = await axiosInstance.get("/api/v1/admin/kit_renewals");
      return response.data || [];
    } catch (error) {
      return rejectWithValue("Failed to fetch renewal records.");
    }
  }
);

const kitRenewalSlice = createSlice({
  name: "kitRenewals",
  initialState: {
    data: [],
    loading: false,
    error: "",
  },
  reducers: {
    clearRenewals(state) {
      state.data = [];
      state.error = "";
    },
   
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchKitRenewals.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(fetchKitRenewals.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchKitRenewals.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearRenewals, filterRenewals } = kitRenewalSlice.actions;
export default kitRenewalSlice.reducer;
