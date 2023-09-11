// weather api
// https://api.openweathermap.org/data/2.5/forecast?lat=44.894272&lon=37.316887&appid=6015fb54470c52be97c1f7231d204a5c

import axios from "axios";
import geocoding from "./geocoding";
import appid from "../utils/openweather";

export default async function weatherData(
  city: string,
  units: string = "metric"
) {
  const { lat, lon } = await geocoding(city);

  const { data } = await axios({
    method: "GET",
    url: `https://api.openweathermap.org/data/2.5/forecast`,
    params: {
      lat,
      lon,
      appid,
      units,
    },
  });
  return data;
}
