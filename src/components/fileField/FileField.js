import React from "react";

import { randomString } from "../../utils/randomString";

export const FileField = ({
  name,
  value,
  handler,
  accept,
  placeholder = "Upload an image",
  icon = "file",
}) => {
  const id = randomString(10);
  const hasFile = value.file !== undefined;

  return (
    <div className="w-full">
      <input
        type="file"
        multiple={false}
        id={id}
        className="hidden"
        name={name}
        onChange={handler}
        value={value.path || ""}
        accept={accept}
      />
      <div className="flex items-center justify-center gap-2">
        <label
          htmlFor={id}
          className={
            (hasFile && "bg-blue-500 rounded-full border-none") +
            " flex justify-center items-center w-12 h-12 border-2 border-gray-400 border-dashed rounded-xl transition-all transform duration-300 ease-in"
          }
        >
          <i className="material-icons">{hasFile ? "check" : icon}</i>
        </label>
        <p className="truncate w-100">{value.file?.name || placeholder}</p>
      </div>
    </div>
  );
};
