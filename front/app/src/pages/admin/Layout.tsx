import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import withStyles, { StyleRules } from "@material-ui/core/styles/withStyles";
import createStyles from "@material-ui/core/styles/createStyles";
import AdminHome from "./Home";
import "../../styles/admin/layout.scss";

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
        <Router>
          {/* <Route  path="/admin/signIn">
            <AdminSignIn></AdminSignIn>
          </Route> */}
        </Router>
      </div>
    );
  }
}
export default withStyles(styles)(AdminLayout);
