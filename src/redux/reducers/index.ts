import { combineReducers } from "@reduxjs/toolkit";

import scheduleSlice from "./scheduleSlice";
import userSlice from "./userSlice";

const rootReducer = combineReducers({
  schedule: scheduleSlice,
  user: userSlice,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
