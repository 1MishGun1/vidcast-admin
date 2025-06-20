import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { IUser, IUserState, ILoginUser } from "../../models/user";
import axios from "../../api/config";
import { RootState } from "../../store";

export const fetchUserData = createAsyncThunk<IUser, ILoginUser>(
  "auth/fetchUserData",
  async (params) => {
    const { data } = await axios.post("/login", params);
    return data;
  }
);

export const fetchAuthMe = createAsyncThunk<IUser>(
  "auth/fetchAuthMe",
  async () => {
    const { data } = await axios.get("/me");
    return data;
  }
);

export const getAllUsers = createAsyncThunk<IUser[]>(
  "auth/getAllUsers",
  async () => {
    const { data } = await axios.get("/users");
    return data;
  }
);

export const getUserById = createAsyncThunk<IUser, string>(
  "auth/getUserById",
  async (userId) => {
    const { data } = await axios.get(`/users/${userId}`);
    return data;
  }
);

export const blockUserTemporarily = createAsyncThunk(
  "users/blockTemporarily",
  async (
    {
      userId,
      reason,
      expiresAt,
    }: { userId: string; reason: string; expiresAt: string },
    thunkAPI
  ) => {
    try {
      const token = localStorage.getItem("token");
      await axios.patch(
        `/admin/block/${userId}`,
        { reason, expiresAt },
        { headers: { Authorization: `Bearer ${token}` } }
      );
    } catch (err) {
      return thunkAPI.rejectWithValue("Ошибка при временной блокировке");
    }
  }
);

export const blockUserPermanently = createAsyncThunk(
  "users/blockPermanently",
  async ({ userId, reason }: { userId: string; reason: string }, thunkAPI) => {
    try {
      const token = localStorage.getItem("token");
      await axios.patch(
        `/admin/block-permanent/${userId}`,
        { reason },
        { headers: { Authorization: `Bearer ${token}` } }
      );
    } catch (err) {
      return thunkAPI.rejectWithValue("Ошибка при перманентной блокировке");
    }
  }
);

const initialState: IUserState = {
  allUsers: [],
  currentUser: null,
  selectedUser: null,
  loading: false,
  error: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.currentUser = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Authorization user
      .addCase(fetchUserData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchUserData.fulfilled,
        (state, action: PayloadAction<IUser>) => {
          state.loading = false;
          state.currentUser = action.payload;
        }
      )
      .addCase(fetchUserData.rejected, (state) => {
        state.loading = false;
        state.error = "Error login user";
      })

      // Get auth user
      .addCase(fetchAuthMe.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAuthMe.fulfilled, (state, action: PayloadAction<IUser>) => {
        state.loading = false;
        state.currentUser = action.payload;
      })
      .addCase(fetchAuthMe.rejected, (state) => {
        state.loading = false;
        state.error = "Error login user";
      })

      // Get all user
      .addCase(getAllUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        getAllUsers.fulfilled,
        (state, action: PayloadAction<IUser[]>) => {
          state.loading = false;
          state.allUsers = action.payload;
        }
      )
      .addCase(getAllUsers.rejected, (state) => {
        state.loading = false;
        state.error = "Error getting user";
      })

      // Get user by id
      .addCase(getUserById.pending, (state) => {
        state.loading = true;
        state.selectedUser = null;
        state.error = null;
      })
      .addCase(getUserById.fulfilled, (state, action: PayloadAction<IUser>) => {
        state.loading = false;
        state.selectedUser = action.payload;
      })
      .addCase(getUserById.rejected, (state) => {
        state.loading = false;
        state.error = "Error getting user";
      })

      // Ban user
      .addCase(blockUserTemporarily.pending, (state) => {
        state.loading = true;
      })
      .addCase(blockUserTemporarily.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(blockUserTemporarily.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(blockUserPermanently.pending, (state) => {
        state.loading = true;
      })
      .addCase(blockUserPermanently.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(blockUserPermanently.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const selectIsAuth = (state: RootState) =>
  Boolean(state.auth.currentUser);
export const selectCurrentUser = (state: RootState) => state.auth.currentUser;
export const electSelectedUser = (state: RootState) => state.auth.selectedUser;
export const selectAllUsers = (state: RootState) => state.auth.allUsers;

export const { logout } = authSlice.actions;

export const authReducer = authSlice.reducer;
