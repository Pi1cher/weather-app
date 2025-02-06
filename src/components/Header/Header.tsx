import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import React from "react";
import { useMediaQuery } from "react-responsive";
import { useLocation, useNavigate } from "react-router-dom";

import css from "./Header.module.css";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation().pathname;
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

  return (
    <div className={css.Header}>
      <button
        disabled={location == "/users"}
        className={`${css.BackButton} ${css.HeaderButtons}`}
        onClick={() => navigate(-1)}
      >
        Back
      </button>
      <h1>Random Weather</h1>

      {isMobile ? (
        <button
          className={`${css.SavedUsers} ${css.HeaderButtons}`}
          onClick={() => navigate("savedUsers")}
        >
          <SaveOutlinedIcon />
        </button>
      ) : (
        <button
          onClick={() => navigate("savedUsers")}
          className={`${css.SavedUsers} ${css.HeaderButtons}`}
        >
          Saved Users
        </button>
      )}
    </div>
  );
};

export { Header };
