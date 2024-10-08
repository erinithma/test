import { configureStore } from "@reduxjs/toolkit";
import { reducer } from "./slices";

export const store = configureStore({
  reducer: {
    reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
