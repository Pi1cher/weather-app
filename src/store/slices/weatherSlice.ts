import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";

import { IWeather } from "../../interfaces";
import { weatherService } from "../../services";

interface IWeatherState {
  userWeatherData: { [userId: string]: IWeather };
}

const initialState: IWeatherState = {
  userWeatherData: {},
};
const getCurrentWeather = createAsyncThunk<
  { userId: string; weatherData: IWeather },
  {
    userId: string;
    latitude: string;
    longitude: string;
    current_weather: boolean;
    hourly: string;
    daily: string;
  }
>(
  "weatherSlice/getCurrentWeather",
  async (
    { userId, latitude, longitude, current_weather, hourly, daily },
    { rejectWithValue },
  ) => {
    try {
      const { data } = await weatherService.getCurrentWeather(
        latitude,
        longitude,
        current_weather,
        hourly,
        daily,
      );
      return { userId, weatherData: data };
    } catch (e) {
      const err = e as AxiosError;
      return rejectWithValue(err.response?.data);
    }
  },
);

const weatherSlice = createSlice({
  name: "weatherSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder.addCase(getCurrentWeather.fulfilled, (state, action) => {
      state.userWeatherData[action.payload.userId] = action.payload.weatherData;
    }),
});

const { reducer: weatherReducer, actions } = weatherSlice;

const weatherActions = {
  ...actions,
  getCurrentWeather,
};

export { weatherActions, weatherReducer };
