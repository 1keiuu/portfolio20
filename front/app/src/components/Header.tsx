import React from "react";
import { Link } from "react-router-dom";
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
