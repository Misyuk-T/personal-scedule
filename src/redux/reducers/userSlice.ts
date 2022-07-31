import { createSlice } from "@reduxjs/toolkit";
import { User } from "../../types/user";

type UserSlice = {
  user: User;
  isAuthorized: boolean;
};

const initialState: UserSlice = {
  user: {} as User,
  isAuthorized: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
      state.isAuthorized = true;
    },
    logout: (state) => {
      state.user = {} as User;
      state.isAuthorized = false;
    },
    updateUserInformation: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { login, logout, updateUserInformation } = userSlice.actions;

export default userSlice.reducer;
