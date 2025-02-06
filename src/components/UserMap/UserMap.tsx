import { AdvancedMarker, APIProvider, Map } from "@vis.gl/react-google-maps";
import React, { FC, PropsWithChildren } from "react";
import { useLocation } from "react-router-dom";

import { useAppSelector } from "../../hooks";
import css from "./UserMap.module.css";

interface IProps extends PropsWithChildren {
  userId: string;
}

const UserMap: FC<IProps> = ({ userId }) => {
  const { results: users } = useAppSelector((state) => state.userList);
  const { savedUsers } = useAppSelector((state) => state.savedUsers);

  const location = useLocation().pathname;

  const userList = location == "/savedUsers" ? savedUsers : users;
  const user = userList.filter((user) => user.login.uuid == userId)[0];

  const position = {
    lat: +user.location.coordinates.latitude,
    lng: +user.location.coordinates.longitude,
  };

  const renderCustomPin = () => {
    return (
      <>
        <div className={css.CustomPin}>
          <img src={user.picture.thumbnail} alt="" />
        </div>
        <div className={css.Tip} />
      </>
    );
  };

  return (
    <APIProvider apiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
      <Map
        style={{ width: "60%", height: "30%" }}
        defaultZoom={3}
        defaultCenter={position}
        gestureHandling={"greedy"}
        disableDefaultUI={true}
        mapId="DEMO_MAP_ID"
      >
        <AdvancedMarker position={position}>{renderCustomPin()}</AdvancedMarker>
      </Map>
    </APIProvider>
  );
};

export { UserMap };
