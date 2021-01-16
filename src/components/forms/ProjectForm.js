import React, { useState } from "react";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import ReactTooltip from "react-tooltip";
import Compress from "compress.js";

import { api } from "../../global/envioronments";
import { useForm } from "../../hooks/useForm";
import { FileField } from "../fileField/FileField";
import { TextArea } from "../textArea/TextArea";
import { TextField } from "../textField/TextField";

const MySwal = withReactContent(Swal);
const c = new Compress();

export const ProjectForm = ({
  project: { name, description, date, link, _id },
}) => {
  const [{ newDescription, newLink, image }, handleFormChange] = useForm({
    newDescription: description,
    newLink: link,
    image: "",
  });

  const [loading, setLoading] = useState(false);

  const [{ linkErr, descriptionErr }, setShowError] = useState({
    linkErr: false,
    descriptionErr: false,
  });

  const handleUpdate = async () => {
    if ((newDescription.length || 0) <= 0 || (newLink.length || 0) <= 0) {
      setShowError({
        descriptionErr: (newDescription.length || 0) <= 0,
        linkErr: (newLink.length || 0) <= 0,
      });
      setTimeout(
        () => setShowError({ linkErr: false, descriptionErr: false }),
        200
      );

      return;
    }

    let body = {
      description: newDescription,
      link: newLink,
      token: localStorage.getItem("token"),
    };
    setLoading(true);

    if (image.file)
      await c.compress([image.file], {
        size: 1,
        quality: 0.75,
        maxWidth: 500,
        resize: true,
      }).then(([{ data }]) => (body = { ...body, image: data }));

    await fetch(`${api}updateProject/${_id}`, {
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
          html: "Project updated succesfully",
          icon: "success",
        });
      })
      .catch(err => console.log(err));
  };

  const handleDelete = async () => {
    const isConfirmed = await MySwal.fire({
      customClass: "dark:bg-gray-800",
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async ({ isConfirmed }) => isConfirmed);

    if (!isConfirmed) return;

    await fetch(`${api}deleteProject/${_id}`, {
      method: "post",
      headers: { "Content-Type": "application/json" },
    })
      .then(response => response.json())
      .then(({ ok, data }) => {
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
        return MySwal.fire({
          customClass: "dark:bg-gray-800",
          title: "Success",
          html: "Project deleted succesfully",
          icon: "success",
        });
      })
      .catch(err => console.log(err));
  };

  return (
    <div className="flex flex-col gap-2 items-center justify-center dark:text-gray-300">
      <h2 className="text-2xl mb-5">{name}</h2>
      <FileField
        name="image"
        value={image}
        handler={handleFormChange}
        accept="image/*"
        placeholder="Upload an image"
        icon="add_photo_alternate"
      />
      <TextArea
        name="newDescription"
        value={newDescription}
        handler={handleFormChange}
        placeholder="Description"
        className={
          (descriptionErr &&
            "animate-pulse border-red-500 dark:border-red-500") + " h-36"
        }
      />
      <TextField
        name="newLink"
        value={newLink}
        handler={handleFormChange}
        type="url"
        placeholder="Link"
        className={
          linkErr && "animate-pulse border-red-500 dark:border-red-500"
        }
      />
      <button
        className={`
          transition-all transform duration-100 ease-in
          mt-2 w-full h-10 rounded-lg outline-none
          text-white bg-blue-500
          hover:bg-blue-600 hover:scale-95 focus:outline-none
        `}
        onClick={handleUpdate}
      >
        Update
      </button>
      {loading ? (
        <div className="circular-loader mt-5 w-10 h-10"></div>
      ) : (
        <button
          data-tip
          data-for="deleteToolTip"
          className={`
            transition-all transform ease-in duration-150
            outline-none w-12 h-12 material-icons mt-5
            bg-red-500 rounded-full text-white dark:text-gray-800
            hover:scale-95 hover:bg-red-600 focus:outline-none
          `}
          onClick={handleDelete}
        >
          delete
        </button>
      )}
      <h2 className="mt-5 opacity-50">{date}</h2>

      <ReactTooltip
        id="deleteToolTip"
        place="left"
        effect="solid"
        delayShow={500}
        backgroundColor="#13131396"
        arrowColor="transparent"
      >
        Delete project
      </ReactTooltip>
    </div>
  );
};
