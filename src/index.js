import {
  Lockscreen,
  PasswordReset,
  Signin,
  Signup
} from "./pages";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import AppProvider from "./components/AppProvider/AppProvider";
import Dashboard from "./containers/Dashboard";
import NotFound from "./pages/Errors/NotFound";
import React from "react";
import registerServiceWorker from "./registerServiceWorker";
import { render } from "react-dom";
import { Provider } from 'react-redux';
import store from "./store";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

render(
  <Provider store={store}>
    <ToastContainer />
    <AppProvider>
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <Switch>
          <Route exact path="/404" component={NotFound} />
          <Route exact path="/Lockscreen" component={Lockscreen} />
          <Route exact path="/forgot" component={PasswordReset} />
          <Route exact path="/signin" component={Signin} />
          <Route exact path="/signup" component={Signup} />
          <Route path="/" component={Dashboard} />
        </Switch>
      </BrowserRouter>
    </AppProvider>
  </Provider>,
  document.getElementById("root")
);

registerServiceWorker();
