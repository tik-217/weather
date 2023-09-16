import { createAsyncThunk } from "@reduxjs/toolkit";
import { weatherDataCity } from "../api/weather-data";
import { IGetWeatherData } from "../types";

const getWeatherData = createAsyncThunk(
  "slice/weatherApi",
  async ({ cityName, units }: IGetWeatherData) => {
    const weatherData = await weatherDataCity(cityName, units);
    return weatherData;
  }
);

export default getWeatherData;
