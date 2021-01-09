import React, { useState } from "react";

import { api } from "./global/envioronments";
import { AppRouter } from "./router/AppRouter";
import { AuthContext } from "./utils/authProvider";

export const App = () => {
  const [auth, setAuth] = useState(localStorage.getItem("user"));

  if (localStorage.getItem("user")) {
    fetch(`${api}verifyLogToken`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token: localStorage.getItem("token"),
      }),
    })
      .then(resp => resp.json())
      .then(resp => {
        if (!resp.ok) {
          localStorage.removeItem("user");
          localStorage.removeItem("token");
          setAuth(false);
        }
      })
      .catch(err => {
        console.log(err);
        setAuth(false);
      });
  }

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      <AppRouter />
    </AuthContext.Provider>
  );
};
