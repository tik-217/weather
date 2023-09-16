// react
import { useEffect, useState } from "react";

// store
import { useAppDispatch, useAppSelector } from "../store/store";
import { setCityName, setWeather } from "../store/slice";
import getWeatherData from "../store/asyncThunk";

// style
import "../styles/Sidebar.css";

// image
import magnifier from "../assets/image/icons/icons8-magnifier.svg";
import geoposition from "../assets/image/icons/geoposition.svg";
import geophoto from "../assets/image/carlos-torres-MHNjEBeLTgw-unsplash.jpg";

// api
import { weatherDataLatLon } from "../api/weather-data";

// services
import { currDate } from "../services/currDate";
import getCurrentPosition from "../services/getCurrentPosition";

// antd
import { message } from "antd";

export default function Sidebar() {
  const [currTime, setCurrTime] = useState(new Date());
  const [interval, setInterval] = useState("");

  const loading = useAppSelector((state) => state.loadingWeather);
  const searchCityErr = useAppSelector((state) => state.searchCityErr);
  const cityName = useAppSelector((state) => state.cityName);
  const weather = useAppSelector((state) => state.weather);
  const dispatch = useAppDispatch();

  // antd
  const [messageApi, messageNotifications] = message.useMessage();

  async function searchCity(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.code === "Enter") {
      const searchValue = (e.nativeEvent.target as HTMLInputElement).value;

      if (cityName.length === 0) {
        messageApi.open({
          type: "warning",
          content: "Incorrect data",
          duration: 1,
        });

        return;
      }

      dispatch(getWeatherData({ cityName: searchValue }));
    }
  }

  async function getPosition() {
    const { lat, lon } = await getCurrentPosition();

    dispatch(setWeather(await weatherDataLatLon(lat, lon)));
    dispatch(setCityName("Current location"));
  }

  useEffect(() => {
    (async () => {
      dispatch(getWeatherData({ cityName }));
    })();

    const timer = window.setInterval(function () {
      setCurrTime(new Date());
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  useEffect(() => {
    setInterval(currDate(currTime));
  }, [currTime]);

  useEffect(() => {
    if (loading === false) return;

    messageApi
      .open({
        type: "loading",
        content: "Loading...",
        duration: 0.5,
      })
      .then(() => message.success("Loading finished", 0.8));
  }, [loading]);

  useEffect(() => {
    if (searchCityErr === null) return;

    messageApi.open({
      type: "error",
      content: searchCityErr,
      duration: 2.5,
    });
  }, [searchCityErr]);

  useEffect(() => {
    if (cityName === "Current location") {
      messageApi
        .open({
          type: "loading",
          content: "Loading...",
          duration: 0.5,
        })
        .then(() => message.success("Loading finished", 0.8));
    }
  }, [cityName]);

  return (
    <>
      <aside className="sidebar">
        {messageNotifications}
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
            onTouchStart={() => getPosition()}
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
                <p>{interval}</p>
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
