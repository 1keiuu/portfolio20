import React from "react";
import "./App.scss";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Layout from "./components/Layout";
import axios from "axios";
import AdminSignIn from "./pages/admin/SignIn";
import AdminHome from "./pages/admin/Home";

type PageProps = {};

const App: React.FC<PageProps> = () => {
  return (
    <div className="App">
      <Router>
        <Route
          path="/:mode(|profile|product|contact)"
          component={Layout}
        ></Route>
        <Route path="/admin/signIn" component={AdminSignIn}></Route>
        <Route exact path="/admin" component={AdminHome}></Route>
      </Router>
    </div>
  );
};

export default App;
