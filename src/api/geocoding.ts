// geocoding
// https://api.openweathermap.org/geo/1.0/direct?q=Anapa&limit=5&appid=6015fb54470c52be97c1f7231d204a5c

import axios from "axios";

export default async function geocoding(city: string) {
  return await axios(
    `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=6015fb54470c52be97c1f7231d204a5c`
  ).then(({ data }) => {
    return {
      lat: data[0].lat,
      lon: data[0].lon,
    };
  });
  // .catch(() => console.log("There is no such city"));
}
