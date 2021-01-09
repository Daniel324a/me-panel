import React from "react";

export const TextArea = ({ name, value, handler, placeholder, className }) => {
  return (
    <textarea
      className={`
        transition-all transform duration-150 ease-in outline-none bg-gray-200 dark:bg-gray-700
        p-2 h-20 w-full rounded-lg border shadow-md border-gray-300 dark:border-gray-700
        hover:border-gray-400 focus:border-gray-400 focus:bg-gray-200 focus:outline-none dark:focus:bg-gray-800
        ${className}
      `}
      placeholder={placeholder}
      name={name}
      value={value}
      onChange={handler}
    ></textarea>
  );
};
