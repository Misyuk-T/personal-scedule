import { createSlice } from "@reduxjs/toolkit";
import { User } from "../../types/user";

type UserSlice = {
  user: User | null;
};

const initialState: UserSlice = {
  user: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = null;
    },
  },
});

export const { login, logout } = userSlice.actions;

export default userSlice.reducer;
