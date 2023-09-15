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
    setCityName(state, action: PayloadAction<string>) {
      state.cityName = action.payload;
    },
    setNoSuchCity(state, action: PayloadAction<string>) {
      state.noSuchCity = action.payload;
    },
  },
});

export const { setWeather, setCityName, setNoSuchCity } = slice.actions;

export default slice.reducer;
