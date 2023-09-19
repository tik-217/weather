// redux
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

// store
import { sliceWeatherDataCity, sliceWeatherDataLatLon } from "./asyncThunk";
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
    setLoadingWeather(state, action: PayloadAction<boolean>) {
      state.loadingWeather = action.payload;
    },
    setChangeMetric(state, action: PayloadAction<boolean>) {
      state.changeMetric = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(sliceWeatherDataCity.pending, (state) => {
      state.searchCityErr = null;
    });
    builder.addCase(sliceWeatherDataCity.fulfilled, (state, action) => {
      state.weather = action.payload;
      state.loadingWeather = true;
    });
    builder.addCase(sliceWeatherDataCity.rejected, (state) => {
      state.searchCityErr = "Error accessing the API";
      state.loadingWeather = true;
    });
    builder.addCase(sliceWeatherDataLatLon.pending, (state) => {
      state.searchCityErr = null;
    });
    builder.addCase(sliceWeatherDataLatLon.fulfilled, (state, action) => {
      state.weather = action.payload;
      state.loadingWeather = true;
    });
    builder.addCase(sliceWeatherDataLatLon.rejected, (state) => {
      state.searchCityErr = "Error accessing the API";
      state.loadingWeather = true;
    });
  },
});

export const {
  setWeather,
  setCityName,
  setIsSearch,
  setAppMode,
  setIsAppMode,
  setLoadingWeather,
  setChangeMetric,
} = slice.actions;

export default slice.reducer;
