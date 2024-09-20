import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Request } from "../common/request";
import { URL_JOBS } from "../common/const";

export interface State {
  value: Record<string, string>;
  places: string[];
  success: boolean;
}
const initialState: State = {
  value: {
    gender: "m",
    count: "200",
    period: "10",
  },
  places: [],
  success: true,
};

export const fetchPlaces = createAsyncThunk("api/fetchPlaces", async () => {
  try {
    const places = await Request.get(URL_JOBS);
    return {
      places,
      success: true,
    };
  } catch {
    return {
      places: [],
      success: false,
    };
  }
});

const slice = createSlice({
  name: "state",
  initialState,
  reducers: {
    set: (state, action: PayloadAction<Record<string, string>>) => {
      state.value = { ...state.value, ...action.payload };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPlaces.fulfilled, (state, action) => {
      state.places = action.payload.places;
      state.success = action.payload.success;
    });
    builder.addCase(fetchPlaces.rejected, (state) => {
      state.places = [];
      state.success = false;
    });
  },
});

export const { set } = slice.actions;

export const reducer = slice.reducer;
