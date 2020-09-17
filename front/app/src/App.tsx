import React from 'react';
import './App.scss';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Layout from './components/Layout';
import AdminLayout from './pages/admin/AdminLayout';
import AdminSignIn from './pages/admin/AdminSignIn';
import AdminHome from './pages/admin/AdminHome';
import AdminProduct from './pages/admin/AdminProducts';
import AdminProfile from './pages/admin/AdminProfile';
import AdminSkill from './pages/admin/AdminSkills';
import Home from './pages/home/Home';
import ProfilePage from './pages/profile/ProfilePage';
import ProductsIndex from './pages/product/ProductsIndex';
import ContactPage from './pages/contact/ContactPage';
import { PersistGate } from 'redux-persist/integration/react';
import store, { persistor } from './store/configureStore';
import { Provider } from 'react-redux';
type PageProps = {};

const App: React.FC<PageProps> = () => {
  return (
    <div className="App">
      <Router>
        {!window.location.pathname.includes('/admin') ? (
          <Route>
            <Layout>
              <Route exact path="/" render={() => <Home />}></Route>
              <Route path="/profile" render={() => <ProfilePage />}></Route>
              <Route path="/product" render={() => <ProductsIndex />}></Route>
              <Route path="/contact" render={() => <ContactPage />}></Route>
            </Layout>
          </Route>
        ) : (
          <div></div>
        )}
        {window.location.pathname.includes('/admin') ? (
          <Route>
            <Provider store={store}>
              <PersistGate loading={null} persistor={persistor}>
                <AdminLayout>
                  <Route
                    path="/admin/signIn"
                    render={() => <AdminSignIn />}
                  ></Route>
                  <Route
                    exact
                    path="/admin"
                    render={() => <AdminHome />}
                  ></Route>
                  <Route
                    path="/admin/product"
                    render={() => <AdminProduct />}
                  ></Route>
                  <Route
                    path="/admin/profile"
                    render={() => <AdminProfile />}
                  ></Route>
                  <Route
                    path="/admin/skill"
                    render={() => <AdminSkill />}
                  ></Route>
                </AdminLayout>
              </PersistGate>
            </Provider>
          </Route>
        ) : (
          <div></div>
        )}
      </Router>
    </div>
  );
};

export default App;
