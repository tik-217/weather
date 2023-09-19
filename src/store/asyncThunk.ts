// redux
import { createAsyncThunk } from "@reduxjs/toolkit";

// api
import { weatherDataCity, weatherDataLatLon } from "../api/weather-data";

// types
import { IGetWeatherData } from "../types";

const sliceWeatherDataCity = createAsyncThunk(
  "slice/weatherDataCity",
  async ({ cityName, units }: IGetWeatherData) => {
    return await weatherDataCity(cityName, units);
  }
);

const sliceWeatherDataLatLon = createAsyncThunk(
  "slice/weatherDataLatLon",
  async (units: string) => {
    return await weatherDataLatLon(units);
  }
);

export { sliceWeatherDataCity, sliceWeatherDataLatLon };
