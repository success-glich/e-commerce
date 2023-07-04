import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import instance from "../../api/api_instance";
import cookie, { load } from "react-cookies";
import getUserDetailsFromToken from "../../helpers/jwt";
import { isEmpty } from "loadsh";
//login
export const login = createAsyncThunk(
  "user/login",
  async ({ email, password }) => {
    try {
      const { data } = await instance({
        url: "auth/login",
        method: "POST",
        data: { email, password },
      });
      localStorage.setItem("token", data.token);
      // cookie.save("token", data.token);
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
    return err.response.data.message;
  }
});
export const loadUser = createAsyncThunk("user/loadUser", async () => {
  try {
    const { data } = await instance({
      url: "auth/me",
      method: "get",
    });
    console.log(data.response);
    return data;
  } catch (err) {
    throw err.message;
  }
});

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
    getUserData: (state) => {
      const token = load("token");
      const userData = getUserDetailsFromToken(token);
      // const isAuthenticated = !isEmpty;
      state.tokens = {
        accessToken: token,
      };
      state.isUserLoggedIn = !isEmpty(userData);
      state.userData = userData;
    },
    logoutUser: (state) => {
      // const
      cookie.remove("token", { path: "/" });
      state.tokens = {};
      state.isAuthenticated = false;
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
      })
      .addCase(loadUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(loadUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload?.user;
      })
      .addCase(loadUser.rejected, (state) => {
        state.loading = false;
        state.user = null;
        state.isAuthenticated = false;
      });
  },
});

export const { setUser, setLoading, clearError } = userSlice.actions;

export default userSlice.reducer;

// 28535s
