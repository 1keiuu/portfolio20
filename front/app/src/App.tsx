import React from "react";
import "./App.scss";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import SkillPage from "./pages/skill/SkillPage";
import Header from "./components/Header";
import axios from "axios";
import AdminSignIn from "./pages/admin/SignIn";
import AdminHome from "./pages/admin/Home";

interface Props {}
interface State {
  contributions: [];
}
export default class App extends React.Component<Props, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      contributions: [],
    };
  }
  getData = async () => {
    const res = await axios.get("http://localhost:8000/contributions", {
      headers: { "Content-Type": "application/json" },
    });
    return res.data.contributions;
  };
  render() {
    return (
      <div className="App">
        <Router>
          <Route exact path="/">
            <Header></Header>
            <Home></Home>
          </Route>
          <Route path="/skills">
            <Header></Header>
            <SkillPage contributionsPromise={this.getData()}></SkillPage>
          </Route>
          <Route path="/admin/signIn">
            <AdminSignIn></AdminSignIn>
          </Route>
          <Route exact path="/admin">
            <AdminHome></AdminHome>
          </Route>
        </Router>
      </div>
    );
  }
}
