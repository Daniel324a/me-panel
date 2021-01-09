import React from "react";
import { useForm } from "../../hooks/useForm";
import { TextArea } from "../textArea/TextArea";
import { TextField } from "../textField/TextField";

export const ProjectForm = ({ project: { name, description, date, link } }) => {
  const [{ newDescription, newLink }, handleFormChange] = useForm({
    newDescription: description,
    newLink: link,
  });

  return (
    <div className="flex flex-col gap-2 items-center justify-center dark:text-gray-300">
      <h2 className="text-2xl mb-5">{name}</h2>
      <TextArea
        name="newDescription"
        value={newDescription}
        handler={handleFormChange}
        placeholder="Description"
        className="h-36"
      />
      <TextField
        name="newLink"
        value={newLink}
        handler={handleFormChange}
        type="url"
        placeholder="Link"
      />
      <button
        className={`
          transition-all transform duration-100 ease-in
          mt-2 w-full h-10 rounded-lg outline-none
          text-white bg-blue-500
          hover:bg-blue-600 hover:scale-95 focus:outline-none
        `}
      >
        Update
      </button>
      <button
        data-tip
        data-for="addToolTip"
        className={`
            transition-all transform ease-in duration-150
            outline-none w-12 h-12 material-icons mt-5
            bg-red-500 rounded-full text-white dark:text-gray-800
            hover:scale-95 hover:bg-red-600 focus:outline-none
          `}
      >
        delete
      </button>
      <h2 className="mt-5 opacity-50">{date}</h2>
    </div>
  );
};
