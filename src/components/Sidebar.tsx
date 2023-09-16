// react
import { useEffect } from "react";

// store
import { useAppDispatch, useAppSelector } from "../store/store";
import { setCityName, setIsSearch, setWeather } from "../store/slice";
import getWeatherData from "../store/asyncThunk";

// api
import { weatherDataLatLon } from "../api/weather-data";

// services
import getCurrentPosition from "../services/getCurrentPosition";

// hooks
import useNotification from "../hooks/useNotification";
import useWeatherDate from "../hooks/useWeatherDate";

// style
import "../styles/Sidebar.css";

// image
import magnifier from "../assets/image/icons/icons8-magnifier.svg";
import geoposition from "../assets/image/icons/geoposition.svg";
import geophoto from "../assets/image/carlos-torres-MHNjEBeLTgw-unsplash.jpg";

export default function Sidebar() {
  // state
  const cityName = useAppSelector((state) => state.cityName);
  const weather = useAppSelector((state) => state.weather);
  const isSearch = useAppSelector((state) => state.isSearch);
  const dispatch = useAppDispatch();

  // hooks
  const responseStatus = useNotification();
  const weatherTime = useWeatherDate();

  function searchCity(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.code === "Enter") {
      const searchValue = (e.nativeEvent.target as HTMLInputElement).value;

      if (cityName.length !== 0) {
        dispatch(getWeatherData({ cityName: searchValue }));
      } else {
        dispatch(setIsSearch(!isSearch));
      }
    }
  }

  async function getPosition() {
    const { lat, lon } = await getCurrentPosition();

    dispatch(setWeather(await weatherDataLatLon(lat, lon)));
    dispatch(setCityName("Current location"));
  }

  useEffect(() => {
    dispatch(getWeatherData({ cityName }));
  }, []);

  return (
    <>
      <aside className="sidebar">
        {responseStatus}
        <div className="sidebar_search">
          <div>
            <img src={magnifier} alt="magnifier" />
            <input
              type="text"
              placeholder="Search city..."
              value={cityName}
              onChange={(e) => dispatch(setCityName(e.target.value))}
              onKeyDown={(e) => searchCity(e)}
            />
          </div>
          <img
            src={geoposition}
            alt="geoposition"
            onClick={() => getPosition()}
            onTouchEnd={() => getPosition()}
          />
        </div>
        <div className="sidebar_weather">
          {weather instanceof Object && (
            <div className="weatherInfo">
              <div className="weatherInfo_image">
                {weather.list[0].weather[0].icon && (
                  <img
                    src={`http://openweathermap.org/img/wn/${weather.list[0].weather[0].icon}@4x.png`}
                    alt=""
                  />
                )}
              </div>
              <section className="weatherInfo_desc">
                <h2>{Math.floor(weather.list[0].main.temp)}°</h2>
                <p>{weatherTime}</p>
                <hr />
                <div className="weatherInfo_desc__meta1">
                  <span>
                    {weather.list[0].weather[0].main} /{" "}
                    {weather.list[0].weather[0].description}
                  </span>
                </div>
              </section>
              <div className="weatherInfo_geoposition">
                <div>
                  <img src={geophoto} alt="" />
                  <p>{cityName}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </aside>
    </>
  );
}
