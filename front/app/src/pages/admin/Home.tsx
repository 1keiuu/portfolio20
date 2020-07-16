import React from "react";
import axios from "axios";
import { RouteComponentProps } from "react-router-dom";
import * as H from "history";
import { withRouter } from "react-router-dom";
import AdminInner from "./Inner";
import "../../styles/admin/home.scss";
interface Props extends RouteComponentProps<{}> {
  history: H.History;
}
interface State {
  isSignIn: boolean;
}

class AdminHome extends React.Component<Props, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      isSignIn: false,
    };
  }

  async componentDidMount() {
    const token = this.props.location.state;
    try {
      await axios.get("http://localhost:8000/admin/home", {
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      this.setState({ isSignIn: true });
    } catch (e) {
      this.props.history.push("/admin/signIn");
    }
  }
  render() {
    return (
      <div className="admin__home">
        {this.state.isSignIn ? (
          <AdminInner>
            <p>admin home</p>
          </AdminInner>
        ) : (
          <p> </p>
        )}
      </div>
    );
  }
}
export default withRouter(AdminHome);
