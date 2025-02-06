import { urls } from "../constants";
import { IWeather } from "../interfaces";
import { IRes } from "../types";
import { apiWeather } from "./apiService";

const weatherService = {
  getCurrentWeather: (
    latitude: string,
    longitude: string,
    current_weather: boolean,
    hourly: string,
    daily: string,
  ): IRes<IWeather> =>
    apiWeather.get(urls.weather.forecast, {
      params: { latitude, longitude, current_weather, hourly, daily },
    }),
};

export { weatherService };
