// redux
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

// store
import getWeatherData from "./asyncThunk";
import initialState from "./initialState";

// types
import { IWeather } from "../types";

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
    setIsSearch(state, action: PayloadAction<boolean>) {
      state.isSearch = action.payload;
    },
    setAppMode(state, action: PayloadAction<string>) {
      state.appMode = action.payload;
    },
    setIsAppMode(state, action: PayloadAction<boolean>) {
      state.isAppMode = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getWeatherData.pending, (state) => {
      state.searchCityErr = null;
      state.loadingWeather = true;
    });
    builder.addCase(getWeatherData.fulfilled, (state, action) => {
      state.loadingWeather = false;
      state.weather = action.payload;
    });
    builder.addCase(getWeatherData.rejected, (state) => {
      state.loadingWeather = false;
      state.searchCityErr = "Error accessing the API";
    });
  },
});

export const {
  setWeather,
  setCityName,
  setIsSearch,
  setAppMode,
  setIsAppMode,
} = slice.actions;

export default slice.reducer;
