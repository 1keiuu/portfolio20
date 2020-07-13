import React from "react";
import iconSrc from "../../images/GitHub_Logo.png";
import logoSrc from "../../images/GitHub_Icon.png";
import "./style/GithubTitle.scss";
export default class GithubTitle extends React.Component {
  render() {
    return (
      <div className="github-title__wrapper">
        <img src={iconSrc} alt="logo" className="github-title__logo" />
        <img src={logoSrc} alt="icon" className="github-title__icon" />
      </div>
    );
  }
}
