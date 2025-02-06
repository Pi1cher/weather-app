import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../../hooks";
import { userListActions } from "../../store";
import UserCard from "./UserCard";
import css from "./UserList.module.css";

const UserList = () => {
  const [results, setResults] = useState("8");
  const [seed] = useState(() => Math.floor(Math.random() * 10000));

  const { results: users } = useAppSelector((state) => state.userList);
  const { savedUsers } = useAppSelector((state) => state.savedUsers);

  const dispatch = useAppDispatch();
  const location = useLocation().pathname;

  const handleLoadButton = () => {
    setResults((prevResults) => (parseInt(prevResults) + 8).toString());
  };

  if (location == "/users") {
    useEffect(() => {
      dispatch(userListActions.getAll({ results, seed }));
    }, [results, dispatch]);
  }
  return (
    <div className={css.UserList}>
      {location == "/users"
        ? users.map((user) => <UserCard key={user.login.uuid} user={user} />)
        : savedUsers.map((user) => (
            <UserCard key={user.login.uuid} user={user} />
          ))}

      {location == "/savedUsers" ? (
        <div></div>
      ) : (
        <button className={css.LoadButton} onClick={handleLoadButton}>
          Load users
        </button>
      )}
    </div>
  );
};

export default UserList;
