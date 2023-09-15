// weather api
// https://api.openweathermap.org/data/2.5/forecast?lat=44.894272&lon=37.316887&appid=6015fb54470c52be97c1f7231d204a5c

// Проверка на пустой ipnup города
// Проверка на существование города в API

import axios from "axios";
import geocoding from "./geocoding";
import appid from "../utils/openweather";
// import { IWeather } from "../types";
import initialState from "../store/initialState";

export async function weatherDataCity(city: string, units: string = "metric") {
  const { lat, lon } = await geocoding(city);
  let out = initialState.weather;

  await axios({
    method: "GET",
    url: `https://api.openweathermap.org/data/2.5/forecast`,
    params: {
      lat,
      lon,
      units,
      appid,
    },
  }).then(({ data }) => (out = data));

  return out;
}

export async function weatherDataLatLon(
  lat: number,
  lon: number,
  units: string = "metric"
) {
  const { data } = await axios({
    method: "GET",
    url: `https://api.openweathermap.org/data/2.5/forecast`,
    params: {
      lat,
      lon,
      units,
      appid,
    },
  });
  return data;
}
