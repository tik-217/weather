// store
import { createAsyncThunk } from "@reduxjs/toolkit";

// api
import { weatherDataCity } from "../api/weather-data";

// types
import { IGetWeatherData } from "../types";

export default createAsyncThunk(
  "slice/weatherApi",
  async ({ cityName, units }: IGetWeatherData) => {
    return await weatherDataCity(cityName, units);
  }
);
