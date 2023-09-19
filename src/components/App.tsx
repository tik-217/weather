// react
import { useEffect } from "react";

// components
import Sidebar from "./Sidebar";
import Weather from "./Weather";

// store
import { useAppDispatch, useAppSelector } from "../store/store";
import { setAppMode } from "../store/slice";

// styles
import "../styles/App.css";

export default function App() {
  // state
  const weather = useAppSelector((state) => state.weather);
  const appMode = useAppSelector((state) => state.appMode);
  const isAppMode = useAppSelector((state) => state.isAppMode);
  const dispatch = useAppDispatch();

  const currTime = Date.now();
  const sunrise = weather.city.sunrise * 1000;
  const sunset = weather.city.sunset * 1000;

  useEffect(() => {
    if (currTime >= sunrise) {
      dispatch(setAppMode("light"));
    } else if (currTime >= sunset) {
      dispatch(setAppMode("dark"));
    }
    // eslint-disable-next-line
  }, [weather]);

  useEffect(() => {
    if (isAppMode) {
      dispatch(setAppMode("light"));
    } else {
      dispatch(setAppMode("dark"));
    }
    // eslint-disable-next-line
  }, [weather, isAppMode]);

  return (
    <div className={appMode === "dark" ? "app app__dark" : "app"}>
      <Sidebar />
      <Weather />
    </div>
  );
}
