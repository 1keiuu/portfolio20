import React from "react";
import { AppBar, Toolbar, Typography } from "@material-ui/core";
import "../../styles/components/header.scss";
export default class Header extends React.Component {
  render() {
    return (
      <div className="header__inner">
        <AppBar position="fixed" style={{ background: "#fff" }}>
          <Toolbar>
            <Typography variant="h6">Portfolio Admin</Typography>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}
