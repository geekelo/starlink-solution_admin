// src/redux/kitSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { createAxiosInstance } from "../../config/axios";

// Thunk to fetch kits
export const fetchKits = createAsyncThunk(
  "kits/fetchKits", 
  async ({ page = 1, per_page = 10, filters = {} } = {}, thunkAPI) => {
    console.log("[fetchKits] Thunk started with params:", { page, per_page, filters });
    try {
      const axiosInstance = createAxiosInstance();
      const response = await axiosInstance.get("/api/v1/admin/kit_records", {
        params: { 
          page, 
          per_page,
          filter: filters
        },
      });
      
      console.log("[fetchKits] API response:", response.data);

      // Backend returns { kits: [...], total_pages: X, total_count: Y }
      const { kits, total_pages, total_count } = response.data;

      const formattedKits = kits?.map((kit) => ({
        kitId: kit.id,
        kitNo: kit.kit_number,
        username: kit.owner_name,
        email: kit.owner_email,
        phoneNumber: kit.owner_phone_number,
        address: kit.address,
        companyName: kit.company_name || "N/A",
        nin: kit.nin,
        status: kit.status,
        plan: kit.plan,
        serviceNo: kit.service_line_number || "N/A",
        dateAdded: kit.created_at.split("T")[0],
        createdAt: kit.created_at,
      })) || [];

      // Create meta object for pagination
      const meta = {
        current_page: page,
        total_pages: total_pages,
        total_records: total_count,
        per_page: per_page
      };

      console.log("[fetchKits] Formatted kits:", formattedKits);
      console.log("[fetchKits] Meta:", meta);
      
      return { kits: formattedKits, meta };
    } catch (error) {
      console.error("[fetchKits] API error:", error);
      console.error("[fetchKits] Error details:", {
        message: error.message,
        status: error.response?.status,
        statusText: error.response?.statusText,
        data: error.response?.data,
        config: {
          url: error.config?.url,
          method: error.config?.method,
          baseURL: error.config?.baseURL,
          params: error.config?.params
        }
      });
      return thunkAPI.rejectWithValue(error.response?.data?.error || error.message || "Failed to fetch kits");
    }
  }
);

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
    meta: { 
      current_page: 1, 
      total_pages: 1, 
      total_records: 0, 
      per_page: 10 
    },
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
        state.kits = action.payload.kits;
        state.meta = action.payload.meta;
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