import React, { useState, useEffect } from "react";
import "./App.scss";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Layout from "./components/Layout";
import AdminSignIn from "./pages/admin/SignIn";
import AdminHome from "./pages/admin/Home";
import AdminProduct from "./pages/admin/Product";
import Loading from "./components/Loading";

type PageProps = {};

const App: React.FC<PageProps> = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (window.location.pathname == "/") {
      setIsLoaded(true);
      setTimeout(() => {
        setIsLoaded(false);
      }, 5000);
    }
  }, []);
  return (
    <div className="App">
      <Router>
        <Route
          path="/:mode(|profile|product|contact)"
          component={Layout}
        ></Route>
        <Route path="/admin/signIn" component={AdminSignIn}></Route>
        <Route exact path="/admin" component={AdminHome}></Route>
        <Route path="/admin/product" component={AdminProduct}></Route>
      </Router>
      {isLoaded ? <Loading isLoaded={isLoaded}></Loading> : <div></div>}
    </div>
  );
};

export default App;
