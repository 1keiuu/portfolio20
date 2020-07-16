import React from "react";
import "./App.scss";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import SkillPage from "./pages/skill/SkillPage";
import Header from "./components/Header";
import axios from "axios";
import AdminLayout from "./pages/admin/Layout";

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
          <Route path="/admin">
            <AdminLayout></AdminLayout>
          </Route>
        </Router>
      </div>
    );
  }
}
