import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./pages/Home";
import SkillPage from "./pages/SkillPage";
import Header from "./components/shared/Header";
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
