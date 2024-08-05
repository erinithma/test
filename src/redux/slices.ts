import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface State {
  value: Record<string, string>;
}
const initialState: State = {
  value: {
    gender: "m",
    count: "200",
    period: "10",
  },
};

const slice = createSlice({
  name: "state",
  initialState,
  reducers: {
    set: (state, action: PayloadAction<Record<string, string>>) => {
      state.value = { ...state.value, ...action.payload };
    },
  },
});

export const { set } = slice.actions;

export const reducer = slice.reducer;
