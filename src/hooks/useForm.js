import { useState } from "react";

export const useForm = inputs => {
  const [form, setForm] = useState(inputs);

  const handleFormChange = ({ target }) => {
    const value = () => {
      switch (target.type) {
        case "checkbox":
          return target.checked;

        case "file":
          return { file: target.files[0], path: target.value };

        default:
          return target.value;
      }
    };

    setForm({
      ...form,
      [target.name]: value(),
    });
  };

  return [form, handleFormChange, setForm];
};
