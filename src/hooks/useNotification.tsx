// react
import { useEffect } from "react";

// store
import { useAppDispatch, useAppSelector } from "../store/store";

// antd
import { message } from "antd";
import { setIsSearch } from "../store/slice";

// // store
// import getWeatherData from "../store/asyncThunk";

export default function useNotification() {
  const loading = useAppSelector((state) => state.loadingWeather);
  const cityName = useAppSelector((state) => state.cityName);
  const searchCityErr = useAppSelector((state) => state.searchCityErr);
  const isSearch = useAppSelector((state) => state.isSearch);

  const dispatch = useAppDispatch();

  // antd
  const [messageApi, messageNotifications] = message.useMessage();

  // status - loading
  useEffect(() => {
    if (loading === false) return;

    messageApi
      .open({
        type: "loading",
        content: "Loading...",
        duration: 0.5,
      })
      .then(() => message.success("Loading finished", 0.8));
    // eslint-disable-next-line
  }, [loading]);

  // status - error
  useEffect(() => {
    if (searchCityErr === null) return;

    messageApi.open({
      type: "error",
      content: searchCityErr,
      duration: 2.5,
    });
    // eslint-disable-next-line
  }, [searchCityErr]);

  // status - loading (fot the current position)
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
    // eslint-disable-next-line
  }, [cityName]);

  // status - warning. IsSearch becomes true when the Enter button is pressed (see Sidebar)
  useEffect(() => {
    if (isSearch) {
      if (cityName.length === 0) {
        messageApi.open({
          type: "warning",
          content: "Incorrect data",
          duration: 1,
        });
      }
    } else {
      dispatch(setIsSearch(!isSearch));
    }
    // eslint-disable-next-line
  }, [isSearch]);

  return messageNotifications;
}
