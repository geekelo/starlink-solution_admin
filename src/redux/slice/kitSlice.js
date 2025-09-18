// src/redux/kitSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { createAxiosInstance } from "../../config/axios";

// Thunk to fetch kits

export const fetchKits = createAsyncThunk(
  "kits/fetchKits",
  async ({ page = 1, per_page = 10 }, thunkAPI) => {
    try {
      const axiosInstance = createAxiosInstance();
      const response = await axiosInstance.get("/api/v1/admin/kit_records", {
        params: { page, per_page },
      });


      const { data, meta } = response;


      const formattedKits = data?.map((kit) => ({
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
      }));

      return { kits: formattedKits, meta };
    } catch (error) {
      console.error("[fetchKits] API error:", error);
      return thunkAPI.rejectWithValue("Failed to fetch kits");
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
    meta: { current_page: 1, total_pages: 1, total_records: 0 },
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchKits.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchKits.fulfilled, (state, action) => {
        state.loading = false;
        state.kits = action.payload.kits;
        state.meta = action.payload.meta; 
      })
      .addCase(fetchKits.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});


export default kitSlice.reducer;