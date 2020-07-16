import React from "react";
import List from "@material-ui/core/List";
import {
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Drawer,
} from "@material-ui/core";
import AssignmentInd from "@material-ui/icons/AssignmentInd";
import ExitToApp from "@material-ui/icons/ExitToApp";
import Assignment from "@material-ui/icons/Assignment";
import "../../styles/components/sidebar.scss";
import { withRouter } from "react-router-dom";
import * as H from "history";
import { RouteComponentProps } from "react-router-dom";

interface Props extends RouteComponentProps<{}> {
  history: H.History;
}

class SideBar extends React.Component<Props> {
  constructor(props: any) {
    super(props);
  }
  handleClick(type: string) {
    switch (type) {
      case "profile":
        break;
      case "work":
        break;
      case "signOut":
        this.props.history.push("/admin/signIn");
        break;
    }
  }
  render() {
    return (
      <Drawer
        variant="permanent"
        // anchor={anchor}
        // open={state[anchor]}
        // onClose={toggleDrawer(anchor, false)}
      >
        <List component="nav" aria-label="main mailbox folders">
          <ListItem
            button
            onClick={() => {
              this.handleClick("profile");
            }}
          >
            <ListItemIcon>
              <AssignmentInd style={{ color: "rgb(194, 199, 208)" }} />
            </ListItemIcon>
            <ListItemText color="white" primary="プロフィール" />
          </ListItem>
          <ListItem
            button
            onClick={() => {
              this.handleClick("work");
            }}
          >
            <ListItemIcon>
              <Assignment style={{ color: "rgb(194, 199, 208)" }} />
            </ListItemIcon>
            <ListItemText primary="成果物管理" />
          </ListItem>
          <Divider></Divider>
          <ListItem
            button
            onClick={() => {
              this.handleClick("signOut");
            }}
          >
            <ListItemIcon>
              <ExitToApp style={{ color: "rgb(194, 199, 208)" }} />
            </ListItemIcon>
            <ListItemText primary="サインアウト" />
          </ListItem>
        </List>
      </Drawer>
    );
  }
}

export default withRouter(SideBar);