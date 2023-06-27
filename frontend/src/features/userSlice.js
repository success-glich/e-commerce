import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import instance from "../api/api_instance";

//login
export const login = createAsyncThunk(
  "user/login",
  async ({ email, password }) => {
    try {
      const config = { headers: { "Content-Type": "application/json" } };
      // const relativeURL = `${BASE_URL}/login`;

      const { data } = await instance({
        url: "auth/login",
        method: "POST",
        data: { email, password },
      });

      localStorage.setItem("token", data.token);
      // dispatch(setUser());
      return data;
    } catch (error) {
      // console.log(error.response.data.message);

      throw error.response.data.message;
    }
  }
);

//Register
export const register = createAsyncThunk("user/register", async (userData) => {
  try {
    // const userData = { name, email, password, avatar };
    console.log(userData);
    const config = { headers: { "Content-Type": "multipart/form-data" } };
    const { data } = await instance({
      url: "auth/register",
      method: "POST",
      data: userData,
      headers: config,
    });
    return data;
  } catch (err) {
    console.log(err);
    return err;
  }
});
export const loadUser = createAsyncThunk("user/loadUser", async () => {});
const initialState = {
  user: null,
  loading: false,
  error: null,
  tokens: {},
  isAuthenticated: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // other reducers...
    setUser: (state, action) => {
      // state.user = action.payload;
    },
    getUserData: (state) => {
      // const
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    clearError: (state, action) => {
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.user = action.payload.user;
        // Handle tokens if needed
        // const { accessToken } = action.payload.tokens;
        state.loading = false;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(register.pending, (state) => {
        state.loading = true;
      })
      .addCase(register.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.user = payload.user;
        state.isAuthenticated = true;
      })
      .addCase(register.rejected, (state, { error }) => {
        state.loading = false;
        state.error = error.message;
      });
  },
});

export const { setUser, setLoading, clearError } = userSlice.actions;

export default userSlice.reducer;

// 28535s
