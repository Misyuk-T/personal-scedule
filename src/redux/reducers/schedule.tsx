import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    sleepInfo: null,
    weightInfo: null,
    alcoholInfo: null,
    sportInfo: null,
    moodInfo: null,
};

const scheduleSlice = createSlice({
    name: "schedule",
    initialState,
    reducers: {
        addSleepInfo(state, action) {
            state.sleepInfo = action.payload;
        },
        addWeightInfo(state, action) {
            state.weightInfo = action.payload;
        },
        addAlcoholInfo(state, action) {
            state.alcoholInfo = action.payload;
        },
        addSportInfo(state, action) {
            state.sportInfo = action.payload;
        },
        addMoodInfo(state, action) {
            state.moodInfo = action.payload;
        },
    },
});

const { actions, reducer } = scheduleSlice;

export const {
    addSleepInfo,
    addWeightInfo,
    addAlcoholInfo,
    addSportInfo,
    addMoodInfo,
} = actions;

export default reducer;
