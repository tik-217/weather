// react
import { useEffect } from "react";

// store
import { useAppDispatch, useAppSelector } from "../store/store";
import { setCityName, setWeather } from "../store/slice";

// style
import "../styles/Sidebar.css";

// image
import magnifier from "../assets/image/icons/icons8-magnifier.svg";
import geoposition from "../assets/image/icons/geoposition.svg";
import geophoto from "../assets/image/carlos-torres-MHNjEBeLTgw-unsplash.jpg";
import { weatherDataLatLon } from "../api/weather-data";
import getCurrentPosition from "../services/getCurrentPosition";

// services
import { currDate } from "../services/currDate";

// antd
import { message } from "antd";
import getWeatherData from "../store/asyncThunk";

export default function Sidebar() {
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
    console.log(weather);
  }

  useEffect(() => {
    (async () => {
      dispatch(getWeatherData({ cityName }));
    })();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (searchCityErr.length === 0) return;
    if (loading === false) return;

    messageApi
      .open({
        type: "loading",
        content: "Loading...",
        duration: 1,
      })
      .then(() => message.success("Loading finished", 1));
  }, [loading]);

  useEffect(() => {
    if (searchCityErr.length === 0) return;

    messageApi.open({
      type: "error",
      content: searchCityErr,
      duration: 1,
    });
  }, [searchCityErr]);

  useEffect(() => {}, [cityName]);

  return (
    <>
      <aside className="sidebar">
        {messageNotifications}
        <div className="sidebar_search">
          <div>
            <img src={magnifier} alt="magnifier" />
            <input
              type="text"
              name=""
              id=""
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
                <p>{currDate()}</p>
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
