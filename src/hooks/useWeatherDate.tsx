// react
import { useEffect, useState } from "react";

export default function useWeatherDate() {
  const [currDate, setCurrDate] = useState(new Date());
  const [weatherInfoDate, setWeatherInfoDate] = useState("");

  useEffect(() => {
    const timer = window.setInterval(function () {
      setCurrDate(new Date());
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  useEffect(() => {
    const day = new Intl.DateTimeFormat("en-US", { weekday: "long" }).format(
      currDate
    );

    const formatedDate = `${day}, ${currDate.toLocaleTimeString().slice(0, 5)}`;

    setWeatherInfoDate(formatedDate);
  }, [currDate]);

  return weatherInfoDate;
}
