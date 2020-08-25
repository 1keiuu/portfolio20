import React from "react";
import "./App.scss";
import { BrowserRouter as Router, Route } from "react-router-dom";
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
  return (
    <div className="App">
      <Router>
        <Route>
          <Layout>
            <Route exact path="/" render={() => <Home />}></Route>
            <Route path="/profile" render={() => <ProfilePage />}></Route>
            <Route path="/product" render={() => <ProductPage />}></Route>
            <Route path="/contact" render={() => <ContactPage />}></Route>
          </Layout>
        </Route>
        <Route path="/admin/signIn" component={AdminSignIn}></Route>
        <Route exact path="/admin" component={AdminHome}></Route>
        <Route path="/admin/product" component={AdminProduct}></Route>
      </Router>
    </div>
  );
};

export default App;
