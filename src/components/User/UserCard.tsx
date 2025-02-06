import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import PlaceOutlinedIcon from "@mui/icons-material/PlaceOutlined";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import ThermostatOutlinedIcon from "@mui/icons-material/ThermostatOutlined";
import { FC, PropsWithChildren, useEffect } from "react";
import { useLocation } from "react-router-dom";

import { weatherCodes } from "../../constants";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { IUser } from "../../interfaces";
import { modalWeatherActions, saveActions, weatherActions } from "../../store";
import { ModalWeather } from "../ModalWeather";
import css from "./UserCard.module.css";

interface IProps extends PropsWithChildren {
  user: IUser;
}

const UserCard: FC<IProps> = ({ user }) => {
  const { name, gender, picture, location: userLocation, email } = user;
  const weatherData = useAppSelector(
    (state) => state.weather?.userWeatherData[user.login.uuid],
  );

  const dispatch = useAppDispatch();
  const location = useLocation().pathname;

  const save = () => {
    dispatch(saveActions.saveUser({ user }));
  };

  const deleteUser = () => {
    dispatch(saveActions.deleteUser({ userId: user.login.uuid }));
  };

  useEffect(() => {
    dispatch(
      weatherActions.getCurrentWeather({
        userId: user.login.uuid,
        longitude: userLocation.coordinates.longitude,
        latitude: userLocation.coordinates.latitude,
        current_weather: true,
        hourly: "temperature_2m",
        daily: "temperature_2m_max,temperature_2m_min",
      }),
    );
  }, [userLocation, user.login.uuid, dispatch]);

  return (
    <div>
      <ModalWeather user={user} />
      <div className={css.UserCard}>
        <div className={css.AvatarTexture}>
          <img className={css.Avatar} src={picture.large} alt={"avatar"} />
        </div>
        <div>
          <b>{name.first + " " + name.last}</b>
        </div>

        <div>{gender.charAt(0).toUpperCase() + gender.slice(1)}</div>

        <div className={css.Location}>
          <PlaceOutlinedIcon />
          {userLocation.country + ", " + userLocation.city}
        </div>

        <div className={css.Email}>
          <EmailOutlinedIcon />
          {" " + email}
        </div>

        <div className={css.WeatherDescription}>
          <div>
            {weatherData?.current_weather?.weathercode !== undefined
              ? weatherCodes[weatherData.current_weather.weathercode]?.day
                  .description
              : ""}
          </div>
          <img
            src={
              weatherData?.current_weather?.weathercode !== undefined
                ? weatherCodes[weatherData.current_weather.weathercode]?.day
                    .image
                : "https://placehold.co/100x100"
            }
            alt="Weather Icon"
            className={css.WeatherIcon}
          />
        </div>

        <div>Current temp {weatherData?.current_weather?.temperature}C°</div>
        <div>
          Max {weatherData?.daily.temperature_2m_max[0]}C° / Min{" "}
          {weatherData?.daily.temperature_2m_min[0]}C°
        </div>

        <div className={css.ButtonsPanel}>
          <button
            onClick={save}
            disabled={location == "/savedUsers"}
            className={`${css.SaveButton} ${css.UserButtons}`}
          >
            SAVE <SaveOutlinedIcon />
          </button>
          <button
            className={`${css.WeatherButton} ${css.UserButtons}`}
            onClick={() =>
              dispatch(modalWeatherActions.openModal(user.login.uuid))
            }
          >
            WEATHER <ThermostatOutlinedIcon />
          </button>
          <button
            onClick={deleteUser}
            disabled={location == "/users"}
            className={`${css.UserButtons} ${css.DeleteButton}`}
          >
            <DeleteOutlinedIcon />
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
