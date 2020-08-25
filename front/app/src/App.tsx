import React, { useState, useEffect } from "react";
import "./App.scss";
import {
  BrowserRouter as Router,
  Route,
  useRouteMatch,
} from "react-router-dom";
import Layout from "./components/Layout";
import AdminSignIn from "./pages/admin/SignIn";
import AdminHome from "./pages/admin/Home";
import AdminProduct from "./pages/admin/Product";
import Home from "./pages/home/Home";
import ProfilePage from "./pages/profile/ProfilePage";
import ProductPage from "./pages/product/ProductPage";
import ContactPage from "./pages/contact/ContactPage";

type PageProps = {};

const App: React.FC<PageProps> = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (window.location.pathname == "/") {
      setIsLoaded(true);
      // setTimeout(() => {
      //   setIsLoaded(false);
      // }, 5000);
    }
  }, []);
  return (
    <div className="App">
      {/* {isLoaded ? (
        <Loading isLoaded={isLoaded}></Loading>
      ) : ( */}
      <Router>
        <Layout current_page={window.location.pathname}>
          <Route exact path="/" component={Home} isLoaded={isLoaded}></Route>
          <Route
            path="/profile"
            component={ProfilePage}
            isLoaded={isLoaded}
          ></Route>
          <Route
            path="/product"
            component={ProductPage}
            isLoaded={isLoaded}
          ></Route>
          <Route
            path="/contact"
            component={ContactPage}
            isLoaded={isLoaded}
          ></Route>
        </Layout>
        <Route path="/admin/signIn" component={AdminSignIn}></Route>
        <Route exact path="/admin" component={AdminHome}></Route>
        <Route path="/admin/product" component={AdminProduct}></Route>
      </Router>
    </div>
  );
};

export default App;
