// axios
import axios from "axios";

// utils
import apiId from "../utils/openweather";

export default async function geocoding(city: string) {
  return await axios({
    method: "GET",
    url: "https://api.openweathermap.org/geo/1.0/direct",
    params: {
      q: city,
      limit: 5,
      appid: apiId,
    },
  }).then(({ data }) => {
    return {
      lat: data[0].lat,
      lon: data[0].lon,
    };
  });
}
