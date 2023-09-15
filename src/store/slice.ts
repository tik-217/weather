import { IWeather } from "../types";
import getWeatherData from "./asyncThunk";
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
  },
  extraReducers: (builder) => {
    builder.addCase(getWeatherData.pending, (state) => {
      state.searchCityErr = "";
      state.loadingWeather = true;
    });
    builder.addCase(getWeatherData.fulfilled, (state, action) => {
      state.searchCityErr = "";
      state.loadingWeather = false;
      state.weather = action.payload;
    });
    builder.addCase(getWeatherData.rejected, (state) => {
      state.searchCityErr = "Error accessing the API";
    });
  },
});

export const { setWeather, setCityName } = slice.actions;

export default slice.reducer;
