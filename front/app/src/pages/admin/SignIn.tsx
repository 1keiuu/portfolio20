import React, { FormEvent, useState } from "react";
import axios from "axios";
import { RouteComponentProps } from "react-router-dom";
import * as H from "history";
import { withRouter } from "react-router-dom";
import "../../styles/admin/signin.scss";
import { Button, TextField } from "@material-ui/core";
interface Props extends RouteComponentProps<{}> {
  history: H.History;
}

const AdminSignIn: React.FC<Props> = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorText, setErrorText] = useState("");

  const signIn = async (event: FormEvent) => {
    event.preventDefault();
    setErrorText("");

    try {
      const URL = `${process.env.REACT_APP_API_URL}/admin/login/new`;
      const res = await axios.post(URL, {
        email: email,
        password: password,
      });
      props.history.push({
        pathname: "/admin",
        state: res.data,
      });
    } catch {
      setErrorText("ログインに失敗しました");
    }
  };
  const handleChange = (event: { target: { value: string } }, type: string) => {
    switch (type) {
      case "email":
        setEmail(event.target.value);
        break;
      case "password":
        setPassword(event.target.value);
        break;
    }
  };
  return (
    <div className="sign-in__wrapper">
      <form
        onSubmit={(e) => {
          signIn(e);
        }}
        className="sign-in__form"
      >
        <p>Admin</p>
        <TextField
          variant="outlined"
          placeholder="Email Address"
          type="text"
          value={email}
          onChange={(e) => {
            handleChange(e, "email");
          }}
          className="sign-in__email-input"
        />
        <TextField
          variant="outlined"
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => {
            handleChange(e, "password");
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
      <p className="error-text">{errorText}</p>
    </div>
  );
};

export default withRouter(AdminSignIn);
