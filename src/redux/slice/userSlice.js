// src/redux/userSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { createAxiosInstance } from "../../config/axios";

// Thunk to fetch users
export const fetchUsers = createAsyncThunk(
  "users/fetchUsers",
  async ({ page = 1, per_page = 12, filters = {} } = {}, thunkAPI) => {
    console.log("[fetchUsers] Thunk started with params:", { page, per_page, filters });
    try {
      const axiosInstance = createAxiosInstance();
      
      // Only include filter parameters that have values
      const cleanFilters = {};
      Object.keys(filters).forEach(key => {
        if (filters[key] && filters[key].trim() !== '') {
          cleanFilters[key] = filters[key];
        }
      });

      const params = {
        page,
        per_page,
      };

      // Only add filter object if there are actual filters
      if (Object.keys(cleanFilters).length > 0) {
        params.filter = cleanFilters;
      }

      console.log("[fetchUsers] Clean params being sent:", params);

      const response = await axiosInstance.get("/api/v1/admin/user_records", {
        params: params,
      });

      console.log("[fetchUsers] API response:", response.data);

      // Backend returns { user_data: [...], total_pages: X, total_count: Y }
      const { user_data, total_pages, total_count } = response.data;

      const formattedUsers = user_data?.map((user) => ({
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone_number,
        whatsapp: user.whatsapp_number,
        walletID: user.wallet_id || "N/A",
        walletBalance: user.wallet_balance || 0,
        kitsOwned: user.kits_owned,
        emailConfirmed: user.email_confirmed,
        whatsappConfirmed: user.whatsapp_number_confirmed,
        createdAt: user.created_at,
        updatedAt: user.updated_at,
        dateAdded: user.created_at.split("T")[0],
      })) || [];

      // Create meta object for pagination
      const meta = {
        current_page: page,
        total_pages: total_pages,
        total_records: total_count,
        per_page: per_page
      };

      console.log("[fetchUsers] Formatted users:", formattedUsers);
      console.log("[fetchUsers] Meta:", meta);

      return { users: formattedUsers, meta };
    } catch (error) {
      console.error("[fetchUsers] API error:", error);
      console.error("[fetchUsers] Error details:", {
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
      return thunkAPI.rejectWithValue(error.response?.data?.error || error.message || "Failed to fetch users");
    }
  }
);

// Thunk to update user
export const updateUser = createAsyncThunk(
  "users/updateUser",
  async ({ userId, formData }, thunkAPI) => {
    console.log("[updateUser] Thunk started", { userId, formData });
    try {
      const axiosInstance = createAxiosInstance();
      await axiosInstance.patch(`/api/v1/admin/user_records/${userId}`, {
        starlink_user: formData,
      });

      toast.success("User updated successfully");
      return { userId, formData };
    } catch (error) {
      console.error("[updateUser] API error:", error);
      toast.error("Failed to update user");
      return thunkAPI.rejectWithValue("Failed to update user");
    }
  }
);

const userSlice = createSlice({
  name: "users",
  initialState: {
    users: [],
    meta: {
      current_page: 1,
      total_pages: 1,
      total_records: 0,
      per_page: 12
    },
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch Users
      .addCase(fetchUsers.pending, (state) => {
        console.log("[userSlice] fetchUsers.pending");
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        console.log("[userSlice] fetchUsers.fulfilled");
        state.users = action.payload.users;
        state.meta = action.payload.meta;
        state.loading = false;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        console.log("[userSlice] fetchUsers.rejected");
        state.loading = false;
        state.error = action.payload;
      })

      // Update User
      .addCase(updateUser.fulfilled, (state, action) => {
        console.log("[userSlice] updateUser.fulfilled");
        const { userId, formData } = action.payload;
        state.users = state.users.map((user) =>
          user.id === userId
            ? { ...user, ...formData }
            : user
        );
      });
  },
});

export default userSlice.reducer;
