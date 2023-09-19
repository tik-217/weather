// react
import { useEffect } from "react";

// store
import { useAppDispatch, useAppSelector } from "../store/store";
import { setIsSearch } from "../store/slice";

// antd
import { message } from "antd";

export default function useNotification() {
  // state
  const loading = useAppSelector((state) => state.loadingWeather);
  const cityName = useAppSelector((state) => state.cityName);
  const searchCityErr = useAppSelector((state) => state.searchCityErr);
  const isSearch = useAppSelector((state) => state.isSearch);
  const dispatch = useAppDispatch();

  // antd
  const [messageApi, messageNotifications] = message.useMessage();

  // status - loading
  useEffect(() => {
    if (searchCityErr !== null) return;

    if (loading) {
      messageApi
        .open({
          type: "loading",
          content: "Loading...",
          duration: 0.5,
        })
        .then(() => {
          messageApi.open({
            type: "success",
            content: "Loaded!",
            duration: 1,
          });
        });
    }
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
