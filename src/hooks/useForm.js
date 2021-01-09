import { useState } from "react";

export const useForm = inputs => {
  const [form, setForm] = useState(inputs);

  const handleFormChange = ({ target }) =>
    setForm({
      ...form,
      [target.name]: target.type === "checkbox" ? target.checked : target.value,
    });

  return [form, handleFormChange, setForm];
};
