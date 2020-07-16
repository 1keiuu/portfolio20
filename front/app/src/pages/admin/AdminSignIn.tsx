import React, { FormEvent } from "react";
import axios from "axios";
import { RouteComponentProps } from "react-router-dom";
import * as H from "history";
import { withRouter } from "react-router-dom";
import "../../styles/admin/AdminSignIn.scss";
interface Props extends RouteComponentProps<{}> {
  history: H.History;
}
interface State {
  email: string;
  password: string;
}

class AdminSignIn extends React.Component<Props, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      email: "",
      password: "",
    };
  }

  async signIn(event: FormEvent) {
    event.preventDefault();

    const res = await axios.post("http://localhost:8000/admin/login/new", {
      email: this.state.email,
      password: this.state.password,
    });
    if (res) {
      this.props.history.push({
        pathname: "/admin/home",
        state: res.data,
      });
    }
  }
  handleChange(event: { target: { value: string } }, type: string) {
    switch (type) {
      case "email":
        this.setState({ email: event.target.value });
        break;
      case "password":
        this.setState({ password: event.target.value });
        break;
    }
  }
  render() {
    return (
      <div className="sign-in__wrapper">
        <form
          onSubmit={(e) => {
            this.signIn(e);
          }}
          className="sign-in__form"
        >
          <label>
            Email:
            <input
              type="text"
              value={this.state.email}
              onChange={(e) => {
                this.handleChange(e, "email");
              }}
              className="sign-in__email-input"
            />
          </label>
          <label>
            Password:
            <input
              type="password"
              value={this.state.password}
              onChange={(e) => {
                this.handleChange(e, "password");
              }}
              className="sign-in__password-input"
            />
          </label>

          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}

export default withRouter(AdminSignIn);
