import React, { FormEvent } from "react";
import axios from "axios";
import { RouteComponentProps } from "react-router-dom";
import * as H from "history";
import { withRouter } from "react-router-dom";
import "../../styles/admin/signin.scss";
import { Button, TextField } from "@material-ui/core";
interface Props extends RouteComponentProps<{}> {
  history: H.History;
}
interface State {
  email: string;
  password: string;
  errorText: string;
}

class AdminSignIn extends React.Component<Props, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      email: "",
      password: "",
      errorText: " ",
    };
  }

  async signIn(event: FormEvent) {
    event.preventDefault();
    this.setState({ errorText: " " });

    try {
      const URL = `${process.env.REACT_APP_API_URL}/admin/login/new`;
      const res = await axios.post(URL, {
        email: this.state.email,
        password: this.state.password,
      });
      this.props.history.push({
        pathname: "/admin",
        state: res.data,
      });
    } catch {
      this.setState({ errorText: "ログインに失敗しました" });
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
          <p>Admin</p>
          <TextField
            variant="outlined"
            placeholder="Email Address"
            type="text"
            value={this.state.email}
            onChange={(e) => {
              this.handleChange(e, "email");
            }}
            className="sign-in__email-input"
          />
          <TextField
            variant="outlined"
            placeholder="Password"
            type="password"
            value={this.state.password}
            onChange={(e) => {
              this.handleChange(e, "password");
            }}
            className="sign-in__password-input"
          />

          <Button
            variant="contained"
            color="primary"
            type="submit"
            value="Submit"
          >
            Sign In
          </Button>
        </form>
        <p className="error-text">{this.state.errorText}</p>
      </div>
    );
  }
}

export default withRouter(AdminSignIn);
