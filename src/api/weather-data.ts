// axios
import axios from "axios";

// api
import geocoding from "./geocoding";

// utils
import appid from "../utils/openweather";

export async function weatherDataCity(city: string, units: string = "metric") {
  const { lat, lon } = await geocoding(city);

  return await axios({
    method: "GET",
    url: `https://api.openweathermap.org/data/2.5/forecast`,
    params: {
      lat,
      lon,
      units,
      appid,
    },
  }).then(({ data }) => data);
}

export async function weatherDataLatLon(
  lat: number,
  lon: number,
  units: string = "metric"
) {
  return await axios({
    method: "GET",
    url: `https://api.openweathermap.org/data/2.5/forecast`,
    params: {
      lat,
      lon,
      units,
      appid,
    },
  }).then(({ data }) => data);
}
