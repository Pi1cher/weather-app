import React from "react";

import UserList from "../../components/User/UserList";
import css from "./SavedUsersPage.module.css";

const SavedUsersPage = () => {
  return (
    <div className={css.SavedUsersPage}>
      <UserList />
    </div>
  );
};

export { SavedUsersPage };
