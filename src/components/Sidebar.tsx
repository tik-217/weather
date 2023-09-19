// react
import { useEffect, useState } from "react";

// store
import { useAppDispatch, useAppSelector } from "../store/store";
import { setCityName, setIsSearch, setLoadingWeather } from "../store/slice";
import {
  sliceWeatherDataCity,
  sliceWeatherDataLatLon,
} from "../store/asyncThunk";

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
  const [inputValue, setInputValue] = useState("Moscow");
  const isSearch = useAppSelector((state) => state.isSearch);
  const weather = useAppSelector((state) => state.weather);
  const appMode = useAppSelector((state) => state.appMode);
  const dispatch = useAppDispatch();

  // hooks
  const responseStatus = useNotification();
  const weatherTime = useWeatherDate();

  async function searchCity(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.code === "Enter") {
      const searchValue = (e.nativeEvent.target as HTMLInputElement).value;

      if (searchValue.length !== 0) {
        dispatch(setLoadingWeather(false));
        await dispatch(sliceWeatherDataCity({ cityName: searchValue }));
      } else {
        dispatch(setIsSearch(!isSearch));
      }
    }
  }

  async function getPosition() {
    setInputValue("Current location");
    dispatch(setCityName(""));
    dispatch(setLoadingWeather(false));
    await dispatch(sliceWeatherDataLatLon("metric"));
  }

  useEffect(() => {
    dispatch(setLoadingWeather(false));
    (async () => {
      await dispatch(sliceWeatherDataCity({ cityName: inputValue }));
    })();
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <aside
        className={appMode === "dark" ? "sidebar sidebar__dark" : "sidebar"}
      >
        {responseStatus}
        <div className="sidebar_search">
          <div>
            <img src={magnifier} alt="magnifier" />
            <input
              type="text"
              placeholder={
                inputValue === "Current location"
                  ? "Current location"
                  : "Search city..."
              }
              value={inputValue === "Current location" ? "" : inputValue}
              onChange={(e) => setInputValue(e.target.value)}
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
                  <p>{inputValue}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </aside>
    </>
  );
}
