import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store/store";

export interface SingInBtnState {
  address: string | null;
}

const initialState: SingInBtnState = {
  address: null
};

export const signInBtnSlice = createSlice({
  name: "singInBtn",
  initialState,
  reducers: {
    setAddress: (state, action: PayloadAction<string>) => {
      state.address = action.payload;
    }
  }
});

export const { setAddress } = signInBtnSlice.actions;

export const selectAddress = (state: RootState) => state.signInBtn.address;

export default signInBtnSlice.reducer;
