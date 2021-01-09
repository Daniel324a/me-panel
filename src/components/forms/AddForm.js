import React, { useState } from "react";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

import { api } from "../../global/envioronments";
import { useForm } from "../../hooks/useForm";
import { TextArea } from "../textArea/TextArea";
import { TextField } from "../textField/TextField";

const MySwal = withReactContent(Swal);

export const AddForm = () => {
  const [loading, setLoading] = useState(false);

  const [{ name, description, date, link }, handleFormChange] = useForm({
    name: "",
    description: "",
    date: "",
    link: "",
  });

  const handleLogin = async () => {
    if (!name || !description || !date || !link)
      return MySwal.fire({
        customClass: "dark:bg-gray-800",
        title: "Error",
        html: "Don't leave blank fields",
        icon: "warning",
      });

    const body = { name, description, date, link };
    setLoading(true);

    await fetch(`${api}addProject`, {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    })
      .then(response => response.json())
      .then(({ ok, data }) => {
        setLoading(false);

        if (!ok) {
          console.log(data);
          return MySwal.fire({
            customClass: "dark:bg-gray-800",
            title: "Error",
            html: "Check fields and connection",
            icon: "error",
          });
        }

        MySwal.close();
        MySwal.fire({
          customClass: "dark:bg-gray-800",
          title: "Success",
          html: "Project added succesfully",
          icon: "success",
        });
      })
      .catch(err => console.log(err));
  };

  return (
    <div className="flex flex-col gap-2 items-center justify-center dark:text-gray-300">
      <h2 className="text-2xl mb-5">Add Project</h2>
      <TextField
        name="name"
        value={name}
        handler={handleFormChange}
        placeholder="Name"
      />
      <TextField
        name="date"
        value={date}
        handler={handleFormChange}
        type="date"
        placeholder="Date"
      />
      <TextArea
        name="description"
        value={description}
        handler={handleFormChange}
        placeholder="Description"
      />
      <TextField
        name="link"
        value={link}
        handler={handleFormChange}
        type="url"
        placeholder="Link"
      />
      <button
        onClick={handleLogin}
        className={`
          transition-all transform duration-100 ease-in
          mt-2 w-full h-10 rounded-lg outline-none
          text-white bg-blue-500
          hover:bg-blue-600 hover:scale-95 focus:outline-none
        `}
      >
        Confirm
      </button>
      {loading && <div className="circular-loader mt-5 w-10 h-10"></div>}
    </div>
  );
};
