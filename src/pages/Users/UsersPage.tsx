import React from "react";

import UserList from "../../components/User/UserList";
import css from "./UsersPage.module.css";

const UsersPage = () => {
  return (
    <div className={css.UsersPage}>
      <UserList />
    </div>
  );
};

export { UsersPage };
