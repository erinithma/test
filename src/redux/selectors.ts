import { RootState } from "./store";

export const getPlaces = (state: RootState) => state.reducer.places;
export const getState = (state: RootState) => state.reducer.value;
export const getApiState = (state: RootState) => state.reducer.success;
