import React from "react";
import { Link, BrowserRouter } from "react-router-dom";
import "./style/Header.scss";
export default class Header extends React.Component {
  render() {
    return (
      <header>
        <Link to="/">home</Link>
        <Link to="/skills">skill</Link>
      </header>
    );
  }
}
