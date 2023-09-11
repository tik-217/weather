import { IWeather } from "../types";
import initialState from "./initialState";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "slice",
  initialState,
  reducers: {
    setWeather(state, action: PayloadAction<IWeather>) {
      state.weather = action.payload;
    },
  },
});

export const { setWeather } = slice.actions;

export default slice.reducer;
