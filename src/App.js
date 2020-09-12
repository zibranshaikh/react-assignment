import React from 'react';
import { toast } from 'react-toastify'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  //Link,
  //useParams,
} from "react-router-dom"
import { PrivateRoute } from "./hoc/PrivateRoute"
import { PublicRoute } from "./hoc/PublicRoute"

import Header from './common/Header';
import Footer from './common/Footer';
import HomeController from './components/Dashboard';
import LoginController from "./components/Auth";
import UniversalErrorPage from "./components/UniversalErrorPage";
import { APP_ROUTES } from './utils/enum';

import 'bootstrap/dist/css/bootstrap.css';
import 'react-toastify/dist/ReactToastify.css';

import './App.css';

toast.configure()

const App = () => {
  return (
    <div className="App">
      <Header />
        <Router>
          <Switch>
            <Redirect exact from={APP_ROUTES.ROOT} to={APP_ROUTES.LOG_IN} />
            <PublicRoute exact path={APP_ROUTES.LOG_IN} component={LoginController} />
            <PrivateRoute exact path={APP_ROUTES.HOME} component={HomeController} />
            <Route path={APP_ROUTES.ROOT} name="Page 404" component={UniversalErrorPage} />
          </Switch>
        </Router>
      <Footer />
    </div>
  );
}

export default App;
