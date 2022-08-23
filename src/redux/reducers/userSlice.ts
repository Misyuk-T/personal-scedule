import { createSlice } from "@reduxjs/toolkit";
import { User } from "../../types/user";

type UserSlice = {
  user: User;
  isLoading: boolean;
  isAuthObserve: boolean;
  isAuthorized: boolean;
};

const initialState: UserSlice = {
  user: {} as User,
  isLoading: false,
  isAuthObserve: false,
  isAuthorized: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
      state.isAuthorized = true;
      state.isAuthObserve = false;
    },
    logout: (state) => {
      state.user = {} as User;
      state.isAuthorized = false;
    },
    updateUserInformation: (state, action) => {
      state.user = { ...state.user, ...action.payload };
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setAuthObserve: (state, action) => {
      state.isAuthObserve = action.payload;
    },
  },
});

export const {
  login,
  logout,
  updateUserInformation,
  setLoading,
  setAuthObserve,
} = userSlice.actions;

export default userSlice.reducer;
