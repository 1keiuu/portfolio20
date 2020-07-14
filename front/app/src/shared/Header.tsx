import React from "react";
import { Link } from "react-router-dom";
import "../styles/Header.scss";
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
