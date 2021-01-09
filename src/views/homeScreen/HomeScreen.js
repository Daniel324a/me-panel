import React, { useContext } from "react";
import { Redirect } from "react-router-dom";
import { OptionsBar } from "../../components/optionsBar/OptionsBar";
import { ProjectsTable } from "../../components/projectsTable/ProjectsTable";
import { AuthContext } from "../../utils/authProvider";

export const HomeScreen = () => {
  const { auth } = useContext(AuthContext);

  return !auth ? (
    <Redirect to="/" />
  ) : (
    <div className="w-screen h-screen p-8 flex flex-col gap-5 bg-gray-200 dark:bg-gray-800">
      <OptionsBar />
      <ProjectsTable />
    </div>
  );
};
