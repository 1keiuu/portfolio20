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

const App: React.FC<Props> = () => {
  return (
    <div className="App">
      <Router>
        <Route exact path="/">
          <Header></Header>
          <Home></Home>
        </Route>
        <Route path="/skills">
          <Header></Header>
          <SkillPage></SkillPage>
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
};

export default App;
