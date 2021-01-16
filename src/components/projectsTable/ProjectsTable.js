import React from "react";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

import { api } from "../../global/envioronments";
import { useFetch } from "../../hooks/useFetch";
import { ProjectForm } from "../forms/ProjectForm";

const MySwal = withReactContent(Swal);

export const ProjectsTable = () => {
  const { loading, data } = useFetch(`${api}getProjects`);

  return loading ? (
    <div className="flex flex-col w-52 justify-center text-center items-center place-self-center border border-gray-600 rounded-xl p-5">
      <code className="text-2xl">Loading Projects</code>
      <div className="circular-loader mt-5 w-10 h-10"></div>
    </div>
  ) : (
    <div className="border border-gray-300 shadow rounded-lg overflow-x-auto dark:border-gray-700">
      <table className="w-full h-auto table">
        <thead className="border-b border-gray-300 dark:border-gray-700">
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {data.data.map(({ _id, name, description, date }, i) => {
            const project = data.data[i];

            return (
              <tr
                key={_id}
                onClick={() =>
                  MySwal.fire({
                    customClass: "dark:bg-gray-800",
                    showConfirmButton: false,
                    showCloseButton: true,
                    html: <ProjectForm project={project} />,
                  })
                }
              >
                <th>{name}</th>
                <th>{description}</th>
                <th>{date}</th>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
