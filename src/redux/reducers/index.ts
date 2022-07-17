import { combineReducers } from "@reduxjs/toolkit";

import scheduleReducer from "./schedule";

const rootReducer = combineReducers({
  schedule: scheduleReducer,
});

export default rootReducer;
