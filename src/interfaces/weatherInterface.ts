export interface IWeather {
  current_weather: {
    temperature: number;
    weathercode: number;
  };
  hourly: {
    time: [string];
    temperature_2m: [number];
  };
  daily: {
    temperature_2m_max: [number];
    temperature_2m_min: [number];
  };
}
