import React, { useState, useEffect } from "react";
import "../styles/FilmBar.scss";
const FilmSideBar: React.FC = () => {
  return (
    <div className="film-bar__inner">
      <div className="film-bar film-bar__left">
        <div className="film-bar__space"></div>
        <div className="film-bar__space"></div>
        <div className="film-bar__space"></div>
        <div className="film-bar__space"></div>
        <div className="film-bar__space"></div>
        <div className="film-bar__space"></div>
        <div className="film-bar__space"></div>
      </div>
      <div className="film-bar film-bar__right">
        <div className="film-bar__space"></div>
        <div className="film-bar__space"></div>
        <div className="film-bar__space"></div>
        <div className="film-bar__space"></div>
        <div className="film-bar__space"></div>
        <div className="film-bar__space"></div>
        <div className="film-bar__space"></div>
      </div>
    </div>
  );
};

export default FilmSideBar;
