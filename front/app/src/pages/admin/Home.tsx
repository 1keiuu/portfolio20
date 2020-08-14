import React, { useState } from "react";
import axios from "axios";
import { RouteComponentProps } from "react-router-dom";
import * as H from "history";
import { withRouter } from "react-router-dom";
import AdminInner from "./Inner";
import "../../styles/admin/home.scss";
interface Props extends RouteComponentProps<{}> {
  history: H.History;
}

const AdminHome: React.FC<Props> = (props) => {
  const [isSignIn, setIsSignIn] = useState(true);

  // async componentDidMount() {
  //   const token = props.location.state;
  //   const URL = `${process.env.REACT_APP_API_URL}/admin/home`;
  //   try {
  //     await axios.get(URL, {
  //       headers: {
  //         Authorization: `Token ${token}`,
  //       },
  //     });
  //     setState({ isSignIn: true });
  //   } catch (e) {
  //     props.history.push("/admin/signIn");
  //   }
  // }
  return (
    <div className="admin__home">
      {isSignIn ? (
        <AdminInner>
          <p>admin home</p>
        </AdminInner>
      ) : (
        <p> </p>
      )}
    </div>
  );
};
export default withRouter(AdminHome);
