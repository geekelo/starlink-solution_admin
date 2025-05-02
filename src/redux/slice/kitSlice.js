// src/redux/kitSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { createAxiosInstance } from "../../config/axios";

// Thunk to fetch kits
export const fetchKits = createAsyncThunk("kits/fetchKits", async (_, thunkAPI) => {
  console.log("[fetchKits] Thunk started");
  try {
    const axiosInstance = createAxiosInstance();
    const response = await axiosInstance.get("/api/v1/admin/kit_records");
    console.log("[fetchKits] API response:", response);

    const formattedKits = response.data
      .map((kit) => ({
        kitId: kit.id,
        kitNo: kit.kit_number,
        username: kit.owner_name,
        email: kit.owner_email,
        phoneNumber: kit.owner_phone_number,
        address: kit.address,
        companyName: kit.company_name || "N/A",
        nin: kit.nin,
        status: kit.status,
        plan: "N/A",
        serviceNo: kit.service_line_number || "N/A",
        dateAdded: kit.created_at.split("T")[0],
    createdAt: kit.created_at,   
      }))
      .sort((a, b) => b.createdAt - a.createdAt);

    console.log("[fetchKits] Formatted kits:", formattedKits);
    return formattedKits;
  } catch (error) {
    console.error("[fetchKits] API error:", error);
    return thunkAPI.rejectWithValue("Failed to fetch kits");
  }
});

// Thunk to update kit
export const updateKit = createAsyncThunk("kits/updateKit", async ({ kitId, formData }, thunkAPI) => {
  console.log("[updateKit] Thunk started", { kitId, formData });
  try {
    const axiosInstance = createAxiosInstance();
    await axiosInstance.patch(`/api/v1/admin/kit_records/${kitId}`, {
      starlink_kit: formData,
    });

    toast.success("Kit updated successfully");
    return { kitId, formData };
  } catch (error) {
    console.error("[updateKit] API error:", error);
    toast.error("Failed to update kit");
    return thunkAPI.rejectWithValue("Failed to update kit");
  }
});

// Thunk to renew kit
export const renewKit = createAsyncThunk("kits/renewKit", async (kitId, thunkAPI) => {
  console.log("[renewKit] Thunk started", kitId);
  try {
    const axiosInstance = createAxiosInstance();
    const response = await axiosInstance.post("/api/v1/admin/kit_autorenews/renew_specific_kit", {
      id: kitId,
    });

    console.log("[renewKit] API response:", response);
    toast.success(`Kit ${kitId} renewed successfully`);
    return kitId;
  } catch (error) {
    console.error("[renewKit] API error:", error);
    toast.error("Failed to renew kit");
    return thunkAPI.rejectWithValue("Failed to renew kit");
  }
});

// Thunk to transfer kit
export const transferKit = createAsyncThunk("kits/transferKit", async ({ kitNo, newEmail }, thunkAPI) => {
  console.log("[transferKit] Thunk started", { kitNo, newEmail });
  try {
    const axiosInstance = createAxiosInstance();
    const response = await axiosInstance.post("/api/v1/admin/kit_transfers/transfer", {
      kit_number: kitNo,
      new_owner_email: newEmail,
    });

    console.log("[transferKit] API response:", response);
    toast.success(`Kit ${kitNo} transferred successfully`);
    return { kitNo, newEmail };
  } catch (error) {
    console.error("[transferKit] API error:", error);
    toast.error("Failed to transfer kit");
    return thunkAPI.rejectWithValue("Failed to transfer kit");
  }
});

const kitSlice = createSlice({
  name: "kits",
  initialState: {
    kits: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch Kits
      .addCase(fetchKits.pending, (state) => {
        console.log("[kitSlice] fetchKits.pending");
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchKits.fulfilled, (state, action) => {
        console.log("[kitSlice] fetchKits.fulfilled");
        state.kits = action.payload;
        state.loading = false;
      })
      .addCase(fetchKits.rejected, (state, action) => {
        console.log("[kitSlice] fetchKits.rejected");
        state.loading = false;
        state.error = action.payload;
      })

      // Update Kit
      .addCase(updateKit.fulfilled, (state, action) => {
        console.log("[kitSlice] updateKit.fulfilled");
        const { kitId, formData } = action.payload;
        state.kits = state.kits.map((kit) =>
          kit.kitId === kitId
            ? {
                ...kit,
                ...formData,
                status: formData.status.charAt(0).toUpperCase() + formData.status.slice(1),
              }
            : kit
        );
      })

      // Renew Kit
      .addCase(renewKit.fulfilled, (state, action) => {
        console.log("[kitSlice] renewKit.fulfilled", action.payload);
      })

      // Transfer Kit
      .addCase(transferKit.fulfilled, (state, action) => {
        console.log("[kitSlice] transferKit.fulfilled");
        const { kitNo, newEmail } = action.payload;
        state.kits = state.kits.map((kit) =>
          kit.kitNo === kitNo ? { ...kit, email: newEmail } : kit
        );
      });
  },
});

export default kitSlice.reducer;