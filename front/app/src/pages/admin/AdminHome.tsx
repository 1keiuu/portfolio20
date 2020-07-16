import React from "react";
import axios from "axios";
import { RouteComponentProps } from "react-router-dom";
import * as H from "history";
import { withRouter } from "react-router-dom";
interface Props extends RouteComponentProps<{}> {
  history: H.History;
}

class AdminHome extends React.Component<Props> {
  async componentDidMount() {
    const token = this.props.location.state;
    try {
      const res = await axios.get("http://localhost:8000/admin/home", {
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      console.log(res);
    } catch (e) {
      this.props.history.push("/admin");
    }
  }
  render() {
    return <p>admin home</p>;
  }
}
export default withRouter(AdminHome);
