import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import AdminHome from "./AdminHome";
import AdminSignIn from "./AdminSignIn";

export default class AdminLayout extends React.Component {
  render() {
    return (
      <Router>
        <Route exact path="/admin">
          <AdminSignIn></AdminSignIn>
        </Route>
        <Route path="/admin/home">
          <AdminHome></AdminHome>
        </Route>
      </Router>
    );
  }
}
