import React, { useContext } from "react";
import { AuthContext } from "../../utils/authProvider";

export const OptionsBar = () => {
  const { setAuth } = useContext(AuthContext);

  const isDark =
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches;

  const logOut = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");

    setAuth(null);
  };

  return (
    <div className="w-full h-12 flex gap-2 items-center justify-between">
      <div className="flex gap-2 items-center text-3xl">
        <i className="material-icons">work</i>
        <h3 className="">Briefcase</h3>
      </div>
      <div className="flex items-center gap-2">
        <div className="w-12 h-12 rounded-full border-2 border-white dark:border-gray-400">
          <img
            alt="avatar"
            src={`https://ui-avatars.com/api/?
              background=${isDark ? "1F2937" : "479dd1"}&
              color=ffffff&
              size=300&
              uppercase=true&
              name=${JSON.parse(localStorage.getItem("user")).name}`}
            className="rounded-full h-full w-full"
          />
        </div>
        <button
          onClick={logOut}
          className={`
            transition-all transform ease-in duration-150
            outline-none w-12 h-12 material-icons
            rounded-xl dark:text-gray-300
            dark:hover:bg-gray-600 focus:outline-none hover:bg-gray-300
          `}
        >
          exit_to_app
        </button>
      </div>
    </div>
  );
};
