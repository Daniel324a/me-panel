import React from "react";

export const ProjectsTable = () => {
  return (
    <div className="border border-gray-300 shadow rounded-lg dark:border-gray-700">
      <table className="w-full h-auto table">
        <thead className="border-b border-gray-300 dark:border-gray-700">
          <tr>
            <th>Name</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th>example</th>
            <th>example</th>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
