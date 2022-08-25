import { createSlice, current } from "@reduxjs/toolkit";
import { Schedule } from "types/schedule";

type ScheduleSlice = {
  schedules: Schedule[];
};

const initialState: ScheduleSlice = {
  schedules: [],
};

const scheduleSlice = createSlice({
  name: "schedule",
  initialState,
  reducers: {
    addSchedules(state, action) {
      state.schedules = [action.payload];
    },
    updateSchedules(state, action) {
      const filteredState = current(state).schedules.filter(
        (item) => item.id !== action.payload.id
      );
      state.schedules = [...filteredState, action.payload];
    },
    removeSchedule(state, action) {
      state.schedules = current(state).schedules.filter(
        (item) => item.id !== action.payload
      );
    },
  },
});

const { actions, reducer } = scheduleSlice;

export const { addSchedules, updateSchedules, removeSchedule } = actions;

export default reducer;
