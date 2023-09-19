// axios
import axios from "axios";

// utils
import appid from "../utils/openweather";

// services
import getCurrentPosition from "../services/getCurrentPosition";

export async function weatherDataCity(city: string, units: string = "metric") {
  return await axios({
    method: "GET",
    url: `https://api.openweathermap.org/data/2.5/forecast`,
    params: {
      q: city,
      units,
      appid,
    },
  }).then(({ data }) => data);
}

export async function weatherDataLatLon(units = "metric") {
  const { lat, lon } = await getCurrentPosition();

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
