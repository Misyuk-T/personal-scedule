import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux";
import {
  configureStore,
  Action,
  ThunkAction,
  ThunkDispatch,
} from "@reduxjs/toolkit";
import rootReducer from "./reducers";

const store = configureStore({
  reducer: rootReducer,
});

export type AppDispatch = typeof store.dispatch;
export type ReduxState = ReturnType<typeof rootReducer>;
export type TypedDispatch = ThunkDispatch<ReduxState, any, Action>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  ReduxState,
  null,
  Action
>;
export const useTypedDispatch = () => useDispatch<TypedDispatch>();
export const useTypedSelector: TypedUseSelectorHook<ReduxState> = useSelector;

export default store;
