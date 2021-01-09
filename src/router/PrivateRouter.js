import React from "react";
import { Route, Redirect } from "react-router-dom";

export const PrivateRouter = ({ isLogged = false, component, ...rest }) =>
  isLogged ? (
    <Route component={component} {...rest} />
  ) : (
    <Redirect to="/login" />
  );
