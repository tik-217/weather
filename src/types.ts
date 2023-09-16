export interface IWeatherOneDay {
  dt: number;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    sea_level: number;
    grnd_level: number;
    humidity: number;
    temp_kf: number;
  };
  weather: [
    {
      id: number;
      main: string;
      description: string;
      icon: string;
    }
  ];
  clouds: {
    all: number;
  };
  wind: {
    speed: number;
    deg: number;
    gust: number;
  };
  visibility: number;
  pop: number;
  sys: {
    pod: string;
  };
  dt_txt: string;
}

export interface IWeather {
  cod: string;
  message: number;
  cnt: number;
  list: IWeatherOneDay[];
  city: {
    id: number;
    name: string;
    coord: {
      lat: number;
      lon: number;
    };
    country: string;
    population: number;
    timezone: number;
    sunrise: number;
    sunset: number;
  };
}

export interface IWeatherData {
  weatherData: IWeather;
  // endOfLoad: boolean;
  // error: boolean;
  // errorType: string;
}

export interface IGetWeatherData {
  cityName: string;
  units?: string;
}

export interface IInitialState {
  cityName: string;
  searchCityErr: null | string;
  loadingWeather: boolean;
  weather: IWeather;
}
