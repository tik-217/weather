// react
import { useEffect, useState } from "react";

// store
import { useAppDispatch, useAppSelector } from "../store/store";
import getWeatherData from "../store/asyncThunk";

// services
import getCurrentPosition from "../services/getCurrentPosition";
import { getDate, getDayOfTheWeek, getTime } from "../services/getTimeFormat";

// style
import "../styles/Weather.css";

// image
import wind from "../assets/image/icons/weather-wind-flow-6.svg";
import arrowTop from "../assets/image/icons/arrow-button-circle-up-1.svg";
import arrowDown from "../assets/image/icons/arrow-button-circle-down-1.svg";

export default function Weather() {
  // state
  const [changeMetric, setChangeMetric] = useState(true);
  const cityName = useAppSelector((state) => state.cityName);
  const weather = useAppSelector((state) => state.weather);
  const dispatch = useAppDispatch();

  useEffect(() => {
    (async () => {
      if (cityName === "Current location") {
        await getCurrentPosition();
      }

      if (changeMetric) {
        dispatch(getWeatherData({ cityName, units: "metric" }));
      } else {
        dispatch(getWeatherData({ cityName, units: "imperial" }));
      }
    })();
    // eslint-disable-next-line
  }, [changeMetric]);

  return (
    <div className="weather">
      <div className="weather_head">
        <h3>Weather data</h3>
        <div className="weather_head__tmpSwitcher">
          <span
            className={changeMetric ? "weather_head__active" : ""}
            onClick={() => setChangeMetric(true)}
          >
            °C
          </span>
          <span
            className={!changeMetric ? "weather_head__active" : ""}
            onClick={() => setChangeMetric(false)}
          >
            °F
          </span>
        </div>
      </div>
      <div className="weather_main">
        <div className="weather5days">
          {weather.list.map((el) => {
            return (
              <div key={el.dt}>
                <h5>{getDayOfTheWeek(el.dt)}</h5>
                <p>{getDate(el.dt)}</p>
                {el.weather[0].icon && (
                  <img
                    src={`http://openweathermap.org/img/wn/${el.weather[0].icon}@2x.png`}
                    alt=""
                  />
                )}
                <section>
                  <span>{Math.floor(el.main.temp_max)}°</span>
                  <span>{Math.floor(el.main.temp_min)}°</span>
                </section>
              </div>
            );
          })}
        </div>
        <div className="weatherMetoToday">
          <div className="weatherMetoToday_wind">
            <h4>Wind Status</h4>
            <p>{weather.list[0].wind.speed} m/s</p>
            <img src={wind} alt="wind" />
          </div>
          <div className="weatherMetoToday_sun">
            <h4>Sunrise & Sunset</h4>
            <section>
              <img src={arrowTop} alt="arrowTop" />
              <span>{getTime(weather.city.sunrise)}</span>
            </section>
            <section>
              <img src={arrowDown} alt="arrowDown" />
              <span>{getTime(weather.city.sunset)}</span>
            </section>
          </div>
          <div className="weatherMetoToday_humidity">
            <h4>Humidity</h4>
            <p>{weather.list[0].main.humidity} %</p>
            <div></div>
          </div>
          <div className="weatherMetoToday_visibility">
            <h4>Visibility</h4>
            <p>{weather.list[0].visibility / 1000} km</p>
            <div></div>
          </div>
        </div>
      </div>
    </div>
  );
}
