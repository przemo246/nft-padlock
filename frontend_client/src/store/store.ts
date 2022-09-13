import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import signInBtnReducer from "../features/SignInBtn/SignInBtn.slice";

export const store = configureStore({
  reducer: {
    signInBtn: signInBtnReducer
  }
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
