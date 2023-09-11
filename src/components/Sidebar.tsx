// react
import { useEffect, useState } from "react";

// store
import { useAppDispatch, useAppSelector } from "../store/store";
import { setWeather } from "../store/slice";

// style
import "../styles/Sidebar.css";

// image
import magnifier from "../assets/image/icons/icons8-magnifier.svg";
import geoposition from "../assets/image/icons/geoposition.svg";
import geophoto from "../assets/image/carlos-torres-MHNjEBeLTgw-unsplash.jpg";
import weatherData from "../api/weather-data";

export default function Sidebar() {
  const [searchText, setSearchText] = useState("Moscow");

  const weather = useAppSelector((state) => state.weather);
  const dispatch = useAppDispatch();

  async function searchCity(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.code === "Enter") {
      const searchValue = (e.nativeEvent.target as HTMLInputElement).value;

      dispatch(setWeather(await weatherData(searchValue)));
    }
  }

  useEffect(() => {
    (async () => {
      dispatch(setWeather(await weatherData("Moscow")));
    })();
    // eslint-disable-next-line
  }, []);

  return (
    <aside className="sidebar">
      <div className="sidebar_search">
        <div>
          <img src={magnifier} alt="magnifier" />
          <input
            type="text"
            name=""
            id=""
            placeholder="Search city..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            onKeyDown={(e) => searchCity(e)}
          />
        </div>
        <img src={geoposition} alt="geoposition" />
      </div>
      <div className="sidebar_weather">
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
            <h2>{Math.floor(weather.list[0].main.temp)}</h2>
            <p></p>
            <hr />
            <div className="weatherInfo_desc__meta1">
              {weather.list[0].weather[0].icon && (
                <img
                  src={`http://openweathermap.org/img/wn/${weather.list[0].weather[0].icon}@4x.png`}
                  alt=""
                />
              )}
              <span>
                {weather.list[0].weather[0].main} /{" "}
                {weather.list[0].weather[0].description}
              </span>
            </div>
          </section>
          <div className="weatherInfo_geoposition">
            <div>
              <img src={geophoto} alt="" />
              <p>{searchText}</p>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
