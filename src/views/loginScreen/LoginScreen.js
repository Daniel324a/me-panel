import React, { useContext, useState } from "react";
import { Redirect } from "react-router-dom";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

import { TextField } from "../../components/textField/TextField";
import { api } from "../../global/envioronments";
import { useForm } from "../../hooks/useForm";
import { AuthContext } from "../../utils/authProvider";

const MySwal = withReactContent(Swal);

export const LoginScreen = props => {
  const { auth, setAuth } = useContext(AuthContext);
  const [{ email, pass }, handleFormChange] = useForm({ email: "", pass: "" });
  const [loading, setLoading] = useState(false);

  const handleLogin = async e => {
    e.preventDefault();

    if (!email || !pass)
      return MySwal.fire("Error", "Don't leave blank fields", "warning");

    const body = { email, pass };
    setLoading(true);

    await fetch(`${api}login`, {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    })
      .then(response => response.json())
      .then(({ ok, data, token }) => {
        setLoading(false);

        if (!ok)
          return MySwal.fire("Error", "Email or password incorrect", "warning");

        localStorage.setItem("user", JSON.stringify(data));
        localStorage.setItem("token", token);
        setAuth(true);
      })
      .catch(err => console.log(err));
  };

  return auth ? (
    <Redirect to="/" />
  ) : (
    <div className="w-screen h-screen bg-gray-200 flex justify-center items-center dark:bg-gray-700">
      <form
        className="flex flex-col justify-center items-center gap-2 p-8 w-full h-full bg-white shadow-md rounded-xl md:m-8 md:w-1/3 md:h-auto dark:bg-gray-800"
        onSubmit={handleLogin}
      >
        <TextField
          name="email"
          value={email}
          handler={handleFormChange}
          placeholder="Email"
          type="email"
        />
        <TextField
          name="pass"
          value={pass}
          handler={handleFormChange}
          placeholder="Password"
          type="password"
        />
        <button
          className={`
          transition-all transform duration-100 ease-in
          mt-2 w-full h-10 rounded-lg outline-none
          text-white bg-blue-500
          hover:bg-blue-600 hover:scale-95 focus:outline-none
        `}
        >
          LOGIN
        </button>
        {loading && <div className="circular-loader mt-5 w-10 h-10"></div>}
      </form>
    </div>
  );
};
