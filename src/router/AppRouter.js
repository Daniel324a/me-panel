import React, { useContext } from "react";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { HomeScreen } from "../views/homeScreen/HomeScreen";
import { LoginScreen } from "../views/loginScreen/LoginScreen";
import { AuthContext } from "../utils/authProvider";
import { PrivateRouter } from "./PrivateRouter";

export const AppRouter = () => {
  const { auth } = useContext(AuthContext);

  return (
    <Router>
      <Switch>
        <Route path="/login" component={LoginScreen} />
        <PrivateRouter exact path="/" isLogged={auth} component={HomeScreen} />
      </Switch>
    </Router>
  );
};
