import React, { FC, PropsWithChildren } from "react";

import { useAppDispatch, useAppSelector } from "../../hooks";
import { IUser } from "../../interfaces";
import { modalWeatherActions } from "../../store";
import { UserMap } from "../UserMap";
import { WeatherChart } from "../WeatherChart";
import css from "./ModalWeather.module.css";

interface IProps extends PropsWithChildren {
  user: IUser;
}

const ModalWeather: FC<IProps> = () => {
  const { isOpen, userId } = useAppSelector((state) => state.modalWeather);

  const weatherData = useAppSelector(
    (state) => state.weather?.userWeatherData[userId],
  );

  const dispatch = useAppDispatch();

  if (!isOpen) return null;

  return (
    <div className={css.ModalOverlay}>
      <div className={css.Modal}>
        <h3>
          Current temperature {weatherData.current_weather.temperature} C°
        </h3>
        <h1>Temperature during the day</h1>
        <WeatherChart weatherData={weatherData} />
        <UserMap userId={userId} />

        <button
          onClick={() => dispatch(modalWeatherActions.closeModal())}
          className={css.CloseButton}
        >
          ✖
        </button>
      </div>
    </div>
  );
};

export { ModalWeather };
