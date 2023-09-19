// store
import { useAppDispatch, useAppSelector } from "../store/store";
import {
  sliceWeatherDataCity,
  sliceWeatherDataLatLon,
} from "../store/asyncThunk";
import {
  setIsAppMode,
  setIsSearch,
  setLoadingWeather,
  setChangeMetric,
} from "../store/slice";

// services
import { getWeatherTime, getDayOfTheWeek } from "../services/getTimeFormat";

// antd
import { Switch } from "antd";

// style
import "../styles/Weather.css";

// image
import wind from "../assets/image/icons/weather-wind-flow-6.svg";
import arrowTop from "../assets/image/icons/arrow-button-circle-up-1.svg";
import arrowDown from "../assets/image/icons/arrow-button-circle-down-1.svg";

export default function Weather() {
  // state
  const changeMetric = useAppSelector((state) => state.changeMetric);
  const weather = useAppSelector((state) => state.weather);
  const cityName = useAppSelector((state) => state.cityName);
  const appMode = useAppSelector((state) => state.appMode);
  const isAppMode = useAppSelector((state) => state.isAppMode);
  const dispatch = useAppDispatch();

  async function changeMetricHandler(payload: boolean) {
    async function chooseApiCall(units: string) {
      if (cityName.length === 0) {
        dispatch(setLoadingWeather(false));
        await dispatch(sliceWeatherDataLatLon(units));
      } else {
        dispatch(setLoadingWeather(false));
        await dispatch(sliceWeatherDataCity({ cityName, units }));
      }
    }

    if (payload) {
      dispatch(setChangeMetric(true));
      dispatch(setIsSearch(true));
      chooseApiCall("metric");
    } else {
      dispatch(setChangeMetric(false));
      dispatch(setIsSearch(true));
      chooseApiCall("imperial");
    }
  }

  return (
    <div className="weather">
      <div className="weather_head">
        <h3>Weather data</h3>
        <div className="weather_head__switcherAppMode">
          <Switch
            checked={isAppMode}
            checkedChildren="light"
            unCheckedChildren="dark"
            onChange={() => {
              dispatch(setIsAppMode(!isAppMode));
            }}
          />
        </div>
        <div className="weather_head__tmpSwitcher">
          <span
            className={changeMetric ? "weather_head__active" : ""}
            onClick={() => changeMetricHandler(true)}
          >
            °C
          </span>
          <span
            className={!changeMetric ? "weather_head__active" : ""}
            onClick={() => changeMetricHandler(false)}
          >
            °F
          </span>
        </div>
      </div>
      <div className="weather_main">
        <div
          className={
            appMode === "dark"
              ? "weather5days weather5days__dark"
              : "weather5days"
          }
        >
          {weather.list.map((el) => {
            return (
              <div key={el.dt}>
                <h5>{getDayOfTheWeek(el.dt)}</h5>
                <p>{getWeatherTime(el.dt)}</p>
                {el.weather[0].icon && (
                  <img
                    src={`http://openweathermap.org/img/wn/${el.weather[0].icon}@2x.png`}
                    alt=""
                  />
                )}
                <span>{Math.floor(el.main.temp_max)}°</span>
              </div>
            );
          })}
        </div>
        <div
          className={
            appMode === "dark"
              ? "weatherMetoToday weatherMetoToday__dark"
              : "weatherMetoToday"
          }
        >
          <div className="weatherMetoToday_wind">
            <h4>Wind Status</h4>
            <p>{weather.list[0].wind.speed} m/s</p>
            <img src={wind} alt="wind" />
          </div>
          <div className="weatherMetoToday_sun">
            <h4>Sunrise & Sunset</h4>
            <section>
              <img src={arrowTop} alt="arrowTop" />
              <span>{getWeatherTime(weather.city.sunrise)}</span>
            </section>
            <section>
              <img src={arrowDown} alt="arrowDown" />
              <span>{getWeatherTime(weather.city.sunset)}</span>
            </section>
          </div>
          <div className="weatherMetoToday_pressure">
            <h4>Pressure</h4>
            <p>{weather.list[0].main.pressure} mm Hg</p>
            <div></div>
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
