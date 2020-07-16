import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import withStyles, { StyleRules } from "@material-ui/core/styles/withStyles";
import createStyles from "@material-ui/core/styles/createStyles";
import AdminHome from "./AdminHome";
import AdminSignIn from "./AdminSignIn";
import Header from "../../components/admin/Header";
import "../../styles/admin/AdminLayout.scss";

const styles = (): StyleRules =>
  createStyles({
    root: {
      textAlign: "center",
    },
  });

class AdminLayout extends React.Component {
  render() {
    return (
      <div className="admin__container">
        <Header></Header>
        <Router>
          <Route exact path="/admin">
            <AdminSignIn></AdminSignIn>
          </Route>
          <Route path="/admin/home">
            <AdminHome></AdminHome>
          </Route>
        </Router>
      </div>
    );
  }
}
export default withStyles(styles)(AdminLayout);
