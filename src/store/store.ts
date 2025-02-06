import { configureStore } from "@reduxjs/toolkit";

import {
  modalWeatherReducer,
  saveReducer,
  userListReducer,
  weatherReducer,
} from "./slices";

const store = configureStore({
  reducer: {
    userList: userListReducer,
    savedUsers: saveReducer,
    weather: weatherReducer,
    modalWeather: modalWeatherReducer,
  },
});

export { store };
