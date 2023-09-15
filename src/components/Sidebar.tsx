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
import { weatherDataCity, weatherDataLatLon } from "../api/weather-data";
import getCurrentPosition from "../services/getCurrentPosition";

export default function Sidebar() {
  // const cityNotFound = useAppSelector((state) => state.noSuchCity);
  const cityName = useAppSelector((state) => state.cityName);
  const weather = useAppSelector((state) => state.weather);
  const dispatch = useAppDispatch();

  async function searchCity(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.code === "Enter") {
      const searchValue = (e.nativeEvent.target as HTMLInputElement).value;

      const weatherData = await weatherDataCity(searchValue);

      dispatch(setWeather(weatherData));
    }
  }

  async function getPosition() {
    const { lat, lon } = await getCurrentPosition();

    dispatch(setWeather(await weatherDataLatLon(lat, lon)));
    dispatch(setCityName("Current location"));
  }

  function currDate() {
    const date = new Date();
    const day = new Intl.DateTimeFormat("en-US", { weekday: "long" }).format(
      date
    );

    return `${day}, ${date.getHours()}:${date.getMinutes()}`;
  }

  useEffect(() => {
    (async () => {
      dispatch(setWeather(await weatherDataCity(cityName)));
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
  );
}
