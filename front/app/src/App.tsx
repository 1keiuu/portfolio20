import React from "react";
import "./App.scss";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import SkillPage from "./pages/skill/SkillPage";
import Header from "./shared/header/Header";
export default class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Router>
          <Header></Header>

          <Route exact path="/">
            <Home></Home>
          </Route>
          <Route path="/skills">
            <SkillPage></SkillPage>
          </Route>
        </Router>
      </div>
    );
  }
}
