import React from "react";
import axios from "axios";
export default class AdminHome extends React.Component {
  async componentDidMount() {
    const res = await axios.post(
      "http://localhost:8000/login/new",
      {
        headers: { "Content-Type": "application/json" },
      },
      { params: { email: "ikkei12.h@gmail.com", password: "kumame12" } }
    );
    console.log(res);
  }
  render() {
    return <input />;
  }
}
