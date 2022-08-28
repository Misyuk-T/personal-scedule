import { createSlice, current } from "@reduxjs/toolkit";
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
    updateUserSchedules: (state, action) => {
      const schedules = state.user.schedules || [];

      state.user.schedules = [...schedules, action.payload];
    },
    removeUserSchedule: (state, action) => {
      state.user.schedules = current(state).user.schedules.filter(
        (item) => item !== action.payload
      );
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
  updateUserSchedules,
} = userSlice.actions;

export default userSlice.reducer;
