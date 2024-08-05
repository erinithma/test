import { configureStore } from "@reduxjs/toolkit";
import { reducer } from "./slices";

export const store = configureStore({
  reducer: {
    reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const selectState = (state: RootState) => state.reducer.value;
